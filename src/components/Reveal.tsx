import { m, useInView, useReducedMotion } from 'motion/react';
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Render as a list item inside <ol>/<ul>. */
  as?: 'div' | 'li';
}

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Soft fade and rise when content scrolls into view. Runs once.
 *
 * The prerendered HTML is always fully visible: content is only hidden after
 * hydration, and only if it starts below the viewport. If JavaScript or the
 * motion features fail to load, nothing is left invisible. Content already on
 * screen at load never animates, and reduced motion turns the effect off.
 */
export function Reveal({ children, className, delay = 0, y = 20, as = 'div' }: RevealProps) {
  const Comp = as === 'li' ? m.li : m.div;
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const [armed, setArmed] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, [reduce]);

  const hidden = armed && !inView;
  return (
    <Comp
      ref={ref}
      className={className}
      initial={false}
      animate={hidden ? { opacity: 0, y } : { opacity: 1, y: 0 }}
      transition={hidden ? { duration: 0 } : { duration: 0.8, ease, delay }}
    >
      {children}
    </Comp>
  );
}
