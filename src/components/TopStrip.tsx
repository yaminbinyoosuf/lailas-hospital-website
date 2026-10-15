import { Phone } from 'lucide-react';
import { contact } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { Container } from './Container';
import { LanguageToggle } from './LanguageToggle';

/** Slim strip: emergency number and language only. */
export function TopStrip() {
  const copy = useCopy();
  return (
    <div className="bg-teal-950 text-ivory">
      <Container className="flex min-h-11 items-center justify-between gap-3">
        <a
          href={`tel:${contact.primary.tel}`}
          className="group inline-flex min-h-11 items-center gap-2.5 t-small"
        >
          <span className="grid size-6 place-items-center rounded-full bg-emergency">
            <Phone className="size-3.5" aria-hidden="true" />
          </span>
          <span className="hidden text-teal-100 sm:inline">{copy.strip.emergency}</span>
          <span className="font-semibold tabular-nums underline-offset-4 group-hover:underline">{contact.primary.display}</span>
        </a>
        <LanguageToggle />
      </Container>
    </div>
  );
}
