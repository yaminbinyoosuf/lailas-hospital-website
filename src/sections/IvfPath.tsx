import { ArrowRight, CalendarDays, MessageCircle } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor, ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import { IvfIllustration } from '../components/IvfIllustration';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { whatsappLink } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';

/** The 4 step path as a timeline. Horizontal on desktop, vertical on phones. */
export function IvfTimeline({ onDark = true }: { onDark?: boolean }) {
  const copy = useCopy();
  const line = onDark ? 'before:bg-teal-700' : 'before:bg-line';
  return (
    <ol
      className={`relative grid gap-10 before:absolute before:top-8 before:bottom-8 before:left-8 before:w-px md:grid-cols-4 md:gap-8 md:before:right-8 md:before:bottom-auto md:before:h-px md:before:w-auto ${line}`}
    >
      {copy.ivf.steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.1} className="relative grid grid-cols-[4rem_1fr] gap-5 md:block">
            <span
              className={
                onDark
                  ? 'relative grid size-16 place-items-center rounded-full bg-teal-800 text-clay-200 ring-1 ring-teal-600'
                  : 'relative grid size-16 place-items-center rounded-full bg-paper text-clay-500 ring-1 ring-line'
              }
            >
              <IvfIllustration step={i as 0 | 1 | 2 | 3} className="size-10" />
            </span>
            <div className="md:mt-6">
              <p className={onDark ? 'text-[0.9375rem] font-semibold text-teal-200' : 'text-[0.9375rem] font-semibold text-clay-600'}>
                {copy.ivf.stepWord} {i + 1}
              </p>
              <h3 className={onDark ? 't-h3 mt-1 text-ivory' : 't-h3 mt-1 text-teal-950'}>{s.title}</h3>
              <p className={onDark ? 'mt-2 text-teal-100' : 'mt-2 text-ink-soft'}>{s.body}</p>
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
    <Section tone="teal" labelledBy="ivf-title">
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
          <p className="font-serif text-[1.375rem] leading-snug text-ivory italic md:col-span-8 md:text-[1.625rem]">
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
