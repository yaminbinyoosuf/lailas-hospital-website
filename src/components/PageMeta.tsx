import { useEffect } from 'react';
import type { Copy } from '../content/copy/en';
import { useCopy } from '../i18n/LanguageProvider';

export type MetaKey = Exclude<keyof Copy['meta'], 'siteName'>;

/**
 * Keeps the tab title and description in sync during client navigation and
 * language changes. The prerender step writes the full head for each page.
 */
export function PageMeta({ page }: { page: MetaKey }) {
  const copy = useCopy();
  useEffect(() => {
    const meta = copy.meta[page];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [copy, page]);
  return null;
}
