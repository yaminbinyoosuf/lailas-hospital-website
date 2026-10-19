import { CalendarDays, Clock } from 'lucide-react';
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
        'group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border transition-[border-color,box-shadow,transform] duration-300',
        featured && 'lg:grid lg:grid-cols-12 lg:gap-x-10',
        featured
          ? 'border-clay-200 bg-sand/45 p-6 md:p-10 shadow-[var(--shadow-soft)]'
          : 'border-line/70 bg-gradient-to-b from-teal-50/60 to-paper p-6 shadow-[0_4px_20px_rgb(11_36_31/0.06)] hover:border-teal-600/40 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] md:p-7',
      )}
    >
      {featured && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-clay-500 via-clay-400 to-clay-200"
        />
      )}

      {/* Identity ------------------------------------------------------- */}
      <div className={cn('flex items-start gap-4', featured && 'lg:col-span-5')}>
        {hasPhoto(doctor.imageId as ImageId) ? (
          <Photo
            id={doctor.imageId as ImageId}
            shape="circle"
            aspect={1}
            sizes={featured ? '80px' : '(min-width: 768px) 64px, 56px'}
            className={cn('shrink-0 ring-1 ring-line', featured ? 'size-20 sm:size-28' : 'size-16 md:size-20')}
          />
        ) : (
          <div
            aria-hidden="true"
            className={cn(
              'grid shrink-0 place-items-center rounded-full ring-1',
              featured
                ? 'size-20 bg-clay-50 text-clay-700 ring-clay-200 sm:size-28'
                : 'size-16 bg-sand text-teal-800 ring-line md:size-20',
            )}
          >
            <span className={cn('t-number', featured ? 'text-4xl' : 'text-xl')}>{initials}</span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className={cn('text-teal-950 leading-tight', featured ? 't-h3 sm:t-h2' : 't-h4 font-bold')}>{doctor.name}</h3>
          <p className={cn('mt-1 font-semibold text-teal-700', featured ? 't-small' : 'text-[0.8125rem]')}>
            {profile.role}
          </p>
          <p className={cn('mt-0.5 text-ink-muted', featured ? 't-meta' : 'text-[0.8125rem] leading-snug')}>{doctor.qualifications}</p>
        </div>
      </div>

      {/* Description ----------------------------------------------------- */}
      <p
        className={cn(
          'mt-4 t-small text-ink-soft',
          featured ? 'text-ink lg:col-span-7 lg:col-start-6 lg:mt-0 lg:text-base' : 'line-clamp-3',
        )}
      >
        {featured ? profile.bio : profile.focus}
      </p>

      {/* Practicalities --------------------------------------------------- */}
      <dl className={cn('mt-4 flex items-start gap-2 border-t border-line pt-4 t-small text-ink-soft', featured && 'lg:col-span-7 lg:col-start-6')}>
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
      </dl>

      {/* Action ----------------------------------------------------------- */}
      <div className={cn('mt-4 flex flex-1 items-end', featured && 'lg:col-span-7 lg:col-start-6 lg:flex-none')}>
        <Button
          variant={featured ? 'primary' : 'secondary'}
          className={featured ? 'sm:w-auto' : 'w-full'}
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
