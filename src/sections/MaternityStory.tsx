import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { hasPhoto } from '../content/images';
import { useCopy } from '../i18n/LanguageProvider';

/** Years must not get a thousands separator; counts use Indian grouping. */
const formatFigure = (n: number, grouping: boolean) =>
  new Intl.NumberFormat('en-IN', { useGrouping: grouping }).format(n);

/** Big editorial numbers next to a tall photo, then what to expect. */
export function MaternityStory() {
  const copy = useCopy();
  const [births, founded, ultrasound] = copy.maternity.stats;
  const withPhoto = hasPhoto('maternity-story');

  const intro = (
    <Reveal>
      <h2 id="maternity-title" className="t-h2 text-teal-950">
        {copy.maternity.title}
      </h2>
      <p className="t-lead mt-6 max-w-[38rem] text-ink-soft">{copy.maternity.lead}</p>
    </Reveal>
  );

  const figures = (
    <>
      <p className="t-number text-[clamp(3.25rem,2.2rem+3.4vw,5rem)] text-teal-800">
        {formatFigure(births.value, true)}
        {births.suffix}
      </p>
      <p className="mt-3 t-h4 text-ink">{births.label}</p>
      {/* Two-up figures. minmax(0,1fr) tracks and breakable labels keep the
          pair inside a 320px viewport. */}
      <div className="mt-10 grid grid-cols-[repeat(2,minmax(0,1fr))] gap-6 sm:gap-8">
        {[founded, ultrasound].map((s) => (
          <div key={s.label} className="min-w-0">
            <p className="t-number text-[clamp(2rem,1.5rem+1.8vw,2.75rem)] text-teal-700">
              {formatFigure(s.value, false)}
            </p>
            <p className="mt-2 min-w-0 t-small text-ink-soft [overflow-wrap:anywhere]">{s.label}</p>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <Section tone="sand" labelledBy="maternity-title" space="loose">
      {withPhoto ? (
        <Container className="grid min-w-0 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="min-w-0 lg:col-span-5">
            <Photo id="maternity-story" shape="arch" sizes="(min-width: 1024px) 34vw, 90vw" className="mx-auto max-w-[30rem]" />
          </Reveal>
          <div className="min-w-0 lg:col-span-7 lg:pt-6">
            {intro}
            <Reveal className="mt-12 border-t border-ink/15 pt-8" delay={0.1}>
              {figures}
            </Reveal>
          </div>
        </Container>
      ) : (
        /* No photograph yet: the figures take the photo's place, beside the
           text on large screens and below it on phones. */
        <Container className="grid min-w-0 gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="min-w-0 lg:col-span-7">{intro}</div>
          <Reveal
            className="min-w-0 border-t border-ink/15 pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12"
            delay={0.1}
          >
            {figures}
          </Reveal>
        </Container>
      )}

      <Container className="mt-20 md:mt-24">
        <Reveal>
          <h3 className="t-h3 text-teal-950">{copy.maternity.expectTitle}</h3>
        </Reveal>
        <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-6">
          {copy.maternity.expect.map((e, i) => (
            <Reveal
              as="li"
              key={e.title}
              delay={i * 0.08}
              className="rounded-[var(--radius-md)] border border-line bg-paper p-6"
            >
              <span className="mb-4 block h-0.5 w-8 rounded-full bg-clay-400" aria-hidden="true" />
              <h4 className="t-h4 text-ink">{e.title}</h4>
              <p className="mt-2.5 text-ink-soft">{e.body}</p>
            </Reveal>
          ))}
        </ol>
        <ButtonLink to="/maternity" variant="quiet" className="mt-10" iconAfter={<ArrowRight aria-hidden="true" />}>
          {copy.maternity.more}
        </ButtonLink>
      </Container>
    </Section>
  );
}
