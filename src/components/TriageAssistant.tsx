import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Baby,
  Brain,
  Bone,
  Heart,
  Phone,
  Search,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Activity,
  RotateCcw,
  Info,
} from 'lucide-react';
import {
  EMERGENCY_KEYWORDS,
  HOSPITAL_DATA,
  TRIAGE_RULES,
  getSpeciality,
  type SpecialityIcon,
  type TriageRule,
} from '../data/hospitalData';
import { Drawer } from './Overlay';
import { Button } from './ui';

/* ============================================================================
   Symptom guidance / triage assistant
   ----------------------------------------------------------------------------
   CLINICAL SAFETY RULES BAKED INTO THIS COMPONENT:
     1. It never states a diagnosis. It only suggests which clinic to contact.
     2. Emergency wording always short-circuits to a phone call — the booking
        action is deliberately hidden in that branch.
     3. A persistent disclaimer states it is not medical advice.
     4. It reports low confidence rather than guessing when nothing matches.
   ========================================================================== */

const ICONS: Record<SpecialityIcon, React.ElementType> = {
  baby: Baby,
  heart: Heart,
  brain: Brain,
  bone: Bone,
  child: Activity,
  stethoscope: Stethoscope,
  flask: Activity,
  pill: Activity,
  ambulance: ShieldAlert,
  sparkles: Sparkles,
};

interface ScoredRule {
  rule: TriageRule;
  score: number;
}

const normalise = (v: string): string =>
  v.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

/** True when the description contains language that must escalate immediately. */
export function detectEmergency(input: string): boolean {
  const text = normalise(input);
  return EMERGENCY_KEYWORDS.some((k) => text.includes(k));
}

/** Rank triage rules against a free-text symptom description. */
export function matchRules(input: string): ScoredRule[] {
  const text = normalise(input);
  if (text.length < 3) return [];

  const scored: ScoredRule[] = TRIAGE_RULES.map((rule) => {
    let score = 0;
    for (const keyword of rule.keywords) {
      if (text.includes(keyword)) {
        // Longer, more specific keywords are worth more.
        score += keyword.length >= 6 ? 3 : 2;
      }
    }
    // A direct hit on the rule label is the strongest signal.
    if (normalise(rule.label).split(' ').some((w) => w.length > 4 && text.includes(w))) score += 2;
    return { rule, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.rule.urgency - b.rule.urgency);

  return scored;
}

const QUICK_PICKS = [
  'My periods are irregular',
  'I have fever and body pain',
  'Knee pain while walking',
  'We are trying to conceive',
  'My child has a cough',
  'Frequent headaches',
];

interface TriageAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onBookSpeciality: (specialityId: string) => void;
}

export const TriageAssistant: React.FC<TriageAssistantProps> = ({
  isOpen,
  onClose,
  onBookSpeciality,
}) => {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isEmergency = useMemo(() => detectEmergency(input), [input]);
  const matches = useMemo(() => (submitted ? matchRules(input) : []), [submitted, input]);
  const best = matches[0];
  const alternatives = matches.slice(1, 4);

  const reset = () => {
    setInput('');
    setSubmitted(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      title="Find the right clinic"
      eyebrow="Symptom guidance"
      side="bottom-mobile"
      footer={
        <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sand-600" aria-hidden="true" />
          This tool suggests which department to contact. It is not a diagnosis and does not replace
          assessment by a qualified clinician.
        </p>
      }
    >
      {/* --- Emergency banner (never hidden) ------------------------------ */}
      {isEmergency ? (
        <div className="rounded-xl border border-critical-line bg-critical-soft p-4">
          <p className="flex items-center gap-2 font-semibold text-critical">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            Please call us now
          </p>
          <p className="mt-2 text-sm leading-relaxed text-critical">
            What you have described may need urgent medical attention. Do not wait for an online
            reply — call the hospital or come straight to casualty.
          </p>
          <a
            href={`tel:${HOSPITAL_DATA.emergency.tel}`}
            className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-critical px-5 py-3 font-semibold text-white"
          >
            <Phone className="h-5 w-5" />
            <span className="tabular-numbers">Call {HOSPITAL_DATA.emergency.display}</span>
          </a>
          <p className="mt-2 text-center text-xs text-critical">
            {HOSPITAL_DATA.operatingHours.emergencyCasualty}
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-line bg-white p-4">
          <p className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-coral-600" aria-hidden="true" />
            <span>
              If this is an emergency — severe chest pain, heavy bleeding, difficulty breathing or
              an unconscious patient — call{' '}
              <a
                href={`tel:${HOSPITAL_DATA.emergency.tel}`}
                className="tabular-numbers font-semibold text-critical underline"
              >
                {HOSPITAL_DATA.emergency.display}
              </a>{' '}
              instead.
            </span>
          </p>
        </div>
      )}

      {/* --- Input --------------------------------------------------------- */}
      {!isEmergency && (
        <>
          <form
            className="mt-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <label htmlFor="triage-input" className="block text-sm font-semibold text-brand-800">
              Describe what you are feeling
            </label>
            <p className="mt-1 text-xs text-ink-soft">
              Plain words are fine — for example “burning while passing urine for three days”.
            </p>
            <div className="relative mt-2.5">
              <Search
                className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-sand-500"
                aria-hidden="true"
              />
              <textarea
                id="triage-input"
                rows={3}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setSubmitted(false);
                }}
                placeholder="Type your symptoms here…"
                className="w-full rounded-xl border border-line bg-white py-3.5 pl-11 pr-4 text-base text-ink placeholder:text-sand-500 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
              />
            </div>
            <div className="mt-3 flex gap-2.5">
              <Button type="submit" size="lg" className="flex-1" disabled={input.trim().length < 3}>
                Show me where to go
                <ArrowRight className="h-4 w-4" />
              </Button>
              {(input || submitted) && (
                <Button type="button" variant="secondary" size="lg" onClick={reset} aria-label="Start over">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </form>

          {/* Quick picks */}
          {!submitted && (
            <div className="mt-6">
              <p className="text-xs font-semibold text-ink-soft">Or start with a common concern</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {QUICK_PICKS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => {
                      setInput(q);
                      setSubmitted(true);
                    }}
                    className="inline-flex min-h-10 items-center rounded-full border border-line bg-white px-3.5 py-2 text-xs font-medium text-brand-800 transition-colors hover:border-brand-300"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* --- Result ---------------------------------------------------- */}
          {submitted && (
            <div className="mt-6" aria-live="polite">
              {best ? (
                <ResultCard
                  rule={best.rule}
                  confidence={best.score >= 6 ? 'strong' : best.score >= 3 ? 'likely' : 'possible'}
                  onBook={() => {
                    handleClose();
                    onBookSpeciality(best.rule.specialityId);
                  }}
                />
              ) : (
                <div className="rounded-xl border border-line bg-white p-5 text-center">
                  <p className="font-semibold text-brand-800">
                    We could not match that confidently
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    Rather than guess, our reception team can direct you to the right clinic. You can
                    also browse departments and book directly.
                  </p>
                  <a
                    href={`tel:${HOSPITAL_DATA.phones[0].tel}`}
                    className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-700 px-5 py-3 font-semibold text-white"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="tabular-numbers">{HOSPITAL_DATA.phones[0].display}</span>
                  </a>
                </div>
              )}

              {/* Alternatives */}
              {alternatives.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold text-ink-soft">
                    Other departments that may also be relevant
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {alternatives.map(({ rule }) => {
                      const spec = getSpeciality(rule.specialityId);
                      const Icon = spec ? (ICONS[spec.icon] ?? Stethoscope) : Stethoscope;
                      return (
                        <li key={rule.id}>
                          <button
                            type="button"
                            onClick={() => {
                              handleClose();
                              onBookSpeciality(rule.specialityId);
                            }}
                            className="flex w-full items-center gap-3 rounded-xl border border-line bg-white p-3 text-left transition-colors hover:border-brand-300"
                          >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-medium text-brand-800">
                                {spec?.title ?? rule.label}
                              </span>
                              <span className="block truncate text-xs text-ink-soft">{rule.label}</span>
                            </span>
                            <ArrowRight className="h-4 w-4 shrink-0 text-sand-500" aria-hidden="true" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </Drawer>
  );
};

/* -------------------------------------------------------------------------- */

const CONFIDENCE_COPY = {
  strong: { label: 'Likely match', tone: 'bg-success-soft text-success' },
  likely: { label: 'Possible match', tone: 'bg-brand-50 text-brand-700' },
  possible: { label: 'Closest match', tone: 'bg-brand-50 text-sand-600' },
} as const;

const ResultCard: React.FC<{
  rule: TriageRule;
  confidence: keyof typeof CONFIDENCE_COPY;
  onBook: () => void;
}> = ({ rule, confidence, onBook }) => {
  const spec = getSpeciality(rule.specialityId);
  const Icon = spec ? (ICONS[spec.icon] ?? Stethoscope) : Stethoscope;
  const tone = CONFIDENCE_COPY[confidence];
  const urgent = rule.urgency === 2;

  return (
    <div className="overflow-hidden rounded-3xl border border-brand-200 bg-white">
      <div className="flex items-start gap-3.5 border-b border-line bg-brand-50/60 p-5">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-700 text-white">
          <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <span className={`inline-block rounded-full px-2.5 py-0.5 text-[0.6875rem] font-semibold ${tone.tone}`}>
            {tone.label}
          </span>
          <h3 className="mt-1.5 text-lg leading-snug">{spec?.title ?? 'Hospital reception'}</h3>
          <p className="mt-0.5 text-sm text-ink-soft">
            {spec?.shortTitle} · {spec?.availability}
          </p>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <p className="text-sm leading-relaxed text-ink-soft">{rule.advice}</p>

        {urgent && (
          <p className="flex items-start gap-2.5 rounded-xl border border-critical-line bg-critical-soft p-3.5 text-sm text-critical">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            If your symptoms are severe or getting worse quickly, call us rather than waiting for an
            appointment.
          </p>
        )}

        {spec && !spec.verified && (
          <p className="rounded-xl bg-brand-50 p-3.5 text-xs leading-relaxed text-sand-600">
            {spec.pendingNote ?? 'This service is pending confirmation.'}
          </p>
        )}

        {spec?.comingSoon ? (
          <a
            href={`tel:${HOSPITAL_DATA.phones[0].tel}`}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-700 px-5 py-3 font-semibold text-white"
          >
            <Phone className="h-4 w-4" />
            Call reception to arrange
          </a>
        ) : (
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <Button size="lg" className="flex-1" onClick={onBook}>
              Book with this department
              <ArrowRight className="h-4 w-4" />
            </Button>
            <a
              href={`tel:${HOSPITAL_DATA.phones[0].tel}`}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-[0.9375rem] font-semibold text-brand-800 transition-colors hover:border-brand-300"
            >
              <Phone className="h-4 w-4 text-coral-600" />
              Call instead
            </a>
          </div>
        )}

        <p className="text-xs leading-relaxed text-ink-soft">
          If you are unsure, mention your symptoms to reception when booking — they will direct you
          to the right clinic.
        </p>
      </div>
    </div>
  );
};
