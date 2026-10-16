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
