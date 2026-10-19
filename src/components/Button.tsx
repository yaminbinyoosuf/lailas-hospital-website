import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router';
import { cn } from '../lib/format';

export type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'emergency' | 'light' | 'lightOutline';
export type ButtonSize = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-semibold leading-tight text-center ' +
  'transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-[var(--ease-gentle)] ' +
  'disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4.5 [&_svg]:shrink-0';

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-12 px-6 t-small',
  lg: 'min-h-[3.25rem] px-7 t-h4',
};

const variants: Record<ButtonVariant, string> = {
  primary:
    'border border-white/15 bg-[linear-gradient(145deg,#184d3b_0%,#0b2b20_100%)] text-white shadow-[0_8px_24px_-2px_rgb(11_43_32/0.25)] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-2px_rgb(11_43_32/0.3)]',
  secondary:
    'border border-[rgb(15_45_36/0.15)] bg-white/50 text-[#0b2b20] backdrop-blur-[10px] hover:-translate-y-0.5 hover:bg-white/70',
  quiet:
    '!min-h-11 !px-0 rounded-none text-teal-800 underline decoration-teal-300 decoration-2 underline-offset-[6px] hover:decoration-teal-700 hover:text-teal-950',
  emergency: 'bg-emergency text-white hover:bg-emergency-700',
  light: 'bg-ivory text-teal-950 hover:bg-white',
  lightOutline: 'border-2 border-ivory/60 text-ivory hover:border-ivory hover:bg-white/10 active:bg-white/15',
};

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconAfter?: ReactNode;
  className?: string;
  children: ReactNode;
}

export const buttonClass = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) =>
  cn(base, sizes[size], variants[variant], className);

function Inner({ icon, iconAfter, children }: Pick<StyleProps, 'icon' | 'iconAfter' | 'children'>) {
  return (
    <>
      {icon}
      <span>{children}</span>
      {iconAfter}
    </>
  );
}

export function Button({
  variant,
  size,
  icon,
  iconAfter,
  className,
  children,
  type = 'button',
  ...rest
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClass(variant, size, className)} {...rest}>
      <Inner icon={icon} iconAfter={iconAfter}>
        {children}
      </Inner>
    </button>
  );
}

/** Internal route link styled as a button. */
export function ButtonLink({ variant, size, icon, iconAfter, className, children, ...rest }: StyleProps & LinkProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...rest}>
      <Inner icon={icon} iconAfter={iconAfter}>
        {children}
      </Inner>
    </Link>
  );
}

/** External link (tel:, WhatsApp, maps) styled as a button. */
export function ButtonAnchor({
  variant,
  size,
  icon,
  iconAfter,
  className,
  children,
  href,
  ...rest
}: StyleProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={buttonClass(variant, size, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      <Inner icon={icon} iconAfter={iconAfter}>
        {children}
      </Inner>
    </a>
  );
}
