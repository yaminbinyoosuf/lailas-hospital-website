import { cn } from '../lib/format';

/**
 * An indexed section label: a clay hairline, a zero-padded number and a name.
 * Indices are passed explicitly and reset per page. Colour lives here rather
 * than in the type utilities, which deliberately carry no colour.
 */
export function SectionLabel({
  index,
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
    <p className={cn('flex items-center gap-3 t-label uppercase', className)}>
      <span
        aria-hidden="true"
        className={cn('h-px w-8 shrink-0', tone === 'dark' ? 'bg-clay-200/70' : 'bg-clay-600/60')}
      />
      <span className={cn('tabular-nums', tone === 'dark' ? 'text-clay-200' : 'text-clay-600')}>
        {String(index).padStart(2, '0')}
      </span>
      <span className={tone === 'dark' ? 'text-teal-100/80' : 'text-ink-muted'}>{name}</span>
    </p>
  );
}
