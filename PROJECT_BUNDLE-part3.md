# Lailas Hospital — source code, part 3 of 4

Complete source except images, dependencies and build output.
Read HANDOFF.md first for architecture, design system and constraints.


==============================================================================
// FILE: src/components/navItems.ts
==============================================================================

import type { Copy } from '../content/copy/en';

export interface NavItem {
  key: keyof Copy['nav'];
  to: string;
}

/** Five links maximum in the main navigation. */
export const mainNav: NavItem[] = [
  { key: 'services', to: '/#services' },
  { key: 'maternity', to: '/maternity' },
  { key: 'ivf', to: '/ivf' },
  { key: 'doctors', to: '/doctors' },
  { key: 'contact', to: '/contact' },
];



==============================================================================
// FILE: src/components/PageMeta.tsx
==============================================================================

import { useEffect } from 'react';
import type { Copy } from '../content/copy/en';
import { useCopy } from '../i18n/LanguageProvider';

export type MetaKey = Exclude<keyof Copy['meta'], 'siteName'>;

/**
 * Keeps the tab title and description in sync during client navigation and
 * language changes. The prerender step writes the full head for each page.
 */
export function PageMeta({ page }: { page: MetaKey }) {
  const copy = useCopy();
  useEffect(() => {
    const meta = copy.meta[page];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [copy, page]);
  return null;
}



==============================================================================
// FILE: src/components/Photo.tsx
==============================================================================

import { useEffect, useRef, useState } from 'react';
import { getPhoto, images, type ImageId, type Tone } from '../content/images';
import { cn } from '../lib/format';

export type PhotoShape = 'arch' | 'cradle' | 'soft' | 'circle' | 'none';

const shapes: Record<PhotoShape, string> = {
  arch: 'shape-arch',
  cradle: 'shape-cradle',
  soft: 'shape-soft',
  circle: 'rounded-full',
  none: '',
};

/* Rich, subtle modern hospital gradients for when a photo slot is unpopulated */
const tiles: Record<Tone, string> = {
  sand: 'bg-gradient-to-br from-sand via-[#f7f0e6] to-sand-deep text-clay-600',
  sage: 'bg-gradient-to-br from-sage-50 via-sage-100 to-sage-200 text-teal-700',
  clay: 'bg-gradient-to-br from-clay-50 via-[#fcf5ef] to-clay-100 text-clay-700',
  teal: 'bg-gradient-to-br from-teal-50 via-teal-100/70 to-teal-100 text-teal-800',
};

const darkTiles: Record<Tone, string> = {
  sand: 'bg-gradient-to-br from-teal-900 via-teal-850 to-teal-950 text-teal-300',
  sage: 'bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 text-teal-200',
  clay: 'bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 text-clay-300',
  teal: 'bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800 text-teal-300',
};

interface PhotoProps {
  id: ImageId;
  shape?: PhotoShape;
  /** Override the registry aspect ratio (width / height). */
  aspect?: number;
  sizes?: string;
  /** Above the fold: load eagerly with high priority. */
  priority?: boolean;
  /** Use a darker tile on dark sections. */
  onDark?: boolean;
  /**
   * Render nothing at all while the photograph is missing. Use for wide
   * decorative bands, where an empty tile reads as a void; leave it off for
   * portraits and service images, where the tile reserves the layout slot.
   */
  omitIfMissing?: boolean;
  className?: string;
}

/**
 * A responsive photo with blur-up, or a sophisticated clinical placeholder
 * when the photo is being shot. Clean, dignified and accessible.
 */
export function Photo({
  id,
  shape = 'soft',
  aspect,
  sizes = '100vw',
  priority,
  onDark,
  omitIfMissing,
  className,
}: PhotoProps) {
  const entry = images[id];
  const photo = getPhoto(id);
  const ratio = aspect ?? entry.aspect;
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  const frame = cn('relative isolate overflow-hidden ring-1 ring-black/[0.04]', shapes[shape], className);

const doctorInitials: Record<string, string> = {
  'doctor-laila-beegum': 'LB',
  'doctor-amith-k': 'AK',
  'doctor-jabir': 'JB',
  'doctor-v-j-sonia': 'VS',
  'doctor-jitha-vineeth': 'JV',
  'doctor-sumiya': 'DS',
};

  if (!photo) {
    if (omitIfMissing) return null;

    if (id.startsWith('doctor-')) {
      const initials = doctorInitials[id] || id.replace('doctor-', '').slice(0, 2).toUpperCase();
      return (
        <div
          aria-hidden="true"
          className={cn(
            frame,
            'flex flex-col items-center justify-center bg-gradient-to-br from-teal-50/90 via-[#f7f1e7] to-teal-100/70 text-teal-900 border border-white/80 shadow-xs relative select-none',
          )}
          style={{ aspectRatio: ratio }}
        >
          {/* Subtle medical emblem watermark */}
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.14] text-teal-800"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M50 24v52M24 50h52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          <div className="relative z-10 flex flex-col items-center">
            <span className="font-heading font-semibold text-teal-900 text-xl sm:text-2xl tracking-tight drop-shadow-xs">
              {initials}
            </span>
          </div>
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
        </div>
      );
    }

    /* Tonal panel carrying the brand's circle-and-bud motif. No icon, no
       uppercase alt block: the panel is decoration, and repeating the alt text
       as visible type made every missing image look like a mock-up. */
    return (
      <div
        aria-hidden="true"
        className={cn(frame, onDark ? darkTiles[entry.tone] : tiles[entry.tone])}
        style={{ aspectRatio: ratio }}
      >
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.45]"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle
            cx="52"
            cy="56"
            r="24"
            stroke="currentColor"
            strokeWidth="1.1"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="52"
            cy="56"
            r="9"
            stroke="currentColor"
            strokeWidth="1.1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={frame}
      style={{
        aspectRatio: ratio,
        backgroundImage: `url(${photo.blur})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <picture>
        <source type="image/avif" srcSet={photo.avifSrcSet} sizes={sizes} />
        <source type="image/webp" srcSet={photo.webpSrcSet} sizes={sizes} />
        <img
          ref={imgRef}
          src={photo.fallback}
          alt={entry.alt}
          width={photo.width}
          height={photo.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.03]',
            loaded || priority ? 'opacity-100' : 'opacity-0',
          )}
        />
      </picture>
    </div>
  );
}



==============================================================================
// FILE: src/components/Reveal.tsx
==============================================================================

import { m } from 'motion/react';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Render as a list item inside <ol>/<ul>. */
  as?: 'div' | 'li';
}

/** Soft fade and rise when content scrolls into view. Runs once. */
export function Reveal({ children, className, delay = 0, y = 20, as = 'div' }: RevealProps) {
  const Comp = as === 'li' ? m.li : m.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Comp>
  );
}



==============================================================================
// FILE: src/components/ScrollManager.tsx
==============================================================================

import { useEffect } from 'react';
import { useLocation } from 'react-router';

/** New page: start at the top. Hash link: scroll to the section. */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}



==============================================================================
// FILE: src/components/Section.tsx
==============================================================================

import type { ReactNode } from 'react';
import { cn } from '../lib/format';

type Tone = 'ivory' | 'paper' | 'sand' | 'sage' | 'teal';

/**
 * Vertical rhythm. Not every section deserves the same amount of air — a run of
 * identically spaced sections is what makes a long page feel monotonous.
 *   tight  pairs with the section above (same tone, continuous idea)
 *   base   the default
 *   loose  a deliberate pause or a change of subject
 */
type Space = 'tight' | 'base' | 'loose';

const spaces: Record<Space, string> = {
  tight: 'py-14 md:py-20',
  base: 'py-20 md:py-28',
  loose: 'py-24 md:py-36',
};

const tones: Record<Tone, string> = {
  ivory: 'bg-ivory',
  paper: 'bg-paper',
  sand: 'bg-sand',
  sage: 'bg-sage-50',
  teal: 'bg-teal-900 text-ivory',
};

interface SectionProps {
  id?: string;
  labelledBy?: string;
  tone?: Tone;
  space?: Space;
  className?: string;
  children: ReactNode;
}

export function Section({
  id,
  labelledBy,
  tone = 'ivory',
  space = 'base',
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(spaces[space], tones[tone], className)}
    >
      {children}
    </section>
  );
}



==============================================================================
// FILE: src/components/ServiceCard.tsx
==============================================================================

import { ArrowRight, Clock, Phone } from 'lucide-react';
import { contact, type Service } from '../content/site';
import { useBooking } from '../booking/BookingProvider';
import { useCopy } from '../i18n/LanguageProvider';
import { Button, ButtonAnchor } from './Button';

/**
 * A service, presented as a row rather than a card.
 *
 * The services band is dark teal. Three white boxes sitting on it read as a
 * template; a hairline list reads as a printed prospectus, which is closer to
 * what this section is — a statement of what the hospital does.
 *
 * Order is fixed: index, name, what it includes, when it is available, action.
 */
export function ServiceRow({ service, index }: { service: Service; index: number }) {
  const copy = useCopy();
  const { open } = useBooking();
  const text = copy.services.items[service.id];

  return (
    <article className="group relative grid gap-x-8 gap-y-4 py-7 md:grid-cols-12 md:items-start md:py-8">
      {/* Index ----------------------------------------------------------- */}
      <div className="flex items-center gap-4 md:col-span-2 md:pt-1">
        <span className="t-number text-2xl tabular-nums text-teal-300/75" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="t-label text-teal-300 md:hidden">
          {copy.services.groups[service.group].name}
        </span>
      </div>

      {/* Name and inclusions -------------------------------------------- */}
      <div className="min-w-0 md:col-span-6">
        <h3 className="t-h3 text-ivory">{text.name}</h3>
        <p className="mt-2 max-w-[38rem] t-small text-teal-100/85">{text.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
          {text.offerings.map((o) => (
            <li key={o} className="flex items-center gap-2 t-meta text-teal-100/70">
              <span aria-hidden="true" className="size-1 rounded-full bg-teal-400/70" />
              {o}
            </li>
          ))}
        </ul>
      </div>

      {/* Availability and action ---------------------------------------- */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-4 md:justify-end">
        <p className="flex items-center gap-2 t-meta text-teal-200/80">
          <Clock className="size-3.5 shrink-0" aria-hidden="true" />
          {text.availability}
        </p>

        {service.bookable ? (
          <Button
            variant="lightOutline"
            className="shrink-0"
            iconAfter={
              <ArrowRight
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            }
            onClick={() => open({ kind: 'service', id: service.id })}
          >
            {copy.services.book}
          </Button>
        ) : service.id === 'emergency' ? (
          <ButtonAnchor
            href={`tel:${contact.primary.tel}`}
            variant="emergency"
            className="shrink-0"
            icon={<Phone aria-hidden="true" />}
          >
            {contact.primary.display}
          </ButtonAnchor>
        ) : (
          <p className="t-small font-semibold text-teal-100">{copy.services.walkIn}</p>
        )}
      </div>
    </article>
  );
}



==============================================================================
// FILE: src/components/TopStrip.tsx
==============================================================================

import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { address, contact, whatsappLink } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { Container } from './Container';

/**
 * Top strip: emergency hotline, care hours, location and a WhatsApp shortcut.
 *
 * Every string resolves through the copy layer so Malayalam is complete. The
 * location is composed from the address record rather than hardcoded, which
 * keeps it correct in both languages and in sync with the footer.
 */
export function TopStrip() {
  const copy = useCopy();
  return (
    <div className="border-b border-white/10 bg-teal-950/95 backdrop-blur-md text-ivory">
      <Container className="flex min-h-11 items-center justify-between gap-4 py-1">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${contact.primary.tel}`}
            className="group inline-flex min-h-11 items-center gap-2.5 t-small font-medium transition-colors hover:text-white"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emergency">
              <Phone className="size-3 text-white" aria-hidden="true" />
            </span>
            <span className="hidden text-teal-100 sm:inline">{copy.strip.emergency}</span>
            <span className="font-semibold tabular-nums underline-offset-4 group-hover:underline">
              {contact.primary.display}
            </span>
          </a>

          <div className="hidden items-center gap-1.5 t-meta text-teal-200 md:flex">
            <Clock className="size-3.5 shrink-0 text-teal-300" aria-hidden="true" />
            <span>{copy.visit.hours.allDay}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1.5 t-meta text-teal-200 lg:flex">
            <MapPin className="size-3.5 shrink-0 text-teal-300" aria-hidden="true" />
            <span>
              {address.locality}, {address.district}
            </span>
          </div>

          <a
            href={whatsappLink(copy.booking.whatsappGeneral)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 t-small font-medium text-teal-100 transition-colors hover:text-white"
          >
            <MessageCircle className="size-3.5 shrink-0 text-teal-300" aria-hidden="true" />
            {/* The visible label is dropped below 26rem, which left this link
                with no accessible name on a phone. The sr-only copy keeps it
                announced at every width. */}
            <span className="sr-only xs:not-sr-only">{copy.actions.whatsapp}</span>
          </a>

        </div>
      </Container>
    </div>
  );
}



==============================================================================
// FILE: src/entry-server.tsx
==============================================================================

import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from './App';

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

export { pages, renderHead, siteUrl } from './content/seo';



==============================================================================
// FILE: src/i18n/LanguageProvider.tsx
==============================================================================

import { createContext, useContext, type ReactNode } from 'react';
import { en, type Copy } from '../content/copy/en';

/**
 * Copy provider.
 *
 * The site is English only. This stays a context rather than a plain import so
 * components keep consuming `useCopy()` unchanged, and so another language
 * could be reintroduced later without touching every call site.
 */
const LanguageContext = createContext<Copy | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  return <LanguageContext.Provider value={en}>{children}</LanguageContext.Provider>;
}

export function useCopy(): Copy {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useCopy must be used inside <LanguageProvider>');
  return ctx;
}



==============================================================================
// FILE: src/lib/format.ts
==============================================================================

import { extendTailwindMerge } from 'tailwind-merge';
import type { Copy } from '../content/copy/en';
import type { TimeWindow, Weekday } from '../content/site';

/** "Monday to Saturday", "Every day", or a comma list for gaps. */
export function formatDays(days: readonly Weekday[], c: Copy): string {
  if (days.length === 7) return c.time.everyDay;
  const sorted = [...days].sort((a, b) => a - b);
  const contiguous = sorted.every((d, i) => i === 0 || d === sorted[i - 1] + 1);
  if (contiguous && sorted.length > 2) {
    return c.time.dayRange(c.time.days[sorted[0]], c.time.days[sorted[sorted.length - 1]]);
  }
  return sorted.map((d) => c.time.days[d]).join(', ');
}

export function formatHours(w: TimeWindow, c: Copy): string {
  if (w.open === '00:00' && w.close === '24:00') return c.time.open24;
  return c.time.timeRange(c.time.formatTime(w.open), c.time.formatTime(w.close));
}

export function formatDate(d: Date, c: Copy, opts: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(c.locale, opts).format(d);
}

export function addDays(d: Date, n: number) {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

/**
 * Tailwind class merger.
 *
 * A plain join() leaves conflicting utilities side by side, so which one wins
 * depends on stylesheet order rather than intent — `<Container className="max-w-3xl">
 * silently lost to the component's own max-w-[80rem]`. This resolves conflicts
 * properly, last-wins. It also knows about our custom type scale and radius
 * tokens so `t-h3 ... t-h2` and `rounded-[var(--radius-md)] ...` behave.
 */
const merge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { t: ['display', 'h1', 'h2', 'h3', 'h4', 'lead', 'body', 'small', 'meta', 'label', 'number'] },
      ],
      rounded: [
        {
          'rounded-(radius)': ['[var(--radius-sm)]', '[var(--radius-md)]', '[var(--radius-lg)]'],
        },
      ],
    },
  },
});

export const cn = (...parts: (string | false | null | undefined)[]) =>
  merge(parts.filter(Boolean).join(' '));



==============================================================================
// FILE: src/lib/motionFeatures.ts
==============================================================================

// Loaded after first paint by <LazyMotion> in App.tsx.
export { domAnimation as default } from 'motion/react';



==============================================================================
// FILE: src/main.tsx
==============================================================================

import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';
import './styles/index.css';

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const root = document.getElementById('root')!;
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);



==============================================================================
// FILE: src/pages/ContactPage.tsx
==============================================================================

import { CalendarDays, Mail, Phone } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { contact } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { PageHero } from '../sections/PageHero';
import { VisitUs } from '../sections/VisitUs';

export function ContactPage() {
  const copy = useCopy();
  const page = copy.pages.contact;
  const { open } = useBooking();

  return (
    <>
      <PageMeta page="contact" />
      <PageHero title={page.title} lead={page.lead} />
      <section aria-labelledby="phones-title" className="pb-20 md:pb-24">
        <Container className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 id="phones-title" className="sr-only">
              {copy.contact.phonesTitle}
            </h2>
            <a
              href={`tel:${contact.primary.tel}`}
              className="group flex flex-col gap-2 rounded-[var(--radius-lg)] bg-emergency-50 p-8 ring-1 ring-emergency/15 transition-colors hover:ring-emergency/40 md:p-10"
            >
              <span className="flex items-center gap-2.5 font-semibold text-emergency-700">
                <Phone className="size-5" aria-hidden="true" />
                {copy.contact.primaryLabel}
              </span>
              <span className="t-number text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)] text-ink">{contact.primary.display}</span>
              <span className="text-ink-soft">{copy.time.open24EveryDay}</span>
            </a>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {contact.landlines.map((p, i) => (
                <li key={p.tel}>
                  <a
                    href={`tel:${p.tel}`}
                    className="flex min-h-24 flex-col justify-center rounded-[var(--radius-md)] bg-paper px-5 py-4 ring-1 ring-line transition-colors hover:ring-teal-600"
                  >
                    <span className="t-small text-ink-muted">{copy.contact.landlineLabels[i]}</span>
                    <span className="font-semibold tabular-nums">{p.display}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${contact.email}`}
              className="mt-3 flex min-h-16 items-center gap-3 rounded-[var(--radius-md)] bg-paper px-5 ring-1 ring-line transition-colors hover:ring-teal-600"
            >
              <Mail className="size-5 text-teal-700" aria-hidden="true" />
              <span>
                <span className="sr-only">{copy.contact.emailTitle}: </span>
                {contact.email}
              </span>
            </a>
          </Reveal>
          <Reveal className="flex flex-col justify-center rounded-[var(--radius-lg)] bg-teal-800 p-8 text-ivory md:p-10 lg:col-span-5" delay={0.08}>
            <h2 className="t-h3 text-ivory">{page.bookTitle}</h2>
            <p className="mt-3 text-teal-100">{page.bookBody}</p>
            <Button variant="light" size="lg" className="mt-8 self-start" icon={<CalendarDays aria-hidden="true" />} onClick={() => open()}>
              {copy.actions.book}
            </Button>
          </Reveal>
        </Container>
      </section>
      <VisitUs />
    </>
  );
}



==============================================================================
// FILE: src/pages/DoctorsPage.tsx
==============================================================================

import { Clock, Phone } from 'lucide-react';
import { useState } from 'react';
import { ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { DoctorCard } from '../components/DoctorCard';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { contact, doctors as allDoctors, doctorsForAny } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { cn } from '../lib/format';
import { PageHero } from '../sections/PageHero';

export function DoctorsPage() {
  const copy = useCopy();
  const page = copy.pages.doctors;
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number | null>(null);

  // Filtered doctors list based on selected group or all
  const filteredDoctors =
    selectedGroupIndex === null
      ? allDoctors
      : doctorsForAny(page.groups[selectedGroupIndex].serviceIds);

  const founderDoctor = allDoctors.find((d) => d.id === 'laila-beegum');
  const showFounderSpotlight =
    selectedGroupIndex === null ||
    page.groups[selectedGroupIndex].serviceIds.includes('maternity');

  const regularDoctors =
    showFounderSpotlight && founderDoctor
      ? filteredDoctors.filter((d) => d.id !== 'laila-beegum')
      : filteredDoctors;

  return (
    <>
      <PageMeta page="doctors" />
      <div className="relative overflow-hidden bg-ivory ambient-mesh">
        <PageHero title={page.title} lead={page.lead} />

        {/* Interactive Department Filter Bar */}
        <Container className="pt-2 pb-8">
          <div className="flex items-center gap-2 overflow-x-auto rounded-[var(--radius-md)] border border-white/80 p-1.5 glass-card shadow-xs [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setSelectedGroupIndex(null)}
              className={cn(
                'min-h-11 shrink-0 whitespace-nowrap rounded-[var(--radius-sm)] px-4.5 py-2 t-small font-semibold transition-all duration-300',
                selectedGroupIndex === null
                  ? 'bg-teal-800 text-ivory shadow-xs'
                  : 'text-ink-soft hover:bg-sand/60 hover:text-ink',
              )}
            >
              {copy.doctors.seeAll}
            </button>
            {page.groups.map((g, idx) => (
              <button
                key={g.title}
                type="button"
                onClick={() => setSelectedGroupIndex(idx)}
                className={cn(
                  'min-h-11 shrink-0 whitespace-nowrap rounded-[var(--radius-sm)] px-4.5 py-2 t-small font-semibold transition-all duration-300',
                  selectedGroupIndex === idx
                    ? 'bg-teal-800 text-ivory shadow-xs'
                    : 'text-ink-soft hover:bg-sand/60 hover:text-ink',
                )}
              >
                {g.title}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <section className="py-12 md:py-16">
        <Container>
          {/* Founder Spotlight Card when showing all or maternity/gynaecology group */}
          {showFounderSpotlight && founderDoctor && (
            <div className="mb-8">
              {/* The card labels the role itself, so a heading above it only
                  repeated the same words in a different order. */}
              <Reveal>
                <DoctorCard doctor={founderDoctor} featured />
              </Reveal>
            </div>
          )}

          {/* Consultants Bento Grid */}
          <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
            {regularDoctors.map((d, i) => (
              <Reveal as="li" key={d.id} delay={i * 0.05} className="min-w-0 h-full">
                <DoctorCard doctor={d} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* 24/7 Duty Doctors High-Impact Glass Banner */}
      <section aria-labelledby="duty-title" className="pt-6 pb-20 md:pb-28">
        <Container>
          <Reveal className="relative overflow-hidden rounded-[var(--radius-lg)] bg-teal-950 p-8 text-ivory shadow-[var(--shadow-lift)] md:p-12">
            {/* Ambient Background Glow */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-teal-500/15 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -left-20 -bottom-20 size-72 rounded-full bg-clay-500/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-5">
                <div className="grid size-14 shrink-0 place-items-center rounded-[var(--radius-md)] bg-teal-900/90 text-teal-300 ring-1 ring-white/10 shadow-xs">
                  <Clock className="size-7" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex size-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
                    <span className="t-label text-teal-300">{copy.doctors.duty.label}</span>
                  </div>
                  <h2 id="duty-title" className="t-h3 mt-2 text-ivory">
                    {copy.doctors.duty.title}
                  </h2>
                  <p className="mt-2.5 max-w-2xl t-small text-teal-100/90 leading-relaxed">
                    {copy.doctors.duty.body}
                  </p>
                </div>
              </div>

              <div className="shrink-0 pt-2 md:pt-0">
                <ButtonAnchor
                  href={`tel:${contact.primary.tel}`}
                  variant="emergency"
                  size="lg"
                  className="w-full sm:w-auto shadow-md"
                  icon={<Phone aria-hidden="true" />}
                >
                  {copy.actions.callEmergency}
                </ButtonAnchor>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}



==============================================================================
// FILE: src/pages/HomePage.tsx
==============================================================================

import { PageMeta } from '../components/PageMeta';
import { DoctorsSection } from '../sections/DoctorsSection';
import { FaqSection } from '../sections/FaqSection';
import { FounderSection } from '../sections/FounderSection';
import { Hero } from '../sections/Hero';
import { IvfPath } from '../sections/IvfPath';
import { MaternityStory } from '../sections/MaternityStory';
import { PregnancyTool } from '../sections/PregnancyTool';
import { Services } from '../sections/Services';
import { VisitUs } from '../sections/VisitUs';

export function HomePage() {
  return (
    <>
      <PageMeta page="home" />
      <Hero />
      <Services />
      <MaternityStory />
      <IvfPath />
      <PregnancyTool />
      <FounderSection />
      <DoctorsSection />
      <FaqSection />
      <VisitUs />
    </>
  );
}



==============================================================================
// FILE: src/pages/IvfPage.tsx
==============================================================================

import { CalendarDays, Check, FileText, MessageCircle } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { doctorsFor, pageFaqs, whatsappLink } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { CtaBand } from '../sections/CtaBand';
import { DoctorsSection } from '../sections/DoctorsSection';
import { FaqSection } from '../sections/FaqSection';
import { IvfTimeline } from '../sections/IvfPath';
import { PageHero } from '../sections/PageHero';

export function IvfPage() {
  const copy = useCopy();
  const page = copy.pages.ivf;
  const { open } = useBooking();
  const book = () => open({ kind: 'service', id: 'ivf' });
  const whatsapp = (variant: 'primary' | 'light') => (
    <ButtonAnchor
      href={whatsappLink(copy.ivf.whatsappMessage)}
      variant={variant}
      size="lg"
      icon={<MessageCircle aria-hidden="true" />}
    >
      {copy.ivf.whatsapp}
    </ButtonAnchor>
  );

  return (
    <>
      <PageMeta page="ivf" />
      <PageHero
        title={page.title}
        lead={page.lead}
        imageId="page-ivf"
        actions={
          <>
            {whatsapp('primary')}
            <Button variant="secondary" size="lg" icon={<CalendarDays aria-hidden="true" />} onClick={book}>
              {copy.ivf.book}
            </Button>
          </>
        }
      />

      <section aria-labelledby="when-title" className="bg-sage-50 py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 id="when-title" className="t-h2 text-teal-950">
              {page.whenTitle}
            </h2>
            <ul className="mt-8 space-y-4">
              {page.when.map((w) => (
                <li key={w} className="flex gap-3 t-h4">
                  <Check className="mt-1.5 size-5 shrink-0 text-teal-600" aria-hidden="true" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <h2 className="t-h2 text-teal-950">{page.firstVisitTitle}</h2>
            <ol className="mt-8 space-y-8">
              {page.firstVisit.map((f, i) => (
                <li key={f.title} className="grid grid-cols-[3.5rem_1fr] gap-4">
                  <span className="t-number text-[clamp(2rem,1.5rem+1.6vw,2.75rem)] text-clay-500" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="t-h3 text-teal-950">{f.title}</h3>
                    <p className="mt-1.5 text-ink-soft">{f.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="path-title" className="py-20 md:py-28">
        <Container>
          <Reveal>
            <h2 id="path-title" className="t-h2 max-w-2xl text-teal-950">
              {page.pathTitle}
            </h2>
          </Reveal>
          <div className="mt-14">
            <IvfTimeline onDark={false} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="bring-title" className="pb-20 md:pb-28">
        <Container className="grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-[var(--radius-lg)] bg-paper p-8 ring-1 ring-line md:p-12">
            <h2 id="bring-title" className="t-h3 text-teal-950">
              {page.bringTitle}
            </h2>
            <ul className="mt-6 space-y-3">
              {page.bring.map((b) => (
                <li key={b} className="flex gap-3">
                  <FileText className="mt-1 size-5 shrink-0 text-clay-500" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-ink-muted">{page.bringNote}</p>
          </Reveal>
          <Reveal className="rounded-[var(--radius-lg)] bg-teal-900 p-8 text-ivory md:p-12" delay={0.08}>
            <h2 className="t-h3 text-ivory">{page.promiseTitle}</h2>
            <p className="mt-6 t-h3 italic">{copy.ivf.promise}</p>
          </Reveal>
        </Container>
      </section>

      <DoctorsSection title={page.doctorsTitle} lead="" doctors={doctorsFor('ivf')} showAllLink={false} tone="paper" />
      <FaqSection title={page.faqTitle} ids={pageFaqs.ivf} />
      <CtaBand title={page.cta.title} body={page.cta.body} actions={whatsapp('light')} />
    </>
  );
}



==============================================================================
// FILE: src/pages/MaternityPage.tsx
==============================================================================

import { CalendarDays, Check, MessageCircle } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { PageMeta } from '../components/PageMeta';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import type { ImageId } from '../content/images';
import { doctorsFor, pageFaqs, whatsappLink } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { cn } from '../lib/format';
import { CtaBand } from '../sections/CtaBand';
import { DoctorsSection } from '../sections/DoctorsSection';
import { FaqSection } from '../sections/FaqSection';
import { PageHero } from '../sections/PageHero';
import { PregnancyTool } from '../sections/PregnancyTool';

export function MaternityPage() {
  const copy = useCopy();
  const page = copy.pages.maternity;
  const { open } = useBooking();
  const book = () => open({ kind: 'service', id: 'maternity' });

  return (
    <>
      <PageMeta page="maternity" />
      <PageHero
        title={page.title}
        lead={page.lead}
        imageId="page-maternity"
        actions={
          <>
            <Button size="lg" icon={<CalendarDays aria-hidden="true" />} onClick={book}>
              {copy.actions.book}
            </Button>
            <ButtonAnchor
              href={whatsappLink(copy.booking.whatsappGeneral)}
              variant="secondary"
              size="lg"
              icon={<MessageCircle aria-hidden="true" />}
            >
              {copy.actions.chatWhatsapp}
            </ButtonAnchor>
          </>
        }
      />

      <section aria-labelledby="stages-title" className="border-t border-line py-20 md:py-28">
        <Container>
          <Reveal>
            <h2 id="stages-title" className="t-h2 max-w-2xl text-teal-950">
              {page.stagesTitle}
            </h2>
          </Reveal>
          <div className="mt-14 space-y-20 md:space-y-28">
            {page.stages.map((s, i) => (
              <Reveal key={s.title} className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
                <div className={cn('md:col-span-6', i % 2 === 1 && 'md:order-2')}>
                  <Photo
                    id={s.imageId as ImageId}
                    shape={i === 1 ? 'cradle' : 'soft'}
                    sizes="(min-width: 768px) 45vw, 90vw"
                  />
                </div>
                <div className="md:col-span-6">
                  <h3 className="t-h3 text-teal-950">{s.title}</h3>
                  <p className="t-lead mt-4">{s.body}</p>
                  <ul className="mt-6 space-y-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <Check className="mt-1 size-5 shrink-0 text-teal-600" aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="extra-care-title" className="pb-20 md:pb-28">
        <Container>
          <Reveal className="rounded-[var(--radius-lg)] bg-clay-50 px-7 py-10 md:px-14 md:py-14">
            <h2 id="extra-care-title" className="t-h3 text-teal-950">
              {page.extraCare.title}
            </h2>
            <p className="t-lead mt-4 max-w-3xl">{page.extraCare.body}</p>
          </Reveal>
        </Container>
      </section>

      <PregnancyTool />
      <DoctorsSection title={page.doctorsTitle} lead="" doctors={doctorsFor('maternity')} />
      <FaqSection title={page.faqTitle} ids={pageFaqs.maternity} />
      <CtaBand
        title={page.cta.title}
        body={page.cta.body}
        actions={
          <Button variant="light" size="lg" icon={<CalendarDays aria-hidden="true" />} onClick={book}>
            {copy.pregnancy.book}
          </Button>
        }
      />
    </>
  );
}



==============================================================================
// FILE: src/pages/NotFoundPage.tsx
==============================================================================

import { ArrowLeft } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import { PageMeta } from '../components/PageMeta';
import { useCopy } from '../i18n/LanguageProvider';

export function NotFoundPage() {
  const copy = useCopy();
  const page = copy.pages.notFound;
  return (
    <>
      <PageMeta page="notFound" />
      <section className="py-24 md:py-36">
        <Container className="max-w-2xl text-center">
          <h1 className="t-h1 text-teal-950">{page.title}</h1>
          <p className="t-lead mt-5">{page.body}</p>
          <ButtonLink to="/" size="lg" className="mt-10" icon={<ArrowLeft aria-hidden="true" />}>
            {page.back}
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}



==============================================================================
// FILE: src/pages/PrivacyPage.tsx
==============================================================================

import { Container } from '../components/Container';
import { PageMeta } from '../components/PageMeta';
import { useCopy } from '../i18n/LanguageProvider';

export function PrivacyPage() {
  const copy = useCopy();
  const page = copy.pages.privacy;
  return (
    <>
      <PageMeta page="privacy" />
      <article className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <h1 className="t-h1 text-teal-950">{page.title}</h1>
          <p className="mt-4 text-ink-muted">{page.updated}</p>
          {page.sections.map((s) => (
            <section key={s.title} className="mt-12">
              <h2 className="t-h3 text-teal-950">{s.title}</h2>
              {s.body.map((b) => (
                <p key={b} className="mt-4 text-ink-soft">
                  {b}
                </p>
              ))}
            </section>
          ))}
        </Container>
      </article>
    </>
  );
}



==============================================================================
// FILE: src/pages/StyleguidePage.tsx
==============================================================================

/**
 * Development-only reference of tokens and base components (/styleguide).
 * Not built into production and not linked from the site.
 */
import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
import { Accordion } from '../components/Accordion';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { DoctorCard } from '../components/DoctorCard';
import { Photo, type PhotoShape } from '../components/Photo';
import { ServiceRow } from '../components/ServiceCard';
import { doctors, services } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';

const swatches = [
  ['ivory', '#fbf7f0'], ['paper', '#fffdf9'], ['sand', '#f3ece0'], ['ink', '#1f2a27'], ['ink-soft', '#4b5753'],
  ['teal-700', '#1f5a51'], ['teal-900', '#12362f'], ['teal-100', '#dcebe6'], ['clay-500', '#bf6e45'], ['clay-600', '#a3552f'],
  ['clay-100', '#f6e6da'], ['sage-100', '#e6ece1'], ['sage-300', '#b7c6ac'], ['emergency', '#b3261e'],
];

export default function StyleguidePage() {
  const copy = useCopy();
  const shapes: PhotoShape[] = ['arch', 'cradle', 'soft', 'circle'];
  return (
    <Container className="space-y-20 py-16">
      <section>
        <h2 className="t-h3">Colour</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {swatches.map(([name, hex]) => (
            <div key={name}>
              <div className="h-20 rounded-[var(--radius-md)] ring-1 ring-line" style={{ background: hex }} />
              <p className="mt-2 t-small font-semibold">{name}</p>
              <p className="t-small text-ink-muted">{hex}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="t-h3">Type</h2>
        <p className="t-display text-teal-950">{copy.hero.title.before}{copy.hero.title.accent}{copy.hero.title.after}</p>
        <p className="t-h1 text-teal-950">{copy.pages.ivf.title}</p>
        <p className="t-h2 text-teal-950">{copy.services.title}</p>
        <p className="t-h3 text-teal-950">{copy.pregnancy.title}</p>
        <p className="t-lead max-w-2xl">{copy.hero.lead}</p>
        <p className="max-w-2xl">{copy.maternity.lead}</p>
        <p className="t-label text-sage-700">{copy.pregnancy.label}</p>
        <p className="t-number text-[clamp(3rem,2rem+4vw,4.5rem)] text-clay-600">70,000+</p>
      </section>

      <section>
        <h2 className="t-h3">Buttons</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button size="lg" icon={<CalendarDays aria-hidden="true" />}>{copy.actions.book}</Button>
          <Button variant="secondary" size="lg" icon={<MessageCircle aria-hidden="true" />}>{copy.actions.chatWhatsapp}</Button>
          <Button variant="emergency" icon={<Phone aria-hidden="true" />}>{copy.actions.callEmergency}</Button>
          <Button variant="quiet">{copy.maternity.more}</Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 rounded-[var(--radius-lg)] bg-teal-900 p-8">
          <Button variant="light" size="lg">{copy.ivf.whatsapp}</Button>
          <Button variant="lightOutline" size="lg">{copy.ivf.book}</Button>
        </div>
      </section>

      <section>
        <h2 className="t-h3">Image shapes and fallback tiles</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-5">
          {shapes.map((s, i) => (
            <div key={s}>
              <Photo id={(['hero-main', 'ivf-consultation', 'maternity-labour', 'service-gynaecology', 'hero-secondary'] as const)[i]} shape={s} aspect={s === 'circle' ? 1 : 4 / 5} />
              <p className="mt-2 t-small text-ink-muted">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="t-h3">Cards</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          <ServiceRow service={services[0]} index={0} />
          <ServiceRow service={services[6]} index={0} />
          <DoctorCard doctor={doctors[0]} />
        </div>
      </section>

      <section className="max-w-3xl">
        <h2 className="t-h3">Accordion</h2>
        <div className="mt-6">
          <Accordion
            defaultOpen="a"
            items={[
              { id: 'a', title: copy.faq.items.booking.q, body: copy.faq.items.booking.a },
              { id: 'b', title: copy.faq.items.sundays.q, body: copy.faq.items.sundays.a },
            ]}
          />
        </div>
      </section>
    </Container>
  );
}



==============================================================================
// FILE: src/sections/CtaBand.tsx
==============================================================================

import type { ReactNode } from 'react';
import { Container } from '../components/Container';
import { Reveal } from '../components/Reveal';

/** Closing invitation on inner pages. */
export function CtaBand({ title, body, actions }: { title: string; body: string; actions: ReactNode }) {
  return (
    <section aria-labelledby="cta-title" className="bg-teal-800 text-ivory">
      <Container>
        <Reveal className="grid gap-8 py-16 md:grid-cols-12 md:items-center md:py-20">
          <div className="md:col-span-7">
            <h2 id="cta-title" className="t-h2 text-ivory">
              {title}
            </h2>
            <p className="t-lead mt-4 !text-teal-100">{body}</p>
          </div>
          <div className="flex flex-col gap-3 md:col-span-5 md:items-end">{actions}</div>
        </Reveal>
      </Container>
    </section>
  );
}



==============================================================================
// FILE: src/sections/DoctorsSection.tsx
==============================================================================

import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import { DoctorCard } from '../components/DoctorCard';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { doctors as allDoctors, type Doctor } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { cn } from '../lib/format';

interface Props {
  title?: string;
  lead?: string;
  doctors?: Doctor[];
  showAllLink?: boolean;
  tone?: 'ivory' | 'paper';
}

/** Portrait cards. A swipeable row on phones, a grid on larger screens. */
export function DoctorsSection({ title, lead, doctors = allDoctors, showAllLink = true, tone = 'ivory' }: Props) {
  const copy = useCopy();
  const few = doctors.length < 3;
  return (
    <Section tone={tone} labelledBy="doctors-title" space="tight">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id="doctors-title" className="t-h2 text-teal-950">
              {title ?? copy.doctors.title}
            </h2>
            {(lead ?? copy.doctors.lead) && <p className="t-lead mt-5">{lead ?? copy.doctors.lead}</p>}
          </div>
          {showAllLink && (
            <ButtonLink to="/doctors" variant="quiet" className="shrink-0 self-start md:self-auto" iconAfter={<ArrowRight aria-hidden="true" />}>
              {copy.doctors.seeAll}
            </ButtonLink>
          )}
        </Reveal>
        <ul
          className={cn(
            'mt-12 grid gap-4 md:gap-5',
            few
              ? 'sm:grid-cols-2'
              : 'sm:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {doctors.map((d, i) => (
            <Reveal as="li" key={d.id} delay={i * 0.05} className="h-full">
              <DoctorCard doctor={d} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}



==============================================================================
// FILE: src/sections/FaqSection.tsx
==============================================================================

import { MessageCircle, Phone } from 'lucide-react';
import { Accordion } from '../components/Accordion';
import { ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { contact, faqs, whatsappLink, type FaqId } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';

export function FaqSection({ ids, title }: { ids?: FaqId[]; title?: string }) {
  const copy = useCopy();
  const list = ids ? faqs.filter((f) => ids.includes(f.id)) : faqs;
  const items = list.map((f) => ({ id: f.id, title: copy.faq.items[f.id].q, body: copy.faq.items[f.id].a }));

  return (
    <Section tone="paper" labelledBy="faq-title" className="border-y border-line">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h2 id="faq-title" className="t-h2 text-teal-950">
            {title ?? copy.faq.title}
          </h2>
          <p className="t-lead mt-5">{copy.faq.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <ButtonAnchor href={`tel:${contact.primary.tel}`} variant="secondary" icon={<Phone aria-hidden="true" />}>
              {copy.actions.call}
            </ButtonAnchor>
            <ButtonAnchor
              href={whatsappLink(copy.booking.whatsappGeneral)}
              variant="secondary"
              icon={<MessageCircle aria-hidden="true" />}
            >
              {copy.actions.whatsapp}
            </ButtonAnchor>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.08}>
          <Accordion items={items} defaultOpen={items[0]?.id} />
        </Reveal>
      </Container>
    </Section>
  );
}



==============================================================================
// FILE: src/sections/FounderSection.tsx
==============================================================================

import { ArrowRight, CalendarDays } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import { Photo } from '../components/Photo';
import { Section } from '../components/Section';
import { getDoctor } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';

/**
 * The founder, on the home page.
 *
 * The doctors page lists six consultants, so the person who started the hospital
 * arrives as one card among many. This gives her the position the story actually
 * has: a tall portrait and a short statement before the team is introduced.
 *
 * Only facts stated elsewhere on the site appear here, and no words are put in
 * her mouth: there is no quotation because none has been verified.
 */
export function FounderSection() {
  const copy = useCopy();
  const { open } = useBooking();
  const founder = getDoctor('laila-beegum');
  const profile = copy.doctors.profiles['laila-beegum'];

  return (
    <Section tone="sand" labelledBy="founder-title" space="loose">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Portrait -------------------------------------------------------- */}
        <div className="lg:col-span-5">
          <Photo
            id="doctor-laila-beegum"
            shape="arch"
            aspect={4 / 5}
            sizes="(min-width: 1024px) 34vw, 80vw"
            className="mx-auto w-[78%] max-w-[24rem] lg:mx-0 lg:w-full"
          />
        </div>

        {/* Statement ------------------------------------------------------- */}
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="t-label text-clay-700">{copy.founder.label}</p>

          <h2 id="founder-title" className="t-h1 mt-4 text-teal-950">
            {founder.name}
          </h2>
          <p className="mt-2 t-body font-medium text-teal-800">{profile.role}</p>
          <p className="mt-0.5 t-meta text-ink-muted">{founder.qualifications}</p>

          <p className="t-lead mt-6 max-w-[34rem]">{copy.founder.title}</p>
          <p className="mt-4 max-w-[34rem] t-small text-ink-soft">{profile.bio}</p>

          {/* Figures ------------------------------------------------------- */}
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
            {copy.founder.facts.map((fact) => (
              <div key={fact.value}>
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="block t-h3 text-teal-900">{fact.value}</span>
                  <span className="mt-1 block t-meta text-ink-muted">{fact.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Button
              size="lg"
              icon={<CalendarDays aria-hidden="true" />}
              onClick={() => open({ kind: 'doctor', id: founder.id })}
            >
              {copy.doctors.bookWith(founder.name)}
            </Button>
            <ButtonLink
              to="/doctors"
              variant="quiet"
              size="lg"
              iconAfter={<ArrowRight aria-hidden="true" />}
            >
              {copy.doctors.seeAll}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}



==============================================================================
// FILE: src/sections/Hero.tsx
==============================================================================

import { CalendarDays, Heart, MessageCircle, ShieldCheck, Stethoscope, UsersRound } from 'lucide-react';
import { useState } from 'react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { contact, services, whatsappLink, type ServiceId } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { getPhoto } from '../content/images';

const trustIcons = [Heart, ShieldCheck, UsersRound, Stethoscope] as const;
const trustIconFor = (i: number) => trustIcons[i % trustIcons.length];

/** Only services that can actually be booked online appear in the selector. */
const bookableServices = services.filter((s) => s.bookable);

/** Hero recreation with the existing booking sheet preserved for every action. */
export function Hero() {
  const copy = useCopy();
  const { open } = useBooking();
  const [service, setService] = useState<ServiceId | ''>('');
  const hero = getPhoto('hero-editorial');

  /** Opens the sheet already on the chosen department, or on the first step
      when nothing was chosen. */
  const startBooking = () =>
    open(service ? { kind: 'service', id: service } : undefined);

  return (
    <section aria-labelledby="hero-title" className="reference-hero">
      {hero && (
        <picture>
          <source type="image/avif" srcSet={hero.avifSrcSet} sizes="100vw" />
          <source type="image/webp" srcSet={hero.webpSrcSet} sizes="100vw" />
          <img
            src={hero.fallback}
            alt="A mother holding her sleeping newborn against her chest in soft daylight"
            className="reference-hero__image"
            width={hero.width}
            height={hero.height}
            fetchPriority="high"
            decoding="async"
            style={{ backgroundImage: `url(${hero.blur})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        </picture>
      )}
      <div className="reference-hero__wash" aria-hidden="true" />
      <Container className="reference-hero__content relative z-10">
        <div className="reference-hero__copy">
          <p className="reference-hero__eyebrow"><span /> {copy.hero.eyebrow}</p>
          <h1 id="hero-title" className="reference-hero__title">
            {copy.hero.title.before}
            <em>{copy.hero.title.accent}</em>
            {copy.hero.title.after}
          </h1>
          <p className="reference-hero__lead">{copy.hero.lead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" icon={<CalendarDays aria-hidden="true" />} onClick={() => open()}>{copy.actions.book}</Button>
            <ButtonAnchor href={whatsappLink(copy.booking.whatsappGeneral)} variant="secondary" size="lg" icon={<MessageCircle aria-hidden="true" />}>{copy.actions.chatWhatsapp}</ButtonAnchor>
          </div>
          <p className="mt-5 text-sm font-semibold text-teal-900">
            {copy.hero.emergency(
              <a key="tel" href={`tel:${contact.primary.tel}`} className="underline underline-offset-4 tabular-nums">
                {contact.primary.display}
              </a>,
            )}
          </p>
        </div>

        <aside className="reference-booking" aria-labelledby="hero-booking-title">
          <h2 id="hero-booking-title">{copy.hero.panel.title}</h2>

          <label className="reference-booking__label" htmlFor="hero-service">
            {copy.hero.panel.service}
          </label>
          <select
            id="hero-service"
            className="reference-booking__select"
            value={service}
            onChange={(e) => setService(e.target.value as ServiceId | '')}
          >
            <option value="">{copy.hero.panel.anyService}</option>
            {bookableServices.map((s) => (
              <option key={s.id} value={s.id}>
                {copy.services.items[s.id].name}
              </option>
            ))}
          </select>

          <Button className="mt-4 w-full" size="lg" onClick={startBooking}>
            {copy.hero.panel.continue}
          </Button>

          <ButtonAnchor
            href={whatsappLink(copy.booking.whatsappGeneral)}
            variant="secondary"
            className="mt-3 w-full"
            icon={<MessageCircle aria-hidden="true" />}
          >
            {copy.hero.panel.whatsapp}
          </ButtonAnchor>
        </aside>
      </Container>
      <Container className="reference-hero__trust relative z-10">
        <dl>{copy.hero.trust.map((item, index) => { const Icon = trustIconFor(index); return <div key={item.value}><dt><Icon aria-hidden="true" /></dt><dd><strong>{item.value}</strong><span>{item.label}</span></dd></div>; })}</dl>
      </Container>
    </section>
  );
}



==============================================================================
// FILE: src/sections/IvfPath.tsx
==============================================================================

import { ArrowRight, CalendarDays, MessageCircle } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor, ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { whatsappLink } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';

/** The 4 step path as a timeline. Horizontal on desktop, vertical on phones. */
/**
 * The four step fertility journey.
 *
 * Numbers in Fraunces rather than icon tiles: a journey is sequential, and
 * typographic numerals carry that better than four interchangeable glyphs. The
 * connector is a single hairline that runs behind the markers.
 */
export function IvfTimeline({ onDark = true }: { onDark?: boolean }) {
  const copy = useCopy();

  const marker = onDark
    ? 'bg-teal-900 text-clay-200 ring-1 ring-teal-700'
    : 'bg-paper text-clay-600 ring-1 ring-line';
  const stepWord = onDark ? 'text-teal-300' : 'text-clay-600';
  const title = onDark ? 'text-ivory' : 'text-teal-950';
  const body = onDark ? 'text-teal-100' : 'text-ink-soft';

  const cardClass = onDark
    ? 'glass-dark rounded-[var(--radius-md)] p-6 relative border border-white/10 shadow-sm'
    : 'glass-card rounded-[var(--radius-md)] p-6 relative border border-white/80 shadow-sm';

  return (
    <ol className="relative grid gap-6 md:grid-cols-4 md:gap-6">
      {copy.ivf.steps.map((s, i) => (
        <Reveal
          as="li"
          key={s.title}
          delay={i * 0.08}
          className={cardClass}
        >
          <div className="flex items-center gap-3">
            <span
              className={`t-number relative grid size-10 place-items-center rounded-full text-[1.0625rem] font-bold ${marker}`}
            >
              {i + 1}
            </span>
            <p className={`t-label ${stepWord}`}>
              {copy.ivf.stepWord} {i + 1}
            </p>
          </div>

          <div className="mt-4">
            <h3 className={`t-h3 ${title} font-semibold`}>{s.title}</h3>
            <p className={`mt-2 t-small ${body} leading-relaxed`}>{s.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function IvfPath() {
  const copy = useCopy();
  const { open } = useBooking();

  return (
    <Section tone="teal" labelledBy="ivf-title" space="loose">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-8">
          <p className="t-label text-teal-200">{copy.ivf.label}</p>
          <h2 id="ivf-title" className="t-h2 mt-5 text-ivory">
            {copy.ivf.title}
          </h2>
          <p className="t-lead mt-6 max-w-[36rem] !text-teal-100">{copy.ivf.lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonAnchor
              href={whatsappLink(copy.ivf.whatsappMessage)}
              variant="light"
              size="lg"
              icon={<MessageCircle aria-hidden="true" />}
            >
              {copy.ivf.whatsapp}
            </ButtonAnchor>
            <Button
              variant="lightOutline"
              size="lg"
              icon={<CalendarDays aria-hidden="true" />}
              onClick={() => open({ kind: 'service', id: 'ivf' })}
            >
              {copy.ivf.book}
            </Button>
          </div>
        </Reveal>
        <Reveal className="ivf-mark hidden lg:col-span-4 lg:grid" delay={0.1} aria-hidden="true">
          <span>01</span>
        </Reveal>
      </Container>

      <Container className="mt-20 md:mt-24">
        <IvfTimeline />
        <Reveal className="mt-16 grid gap-8 border-t border-teal-700 pt-10 md:grid-cols-12">
          <p className="t-h3 text-ivory italic md:col-span-8">
            {copy.ivf.promise}
          </p>
          <div className="md:col-span-4 md:text-right">
            <ButtonLink
              to="/ivf"
              variant="quiet"
              className="!text-ivory !decoration-teal-500 hover:!decoration-ivory"
              iconAfter={<ArrowRight aria-hidden="true" />}
            >
              {copy.ivf.more}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

