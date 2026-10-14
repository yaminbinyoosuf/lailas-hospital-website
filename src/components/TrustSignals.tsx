import React, { useEffect, useState } from 'react';
import {
  Quote,
  ShieldCheck,
  Lock,
  ShieldAlert,
  Check,
  Ban,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Clock3,
  Info,
} from 'lucide-react';
import {
  ACCREDITATIONS,
  SECURITY_BADGES,
  TESTIMONIALS,
  type SecurityBadge,
} from '../data/hospitalData';
import { Container, SectionHeading } from './ui';

/* ============================================================================
   Trust signals
   ----------------------------------------------------------------------------
   IMPORTANT — nothing here may overstate reality:
     • Unconfirmed accreditations render as "in progress", never as a badge
       claiming certification.
     • Placeholder testimonials carry a visible "sample" marker so they cannot
       be mistaken for real patient stories in a demo.
   Replace the underlying data once management confirms it.
   ========================================================================== */

const SECURITY_ICONS: Record<SecurityBadge['icon'], React.ElementType> = {
  lock: Lock,
  shield: ShieldAlert,
  check: Check,
  ban: Ban,
};

/* -------------------------------------------------------------------------- */

export const AccreditationStrip: React.FC = () => {
  const confirmed = ACCREDITATIONS.filter((a) => a.confirmed);
  const pending = ACCREDITATIONS.filter((a) => !a.confirmed);

  return (
    <section className="border-y border-line bg-white/60 py-10" aria-labelledby="accreditation-heading">
      <Container width="wide">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
          <div className="lg:w-72 lg:shrink-0">
            <p className="eyebrow" id="accreditation-heading">
              Standards &amp; compliance
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
              We publish our compliance position openly — including the items still being processed.
            </p>
          </div>

          <div className="grid flex-1 gap-3 sm:grid-cols-2">
            {[...confirmed, ...pending].map((a) => (
              <div
                key={a.id}
                className={`flex items-start gap-3 rounded-xl border p-3.5 ${
                  a.confirmed ? 'border-brand-200 bg-brand-50/50' : 'border-line bg-canvas'
                }`}
              >
                <span
                  className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl ${
                    a.confirmed ? 'bg-brand-700 text-white' : 'bg-brand-100 text-sand-600'
                  }`}
                >
                  {a.confirmed ? (
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Clock3 className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-brand-800">{a.name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">{a.detail}</p>
                  <span
                    className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold ${
                      a.confirmed ? 'bg-brand-100 text-brand-800' : 'bg-brand-50 text-sand-600'
                    }`}
                  >
                    {a.confirmed ? 'Confirmed' : 'Documentation in progress'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

/* -------------------------------------------------------------------------- */

export const SecurityAssurance: React.FC = () => (
  <section className="py-16 sm:py-20" aria-labelledby="security-heading">
    <Container width="wide">
      <SectionHeading
        align="center"
        eyebrow="Your data"
        title={<span id="security-heading">What happens to the information you share</span>}
        description="Sharing details about your health takes trust. Here is exactly how we handle it."
      />

      <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SECURITY_BADGES.map((b, i) => {
          const Icon = SECURITY_ICONS[b.icon];
          return (
            <div
              key={b.id}
              data-reveal-index={i}
              className="reveal rounded-3xl border border-line-soft bg-white p-6 shadow-[var(--shadow-soft)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[1.0625rem]">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{b.detail}</p>
            </div>
          );
        })}
      </div>

      <p className="mx-auto mt-8 flex max-w-2xl items-start gap-2.5 rounded-2xl border border-line bg-canvas p-4 text-sm leading-relaxed text-ink-soft">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sand-600" aria-hidden="true" />
        <span>
          We never ask for clinical history through a public web form. Please describe symptoms to a
          clinician, not in a booking note.
        </span>
      </p>
    </Container>
  </section>
);

/* -------------------------------------------------------------------------- */

export const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  // Auto-advance, but stop for reduced-motion users and while hovered/focused.
  useEffect(() => {
    if (paused || count <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);
  const current = TESTIMONIALS[index];
  const anySample = TESTIMONIALS.some((t) => t.isSample);

  return (
    <section
      className="pb-16 sm:pb-20"
      aria-labelledby="testimonial-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Container width="default">
        <h2 id="testimonial-heading" className="sr-only-focusable">
          Patient feedback
        </h2>

        <div className="reveal relative overflow-hidden rounded-3xl bg-brand-800 px-6 py-12 text-white sm:px-14 sm:py-14">
          <Quote className="h-8 w-8 text-brand-300" aria-hidden="true" />

          {/* Announce slide changes to screen readers. */}
          <div aria-live="polite" aria-atomic="true">
            <blockquote className="relative z-10 mt-5">
              <p className="display text-[clamp(1.25rem,1rem+1.1vw,1.75rem)] leading-snug text-white">
                “{current.quote}”
              </p>
            </blockquote>
            <div className="relative z-10 mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="font-semibold text-white">{current.author}</p>
              <span className="h-1 w-1 rounded-full bg-brand-400" aria-hidden="true" />
              <p className="text-sm text-brand-200/80">{current.context}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="relative z-10 mt-8 flex items-center justify-between gap-4">
            <div className="flex gap-2" role="tablist" aria-label="Choose a patient story">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Story ${i + 1} of ${count}`}
                  onClick={() => setIndex(i)}
                  className="group grid h-11 min-w-11 place-items-center"
                >
                  {/* Visual dot stays small; the button itself is a 44px target. */}
                  <span
                    className={`block h-3 rounded-full transition-all duration-300 ${
                      i === index ? 'w-8 bg-white' : 'w-3 bg-white/40 group-hover:bg-white/70'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                className="tap rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
                aria-label="Previous story"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="tap rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
                aria-label="Next story"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {anySample && (
            <p className="relative z-10 mt-6 flex items-start gap-2.5 rounded-[1.75rem] border border-white/15 bg-white/10 p-3.5 text-xs leading-relaxed text-brand-200/85">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>
                These stories are illustrative samples for this design preview. They will be replaced
                with real, consented patient feedback before the site goes live.
              </span>
            </p>
          )}
        </div>
      </Container>
    </section>
  );
};
