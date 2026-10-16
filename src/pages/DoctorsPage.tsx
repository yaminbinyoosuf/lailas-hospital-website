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
          <div
            role="group"
            aria-label={copy.doctors.filterLabel}
            className="flex flex-wrap items-center gap-2 p-1.5 rounded-[var(--radius-md)] glass-card border border-white/80 shadow-xs"
          >
            <button
              type="button"
              aria-pressed={selectedGroupIndex === null}
              onClick={() => setSelectedGroupIndex(null)}
              className={cn(
                'min-h-11 rounded-[var(--radius-sm)] px-4.5 py-2 t-ui transition-colors duration-150',
                selectedGroupIndex === null
                  ? 'bg-teal-800 text-ivory shadow-xs'
                  : 'text-ink-soft hover:bg-sand/60 hover:text-ink',
              )}
            >
              {copy.doctors.allFilter}
            </button>
            {page.groups.map((g, idx) => (
              <button
                key={g.title}
                type="button"
                aria-pressed={selectedGroupIndex === idx}
                onClick={() => setSelectedGroupIndex(idx)}
                className={cn(
                  'min-h-11 rounded-[var(--radius-sm)] px-4.5 py-2 t-ui transition-colors duration-150',
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

      <section aria-labelledby="doctors-list-title" className="py-12 md:py-16">
        <Container>
          <h2 id="doctors-list-title" className="sr-only">
            {copy.doctors.listTitle}
          </h2>
          {/* Founder Spotlight Card when showing all or maternity/gynaecology group */}
          {showFounderSpotlight && founderDoctor && (
            <div className="mb-8">
              {/* The "Founder & Chief Consultant" label was removed until the
                  hospital confirms the title. Q6 */}
              <Reveal>
                <DoctorCard doctor={founderDoctor} layout="row" />
              </Reveal>
            </div>
          )}

          {/* Consultants Bento Grid */}
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularDoctors.map((d, i) => (
              <Reveal as="li" key={d.id} delay={i * 0.05} className="min-w-0 h-full">
                <DoctorCard doctor={d} layout="stack" />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* 24/7 Duty Doctors High-Impact Glass Banner */}
      <section aria-labelledby="duty-title" className="pt-6 pb-20 md:pb-28">
        <Container>
          <Reveal className="on-dark relative overflow-hidden rounded-[var(--radius-lg)] bg-teal-950 text-ivory p-8 md:p-12 shadow-[var(--shadow-lift)] border border-teal-800/40 glass-dark">
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
                <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-teal-900/90 text-teal-300 ring-1 ring-white/10 shadow-xs">
                  <Clock className="size-7" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex size-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75" aria-hidden="true" />
                      <span className="relative inline-flex size-3 rounded-full bg-teal-300" aria-hidden="true" />
                    </span>
                    <span className="t-label text-teal-300">{copy.doctors.duty.label}</span>
                  </div>
                  <h2 id="duty-title" className="t-h3 mt-2 text-ivory">
                    {copy.doctors.duty.title}
                  </h2>
                  <p className="mt-2.5 max-w-2xl t-small text-teal-100">
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
