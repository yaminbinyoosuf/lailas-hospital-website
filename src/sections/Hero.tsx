import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { CareForm } from '../components/CareForm';
import { address, contact, hours, whatsappLink } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { formatDays, formatHours } from '../lib/format';

/**
 * Hero.
 *
 * Three zones, in descending order of weight: the claim (eyebrow, headline,
 * lead, actions), an abstract brand composition, and a trust band of three figures.
 *
 * The tagline sits inside the headline block as an italic accent rather than as
 * a second coloured line beneath it, which was competing with the headline for
 * attention. The trust band and the emergency note are driven by copy, so no
 * string is hardcoded here.
 */
export function Hero() {
  const copy = useCopy();
  const { open } = useBooking();
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

      <Container className="relative z-10 grid items-center gap-9 pt-10 pb-14 md:grid-cols-2 md:gap-8 md:pt-14 lg:grid-cols-12 lg:gap-14 lg:pt-20 lg:pb-16">
        {/* Claim --------------------------------------------------------- */}
        <div className="hero-enter lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-paper/80 px-3.5 py-2 t-label text-teal-800 ring-1 ring-teal-600/15 shadow-[0_8px_24px_rgb(11_36_31/0.06)] backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-clay-500" aria-hidden="true" />
            {copy.hero.tagline}
          </span>

          <h1 id="hero-title" className="t-display mt-5 max-w-[39rem] text-teal-950 font-bold">
            {copy.hero.title}
          </h1>

          <p className="t-lead mt-6 max-w-[35rem]">{copy.hero.lead}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
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

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 t-meta text-ink-soft">
            <span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-teal-500" aria-hidden="true" />30+ years of care</span>
            <span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-clay-400" aria-hidden="true" />70,000+ families</span>
          </div>

          {/* Emergency line: present but quiet */}
          <p className="mt-7 flex max-w-[34rem] items-start gap-2.5 border-t border-line/60 pt-5 t-small">
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

        <div className="lg:col-span-5">
          <div className="hero-composition relative mx-auto min-h-[16rem] max-w-[32rem] overflow-hidden rounded-[var(--radius-lg)] bg-teal-950 p-2 shadow-[var(--shadow-lift)] md:min-h-[31rem]">
            <CareForm />
            <aside
              aria-labelledby="hero-visit-title"
              className="absolute inset-x-4 bottom-4 rounded-[var(--radius-md)] bg-paper/95 p-5 shadow-[0_12px_32px_rgb(11_36_31/0.26)] backdrop-blur-md md:inset-x-5 md:bottom-5"
            >
            <h2 id="hero-visit-title" className="t-h4 text-teal-950">
              {copy.visit.hoursTitle}
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
              <div>
                <dt className="t-small text-ink-soft">{copy.visit.hours.allDay}</dt>
                <dd className="mt-0.5 font-semibold text-ink">{copy.time.open24EveryDay}</dd>
              </div>
              <div>
                <dt className="t-small text-ink-soft">{copy.visit.hours.opd}</dt>
                <dd className="mt-0.5 font-semibold text-ink">
                  {formatDays(hours.opd.days, copy)}, {formatHours(hours.opd, copy)}
                </dd>
              </div>
              <div className="col-span-2 border-t border-line pt-4">
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
            <ButtonAnchor href={address.directionsUrl} variant="quiet" size="md" className="mt-4">
              {copy.actions.directions}
            </ButtonAnchor>
            </aside>
          </div>
        </div>
      </Container>

      {/* Floating Glass Stat Tiles ---------------------------------------- */}
      <div className="border-t border-line/50 bg-paper/60 backdrop-blur-md">
        <Container className="py-8 md:py-10">
          <dl className="grid grid-cols-1 divide-y divide-line/70 border-y border-line/70 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {copy.hero.trust.map((t) => (
              <div
                key={t.label}
                className="px-1 py-5 sm:px-7 md:px-9 md:py-7"
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
