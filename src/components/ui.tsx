import React from 'react';

/* ============================================================================
   Shared UI primitives — one source of truth for the modern button,
   section-heading and container treatments used across every page.
   ========================================================================== */

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  width?: 'default' | 'narrow' | 'wide';
};

const WIDTHS: Record<NonNullable<ContainerProps['width']>, string> = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  width = 'default',
}) => (
  <div className={`mx-auto w-full px-5 sm:px-8 ${WIDTHS[width]} ${className}`}>{children}</div>
);

/* -------------------------------------------------------------------------- */

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'coral' | 'onDark';
type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-700 text-white shadow-[0_10px_30px_-12px_rgba(14,79,76,0.65)] hover:bg-brand-800 hover:shadow-[0_16px_40px_-14px_rgba(14,79,76,0.7)]',
  secondary:
    'bg-white text-brand-800 border border-line hover:border-brand-300 hover:bg-brand-50/60 shadow-[0_1px_2px_rgba(22,33,31,0.04)]',
  ghost: 'bg-transparent text-brand-800 hover:bg-brand-50',
  coral:
    'bg-coral-500 text-white shadow-[0_10px_30px_-12px_rgba(206,85,64,0.6)] hover:bg-coral-600',
  onDark:
    'bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20 hover:border-white/30',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'text-sm px-3.5 py-2 gap-1.5 rounded-lg',
  md: 'text-[0.9375rem] px-5 py-2.5 gap-2 rounded-lg',
  lg: 'text-base px-6 py-3.5 gap-2.5 rounded-lg',
};

const BASE =
  'inline-flex items-center justify-center font-semibold whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...rest
}) => (
  <button
    type={type}
    className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    {...rest}
  >
    {children}
  </button>
);

type LinkButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}) => (
  <a className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...rest}>
    {children}
  </a>
);

/* -------------------------------------------------------------------------- */

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  accent?: 'teal' | 'coral';
  className?: string;
  children?: React.ReactNode;
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  accent = 'teal',
  className = '',
  children,
}) => {
  const centered = align === 'center';
  return (
    <div
      className={`${centered ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'} ${className}`}
    >
      {eyebrow && (
        <p className={`eyebrow mb-4 ${accent === 'coral' ? 'text-coral-600' : ''}`}>{eyebrow}</p>
      )}
      <h2 className="display text-[clamp(1.75rem,1.2rem+2.2vw,2.75rem)]">{title}</h2>
      {description && <p className="lede mt-4">{description}</p>}
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */

/** Large decorative serif figure used in stat bands. */
export const Stat: React.FC<{
  value: React.ReactNode;
  label: string;
  tone?: 'dark' | 'light';
}> = ({ value, label, tone = 'dark' }) => (
  <div>
    <div
      className={`display text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] ${
        tone === 'light' ? 'text-white' : ''
      }`}
    >
      {value}
    </div>
    <div
      className={`mt-1.5 text-sm leading-snug ${
        tone === 'light' ? 'text-white/65' : 'text-ink-soft'
      }`}
    >
      {label}
    </div>
  </div>
);
