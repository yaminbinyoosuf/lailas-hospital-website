import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { Container } from '../components/Container';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { ServiceCard } from '../components/ServiceCard';
import { serviceGroups, services, type ServiceGroup } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { cn } from '../lib/format';

/** Services grouped into four tabs. Each tab shows photo cards for its group. */
export function Services() {
  const copy = useCopy();
  const [active, setActive] = useState<ServiceGroup>('women');
  const base = useId();
  const tabsRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const i = serviceGroups.indexOf(active);
    let next = i;
    if (e.key === 'ArrowRight') next = (i + 1) % serviceGroups.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + serviceGroups.length) % serviceGroups.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = serviceGroups.length - 1;
    else return;
    e.preventDefault();
    setActive(serviceGroups[next]);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <Section id="services" labelledBy="services-title" className="border-t border-line">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="services-title" className="t-h2 text-teal-950 lg:col-span-7">
            {copy.services.title}
          </h2>
          <p className="t-lead lg:col-span-5">{copy.services.lead}</p>
        </Reveal>

        <div
          ref={tabsRef}
          role="tablist"
          aria-label={copy.services.groupsLabel}
          className="scroll-row -mx-5 mt-12 auto-cols-max gap-2 px-5 sm:mx-0 sm:flex sm:flex-wrap sm:px-0"
        >
          {serviceGroups.map((g) => {
            const selected = g === active;
            return (
              <button
                key={g}
                id={`${base}-tab-${g}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${base}-panel-${g}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(g)}
                onKeyDown={onKeyDown}
                className={cn(
                  'min-h-12 rounded-full px-5 text-[1.0625rem] font-semibold whitespace-nowrap transition-colors',
                  selected
                    ? g === 'emergency'
                      ? 'bg-emergency text-white'
                      : 'bg-teal-800 text-ivory'
                    : 'bg-sand text-ink-soft hover:bg-sand-deep hover:text-ink',
                )}
              >
                {copy.services.groups[g].name}
              </button>
            );
          })}
        </div>

        {serviceGroups.map((g) => {
          const items = services.filter((s) => s.group === g);
          const single = items.length === 1;
          return (
            <div
              key={g}
              id={`${base}-panel-${g}`}
              role="tabpanel"
              aria-labelledby={`${base}-tab-${g}`}
              hidden={g !== active}
              className="mt-8"
            >
              <p className="max-w-2xl font-serif text-[1.375rem] leading-snug text-ink md:text-[1.625rem]">
                {copy.services.groups[g].intro}
              </p>
              {single ? (
                <div className="mt-8">
                  <ServiceCard service={items[0]} wide />
                </div>
              ) : (
                <ul
                  className={cn(
                    'scroll-row -mx-5 mt-8 auto-cols-[82%] gap-4 px-5 pb-2 xs:auto-cols-[70%]',
                    'sm:mx-0 sm:grid sm:grid-flow-row sm:auto-cols-auto sm:gap-6 sm:overflow-visible sm:px-0',
                    items.length === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2',
                  )}
                >
                  {items.map((s) => (
                    <li key={s.id} className="h-full">
                      <ServiceCard service={s} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </Container>
    </Section>
  );
}
