import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { en, type Copy } from '../content/copy/en';
import { ml } from '../content/copy/ml';

export type Lang = 'en' | 'ml';

const STORAGE_KEY = 'lailas.lang';
const dictionaries: Record<Lang, Copy> = { en, ml };

interface LanguageContextValue {
  lang: Lang;
  copy: Copy;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * The server always renders English. The saved choice is applied after
 * hydration so server and client markup match.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'ml') setLangState(saved);
    } catch {
      /* storage unavailable: keep English */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ lang, copy: dictionaries[lang], setLang }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

function useLanguageContext() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useCopy must be used inside <LanguageProvider>');
  return ctx;
}

export const useCopy = () => useLanguageContext().copy;
export const useLang = () => {
  const { lang, setLang } = useLanguageContext();
  return { lang, setLang };
};
