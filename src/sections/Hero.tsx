import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { Photo } from '../components/Photo';
import { contact, whatsappLink } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';

export function Hero() {
  const copy = useCopy();
  const { open } = useBooking();

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <Container className="grid items-center gap-12 pt-10 pb-14 md:pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-20 xl:gap-12">
        <div className="lg:col-span-6">
          <p className="font-serif t-h3 text-clay-600 italic">{copy.hero.tagline}</p>
          <h1 id="hero-title" className="t-display mt-4 text-teal-950">
            {copy.hero.title}
          </h1>
          <p className="t-lead mt-6 max-w-[34rem]">{copy.hero.lead}</p>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Button size="lg" icon={<CalendarDays aria-hidden="true" />} onClick={() => open()}>
              {copy.actions.book}
            </Button>
            <ButtonAnchor
              href={whatsappLink(copy.booking.whatsappGeneral)}
              variant="secondary"
              size="lg"
              icon={<MessageCircle aria-hidden="true" />}
            >
              {copy.actions.chatWhatsapp}
            </ButtonAnchor>
          </div>
          <p className="mt-6 flex max-w-[34rem] items-start gap-2.5 t-body text-ink-soft">
            <Phone className="mt-1 size-4 shrink-0 text-emergency" aria-hidden="true" />
            <span>
              {copy.hero.emergency(
                <a
                  key="tel"
                  href={`tel:${contact.primary.tel}`}
                  className="font-semibold whitespace-nowrap text-ink underline decoration-emergency/40 underline-offset-4 hover:decoration-emergency"
                >
                  {contact.primary.display}
                </a>,
              )}
            </span>
          </p>
        </div>

        <div className="relative lg:col-span-6">
          <div className="hero-enter relative mx-auto w-[84%] max-w-[38rem] sm:w-[68%] lg:mx-0 lg:ml-auto lg:w-full lg:max-w-none">
            <Photo id="hero-main" shape="arch" priority sizes="(min-width: 1024px) 48vw, 84vw" />
          </div>
          <div className="hero-enter absolute bottom-[-6%] left-0 w-[42%] max-w-[15rem] rounded-full border-[6px] border-ivory [animation-delay:0.25s] sm:w-[34%] lg:bottom-[10%] lg:w-[34%] lg:max-w-[17rem]">
            <Photo id="hero-secondary" shape="circle" sizes="(min-width: 1024px) 19vw, 15rem" />
          </div>
        </div>
      </Container>

      <Container>
        <dl className="grid gap-x-10 gap-y-5 border-t border-line pt-8 pb-16 sm:grid-cols-3 lg:pb-20">
          {copy.hero.trust.map((t) => (
            <div key={t.label} className="flex items-baseline gap-4 sm:flex-col sm:gap-1">
              <dt className="sr-only">{t.label}</dt>
              <dd className="t-number shrink-0 text-[2.25rem] text-teal-800 md:text-[2.75rem]">{t.value}</dd>
              <dd className="text-ink-soft">{t.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
