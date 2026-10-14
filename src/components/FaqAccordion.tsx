import React, { useId, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { FaqItem } from '../data/hospitalData';

/* ============================================================================
   Accessible FAQ accordion.
   ----------------------------------------------------------------------------
   Implemented with real <button> + aria-expanded / aria-controls so keyboard
   and screen-reader users get the same behaviour as pointer users. Only one
   panel is open at a time, which keeps the list scannable.
   ========================================================================== */

interface FaqAccordionProps {
  items: FaqItem[];
  /** Index open on first render; -1 keeps everything collapsed. */
  defaultOpen?: number;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items, defaultOpen = 0 }) => {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div
            key={faq.question}
            className={`overflow-hidden rounded-3xl border bg-white transition-colors duration-300 ${
              isOpen ? 'border-brand-200' : 'border-line-soft'
            }`}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-canvas"
              >
                <span className="font-display text-[0.9375rem] font-bold text-brand-800 sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-sand-600 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 text-[0.9375rem] leading-relaxed text-ink-soft"
            >
              {faq.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Compact empty state used where a category has no questions yet. */
export const FaqEmpty: React.FC = () => (
  <p className="flex items-center gap-2.5 rounded-2xl border border-line bg-canvas p-5 text-sm text-ink-soft">
    <HelpCircle className="h-4 w-4 shrink-0 text-sand-600" aria-hidden="true" />
    Please call reception and we will answer any question about your visit.
  </p>
);
