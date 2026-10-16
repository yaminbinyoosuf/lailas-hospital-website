import { CalendarDays, MessageCircle, Navigation, Phone } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { Photo } from '../components/Photo';
import { hasPhoto } from '../content/images';
import { address, contact, hours, whatsappLink } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { formatDays, formatHours } from '../lib/format';

/**
 * Hero.
 *
 * Three zones, in descending order of weight: the claim (eyebrow, headline,
 * lead, actions), the photograph, and a band of three figures.
 *
 * Until the hero photograph exists, the right-hand column shows the visiting
 * information instead (hours and address, the same facts as the Visit
 * section), on large screens only. On phones the claim is followed directly by
 * the figures, so the first screen is not spent on an empty panel.
 */
export function Hero() {
  const copy = useCopy();
  const { open } = useBooking();
  const withPhoto = hasPhoto('hero-main');

  return (
    <section aria-labelledby="hero-title" className="bg-ivory">
      <Container className="grid items-center gap-12 pt-10 pb-12 md:pt-16 md:pb-14 lg:grid-cols-12 lg:gap-14 lg:pt-20 lg:pb-16">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 t-label text-teal-800">
            {copy.hero.tagline}
          </span>

          <h1 id="hero-title" className="t-display mt-5 max-w-[36rem] text-teal-950">
            {copy.hero.title}
          </h1>

          <p className="t-lead mt-6 max-w-[34rem] text-ink-soft">{copy.hero.lead}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Button size="lg" icon={<CalendarDays aria-hidden="true" />} onClick={() => open()}>
              {copy.actions.book}
            </Button>
            <ButtonAnchor
              href={whatsappLink(copy.booking.whatsappGeneral)}
              variant="quiet"
              size="lg"
              icon={<MessageCircle aria-hidden="true" />}
            >
              {copy.actions.chatWhatsapp}
            </ButtonAnchor>
          </div>

          {/* Emergency line: present but quiet */}
          <p className="mt-8 flex max-w-[34rem] items-start gap-2.5 border-t border-line pt-5 t-small text-ink-soft">
            <Phone className="mt-[0.3rem] size-4 shrink-0 text-emergency" aria-hidden="true" />
            <span>
              {copy.hero.emergency(
                <a
                  key="tel"
                  href={`tel:${contact.primary.tel}`}
                  className="font-semibold tabular-nums text-ink underline decoration-emergency/40 underline-offset-4 transition-colors duration-150 hover:decoration-emergency"
                >
                  {contact.primary.display}
                </a>,
              )}
            </span>
          </p>
        </div>

        {withPhoto ? (
          <div className="lg:col-span-5">
            <Photo
              id="hero-main"
              shape="soft"
              priority
              aspect={4 / 5}
              sizes="(min-width: 1024px) 38vw, 90vw"
              className="mx-auto max-w-[32rem]"
            />
          </div>
        ) : (
          <aside
            aria-labelledby="hero-visit-title"
            className="hidden rounded-[var(--radius-lg)] border border-line bg-paper p-8 lg:col-span-5 lg:block xl:p-10"
          >
            <h2 id="hero-visit-title" className="t-h4 text-teal-950">
              {copy.visit.hoursTitle}
            </h2>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="t-small text-ink-soft">{copy.visit.hours.allDay}</dt>
                <dd className="mt-0.5 font-semibold text-ink">{copy.time.open24EveryDay}</dd>
              </div>
              <div className="border-t border-line pt-5">
                <dt className="t-small text-ink-soft">{copy.visit.hours.opd}</dt>
                <dd className="mt-0.5 font-semibold text-ink">
                  {formatDays(hours.opd.days, copy)}, {formatHours(hours.opd, copy)}
                </dd>
              </div>
              <div className="border-t border-line pt-5">
                <dt className="t-small text-ink-soft">{copy.visit.addressTitle}</dt>
                <dd className="mt-0.5 text-ink">
                  {address.postalLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            <ButtonAnchor
              href={address.directionsUrl}
              variant="secondary"
              className="mt-7"
              icon={<Navigation aria-hidden="true" />}
            >
              {copy.actions.directions}
            </ButtonAnchor>
          </aside>
        )}
      </Container>

      {/* Three figures. On phones each is one compact row (figure, then
          label); from sm they sit side by side. <dt> comes first in the DOM,
          and order-first puts the figure in front visually. */}
      <div className="border-t border-line bg-paper">
        <Container className="py-6 md:py-8">
          <dl className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {copy.hero.trust.map((t) => (
              <div
                key={t.label}
                className="grid grid-cols-[minmax(6.5rem,auto)_1fr] items-baseline gap-x-4 py-3 first:pt-0 last:pb-0 sm:grid-cols-1 sm:px-6 sm:py-0 sm:first:pl-0 sm:last:pr-0"
              >
                <dt className="t-small text-ink-soft sm:mt-2">{t.label}</dt>
                <dd className="order-first t-number text-[1.75rem] text-teal-900 md:text-[2.5rem]">{t.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
