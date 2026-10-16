import { ArrowRight, CalendarDays, MessageCircle } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor, ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
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

  const marker = onDark
    ? 'bg-teal-900 text-clay-200 ring-1 ring-teal-700'
    : 'bg-paper text-clay-600 ring-1 ring-line';
  const stepWord = onDark ? 'text-teal-300' : 'text-clay-600';
  const title = onDark ? 'text-ivory' : 'text-teal-950';
  const body = onDark ? 'text-teal-100' : 'text-ink-soft';

  const cardClass = onDark
    ? 'glass-dark rounded-[var(--radius-md)] p-6 relative border border-white/10 shadow-sm'
    : 'glass-card rounded-[var(--radius-md)] p-6 relative border border-white/80 shadow-sm';

  return (
    <ol className="relative grid gap-6 md:grid-cols-4 md:gap-6">
      {copy.ivf.steps.map((s, i) => (
        <Reveal
          as="li"
          key={s.title}
          delay={i * 0.08}
          className={cardClass}
        >
          <div className="flex items-center gap-3">
            <span
              className={`t-number relative grid size-10 place-items-center rounded-full text-[1.0625rem] font-bold ${marker}`}
            >
              {i + 1}
            </span>
            <p className={`t-label ${stepWord}`}>
              {copy.ivf.stepWord} {i + 1}
            </p>
          </div>

          <div className="mt-4">
            <h3 className={`t-h3 ${title} font-semibold`}>{s.title}</h3>
            <p className={`mt-2 t-small ${body} leading-relaxed`}>{s.body}</p>
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
        <Reveal className="lg:col-span-8">
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
        <Reveal className="ivf-mark hidden lg:col-span-4 lg:grid" delay={0.1} aria-hidden="true">
          <span>01</span>
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
