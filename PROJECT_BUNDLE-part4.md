# Lailas Hospital — source code, part 4 of 4

Complete source except images, dependencies and build output.
Read HANDOFF.md first for architecture, design system and constraints.


==============================================================================
// FILE: src/sections/MaternityStory.tsx
==============================================================================

import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import { CountUp } from '../components/CountUp';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { useCopy } from '../i18n/LanguageProvider';

/** Big editorial numbers, then what to expect. */
export function MaternityStory() {
  const copy = useCopy();
  const [births, founded, ultrasound] = copy.maternity.stats;

  return (
    <Section tone="sand" labelledBy="maternity-title" space="loose">
      <Container className="grid min-w-0 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-8">
          <Reveal>
            <h2 id="maternity-title" className="t-h2 text-teal-950">
              {copy.maternity.title}
            </h2>
            <p className="t-lead mt-6 max-w-[38rem]">{copy.maternity.lead}</p>
          </Reveal>

          <Reveal className="mt-12 border-t border-ink/15 pt-8" delay={0.1}>
            <p className="t-number text-[clamp(3.25rem,2.2rem+3.4vw,5rem)] text-teal-800">
              <CountUp value={births.value} suffix={births.suffix} />
            </p>
            <p className="mt-3 t-h4 text-ink">{births.label}</p>
            {/* Two-up figures. The tracks are minmax(0,1fr) and the labels may
                break, because long unbreakable Malayalam words would otherwise
                set an intrinsic width wider than a 320px viewport. */}
            <div className="mt-10 grid grid-cols-[repeat(2,minmax(0,1fr))] gap-6 sm:gap-8">
              {[founded, ultrasound].map((s) => (
                <div key={s.label} className="min-w-0">
                  <p className="t-number text-[clamp(2rem,1.5rem+1.8vw,2.75rem)] text-teal-700">
                    <CountUp value={s.value} grouping={false} />
                  </p>
                  <p className="mt-2 min-w-0 t-small text-ink-soft [overflow-wrap:anywhere]">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal className="maternity-mark hidden self-end lg:col-span-4 lg:block" aria-hidden="true">
          <span>1994</span>
        </Reveal>
      </Container>

      <Container className="mt-20 md:mt-24">
        <Reveal>
          <h3 className="t-h3 text-teal-950">{copy.maternity.expectTitle}</h3>
        </Reveal>
        <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-6">
          {copy.maternity.expect.map((e, i) => (
            <Reveal
              as="li"
              key={e.title}
              delay={i * 0.08}
              className="border-t-2 border-clay-400 pt-5"
            >
              <h4 className="t-h3 text-ink font-semibold">{e.title}</h4>
              <p className="mt-2.5 text-ink-soft leading-relaxed">{e.body}</p>
            </Reveal>
          ))}
        </ol>
        <ButtonLink to="/maternity" variant="quiet" className="mt-10" iconAfter={<ArrowRight aria-hidden="true" />}>
          {copy.maternity.more}
        </ButtonLink>
      </Container>
    </Section>
  );
}



==============================================================================
// FILE: src/sections/PageHero.tsx
==============================================================================

import type { ReactNode } from 'react';
import { Container } from '../components/Container';
import type { ImageId } from '../content/images';

interface Props {
  title: string;
  lead: string;
  imageId?: ImageId;
  actions?: ReactNode;
}

/** Inner page opening. The artwork on this site is deliberately typographic
 * until verified hospital photography is available. */
export function PageHero({ title, lead, imageId, actions }: Props) {
  return (
    <section aria-labelledby="page-title" className="page-hero">
      <Container
        className={
          imageId
            ? 'max-w-[76rem] pt-14 pb-16 md:pt-20 md:pb-24'
            : 'pt-12 pb-14 md:pt-20 md:pb-20'
        }
      >
        <div className={imageId ? 'max-w-4xl' : 'max-w-3xl'}>
          <h1 id="page-title" className="t-h1 text-teal-950">
            {title}
          </h1>
          <p className="t-lead mt-6 max-w-[36rem]">{lead}</p>
          {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
      </Container>
    </section>
  );
}



==============================================================================
// FILE: src/sections/PregnancyTool.tsx
==============================================================================

import { CalendarDays, Check, Info } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { useBooking } from '../booking/BookingProvider';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { pregnancy, type PregnancyStageId } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { addDays, cn, formatDate } from '../lib/format';

const stageFor = (week: number): PregnancyStageId =>
  pregnancy.stages.find((s) => week >= s.fromWeek && week <= s.toWeek)?.id ?? 'third';

/** Educational week guide: a slider, care at this stage and a due window. */
export function PregnancyTool() {
  const copy = useCopy();
  const { open } = useBooking();
  const ids = useId();
  const [week, setWeek] = useState<number>(pregnancy.defaultWeek);
  const [today, setToday] = useState<Date | null>(null);

  // Dates depend on the visitor's clock, so they are only shown after hydration.
  useEffect(() => setToday(new Date()), []);

  const stageId = stageFor(week);
  const stage = copy.pregnancy.stages[stageId];
  const span = pregnancy.maxWeek - pregnancy.minWeek;
  const fill = ((week - pregnancy.minWeek) / span) * 100;

  let due: string | null = null;
  if (today) {
    const dueDate = addDays(today, (pregnancy.maxWeek - week) * 7);
    const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    due = copy.pregnancy.dueRange(
      formatDate(addDays(dueDate, -pregnancy.windowDays), copy, opts),
      formatDate(addDays(dueDate, pregnancy.windowDays), copy, opts),
    );
  }

  return (
    <Section tone="sage" labelledBy={`${ids}-title`} space="tight">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="t-label text-sage-700">{copy.pregnancy.label}</p>
            <h2 id={`${ids}-title`} className="t-h2 mt-5 text-teal-950">
              {copy.pregnancy.title}
            </h2>
            <p className="t-lead mt-6">{copy.pregnancy.lead}</p>

            <div className="mt-10">
              <p className="t-number text-[clamp(3.5rem,2.5rem+4vw,5.5rem)] text-teal-800" aria-hidden="true">
                {copy.pregnancy.week(week)}
              </p>
              <label htmlFor={`${ids}-range`} className="sr-only">
                {copy.pregnancy.sliderLabel}
              </label>
              <input
                id={`${ids}-range`}
                type="range"
                className="week-range mt-4"
                min={pregnancy.minWeek}
                max={pregnancy.maxWeek}
                step={1}
                value={week}
                onChange={(e) => setWeek(Number(e.target.value))}
                aria-valuetext={`${copy.pregnancy.weekOf(week, pregnancy.maxWeek)}, ${stage.name}`}
                style={{ ['--fill' as string]: `${fill}%` }}
              />
              <div className="flex justify-between t-small text-ink-muted" aria-hidden="true">
                <span>{pregnancy.minWeek}</span>
                <span>{pregnancy.maxWeek}</span>
              </div>
              <div role="group" aria-label={copy.pregnancy.milestonesLabel} className="mt-6 flex flex-wrap gap-2">
                {pregnancy.milestones.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setWeek(m.week)}
                    aria-pressed={week === m.week}
                    className={cn(
                      'min-h-11 rounded-[var(--radius-sm)] px-4 t-small font-semibold transition-all duration-200',
                      week === m.week
                        ? 'bg-teal-800 text-ivory shadow-xs'
                        : 'glass-pill text-ink-soft hover:bg-sand/60 hover:text-ink',
                    )}
                  >
                    {copy.pregnancy.milestones[m.id]} <span className="font-normal opacity-80">({m.week})</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div
              aria-live="polite"
              className="glass-card rounded-[var(--radius-lg)] p-8 md:p-10 shadow-[var(--shadow-lift)] ring-1 ring-white/80"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="t-h3 text-teal-950 font-semibold">{stage.name}</h3>
                <p className="text-ink-muted">{stage.range}</p>
              </div>
              <p className="mt-2 t-h4 text-clay-600 font-medium">{stage.focus}</p>

              <p className="mt-8 font-semibold text-ink">{copy.pregnancy.careTitle}</p>
              <ul className="mt-3.5 space-y-3">
                {stage.care.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-teal-100 text-teal-800">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-ink-soft">{c}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-[var(--radius-md)] bg-clay-50/80 p-5 ring-1 ring-clay-200/60">
                <p className="font-semibold text-clay-700">{copy.pregnancy.dueTitle}</p>
                <p className="mt-1 min-h-[1.6em] t-h3 text-ink font-bold">{due ?? ' '}</p>
              </div>

              <p className="mt-6 flex gap-2.5 t-small text-ink-muted">
                <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {copy.pregnancy.disclaimer}
              </p>

              <Button
                className="mt-6"
                icon={<CalendarDays aria-hidden="true" />}
                onClick={() => open({ kind: 'service', id: 'maternity' })}
              >
                {copy.pregnancy.book}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}



==============================================================================
// FILE: src/sections/Services.tsx
==============================================================================

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { Container } from '../components/Container';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { ServiceRow } from '../components/ServiceCard';
import { serviceGroups, services, type ServiceGroup } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { cn } from '../lib/format';

/** Services grouped into four tabs. Each tab shows photo cards for its group. */
export function Services() {
  const copy = useCopy();
  const [active, setActive] = useState<ServiceGroup>('women');
  const base = useId();
  const tabsRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const i = serviceGroups.indexOf(active);
    let next = i;
    if (e.key === 'ArrowRight') next = (i + 1) % serviceGroups.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + serviceGroups.length) % serviceGroups.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = serviceGroups.length - 1;
    else return;
    e.preventDefault();
    setActive(serviceGroups[next]);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <Section id="services" labelledBy="services-title" tone="teal" space="tight" className="reference-services">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
          <p className="t-label text-teal-200">Our services</p>
          <h2 id="services-title" className="t-h2 mt-3 text-ivory">
            {copy.services.title}
          </h2>
          </div>
          <p className="t-lead !text-teal-100 lg:col-span-5">{copy.services.lead}</p>
        </Reveal>

        <div className="mt-12 overflow-x-auto pb-2 scrollbar-none">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label={copy.services.groupsLabel}
            className="inline-flex gap-1 border-b border-teal-700"
          >
            {serviceGroups.map((g) => {
              const selected = g === active;
              return (
                <button
                  key={g}
                  id={`${base}-tab-${g}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${base}-panel-${g}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(g)}
                  onKeyDown={onKeyDown}
                  className={cn(
                    'min-h-11 border-b-2 border-transparent px-4 t-small font-medium whitespace-nowrap transition-colors duration-300',
                    selected
                      ? g === 'emergency'
                        ? 'border-emergency text-clay-200'
                        : 'border-teal-200 text-ivory'
                      : 'text-teal-200 hover:border-teal-300 hover:text-ivory',
                  )}
                >
                  {copy.services.groups[g].name}
                </button>
              );
            })}
          </div>
        </div>

        {serviceGroups.map((g) => {
          const items = services.filter((s) => s.group === g);
          return (
            <div
              key={g}
              id={`${base}-panel-${g}`}
              role="tabpanel"
              aria-labelledby={`${base}-tab-${g}`}
              hidden={g !== active}
              className="mt-8"
            >
              <p className="max-w-2xl t-h3 text-ivory">
                {copy.services.groups[g].intro}
              </p>
              {/* A hairline list, not a grid of boxes. On a dark band the three
                  white cards read as a template; rows read as a prospectus. */}
              <ul className="mt-8 divide-y divide-teal-700/60 border-t border-teal-700/60">
                {items.map((s, i) => (
                  <li key={s.id}>
                    <ServiceRow service={s} index={i} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </Container>
    </Section>
  );
}



==============================================================================
// FILE: src/sections/VisitUs.tsx
==============================================================================

import { Accessibility, Car, Navigation, Phone } from 'lucide-react';
import { ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { address, contact, flags, hours, routes } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { formatDays, formatHours } from '../lib/format';

export function VisitUs({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const copy = useCopy();
  const Heading = headingLevel === 1 ? 'h1' : 'h2';
  const accessIcons = [Car, Accessibility];

  return (
    <Section tone="sand" labelledBy="visit-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Heading id="visit-title" className="t-h2 text-teal-950">
            {copy.visit.title}
          </Heading>
          <p className="t-lead mt-5">{copy.visit.lead}</p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <h3 className="t-h4 text-clay-700">{copy.visit.addressTitle}</h3>
              <address className="mt-2 not-italic">
                {address.postalLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
                <span className="mt-1 block t-small text-ink-muted">
                  {copy.visit.plusCode}: {address.plusCode}
                </span>
              </address>
            </div>
            <div>
              <h3 className="t-h4 text-clay-700">{copy.visit.hoursTitle}</h3>
              <dl className="mt-2 space-y-3">
                <div>
                  <dt className="text-ink-soft">{copy.visit.hours.allDay}</dt>
                  <dd className="font-semibold">{copy.time.open24EveryDay}</dd>
                </div>
                <div>
                  <dt className="text-ink-soft">{copy.visit.hours.opd}</dt>
                  <dd className="font-semibold">
                    {formatDays(hours.opd.days, copy)}, {formatHours(hours.opd, copy)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <h3 className="mt-8 t-h4 text-clay-700">{copy.visit.accessTitle}</h3>
          <ul className="mt-2 space-y-2">
            {copy.visit.access.map((a, i) => {
              const Icon = accessIcons[i] ?? Car;
              return (
                <li key={a} className="flex gap-3">
                  <Icon className="mt-1 size-5 shrink-0 text-teal-700" aria-hidden="true" />
                  <span>{a}</span>
                </li>
              );
            })}
          </ul>

          {flags.showTravelTimes && (
            <>
              <h3 className="mt-8 t-h4 text-clay-700">{copy.visit.routesTitle}</h3>
              <ul className="mt-2 space-y-1">
                {routes.map((r) => (
                  <li key={r.id}>
                    {copy.visit.routes[r.id]}: {copy.visit.routeDistance(r.km, r.minutes)}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonAnchor href={`tel:${contact.primary.tel}`} icon={<Phone aria-hidden="true" />}>
              {copy.actions.call}
            </ButtonAnchor>
            <ButtonAnchor href={address.directionsUrl} variant="secondary" icon={<Navigation aria-hidden="true" />}>
              {copy.actions.directions}
            </ButtonAnchor>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.08}>
          <div className="glass-card p-2 sm:p-2.5 rounded-[var(--radius-lg)] shadow-[var(--shadow-lift)] h-full min-h-[22rem] lg:min-h-[36rem]">
            <div className="relative h-full min-h-[20rem] overflow-hidden rounded-[var(--radius-md)] ring-1 ring-black/5 lg:min-h-[34rem]">
              <iframe
                title={copy.visit.mapTitle}
                src={address.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[20%]"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}



==============================================================================
// FILE: src/vite-env.d.ts
==============================================================================

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOOKING_ENDPOINT?: string;
}



==============================================================================
// FILE: tools/check-contrast.mjs
==============================================================================

/**
 * WCAG contrast check for the text/background pairs the site uses.
 * Reads token values from src/styles/index.css.  npm run check:contrast
 */
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../src/styles/index.css', import.meta.url), 'utf8');
const tokens = Object.fromEntries([...css.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
const hex = (name) => (name === 'white' ? '#ffffff' : tokens[name]);

// [text, background, min ratio, where]
const pairs = [
  ['ink', 'ivory', 4.5, 'body text'],
  ['ink-soft', 'ivory', 4.5, 'secondary text'],
  ['ink-muted', 'ivory', 4.5, 'small notes'],
  ['ink-muted', 'paper', 4.5, 'card notes'],
  ['ink-soft', 'sand', 4.5, 'sand sections'],
  ['ink-muted', 'sand', 4.5, 'sand notes'],
  ['ink-soft', 'sage-50', 4.5, 'pregnancy section'],
  ['ink-muted', 'sage-50', 4.5, 'pregnancy notes'],
  ['ink-soft', 'sage-100', 4.5, 'duty band'],
  ['ink-soft', 'clay-50', 4.5, 'extra care band'],
  ['teal-950', 'ivory', 4.5, 'headings'],
  ['teal-800', 'ivory', 4.5, 'links'],
  ['teal-800', 'paper', 4.5, 'card links'],
  ['ivory', 'teal-700', 4.5, 'primary button'],
  ['ivory', 'teal-800', 4.5, 'active tab, CTA band'],
  ['teal-100', 'teal-800', 4.5, 'CTA band text'],
  ['ivory', 'teal-900', 4.5, 'IVF section'],
  ['teal-100', 'teal-900', 4.5, 'IVF lead'],
  ['teal-200', 'teal-900', 4.5, 'IVF label, step word'],
  ['clay-200', 'teal-800', 3, 'IVF illustration (non-text)'],
  ['teal-100', 'teal-950', 4.5, 'footer text'],
  ['teal-200', 'teal-950', 4.5, 'footer legal'],
  ['clay-600', 'ivory', 4.5, 'role labels'],
  ['clay-600', 'paper', 4.5, 'stage focus'],
  ['clay-600', 'sand', 3, '70,000+ (large)'],
  ['clay-700', 'sand', 4.5, 'visit labels'],
  ['clay-700', 'clay-50', 4.5, 'due window label'],
  ['clay-600', 'ivory', 4.5, 'tagline (italic)'],
  ['sage-700', 'sage-50', 4.5, 'pregnancy label'],
  ['teal-800', 'sage-50', 3, 'week number (large)'],
  ['white', 'emergency', 4.5, 'emergency button'],
  ['emergency', 'paper', 4.5, 'mobile bar Call'],
  ['emergency-700', 'emergency-50', 4.5, 'emergency notes'],
  ['ink-soft', 'sand', 4.5, 'inactive tab'],
  ['teal-900', 'ivory', 4.5, 'light button text'],
  ['teal-600', 'ivory', 3, 'focus ring (non-text)'],
  ['teal-600', 'paper', 3, 'check icons (non-text)'],
];

let failed = 0;
for (const [fg, bg, min, where] of pairs) {
  const r = ratio(hex(fg), hex(bg));
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? 'pass' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  (min ${min})  ${fg} on ${bg}  ${where}`);
}
console.log(failed ? `\n${failed} pair(s) below WCAG AA` : '\nAll pairs meet WCAG AA');
process.exitCode = failed ? 1 : 0;



==============================================================================
// FILE: tools/check-copy.mjs
==============================================================================

/**
 * Scans site copy (and the built HTML, if present) for banned words, en and
 * em dashes, emojis and leftover draft wording.   npm run check:copy
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const banned = [
  'seamless', 'holistic', 'cutting edge', 'cutting-edge', 'world class', 'world-class',
  'quiet empathy', 'state of the art', 'state-of-the-art', 'journey',
  // draft text that must never ship
  'placeholder', 'lorem', 'sample patient', 'documentation in progress', 'reported milestone', 'todo', 'tbd',
];
const dash = /[–—]/;
const emoji = /\p{Extended_Pictographic}/u;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const targets = [];
for await (const f of walk(path.join(root, 'src/content/copy'))) targets.push(f);
try {
  if ((await stat(path.join(root, 'dist'))).isDirectory()) {
    for await (const f of walk(path.join(root, 'dist'))) if (f.endsWith('.html')) targets.push(f);
  }
} catch {
  /* no build yet */
}

let issues = 0;
for (const file of targets) {
  let text = await readFile(file, 'utf8');
  if (file.endsWith('.html')) {
    // Visible text only: drop scripts, styles, tags and the © line exception.
    text = text
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<[^>]+>/g, '\n');
  }
  text.split('\n').forEach((line, i) => {
    const lower = line.toLowerCase();
    const hits = banned.filter((w) => new RegExp(`\\b${w}\\b`).test(lower));
    if (dash.test(line)) hits.push('dash');
    if (emoji.test(line.replace(/[©®™]/g, ''))) hits.push('emoji');
    if (hits.length) {
      issues++;
      console.log(`${path.relative(root, file)}:${i + 1}  [${hits.join(', ')}]  ${line.trim().slice(0, 120)}`);
    }
  });
}
console.log(issues ? `\n${issues} line(s) need fixing` : `Copy check passed (${targets.length} files)`);
process.exitCode = issues ? 1 : 0;



==============================================================================
// FILE: tools/check-fonts.mjs
==============================================================================

/**
 * Font consistency check.   npm run check:fonts
 *
 * Catches two silent failures that no other check covers:
 *
 *  1. A font loaded from a CDN in index.html that the stylesheet never uses.
 *     That happened here: index.html requested Outfit and Plus Jakarta Sans
 *     while the CSS had moved to self-hosted DM Sans and Source Sans 3, so
 *     every visitor downloaded two families the page never rendered with.
 *
 *  2. A font named in the CSS that is neither bundled via Fontsource nor
 *     loaded from a CDN, which means it silently falls back to a system font.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const css = await readFile(path.join(root, 'src/styles/index.css'), 'utf8');
const html = await readFile(path.join(root, 'index.html'), 'utf8');

const problems = [];

/* Families the stylesheet actually uses, from the --font-* tokens. */
const tokens = [...css.matchAll(/--font-[a-z]+:\s*([^;]+);/g)].map((m) => m[1]).join(' ');
const declared = new Set(
  [...tokens.matchAll(/'([^']+)'/g)]
    .map((m) => m[1].trim())
    .filter((n) => !/^(ui-|system-ui|-apple-system|Segoe UI|Roboto|sans-serif|serif|Georgia|monospace)$/i.test(n))
    .map((n) => n.replace(/\s+Variable$/, '')),
);

/* Families bundled through Fontsource (@import '@fontsource.../<family>/...'). */
const bundled = new Set(
  [...css.matchAll(/@fontsource(?:-variable)?\/([a-z0-9-]+)\//g)].map((m) =>
    m[1].split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' '),
  ),
);

/* Families requested from a CDN. */
const cdn = new Set(
  [...html.matchAll(/fonts\.googleapis\.com\/css2\?([^"']+)/g)]
    .flatMap((m) => decodeURIComponent(m[1]).split('&'))
    .filter((p) => p.startsWith('family='))
    .map((p) => p.replace('family=', '').split(':')[0].replace(/\+/g, ' ')),
);

for (const family of cdn) {
  if (![...declared].some((d) => d.toLowerCase() === family.toLowerCase())) {
    problems.push(`index.html loads "${family}" from Google Fonts but the CSS never uses it.`);
  }
}

for (const family of declared) {
  const same = (a, b) => a.toLowerCase() === b.toLowerCase();
  const known = [...bundled].some((b) => same(b, family)) || [...cdn].some((c) => same(c, family));
  if (!known) {
    problems.push(`CSS names "${family}" but it is neither bundled via Fontsource nor loaded from a CDN.`);
  }
}

if (problems.length) {
  console.error('Font check failed:\n' + problems.map((p) => '  - ' + p).join('\n'));
  process.exit(1);
}

console.log(
  `Font check passed. Used: ${[...declared].join(', ') || 'none'}. ` +
    `Bundled: ${[...bundled].join(', ') || 'none'}. CDN: ${[...cdn].join(', ') || 'none'}.`,
);



==============================================================================
// FILE: tools/make-brand-assets.mjs
==============================================================================

/**
 * Builds the Open Graph image and app icons from brand/lailas-logo-source.jpg.
 * Replace the source with a vector logo when the hospital supplies one.
 *
 *   npm run brand
 */
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'brand/lailas-logo-source.jpg');
const out = (f) => path.join(root, 'public', f);
const IVORY = { r: 251, g: 247, b: 240 };

// Full logo (symbol + wordmark) and the round symbol on its own.
const logo = await sharp(src).extract({ left: 180, top: 390, width: 720, height: 300 }).toBuffer();
const symbol = await sharp(src).extract({ left: 176, top: 388, width: 300, height: 300 }).toBuffer();

// White JPG background disappears into ivory with a multiply blend.
const onIvory = async (input, width, height) =>
  sharp({ create: { width, height, channels: 3, background: IVORY } })
    .composite([{ input, blend: 'multiply', gravity: 'center' }])
    .png()
    .toBuffer();

// Open Graph 1200x630: logo on ivory with a soft clay arch.
const arch = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <path d="M860 630V330a170 170 0 0 1 340 0v300z" fill="#f6e6da"/>
  <circle cx="1030" cy="420" r="120" fill="none" stroke="#d18b63" stroke-opacity=".45" stroke-width="3"/>
  <circle cx="1080" cy="368" r="22" fill="none" stroke="#d18b63" stroke-opacity=".45" stroke-width="3"/>
</svg>`);
const logoWide = await sharp(logo).resize({ width: 720 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: IVORY } })
  .composite([
    { input: arch, top: 0, left: 0 },
    { input: logoWide, top: 165, left: 90, blend: 'multiply' },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(out('og.jpg'));

for (const [file, size] of [
  ['icon-512.png', 512],
  ['icon-192.png', 192],
  ['apple-touch-icon.png', 180],
  ['favicon-32.png', 32],
]) {
  const inner = Math.round(size * 0.8);
  const sym = await sharp(symbol).resize(inner, inner).toBuffer();
  await sharp(await onIvory(sym, size, size)).png().toFile(out(file));
}
console.log('Wrote public/og.jpg and icons');



==============================================================================
// FILE: tools/prerender.mjs
==============================================================================

/**
 * Renders every page to static HTML after the client build, so search engines
 * and slow phones get real content immediately. Also writes sitemap.xml.
 */
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

/**
 * Locate the SSR entry.
 *
 * Vite emits `dist-ssr/entry-server.js` on its own, but when a plugin changes
 * the output (Cloudflare's Vite plugin does, because it enables chunking) the
 * entry becomes `dist-ssr/assets/entry-server-<hash>.js`. Both are valid, so
 * find whichever exists rather than assuming one path.
 */
async function findSsrEntry(dir) {
  const direct = path.join(dir, 'entry-server.js');
  const found = [];
  const walk = async (d) => {
    for (const e of await readdir(d, { withFileTypes: true })) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) await walk(full);
      else if (/^entry-server.*\.js$/.test(e.name)) found.push(full);
    }
  };
  try {
    await readdir(dir);
  } catch {
    throw new Error(
      `SSR build output not found at ${dir}. Did \`vite build --ssr\` run before prerender?`,
    );
  }
  await walk(dir);
  if (found.length === 0) {
    throw new Error(`No entry-server*.js found in ${dir}. Contents could not be prerendered.`);
  }
  // Prefer a top-level entry over a hashed chunk when both are present.
  found.sort((a, b) => a.length - b.length);
  return found[0];
}

const ssrEntry = await findSsrEntry(ssrDir);
console.log(`prerender: using SSR entry ${path.relative(root, ssrEntry)}`);
/**
 * Accept either export shape.
 *
 * Vite emits the entry with named exports. When a plugin changes the output
 * format (Cloudflare's Vite plugin does) the same values arrive wrapped in
 * `default`, which made `pages` undefined and failed with "pages is not
 * iterable". Normalise rather than assume.
 */
const ssrModule = await import(pathToFileURL(ssrEntry).href);
const ssr = typeof ssrModule.render === 'function' ? ssrModule : ssrModule.default;

if (!ssr || typeof ssr.render !== 'function' || !Array.isArray(ssr.pages)) {
  throw new Error(
    `SSR entry at ${path.relative(root, ssrEntry)} did not expose render() and pages[]. ` +
      `Found keys: ${Object.keys(ssrModule).join(', ') || 'none'}`,
  );
}

const { render, pages, renderHead, siteUrl } = ssr;

const template = await readFile(path.join(dist, 'index.html'), 'utf8');

// Preload the two Latin fonts used above the fold to avoid layout shift.
const assets = await readdir(path.join(dist, 'assets'));
const preload = ['dm-sans-latin-wght-normal']
  .map((n) => assets.find((f) => f.startsWith(n) && f.endsWith('.woff2')))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ');

const page = (url) =>
  template
    .replace(/<title>.*?<\/title>\s*/, '')
    .replace(/<meta name="description".*?\/>\s*/, '')
    .replace(/<meta property="og:title".*?\/>\s*/, '')
    .replace(/<meta property="og:description".*?\/>\s*/, '')
    .replace('<!--app-head-->', `${renderHead(url)}\n    ${preload}`)
    .replace('<!--app-html-->', render(url));

for (const p of pages) {
  const html = page(p.path);
  const file = p.path === '/' ? path.join(dist, 'index.html') : path.join(dist, p.path.slice(1), 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
  if (p.path !== '/') await writeFile(path.join(dist, `${p.path.slice(1)}.html`), html);
  console.log(`prerendered ${p.path}`);
}
await writeFile(path.join(dist, '404.html'), page('/404'));
console.log('prerendered 404.html');

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${siteUrl}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await rm(ssrDir, { recursive: true, force: true });
console.log('wrote sitemap.xml');



==============================================================================
// FILE: tools/process-photos.mjs
==============================================================================

/**
 * Turns originals in photos/<id>.(jpg|jpeg|png|webp|heic) into responsive
 * AVIF + WebP files and a blur preview, and updates the manifest that
 * src/content/images.ts reads.
 *
 *   npm run photos
 */
import { readdir, readFile, writeFile, mkdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const inDir = path.join(root, 'photos');
const outDir = path.join(root, 'src/assets/photos');
const manifestPath = path.join(outDir, 'manifest.json');
const WIDTHS = [480, 800, 1200, 1800];

const imagesTs = await readFile(path.join(root, 'src/content/images.ts'), 'utf8');
const knownIds = new Set([...imagesTs.matchAll(/^\s{2}'([a-z0-9-]+)': \{/gm)].map((m) => m[1]));

await mkdir(outDir, { recursive: true });
const manifest = JSON.parse(await readFile(manifestPath, 'utf8').catch(() => '{}'));
const originals = (await readdir(inDir)).filter((f) => /\.(jpe?g|png|webp|heic|tiff?)$/i.test(f));

if (originals.length === 0) {
  console.log('No photos found in photos/. Add files named by image id, e.g. hero-main.jpg');
}

for (const file of originals) {
  const id = path.parse(file).name.toLowerCase();
  if (!knownIds.has(id)) {
    console.warn(`Skipping ${file}: "${id}" is not an id in src/content/images.ts`);
    continue;
  }
  const input = sharp(path.join(inDir, file)).rotate();
  const { width, height } = await input.metadata();
  const oriented = (await input.clone().metadata()).orientation >= 5 ? { width: height, height: width } : { width, height };

  // Remove older sizes for this id.
  for (const f of await readdir(outDir)) {
    if (f.startsWith(`${id}-`) && /\.(avif|webp)$/.test(f)) await unlink(path.join(outDir, f));
  }

  const widths = WIDTHS.filter((w) => w <= oriented.width);
  if (widths.length === 0) widths.push(oriented.width);

  for (const w of widths) {
    const resized = input.clone().resize({ width: w, withoutEnlargement: true });
    await resized.clone().avif({ quality: 52, effort: 5 }).toFile(path.join(outDir, `${id}-${w}.avif`));
    await resized.clone().webp({ quality: 74, effort: 5 }).toFile(path.join(outDir, `${id}-${w}.webp`));
  }

  const blurBuffer = await input.clone().resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer();
  manifest[id] = {
    width: oriented.width,
    height: oriented.height,
    blur: `data:image/webp;base64,${blurBuffer.toString('base64')}`,
    widths,
  };
  console.log(`${id}: ${widths.join(', ')}px`);
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Manifest has ${Object.keys(manifest).length} photo(s).`);



==============================================================================
// FILE: tools/screenshot.mjs
==============================================================================

/**
 * Full-page screenshots at phone, tablet and desktop widths, plus a check for
 * horizontal overflow and console errors.
 *
 *   node tools/screenshot.mjs [baseUrl] [path ...] [--lang=ml] [--out=screenshots]
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const args = process.argv.slice(2);
const flag = (name, def) => args.find((a) => a.startsWith(`--${name}=`))?.split('=')[1] ?? def;
const positional = args.filter((a) => !a.startsWith('--'));
const base = positional[0] ?? 'http://localhost:3000';
const paths = positional.slice(1).length ? positional.slice(1) : ['/'];
const lang = flag('lang', 'en');
const outDir = path.resolve(flag('out', 'screenshots'));
const widths = (flag('widths', '390,768,1440')).split(',').map(Number);

await mkdir(outDir, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});

let problems = 0;
for (const p of paths) {
  for (const width of widths) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width, height: width < 600 ? 844 : 900, deviceScaleFactor: 1, isMobile: width < 600, hasTouch: width < 600 });
    await page.evaluateOnNewDocument((l) => localStorage.setItem('lailas.lang', l), lang);
    await page.goto(base + p, { waitUntil: 'networkidle0' });
    // Reveal everything that animates on scroll, then settle.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 900));
    });
    const overflow = await page.evaluate(() => {
      const w = document.documentElement.clientWidth;
      const offenders = [];
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.right > w + 1 && getComputedStyle(el).position !== 'fixed') {
          let a = el.parentElement;
          let clipped = false;
          while (a) {
            const s = getComputedStyle(a);
            if (/(hidden|auto|scroll|clip)/.test(s.overflowX) && a.getBoundingClientRect().right <= w + 1) {
              clipped = true;
              break;
            }
            a = a.parentElement;
          }
          if (!clipped) offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
        }
      }
      return { scrollWidth: document.documentElement.scrollWidth, width: w, offenders: offenders.slice(0, 5) };
    });
    const name = `${p === '/' ? 'home' : p.replace(/\//g, '')}-${lang}-${width}.png`;
    await page.screenshot({ path: path.join(outDir, name), fullPage: true });
    const bad = overflow.scrollWidth > overflow.width || errors.length;
    if (bad) problems++;
    console.log(
      `${bad ? 'FAIL' : 'ok  '} ${name}  overflow:${overflow.scrollWidth - overflow.width}px ${overflow.offenders.join(' ')} ${errors.length ? 'errors: ' + errors.join(' | ').slice(0, 300) : ''}`,
    );
    await page.close();
  }
}
await browser.close();
process.exitCode = problems ? 1 : 0;



==============================================================================
// FILE: index.html
==============================================================================

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#0b241f" />
    <title>Lailas Hospital &amp; IVF Centre</title>
    <meta name="description" content="Official website for Lailas Hospital and IVF Centre in Chemmad, Malappuram, Kerala. Dedicated care for women's healthcare, maternity, and fertility consultations." />
    <meta property="og:title" content="Lailas Hospital &amp; IVF Centre" />
    <meta property="og:description" content="Official website for Lailas Hospital and IVF Centre in Chemmad, Malappuram, Kerala. Dedicated care for women's healthcare, maternity, and fertility consultations." />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <!--app-head-->
    <noscript><style>[style*="opacity:0"]{opacity:1!important;transform:none!important}</style></noscript>
  </head>
  <body>
    <div id="root"><!--app-html--></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>



==============================================================================
// FILE: metadata.json
==============================================================================

{
  "name": "Lailas Hospital & IVF Centre",
  "description": "Official website for Lailas Hospital and IVF Centre in Chemmad, Malappuram, Kerala. Dedicated care for women's healthcare, maternity, and fertility consultations.",
  "permissions": [],
  "capabilities": [
    "MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"
  ]
}



==============================================================================
// FILE: package.json
==============================================================================

{
  "name": "lailas-hospital-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "description": "Website for Lailas Hospital & IVF Centre, Chemmad, Malappuram, Kerala.",
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node tools/prerender.mjs",
    "preview": "vite preview --port=4173",
    "lint": "tsc --noEmit",
    "typecheck": "tsc --noEmit",
    "photos": "node tools/process-photos.mjs",
    "brand": "node tools/make-brand-assets.mjs",
    "check:copy": "node tools/check-copy.mjs",
    "check:contrast": "node tools/check-contrast.mjs",
    "screenshots": "node tools/screenshot.mjs",
    "check": "npm run typecheck && npm run check:contrast && npm run check:copy && npm run check:fonts",
    "check:fonts": "node tools/check-fonts.mjs"
  },
  "dependencies": {
    "@fontsource-variable/dm-sans": "^5.3.0",
    "lucide-react": "^0.546.0",
    "motion": "^14.2.0",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "react-router": "^8.4.0",
    "tailwind-merge": "^3.7.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "@types/node": "^22.14.0",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.1",
    "puppeteer-core": "^25.14.0",
    "sharp": "^0.35.5",
    "tailwindcss": "^4.3.3",
    "typescript": "^7.0.2",
    "vite": "^8.3.0",
    "wrangler": "^4.151.1"
  }
}



==============================================================================
// FILE: tsconfig.json
==============================================================================

{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vite/client"],
    "jsx": "react-jsx",
    "isolatedModules": true,
    "moduleDetection": "force",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noEmit": true
  },
  "include": ["src", "vite.config.ts"]
}



==============================================================================
// FILE: vite.config.ts
==============================================================================

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  build: {
    // Images are the heaviest asset on this site; keep separate hashed files
    // so browsers can cache them independently of the JS/CSS bundles.
    assetsInlineLimit: 2048,
  },
});



==============================================================================
// FILE: wrangler.jsonc
==============================================================================

{
  // Committing this file stops Wrangler's auto-config. Without it every deploy
  // installs @cloudflare/vite-plugin, rewrites the package.json scripts, runs
  // the build a second time, and changes the SSR output shape (hashed entry,
  // default-wrapped exports) which broke tools/prerender.mjs twice.
  //
  // The build already produces a complete static site in dist/, so this is an
  // assets-only Worker. No Worker script is needed.
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "lailas-hospital-website",
  "compatibility_date": "2026-10-12",
  "observability": { "enabled": true },

  "assets": {
    "directory": "./dist",

    // dist/ holds maternity.html and doctors.html, plus a maternity/ and
    // doctors/ directory for the same route. auto-trailing-slash resolves both
    // forms without a redirect, matching how the prerenderer writes them.
    "html_handling": "auto-trailing-slash",

    // Serve the generated 404.html with a real 404 status. The default,
    // "single-page-application", answers every unknown URL with index.html and
    // a 200, which search engines treat as a soft 404.
    "not_found_handling": "404-page"
  }
}

