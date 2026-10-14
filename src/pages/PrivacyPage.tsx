import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HOSPITAL_DATA } from '../data/hospitalData';
import { Container } from '../components/ui';
import { ShieldCheck, Lock, Mail, AlertTriangle, type LucideIcon } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (path: string) => void;
}

/** Section index — ids double as in-page anchors for the sticky contents list. */
const SECTIONS: { id: string; label: string; icon: LucideIcon }[] = [
  {
    id: 'information-we-collect',
    label: '1. Information We Collect Through This Website',
    icon: Lock,
  },
  { id: 'how-information-is-used', label: '2. How Your Information Is Utilized', icon: ShieldCheck },
  {
    id: 'emergency-clinical-disclaimer',
    label: '3. Medical Emergency & Clinical Disclaimer',
    icon: AlertTriangle,
  },
  { id: 'privacy-officer', label: '4. Inquiries & Data Privacy Officer', icon: Mail },
];

const CARD =
  'reveal scroll-mt-28 rounded-xl border border-line-soft bg-white p-7 sm:p-9';

const BODY = 'text-[0.9375rem] leading-relaxed text-ink-soft';

/** Contents index rendered both as a sticky desktop rail and a mobile card. */
const SectionIndex: React.FC<{ className?: string; sticky?: boolean }> = ({
  className = '',
  sticky = false,
}) => (
  <nav
    aria-label="On this page"
    className={`rounded-xl border border-line-soft bg-white p-6 ${
      sticky ? 'sticky top-28' : ''
    } ${className}`}
  >
    <p className="eyebrow">On this page</p>
    <ul className="mt-4 space-y-1">
      {SECTIONS.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="block rounded-xl px-3 py-2.5 text-[0.8125rem] leading-snug text-ink-soft transition-colors duration-300 hover:bg-brand-50 hover:text-brand-800"
          >
            {section.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="pb-24">
      {/* ==================================================================
          PAGE HEADER
          ================================================================== */}
      <section className="relative isolate overflow-hidden border-b border-line bg-white/60 pb-14 pt-6">
        <Container width="wide" className="relative z-10">
          <Breadcrumbs items={[{ label: 'Privacy Policy' }]} onNavigate={onNavigate} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Data &amp; Privacy Practices</p>
            <h1 className="display mt-4 text-[clamp(2.25rem,1.5rem+2.6vw,3.5rem)]">
              Privacy Policy &amp; Information Handling
            </h1>
            <p className="lede mt-5">
              Effective Date: October 2026 · Lailas Hospital and IVF Centre (Lailas Health Care
              Limited), Chemmad, Kerala.
            </p>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          POLICY BODY — sticky contents index + readable measure
          ================================================================== */}
      <section className="py-14 sm:py-16">
        {/* Mobile / tablet index */}
        <Container width="narrow" className="lg:hidden">
          <SectionIndex />
        </Container>

        <Container width="wide" className="mt-10 lg:mt-0">
          <div className="grid w-full max-w-[70rem] gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
            <aside className="hidden lg:block">
              <SectionIndex sticky />
            </aside>

            <article className="max-w-3xl space-y-6 sm:space-y-8">
              {/* ---------------- 1 ---------------- */}
              <section id="information-we-collect" className={CARD}>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                    <Lock className="h-5 w-5" />
                  </span>
                  <h2 className="text-xl sm:text-[1.375rem]">
                    1. Information We Collect Through This Website
                  </h2>
                </div>

                <div className="mt-5 space-y-5">
                  <p className={BODY}>
                    This website serves purely to provide institutional healthcare information and
                    facilitate preliminary appointment inquiries. We deliberately restrict our public
                    contact forms to collect only:
                  </p>

                  <ul className="space-y-3">
                    {[
                      'Your contact name and preferred telephone number.',
                      'Requested clinical department and preferred appointment date.',
                      'General communication preferences (phone call vs. SMS).',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"
                          aria-hidden="true"
                        />
                        <span className={BODY}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="rounded-xl border border-line-soft bg-canvas p-5 text-[0.9375rem] font-medium leading-relaxed text-brand-800">
                    We explicitly instruct visitors never to disclose sensitive health histories,
                    detailed medical diagnoses, or personal reproductive documentation through
                    unencrypted public web forms.
                  </p>
                </div>
              </section>

              {/* ---------------- 2 ---------------- */}
              <section id="how-information-is-used" className={CARD}>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <h2 className="text-xl sm:text-[1.375rem]">2. How Your Information Is Utilized</h2>
                </div>

                <div className="mt-5 space-y-5">
                  <p className={BODY}>
                    Information submitted through an appointment enquiry is utilized solely by
                    authorized hospital reception and patient coordination personnel to:
                  </p>

                  <ul className="space-y-3">
                    {[
                      'Contact you via telephone or SMS to confirm doctor schedule availability.',
                      'Answer specific queries regarding department clinic hours and location directions.',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"
                          aria-hidden="true"
                        />
                        <span className={BODY}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className={BODY}>
                    We do not sell, rent, monetize, or disclose your contact information to
                    third-party commercial marketing entities or advertising brokers.
                  </p>
                </div>
              </section>

              {/* ---------------- 3 ---------------- */}
              <section id="emergency-clinical-disclaimer" className={CARD}>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-coral-50 text-coral-600">
                    <AlertTriangle className="h-5 w-5" />
                  </span>
                  <h2 className="text-xl sm:text-[1.375rem]">
                    3. Medical Emergency &amp; Clinical Disclaimer
                  </h2>
                </div>

                <div className="mt-5 space-y-2.5 rounded-xl border border-coral-100 bg-coral-50 p-6">
                  <p className="text-[0.9375rem] font-semibold text-coral-600">
                    Important Clinical Boundary:
                  </p>
                  <p className="text-[0.9375rem] leading-relaxed text-coral-600/90">
                    This website and its associated enquiry forms do not establish a formal
                    physician-patient relationship, nor do they constitute medical diagnosis, triage,
                    or emergency clinical guidance. In situations involving acute trauma, active
                    obstetric labor, severe bleeding, or emergencies, do not wait for an electronic
                    reply. Proceed immediately to the hospital casualty or phone{' '}
                    <a
                      href={`tel:${HOSPITAL_DATA.phones[0].tel}`}
                      className="tabular-numbers font-semibold underline decoration-coral-300 underline-offset-4"
                    >
                      {HOSPITAL_DATA.phones[0].display}
                    </a>
                    .
                  </p>
                </div>
              </section>

              {/* ---------------- 4 ---------------- */}
              <section id="privacy-officer" className={CARD}>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                    <Mail className="h-5 w-5" />
                  </span>
                  <h2 className="text-xl sm:text-[1.375rem]">4. Inquiries &amp; Data Privacy Officer</h2>
                </div>

                <div className="mt-5 space-y-5">
                  <p className={BODY}>
                    For any questions regarding institutional data practices, privacy disclosures, or
                    administrative records, you may contact our hospital administration directly:
                  </p>

                  <div className="space-y-2 rounded-2xl border border-line bg-canvas p-6 text-[0.9375rem] leading-relaxed text-ink-soft">
                    <p className="font-semibold text-brand-800">
                      Lailas Hospital and IVF Centre
                    </p>
                    <p>
                      Thalappara Road / Main Road, Chemmad, Tirurangadi P.O., Malappuram, Kerala —
                      676306
                    </p>
                    <p>
                      Email:{' '}
                      <a
                        href={`mailto:${HOSPITAL_DATA.email}`}
                        className="break-all font-medium text-brand-700 underline decoration-brand-300 underline-offset-4"
                      >
                        {HOSPITAL_DATA.email}
                      </a>
                    </p>
                    <p className="tabular-numbers">Phone: {HOSPITAL_DATA.phones[0].display}</p>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </Container>
      </section>
    </div>
  );
};
