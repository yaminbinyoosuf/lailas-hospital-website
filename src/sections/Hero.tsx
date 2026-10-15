import { CalendarDays, Clock, MessageCircle, Shield } from 'lucide-react';
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
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-ivory">
      <Container className="grid items-center gap-10 pt-10 pb-14 md:pt-14 lg:grid-cols-12 lg:gap-14 lg:pt-16 lg:pb-18">
        {/* Left Column: Clear, Focused Value Proposition */}
        <div className="lg:col-span-7">
          <p className="t-label text-teal-800">
            Chemmad, Malappuram · Established 1994
          </p>

          <h1 id="hero-title" className="t-display mt-3 text-teal-950 max-w-[38rem]">
            {copy.hero.title}
          </h1>

          <p className="mt-2 text-base font-medium text-clay-700 tracking-wide sm:text-lg">
            {copy.hero.tagline}
          </p>

          <p className="t-lead mt-5 max-w-[35rem] text-ink-soft leading-relaxed">
            {copy.hero.lead}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" icon={<CalendarDays aria-hidden="true" />} onClick={() => open()}>
              {copy.actions.book}
            </Button>
            <ButtonAnchor
              href={whatsappLink(copy.booking.whatsappGeneral)}
              variant="secondary"
              size="lg"
              icon={<MessageCircle className="text-emerald-700" aria-hidden="true" />}
            >
              {copy.actions.chatWhatsapp}
            </ButtonAnchor>
          </div>

          {/* Quiet, verified 24/7 Emergency Helpline */}
          <div className="mt-8 flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-line/70 pt-4 text-xs text-ink-soft">
            <span className="font-semibold text-teal-950">24/7 Casualty & Labour Room:</span>
            <a
              href={`tel:${contact.primary.tel}`}
              className="font-bold text-emergency hover:underline tabular-nums"
            >
              {contact.primary.display}
            </a>
            <span className="text-ink-muted">· On-duty medical officer & emergency pharmacy open at all hours</span>
          </div>
        </div>

        {/* Right Column: Pristine Authentic Hospital Photography */}
        <div className="relative lg:col-span-5">
          <div className="relative overflow-hidden rounded-xl shadow-soft ring-1 ring-line/80">
            <Photo id="hero-main" shape="soft" priority sizes="(min-width: 1024px) 40vw, 90vw" />
          </div>
        </div>
      </Container>

      {/* Structured Editorial Hospital Information & Stats Band */}
      <div className="border-t border-line bg-paper">
        <Container className="py-8 lg:py-10">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="border-l-2 border-clay-400 pl-4">
              <dd className="t-number text-2xl font-bold text-teal-950 sm:text-3xl tabular-nums">70,000+</dd>
              <dt className="text-xs text-ink-muted mt-1 font-medium">Safe deliveries in Chemmad since 1994</dt>
            </div>

            <div className="border-l-2 border-teal-600 pl-4">
              <dd className="t-number text-2xl font-bold text-teal-950 sm:text-3xl tabular-nums">30+ Years</dd>
              <dt className="text-xs text-ink-muted mt-1 font-medium">Continuous obstetric and family care</dt>
            </div>

            <div className="border-l-2 border-teal-700 pl-4">
              <dd className="flex items-center gap-1.5 text-sm font-semibold text-teal-950 sm:text-base">
                <Clock className="size-4 text-teal-700 shrink-0" aria-hidden="true" />
                <span>Specialist OPD</span>
              </dd>
              <dt className="text-xs text-ink-muted mt-1 font-medium">Mon to Sat: 9:00 AM to 1:00 PM & 4:00 PM to 7:00 PM</dt>
            </div>

            <div className="border-l-2 border-emergency pl-4">
              <dd className="flex items-center gap-1.5 text-sm font-semibold text-teal-950 sm:text-base">
                <Shield className="size-4 text-emerald-700 shrink-0" aria-hidden="true" />
                <span>24/7 Casualty</span>
              </dd>
              <dt className="text-xs text-ink-muted mt-1 font-medium">Labour room, casualty & diagnostics open continuously</dt>
            </div>
          </dl>
        </Container>
      </div>
    </section>
  );
}
