import { ArrowRight, Baby, Check, Clock, HeartPulse, Microscope, Phone, Sparkles, Stethoscope } from 'lucide-react';
import { contact, type Service } from '../content/site';
import { useBooking } from '../booking/BookingProvider';
import { useCopy } from '../i18n/LanguageProvider';
import { cn } from '../lib/format';
import { Button, ButtonAnchor } from './Button';

export function ServiceCard({ service, wide, className }: { service: Service; wide?: boolean; className?: string }) {
  const copy = useCopy();
  const { open } = useBooking();
  const text = copy.services.items[service.id];
  const visuals = {
    maternity: Baby, ivf: Sparkles, gynaecology: HeartPulse, paediatrics: Baby,
    'general-medicine': Stethoscope, emergency: HeartPulse, laboratory: Microscope, pharmacy: Stethoscope,
  } as const;
  const Visual = visuals[service.id];

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-white/20 bg-paper p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-[var(--shadow-soft)] md:p-8',
        wide && 'md:p-10',
        className,
      )}
    >
      <div className="flex flex-1 flex-col">
        <div className={`service-card__visual service-card__visual--${service.group}`} aria-hidden="true"><Visual /></div>
        <span className="t-label text-clay-700">{copy.services.groups[service.group].name}</span>
        <h3 className="t-h3 text-teal-950 font-semibold">{text.name}</h3>
        <p className="mt-2.5 t-small text-ink-soft leading-relaxed">{text.summary}</p>

        <ul className="mt-5 space-y-2.5">
          {text.offerings.map((o) => (
            <li key={o} className="flex items-start gap-2.5 t-small text-ink-soft">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-700 ring-1 ring-teal-600/20">
                <Check className="size-3" aria-hidden="true" />
              </span>
              <span className="text-ink">{o}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <p className="flex items-center gap-2 t-small text-ink-muted">
            <Clock className="size-4 shrink-0 text-teal-600" aria-hidden="true" />
            {text.availability}
          </p>
          {service.bookable ? (
            <Button
              variant="quiet"
              className="mt-3 !px-0"
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
