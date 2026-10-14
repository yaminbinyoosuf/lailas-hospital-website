import React, { useMemo, useState } from 'react';
import {
  Phone,
  Clock,
  CalendarClock,
  Languages,
  MessageCircle,
  Stethoscope,
  Check,
  Siren,
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  HOSPITAL_DATA,
  DOCTOR_CATEGORIES,
  doctorsByCategory,
  whatsappUrl,
  WHATSAPP_MESSAGES,
  type DoctorCategory,
  type DoctorProfile,
} from '../data/hospitalData';
import { Button, Container, SectionHeading, LinkButton } from '../components/ui';

interface DoctorsPageProps {
  onNavigate: (path: string) => void;
  onBookSpeciality: (specialityId: string) => void;
}

/** Derive a monogram, ignoring honorifics and desk prefixes. */
const getInitials = (name: string): string =>
  name
    .replace(/^(Dr\.?|Department of)\s*/i, '')
    .replace(/[^A-Za-z\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word && !/^(of|and|the)$/i.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

const DirectoryCard: React.FC<{
  doctor: DoctorProfile;
  onBook: () => void;
  index: number;
}> = ({ doctor, onBook, index }) => (
  <article
    data-reveal-index={index}
    className="reveal flex flex-col overflow-hidden rounded-3xl border border-line-soft bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[var(--shadow-lift)]"
  >
    <div className="p-6 pb-4">
      <div className="flex items-start gap-4">
        <span
          className={`grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${doctor.accent} text-xl font-bold text-white shadow-[0_10px_24px_-12px_rgba(18,63,99,0.8)]`}
          aria-hidden="true"
        >
          {getInitials(doctor.name)}
        </span>
        <div className="min-w-0">
          <span className="inline-block rounded-full bg-brand-50 px-2.5 py-1 text-[0.6875rem] font-semibold text-brand-700">
            {doctor.designation}
          </span>
          <h3 className="mt-2 text-lg leading-snug">{doctor.name}</h3>
          <p className="mt-1 text-sm font-semibold text-sand-600">{doctor.qualifications}</p>
        </div>
      </div>

      <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
        {doctor.experienceNotes}
      </p>
    </div>

    {/* Confirmed OPD schedule, given its own tinted block */}
    <div className="mx-6 rounded-2xl bg-canvas p-4">
      <dl className="space-y-2.5 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="flex items-center gap-2 text-ink-soft">
            <CalendarClock className="h-4 w-4 text-sand-600" aria-hidden="true" />
            Consultation days
          </dt>
          <dd className="font-semibold text-brand-800">Mon – Sat</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="flex items-center gap-2 text-ink-soft">
            <Clock className="h-4 w-4 text-sand-600" aria-hidden="true" />
            OPD timings
          </dt>
          <dd className="tabular-numbers font-semibold text-brand-800">{doctor.opdTimings}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="flex items-center gap-2 text-ink-soft">
            <Languages className="h-4 w-4 text-sand-600" aria-hidden="true" />
            Speaks
          </dt>
          <dd className="font-medium text-brand-800">{doctor.languages.join(', ')}</dd>
        </div>
      </dl>
    </div>

    <div className="mt-5 space-y-2.5 px-6 pb-6">
      <Button className="w-full" onClick={onBook}>
        <CalendarClock className="h-4 w-4" />
        Book an appointment
      </Button>
      <a
        href={whatsappUrl(WHATSAPP_MESSAGES.general)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold text-brand-800 transition-colors hover:border-brand-300 hover:bg-brand-50"
      >
        <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
        Ask on WhatsApp
      </a>
    </div>
  </article>
);

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ onNavigate, onBookSpeciality }) => {
  const primary = HOSPITAL_DATA.primary;
  const [filter, setFilter] = useState<DoctorCategory['id']>('all');
  const doctors = useMemo(() => doctorsByCategory(filter), [filter]);

  return (
    <div className="pb-24">
      {/* ---------------- Page header ---------------- */}
      <section className="relative isolate overflow-hidden border-b border-line bg-white/60 pb-14 pt-6">
        <div className="wash -left-20 -top-24 h-80 w-80 bg-brand-200/50" aria-hidden="true" />

        <Container width="wide" className="relative z-10">
          <Breadcrumbs items={[{ label: 'Doctors & OPD Schedule' }]} onNavigate={onNavigate} />

          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Experienced medical team</p>
            <h1 className="display mt-4 text-[clamp(2.25rem,1.5rem+2.6vw,3.5rem)]">
              Meet our specialist doctors
            </h1>
            <p className="lede mt-5">
              Consult our dedicated team of obstetricians, fertility specialists, paediatrician and
              family physician in Chemmad. OPD runs Monday to Saturday — appointment times below.
            </p>
          </div>

          {/* Confirmed headline figures */}
          <div className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {[
              { value: HOSPITAL_DATA.metrics.safeBirths, label: 'Safe births delivered' },
              { value: `${HOSPITAL_DATA.metrics.yearsOfService} Years`, label: 'Serving Chemmad since 1994' },
              { value: '24 / 7', label: 'Emergency, laboratory & pharmacy' },
            ].map((m) => (
              <div key={m.label}>
                <p className="display text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)]">{m.value}</p>
                <p className="mt-1.5 text-sm text-ink-soft">{m.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------- Filterable directory ---------------- */}
      <section className="pt-14" aria-labelledby="directory-heading">
        <Container width="wide">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Consultation schedule"
              title={<span id="directory-heading">Choose your consultant</span>}
              description="Filter by speciality, then book directly. For today’s availability you can also call or message reception."
            />

            {/* Filter pills */}
            <div
              role="tablist"
              aria-label="Filter doctors by speciality"
              className="flex flex-wrap gap-2 lg:justify-end"
            >
              {DOCTOR_CATEGORIES.map((cat) => {
                const active = filter === cat.id;
                const count = doctorsByCategory(cat.id).length;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    type="button"
                    aria-selected={active}
                    onClick={() => setFilter(cat.id)}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                      active
                        ? 'border-brand-700 bg-brand-700 text-white shadow-[0_8px_20px_-10px_rgba(21,85,140,0.8)]'
                        : 'border-line bg-white text-brand-800 hover:border-brand-300 hover:bg-brand-50'
                    }`}
                  >
                    {cat.label}
                    <span
                      className={`rounded-full px-1.5 text-[0.6875rem] font-bold ${
                        active ? 'bg-white/20 text-white' : 'bg-canvas text-ink-soft'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {doctors.map((doc, i) => (
              <DirectoryCard
                key={doc.id}
                doctor={doc}
                index={i}
                onBook={() => onBookSpeciality(doc.specialityIds[0])}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------- 24/7 duty team ---------------- */}
      <section className="pt-14">
        <Container width="wide">
          <div className="reveal flex flex-col gap-6 rounded-[2rem] bg-brand-800 p-7 text-white sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-300 ring-1 ring-white/20">
                <Siren className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl text-white sm:text-[1.375rem]">
                  24/7 resident medical officers &amp; labour room team
                </h2>
                <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-brand-200/80">
                  Duty doctors, obstetric nurses, laboratory technicians and pharmacists are
                  available 24 hours a day, including Sundays and public holidays.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <LinkButton variant="coral" size="lg" href={`tel:${primary.tel}`}>
                <Phone className="h-4 w-4" />
                <span className="tabular-numbers">{primary.display}</span>
              </LinkButton>
              <LinkButton
                variant="onDark"
                size="lg"
                href={whatsappUrl(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp reception
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------- Transparency note ---------------- */}
      <section className="pt-10">
        <Container width="wide">
          <div className="reveal flex items-start gap-3 rounded-3xl border border-line-soft bg-white p-7 shadow-[var(--shadow-soft)]">
            <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-sand-600" aria-hidden="true" />
            <div>
              <p className="font-semibold text-brand-800">Consultation schedules</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                OPD timings above are the hospital’s published consulting hours. Individual
                availability can change on any given day because of deliveries, surgery and
                emergencies, so please call{' '}
                <a
                  href={`tel:${primary.tel}`}
                  className="tabular-numbers inline-flex min-h-11 items-center font-semibold text-brand-700 underline underline-offset-4"
                >
                  {primary.display}
                </a>{' '}
                to confirm before travelling.
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                {[
                  'Bring previous prescriptions, scan reports and blood test results if you have them.',
                  'Fertility consultations are confidential and may take longer than a routine OPD visit.',
                  'For a medical emergency, come directly to casualty rather than waiting for an appointment.',
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sand-500" aria-hidden="true" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
