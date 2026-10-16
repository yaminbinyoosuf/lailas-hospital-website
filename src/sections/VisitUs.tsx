import { Accessibility, Car, Navigation, Phone } from 'lucide-react';
import { ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { address, contact, flags, hours, routes } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { formatDays, formatHours } from '../lib/format';

export function VisitUs({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const copy = useCopy();
  const Heading = headingLevel === 1 ? 'h1' : 'h2';
  const accessIcons = [Car, Accessibility];

  return (
    <Section tone="sand" labelledBy="visit-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Heading id="visit-title" className="t-h2 text-teal-950">
            {copy.visit.title}
          </Heading>
          <p className="t-lead mt-5">{copy.visit.lead}</p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <h3 className="t-h4 text-clay-700">{copy.visit.addressTitle}</h3>
              <address className="mt-2 not-italic">
                {address.postalLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
                {flags.showMapPin && (
                  <span className="mt-1 block t-small text-ink-muted">
                    {copy.visit.plusCode}: {address.plusCode}
                  </span>
                )}
              </address>
            </div>
            <div>
              <h3 className="t-h4 text-clay-700">{copy.visit.hoursTitle}</h3>
              <dl className="mt-2 space-y-3">
                <div>
                  <dt className="text-ink-soft">{copy.visit.hours.allDay}</dt>
                  <dd className="font-semibold">{copy.time.open24EveryDay}</dd>
                </div>
                <div>
                  <dt className="text-ink-soft">{copy.visit.hours.opd}</dt>
                  <dd className="font-semibold">
                    {formatDays(hours.opd.days, copy)}, {formatHours(hours.opd, copy)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <h3 className="mt-8 t-h4 text-clay-700">{copy.visit.accessTitle}</h3>
          <ul className="mt-2 space-y-2">
            {copy.visit.access.map((a, i) => {
              const Icon = accessIcons[i] ?? Car;
              return (
                <li key={a} className="flex gap-3">
                  <Icon className="mt-1 size-5 shrink-0 text-teal-700" aria-hidden="true" />
                  <span>{a}</span>
                </li>
              );
            })}
          </ul>

          {flags.showTravelTimes && (
            <>
              <h3 className="mt-8 t-h4 text-clay-700">{copy.visit.routesTitle}</h3>
              <ul className="mt-2 space-y-1">
                {routes.map((r) => (
                  <li key={r.id}>
                    {copy.visit.routes[r.id]}: {copy.visit.routeDistance(r.km, r.minutes)}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonAnchor href={`tel:${contact.primary.tel}`} icon={<Phone aria-hidden="true" />}>
              {copy.actions.call}
            </ButtonAnchor>
            <ButtonAnchor href={address.directionsUrl} variant="secondary" icon={<Navigation aria-hidden="true" />}>
              {copy.actions.directions}
            </ButtonAnchor>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.08}>
          <div className="glass-card p-2 sm:p-2.5 rounded-[var(--radius-lg)] shadow-[var(--shadow-lift)] h-full min-h-[22rem] lg:min-h-[36rem]">
            <div className="relative h-full min-h-[20rem] overflow-hidden rounded-[var(--radius-md)] ring-1 ring-black/5 lg:min-h-[34rem]">
              <iframe
                title={copy.visit.mapTitle}
                src={address.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[20%]"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
