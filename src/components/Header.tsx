import { CalendarDays, Menu, Phone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { contact } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { cn } from '../lib/format';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor } from './Button';
import { Container } from './Container';
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
        'sticky top-0 z-40 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300',
        scrolled
          ? 'border-white/80 bg-ivory/85 shadow-[0_8px_30px_rgb(11_36_31/0.08)]'
          : 'border-white/60 bg-ivory/70 shadow-[0_2px_12px_rgb(11_36_31/0.03)]',
      )}
    >
      <Container
        className={cn(
          'flex items-center justify-between gap-6 transition-[padding] duration-300',
          scrolled ? 'py-2.5' : 'py-3.5 xl:py-4',
        )}
      >
        <Link to="/" aria-label={copy.a11y.home} className="shrink-0 rounded-md">
          <Logo className={cn('transition-[height] duration-300', scrolled ? 'h-10 xl:h-12' : 'h-11 xl:h-16')} />
        </Link>

        <nav aria-label={copy.a11y.mainNav} className="hidden xl:block">
          <ul className="flex items-center gap-1.5 p-1 rounded-full glass-card border border-white/80 shadow-xs">
            {mainNav.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    cn(
                      'relative inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-4 t-body font-semibold transition-all duration-200',
                      isActive && !item.to.includes('#')
                        ? 'bg-teal-800 text-ivory shadow-xs'
                        : 'text-ink-soft hover:bg-teal-900/5 hover:text-teal-900',
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
          {/* From lg the mobile bar is hidden, so Book must be here from lg too. */}
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
  const { open } = useBooking();
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
        className="grid size-12 place-items-center rounded-full border border-ink/15 text-ink xl:hidden"
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
          </nav>
          <div className="grid gap-3 border-t border-line p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <Button
              size="lg"
              className="w-full"
              icon={<CalendarDays aria-hidden="true" />}
              onClick={() => {
                ref.current?.close();
                open();
              }}
            >
              {copy.actions.book}
            </Button>
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
