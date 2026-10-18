import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { address, contact, whatsappLink } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { Container } from './Container';

/**
 * Top strip: emergency hotline, care hours, location and a WhatsApp shortcut.
 *
 * Every string resolves through the copy layer so Malayalam is complete. The
 * location is composed from the address record rather than hardcoded, which
 * keeps it correct in both languages and in sync with the footer.
 */
export function TopStrip() {
  const copy = useCopy();
  return (
    <div className="border-b border-white/10 bg-teal-950/95 backdrop-blur-md text-ivory">
      <Container className="flex min-h-11 items-center justify-between gap-4 py-1">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${contact.primary.tel}`}
            className="group inline-flex min-h-11 items-center gap-2.5 t-small font-medium transition-colors hover:text-white"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emergency">
              <Phone className="size-3 text-white" aria-hidden="true" />
            </span>
            <span className="hidden text-teal-100 sm:inline">{copy.strip.emergency}</span>
            <span className="whitespace-nowrap font-semibold tabular-nums underline-offset-4 group-hover:underline">
              {contact.primary.display}
            </span>
          </a>

          <div className="hidden items-center gap-1.5 t-meta text-teal-200 md:flex">
            <Clock className="size-3.5 shrink-0 text-teal-300" aria-hidden="true" />
            <span>{copy.visit.hours.allDay}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1.5 whitespace-nowrap t-meta text-teal-200 xl:flex">
            <MapPin className="size-3.5 shrink-0 text-teal-300" aria-hidden="true" />
            <span>
              {address.locality}, {address.district}
            </span>
          </div>

          <a
            href={whatsappLink(copy.booking.whatsappGeneral)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 t-small font-medium text-teal-100 transition-colors hover:text-white"
          >
            <MessageCircle className="size-3.5 shrink-0 text-teal-300" aria-hidden="true" />
            {/* The visible label is dropped below 26rem, which left this link
                with no accessible name on a phone. The sr-only copy keeps it
                announced at every width. */}
            <span className="sr-only xs:not-sr-only">{copy.actions.whatsapp}</span>
          </a>

        </div>
      </Container>
    </div>
  );
}
