import { CalendarDays, Menu, Phone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { contact } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { cn } from '../lib/format';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor } from './Button';
import { Container } from './Container';
import { LanguageToggle } from './LanguageToggle';
import { Logo } from './Logo';
import { mainNav } from './navItems';

export function Header() {
  const copy = useCopy();
  const { open } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300',
        scrolled ? 'border-line bg-ivory/95 shadow-[0_8px_24px_-20px_rgb(31_42_39/0.35)] backdrop-blur-sm' : 'border-transparent bg-ivory',
      )}
    >
      <Container
        className={cn(
          'flex items-center justify-between gap-6 transition-[padding] duration-300',
          scrolled ? 'py-2' : 'py-3 lg:py-4',
        )}
      >
        <Link to="/" aria-label={copy.a11y.home} className="shrink-0 rounded-md">
          <Logo className={cn('transition-[height] duration-300', scrolled ? 'h-10 lg:h-12' : 'h-11 lg:h-16')} />
        </Link>

        <nav aria-label={copy.a11y.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    cn(
                      'relative inline-flex min-h-12 items-center whitespace-nowrap px-3.5 t-body font-medium text-ink-soft transition-colors hover:text-teal-800',
                      'after:absolute after:inset-x-3.5 after:bottom-2 after:h-0.5 after:origin-left after:rounded-full after:bg-clay-500 after:transition-transform after:duration-300',
                      isActive && !item.to.includes('#') ? 'text-teal-900 after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
                    )
                  }
                >
                  {copy.nav[item.key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <Button icon={<CalendarDays aria-hidden="true" />} onClick={() => open()}>
              {copy.actions.book}
            </Button>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}

function MobileMenu() {
  const copy = useCopy();
  const ref = useRef<HTMLDialogElement>(null);
  const location = useLocation();

  useEffect(() => {
    ref.current?.close();
  }, [location.pathname, location.hash]);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="grid size-12 place-items-center rounded-full border border-ink/15 text-ink lg:hidden"
        aria-label={copy.a11y.openMenu}
        aria-haspopup="dialog"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>
      <dialog
        ref={ref}
        aria-label={copy.a11y.mainNav}
        className="sheet fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-ivory p-0 text-ink"
        onClick={(e) => e.target === ref.current && ref.current.close()}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-3">
            <Logo className="h-11" />
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="grid size-12 place-items-center rounded-full border border-ink/15"
              aria-label={copy.a11y.closeMenu}
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label={copy.a11y.mainNav} className="flex-1 overflow-y-auto px-5 pt-6">
            <ul className="divide-y divide-line border-y border-line">
              {mainNav.map((item) => (
                <li key={item.key}>
                  <Link to={item.to} className="flex min-h-16 items-center t-h3 text-teal-950">
                    {copy.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageToggle tone="light" className="mt-8" />
          </nav>
          <div className="border-t border-line p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <ButtonAnchor
              href={`tel:${contact.primary.tel}`}
              variant="emergency"
              size="lg"
              className="w-full"
              icon={<Phone aria-hidden="true" />}
            >
              {copy.actions.callEmergency}
            </ButtonAnchor>
          </div>
        </div>
      </dialog>
    </>
  );
}
