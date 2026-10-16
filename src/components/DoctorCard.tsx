import { CalendarDays, Clock, Languages } from 'lucide-react';
import type { ImageId } from '../content/images';
import type { Doctor } from '../content/site';
import { useBooking } from '../booking/BookingProvider';
import { useCopy } from '../i18n/LanguageProvider';
import { cn, formatDays, formatHours } from '../lib/format';
import { Button } from './Button';
import { Photo } from './Photo';

/**
 * Doctor card: portrait (or initials), role, name, qualification chips, then
 * OPD timings and languages in an inset panel, and a Book button.
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
        'relative flex h-full flex-col justify-between rounded-[var(--radius-lg)] border border-line bg-paper p-6 md:p-7',
        row && 'lg:flex-row lg:items-start lg:gap-8 lg:p-8',
      )}
    >
      <div className={cn('flex flex-1 flex-col', row && 'lg:flex-row lg:items-start lg:gap-8')}>
        {/* Header Section: Avatar Frame + Identity */}
        <div className={cn('flex items-start gap-4 sm:gap-5', row ? 'lg:flex-col lg:items-start lg:gap-4' : '')}>
          <div
            className={cn(
              'shrink-0 overflow-hidden rounded-[var(--radius-md)]',
              row ? 'w-24 sm:w-28 lg:w-36' : 'w-20 sm:w-24',
            )}
          >
            <Photo
              id={doctor.imageId as ImageId}
              shape="none"
              aspect={4 / 5}
              sizes={row ? '(min-width: 1024px) 12rem, 8rem' : '6rem'}
              className="w-full"
            />
          </div>

          <div className="min-w-0 flex-1">
            {/* Plain label, not a pill: long roles wrap cleanly. */}
            <p className="t-label text-clay-700">{profile.role}</p>

            <h3 className="t-h3 mt-1.5 text-teal-950">{doctor.name}</h3>

            {/* Micro-chips for qualifications */}
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {qualificationBadges.map((qual) => (
                <span
                  key={qual}
                  className="rounded-[var(--radius-sm)] bg-sand px-2.5 py-0.5 t-meta text-ink-soft"
                >
                  {qual}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Clinical Bio / Focus & Frosted Metadata Well */}
        <div className={cn('mt-5 flex min-w-0 flex-1 flex-col', row && 'lg:mt-0')}>
          <p className="t-small text-ink-soft">
            {row ? profile.bio : profile.focus}
          </p>

          <dl className="mt-5 space-y-2.5 rounded-[var(--radius-md)] border border-line bg-ivory p-3.5 t-small">
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
            <div className="flex items-start gap-2.5 border-t border-line pt-2.5">
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

      {/* Full-width Book Action Footer */}
      <div className={cn('mt-6 pt-2', row && 'lg:mt-6 lg:w-full')}>
        <Button
          variant="secondary"
          className="w-full"
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
