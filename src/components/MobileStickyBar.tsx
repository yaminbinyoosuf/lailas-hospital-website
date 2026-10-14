import React from 'react';
import { CalendarCheck, MessageCircle, Siren } from 'lucide-react';
import { HOSPITAL_DATA, whatsappUrl, WHATSAPP_MESSAGES } from '../data/hospitalData';

interface MobileStickyBarProps {
  onOpenAppointmentModal: () => void;
}

/**
 * Floating quick-action bar for phones and small tablets.
 *
 * Three thumb-reachable actions, in the order a patient in distress needs them:
 * emergency call → symptom guidance → book. Every control is at least 48px tall
 * (above the 44px WCAG 2.2 SC 2.5.8 minimum) and clears the safe-area inset.
 */
export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onOpenAppointmentModal,
}) => {
  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed inset-x-0 bottom-0 z-30 2xl:hidden"
      style={{ paddingBottom: 'max(0.6rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto flex max-w-md items-stretch gap-2 px-3 pt-2.5">
        <a
          href={`tel:${HOSPITAL_DATA.emergency.tel}`}
          className="flex min-h-12 flex-1 flex-col items-center justify-center rounded-xl bg-critical px-2 py-2 text-white shadow-[0_10px_26px_-10px_rgba(179,38,30,0.75)] transition-transform active:scale-[0.97]"
          aria-label={`Emergency — call ${HOSPITAL_DATA.emergency.display}`}
        >
          <Siren className="h-4 w-4" aria-hidden="true" />
          <span className="mt-0.5 text-[0.6875rem] font-semibold">Emergency</span>
        </a>

        <a
          href={whatsappUrl(WHATSAPP_MESSAGES.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 flex-1 flex-col items-center justify-center rounded-xl bg-[#25D366] px-2 py-2 text-white shadow-[0_10px_26px_-10px_rgba(37,211,102,0.8)] transition-transform active:scale-[0.97]"
          aria-label="Chat with Lailas Hospital on WhatsApp"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span className="mt-0.5 text-[0.6875rem] font-semibold">WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={onOpenAppointmentModal}
          className="flex min-h-12 flex-[1.5] items-center justify-center gap-2 rounded-xl bg-brand-700 px-3 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(21,85,140,0.8)] transition-transform active:scale-[0.97]"
        >
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          Book
        </button>
      </div>
    </aside>
  );
};
