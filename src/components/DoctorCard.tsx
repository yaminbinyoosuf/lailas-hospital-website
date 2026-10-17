import { CalendarDays, Clock, Languages } from 'lucide-react';
import { hasPhoto, type ImageId } from '../content/images';
import type { Doctor } from '../content/site';
import { useBooking } from '../booking/BookingProvider';
import { useCopy } from '../i18n/LanguageProvider';
import { cn, formatDays, formatHours } from '../lib/format';
import { Button } from './Button';
import { Photo } from './Photo';

/**
 * A consultant profile.
 *
 * The monogram stands in for a portrait until verified photographs exist: a
 * real name over a borrowed face would misrepresent a person.
 *
 * The structure is fixed rather than content-driven so cards in a row line up.
 * Credentials are one line instead of a chip each, because a consultant with
 * five qualifications was wrapping onto three rows and towering over the card
 * beside it, and the action is pushed to the bottom with mt-auto.
 */
export function DoctorCard({
  doctor,
  featured = false,
}: {
  doctor: Doctor;
  /** The founder treatment: larger monogram, accent rule, more room. */
  featured?: boolean;
}) {
  const copy = useCopy();
  const { open } = useBooking();
  const profile = copy.doctors.profiles[doctor.id];

  const initials = doctor.name
    .replace('Dr. ', '')
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border bg-paper transition-[border-color,box-shadow] duration-300',
        featured
          ? 'border-teal-700/25 p-6 md:p-8'
          : 'border-line p-5 hover:border-teal-600/40 hover:shadow-[var(--shadow-soft)] md:p-6',
      )}
    >
      {featured && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-clay-500 via-clay-400 to-clay-200"
        />
      )}

      {/* Identity ------------------------------------------------------- */}
      <div className="flex items-start gap-4">
        {hasPhoto(doctor.imageId as ImageId) ? (
          <Photo
            id={doctor.imageId as ImageId}
            shape="circle"
            aspect={1}
            sizes={featured ? '80px' : '(min-width: 768px) 64px, 56px'}
            className={cn('shrink-0 ring-1 ring-line', featured ? 'size-20' : 'size-14 md:size-16')}
          />
        ) : (
          <div
            aria-hidden="true"
            className={cn(
              'grid shrink-0 place-items-center rounded-full ring-1',
              featured
                ? 'size-20 bg-clay-50 text-clay-700 ring-clay-200'
                : 'size-14 bg-sand text-teal-800 ring-line md:size-16',
            )}
          >
            <span className={cn('t-number', featured ? 'text-2xl' : 'text-lg')}>{initials}</span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className={cn('text-teal-950', featured ? 't-h2' : 't-h3')}>{doctor.name}</h3>
          <p className={cn('mt-1 font-medium text-teal-800', featured ? 't-small' : 't-meta')}>
            {profile.role}
          </p>
          <p className="mt-1 t-meta text-ink-muted">{doctor.qualifications}</p>
        </div>
      </div>

      {/* Description ----------------------------------------------------- */}
      <p
        className={cn(
          'mt-4 t-small text-ink-soft',
          featured ? 'max-w-[46rem]' : 'line-clamp-3',
        )}
      >
        {featured ? profile.bio : profile.focus}
      </p>

      {/* Practicalities --------------------------------------------------- */}
      <dl className="mt-4 grid gap-2 border-t border-line pt-4 t-small text-ink-soft">
        <div className="flex items-start gap-2">
          <dt className="mt-0.5 shrink-0">
            <Clock className="size-4 text-teal-700" aria-hidden="true" />
            <span className="sr-only">{copy.doctors.opd}</span>
          </dt>
          <dd className="min-w-0">
            {doctor.hasOwnOpdHours ? (
              <span className="block text-ink">
                {formatDays(doctor.opd.days, copy)}, {formatHours(doctor.opd, copy)}
              </span>
            ) : (
              <span className="block text-ink-muted">{copy.doctors.opdUnconfirmed}</span>
            )}
          </dd>
        </div>

        <div className="flex items-start gap-2">
          <dt className="mt-0.5 shrink-0">
            <Languages className="size-4 text-teal-700" aria-hidden="true" />
            <span className="sr-only">{copy.doctors.speaks}</span>
          </dt>
          <dd className="min-w-0 text-ink-muted">
            {doctor.languages.map((l) => copy.doctors.languageNames[l]).join(', ')}
          </dd>
        </div>
      </dl>

      {/* Action ----------------------------------------------------------- */}
      <div className="mt-4 flex flex-1 items-end">
        <Button
          variant={featured ? 'primary' : 'secondary'}
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
