import { extendTailwindMerge } from 'tailwind-merge';
import type { Copy } from '../content/copy/en';
import type { TimeWindow, Weekday } from '../content/site';

/** "Monday to Saturday", "Every day", or a comma list for gaps. */
export function formatDays(days: readonly Weekday[], c: Copy): string {
  if (days.length === 7) return c.time.everyDay;
  const sorted = [...days].sort((a, b) => a - b);
  const contiguous = sorted.every((d, i) => i === 0 || d === sorted[i - 1] + 1);
  if (contiguous && sorted.length > 2) {
    return c.time.dayRange(c.time.days[sorted[0]], c.time.days[sorted[sorted.length - 1]]);
  }
  return sorted.map((d) => c.time.days[d]).join(', ');
}

export function formatHours(w: TimeWindow, c: Copy): string {
  if (w.open === '00:00' && w.close === '24:00') return c.time.open24;
  return c.time.timeRange(c.time.formatTime(w.open), c.time.formatTime(w.close));
}

export function formatDate(d: Date, c: Copy, opts: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(c.locale, opts).format(d);
}

export function addDays(d: Date, n: number) {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

/**
 * Tailwind class merger.
 *
 * A plain join() leaves conflicting utilities side by side, so which one wins
 * depends on stylesheet order rather than intent — `<Container className="max-w-3xl">
 * silently lost to the component's own max-w-[80rem]`. This resolves conflicts
 * properly, last-wins. It also knows about our custom type scale and radius
 * tokens so `t-h3 ... t-h2` and `rounded-[var(--radius-md)] ...` behave.
 */
const merge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { t: ['display', 'h1', 'h2', 'h3', 'h4', 'lead', 'body', 'small', 'meta', 'label', 'ui', 'ui-lg', 'number'] },
      ],
      rounded: [
        {
          'rounded-(radius)': ['[var(--radius-sm)]', '[var(--radius-md)]', '[var(--radius-lg)]'],
        },
      ],
    },
  },
});

export const cn = (...parts: (string | false | null | undefined)[]) =>
  merge(parts.filter(Boolean).join(' '));
