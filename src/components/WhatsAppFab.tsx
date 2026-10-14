import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { HOSPITAL_DATA, whatsappUrl, WHATSAPP_MESSAGES } from '../data/hospitalData';

/**
 * Floating WhatsApp helpdesk button.
 *
 * Appears once the visitor has scrolled past the hero (so it never competes with
 * the primary hero CTAs), and is hidden below `xl` where the thumb-reachable
 * bottom action bar already provides WhatsApp.
 */
export const WhatsAppFab: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl(WHATSAPP_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${HOSPITAL_DATA.shortName} reception on WhatsApp`}
      className={`fixed bottom-6 right-6 z-30 hidden items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3.5 font-semibold text-white shadow-[0_16px_36px_-12px_rgba(37,211,102,0.85)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04] xl:flex ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span className="relative flex h-6 w-6 items-center justify-center" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
        <MessageCircle className="relative h-5 w-5" />
      </span>
      <span className="text-sm">WhatsApp helpdesk</span>
    </a>
  );
};
