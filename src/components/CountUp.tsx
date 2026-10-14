import { useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

interface CountUpProps {
  value: number;
  suffix?: string;
  /** Years should not get a thousands separator. */
  grouping?: boolean;
  className?: string;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Counts up gently the first time it is seen. The final number is always in
 * the markup, so search engines, screen readers and no-JS visitors see it.
 */
export function CountUp({ value, suffix = '', grouping = true, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const format = (n: number) => new Intl.NumberFormat('en-IN', { useGrouping: grouping }).format(n) + suffix;

  useEffect(() => {
    const el = ref.current;
    if (!inView || reduce || !el) return;
    const from = grouping ? 0 : value - 30;
    const duration = grouping ? 1800 : 1200;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = format(Math.round(from + (value - from) * easeOut(t)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value]);

  return (
    <span className={className}>
      <span className="sr-only">{format(value)}</span>
      <span ref={ref} aria-hidden="true">
        {format(value)}
      </span>
    </span>
  );
}
