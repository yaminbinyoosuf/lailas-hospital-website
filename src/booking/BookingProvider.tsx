import { createContext, lazy, Suspense, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { DoctorId, ServiceId } from '../content/site';

export type BookingTarget = { kind: 'service'; id: ServiceId } | { kind: 'doctor'; id: DoctorId };

interface BookingContextValue {
  open: (target?: BookingTarget) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);
const BookingSheet = lazy(() => import('./BookingSheet'));

export function BookingProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<{ target?: BookingTarget; key: number } | null>(null);

  const open = useCallback((target?: BookingTarget) => {
    setRequest({ target, key: Date.now() });
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {request && (
        <Suspense fallback={null}>
          <BookingSheet key={request.key} initialTarget={request.target} onClosed={() => setRequest(null)} />
        </Suspense>
      )}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}
