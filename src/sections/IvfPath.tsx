import { ArrowRight, CalendarDays, MessageCircle } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor, ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { whatsappLink } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';

/** The 4 step path as a timeline. Horizontal on desktop, vertical on phones. */
/**
 * The four step fertility journey.
 *
 * Numbers in Fraunces rather than icon tiles: a journey is sequential, and
 * typographic numerals carry that better than four interchangeable glyphs. The
 * connector is a single hairline that runs behind the markers.
 */
export function IvfTimeline({ onDark = true }: { onDark?: boolean }) {
  const copy = useCopy();

  const line = onDark ? 'bg-teal-700' : 'bg-line';
  const marker = onDark
    ? 'bg-teal-900 text-clay-200 ring-1 ring-teal-700'
    : 'bg-paper text-clay-600 ring-1 ring-line';
  const stepWord = onDark ? 'text-teal-300' : 'text-clay-600';
  const title = onDark ? 'text-ivory' : 'text-teal-950';
  const body = onDark ? 'text-teal-100' : 'text-ink-soft';

  return (
    <ol className="relative grid gap-12 md:grid-cols-4 md:gap-8">
      {/* Hairline connector: vertical on phones, horizontal from md up. */}
      <span
        aria-hidden="true"
        className={`absolute left-[1.4rem] top-4 bottom-4 w-px md:left-4 md:right-4 md:top-[1.4rem] md:bottom-auto md:h-px md:w-auto ${line}`}
      />

      {copy.ivf.steps.map((s, i) => (
        <Reveal
          as="li"
          key={s.title}
          delay={i * 0.1}
          className="relative grid grid-cols-[2.8rem_1fr] gap-5 md:block"
        >
          <span
            className={`t-number relative grid size-11 place-items-center rounded-full text-[1.0625rem] ${marker}`}
          >
            {i + 1}
          </span>

          <div className="md:mt-7">
            <p className={`t-label ${stepWord}`}>
              {copy.ivf.stepWord} {i + 1}
            </p>
            <h3 className={`t-h3 mt-2 ${title}`}>{s.title}</h3>
            <p className={`mt-2.5 t-small ${body}`}>{s.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function IvfPath() {
  const copy = useCopy();
  const { open } = useBooking();

  return (
    <Section tone="teal" labelledBy="ivf-title" space="loose">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-7">
          <p className="t-label text-teal-200">{copy.ivf.label}</p>
          <h2 id="ivf-title" className="t-h2 mt-5 text-ivory">
            {copy.ivf.title}
          </h2>
          <p className="t-lead mt-6 max-w-[36rem] !text-teal-100">{copy.ivf.lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonAnchor
              href={whatsappLink(copy.ivf.whatsappMessage)}
              variant="light"
              size="lg"
              icon={<MessageCircle aria-hidden="true" />}
            >
              {copy.ivf.whatsapp}
            </ButtonAnchor>
            <Button
              variant="lightOutline"
              size="lg"
              icon={<CalendarDays aria-hidden="true" />}
              onClick={() => open({ kind: 'service', id: 'ivf' })}
            >
              {copy.ivf.book}
            </Button>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={0.1}>
          <Photo id="ivf-consultation" shape="cradle" onDark sizes="(min-width: 1024px) 32vw, 90vw" className="mx-auto max-w-[26rem]" />
        </Reveal>
      </Container>

      <Container className="mt-20 md:mt-24">
        <IvfTimeline />
        <Reveal className="mt-16 grid gap-8 border-t border-teal-700 pt-10 md:grid-cols-12">
          <p className="t-h3 text-ivory italic md:col-span-8">
            {copy.ivf.promise}
          </p>
          <div className="md:col-span-4 md:text-right">
            <ButtonLink
              to="/ivf"
              variant="quiet"
              className="!text-ivory !decoration-teal-500 hover:!decoration-ivory"
              iconAfter={<ArrowRight aria-hidden="true" />}
            >
              {copy.ivf.more}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
