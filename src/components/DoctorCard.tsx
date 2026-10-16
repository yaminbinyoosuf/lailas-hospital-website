import { CalendarDays, Clock, Languages } from 'lucide-react';
import type { ImageId } from '../content/images';
import type { Doctor } from '../content/site';
import { useBooking } from '../booking/BookingProvider';
import { useCopy } from '../i18n/LanguageProvider';
import { cn, formatDays, formatHours } from '../lib/format';
import { Button } from './Button';
import { Photo } from './Photo';

/**
 * Premium Glassmorphic Doctor Card.
 *
 * Combines specular borders, frosted backdrop, structured qualification badges,
 * and an inset frosted well for OPD schedule and spoken languages.
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
        'group relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] glass-card glass-card-hover p-6 md:p-7',
        row && 'lg:flex-row lg:items-start lg:gap-8 lg:p-8',
      )}
    >
      {/* Specular Top Glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-teal-600/30 to-transparent transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      <div className={cn('flex flex-1 flex-col', row && 'lg:flex-row lg:items-start lg:gap-8')}>
        {/* Header Section: Avatar Frame + Identity */}
        <div className={cn('flex items-start gap-4 sm:gap-5', row ? 'lg:flex-col lg:items-start lg:gap-4' : '')}>
          <div
            className={cn(
              'shrink-0 overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-xs transition-transform duration-500 ease-[var(--ease-gentle)] group-hover:scale-[1.02]',
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
            <span className="inline-flex items-center rounded-full bg-teal-50/90 px-3 py-1 t-label text-teal-800 ring-1 ring-teal-600/15">
              {profile.role}
            </span>

            <h3 className="t-h3 mt-2 text-teal-950 font-semibold">{doctor.name}</h3>

            {/* Micro-chips for qualifications */}
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {qualificationBadges.map((qual) => (
                <span
                  key={qual}
                  className="rounded-md bg-sand/70 px-2.5 py-0.5 t-meta font-medium text-ink-soft ring-1 ring-line/60"
                >
                  {qual}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Clinical Bio / Focus & Frosted Metadata Well */}
        <div className={cn('mt-5 flex min-w-0 flex-1 flex-col', row && 'lg:mt-0')}>
          <p className="t-small text-ink-soft leading-relaxed">
            {row ? profile.bio : profile.focus}
          </p>

          <dl className="mt-5 space-y-2.5 rounded-[var(--radius-md)] bg-ivory/80 p-3.5 ring-1 ring-line/60 t-small">
            <div className="flex items-start gap-2.5">
              <dt className="mt-0.5 shrink-0">
                <Clock className="size-4 text-teal-700" aria-hidden="true" />
                <span className="sr-only">{copy.doctors.opd}</span>
              </dt>
              <dd className="min-w-0">
                <span className="block font-medium text-ink">{formatDays(doctor.opd.days, copy)}</span>
                <span className="block tabular-nums text-ink-muted">{formatHours(doctor.opd, copy)}</span>
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

      {/* Full-width Book Action Footer */}
      <div className={cn('mt-6 pt-2', row && 'lg:mt-6 lg:w-full')}>
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
