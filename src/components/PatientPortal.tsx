import React, { useState } from 'react';
import {
  FlaskConical,
  Pill,
  FileText,
  Download,
  RefreshCw,
  BookOpen,
  Clock,
  Lock,
  ArrowRight,
  Info,
  CheckCircle2,
  Loader2,
  CalendarClock,
  Phone,
} from 'lucide-react';
import {
  HEALTH_ARTICLES,
  LAB_REPORTS,
  PRESCRIPTIONS,
  HOSPITAL_DATA,
} from '../data/hospitalData';
import { Button, Container, SectionHeading } from './ui';

/* ============================================================================
   Patient portal preview + health resources
   ----------------------------------------------------------------------------
   DEMO ONLY. There is no backend in this project, so the portal renders
   representative sample data. The component deliberately shows a "sample"
   notice rather than implying a live records system, and the sign-in is a
   non-functional preview.
   ========================================================================== */

type PortalTab = 'reports' | 'prescriptions';

const REPORT_STATUS = {
  Ready: { tone: 'bg-success-soft text-success', Icon: CheckCircle2 },
  Processing: { tone: 'bg-brand-50 text-brand-700', Icon: Loader2 },
  'Pending collection': { tone: 'bg-brand-50 text-sand-600', Icon: CalendarClock },
} as const;

export const PatientPortal: React.FC<{
  onNavigate: (path: string) => void;
  onOpenAppointmentModal: () => void;
}> = ({ onNavigate, onOpenAppointmentModal }) => {
  const [tab, setTab] = useState<PortalTab>('reports');

  return (
    <section className="pb-20 sm:pb-28" aria-labelledby="portal-heading">
      <Container width="wide">
        <div className="reveal grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* --- Left: framing ------------------------------------------- */}
          <div>
            <SectionHeading
              eyebrow="Patient portal"
              title={<span id="portal-heading">Your records, without the queue</span>}
              description="Check lab results, request a repeat prescription, and read guidance written in plain language. No waiting on hold, no travel."
            />

            <ul className="mt-7 space-y-3.5">
              {[
                { Icon: FlaskConical, text: 'Lab and scan reports as soon as they are released' },
                { Icon: Pill, text: 'Repeat prescription requests sent to the in-house pharmacy' },
                { Icon: BookOpen, text: 'Plain-language health guidance from our clinical team' },
                { Icon: Lock, text: 'Access limited to you and your treating team' },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-[0.9375rem] text-ink-soft">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="h-4 w-4" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={onOpenAppointmentModal} size="lg">
                <CalendarClock className="h-4 w-4" />
                Book a consultation
              </Button>
              <Button variant="secondary" size="lg" onClick={() => onNavigate('/contact')}>
                Ask reception
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* --- Right: portal card -------------------------------------- */}
          <div className="reveal overflow-hidden rounded-[2rem] border border-line bg-white shadow-[var(--shadow-lift)]">
            {/* Window chrome */}
            <div className="flex items-center justify-between gap-3 border-b border-line bg-canvas px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-700 text-white">
                  <Lock className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-brand-800">Patient portal</p>
                  <p className="text-xs text-ink-soft">Secure area</p>
                </div>
              </div>
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[0.6875rem] font-semibold text-sand-600">
                Sample data
              </span>
            </div>

            {/* Tabs */}
            <div role="tablist" aria-label="Patient portal sections" className="flex gap-1 border-b border-line px-3 pt-3">
              {(
                [
                  { id: 'reports' as const, label: 'Lab results', Icon: FlaskConical, count: LAB_REPORTS.length },
                  { id: 'prescriptions' as const, label: 'Prescriptions', Icon: Pill, count: PRESCRIPTIONS.length },
                ]
              ).map((t) => {
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    id={`portal-tab-${t.id}`}
                    aria-selected={active}
                    aria-controls={`portal-panel-${t.id}`}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setTab(t.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                        e.preventDefault();
                        setTab(t.id === 'reports' ? 'prescriptions' : 'reports');
                        document.getElementById(`portal-tab-${t.id === 'reports' ? 'prescriptions' : 'reports'}`)?.focus();
                      }
                    }}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-t-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                      active
                        ? 'border-b-2 border-brand-600 text-brand-800'
                        : 'text-ink-soft hover:text-brand-700'
                    }`}
                  >
                    <t.Icon className="h-4 w-4" aria-hidden="true" />
                    {t.label}
                    <span className="rounded-full bg-canvas px-1.5 text-[0.6875rem] font-medium text-ink-soft">
                      {t.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Panels */}
            <div className="p-4 sm:p-5">
              {tab === 'reports' ? (
                <ul
                  role="tabpanel"
                  id="portal-panel-reports"
                  aria-labelledby="portal-tab-reports"
                  className="divide-y divide-line"
                >
                  {LAB_REPORTS.map((r) => {
                    const meta = REPORT_STATUS[r.status];
                    return (
                      <li key={r.id} className="flex items-center gap-3 py-3.5 first:pt-1 last:pb-1">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-canvas text-brand-700">
                          <FileText className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[0.9375rem] font-medium text-brand-800">
                            {r.testName}
                          </p>
                          <p className="text-xs text-ink-soft">
                            {r.orderedBy} · collected {r.collectedOn}
                          </p>
                        </div>
                        <span
                          className={`hidden shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold sm:inline-flex ${meta.tone}`}
                        >
                          <meta.Icon className="h-3 w-3" aria-hidden="true" />
                          {r.status}
                        </span>
                        <button
                          type="button"
                          disabled={r.status !== 'Ready'}
                          className="tap shrink-0 rounded-full border border-line text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-35"
                          aria-label={`Download ${r.testName} report`}
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul
                  role="tabpanel"
                  id="portal-panel-prescriptions"
                  aria-labelledby="portal-tab-prescriptions"
                  className="divide-y divide-line"
                >
                  {PRESCRIPTIONS.map((p) => (
                    <li key={p.id} className="flex items-center gap-3 py-3.5 first:pt-1 last:pb-1">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-canvas text-brand-700">
                        <Pill className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.9375rem] font-medium text-brand-800">
                          {p.medicine}
                        </p>
                        <p className="text-xs text-ink-soft">
                          {p.dosage} · {p.prescribedBy} · {p.issuedOn}
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={p.refillsLeft === 0}
                        className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-line px-3 text-xs font-semibold text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label={`Request refill for ${p.medicine}`}
                      >
                        <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="hidden sm:inline">
                          {p.refillsLeft === 0 ? 'No refills' : `Refill (${p.refillsLeft})`}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-4 flex items-start gap-2.5 rounded-2xl bg-canvas p-3.5 text-xs leading-relaxed text-ink-soft">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sand-600" aria-hidden="true" />
                This is a design preview using sample data — the hospital portal is not yet connected.
                For a real report, call reception on{' '}
                <a href={`tel:${HOSPITAL_DATA.phones[0].tel}`} className="tabular-numbers inline-flex min-h-11 items-center font-semibold text-brand-800 underline">
                  {HOSPITAL_DATA.phones[0].display}
                </a>
                .
              </p>
            </div>

            {/* Sign-in preview */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-canvas px-5 py-4">
              <p className="text-xs text-ink-soft">
                Sign-in uses the mobile number registered at reception.
              </p>
              <a
                href={`tel:${HOSPITAL_DATA.phones[0].tel}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold text-brand-800 transition-colors hover:border-brand-300"
              >
                <Phone className="h-4 w-4 text-coral-600" />
                Register my number
              </a>
            </div>
          </div>
        </div>

        {/* --- Health resources ------------------------------------------ */}
        <div className="reveal mt-20 sm:mt-24">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Health resources"
              title="Guidance you can actually read"
              description="Short, plain-language articles from our clinical team — no jargon, no scare tactics."
            />
            <Button variant="secondary" onClick={() => onNavigate('/resources')} className="shrink-0 self-start sm:self-auto">
              All articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HEALTH_ARTICLES.map((a, i) => (
              <article
                key={a.id}
                data-reveal-index={i}
                className="reveal group flex flex-col rounded-3xl border border-line-soft bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[0.6875rem] font-semibold text-brand-700">
                  {a.category}
                </span>
                <h3 className="mt-3.5 text-[1.0625rem] leading-snug">{a.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">{a.excerpt}</p>
                <div className="mt-4 flex items-center justify-between border-t border-line-soft pt-3.5">
                  <span className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {a.readMinutes} min read
                  </span>
                  <span className="text-xs text-ink-soft">{a.publishedOn}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
