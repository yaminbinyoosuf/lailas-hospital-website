import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { Photo } from '../components/Photo';
import { contact, whatsappLink } from '../content/site';
import { useCopy, useLang } from '../i18n/LanguageProvider';

/**
 * Hero: asymmetric editorial split.
 *
 * Left column carries the headline, lead and the two actions — one primary
 * button and one quiet link. Right column is a single tall arch portrait with a
 * small card floating over its lower edge carrying the 24 hour casualty number.
 *
 * The headline stays a single string; only the final word is wrapped so the
 * italic Fraunces accent applies to it. The words themselves are untouched, and
 * Malayalam skips the accent because an oblique serif is not idiomatic there.
 */
export function Hero() {
  const copy = useCopy();
  const { lang } = useLang();
  const { open } = useBooking();

  const words = copy.hero.title.trim().split(' ');
  const last = words.pop() ?? '';
  const head = words.join(' ');

  return (
    <section aria-labelledby="hero-title" className="surface-grain relative overflow-hidden">
      <div
        className="surface-glow pointer-events-none absolute inset-x-0 top-0 h-[36rem]"
        aria-hidden="true"
      />

      <Container className="relative grid items-center gap-14 pt-12 pb-16 md:pt-16 lg:grid-cols-12 lg:gap-12 lg:pt-20 lg:pb-20">
        {/* Copy ---------------------------------------------------------- */}
        <div className="lg:col-span-6 xl:col-span-6">
          <p className="t-label">{copy.hero.tagline}</p>

          <h1 id="hero-title" className="t-display mt-5 text-teal-950">
            {head}{' '}
            {lang === 'ml' ? last : <em className="font-serif italic">{last}</em>}
          </h1>

          <p className="t-lead mt-7 max-w-[33rem]">{copy.hero.lead}</p>

          {/* One primary action, one quiet link. */}
          <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <Button size="lg" icon={<CalendarDays aria-hidden="true" />} onClick={() => open()}>
              {copy.actions.book}
            </Button>
            <a
              href={whatsappLink(copy.booking.whatsappGeneral)}
              target="_blank"
              rel="noopener noreferrer"
              className="link-quiet inline-flex min-h-11 items-center gap-2.5 text-teal-800 transition-colors hover:text-teal-900"
            >
              <MessageCircle className="size-[1.15rem] shrink-0" aria-hidden="true" />
              {copy.actions.chatWhatsapp}
            </a>
          </div>

          <p className="mt-8 flex max-w-[33rem] items-start gap-2.5 t-small">
            <Phone className="mt-[0.15rem] size-4 shrink-0 text-emergency" aria-hidden="true" />
            <span>
              {copy.hero.emergency(
                <a
                  key="tel"
                  href={`tel:${contact.primary.tel}`}
                  className="font-semibold whitespace-nowrap text-ink underline decoration-emergency/40 underline-offset-4 transition-colors hover:decoration-emergency"
                >
                  {contact.primary.display}
                </a>,
              )}
            </span>
          </p>
        </div>

        {/* Arch portrait ------------------------------------------------- */}
        <div className="hero-enter relative lg:col-span-6">
          <div className="relative mx-auto w-[80%] max-w-[27rem] sm:w-[64%] lg:mx-0 lg:ml-auto lg:w-[84%] lg:max-w-[29rem]">
            <Photo
              id="hero-main"
              shape="arch"
              aspect={3 / 4.3}
              priority
              sizes="(min-width: 1024px) 34vw, 80vw"
            />

            {/* Floating casualty card, tucked into the lower left of the arch. */}
            <div className="absolute bottom-7 -left-4 rounded-[var(--radius-sm)] border border-line bg-paper/95 px-5 py-4 backdrop-blur-sm sm:-left-10">
              <p className="t-label">24/7</p>
              <a
                href={`tel:${contact.primary.tel}`}
                className="mt-1.5 block t-number text-[1.5rem] text-teal-900 tabular-nums transition-colors hover:text-teal-700"
              >
                {contact.primary.display}
              </a>
              <p className="mt-1 t-meta">{copy.actions.callEmergency}</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Trust band: thin dividers, no coloured edges --------------------- */}
      <Container>
        <dl className="grid gap-y-10 pb-16 pt-2 sm:grid-cols-3 lg:pb-20">
          {copy.hero.trust.map((t, i) => (
            <div
              key={t.label}
              className={[
                'sm:px-8',
                i > 0 ? 'sm:border-l sm:border-line' : '',
                i === 0 ? 'sm:pl-0' : '',
                i === copy.hero.trust.length - 1 ? 'sm:pr-0' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <dt className="t-number text-[2.5rem] text-teal-800 md:text-[3rem]">{t.value}</dt>
              <dd className="mt-2.5 max-w-[16rem] t-small">{t.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
