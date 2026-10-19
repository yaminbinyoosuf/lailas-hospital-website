import { cn } from '../lib/format';

/**
 * Section eyebrow pill label.
 * Rendered as a compact tinted pill — no dash separators, no index numbers.
 * t-label handles: 11px, font-weight 700, letter-spacing 0.09em, uppercase.
 */
export function SectionLabel({
  index: _index,
  name,
  tone = 'light',
  className,
}: {
  index: number;
  name: string;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <span
      className={cn(
        't-label inline-flex items-center rounded-full px-3 py-1.5',
        tone === 'dark'
          ? 'bg-white/10 text-teal-100 ring-1 ring-white/20'
          : 'bg-teal-700/10 text-teal-700 ring-1 ring-teal-600/20',
        className,
      )}
    >
      {name}
    </span>
  );
}
