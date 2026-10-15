import { createContext, useContext, type ReactNode } from 'react';
import { en, type Copy } from '../content/copy/en';

/**
 * Copy provider.
 *
 * The site is English only. This stays a context rather than a plain import so
 * components keep consuming `useCopy()` unchanged, and so another language
 * could be reintroduced later without touching every call site.
 */
const LanguageContext = createContext<Copy | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  return <LanguageContext.Provider value={en}>{children}</LanguageContext.Provider>;
}

export function useCopy(): Copy {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useCopy must be used inside <LanguageProvider>');
  return ctx;
}
