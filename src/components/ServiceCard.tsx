import { ArrowRight, Clock, Phone } from 'lucide-react';
import { contact, type Service } from '../content/site';
import { useBooking } from '../booking/BookingProvider';
import { useCopy } from '../i18n/LanguageProvider';
import { Button, ButtonAnchor } from './Button';

/**
 * A service, presented as a row rather than a card.
 *
 * The services band is dark teal. Three white boxes sitting on it read as a
 * template; a hairline list reads as a printed prospectus, which is closer to
 * what this section is — a statement of what the hospital does.
 *
 * Order is fixed: index, name, what it includes, when it is available, action.
 */
export function ServiceRow({ service, index }: { service: Service; index: number }) {
  const copy = useCopy();
  const { open } = useBooking();
  const text = copy.services.items[service.id];

  return (
    <article className="group relative grid gap-x-8 gap-y-4 py-7 md:grid-cols-12 md:items-start md:py-8">
      {/* Index ----------------------------------------------------------- */}
      <div className="flex items-center gap-4 md:col-span-2 md:pt-1">
        <span className="t-number text-xl tabular-nums text-teal-300/80" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="t-label uppercase tracking-widest text-teal-300 md:hidden">
          {copy.services.groups[service.group].name}
        </span>
      </div>

      {/* Name and inclusions -------------------------------------------- */}
      <div className="min-w-0 md:col-span-6">
        <h3 className="t-h3 text-ivory">{text.name}</h3>
        <p className="mt-2 max-w-[38rem] t-small text-teal-100/85">{text.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
          {text.offerings.map((o) => (
            <li key={o} className="flex items-center gap-2 t-meta text-teal-100/70">
              <span aria-hidden="true" className="size-1 rounded-full bg-teal-400/70" />
              {o}
            </li>
          ))}
        </ul>
      </div>

      {/* Availability and action ---------------------------------------- */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-4 md:justify-end">
        <p className="flex items-center gap-2 t-meta text-teal-200/80">
          <Clock className="size-3.5 shrink-0" aria-hidden="true" />
          {text.availability}
        </p>

        {service.bookable ? (
          <Button
            variant="lightOutline"
            className="shrink-0"
            iconAfter={
              <ArrowRight
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            }
            onClick={() => open({ kind: 'service', id: service.id })}
          >
            {copy.services.book}
          </Button>
        ) : service.id === 'emergency' ? (
          <ButtonAnchor
            href={`tel:${contact.primary.tel}`}
            variant="emergency"
            className="shrink-0"
            icon={<Phone aria-hidden="true" />}
          >
            {contact.primary.display}
          </ButtonAnchor>
        ) : (
          <p className="t-small font-semibold text-teal-100">{copy.services.walkIn}</p>
        )}
      </div>
    </article>
  );
}
