import type { ReactNode } from 'react';
import { cn } from '../lib/format';

type Tone = 'ivory' | 'paper' | 'sand' | 'sage' | 'teal';

/**
 * Vertical rhythm. Not every section deserves the same amount of air — a run of
 * identically spaced sections is what makes a long page feel monotonous.
 *   tight  pairs with the section above (same tone, continuous idea)
 *   base   the default
 *   loose  a deliberate pause or a change of subject
 */
type Space = 'tight' | 'base' | 'loose';

const spaces: Record<Space, string> = {
  tight: 'py-14 md:py-20',
  base: 'py-20 md:py-28',
  loose: 'py-24 md:py-36',
};

const tones: Record<Tone, string> = {
  ivory: 'bg-ivory',
  paper: 'bg-paper',
  /* Grain is texture, not decoration: it belongs to the two materials that
     would carry it in print, sand and deep teal. Ivory and paper stay clean. */
  sand: 'bg-sand grain',
  sage: 'bg-sage-50',
  teal: 'bg-teal-900 text-ivory grain',
};

interface SectionProps {
  id?: string;
  labelledBy?: string;
  tone?: Tone;
  space?: Space;
  className?: string;
  children: ReactNode;
}

export function Section({
  id,
  labelledBy,
  tone = 'ivory',
  space = 'base',
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(spaces[space], tones[tone], className)}
    >
      {children}
    </section>
  );
}
