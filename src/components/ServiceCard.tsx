import { ArrowRight, Check, Clock, Phone } from 'lucide-react';
import { hasPhoto, type ImageId } from '../content/images';
import { contact, type Service } from '../content/site';
import { useBooking } from '../booking/BookingProvider';
import { useCopy } from '../i18n/LanguageProvider';
import { cn } from '../lib/format';
import { Button, ButtonAnchor } from './Button';
import { Photo } from './Photo';

export function ServiceCard({ service, wide, className }: { service: Service; wide?: boolean; className?: string }) {
  const copy = useCopy();
  const { open } = useBooking();
  const text = copy.services.items[service.id];
  // Without a photograph the card is text only: an empty image band would
  // take half the card and add nothing.
  const withPhoto = hasPhoto(service.imageId as ImageId);
  const split = wide && withPhoto;

  return (
    <article
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-line bg-paper',
        withPhoto && 'p-2.5 sm:p-3',
        split && 'md:flex-row md:items-stretch',
        className,
      )}
    >
      {withPhoto && (
        <div className={cn('shrink-0 overflow-hidden rounded-[var(--radius-md)]', split && 'md:w-1/2')}>
          <Photo
            id={service.imageId as ImageId}
            shape="none"
            aspect={wide ? 4 / 3 : 3 / 2}
            sizes={wide ? '(min-width: 768px) 40vw, 90vw' : '(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 85vw'}
            className={cn(split && 'md:h-full')}
          />
        </div>
      )}

      <div
        className={cn(
          'flex flex-1 flex-col p-6 md:p-7',
          split && 'md:w-1/2 md:p-8',
          wide && !withPhoto && 'md:p-8 lg:grid lg:grid-cols-12 lg:gap-x-10',
        )}
      >
        <div className={cn(wide && !withPhoto && 'lg:col-span-5')}>
          <h3 className="t-h3 text-teal-950">{text.name}</h3>
          <p className="mt-2.5 t-small text-ink-soft">{text.summary}</p>
        </div>

        <ul className={cn('mt-5 space-y-2.5', wide && !withPhoto && 'lg:col-span-4 lg:mt-1')}>
          {text.offerings.map((o) => (
            <li key={o} className="flex items-start gap-2.5 t-small">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-700 ring-1 ring-teal-600/20">
                <Check className="size-3" aria-hidden="true" />
              </span>
              <span className="text-ink">{o}</span>
            </li>
          ))}
        </ul>

        <div className={cn('mt-auto pt-6', wide && !withPhoto && 'lg:col-span-3 lg:mt-0 lg:self-end lg:pt-0')}>
          <p className="flex items-center gap-2 t-small text-ink-muted">
            <Clock className="size-4 shrink-0 text-teal-600" aria-hidden="true" />
            {text.availability}
          </p>
          {service.bookable ? (
            <Button
              variant="quiet"
              className="mt-3"
              iconAfter={<ArrowRight aria-hidden="true" />}
              onClick={() => open({ kind: 'service', id: service.id })}
            >
              {copy.services.book}
            </Button>
          ) : service.id === 'emergency' ? (
            <ButtonAnchor
              href={`tel:${contact.primary.tel}`}
              variant="emergency"
              className="mt-4"
              icon={<Phone aria-hidden="true" />}
            >
              {contact.primary.display}
            </ButtonAnchor>
          ) : (
            <p className="mt-3 flex min-h-11 items-center font-semibold text-teal-800">{copy.services.walkIn}</p>
          )}
        </div>
      </div>
    </article>
  );
}
