import { CalendarDays, Clock, Languages } from 'lucide-react';
import type { Doctor } from '../content/site';
import { useBooking } from '../booking/BookingProvider';
import { useCopy } from '../i18n/LanguageProvider';
import { cn, formatDays, formatHours } from '../lib/format';
import { Button } from './Button';

/**
 * An editorial doctor card. Until verified portraits are supplied, names are
 * represented with a neutral monogram rather than a fabricated likeness.
 */
export function DoctorCard({ doctor, layout = 'stack' }: { doctor: Doctor; layout?: 'stack' | 'row' }) {
  const copy = useCopy();
  const { open } = useBooking();
  const profile = copy.doctors.profiles[doctor.id];
  const row = layout === 'row';

  // Parse comma-separated qualifications into distinct badges
  const qualificationBadges = doctor.qualifications
    .split(',')
    .map((q) => q.trim())
    .filter(Boolean);

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-md)] border border-line bg-paper p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-teal-600/40 hover:shadow-[var(--shadow-soft)] md:p-7',
        row && 'lg:p-10',
      )}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex items-start gap-4 sm:gap-5">
          <div
            className={cn(
              'grid shrink-0 place-items-center rounded-full bg-sand text-teal-800 ring-1 ring-line',
              row ? 'size-20 sm:size-24' : 'size-16 sm:size-20',
            )}
          >
            <span className="t-number text-xl sm:text-2xl" aria-hidden="true">
              {doctor.name.replace('Dr. ', '').split(/\s+/).map((part) => part[0]).slice(0, 2).join('')}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <span className="t-label text-clay-700">
              {profile.role}
            </span>

            <h3 className="t-h3 mt-2 text-teal-950 font-semibold">{doctor.name}</h3>

            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {qualificationBadges.map((qual) => (
                <span
                  key={qual}
                  className="rounded-[var(--radius-sm)] bg-sand/70 px-2.5 py-0.5 t-meta font-medium text-ink-soft ring-1 ring-line/60"
                >
                  {qual}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex min-w-0 flex-1 flex-col">
          <p className="t-small text-ink-soft leading-relaxed">
            {row ? profile.bio : profile.focus}
          </p>

          <dl className="mt-5 space-y-2.5 border-t border-line pt-4 t-small text-ink-soft">
            <div className="flex items-start gap-2.5">
              <dt className="mt-0.5 shrink-0">
                <Clock className="size-4 text-teal-700" aria-hidden="true" />
                <span className="sr-only">{copy.doctors.opd}</span>
              </dt>
              <dd className="min-w-0">
                {doctor.hasOwnOpdHours ? (
                  <>
                    <span className="block font-medium text-ink">{formatDays(doctor.opd.days, copy)}</span>
                    <span className="block tabular-nums text-ink-muted">{formatHours(doctor.opd, copy)}</span>
                  </>
                ) : (
                  <span className="block font-medium text-ink">{copy.doctors.opdUnconfirmed}</span>
                )}
              </dd>
            </div>
            <div className="flex items-start gap-2.5 border-t border-line/40 pt-2">
              <dt className="mt-0.5 shrink-0">
                <Languages className="size-4 text-teal-700" aria-hidden="true" />
                <span className="sr-only">{copy.doctors.speaks}</span>
              </dt>
              <dd className="min-w-0 text-ink-soft">
                {doctor.languages.map((l) => copy.doctors.languageNames[l]).join(', ')}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 border-t border-line pt-4">
        <Button
          variant="secondary"
          className="w-full justify-center shadow-xs transition-all hover:border-teal-700"
          icon={<CalendarDays className="size-4" aria-hidden="true" />}
          aria-label={copy.doctors.bookWith(doctor.name)}
          onClick={() => open({ kind: 'doctor', id: doctor.id })}
        >
          {copy.actions.bookShort}
        </Button>
      </div>
    </article>
  );
}
