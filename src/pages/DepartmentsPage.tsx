import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CORE_DEPARTMENTS, HOSPITAL_DATA } from '../data/hospitalData';
import { Phone, Check, Clock, ShieldCheck } from 'lucide-react';
import { Button, Container, LinkButton } from '../components/ui';

interface DepartmentsPageProps {
  onNavigate: (path: string) => void;
  onBookSpeciality: (specialityId: string) => void;
}

const DEPT_ROUTES: Record<string, string> = {
  'ivf-fertility': '/ivf-fertility',
  'obstetrics-gynaecology': '/obstetrics-gynaecology',
  'maternity-care': '/maternity',
};

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({
  onNavigate,
  onBookSpeciality,
}) => {
  const primaryPhone = HOSPITAL_DATA.phones[0];

  return (
    <div className="pb-24">
      {/* ==================================================================
          PAGE HEADER
          ================================================================== */}
      <section className="relative isolate overflow-hidden border-b border-line bg-white/60 pb-14 pt-6">
        <Container width="wide" className="relative z-10">
          <Breadcrumbs
            items={[{ label: 'Departments & Facilities' }]}
            onNavigate={onNavigate}
          />
          <div className="reveal animate-enter mt-8 max-w-3xl">
            <p className="eyebrow">Hospital Directory</p>
            <h1 className="display mt-4 text-[clamp(2.25rem,1.5rem+2.6vw,3.5rem)]">
              Departments &amp; Clinical Facilities
            </h1>
            <p className="lede mt-5">
              Comprehensive clinical services supporting patient wellness, maternal care,
              diagnostic pathology, and acute casualty response in Chemmad.
            </p>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          DEPARTMENT GRID
          ================================================================== */}
      <section className="py-14 sm:py-16">
        <Container width="wide">
          <div className="grid gap-6 md:grid-cols-2">
            {CORE_DEPARTMENTS.map((dept, i) => {
              const route = DEPT_ROUTES[dept.id];
              const isCoreFocus = dept.status === 'Core Clinical Focus';

              return (
                <article
                  key={dept.id}
                  data-reveal-index={i % 6}
                  className="reveal group flex flex-col rounded-xl border border-line-soft bg-white p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[var(--shadow-lift)] sm:p-8"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                        isCoreFocus
                          ? 'border-brand-200 bg-brand-50 text-brand-700'
                          : 'border-line bg-canvas text-ink-soft'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isCoreFocus ? 'bg-brand-500' : 'bg-brand-300'
                        }`}
                        aria-hidden="true"
                      />
                      {dept.status}
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-sand-500" />
                      {dept.availability}
                    </span>
                  </div>

                  <h2 className="mt-5 text-xl sm:text-2xl">{dept.title}</h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {dept.fullDesc}
                  </p>

                  <div className="mt-6 flex-1">
                    <p className="text-xs font-semibold text-ink-soft">Key Clinical Provisions</p>
                    <ul className="mt-3 space-y-2.5">
                      {dept.services.map((srv) => (
                        <li
                          key={srv}
                          className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-ink-soft"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-sand-500" />
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-5">
                    <p className="text-sm text-ink-soft">
                      Reception:{' '}
                      <a
                        href={`tel:${primaryPhone.tel}`}
                        className="tabular-numbers font-semibold text-brand-800 transition-colors hover:text-sand-600"
                      >
                        {primaryPhone.display}
                      </a>
                    </p>

                    <div className="flex items-center gap-2">
                      {route && (
                        <button
                          onClick={() => onNavigate(route)}
                          className="rounded-full px-3.5 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50 hover:text-brand-900"
                        >
                          View Details
                        </button>
                      )}
                      <Button size="sm" onClick={() => onBookSpeciality(dept.id)}>
                        Book
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ==================================================================
          FACILITIES VERIFICATION NOTE
          ================================================================== */}
      <section>
        <Container width="wide">
          <div className="reveal flex items-start gap-4 rounded-3xl border border-line-soft bg-white p-7 shadow-[var(--shadow-soft)]">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-sand-600">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <p className="text-sm leading-relaxed text-ink-soft">
              <strong className="font-semibold text-brand-800">Operating Status &amp; Hours:</strong>{' '}
              Casualty, immediate admission, and emergency services operate 24 hours. Specific
              clinical laboratory investigations, pharmacy dispensing hours, and routine specialty
              outpatient clinics adhere to department schedules. Please call reception at{' '}
              <a
                href={`tel:${primaryPhone.tel}`}
                className="tabular-numbers font-semibold text-brand-700 transition-colors hover:text-brand-900"
              >
                {primaryPhone.display}
              </a>{' '}
              to confirm individual department hours before traveling.
            </p>
          </div>
        </Container>
      </section>

      {/* ==================================================================
          RECEPTION CALL BAND
          ================================================================== */}
      <section className="pt-10">
        <Container width="wide">
          <div className="reveal relative isolate overflow-hidden rounded-3xl bg-brand-800 px-7 py-8 text-white sm:px-10">
            <div className="relative z-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <p className="flex items-center gap-3.5 text-[0.9375rem] text-brand-200/80">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-300 ring-1 ring-inset ring-white/15">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  Reception:{' '}
                  <span className="tabular-numbers font-semibold text-white">
                    {primaryPhone.display}
                  </span>
                </span>
              </p>

              <LinkButton
                href={`tel:${primaryPhone.tel}`}
                variant="secondary"
                size="lg"
                className="shrink-0"
              >
                <Phone className="h-4 w-4 text-coral-600" />
                Call Reception
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
