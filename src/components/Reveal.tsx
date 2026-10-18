import { m } from 'motion/react';
import { EASE_EDITORIAL } from '../lib/motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Render as a list item inside <ol>/<ul>. */
  as?: 'div' | 'li';
}

/** Soft fade and rise when content scrolls into view. Runs once. */
export function Reveal({ children, className, delay = 0, y = 16, as = 'div' }: RevealProps) {
  const Comp = as === 'li' ? m.li : m.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.72, ease: EASE_EDITORIAL, delay }}
    >
      {children}
    </Comp>
  );
}
