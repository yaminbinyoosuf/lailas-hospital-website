import type { ReactNode } from 'react';
import { cn } from '../lib/format';

type Tone = 'ivory' | 'paper' | 'sand' | 'sage' | 'teal';

const tones: Record<Tone, string> = {
  ivory: 'bg-ivory',
  paper: 'bg-paper',
  sand: 'bg-sand',
  sage: 'bg-sage-50',
  teal: 'bg-teal-900 text-ivory',
};

interface SectionProps {
  id?: string;
  labelledBy?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

export function Section({ id, labelledBy, tone = 'ivory', className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('py-20 md:py-28', tones[tone], className)}>
      {children}
    </section>
  );
}
