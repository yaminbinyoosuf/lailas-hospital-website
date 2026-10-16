import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { address, contact, whatsappLink } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { Container } from './Container';

/**
 * Top strip: emergency hotline, care hours, location and a WhatsApp shortcut.
 * Below lg only the emergency number shows: the mobile bar already carries
 * Call, WhatsApp and Book, so repeating them here would only add height.
 * Items never wrap; lower-priority items drop out at smaller widths instead.
 *
 * Every string resolves through the copy layer. The location is composed from
 * the address record rather than hardcoded, which keeps it in sync with the
 * footer.
 */
export function TopStrip() {
  const copy = useCopy();
  return (
    <div className="on-dark border-b border-white/10 bg-teal-950 text-ivory">
      <Container className="flex min-h-11 items-center justify-between gap-4 py-1">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${contact.primary.tel}`}
            className="group inline-flex min-h-11 items-center gap-2.5 whitespace-nowrap t-small transition-colors duration-150 hover:text-white"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emergency">
              <Phone className="size-3 text-white" aria-hidden="true" />
            </span>
            <span className="hidden text-teal-100 sm:inline">{copy.strip.emergency}</span>
            <span className="font-semibold tabular-nums underline-offset-4 group-hover:underline">
              {contact.primary.display}
            </span>
          </a>

          <div className="hidden items-center gap-1.5 whitespace-nowrap t-meta text-teal-200 xl:flex">
            <Clock className="size-3.5 shrink-0 text-teal-300" aria-hidden="true" />
            <span>
              {copy.visit.hours.allDay}: {copy.time.open24}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1.5 whitespace-nowrap t-meta text-teal-200 lg:flex">
            <MapPin className="size-3.5 shrink-0 text-teal-300" aria-hidden="true" />
            <span>
              {address.locality}, {address.district}
            </span>
          </div>

          <a
            href={whatsappLink(copy.booking.whatsappGeneral)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-1.5 whitespace-nowrap t-small text-teal-100 transition-colors duration-150 hover:text-white lg:inline-flex"
          >
            <MessageCircle className="size-3.5 shrink-0 text-teal-300" aria-hidden="true" />
            <span>{copy.actions.whatsapp}</span>
          </a>

        </div>
      </Container>
    </div>
  );
}
