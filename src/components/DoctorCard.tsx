import { CalendarDays, Clock, Languages } from 'lucide-react';
import type { ImageId } from '../content/images';
import type { Doctor } from '../content/site';
import { useBooking } from '../booking/BookingProvider';
import { useCopy } from '../i18n/LanguageProvider';
import { cn, formatDays, formatHours } from '../lib/format';
import { Button } from './Button';
import { Photo } from './Photo';

/**
 * A consultant profile.
 *
 * The information is the substance and the portrait is support, so the layout
 * leads with the name and credentials. The portrait is a modest arch rather
 * than a dominant frame: a large empty panel would read as an unfilled slot,
 * which makes an unfinished impression, while a small one reads as a
 * deliberate portrait position waiting for its photograph.
 */
export function DoctorCard({ doctor, layout = 'stack' }: { doctor: Doctor; layout?: 'stack' | 'row' }) {
  const copy = useCopy();
  const { open } = useBooking();
  const profile = copy.doctors.profiles[doctor.id];
  const row = layout === 'row';

  return (
    <article
      className={cn(
        'group flex h-full flex-col',
        row ? 'gap-6 sm:flex-row sm:items-start sm:gap-8' : 'gap-5',
      )}
    >
      <Photo
        id={doctor.imageId as ImageId}
        shape="arch"
        aspect={4 / 5}
        sizes={row ? '8rem' : '(min-width: 1024px) 18vw, 60vw'}
        className={cn('shrink-0', row ? 'w-28 sm:w-32' : 'mx-auto w-32')}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="t-label">{profile.role}</p>

        <h3 className="t-h3 mt-2 text-teal-950">{doctor.name}</h3>
        <p className="mt-1.5 t-meta">{doctor.qualifications}</p>

        <p className="mt-4 t-small">{row ? profile.bio : profile.focus}</p>

        <dl className="mt-5 space-y-2 border-t border-line pt-4 t-small">
          <div className="flex gap-2.5">
            <dt className="mt-[0.15rem] shrink-0">
              <Clock className="size-4 text-teal-600" aria-hidden="true" />
              <span className="sr-only">{copy.doctors.opd}</span>
            </dt>
            <dd className="min-w-0">
              <span className="block text-ink-soft">{formatDays(doctor.opd.days, copy)}</span>
              <span className="block tabular-nums text-ink-muted">{formatHours(doctor.opd, copy)}</span>
            </dd>
          </div>
          <div className="flex gap-2.5">
            <dt className="mt-[0.15rem] shrink-0">
              <Languages className="size-4 text-teal-600" aria-hidden="true" />
              <span className="sr-only">{copy.doctors.speaks}</span>
            </dt>
            <dd className="min-w-0 text-ink-soft">
              {doctor.languages.map((l) => copy.doctors.languageNames[l]).join(', ')}
            </dd>
          </div>
        </dl>

        <div className={cn('pt-5', !row && 'mt-auto')}>
          <Button
            variant="secondary"
            icon={<CalendarDays aria-hidden="true" />}
            aria-label={copy.doctors.bookWith(doctor.name)}
            onClick={() => open({ kind: 'doctor', id: doctor.id })}
          >
            {copy.actions.bookShort}
          </Button>
        </div>
      </div>
    </article>
  );
}
