import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HOSPITAL_DATA } from '../data/hospitalData';
import { Button, Container, LinkButton } from '../components/ui';
import {
  Phone,
  CalendarCheck,
  ShieldCheck,
  HeartHandshake,
  MapPin,
  Quote,
  type LucideIcon,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenAppointmentModal: (department?: string) => void;
}

/** Local commitments — decorative icon + the authored copy for each card. */
const COMMITMENTS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: HeartHandshake,
    title: 'Community Proximity',
    body: 'Located in Chemmad, Tirurangadi, we provide accessible clinical services close to home, sparing local residents the burden of long journeys for essential maternal care.',
  },
  {
    icon: ShieldCheck,
    title: 'Responsible Practice',
    body: 'We adhere to ethical medical guidelines, non-stigmatising reproductive counseling, and clear cost disclosures without misleading guarantees.',
  },
  {
    icon: MapPin,
    title: 'Central Location',
    body: 'Positioned along Thalappara Road, with direct road access to Tirurangadi, Parappanangadi, and the National Highway 66 corridor.',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenAppointmentModal,
}) => {
  const primaryPhone = HOSPITAL_DATA.phones[0];

  return (
    <div className="pb-24">
      {/* ==================================================================
          PAGE HEADER
          ================================================================== */}
      <section className="relative isolate overflow-hidden border-b border-line bg-white/60 pb-14 pt-6">
        <Container width="wide" className="relative z-10">
          <Breadcrumbs items={[{ label: 'About Us' }]} onNavigate={onNavigate} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">About Our Institution</p>
            <h1 className="display mt-4 text-[clamp(2.25rem,1.5rem+2.6vw,3.5rem)]">
              Humane Care; Divine Cure
            </h1>
            <p className="lede mt-5">
              Lailas Hospital and IVF Centre is an established healthcare facility situated in
              Chemmad, Tirurangadi, Malappuram district. We are committed to providing responsible
              clinical care, particularly in women’s health, maternity, and fertility consultations.
            </p>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          MISSION — large editorial pull-quote
          ================================================================== */}
      <section className="py-16 sm:py-20">
        <Container width="wide">
          <div className="reveal relative isolate overflow-hidden rounded-3xl border border-line-soft bg-white px-7 py-12 sm:px-12 sm:py-14 lg:px-16">
            <div className="relative z-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="lg:self-center">
                <p className="eyebrow">Healthcare Mission (Proposed)</p>
                <h2 className="display mt-4 text-[clamp(1.75rem,1.2rem+2vw,2.5rem)]">
                  Our Guiding Objective
                </h2>
                <div
                  className="mt-7 h-1 w-16 rounded-full bg-coral-300"
                  aria-hidden="true"
                />
              </div>

              <figure className="border-t border-line-soft pt-9 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
                <Quote className="h-8 w-8 text-coral-300" aria-hidden="true" />
                <blockquote className="mt-5 font-display text-[clamp(1.375rem,1.05rem+1.4vw,1.875rem)] font-medium italic leading-[1.32] tracking-[-0.02em] text-brand-700">
                  “To provide compassionate, responsible healthcare that respects every individual’s
                  dignity and supports informed decisions at every stage of life.”
                </blockquote>
                <figcaption className="mt-7 text-xs leading-relaxed text-sand-500">
                  * Proposed institutional mission statement guiding our healthcare team and clinical
                  interactions.
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          CLINICAL PHILOSOPHY
          ================================================================== */}
      <section className="border-y border-line bg-white/60 py-16 sm:py-20">
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="reveal">
              <p className="eyebrow">Clinical Philosophy</p>
              <h2 className="display mt-4 text-[clamp(1.75rem,1.2rem+2vw,2.5rem)]">
                Patient-Centered Respect
              </h2>
            </div>

            <div className="reveal space-y-5 text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">
              <p>
                Medicine is most effective when technical skill is matched by genuine human
                listening. We emphasize clear, honest conversations about diagnosis and prognosis,
                ensuring patients and their families understand every step of their medical care.
              </p>
              <p>
                We avoid unnecessary interventions and prioritize patient comfort, safety, and
                informed consent.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          HERITAGE — asymmetric editorial grid
          ================================================================== */}
      <section className="py-16 sm:py-24">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="reveal max-w-2xl">
              <p className="eyebrow">Heritage &amp; Roots</p>
              <h2 className="display mt-4 text-[clamp(1.75rem,1.2rem+2.2vw,2.75rem)]">
                Serving Chemmad &amp; Malappuram District
              </h2>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">
                Public directories report that the institution was established in 1994, reflecting a
                multi-decade presence in the healthcare landscape of Chemmad. Over the years, the
                hospital has developed a distinct identity in obstetrics, gynaecology, and assisted
                fertility consultations.
              </p>
            </div>

            <aside className="reveal h-fit rounded-3xl border border-line-soft bg-white p-7 shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-sand-600">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <h3 className="font-sans text-base font-semibold text-brand-800">
                  Institutional Record Notice
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Operating entity: <em>Lailas Health Care Limited</em>. The 1994 foundation milestone
                and legal corporate filings are subject to ongoing administrative review. We maintain
                full transparency regarding clinical and operational claims.
              </p>
            </aside>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          LOCAL COMMITMENT
          ================================================================== */}
      <section className="pb-16 sm:pb-24">
        <Container width="wide">
          <div className="hairline mb-10" aria-hidden="true" />

          <div className="grid gap-6 md:grid-cols-3">
            {COMMITMENTS.map((item, i) => (
              <article
                key={item.title}
                data-reveal-index={i}
                className="reveal group rounded-xl border border-line-soft bg-white p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition-colors duration-500 group-hover:bg-brand-700 group-hover:text-white">
                  <item.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ==================================================================
          CONTACT & ENQUIRIES
          ================================================================== */}
      <section>
        <Container width="wide">
          <div className="reveal relative isolate overflow-hidden rounded-3xl bg-brand-900 px-8 py-12 text-white sm:px-14 sm:py-16">

            <div className="relative z-10 flex flex-col gap-9 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="display text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)] text-white">
                  Speak With Our Hospital Staff
                </h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-brand-200/75">
                  If you have questions about consultations, department schedules, or admissions, our
                  helpdesk team in Chemmad is available.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="coral" size="lg" onClick={() => onOpenAppointmentModal()}>
                  <CalendarCheck className="h-5 w-5" />
                  Book an Appointment
                </Button>
                <LinkButton variant="onDark" size="lg" href={`tel:${primaryPhone.tel}`}>
                  <Phone className="h-4 w-4 text-brand-300" />
                  <span className="tabular-numbers">{primaryPhone.display}</span>
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
