import { CalendarDays, Heart, MessageCircle, ShieldCheck, Stethoscope, UsersRound } from 'lucide-react';
import { useState } from 'react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { contact, services, whatsappLink, type ServiceId } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { getPhoto } from '../content/images';

const trustIcons = [Heart, ShieldCheck, UsersRound, Stethoscope] as const;
const trustIconFor = (i: number) => trustIcons[i % trustIcons.length];

/** Only services that can actually be booked online appear in the selector. */
const bookableServices = services.filter((s) => s.bookable);

/** Hero recreation with the existing booking sheet preserved for every action. */
export function Hero() {
  const copy = useCopy();
  const { open } = useBooking();
  const [service, setService] = useState<ServiceId | ''>('');
  const hero = getPhoto('hero-editorial');

  /** Opens the sheet already on the chosen department, or on the first step
      when nothing was chosen. */
  const startBooking = () =>
    open(service ? { kind: 'service', id: service } : undefined);

  return (
    <section aria-labelledby="hero-title" className="reference-hero">
      <Container className="reference-hero__content">
        <div className="reference-hero__copy">
          <p className="reference-hero__eyebrow"><span /> {copy.hero.eyebrow}</p>
          <h1 id="hero-title" className="reference-hero__title">
            {copy.hero.title.before}
            <em>{copy.hero.title.accent}</em>
            {copy.hero.title.after}
          </h1>
          <p className="reference-hero__lead">{copy.hero.lead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" icon={<CalendarDays aria-hidden="true" />} onClick={() => open()}>{copy.actions.book}</Button>
            <ButtonAnchor href={whatsappLink(copy.booking.whatsappGeneral)} variant="secondary" size="lg" icon={<MessageCircle aria-hidden="true" />}>{copy.actions.chatWhatsapp}</ButtonAnchor>
          </div>
          <p className="mt-5 text-sm font-semibold text-teal-900">
            {copy.hero.emergency(
              <a key="tel" href={`tel:${contact.primary.tel}`} className="underline underline-offset-4 tabular-nums">
                {contact.primary.display}
              </a>,
            )}
          </p>
        </div>

        {hero && (
          <figure className="reference-hero__figure">
            <picture>
              <source type="image/avif" srcSet={hero.avifSrcSet} sizes="(min-width: 1024px) 30vw, 100vw" />
              <source type="image/webp" srcSet={hero.webpSrcSet} sizes="(min-width: 1024px) 30vw, 100vw" />
              <img
                src={hero.fallback}
                alt="A mother holding her sleeping newborn against her chest in soft daylight"
                className="reference-hero__image"
                width={hero.width}
                height={hero.height}
                fetchPriority="high"
                decoding="async"
                style={{ backgroundImage: `url(${hero.blur})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
            </picture>
          </figure>
        )}
      </Container>

      {/* The booking controls sit on the bottom edge as a row, not over the
          photograph as a panel. */}
      <Container className="reference-hero__bookingrow">
        <aside className="reference-booking" aria-labelledby="hero-booking-title">
          <h2 id="hero-booking-title">{copy.hero.panel.title}</h2>

          <label className="reference-booking__label" htmlFor="hero-service">
            {copy.hero.panel.service}
          </label>
          <select
            id="hero-service"
            className="reference-booking__select"
            value={service}
            onChange={(e) => setService(e.target.value as ServiceId | '')}
          >
            <option value="">{copy.hero.panel.anyService}</option>
            {bookableServices.map((s) => (
              <option key={s.id} value={s.id}>
                {copy.services.items[s.id].name}
              </option>
            ))}
          </select>

          <Button className="mt-4 w-full" size="lg" onClick={startBooking}>
            {copy.hero.panel.continue}
          </Button>

          <ButtonAnchor
            href={whatsappLink(copy.booking.whatsappGeneral)}
            variant="secondary"
            className="mt-3 w-full"
            icon={<MessageCircle aria-hidden="true" />}
          >
            {copy.hero.panel.whatsapp}
          </ButtonAnchor>
        </aside>
      </Container>

      {/* F. Statistics carry the display size; the label sits above in small caps. */}
      <Container className="reference-hero__trust">
        <dl>
          {copy.hero.trust.map((item, index) => {
            const Icon = trustIconFor(index);
            return (
              <div key={item.value}>
                <dt>
                  <Icon aria-hidden="true" />
                  <span className="t-label uppercase">{item.label}</span>
                </dt>
                <dd className="t-h2 tabular-nums">{item.value}</dd>
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
