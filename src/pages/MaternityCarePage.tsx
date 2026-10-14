import React from 'react';
import {
  Phone,
  CalendarCheck,
  Heart,
  Baby,
  Clock,
  Check,
  ChevronDown,
  ShieldCheck,
  ShieldAlert,
  type LucideIcon,
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HOSPITAL_DATA, FAQS_DATA, CORE_DEPARTMENTS } from '../data/hospitalData';
import { Button, Container, LinkButton, SectionHeading } from '../components/ui';

import { maternityRoom as image } from '../assets/images';

interface MaternityCarePageProps {
  onNavigate: (path: string) => void;
  onOpenAppointmentModal: (department?: string) => void;
}

/** The three stages of maternity support, preserving the authored copy exactly. */
const CARE_STAGES: {
  number: string;
  title: string;
  body: string;
  icon: LucideIcon;
  points: string[];
}[] = [
  {
    number: '01',
    title: 'Antenatal Consultations',
    body: 'Regular clinical check-ups tracking maternal health, fetal growth milestones, blood pressure monitoring, and screening advice across all trimesters.',
    icon: Heart,
    points: [
      'Early pregnancy confirmation',
      'Nutritional & lifestyle advice',
      'Periodic obstetric evaluations',
    ],
  },
  {
    number: '02',
    title: 'Inpatient & Labor Care',
    body: 'A serene, medically equipped inpatient atmosphere where laboring mothers receive vigilant clinical supervision and respectful bedside care.',
    icon: Clock,
    points: [
      'Attentive obstetric nursing support',
      'Comfortable recovery rooms',
      'Immediate postpartum monitoring',
    ],
  },
  {
    number: '03',
    title: 'Postnatal & Newborn Care',
    body: 'Assisting mothers during the crucial postpartum recuperation period with lactation guidance, maternal recovery assessments, and newborn advice.',
    icon: Baby,
    points: [
      'Breastfeeding assistance',
      'Postnatal maternal recovery checks',
      'Pediatric wellness advice',
    ],
  },
];

export const MaternityCarePage: React.FC<MaternityCarePageProps> = ({
  onNavigate,
  onOpenAppointmentModal,
}) => {
  const maternityFaqs = FAQS_DATA.filter((f) => f.category === 'maternity');
  const maternityDepartment = CORE_DEPARTMENTS.find((d) => d.id === 'maternity-care');
  const primaryPhone = HOSPITAL_DATA.phones[0];

  return (
    <div className="pb-24">
      {/* ==================================================================
          PAGE HEADER — breadcrumbs, eyebrow, headline, intro
          ================================================================== */}
      <section className="relative isolate overflow-hidden border-b border-line bg-white/60 pb-14 pt-6">

        <Container width="wide" className="relative z-10">
          <Breadcrumbs items={[{ label: 'Maternity Care' }]} onNavigate={onNavigate} />

          <div className="reveal mt-8 max-w-3xl">
            <p className="eyebrow">Maternal Health &amp; Birth Care</p>
            <h1 className="display mt-4 text-[clamp(2.25rem,1.5rem+2.8vw,3.5rem)]">
              Care for You and Your Growing Family.
            </h1>
            <p className="lede mt-5">
              Every pregnancy is unique. We provide attentive antenatal monitoring, respectful
              maternity care, and reassuring postnatal guidance in Chemmad.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={() => onOpenAppointmentModal('maternity-care')}>
                <CalendarCheck className="h-5 w-5" />
                Enquire Maternity Care
              </Button>
              <LinkButton size="lg" variant="secondary" href={`tel:${primaryPhone.tel}`}>
                <Phone className="h-4 w-4 text-coral-600" />
                Call Maternity Desk: {primaryPhone.display}
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          IMMERSIVE IMAGE BAND
          ================================================================== */}
      <section className="pt-10 sm:pt-14">
        <Container width="wide">
          <div className="reveal relative isolate overflow-hidden rounded-[3rem] bg-brand-100 shadow-[var(--shadow-float)] ring-1 ring-black/5">
            <picture>
              <source type="image/webp" srcSet={image.webpSrcSet} sizes={image.sizes} />
              <img
                src={image.src}
                srcSet={image.webpSrcSet}
                sizes={image.sizes}
                alt="Maternity ward and mother-newborn care at Lailas Hospital"
                className="h-[20rem] w-full object-cover sm:h-[28rem] lg:h-[32rem]"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/65 via-brand-950/10 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center gap-3 sm:inset-x-8 sm:bottom-8">
              {maternityDepartment && (
                <span className="inline-flex items-center gap-2.5 rounded-full bg-white/95 px-5 py-3 text-sm font-semibold text-brand-800 shadow-[var(--shadow-lift)] backdrop-blur-sm">
                  <Clock className="h-4 w-4 text-sand-600" />
                  {maternityDepartment.availability}
                </span>
              )}
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4 text-brand-300" />
                {HOSPITAL_DATA.operatingHours.hospitalServices}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          WHAT THIS SERVICE COVERS
          ================================================================== */}
      <section className="py-16 sm:py-20">
        <Container width="wide">
          <div className="reveal grid gap-10 rounded-xl border border-line-soft bg-white p-8 sm:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className="eyebrow">Maternity &amp; Mother Care</p>
              <h2 className="display mt-4 text-[clamp(1.75rem,1.2rem+2.2vw,2.5rem)]">
                What our maternity service covers
              </h2>
              <p className="lede mt-5">{maternityDepartment?.shortDesc}</p>
              {maternityDepartment && (
                <span className="mt-7 inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
                  {maternityDepartment.status}
                </span>
              )}
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {(maternityDepartment?.services ?? []).map((service, i) => (
                <li
                  key={service}
                  data-reveal-index={i}
                  className="reveal flex items-start gap-3.5 rounded-2xl bg-canvas p-5"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sand-600" />
                  <span className="text-[0.9375rem] leading-relaxed text-ink-soft">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          STAGES OF SUPPORT — numbered care pathway
          ================================================================== */}
      <section className="border-y border-line bg-white/60 py-16 sm:py-20">
        <Container width="wide">
          <div className="reveal">
            <SectionHeading
              eyebrow="Stages of Support"
              title="Personalised Care Across the Pregnancy Journey"
              description="We work closely with expectant mothers to foster physical well-being, emotional reassurance, and informed birth planning."
            />
          </div>

          <ol className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-6">
            {CARE_STAGES.map((stage, i) => (
              <li key={stage.number} data-reveal-index={i} className="reveal relative flex flex-col">
                <div className="flex items-center gap-4">
                  <span className="display grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-700 text-xl text-white shadow-[0_10px_30px_-12px_rgba(14,79,76,0.65)]">
                    {stage.number}
                  </span>
                  <span
                    className={`h-px flex-1 bg-line ${i === CARE_STAGES.length - 1 ? 'hidden' : 'hidden lg:block'}`}
                    aria-hidden="true"
                  />
                </div>

                <article className="mt-6 flex flex-1 flex-col rounded-xl border border-line-soft bg-white p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[var(--shadow-lift)]">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                    <stage.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl">{stage.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {stage.body}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-t border-line-soft pt-5">
                    {stage.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-sand-500" />
                        <span className="text-[0.9375rem] leading-relaxed text-ink-soft">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ==================================================================
          EMERGENCY LABOR NOTICE — dark emphasis band
          ================================================================== */}
      <section className="relative isolate overflow-hidden bg-brand-900 py-16 text-white sm:py-20">

        <Container width="wide" className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-16">
            <div className="reveal">
              <p className="eyebrow flex items-center gap-2 text-brand-300">
                <ShieldAlert className="h-4 w-4" />
                {HOSPITAL_DATA.operatingHours.emergencyCasualty}
              </p>
              <h2 className="display mt-4 text-[clamp(1.75rem,1.3rem+2vw,2.5rem)] text-white">
                Emergency Labor &amp; Obstetric Situations:
              </h2>
              <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-brand-200/85 sm:text-base">
                If you experience onset of labor pains, rupture of membranes (water breaking), severe
                abdominal discomfort, or decreased fetal movements, proceed immediately to the
                hospital casualty or call our 24/7 reception desk at{' '}
                <a
                  href={`tel:${primaryPhone.tel}`}
                  className="tabular-numbers font-semibold text-white underline decoration-white/40 underline-offset-4"
                >
                  {primaryPhone.display}
                </a>
                .
              </p>
            </div>

            <div className="reveal flex flex-col gap-3 lg:items-end">
              <LinkButton variant="secondary" size="lg" href={`tel:${primaryPhone.tel}`}>
                <Phone className="h-4 w-4 text-coral-600" />
                <span className="tabular-numbers">{primaryPhone.display}</span>
              </LinkButton>
              <Button
                variant="onDark"
                size="lg"
                onClick={() => onOpenAppointmentModal('maternity-care')}
              >
                <CalendarCheck className="h-4 w-4" />
                Enquire Maternity Care
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          MATERNITY QUESTIONS
          ================================================================== */}
      <section className="py-16 sm:py-20">
        <Container width="default">
          <div className="reveal">
            <SectionHeading
              eyebrow="Common Inquiries"
              title="Maternity Questions"
              description="Answers to the questions expectant mothers most often ask our team."
            />
          </div>

          <div className="mt-10 divide-y divide-line overflow-hidden rounded-[2rem] border border-line-soft bg-white">
            {maternityFaqs.map((faq, index) => (
              <details
                key={faq.question}
                className="reveal group px-6 sm:px-8"
                data-reveal-index={index}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-lg leading-snug text-brand-800">
                    {faq.question}
                  </span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-canvas text-brand-700 transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </summary>
                <p className="max-w-3xl pb-6 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* ==================================================================
          CLOSING CALL TO ACTION
          ================================================================== */}
      <section className="pb-24">
        <Container width="wide">
          <div className="reveal grid gap-9 rounded-xl border border-line bg-white p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
            <div>
              <p className="eyebrow">Maternity &amp; Mother Care</p>
              <h2 className="display mt-4 text-[clamp(1.75rem,1.3rem+2vw,2.5rem)]">
                Plan your antenatal visits with us
              </h2>
              <p className="lede mt-5">
                Share your expected delivery timeline with our maternity desk in Chemmad and we will
                help you arrange antenatal consultations, inpatient care and postnatal follow-up.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="w-full"
                onClick={() => onOpenAppointmentModal('maternity-care')}
              >
                <CalendarCheck className="h-5 w-5" />
                Enquire Maternity Care
              </Button>
              <LinkButton
                size="lg"
                variant="secondary"
                className="w-full"
                href={`tel:${primaryPhone.tel}`}
              >
                <Phone className="h-4 w-4 text-coral-600" />
                Call Maternity Desk: {primaryPhone.display}
              </LinkButton>
              <button
                onClick={() => onNavigate('/obstetrics-gynaecology')}
                className="mt-1 inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-700 transition-colors duration-300 hover:text-brand-900"
              >
                Explore obstetrics &amp; gynaecology
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
