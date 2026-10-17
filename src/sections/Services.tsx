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
    <Section id="services" labelledBy="services-title" tone="teal" space="tight" className="reference-services">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
          <p className="t-label text-teal-200">Our services</p>
          <h2 id="services-title" className="t-h2 mt-3 text-ivory">
            {copy.services.title}
          </h2>
          </div>
          <p className="t-lead !text-teal-100 lg:col-span-5">{copy.services.lead}</p>
        </Reveal>

        <div className="mt-12 overflow-x-auto pb-2 scrollbar-none">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label={copy.services.groupsLabel}
            className="inline-flex gap-1 border-b border-teal-700"
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
                    'min-h-11 border-b-2 border-transparent px-4 t-small font-semibold whitespace-nowrap transition-colors duration-300',
                    selected
                      ? g === 'emergency'
                        ? 'border-emergency text-clay-200'
                        : 'border-teal-200 text-ivory'
                      : 'text-teal-200 hover:border-teal-300 hover:text-ivory',
                  )}
                >
                  {copy.services.groups[g].name}
                </button>
              );
            })}
          </div>
        </div>

        {serviceGroups.map((g) => {
          const items = services.filter((s) => s.group === g);
          return (
            <div
              key={g}
              id={`${base}-panel-${g}`}
              role="tabpanel"
              aria-labelledby={`${base}-tab-${g}`}
              hidden={g !== active}
              className="mt-8"
            >
              <p className="max-w-2xl t-h3 text-ivory">
                {copy.services.groups[g].intro}
              </p>
              <ul
                className={cn(
                  'scroll-row -mx-5 mt-8 auto-cols-[84%] gap-4 px-5 pb-2 xs:auto-cols-[72%]',
                  'sm:mx-0 sm:grid sm:grid-flow-row sm:auto-cols-auto sm:gap-5 sm:overflow-visible sm:px-0',
                  items.length === 3 ? 'lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3',
                )}
              >
                {items.map((s) => (
                  <li key={s.id} className="h-full"><ServiceCard service={s} /></li>
                ))}
              </ul>
            </div>
          );
        })}
      </Container>
    </Section>
  );
}
