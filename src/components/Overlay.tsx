import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/* ============================================================================
   Accessible overlay primitives.
   ----------------------------------------------------------------------------
   Both Modal and Drawer implement the behaviour WCAG 2.2 expects of a dialog:
     • role="dialog" + aria-modal + an accessible name
     • focus moves into the overlay on open and returns to the trigger on close
     • Tab is trapped inside the overlay (SC 2.1.2 No Keyboard Trap is satisfied
       because Escape always closes)
     • background scroll is locked while open
   ========================================================================== */

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/** Locks body scroll and keeps focus inside `ref` while `active`. */
function useDialogBehaviour(active: boolean, ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const node = ref.current;
    // Move focus to the first meaningful control (or the container itself).
    const first = node?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? node)?.focus({ preventScroll: true });

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !node) return;

      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const firstEl = items[0];
      const lastEl = items[items.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      // Return focus to whatever opened the dialog.
      previouslyFocused.current?.focus?.({ preventScroll: true });
    };
  }, [active, ref, onClose]);
}

/* -------------------------------------------------------------------------- */

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  /** Rendered under the title in the header. */
  description?: string;
  /** Small label above the title. */
  eyebrow?: string;
  children: React.ReactNode;
  /** Removes the body padding — used by full-bleed content. */
  bare?: boolean;
  size?: 'md' | 'lg' | 'xl';
}

const MODAL_SIZE = {
  md: 'max-w-xl',
  lg: 'max-w-2xl',
  xl: 'max-w-3xl',
} as const;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  eyebrow,
  children,
  bare = false,
  size = 'lg',
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialogBehaviour(isOpen, panelRef, onClose);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-brand-950/55 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        // Click-outside to dismiss, but only on a genuine backdrop press.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`relative my-4 w-full ${MODAL_SIZE[size]} animate-enter overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-float)] outline-none sm:my-8`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 pb-5 pt-5 sm:px-7 sm:pt-6">
          <div className="min-w-0">
            {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
            <h2 className="display text-xl sm:text-2xl">{title}</h2>
            {description && <p className="mt-1.5 text-sm text-ink-soft">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="tap shrink-0 rounded-lg border border-line bg-canvas text-ink-soft transition-colors hover:bg-white hover:text-brand-800"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {bare ? children : <div className="scroll-slim max-h-[72vh] overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">{children}</div>}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Sticks the panel to the bottom on phones, right side on desktop. */
  side?: 'right' | 'bottom-mobile';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  side = 'right',
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialogBehaviour(isOpen, panelRef, onClose);

  if (!isOpen) return null;

  const position =
    side === 'bottom-mobile'
      ? 'inset-x-0 bottom-0 max-h-[88vh] rounded-t-3xl sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[27rem] sm:rounded-none sm:rounded-l-3xl'
      : 'inset-y-0 right-0 w-full max-w-[27rem]';

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 animate-fade bg-brand-950/50 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`absolute flex ${position} animate-enter flex-col bg-canvas shadow-2xl outline-none`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line bg-white px-5 py-4">
          <div className="min-w-0">
            {eyebrow && <p className="eyebrow mb-1">{eyebrow}</p>}
            <h2 className="display text-lg sm:text-xl">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="tap shrink-0 rounded-lg border border-line bg-canvas text-ink-soft transition-colors hover:text-brand-800"
            aria-label={`Close ${title}`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="scroll-slim flex-1 overflow-y-auto px-5 py-5">{children}</div>

        {footer && <div className="border-t border-line bg-white px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */

/**
 * Hides the rest of the page from assistive technology while a dialog is open.
 * Apply to the app root element whenever any overlay is open.
 */
export function useInertBackground(anyOverlayOpen: boolean) {
  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;
    if (anyOverlayOpen) root.setAttribute('aria-hidden', 'true');
    else root.removeAttribute('aria-hidden');
    return () => root.removeAttribute('aria-hidden');
  }, [anyOverlayOpen]);
}
