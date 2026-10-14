import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  Search,
  X,
  CornerDownLeft,
  Stethoscope,
  Baby,
  Heart,
  Brain,
  Bone,
  Activity,
  FlaskConical,
  Pill,
  Ambulance,
  Sparkles,
  BookOpen,
  HelpCircle,
  Phone,
  ArrowRight,
} from 'lucide-react';
import {
  searchHospital,
  POPULAR_SEARCHES,
  SEARCH_EMERGENCY_HINT,
  kindLabel,
  type SearchResult,
} from '../lib/search';
import { HOSPITAL_DATA } from '../data/hospitalData';

const ICONS: Record<string, React.ElementType> = {
  stethoscope: Stethoscope,
  baby: Baby,
  heart: Heart,
  brain: Brain,
  bone: Bone,
  child: Activity,
  flask: FlaskConical,
  pill: Pill,
  ambulance: Ambulance,
  sparkles: Sparkles,
  book: BookOpen,
  help: HelpCircle,
};

interface SearchBarProps {
  /** Opens the booking wizard, pre-seeded with a speciality. */
  onBookSpeciality: (specialityId: string) => void;
  onNavigate: (path: string) => void;
  /** Opens the symptom triage assistant. */
  onOpenTriage: () => void;
  variant?: 'hero' | 'compact';
}

/**
 * Instant search over departments, doctors, treatments and health articles.
 *
 * Implemented as an ARIA combobox + listbox so that screen-reader and keyboard
 * users get the same instant results as pointer users:
 *   ↑/↓ move the active option · Enter selects · Escape dismisses.
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  onBookSpeciality,
  onNavigate,
  onOpenTriage,
  variant = 'hero',
}) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const inputId = useId();

  const results = useMemo(() => searchHospital(query, { limit: 7 }), [query]);
  const hasQuery = query.trim().length >= 2;
  const showPanel = open && hasQuery;

  // Close when focus/pointer leaves the whole widget.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  useEffect(() => setActiveIndex(-1), [query]);

  const choose = (result: SearchResult) => {
    setOpen(false);
    setQuery('');
    if (result.specialityId) onBookSpeciality(result.specialityId);
    else if (result.path) onNavigate(result.path);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (!showPanel) {
      if (e.key === 'ArrowDown' && hasQuery) setOpen(true);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) {
      e.preventDefault();
      choose(results[activeIndex]);
    }
  };

  const hero = variant === 'hero';

  return (
    <div ref={wrapperRef} className={hero ? 'w-full max-w-2xl' : 'relative w-full'}>
      <label htmlFor={inputId} className="sr-only-focusable">
        Search doctors, symptoms, treatments or departments
      </label>

      <div
        className={`flex items-center gap-2.5 rounded-full border bg-white transition-shadow ${
          hero
            ? 'border-line min-h-14 py-2 pl-5 pr-2 shadow-[var(--shadow-lift)] focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-500/15'
            : 'border-line min-h-12 py-1.5 pl-4 pr-1.5'
        }`}
      >
        <Search className={`shrink-0 text-sand-600 ${hero ? 'h-5 w-5' : 'h-4 w-4'}`} aria-hidden="true" />
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 && results[activeIndex] ? `${listboxId}-opt-${activeIndex}` : undefined
          }
          autoComplete="off"
          value={query}
          placeholder={
            hero ? 'Search a symptom, doctor or department…' : 'Search symptoms, doctors, departments'
          }
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className={`h-full min-h-11 min-w-0 flex-1 bg-transparent text-ink placeholder:text-sand-500 focus:outline-none ${
            hero ? 'text-[0.9375rem]' : 'text-sm'
          }`}
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="tap shrink-0 rounded-full text-ink-soft transition-colors hover:text-brand-700"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onOpenTriage}
            className={`shrink-0 whitespace-nowrap rounded-full bg-brand-700 font-semibold text-white transition-colors hover:bg-brand-800 ${
              hero ? 'min-h-11 px-5 py-2.5 text-sm' : 'min-h-10 px-3.5 py-2 text-xs'
            }`}
          >
            Not sure? Ask
          </button>
        )}
      </div>

      {/* Live region announces result counts without stealing focus. */}
      <p aria-live="polite" className="sr-only-focusable">
        {showPanel ? `${results.length} results available.` : ''}
      </p>

      {/* --- Results ---------------------------------------------------- */}
      {showPanel && (
        <div
          className={`z-30 overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-float)] ${
            hero ? 'mt-3' : 'absolute left-0 right-0 top-[calc(100%+0.5rem)]'
          }`}
        >
          {results.length === 0 ? (
            <div className="px-5 py-6 text-center">
              <p className="text-sm font-medium text-ink">
                No match for “{query}”.
              </p>
              <p className="mt-1.5 text-sm text-ink-soft">
                Try a symptom in plain words, or call reception and we will guide you.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <a
                  href={`tel:${HOSPITAL_DATA.phones[0].tel}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  <Phone className="h-4 w-4" />
                  <span className="tabular-numbers">{HOSPITAL_DATA.phones[0].display}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onOpenTriage();
                  }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-brand-800"
                >
                  Describe symptoms instead
                </button>
              </div>
            </div>
          ) : (
            <ul id={listboxId} role="listbox" aria-label="Search results" className="max-h-[22rem] overflow-y-auto py-1.5">
              {results.map((r, i) => {
                const Icon = ICONS[r.icon] ?? Stethoscope;
                const active = i === activeIndex;
                return (
                  <li key={r.id} role="none">
                    <button
                      type="button"
                      id={`${listboxId}-opt-${i}`}
                      role="option"
                      aria-selected={active}
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => choose(r)}
                      className={`flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors ${
                        active ? 'bg-brand-50' : 'hover:bg-canvas'
                      }`}
                    >
                      <span
                        className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                          active ? 'bg-brand-700 text-white' : 'bg-brand-50 text-brand-700'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span className="text-[0.9375rem] font-semibold text-brand-800">{r.title}</span>
                          <span className="rounded-full bg-canvas px-2 py-0.5 text-[0.6875rem] font-medium text-ink-soft">
                            {kindLabel(r.kind)}
                          </span>
                        </span>
                        <span className="mt-0.5 block truncate text-sm text-ink-soft">{r.subtitle}</span>
                      </span>
                      {active && (
                        <CornerDownLeft className="mt-2 h-4 w-4 shrink-0 text-sand-600" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="flex items-start gap-2.5 border-t border-line bg-canvas px-4 py-3">
            <Ambulance className="mt-0.5 h-4 w-4 shrink-0 text-coral-600" aria-hidden="true" />
            <p className="text-xs leading-relaxed text-ink-soft">{SEARCH_EMERGENCY_HINT}</p>
          </div>
        </div>
      )}

      {/* --- Popular searches (before typing) ---------------------------- */}
      {!hasQuery && hero && (
        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-ink-soft">Common searches</span>
          {POPULAR_SEARCHES.slice(0, 5).map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setQuery(term);
                setOpen(true);
                inputRef.current?.focus();
              }}
              className="inline-flex min-h-11 items-center gap-1 rounded-full border border-line bg-white/70 px-3.5 py-2 text-xs font-medium text-brand-800 transition-colors hover:border-brand-300 hover:bg-white"
            >
              {term}
              <ArrowRight className="h-3 w-3 text-sand-500" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
