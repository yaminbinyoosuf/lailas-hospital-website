import { MessageCircle, Phone, X } from 'lucide-react';
import {
  Component,
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { ButtonAnchor } from '../components/Button';
import { contact, whatsappLink, type DoctorId, type ServiceId } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';

export type BookingTarget = { kind: 'service'; id: ServiceId } | { kind: 'doctor'; id: DoctorId };

interface BookingContextValue {
  open: (target?: BookingTarget) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

/**
 * The sheet is a separate chunk. A flaky connection or a deploy that replaced
 * the chunk can make the import fail, so try once more before giving up.
 * React caches a failed lazy() for good, which is why a fresh one is made
 * after each failure (see onError below).
 */
const loadSheet = () =>
  import('./BookingSheet').catch(
    () => new Promise<typeof import('./BookingSheet')>((resolve, reject) => {
      window.setTimeout(() => import('./BookingSheet').then(resolve, reject), 1000);
    }),
  );
const makeSheet = () => lazy(loadSheet);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<{ target?: BookingTarget; key: number } | null>(null);
  const [BookingSheet, setBookingSheet] = useState(makeSheet);

  const open = useCallback((target?: BookingTarget) => {
    setRequest({ target, key: Date.now() });
  }, []);

  const value = useMemo(() => ({ open }), [open]);
  const closed = () => setRequest(null);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {request && (
        <BookingBoundary
          key={request.key}
          fallback={<BookingUnavailable onClosed={closed} />}
          onError={() => setBookingSheet(() => makeSheet())}
        >
          <Suspense fallback={null}>
            <BookingSheet initialTarget={request.target} onClosed={closed} />
          </Suspense>
        </BookingBoundary>
      )}
    </BookingContext.Provider>
  );
}

/** Keeps a failed booking sheet from taking the rest of the page down with it. */
class BookingBoundary extends Component<
  { fallback: ReactNode; onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** Shown when the booking sheet cannot load: phone and WhatsApp still work. */
function BookingUnavailable({ onClosed }: { onClosed: () => void }) {
  const copy = useCopy();
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClosed}
      className="sheet fixed inset-x-0 top-auto bottom-0 m-0 w-full max-w-none rounded-t-[var(--radius-lg)] bg-ivory p-0 text-ink shadow-[var(--shadow-lift)] sm:inset-0 sm:m-auto sm:h-fit sm:max-w-md sm:rounded-[var(--radius-lg)]"
    >
      <div className="px-6 pt-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="t-h3 text-teal-950">
            {copy.booking.title}
          </h2>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/15"
            aria-label={copy.a11y.close}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-3 text-ink-soft">{copy.booking.fallback.unavailable}</p>
        <div className="mt-6 flex flex-col gap-3">
          <ButtonAnchor href={`tel:${contact.primary.tel}`} icon={<Phone aria-hidden="true" />}>
            {copy.booking.fallback.call(contact.primary.display)}
          </ButtonAnchor>
          <ButtonAnchor
            href={whatsappLink(copy.booking.whatsappGeneral)}
            variant="secondary"
            icon={<MessageCircle aria-hidden="true" />}
          >
            {copy.booking.fallback.whatsapp}
          </ButtonAnchor>
        </div>
      </div>
    </dialog>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}
