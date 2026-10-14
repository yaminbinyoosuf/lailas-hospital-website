import React, { useState } from 'react';
import {
  Phone,
  CalendarCheck,
  ArrowRight,
  Activity,
  Heart,
  ShieldCheck,
  Users,
  Sparkles,
  Baby,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { HOSPITAL_DATA, FAQS_DATA, CORE_DEPARTMENTS } from '../data/hospitalData';
import { Button, Container, LinkButton, SectionHeading } from '../components/ui';

interface ObstetricsGynaecologyPageProps {
  onNavigate: (path: string) => void;
  onOpenAppointmentModal: (department?: string) => void;
}

/** The six clinical focus areas, preserving the authored copy exactly. */
const FOCUS_AREAS: { number: string; title: string; body: string; icon: LucideIcon }[] = [
  {
    number: '01',
    title: 'Menstrual & Hormonal Wellness',
    body: 'Consultations for irregular menstrual cycles, polycystic ovarian syndrome (PCOS), painful periods, and hormonal imbalances.',
    icon: Activity,
  },
  {
    number: '02',
    title: 'Pre-Conception Planning',
    body: 'Guidance for couples preparing for pregnancy, assessing maternal baseline health, nutritional supplementation, and family planning.',
    icon: Heart,
  },
  {
    number: '03',
    title: 'Preventative Screenings',
    body: 'Routine pelvic examinations, cervical health screenings, breast wellness reviews, and preventative healthcare discussions.',
    icon: ShieldCheck,
  },
  {
    number: '04',
    title: 'Adolescent Gynaecology',
    body: 'Gentle, empathetic care for young women experiencing early reproductive or pubertal health concerns in a reassuring setting.',
    icon: Users,
  },
  {
    number: '05',
    title: 'Perimenopause & Menopause',
    body: 'Support during transitional phases, managing symptoms such as hot flashes, bone density considerations, and overall wellness.',
    icon: Sparkles,
  },
  {
    number: '06',
    title: 'Pregnancy Consultations',
    body: 'Ongoing clinical monitoring from early gestation through antenatal visits in tandem with our maternity team.',
    icon: Baby,
  },
];

export const ObstetricsGynaecologyPage: React.FC<ObstetricsGynaecologyPageProps> = ({
  onNavigate,
  onOpenAppointmentModal,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const obgynFaqs = FAQS_DATA.filter((f) => f.category === 'obgyn');
  const obgynDepartment = CORE_DEPARTMENTS.find((d) => d.id === 'obstetrics-gynaecology');
  const primaryPhone = HOSPITAL_DATA.phones[0];

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="pb-24">
      {/* ==================================================================
          PAGE HEADER — breadcrumbs, eyebrow, headline, intro
          ================================================================== */}
      <section className="relative isolate overflow-hidden border-b border-line bg-white/60 pb-14 pt-6">

        <Container width="wide" className="relative z-10">
          <Breadcrumbs items={[{ label: 'Obstetrics & Gynaecology' }]} onNavigate={onNavigate} />

          <div className="reveal mt-8 max-w-3xl">
            <p className="eyebrow">Women’s Clinical Care</p>
            <h1 className="display mt-4 text-[clamp(2.25rem,1.5rem+2.8vw,3.5rem)]">
              Dedicated Care for Every Stage of Womanhood.
            </h1>
            <p className="lede mt-5">
              Our Obstetrics and Gynaecology department provides attentive outpatient consultations,
              preventative reproductive wellness screenings, and clinical support across all age
              groups.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={() => onOpenAppointmentModal('obstetrics-gynaecology')}>
                <CalendarCheck className="h-5 w-5" />
                Book Gynaecology Consultation
              </Button>
              <LinkButton size="lg" variant="secondary" href={`tel:${primaryPhone.tel}`}>
                <Phone className="h-4 w-4 text-coral-600" />
                Reception: {primaryPhone.display}
              </LinkButton>
            </div>
          </div>

          {/* Verified visiting facts */}
          <dl className="mt-14 grid gap-8 border-t border-line pt-9 sm:grid-cols-3">
            {[
              { k: 'Outpatient consultations', v: HOSPITAL_DATA.operatingHours.opdConsultations },
              { k: 'Emergency casualty', v: HOSPITAL_DATA.operatingHours.emergencyCasualty },
              { k: 'Reception & enquiries', v: primaryPhone.display },
            ].map((row, i) => (
              <div key={row.k} className="reveal" data-reveal-index={i}>
                <dt className="text-sm text-ink-soft">{row.k}</dt>
                <dd className="mt-1.5 text-[0.9375rem] font-semibold leading-snug text-brand-800">
                  {i === 2 ? <span className="tabular-numbers">{row.v}</span> : row.v}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ==================================================================
          WHAT THIS SERVICE COVERS — numbered focus areas
          ================================================================== */}
      <section className="py-16 sm:py-20">
        <Container width="wide">
          <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Clinical Focus Areas"
              title="General & Specialized Gynaecological Care"
              description={obgynDepartment?.shortDesc}
            />
            {obgynDepartment && (
              <span className="shrink-0 self-start rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 md:self-auto">
                {obgynDepartment.availability}
              </span>
            )}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FOCUS_AREAS.map((area, i) => (
              <article
                key={area.title}
                data-reveal-index={i}
                className="reveal group flex flex-col rounded-xl border border-line-soft bg-white p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition-colors duration-500 group-hover:bg-brand-700 group-hover:text-white">
                    <area.icon className="h-6 w-6" />
                  </span>
                  <span className="display text-[1.75rem] leading-none text-brand-300 transition-colors duration-500 group-hover:text-brand-400">
                    {area.number}
                  </span>
                </div>
                <h3 className="mt-5 text-xl">{area.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{area.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ==================================================================
          CONSULTANT PRESENCE — dark emphasis panel
          ================================================================== */}
      <section className="pb-16 sm:pb-20">
        <Container width="wide">
          <div className="reveal relative isolate overflow-hidden rounded-[3rem] bg-brand-800 px-8 py-12 text-white sm:px-12 sm:py-16 lg:px-16">

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
              <div>
                <p className="eyebrow flex items-center gap-2 text-brand-300">
                  <Heart className="h-4 w-4" />
                  Consultant Presence
                </p>
                <h2 className="display mt-4 text-[clamp(1.75rem,1.3rem+2vw,2.5rem)] text-white">
                  Dr. Laila Beegum N. &amp; Department Specialists
                </h2>
                <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-brand-200/85 sm:text-base">
                  Dr. Laila Beegum N. has long been associated with the public healthcare identity of
                  Lailas Hospital in Chemmad. Consultations are scheduled on specified days.
                </p>

                <div className="mt-7 flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/5 p-6">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-300" />
                  <p className="text-sm leading-relaxed text-brand-200/75">
                    * Please call reception to verify daily clinic timings before visiting.
                    Qualifications, credentials, and full clinical schedules are subject to
                    confirmation by hospital administration.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={() => onOpenAppointmentModal('obstetrics-gynaecology')}
                >
                  <CalendarCheck className="h-5 w-5" />
                  Enquire Consultation
                </Button>
                <Button
                  variant="onDark"
                  size="lg"
                  className="w-full"
                  onClick={() => onNavigate('/doctors')}
                >
                  View Doctor Roster
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <LinkButton
                  variant="onDark"
                  size="lg"
                  className="w-full"
                  href={`tel:${primaryPhone.tel}`}
                >
                  <Phone className="h-4 w-4 text-brand-300" />
                  <span className="tabular-numbers">{primaryPhone.display}</span>
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          FREQUENTLY ASKED QUESTIONS
          ================================================================== */}
      <section className="pb-16 sm:pb-20">
        <Container width="default">
          <div className="reveal">
            <SectionHeading
              align="center"
              eyebrow="Common Inquiries"
              title="Frequently Asked Questions"
              description="A few practical answers before booking a gynaecology consultation."
            />
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {obgynFaqs.map((faq, index) => {
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
        </Container>
      </section>

      {/* ==================================================================
          CLOSING CALL TO ACTION
          ================================================================== */}
      <section className="pb-24">
        <Container width="wide">
          <div className="reveal relative isolate overflow-hidden rounded-3xl border border-coral-100 bg-coral-50 px-8 py-14 text-center sm:px-14">
            <div className="relative z-10">
              <p className="eyebrow text-coral-600">Appointments</p>
              <h2 className="display mx-auto mt-4 max-w-2xl text-[clamp(1.75rem,1.3rem+2vw,2.75rem)]">
                Talk to our women’s health team
              </h2>
              <p className="lede mx-auto mt-5 max-w-xl">
                Enquire about outpatient consultations, preventative screenings or a specific
                concern — our reception desk in Chemmad will help you find a suitable appointment.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button
                  size="lg"
                  onClick={() => onOpenAppointmentModal('obstetrics-gynaecology')}
                >
                  <CalendarCheck className="h-5 w-5" />
                  Book Gynaecology Consultation
                </Button>
                <LinkButton size="lg" variant="secondary" href={`tel:${primaryPhone.tel}`}>
                  <Phone className="h-4 w-4 text-coral-600" />
                  Reception: {primaryPhone.display}
                </LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
