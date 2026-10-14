import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HOSPITAL_DATA, CORE_DEPARTMENTS } from '../data/hospitalData';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Check,
  Copy,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Navigation,
  Loader2,
} from 'lucide-react';
import { Button, LinkButton, Container } from '../components/ui';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

/** House-style field treatment shared by every text input, select and textarea. */
const FIELD_CLASS =
  'w-full rounded-2xl border border-line bg-canvas px-4 py-3 text-base text-ink transition-colors duration-200 placeholder:text-brand-300 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10 focus:outline-none';

const LABEL_CLASS = 'mb-2 block text-sm font-semibold text-brand-800';

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('ivf-fertility');
  const [preferredDate, setPreferredDate] = useState('');
  const [contactMethod, setContactMethod] = useState<'phone' | 'whatsapp'>('phone');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const primaryPhone = HOSPITAL_DATA.phones[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(HOSPITAL_DATA.address.fullFormatted);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Please enter your full name.';
    const cleanPhone = phone.replace(/[\s\-\+\(\)]/g, '');
    if (!phone.trim()) {
      errs.phone = 'Please enter your contact phone number.';
    } else if (cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!preferredDate) {
      errs.preferredDate = 'Please select a preferred date.';
    }
    if (!consent) {
      errs.consent = 'Consent acknowledgment is required to proceed.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  const mapQuery = encodeURIComponent(
    `${HOSPITAL_DATA.name}, ${HOSPITAL_DATA.address.fullFormatted}`
  );

  return (
    <div className="pb-24">
      {/* ==================================================================
          PAGE HEADER
          ================================================================== */}
      <section className="relative isolate overflow-hidden border-b border-line bg-white/60 pb-14 pt-6">
        <Container width="wide" className="relative z-10">
          <Breadcrumbs items={[{ label: 'Contact & Appointments' }]} onNavigate={onNavigate} />
          <div className="reveal animate-enter mt-8 max-w-3xl">
            <p className="eyebrow">Get in Touch</p>
            <h1 className="display mt-4 text-[clamp(2.25rem,1.5rem+2.6vw,3.5rem)]">
              Location &amp; Appointment Enquiry
            </h1>
            <p className="lede mt-5">
              Contact Lailas Hospital and IVF Centre in Chemmad. Our reception desk is available for
              telephone enquiries, and online appointment requests are processed during outpatient
              hours.
            </p>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          EMERGENCY NOTICE (mandatory)
          ================================================================== */}
      <section className="pt-10">
        <Container width="wide">
          <div className="reveal flex items-start gap-4 rounded-xl border border-coral-100 bg-coral-50 p-6 sm:p-7">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/70 text-coral-600">
              <AlertCircle className="h-5 w-5" />
            </span>
            <div className="text-[0.9375rem] leading-relaxed text-ink">
              <strong className="block font-semibold text-brand-900">
                Emergency Assistance Notice:
              </strong>
              <span className="mt-1 block">
                For medical emergencies, call the hospital directly. Do not rely on this form for
                urgent medical assistance. Dial reception at{' '}
                <a
                  href={`tel:${HOSPITAL_DATA.phones[0].tel}`}
                  className="tabular-numbers inline-block py-2 font-semibold text-coral-600 underline decoration-coral-200 underline-offset-4 transition-colors hover:text-coral-600"
                >
                  {HOSPITAL_DATA.phones[0].display}
                </a>{' '}
                or casualty desk at{' '}
                <a
                  href={`tel:${HOSPITAL_DATA.phones[1].tel}`}
                  className="tabular-numbers inline-block py-2 font-semibold text-coral-600 underline decoration-coral-200 underline-offset-4 transition-colors hover:text-coral-600"
                >
                  {HOSPITAL_DATA.phones[1].display}
                </a>
                .
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          DETAILS + ENQUIRY FORM
          ================================================================== */}
      <section className="py-14 sm:py-16">
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* ---------------- Left: contact details ---------------- */}
            <div className="space-y-6 lg:col-span-5">
              {/* Address */}
              <div className="reveal rounded-xl border border-line-soft bg-white p-6 sm:p-7">
                <p className="eyebrow">Hospital Address</p>
                <h2 className="mt-3 text-xl">{HOSPITAL_DATA.name}</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {HOSPITAL_DATA.address.street}
                  <br />
                  {HOSPITAL_DATA.address.town}, {HOSPITAL_DATA.address.postOffice}
                  <br />
                  {HOSPITAL_DATA.address.district}, {HOSPITAL_DATA.address.state} —{' '}
                  {HOSPITAL_DATA.address.pincode}
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  <Button variant="secondary" size="sm" onClick={handleCopy}>
                    {copiedAddress ? (
                      <Check className="h-4 w-4 text-sand-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copiedAddress ? 'Address Copied!' : 'Copy Address'}
                  </Button>

                  <LinkButton
                    href={HOSPITAL_DATA.address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    <Navigation className="h-4 w-4" />
                    Open Directions
                  </LinkButton>
                </div>
              </div>

              {/* Telephones */}
              <div className="reveal rounded-xl border border-line-soft bg-white p-6 sm:p-7">
                <p className="eyebrow">Telephone Desks</p>
                <ul className="mt-5 space-y-3">
                  {HOSPITAL_DATA.phones.map((p) => (
                    <li
                      key={p.tel}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-canvas p-4"
                    >
                      <div className="min-w-0">
                        <span className="block text-xs text-ink-soft">{p.label}</span>
                        <a
                          href={`tel:${p.tel}`}
                          className="tabular-numbers mt-1 block text-lg font-semibold text-brand-800 transition-colors hover:text-sand-600"
                        >
                          {p.display}
                        </a>
                      </div>
                      <LinkButton
                        href={`tel:${p.tel}`}
                        variant="secondary"
                        size="sm"
                        aria-label={`Call ${p.label} on ${p.display}`}
                      >
                        <Phone className="h-3.5 w-3.5 text-coral-600" />
                        Call
                      </LinkButton>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Email + hours */}
              <div className="reveal rounded-xl border border-line-soft bg-white p-6 sm:p-7">
                <p className="eyebrow flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </p>
                <a
                  href={`mailto:${HOSPITAL_DATA.email}`}
                  className="mt-2 block break-all text-[0.9375rem] font-semibold text-brand-800 transition-colors hover:text-sand-600"
                >
                  {HOSPITAL_DATA.email}
                </a>

                <div className="hairline my-6" />

                <p className="eyebrow">Hospital Operating Hours</p>
                <dl className="mt-4 space-y-3 text-[0.9375rem]">
                  <div className="flex items-start gap-2.5">
                    <Clock className="mt-1 h-4 w-4 shrink-0 text-sand-500" />
                    <div>
                      <dt className="text-ink-soft">Inpatient &amp; Emergency:</dt>
                      <dd className="font-semibold text-brand-800">24 Hours / 7 Days</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="mt-1 h-4 w-4 shrink-0 text-sand-500" />
                    <div>
                      <dt className="text-ink-soft">OPD Consultations:</dt>
                      <dd className="font-semibold text-brand-800">Mon – Sat: 9:00 AM – 5:00 PM</dd>
                    </div>
                  </div>
                </dl>
              </div>

              {/* Transport guide */}
              <div className="reveal rounded-xl border border-line-soft bg-white p-6 sm:p-7">
                <h3 className="text-lg">How to Reach Lailas Hospital</h3>
                <ul className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  <li>
                    <strong className="font-semibold text-brand-800">From Tirurangadi town:</strong>{' '}
                    Located approx 2 km away along the main Chemmad road.
                  </li>
                  <li>
                    <strong className="font-semibold text-brand-800">
                      From NH 66 (Thalappara Junction):
                    </strong>{' '}
                    Take the Chemmad link road (approx 4 km).
                  </li>
                  <li>
                    <strong className="font-semibold text-brand-800">
                      From Parappanangadi Railway Station:
                    </strong>{' '}
                    Approx 8 km; auto-rickshaws and buses operate frequently toward Chemmad.
                  </li>
                  <li>
                    <strong className="font-semibold text-brand-800">
                      From Calicut International Airport (CCJ):
                    </strong>{' '}
                    Approx 22 km via Kondotty / Thenhipalam.
                  </li>
                </ul>
              </div>

              {/* Map */}
              <div className="reveal overflow-hidden rounded-3xl border border-line-soft bg-white">
                <div className="aspect-[16/10] w-full bg-brand-50">
                  <iframe
                    title={`Map showing the location of ${HOSPITAL_DATA.name} in Chemmad`}
                    src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <p className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sand-600" />
                    {HOSPITAL_DATA.address.town}, {HOSPITAL_DATA.address.district}
                  </p>
                  <a
                    href={HOSPITAL_DATA.address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900"
                  >
                    Google Maps
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* ---------------- Right: enquiry form ---------------- */}
            <div className="lg:col-span-7">
              <div className="reveal rounded-xl border border-line-soft bg-white p-6 sm:p-9">
                <p className="eyebrow">Online Form</p>
                <h2 className="mt-3 text-2xl">Request a Consultation Slot</h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                  Fill in your contact details below. Our hospital reception team will call to
                  confirm an appointment slot.
                </p>

                {isSuccess ? (
                  <div className="mt-8 rounded-2xl border border-line bg-canvas p-7 text-center sm:p-9">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-brand-50 text-sand-600">
                      <CheckCircle2 className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 text-xl">Enquiry Received</h3>

                    {/* Required Confirmation Message */}
                    <p className="mx-auto mt-5 max-w-md rounded-xl border border-line bg-white p-5 text-[0.9375rem] leading-relaxed text-ink-soft">
                      “Thank you for contacting Lailas Hospital and IVF Centre. Your enquiry has
                      been received. Please contact the hospital directly if your request is
                      urgent.”
                    </p>

                    <p className="mt-5 text-sm text-ink-soft">
                      Patient name: {fullName} · Preferred date: {preferredDate}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                      <LinkButton href={`tel:${primaryPhone.tel}`}>
                        <Phone className="h-4 w-4" />
                        Call Reception
                      </LinkButton>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setIsSuccess(false);
                          setFullName('');
                          setPhone('');
                          setPreferredDate('');
                          setNotes('');
                          setConsent(false);
                        }}
                      >
                        Submit Another Enquiry
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-7 space-y-6">
                    <div className="rounded-xl border border-line-soft bg-canvas p-4 text-sm leading-relaxed text-ink-soft">
                      <strong className="font-semibold text-brand-800">Notice:</strong> This form
                      collects an initial enquiry. Inpatient admissions, urgent labor care, and
                      acute casualties must report directly to casualty or telephone immediately.
                    </div>

                    <div>
                      <label className={LABEL_CLASS} htmlFor="enquiry-full-name">
                        Your Full Name *
                      </label>
                      <input
                        id="enquiry-full-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter patient or guardian name"
                        className={FIELD_CLASS}
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'enquiry-full-name-error' : undefined}
                      />
                      {errors.fullName && (
                        <p id="enquiry-full-name-error" className="mt-2 text-sm text-coral-600">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className={LABEL_CLASS} htmlFor="enquiry-phone">
                        Contact Phone Number *
                      </label>
                      <input
                        id="enquiry-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 98460 12345"
                        className={`${FIELD_CLASS} tabular-numbers`}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'enquiry-phone-error' : undefined}
                      />
                      {errors.phone && (
                        <p id="enquiry-phone-error" className="mt-2 text-sm text-coral-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className={LABEL_CLASS} htmlFor="enquiry-department">
                          Preferred Department *
                        </label>
                        <select
                          id="enquiry-department"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          className={FIELD_CLASS}
                        >
                          {CORE_DEPARTMENTS.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                              {dept.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={LABEL_CLASS} htmlFor="enquiry-date">
                          Preferred Date *
                        </label>
                        <input
                          id="enquiry-date"
                          type="date"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className={`${FIELD_CLASS} tabular-numbers`}
                          aria-invalid={Boolean(errors.preferredDate)}
                          aria-describedby={
                            errors.preferredDate ? 'enquiry-date-error' : undefined
                          }
                        />
                        {errors.preferredDate && (
                          <p id="enquiry-date-error" className="mt-2 text-sm text-coral-600">
                            {errors.preferredDate}
                          </p>
                        )}
                      </div>
                    </div>

                    <fieldset>
                      <legend className={LABEL_CLASS}>Preferred Contact Method</legend>
                      <div className="flex flex-wrap gap-3">
                        <label
                          className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm transition-colors duration-200 ${
                            contactMethod === 'phone'
                              ? 'border-brand-300 bg-brand-50 font-semibold text-brand-800'
                              : 'border-line bg-canvas text-ink-soft hover:border-brand-200'
                          }`}
                        >
                          <input
                            type="radio"
                            name="cm"
                            checked={contactMethod === 'phone'}
                            onChange={() => setContactMethod('phone')}
                            className="h-4 w-4 shrink-0 accent-sand-600"
                          />
                          <span>Phone Call</span>
                        </label>

                        <label
                          className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm transition-colors duration-200 ${
                            contactMethod === 'whatsapp'
                              ? 'border-brand-300 bg-brand-50 font-semibold text-brand-800'
                              : 'border-line bg-canvas text-ink-soft hover:border-brand-200'
                          }`}
                        >
                          <input
                            type="radio"
                            name="cm"
                            checked={contactMethod === 'whatsapp'}
                            onChange={() => setContactMethod('whatsapp')}
                            className="h-4 w-4 shrink-0 accent-sand-600"
                          />
                          <span>WhatsApp / SMS</span>
                        </label>
                      </div>
                    </fieldset>

                    <div>
                      <label className={LABEL_CLASS} htmlFor="enquiry-notes">
                        Optional Note (e.g. morning slot preference)
                      </label>
                      <textarea
                        id="enquiry-notes"
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Brief preference only. Please do not submit confidential medical records."
                        className={`${FIELD_CLASS} resize-y`}
                      />
                    </div>

                    <div>
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line-soft bg-canvas p-4">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-sand-600"
                          aria-invalid={Boolean(errors.consent)}
                          aria-describedby={errors.consent ? 'enquiry-consent-error' : undefined}
                        />
                        <span className="text-sm leading-relaxed text-ink-soft">
                          I consent to Lailas Hospital handling this enquiry to arrange my
                          appointment. I understand this form does not confirm an immediate booking.
                          *
                        </span>
                      </label>
                      {errors.consent && (
                        <p id="enquiry-consent-error" className="mt-2 text-sm text-coral-600">
                          {errors.consent}
                        </p>
                      )}
                    </div>

                    <div className="pt-1">
                      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                        {isSubmitting ? 'Submitting...' : 'Submit Appointment Enquiry'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
