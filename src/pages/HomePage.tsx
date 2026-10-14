import React, { useMemo, useState } from 'react';
import {
  Phone,
  CalendarCheck,
  ArrowRight,
  MapPin,
  Clock,
  Heart,
  Baby,
  Activity,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  Stethoscope,
  FlaskConical,
  Pill,
  Ambulance,
  Sparkles,
  Users,
  MessageCircle,
  Siren,
  Scan,
} from 'lucide-react';
import {
  HOSPITAL_DATA,
  SPECIALITIES,
  SPECIALITY_CATEGORIES,
  DOCTORS_DATA,
  FAQS_DATA,
  HOSPITAL_HIGHLIGHTS,
  HOSPITAL_PILLARS,
  IVF_PATHWAY,
  whatsappUrl,
  WHATSAPP_MESSAGES,
  type SpecialityIcon,
} from '../data/hospitalData';
import { Button, LinkButton, Container, SectionHeading } from '../components/ui';
import { SearchBar } from '../components/SearchBar';
import { FaqAccordion } from '../components/FaqAccordion';
import { PatientPortal } from '../components/PatientPortal';
import { Testimonials } from '../components/TrustSignals';
import { heroLobby } from '../assets/images';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenAppointmentModal: (department?: string) => void;
  /** Jump straight to the booking wizard's doctor step for a department. */
  onBookSpeciality: (specialityId: string) => void;
  /** Open the symptom guidance assistant. */
  onOpenTriage: () => void;
}

const SPECIALITY_ICONS: Record<SpecialityIcon, React.ElementType> = {
  baby: Baby,
  heart: Heart,
  brain: Activity,
  bone: Scan,
  child: Users,
  stethoscope: Stethoscope,
  flask: FlaskConical,
  pill: Pill,
  ambulance: Ambulance,
  sparkles: Sparkles,
};

/** Deep links to the dedicated detail pages, where they exist. */
const DEPT_ROUTES: Record<string, string> = {
  'ivf-fertility': '/ivf-fertility',
  'obstetrics-gynaecology': '/obstetrics-gynaecology',
  'maternity-care': '/maternity',
};

const PILLAR_DOT: Record<string, string> = {
  brand: 'bg-brand-600',
  coral: 'bg-coral-500',
  teal: 'bg-brand-400',
};

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAppointmentModal,
  onBookSpeciality,
  onOpenTriage,
}) => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(HOSPITAL_DATA.address.fullFormatted);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const primary = HOSPITAL_DATA.primary;

  /** Grouped once so the speciality grid does not re-filter on every render. */
  const groupedSpecialities = useMemo(
    () =>
      SPECIALITY_CATEGORIES.map((category) => ({
        category,
        items: SPECIALITIES.filter((s) => s.category === category),
      })).filter((group) => group.items.length > 0),
    [],
  );

  return (
    <div className="overflow-x-clip">
      {/* ==================================================================
          1. HERO
          ================================================================== */}
      <section className="relative isolate overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div
          className="wash -left-24 -top-32 h-[26rem] w-[26rem] bg-brand-200/70"
          aria-hidden="true"
        />
        <div
          className="wash right-[-10%] top-24 h-[22rem] w-[22rem] bg-coral-200/40"
          aria-hidden="true"
        />


        <Container width="wide" className="relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* Copy */}
            <div className="reveal animate-enter">
              <span className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-brand-200/80 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-brand-800 backdrop-blur-sm">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
                </span>
                Trusted since {HOSPITAL_DATA.establishedYear} ·{' '}
                <strong className="font-bold text-brand-700">
                  {HOSPITAL_DATA.metrics.safeBirths} little miracles
                </strong>{' '}
                delivered
              </span>

              <h1 className="display mt-6 text-[clamp(2.25rem,1.5rem+3.2vw,3.75rem)]">
                Compassionate women’s health, safe deliveries &amp;{' '}
                <span className="text-coral-500">advanced IVF care</span>
              </h1>

              <p className="lede mt-6 max-w-xl">
                From your first prenatal heartbeat to fertility treatment and 24/7 paediatric care,
                Lailas Hospital and IVF Centre blends three decades of trusted maternal care in
                Malappuram with modern reproductive medicine.
              </p>

              {/* Instant search */}
              <div className="mt-7">
                <SearchBar
                  onBookSpeciality={onBookSpeciality}
                  onNavigate={onNavigate}
                  onOpenTriage={onOpenTriage}
                />
                <p className="mt-2.5 text-sm text-ink-soft">
                  Not sure what you need?{' '}
                  <button
                    type="button"
                    onClick={onOpenTriage}
                    className="inline-flex min-h-11 items-center font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-900"
                  >
                    Describe your symptoms
                  </button>{' '}
                  and we will point you to the right clinic.
                </p>
              </div>

              {/* Primary actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button size="lg" onClick={() => onOpenAppointmentModal()}>
                  <CalendarCheck className="h-5 w-5" />
                  Book an appointment
                </Button>
                <LinkButton
                  size="lg"
                  variant="secondary"
                  href={whatsappUrl(WHATSAPP_MESSAGES.fertility)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  Talk to a fertility specialist
                </LinkButton>
              </div>

              {/* Emergency line */}
              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6">
                <a href={`tel:${primary.tel}`} className="group flex min-h-11 items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-100">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs text-ink-soft">24/7 appointments &amp; emergency</span>
                    <span className="tabular-numbers text-lg font-semibold text-brand-800">
                      {primary.display}
                    </span>
                  </span>
                </a>

                <div className="flex items-center gap-2.5 text-sm text-ink-soft">
                  <Clock className="h-4 w-4 text-coral-600" aria-hidden="true" />
                  Emergency, lab &amp; pharmacy open 24 hours
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="reveal relative">
              <div className="relative overflow-hidden rounded-3xl bg-brand-100 shadow-[var(--shadow-float)] ring-1 ring-black/5">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={heroLobby.webpSrcSet}
                    sizes={heroLobby.sizes}
                  />
                  <img
                    src={heroLobby.fallback ?? heroLobby.src}
                    srcSet={heroLobby.jpgSrcSet}
                    sizes={heroLobby.sizes}
                    alt="Reception and patient waiting lounge at Lailas Hospital and IVF Centre, Chemmad"
                    className="aspect-[4/5] w-full object-cover object-[90%_50%] sm:aspect-[3/4]"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/65 via-brand-950/5 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-5 left-14 right-5 flex items-start gap-2.5 text-white sm:bottom-6 sm:left-24">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                  <span className="text-sm font-medium leading-snug">
                    {HOSPITAL_DATA.address.building}, {HOSPITAL_DATA.address.street}, Chemmad
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          2. CONFIRMED TRUST METRICS
          ================================================================== */}
      <section className="border-y border-line bg-white/60" aria-label="Hospital highlights">
        <Container width="wide">
          <div className="grid grid-cols-2 gap-8 py-11 lg:grid-cols-4">
            {HOSPITAL_HIGHLIGHTS.map((item, i) => (
              <div key={item.label} className="reveal" data-reveal-index={i}>
                <p className={`display text-[clamp(1.5rem,1.2rem+1.3vw,2.25rem)] ${item.accent}`}>
                  {item.value}
                </p>
                <p className="mt-1.5 text-sm leading-snug text-ink-soft">{item.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ==================================================================
          3. SPECIALITIES
          ================================================================== */}
      <section className="py-20 sm:py-24" aria-labelledby="specialities-heading">
        <Container width="wide">
          <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Comprehensive care under one roof"
              title={
                <span id="specialities-heading">Our core medical &amp; fertility specialities</span>
              }
              description="Compassionate family medicine combined with advanced diagnostic and reproductive technology, for women, children and families across Malappuram."
            />
            <Button
              variant="secondary"
              onClick={() => onNavigate('/departments')}
              className="shrink-0 self-start md:self-auto"
            >
              All departments
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {groupedSpecialities.map((group) => (
              <React.Fragment key={group.category}>
                <h3 className="col-span-full mt-8 flex items-center gap-3 first:mt-0">
                  <span className="text-lg text-brand-800">{group.category}</span>
                  <span className="hairline flex-1" aria-hidden="true" />
                </h3>
                {group.items.map((dept, i) => {
                  const Icon = SPECIALITY_ICONS[dept.icon] ?? Heart;
                  return (
                    <article
                      key={dept.id}
                      data-reveal-index={i}
                      className="reveal group relative flex flex-col overflow-hidden rounded-3xl border border-line-soft bg-white p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[var(--shadow-lift)]"
                    >

                      <div className="flex items-start justify-between gap-3">
                        <span className="grid h-13 w-13 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition-colors duration-500 group-hover:bg-brand-700 group-hover:text-white">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        {dept.id === 'maternity-care' && (
                          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                            {HOSPITAL_DATA.metrics.safeBirths} births
                          </span>
                        )}
                      </div>

                      <h4 className="mt-5 text-xl sm:text-[1.375rem]">{dept.title}</h4>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                        {dept.shortDesc}
                      </p>

                      <ul className="mt-5 space-y-2.5 text-sm text-ink-soft">
                        {dept.services.slice(0, 3).map((srv) => (
                          <li key={srv} className="flex items-start gap-2.5">
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-sand-500"
                              aria-hidden="true"
                            />
                            <span>{srv}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7 flex items-center justify-between gap-3 border-t border-line-soft pt-5">
                        <span className="text-xs font-medium text-coral-600">
                          {dept.availability}
                        </span>
                        <div className="flex items-center gap-2">
                          {DEPT_ROUTES[dept.id] && (
                            <button
                              onClick={() => onNavigate(DEPT_ROUTES[dept.id])}
                              className="min-h-11 whitespace-nowrap rounded-full px-2.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900"
                            >
                              Learn more
                            </button>
                          )}
                          <button
                            onClick={() => onBookSpeciality(dept.id)}
                            className="grid min-h-11 min-w-11 place-items-center rounded-full bg-canvas text-brand-700 transition-all duration-300 hover:bg-brand-700 hover:text-white"
                            aria-label={`Book ${dept.title}`}
                          >
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </Container>
      </section>

      {/* ==================================================================
          4. IVF CARE PATHWAY
          ================================================================== */}
      <section
        className="relative isolate overflow-hidden bg-brand-800 py-20 text-white sm:py-24"
        aria-labelledby="ivf-heading"
      >

        <Container width="wide" className="relative z-10">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="reveal">
              <p className="eyebrow text-brand-300">Lailas IVF &amp; Fertility Centre</p>
              <h2
                id="ivf-heading"
                className="display mt-4 text-[clamp(1.875rem,1.3rem+2.4vw,3rem)] text-white"
              >
                Walking beside you on your path to parenthood
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-brand-200/85">
                Fertility journeys need patience, privacy and emotional warmth. Our Chemmad centre
                offers personalised, affordable fertility protocols with complete confidentiality.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button
                  variant="coral"
                  size="lg"
                  onClick={() => onOpenAppointmentModal('ivf-fertility')}
                >
                  Private IVF counselling
                </Button>
                <LinkButton
                  variant="onDark"
                  size="lg"
                  href={whatsappUrl(WHATSAPP_MESSAGES.fertility)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp a fertility coordinator
                </LinkButton>
              </div>

              <p className="mt-6 flex items-start gap-2.5 rounded-[1.75rem] border border-white/15 bg-white/5 p-4 text-sm leading-relaxed text-brand-200/80">
                <ShieldCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-300"
                  aria-hidden="true"
                />
                Every fertility discussion is held privately. We do not publish success-rate
                statistics, because outcomes depend on individual clinical factors.
              </p>
            </div>

            {/* 4-step pathway */}
            <ol className="reveal grid gap-4 sm:grid-cols-2">
              {IVF_PATHWAY.map((step) => (
                <li
                  key={step.step}
                  className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
                >
                  <span className="inline-grid h-8 w-8 place-items-center rounded-xl bg-brand-300 text-sm font-bold text-brand-900">
                    {step.step}
                  </span>
                  <h3 className="mt-3.5 text-lg text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-200/80">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          5. DOCTORS
          ================================================================== */}
      <section className="py-20 sm:py-24" aria-labelledby="doctors-heading">
        <Container width="wide">
          <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Experienced medical team"
              title={<span id="doctors-heading">Consultants you can actually meet</span>}
              description="Obstetricians, a fertility team, a paediatrician and a family physician — with published OPD timings."
            />
            <Button
              variant="secondary"
              onClick={() => onNavigate('/doctors')}
              className="shrink-0 self-start md:self-auto"
            >
              Full directory &amp; schedule
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {DOCTORS_DATA.map((doc, i) => {
              const initials = doc.name
                .replace(/^(Dr\.?)\s*/i, '')
                .split(/\s+/)
                .slice(0, 2)
                .map((w) => w[0])
                .join('')
                .toUpperCase();
              return (
                <article
                  key={doc.id}
                  data-reveal-index={i}
                  className="reveal flex flex-col rounded-xl border border-line-soft bg-white p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[var(--shadow-lift)]"
                >
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br ${doc.accent} text-lg font-bold text-white`}
                    aria-hidden="true"
                  >
                    {initials}
                  </span>
                  <h3 className="mt-4 text-lg leading-snug">{doc.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-coral-600">{doc.designation}</p>
                  <p className="mt-2 text-sm font-medium text-brand-700">{doc.qualifications}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {doc.specialty}
                  </p>
                  <p className="mt-4 flex items-center gap-2 rounded-2xl bg-canvas px-4 py-3 text-xs text-ink-soft">
                    <Clock className="h-3.5 w-3.5 shrink-0 text-sand-600" aria-hidden="true" />
                    <span className="tabular-numbers">{doc.opdTimings}</span>
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-4 w-full"
                    onClick={() => onBookSpeciality(doc.specialityIds[0])}
                  >
                    Book an appointment
                  </Button>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ==================================================================
          6. STORY, PILLARS & FAQ
          ================================================================== */}
      <section className="pb-20 sm:pb-24" aria-labelledby="story-heading">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* Story */}
            <div className="reveal">
              <p className="eyebrow">
                Our heritage in Chemmad since {HOSPITAL_DATA.establishedYear}
              </p>
              <h2
                id="story-heading"
                className="display mt-4 text-[clamp(1.75rem,1.3rem+2vw,2.75rem)]"
              >
                Three decades of <span className="text-sand-600">“Humane Care; Divine Cure”</span>{' '}
                in Malappuram
              </h2>

              <div className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">
                <p>
                  Founded in {HOSPITAL_DATA.establishedYear} in Chemmad, when specialised maternal
                  and emergency facilities were scarce in the Tirurangadi region, Lailas Hospital
                  and IVF Centre has grown into one of Malappuram’s most trusted family healthcare
                  institutions.
                </p>
                <p>
                  In {HOSPITAL_DATA.firstUltrasoundYear} we introduced the locality’s first
                  diagnostic ultrasound scanning facility. Today, having welcomed over{' '}
                  <strong className="font-semibold text-brand-800">
                    {HOSPITAL_DATA.metrics.safeBirths} babies
                  </strong>
                  , we continue to serve generations of families with affordable, ethical and
                  compassionate clinical care.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {HOSPITAL_PILLARS.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="rounded-3xl border border-line-soft bg-white p-6 shadow-[var(--shadow-soft)]"
                  >
                    <h3 className="flex items-start gap-2.5 text-base">
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${PILLAR_DOT[pillar.accent]}`}
                        aria-hidden="true"
                      />
                      {pillar.title}
                    </h3>
                    <p className="mt-2 pl-4 text-sm leading-relaxed text-ink-soft">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="reveal">
              <SectionHeading
                eyebrow="Before you visit"
                title="Frequently asked questions"
                description="Quick answers for patients visiting Lailas Hospital, Chemmad."
              />
              <div className="mt-7">
                <FaqAccordion items={FAQS_DATA.slice(0, 6)} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          7. LOCATION, HOURS & CONTACT
          ================================================================== */}
      <section className="pb-20 sm:pb-24" aria-labelledby="location-heading">
        <Container width="wide">
          <div className="reveal relative isolate overflow-hidden rounded-3xl bg-brand-900 px-7 py-12 text-white sm:px-12 sm:py-14">
            <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="eyebrow text-brand-300">Easy access in Chemmad town</p>
                <h2
                  id="location-heading"
                  className="display mt-4 text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)] text-white"
                >
                  Visit or contact Lailas Hospital
                </h2>
                <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-brand-200/80">
                  {HOSPITAL_DATA.address.fullFormatted}
                </p>
                <p className="mt-3 text-sm text-brand-200/70">
                  <strong className="font-semibold text-brand-200">Landmark:</strong>{' '}
                  {HOSPITAL_DATA.address.landmark} · Plus Code{' '}
                  <span className="tabular-numbers">{HOSPITAL_DATA.address.plusCode}</span>
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
                  >
                    {copiedAddress ? (
                      <Check className="h-4 w-4 text-brand-300" aria-hidden="true" />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                    {copiedAddress ? 'Address copied' : 'Copy full address'}
                  </button>
                  <a
                    href={HOSPITAL_DATA.address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
                  >
                    Open in Google Maps
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>

                <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/15">
                  <iframe
                    title="Map showing the location of Lailas Hospital and IVF Centre, Chemmad, Kerala"
                    src={HOSPITAL_DATA.address.mapEmbedUrl}
                    className="h-64 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Contact + hours */}
              <div className="space-y-5">
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h3 className="text-xl text-white">24/7 helpline</h3>
                  <a
                    href={`tel:${primary.tel}`}
                    className="mt-4 flex min-h-12 items-center gap-3 rounded-xl bg-white/10 p-4 transition-colors duration-300 hover:bg-white/20"
                  >
                    <Siren className="h-5 w-5 shrink-0 text-coral-300" aria-hidden="true" />
                    <span className="flex flex-col">
                      <span className="text-xs text-brand-200/75">{primary.label}</span>
                      <span className="tabular-numbers text-lg font-semibold text-white">
                        {primary.display}
                      </span>
                    </span>
                  </a>

                  <dl className="mt-4 space-y-2.5">
                    {HOSPITAL_DATA.phones.map((p) => (
                      <div
                        key={p.tel}
                        className="flex items-center justify-between gap-3 rounded-xl bg-white/5 p-3.5"
                      >
                        <dt className="text-xs leading-snug text-brand-200/75">{p.label}</dt>
                        <dd>
                          <a
                            href={`tel:${p.tel}`}
                            className="tabular-numbers inline-flex min-h-11 items-center whitespace-nowrap text-sm font-semibold text-white transition-colors hover:text-brand-300"
                          >
                            {p.display}
                          </a>
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <a
                    href={whatsappUrl(WHATSAPP_MESSAGES.general)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white transition-colors hover:brightness-110"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    Chat with reception on WhatsApp
                  </a>

                  <div className="mt-5 border-t border-white/10 pt-5">
                    <p className="text-xs text-brand-200/70">Email desk</p>
                    <a
                      href={`mailto:${HOSPITAL_DATA.email}`}
                      className="mt-1 inline-flex min-h-11 items-center break-all text-sm font-medium text-white underline decoration-white/30 underline-offset-4"
                    >
                      {HOSPITAL_DATA.email}
                    </a>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h3 className="text-lg text-white">Working hours</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="text-brand-300">Emergency, lab &amp; pharmacy</dt>
                      <dd className="mt-0.5 text-brand-200/80">
                        Open 24 hours, Monday to Sunday
                      </dd>
                    </div>
                    <div>
                      <dt className="text-brand-300">Specialist OPD</dt>
                      <dd className="mt-0.5 text-brand-200/80">
                        Monday – Saturday, 9:00 AM – 7:00 PM
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          8. PATIENT PORTAL + HEALTH RESOURCES
          ================================================================== */}
      <PatientPortal
        onNavigate={onNavigate}
        onOpenAppointmentModal={() => onOpenAppointmentModal()}
      />

      {/* ==================================================================
          9. PATIENT FEEDBACK
          ================================================================== */}
      <Testimonials />

      {/* ==================================================================
          10. CLOSING CTA
          ================================================================== */}
      <section className="pb-24">
        <Container width="default">
          <div className="reveal rounded-xl border border-line bg-white px-8 py-14 text-center sm:px-14">
            <p className="eyebrow">We’re here to help</p>
            <h2 className="display mx-auto mt-4 max-w-2xl text-[clamp(1.75rem,1.3rem+2vw,2.75rem)]">
              Your health matters. Let’s take the next step together.
            </h2>
            <p className="lede mx-auto mt-5 max-w-xl">
              Whether you are arranging a maternity check-up, starting a fertility conversation, or
              asking about care for your child, our team in Chemmad is ready to help.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" onClick={() => onOpenAppointmentModal()}>
                <CalendarCheck className="h-5 w-5" />
                Book an appointment
              </Button>
              <LinkButton size="lg" variant="secondary" href={`tel:${primary.tel}`}>
                <Phone className="h-4 w-4 text-coral-600" />
                <span className="tabular-numbers">Call {primary.display}</span>
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
