import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { Photo } from '../components/Photo';
import { contact, whatsappLink } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';

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

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-ivory">
      <Container className="grid items-center gap-12 pt-12 pb-14 md:pt-16 lg:grid-cols-12 lg:gap-14 lg:pt-20 lg:pb-16">
        {/* Claim --------------------------------------------------------- */}
        <div className="lg:col-span-7">
          <p className="t-label">{copy.hero.tagline}</p>

          <h1 id="hero-title" className="t-display mt-5 max-w-[36rem] text-teal-950">
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

          {/* Emergency line: present but quiet, so it never competes with the
              primary action. */}
          <p className="mt-8 flex max-w-[34rem] items-start gap-2.5 border-t border-line pt-5 t-small">
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

        {/* Photograph ---------------------------------------------------- */}
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
      </Container>

      {/* Trust band ------------------------------------------------------ */}
      <div className="border-t border-line bg-paper">
        <Container>
          <dl className="grid grid-cols-1 gap-y-8 py-10 sm:grid-cols-3">
            {copy.hero.trust.map((t, i) => (
              <div
                key={t.label}
                className={[
                  'sm:px-10',
                  i > 0 ? 'sm:border-l sm:border-line' : '',
                  i === 0 ? 'sm:pl-0' : '',
                  i === copy.hero.trust.length - 1 ? 'sm:pr-0' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <dd className="t-number text-[2.25rem] text-teal-900 tabular-nums md:text-[2.75rem]">
                  {t.value}
                </dd>
                <dt className="mt-2.5 max-w-[17rem] t-small">{t.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
