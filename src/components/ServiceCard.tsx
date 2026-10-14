import { ArrowRight, Check, Clock, Phone } from 'lucide-react';
import type { ImageId } from '../content/images';
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

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-paper ring-1 ring-line transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]',
        wide && 'md:flex-row',
        className,
      )}
    >
      <div className={cn('overflow-hidden', wide && 'md:w-1/2')}>
        <Photo
          id={service.imageId as ImageId}
          shape="none"
          aspect={wide ? 4 / 3 : 3 / 2}
          sizes={wide ? '(min-width: 768px) 40vw, 90vw' : '(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 85vw'}
          className={cn('transition-transform duration-700 ease-[var(--ease-gentle)] group-hover:scale-[1.03]', wide && 'md:h-full')}
        />
      </div>
      <div className={cn('flex flex-1 flex-col p-6 md:p-7', wide && 'md:w-1/2 md:p-10')}>
        <h3 className={cn('t-h3 text-teal-950', wide && 'md:text-[2rem]')}>{text.name}</h3>
        <p className="mt-3 text-ink-soft">{text.summary}</p>
        <ul className="mt-5 space-y-2.5">
          {text.offerings.map((o) => (
            <li key={o} className="flex gap-3">
              <Check className="mt-1 size-4 shrink-0 text-teal-600" aria-hidden="true" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <p className="flex items-center gap-2 text-[0.9375rem] text-ink-muted">
            <Clock className="size-4 shrink-0" aria-hidden="true" />
            {text.availability}
          </p>
          {service.bookable ? (
            <Button
              variant="quiet"
              className="mt-2"
              iconAfter={<ArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" />}
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
            <p className="mt-2 flex min-h-12 items-center font-semibold text-teal-800">{copy.services.walkIn}</p>
          )}
        </div>
      </div>
    </article>
  );
}
