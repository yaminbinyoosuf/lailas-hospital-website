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
  tight: 'py-16 md:py-20',
  base: 'py-24 md:py-32',
  loose: 'py-28 md:py-40',
};

const tones: Record<Tone, string> = {
  ivory: 'bg-ivory ambient',
  paper: 'bg-paper ambient',
  sand: 'bg-sand',
  sage: 'bg-sage-50',
  teal: 'bg-teal-900 text-ivory',
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
