import React, { useEffect, useId, useRef, useState } from 'react';
import {
  Menu,
  X,
  Phone,
  CalendarCheck,
  MapPin,
  Clock,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Siren,
  Baby,
  Heart,
  Brain,
  Bone,
  Activity,
  Stethoscope,
  FlaskConical,
  Pill,
  Ambulance,
  Sparkles,
  TriangleAlert,
  MessageCircle,
} from 'lucide-react';
import {
  HOSPITAL_DATA,
  SPECIALITIES,
  SPECIALITY_CATEGORIES,
  type SpecialityCategory,
  type SpecialityIcon,
} from '../data/hospitalData';
import { Button } from './ui';
import { whatsappUrl, WHATSAPP_MESSAGES } from '../data/hospitalData';

/* ============================================================================
   Sticky header + persistent conversion bar
   ----------------------------------------------------------------------------
   Contains, in priority order for a stressed patient:
     1. Emergency helpline  — always visible, never competing for space
     2. Book appointment    — the primary conversion action
     3. Department dropdown — fast multi-speciality routing
     4. Primary navigation
   ========================================================================== */

const ICONS: Record<SpecialityIcon, React.ElementType> = {
  baby: Baby,
  heart: Heart,
  brain: Brain,
  bone: Bone,
  child: Activity,
  stethoscope: Stethoscope,
  flask: FlaskConical,
  pill: Pill,
  ambulance: Ambulance,
  sparkles: Sparkles,
};

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Departments', path: '/departments' },
  { label: 'Doctors', path: '/doctors' },
  { label: 'Patient Portal', path: '/portal' },
  { label: 'Contact', path: '/contact' },
];

/** Compact brand lockup: monogram tile + wordmark. */
export const BrandMark: React.FC<{ tone?: 'dark' | 'light'; className?: string }> = ({
  tone = 'dark',
  className = '',
}) => {
  const light = tone === 'light';
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${
          light ? 'bg-white/10 ring-1 ring-white/25' : 'bg-brand-700 shadow-[0_8px_20px_-10px_rgba(21,85,140,0.85)]'
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none">
          <path
            d="M12 20.5s-7.2-4.3-7.2-9.6A4.3 4.3 0 0 1 12 8.2a4.3 4.3 0 0 1 7.2 2.7c0 5.3-7.2 9.6-7.2 9.6Z"
            fill={light ? '#85b7e6' : '#ffffff'}
          />
          <path
            d="M12 8.4V5.2M9.4 6.8h5.2"
            stroke={light ? '#ffffff' : '#85b7e6'}
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col text-left leading-none">
        <span
          className={`font-display text-[1.0625rem] font-semibold tracking-tight sm:text-lg ${
            light ? 'text-white' : 'text-brand-800'
          }`}
        >
          Lailas Hospital
        </span>
        <span
          className={`mt-1 hidden text-[0.6875rem] font-semibold tracking-[0.04em] sm:block ${
            light ? 'text-brand-200' : 'text-brand-600'
          }`}
        >
          {HOSPITAL_DATA.tagline}
        </span>
      </span>
    </span>
  );
};

/* -------------------------------------------------------------------------- */

interface DepartmentDropdownProps {
  onSelect: (specialityId: string) => void;
  onViewAll: () => void;
}

/**
 * Fast multi-speciality selector. Keyboard: Enter/Space opens, ↑/↓/Home/End move
 * through the grouped list, Escape closes, and focus returns to the trigger.
 */
const DepartmentDropdown: React.FC<DepartmentDropdownProps> = ({ onSelect, onViewAll }) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  // Move DOM focus onto the active option so screen readers track it.
  useEffect(() => {
    if (!open) return;
    const items = listRef.current?.querySelectorAll<HTMLElement>('[role="option"]');
    items?.[activeIndex]?.focus();
  }, [open, activeIndex]);

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(0);
    }
  };

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % SPECIALITIES.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + SPECIALITIES.length) % SPECIALITIES.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIndex(SPECIALITIES.length - 1);
    } else if (e.key === 'Tab') {
      // Tabbing out of the menu closes it.
      close(false);
    }
  };

  const grouped = SPECIALITY_CATEGORIES.map((cat) => ({
    category: cat,
    items: SPECIALITIES.filter((s) => s.category === cat),
  }));

  let flatIndex = -1;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
        className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white px-4 py-2.5 text-[0.9375rem] font-semibold text-brand-800 transition-colors hover:border-brand-300 hover:bg-brand-50"
      >
        <Stethoscope className="h-4 w-4 text-sand-600" aria-hidden="true" />
        Departments
        <ChevronDown
          className={`h-4 w-4 text-sand-600 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={panelId}
          className="absolute left-0 top-[calc(100%+0.6rem)] z-50 w-[min(46rem,calc(100vw-2.5rem))] animate-enter overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-float)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-line bg-canvas px-5 py-3.5">
            <p className="text-sm font-semibold text-brand-800">
              Choose a department to book
            </p>
            <button
              type="button"
              onClick={() => {
                close(false);
                onViewAll();
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <ul
            ref={listRef}
            role="listbox"
            aria-label="Departments"
            onKeyDown={onListKeyDown}
            className="scroll-slim grid max-h-[24rem] grid-cols-1 gap-x-2 overflow-y-auto p-3 sm:grid-cols-2"
          >
            {grouped.map(({ category, items }) => (
              <React.Fragment key={category}>
                <li
                  role="presentation"
                  className="col-span-full px-2 pb-1 pt-3 text-[0.6875rem] font-semibold text-ink-soft first:pt-1"
                >
                  {category}
                </li>
                {items.map((s) => {
                  flatIndex += 1;
                  const idx = flatIndex;
                  const Icon = ICONS[s.icon] ?? Stethoscope;
                  const active = idx === activeIndex;
                  return (
                    <li key={s.id} role="none">
                      <button
                        type="button"
                        role="option"
                        aria-selected={active}
                        tabIndex={-1}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => {
                          close(false);
                          onSelect(s.id);
                        }}
                        className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                          active ? 'bg-brand-50' : 'hover:bg-canvas'
                        }`}
                      >
                        <span
                          className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                            active ? 'bg-brand-700 text-white' : 'bg-brand-50 text-brand-700'
                          }`}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="text-[0.9375rem] font-medium text-brand-800">
                              {s.title}
                            </span>
                            {!s.verified && (
                              <TriangleAlert
                                className="h-3.5 w-3.5 shrink-0 text-sand-500"
                                aria-label="Pending confirmation"
                              />
                            )}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-ink-soft">
                            {s.availability}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </React.Fragment>
            ))}
          </ul>

          <div className="flex items-start gap-2.5 border-t border-line bg-canvas px-5 py-3">
            <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sand-500" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-ink-soft">
              Items marked with a warning are awaiting confirmation from hospital administration —
              please call reception before travelling.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onBookSpeciality: (specialityId: string) => void;
  onOpenAppointmentModal: () => void;
  onOpenTriage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onBookSpeciality,
  onOpenAppointmentModal,
  onOpenTriage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    drawerRef.current?.querySelector<HTMLElement>('button, a[href]')?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileMenuOpen]);

  // Return focus to the trigger when the drawer closes.
  useEffect(() => {
    if (!mobileMenuOpen) menuButtonRef.current?.focus?.({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileMenuOpen]);

  const go = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const emergency = HOSPITAL_DATA.emergency;

  return (
    <>
      {/* Skip link — first tab stop for keyboard and screen-reader users. */}
      <a
        href="#main-content"
        className="sr-only-focusable focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-800 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full">
        {/* ---------- Utility band: emergency + hours ------------------- */}
        <div className="hidden border-b border-brand-800/15 bg-brand-900 text-white 2xl:block">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-2 sm:px-8">
            <div className="flex items-center gap-6 text-[0.8125rem]">
              <span className="flex items-center gap-2 text-brand-200">
                <MapPin className="h-3.5 w-3.5 text-brand-300" aria-hidden="true" />
                {HOSPITAL_DATA.address.town}, {HOSPITAL_DATA.address.district}
              </span>
              <span className="flex items-center gap-2 text-brand-200">
                <Clock className="h-3.5 w-3.5 text-brand-300" aria-hidden="true" />
                {HOSPITAL_DATA.operatingHours.opdConsultations}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenTriage}
                className="inline-flex min-h-11 items-center text-[0.8125rem] font-medium text-brand-200 underline decoration-sand-500 underline-offset-4 transition-colors hover:text-white"
              >
                Not sure which clinic?
              </button>
              <a
                href={`tel:${emergency.tel}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-critical px-4 py-2 text-[0.8125rem] font-semibold text-white transition-colors hover:brightness-110"
              >
                <Siren className="h-3.5 w-3.5" aria-hidden="true" />
                Emergency
                <span className="tabular-numbers">{emergency.display}</span>
              </a>
            </div>
          </div>
        </div>

        {/* ---------- Main bar ------------------------------------------ */}
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled
              ? 'border-b border-line/80 bg-canvas/90 backdrop-blur-xl'
              : 'border-b border-transparent bg-canvas'
          }`}
        >
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
            <button
              type="button"
              onClick={() => go('/')}
              className={`shrink-0 transition-all duration-500 ${scrolled ? 'py-2.5' : 'py-3.5'}`}
              aria-label="Lailas Hospital and IVF Centre — go to home page"
            >
              <BrandMark />
            </button>

            <nav className="hidden items-center gap-0 2xl:flex" aria-label="Primary">
              {NAV_LINKS.map((link) => {
                const active = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    type="button"
                    onClick={() => go(link.path)}
                    aria-current={active ? 'page' : undefined}
                    className={`relative inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-2.5 py-2 text-[0.9375rem] transition-colors duration-300 ${
                      active
                        ? 'font-semibold text-brand-800'
                        : 'font-medium text-ink-soft hover:bg-brand-50 hover:text-brand-800'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span
                        className="absolute inset-x-2.5 -bottom-0.5 h-[2px] rounded-full bg-coral-500"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Conversion actions — always visible. */}
            <div className="hidden shrink-0 items-center gap-2 2xl:flex">
              <DepartmentDropdown
                onSelect={(id) => {
                  onBookSpeciality(id);
                }}
                onViewAll={() => go('/departments')}
              />

              <a
                href={`tel:${emergency.tel}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-critical-line bg-critical-soft px-3.5 py-2.5 text-sm font-semibold text-critical transition-colors hover:bg-critical hover:text-white"
              >
                <Siren className="h-4 w-4" aria-hidden="true" />
                <span className="tabular-numbers whitespace-nowrap 2xl:sr-only">
                  {emergency.display}
                </span>
              </a>

              <a
                href={whatsappUrl(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with the hospital on WhatsApp"
                className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white transition-transform duration-300 hover:scale-[1.05]"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </a>

              <Button onClick={onOpenAppointmentModal} size="md">
                <CalendarCheck className="h-4 w-4" />
                Book appointment
              </Button>
            </div>

            {/* Compact controls (below lg) */}
            <div className="flex items-center gap-2 2xl:hidden">
              <a
                href={`tel:${emergency.tel}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-critical px-3 py-2 text-sm font-semibold text-white sm:px-3.5"
                aria-label={`Emergency — call ${emergency.display}`}
              >
                <Siren className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Emergency</span>
              </a>
              <button
                type="button"
                onClick={onOpenAppointmentModal}
                className="hidden min-h-11 items-center rounded-full bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white sm:inline-flex"
              >
                Book
              </button>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="tap rounded-full border border-line bg-white text-brand-800 transition-colors hover:bg-brand-50"
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Mobile drawer ---------- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 2xl:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <div
            className="absolute inset-0 animate-fade bg-brand-950/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            ref={drawerRef}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm animate-enter flex-col bg-canvas shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <BrandMark />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="tap rounded-full border border-line bg-white text-brand-800"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="scroll-slim flex-1 overflow-y-auto px-4 py-5">
              <nav aria-label="Mobile">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link) => {
                    const active = currentPath === link.path;
                    return (
                      <li key={link.path}>
                        <button
                          type="button"
                          onClick={() => go(link.path)}
                          className={`flex w-full min-h-12 items-center justify-between rounded-xl px-4 py-3 text-left text-[1.0625rem] transition-colors ${
                            active
                              ? 'bg-brand-700 font-semibold text-white'
                              : 'font-medium text-ink hover:bg-white'
                          }`}
                        >
                          {link.label}
                          <ChevronRight
                            className={`h-4 w-4 ${active ? 'text-brand-300' : 'text-sand-500'}`}
                            aria-hidden="true"
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Departments by category */}
              <div className="mt-6">
                <p className="eyebrow mb-3">Book by department</p>
                <div className="space-y-4">
                  {SPECIALITY_CATEGORIES.map((cat: SpecialityCategory) => (
                    <div key={cat}>
                      <p className="px-1 pb-1.5 text-[0.6875rem] font-semibold text-ink-soft">{cat}</p>
                      <ul className="space-y-1">
                        {SPECIALITIES.filter((s) => s.category === cat).map((s) => {
                          const Icon = ICONS[s.icon] ?? Stethoscope;
                          return (
                            <li key={s.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  onBookSpeciality(s.id);
                                }}
                                className="flex w-full min-h-12 items-center gap-3 rounded-xl bg-white px-3.5 py-2.5 text-left transition-colors hover:bg-brand-50"
                              >
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                                  <Icon className="h-4 w-4" aria-hidden="true" />
                                </span>
                                <span className="min-w-0 flex-1 text-[0.9375rem] font-medium text-brand-800">
                                  {s.title}
                                </span>
                                {!s.verified && (
                                  <TriangleAlert className="h-3.5 w-3.5 shrink-0 text-sand-500" aria-hidden="true" />
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact block */}
              <div className="mt-6 space-y-3 rounded-xl bg-white p-5">
                <p className="eyebrow">Reception &amp; enquiries</p>
                <a
                  href={`tel:${HOSPITAL_DATA.phones[0].tel}`}
                  className="flex min-h-11 items-center gap-2.5 text-lg font-semibold text-brand-800"
                >
                  <Phone className="h-4 w-4 text-coral-600" aria-hidden="true" />
                  <span className="tabular-numbers">{HOSPITAL_DATA.phones[0].display}</span>
                </a>
                <div className="hairline" />
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTriage();
                  }}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-line text-sm font-semibold text-brand-800"
                >
                  Not sure which clinic? Ask
                </button>
              </div>
            </div>

            <div className="space-y-2.5 border-t border-line bg-white px-4 py-4">
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointmentModal();
                }}
              >
                <CalendarCheck className="h-4 w-4" />
                Book an appointment
              </Button>
              <a
                href={`tel:${emergency.tel}`}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-critical px-5 py-3 font-semibold text-white"
              >
                <Siren className="h-4 w-4" aria-hidden="true" />
                Emergency <span className="tabular-numbers">{emergency.display}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
