import { useCopy, useLang, type Lang } from '../i18n/LanguageProvider';
import { cn } from '../lib/format';

const options: { lang: Lang; label: string; htmlLang: string }[] = [
  { lang: 'en', label: 'EN', htmlLang: 'en' },
  { lang: 'ml', label: 'മലയാളം', htmlLang: 'ml' },
];

export function LanguageToggle({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  const { lang, setLang } = useLang();
  const copy = useCopy();
  return (
    <div role="group" aria-label={copy.a11y.language} className={cn('inline-flex items-center gap-1', className)}>
      {options.map((o) => {
        const active = o.lang === lang;
        return (
          <button
            key={o.lang}
            type="button"
            lang={o.htmlLang}
            aria-pressed={active}
            onClick={() => setLang(o.lang)}
            className={cn(
              'min-h-9 min-w-11 rounded-full px-3 text-[0.9375rem] font-semibold transition-colors',
              tone === 'dark'
                ? active
                  ? 'bg-ivory text-teal-900'
                  : 'text-teal-100 hover:text-ivory'
                : active
                  ? 'bg-teal-700 text-ivory'
                  : 'text-ink-soft hover:text-teal-800',
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
