import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router';
import { cn } from '../lib/format';

export type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'emergency' | 'light' | 'lightOutline';
export type ButtonSize = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-lg font-sans font-semibold leading-tight text-center ' +
  'transition-all duration-200 ease-[var(--ease-gentle)] ' +
  'disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4.5 [&_svg]:shrink-0';

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-12 px-6 text-[0.9375rem]',
  lg: 'min-h-13 px-7 text-base',
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-teal-800 text-ivory shadow-xs hover:bg-teal-900 active:scale-[0.99]',
  secondary: 'border border-line bg-paper text-ink shadow-2xs hover:border-teal-700 hover:text-teal-950 hover:bg-white active:scale-[0.99]',
  quiet:
    '!min-h-11 !px-0 rounded-none text-teal-800 underline decoration-teal-300 decoration-2 underline-offset-[6px] hover:decoration-teal-700 hover:text-teal-950',
  emergency: 'bg-emergency text-white shadow-xs hover:bg-emergency-700 active:scale-[0.99]',
  light: 'bg-ivory text-teal-950 font-semibold shadow-xs hover:bg-white active:scale-[0.99]',
  lightOutline: 'border border-ivory/50 text-ivory hover:border-ivory hover:bg-ivory/10 active:scale-[0.99]',
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
