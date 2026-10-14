import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
import { contact, whatsappLink } from '../content/site';
import { useBooking } from '../booking/BookingProvider';
import { useCopy } from '../i18n/LanguageProvider';

/** Phones only: Call, WhatsApp and Book, always one tap away. */
export function MobileBar() {
  const copy = useCopy();
  const { open } = useBooking();
  const item = 'flex min-h-14 flex-col items-center justify-center gap-0.5 text-[0.9375rem] font-semibold';
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/97 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden">
      <div className="grid grid-cols-3">
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
        <button type="button" onClick={() => open()} className={`${item} m-1.5 rounded-2xl bg-teal-700 text-ivory`}>
          <CalendarDays className="size-5" aria-hidden="true" />
          {copy.mobileBar.book}
        </button>
      </div>
    </div>
  );
}
