import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import { CountUp } from '../components/CountUp';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { useCopy } from '../i18n/LanguageProvider';

/** Big editorial numbers next to a tall photo, then what to expect. */
export function MaternityStory() {
  const copy = useCopy();
  const [births, founded, ultrasound] = copy.maternity.stats;

  return (
    <Section tone="sand" labelledBy="maternity-title" space="loose">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Photo id="maternity-story" shape="arch" sizes="(min-width: 1024px) 34vw, 90vw" className="mx-auto max-w-[30rem]" />
        </Reveal>

        <div className="lg:col-span-7 lg:pt-6">
          <Reveal>
            <h2 id="maternity-title" className="t-h2 text-teal-950">
              {copy.maternity.title}
            </h2>
            <p className="t-lead mt-6 max-w-[38rem]">{copy.maternity.lead}</p>
          </Reveal>

          <Reveal className="mt-12 border-t border-ink/15 pt-8" delay={0.1}>
            <p className="t-number text-[clamp(4.5rem,2.5rem+8vw,9rem)] text-clay-600">
              <CountUp value={births.value} suffix={births.suffix} />
            </p>
            <p className="mt-3 t-h4 text-ink">{births.label}</p>
            <div className="mt-10 grid grid-cols-2 gap-8">
              {[founded, ultrasound].map((s) => (
                <div key={s.label}>
                  <p className="t-number text-[clamp(2.75rem,2rem+3vw,4.25rem)] text-teal-800">
                    <CountUp value={s.value} grouping={false} />
                  </p>
                  <p className="mt-2 text-ink-soft">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>

      <Container className="mt-20 md:mt-24">
        <Reveal>
          <h3 className="t-h3 text-teal-950">{copy.maternity.expectTitle}</h3>
        </Reveal>
        <ol className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
          {copy.maternity.expect.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 0.08} className="border-t-2 border-clay-400 pt-5">
              <p className="t-h3 text-ink">{e.title}</p>
              <p className="mt-2 text-ink-soft">{e.body}</p>
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
