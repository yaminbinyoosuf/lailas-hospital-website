import React, { useState } from 'react';
import {
  Phone,
  CalendarCheck,
  Calendar,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  Heart,
  ShieldCheck,
  MessageSquare,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HOSPITAL_DATA, FAQS_DATA, CORE_DEPARTMENTS } from '../data/hospitalData';
import { Button, Container, LinkButton, SectionHeading, Stat } from '../components/ui';

import { consultationRoom as image } from '../assets/images';

interface IvfFertilityPageProps {
  onNavigate: (path: string) => void;
  onOpenAppointmentModal: (department?: string) => void;
}

/** The four-step consultation pathway, preserving the authored copy exactly. */
const CONSULTATION_STEPS: { number: string; title: string; body: string; icon: LucideIcon }[] = [
  {
    number: '01.',
    title: 'Appointment Request',
    body: 'Enquire online or call hospital reception on +91 8606 800 999 or 0494 2463377 to schedule an appointment with our reproductive medicine team.',
    icon: CalendarCheck,
  },
  {
    number: '02.',
    title: 'Detailed History',
    body: 'A private review of your health background, previous medical reports, menstrual cycles, and couple health history.',
    icon: ClipboardList,
  },
  {
    number: '03.',
    title: 'Targeted Evaluation',
    body: 'Discussing relevant diagnostic investigations, such as hormonal profiling or pelvic imaging, only when clinically indicated.',
    icon: FileText,
  },
  {
    number: '04.',
    title: 'Informed Pathway',
    body: 'Clear, realistic guidance on appropriate next steps, lifestyle measures, and medical options tailored to your circumstances.',
    icon: MessageSquare,
  },
];

/** Records patients are asked to bring to a first fertility consultation. */
const FIRST_VISIT_RECORDS = [
  'Previous ultrasound or pelvic scan reports completed in the past 12 months.',
  'Prior blood investigation reports (such as thyroid, prolactin, or hormone panels).',
  'Any prior surgical summaries or laparoscopic reports, if applicable.',
  'Semen analysis reports for male partner evaluation, if previously conducted.',
];

export const IvfFertilityPage: React.FC<IvfFertilityPageProps> = ({
  onNavigate,
  onOpenAppointmentModal,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const ivfFaqs = FAQS_DATA.filter((f) => f.category === 'ivf');
  const ivfDepartment = CORE_DEPARTMENTS.find((d) => d.id === 'ivf-fertility');
  const coverage = ivfDepartment?.services ?? [];
  const primaryPhone = HOSPITAL_DATA.phones[0];

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="pb-24">
      {/* ==================================================================
          PAGE HEADER — breadcrumbs, eyebrow, headline, intro, image
          ================================================================== */}
      <section className="relative isolate overflow-hidden border-b border-line bg-white/60 pb-14 pt-6">

        <Container width="wide" className="relative z-10">
          <Breadcrumbs items={[{ label: 'IVF & Fertility Centre' }]} onNavigate={onNavigate} />

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="reveal">
              <p className="eyebrow">Fertility &amp; Reproductive Health</p>
              <h1 className="display mt-4 text-[clamp(2.25rem,1.5rem+2.8vw,3.5rem)]">
                Every Fertility Journey Is Different.
              </h1>
              <p className="lede mt-5 max-w-xl">
                Fertility care begins with understanding your concerns, discussing appropriate
                evaluations, and exploring the options available to you with a qualified medical
                professional.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" onClick={() => onOpenAppointmentModal('ivf-fertility')}>
                  <CalendarCheck className="h-5 w-5" />
                  Enquire About Fertility Care
                </Button>
                <LinkButton size="lg" variant="secondary" href={`tel:${primaryPhone.tel}`}>
                  <Phone className="h-4 w-4 text-coral-600" />
                  Call Helpdesk: {primaryPhone.display}
                </LinkButton>
              </div>

              <p className="mt-8 border-t border-line pt-5 text-sm leading-relaxed text-ink-soft">
                * Consultations are conducted confidentially in a quiet, supportive clinical
                environment.
              </p>
            </div>

            <div className="reveal relative">
              <div className="overflow-hidden rounded-3xl bg-brand-100 shadow-[var(--shadow-float)] ring-1 ring-black/5">
                <picture>
              <source type="image/webp" srcSet={image.webpSrcSet} sizes={image.sizes} />
              <img
                src={image.src}
                srcSet={image.webpSrcSet}
                sizes={image.sizes}
                alt="Medical consultation for fertility care at Lailas Hospital"
                className="h-[20rem] w-full object-cover sm:h-[26rem] lg:h-[30rem]"
                loading="lazy"
                decoding="async"
              />
            </picture>
              </div>
              <div className="absolute -bottom-5 left-6 hidden items-center gap-3 rounded-xl bg-white/95 px-5 py-4 shadow-[var(--shadow-lift)] ring-1 ring-black/5 backdrop-blur-sm sm:flex lg:-left-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-700 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-brand-800">Confidential consultations</p>
                  <p className="tabular-numbers mt-0.5 text-xs text-ink-soft">
                    {primaryPhone.display}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust strip — verified hospital facts */}
          <div className="mt-16 grid gap-8 border-t border-line pt-9 sm:grid-cols-3">
            {[
              { value: '1994', label: 'Serving Chemmad since (reported milestone)' },
              { value: primaryPhone.display, label: primaryPhone.label },
              { value: '24/7', label: 'Emergency & casualty readiness' },
            ].map((item, i) => (
              <div key={item.label} className="reveal" data-reveal-index={i}>
                <Stat
                  value={<span className="tabular-numbers">{item.value}</span>}
                  label={item.label}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ==================================================================
          WHAT THIS SERVICE COVERS
          ================================================================== */}
      <section className="py-16 sm:py-20">
        <Container width="wide">
          <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Clinical coverage"
              title="What our fertility consultations cover"
              description={ivfDepartment?.shortDesc}
            />
            {ivfDepartment && (
              <span className="shrink-0 self-start rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 md:self-auto">
                {ivfDepartment.status}
              </span>
            )}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coverage.map((service, i) => (
              <article
                key={service}
                data-reveal-index={i % 6}
                className="reveal flex items-start gap-4 rounded-xl border border-line-soft bg-white p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand-300"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                  <Check className="h-5 w-5" />
                </span>
                <p className="text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">
                  {service}
                </p>
              </article>
            ))}
          </div>

          {ivfDepartment && (
            <p className="reveal mt-8 flex items-center gap-2.5 text-sm text-ink-soft">
              <Calendar className="h-4 w-4 shrink-0 text-sand-600" />
              {ivfDepartment.title} — {ivfDepartment.availability}
            </p>
          )}
        </Container>
      </section>

      {/* ==================================================================
          CARE PATHWAY — numbered consultation steps
          ================================================================== */}
      <section className="border-y border-line bg-white/60 py-16 sm:py-20">
        <Container width="wide">
          <div className="reveal">
            <SectionHeading
              eyebrow="Patient Journey"
              title="How Fertility Consultation Works"
              description="We structure discussions so you have time to ask questions, understand diagnostic tests, and make decisions at your own pace."
            />
          </div>

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONSULTATION_STEPS.map((step, i) => (
              <li
                key={step.number}
                data-reveal-index={i}
                className="reveal group relative flex flex-col rounded-xl border border-line-soft bg-white p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="display text-[2.5rem] leading-none text-brand-300 transition-colors duration-500 group-hover:text-brand-400">
                    {step.number}
                  </span>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-canvas text-brand-700 transition-colors duration-500 group-hover:bg-brand-700 group-hover:text-white">
                    <step.icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-5 text-lg">{step.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ==================================================================
          FIRST VISIT PREPARATION
          ================================================================== */}
      <section className="py-16 sm:py-20">
        <Container width="wide">
          <div className="reveal grid gap-10 rounded-xl border border-line-soft bg-white p-8 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow">First Visit Preparation</p>
              <h2 className="display mt-4 text-[clamp(1.75rem,1.2rem+2.2vw,2.5rem)]">
                What to Bring to Your First Visit
              </h2>
              <p className="lede mt-5">
                Bringing previous clinical records avoids redundant testing and helps the doctor
                understand your timeline accurately.
              </p>
            </div>

            <ul className="space-y-3">
              {FIRST_VISIT_RECORDS.map((record, i) => (
                <li
                  key={record}
                  data-reveal-index={i}
                  className="reveal flex items-start gap-3.5 rounded-2xl bg-canvas p-5 text-[0.9375rem] leading-relaxed text-ink-soft"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-sand-600" />
                  <span>{record}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          CLINICAL COMMITMENT — dark emphasis band
          ================================================================== */}
      <section className="relative isolate overflow-hidden bg-brand-900 py-16 text-white sm:py-20">

        <Container width="wide" className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="reveal">
              <p className="eyebrow flex items-center gap-2 text-brand-300">
                <Heart className="h-4 w-4" />
                Our Clinical Commitment
              </p>
              <h2 className="display mt-4 text-[clamp(1.875rem,1.3rem+2.2vw,2.75rem)] text-white">
                Responsible Reproductive Guidance
              </h2>
            </div>

            <div className="reveal space-y-6">
              <p className="text-[0.9375rem] leading-relaxed text-brand-200/85 sm:text-base">
                At Lailas Hospital and IVF Centre, we maintain the highest ethical standards. We do
                not make misleading claims regarding pregnancy guarantees or arbitrary success
                statistics. Fertility treatment involves physiological, biological, and personal
                factors that differ for every person.
              </p>

              <div className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/5 p-6">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
                <p className="text-sm leading-relaxed text-brand-200/75">
                  Specific medical procedures and laboratory facilities are discussed directly
                  during your clinical consultation based on up-to-date hospital capabilities and
                  regulatory guidelines.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          FREQUENTLY ASKED QUESTIONS
          ================================================================== */}
      <section className="py-16 sm:py-20">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div className="reveal lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Common Inquiries"
                title="Frequently Asked Questions"
                description="Questions patients and couples most often ask before a first fertility appointment."
              />
            </div>

            <div className="space-y-3">
              {ivfFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={faq.question}
                    data-reveal-index={index}
                    className={`reveal overflow-hidden rounded-3xl border bg-white transition-colors duration-300 ${
                      isOpen ? 'border-brand-200' : 'border-line-soft'
                    }`}
                  >
                    <h3>
                      <button
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors duration-300 hover:bg-brand-50/50"
                      >
                        <span className="font-display text-lg leading-snug text-brand-800">
                          {faq.question}
                        </span>
                        <span
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                            isOpen ? 'bg-brand-700 text-white' : 'bg-canvas text-brand-700'
                          }`}
                        >
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      </button>
                    </h3>
                    {isOpen && (
                      <p className="border-t border-line-soft px-6 py-5 text-[0.9375rem] leading-relaxed text-ink-soft">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          CLOSING CALL TO ACTION
          ================================================================== */}
      <section className="pb-24">
        <Container width="wide">
          <div className="reveal relative isolate overflow-hidden rounded-3xl border border-line bg-white px-8 py-14 text-center sm:px-14">
            <div className="relative z-10">
              <p className="eyebrow">Fertility &amp; Reproductive Health</p>
              <h2 className="display mx-auto mt-4 max-w-2xl text-[clamp(1.75rem,1.3rem+2vw,2.75rem)]">
                Begin with a Private Consultation
              </h2>
              <p className="lede mx-auto mt-5 max-w-xl">
                Contact our Chemmad reception desk to enquire about availability and schedule an
                appointment suited to your timing.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" onClick={() => onOpenAppointmentModal('ivf-fertility')}>
                  <CalendarCheck className="h-5 w-5" />
                  Enquire Online
                </Button>
                <LinkButton size="lg" variant="secondary" href={`tel:${primaryPhone.tel}`}>
                  <Phone className="h-4 w-4 text-coral-600" />
                  Call Reception: {primaryPhone.display}
                </LinkButton>
              </div>
              <button
                onClick={() => onNavigate('/contact')}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors duration-300 hover:text-brand-900"
              >
                See location &amp; contact details
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
