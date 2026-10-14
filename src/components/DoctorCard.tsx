import { CalendarDays, Clock, Languages } from 'lucide-react';
import type { ImageId } from '../content/images';
import type { Doctor } from '../content/site';
import { useBooking } from '../booking/BookingProvider';
import { useCopy } from '../i18n/LanguageProvider';
import { cn, formatDays, formatHours } from '../lib/format';
import { Button } from './Button';
import { Photo } from './Photo';

export function DoctorCard({ doctor, layout = 'stack' }: { doctor: Doctor; layout?: 'stack' | 'row' }) {
  const copy = useCopy();
  const { open } = useBooking();
  const profile = copy.doctors.profiles[doctor.id];
  const row = layout === 'row';

  return (
    <article className={cn('group flex h-full flex-col', row && 'gap-8 sm:flex-row sm:items-start')}>
      <Photo
        id={doctor.imageId as ImageId}
        shape="arch"
        sizes={row ? '(min-width: 640px) 18rem, 85vw' : '(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 75vw'}
        className={cn(row ? 'w-full max-w-[20rem] shrink-0 sm:w-52 xl:w-60' : 'w-full')}
      />
      <div className={cn('flex min-w-0 flex-1 flex-col', row ? 'pt-2' : 'pt-6')}>
        <p className="text-[0.9375rem] font-semibold text-clay-600">{profile.role}</p>
        <h3 className="t-h3 mt-1 text-teal-950">{doctor.name}</h3>
        <p className="text-[0.9375rem] text-ink-muted">{doctor.qualifications}</p>
        <p className="mt-3 text-ink-soft">{row ? profile.bio : profile.focus}</p>
        <dl className="mt-4 space-y-2 text-[0.9375rem] text-ink-soft">
          <div className="flex gap-2.5">
            <dt className="mt-0.5 shrink-0">
              <Clock className="size-4 text-teal-600" aria-hidden="true" />
              <span className="sr-only">{copy.doctors.opd}</span>
            </dt>
            <dd>
              {formatDays(doctor.opd.days, copy)}
              <br />
              {formatHours(doctor.opd, copy)}
            </dd>
          </div>
          <div className="flex gap-2.5">
            <dt className="mt-0.5 shrink-0">
              <Languages className="size-4 text-teal-600" aria-hidden="true" />
              <span className="sr-only">{copy.doctors.speaks}</span>
            </dt>
            <dd>{doctor.languages.map((l) => copy.doctors.languageNames[l]).join(', ')}</dd>
          </div>
        </dl>
        <div className={cn('pt-5', !row && 'mt-auto')}>
          <Button
            variant="secondary"
            className={cn(!row && 'w-full')}
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
