import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { en, type Copy } from '../content/copy/en';

export type Lang = 'en' | 'ml';

const STORAGE_KEY = 'lailas.lang';

/** Malayalam loads only when someone chooses it, so English visitors never download it. */
let mlCache: Copy | null = null;
const loadMl = async () => (mlCache ??= (await import('../content/copy/ml')).ml);

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
  const [copy, setCopy] = useState<Copy>(en);

  const apply = useCallback(async (next: Lang) => {
    const dict = next === 'ml' ? await loadMl() : en;
    setCopy(dict);
    setLangState(next);
  }, []);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable: keep English */
    }
    if (saved === 'ml') void apply('ml');
  }, [apply]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback(
    (next: Lang) => {
      void apply(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
    },
    [apply],
  );

  const value = useMemo(() => ({ lang, copy, setLang }), [lang, copy, setLang]);
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
