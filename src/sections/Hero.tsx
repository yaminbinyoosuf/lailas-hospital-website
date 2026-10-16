import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
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
 * lead, actions), the photograph, and a trust band of three figures.
 *
 * The tagline sits inside the headline block as an italic accent rather than as
 * a second coloured line beneath it, which was competing with the headline for
 * attention. The trust band and the emergency note are driven by copy, so no
 * string is hardcoded here.
 */
export function Hero() {
  const copy = useCopy();
  const { open } = useBooking();
  const withPhoto = hasPhoto('hero-main');

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-ivory ambient-mesh">
      {/* Decorative ambient light orbs */}
      <div
        className="pointer-events-none absolute -left-20 top-1/4 size-96 rounded-full bg-teal-200/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-10 size-96 rounded-full bg-clay-200/25 blur-3xl"
        aria-hidden="true"
      />

      <Container className="grid items-center gap-12 pt-12 pb-14 md:pt-16 lg:grid-cols-12 lg:gap-14 lg:pt-20 lg:pb-16 relative z-10">
        {/* Claim --------------------------------------------------------- */}
        <div className="lg:col-span-7">
          <span className="inline-flex items-center rounded-full bg-teal-50/90 px-3 py-1 t-label text-teal-800 ring-1 ring-teal-600/15">
            {copy.hero.tagline}
          </span>

          <h1 id="hero-title" className="t-display mt-5 max-w-[36rem] text-teal-950 font-bold">
            {copy.hero.title}
          </h1>

          <p className="t-lead mt-6 max-w-[34rem]">{copy.hero.lead}</p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
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
          <p className="mt-8 flex max-w-[34rem] items-start gap-2.5 border-t border-line/60 pt-5 t-small">
            <Phone className="mt-[0.3rem] size-4 shrink-0 text-emergency" aria-hidden="true" />
            <span>
              {copy.hero.emergency(
                <a
                  key="tel"
                  href={`tel:${contact.primary.tel}`}
                  className="font-semibold tabular-nums text-ink underline decoration-emergency/40 underline-offset-4 transition-colors hover:decoration-emergency"
                >
                  {contact.primary.display}
                </a>,
              )}
            </span>
          </p>
        </div>

        {/* Until the hero photograph exists, this column shows the visiting
            information instead, so the first screen carries real facts rather
            than an empty panel. Large screens only. */}
        {withPhoto ? (
          <div className="lg:col-span-5">
            <div className="p-2.5 sm:p-3 glass-card rounded-[calc(var(--radius-lg)+0.5rem)] shadow-[var(--shadow-lift)]">
              <Photo
                id="hero-main"
                shape="soft"
                priority
                aspect={4 / 5}
                sizes="(min-width: 1024px) 38vw, 90vw"
                className="mx-auto max-w-[32rem] rounded-[var(--radius-lg)]"
              />
            </div>
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
            <ButtonAnchor href={address.directionsUrl} variant="secondary" size="md" className="mt-7">
              {copy.actions.directions}
            </ButtonAnchor>
          </aside>
        )}
      </Container>

      {/* Floating Glass Stat Tiles ---------------------------------------- */}
      <div className="border-t border-line/50 bg-paper/60 backdrop-blur-md">
        <Container className="py-8 md:py-10">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
            {copy.hero.trust.map((t) => (
              <div
                key={t.label}
                className="glass-card glass-card-hover rounded-[var(--radius-md)] p-6 md:p-8"
              >
                <dd className="t-number text-[2.25rem] text-teal-900 tabular-nums md:text-[2.75rem] font-bold">
                  {t.value}
                </dd>
                <dt className="mt-2 max-w-[17rem] t-small text-ink-soft">{t.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
