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

export const cn = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ');
