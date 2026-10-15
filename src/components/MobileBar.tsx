import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
import { contact, whatsappLink } from '../content/site';
import { useBooking } from '../booking/BookingProvider';
import { useCopy } from '../i18n/LanguageProvider';

/** Phones only: Call, WhatsApp and Book, always one tap away. */
export function MobileBar() {
  const copy = useCopy();
  const { open } = useBooking();
  const item =
    'flex min-h-14 min-w-0 flex-col items-center justify-center gap-0.5 px-1 text-center t-meta font-semibold leading-tight [overflow-wrap:anywhere]';
  return (
    <div className="fixed bottom-0 left-0 z-40 w-screen max-w-full overflow-hidden border-t border-line bg-paper/97 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden">
      <div className="grid min-w-0 grid-cols-[repeat(3,minmax(0,1fr))]">
        <a href={`tel:${contact.primary.tel}`} className={`${item} text-emergency`}>
          <Phone className="size-5" aria-hidden="true" />
          {copy.mobileBar.call}
        </a>
        <a
          href={whatsappLink(copy.booking.whatsappGeneral)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item} text-teal-800`}
        >
          <MessageCircle className="size-5" aria-hidden="true" />
          {copy.mobileBar.whatsapp}
        </a>
        <button type="button" onClick={() => open()} className={`${item} m-1.5 rounded-[var(--radius-md)] bg-teal-700 text-ivory`}>
          <CalendarDays className="size-5" aria-hidden="true" />
          {copy.mobileBar.book}
        </button>
      </div>
    </div>
  );
}
