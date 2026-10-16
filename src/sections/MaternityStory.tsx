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
      <Container className="grid min-w-0 gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="min-w-0 lg:col-span-5">
          <Photo id="maternity-story" shape="arch" sizes="(min-width: 1024px) 34vw, 90vw" className="mx-auto max-w-[30rem]" />
        </Reveal>

        <div className="min-w-0 lg:col-span-7 lg:pt-6">
          <Reveal>
            <h2 id="maternity-title" className="t-h2 text-teal-950">
              {copy.maternity.title}
            </h2>
            <p className="t-lead mt-6 max-w-[38rem]">{copy.maternity.lead}</p>
          </Reveal>

          <Reveal className="mt-12 border-t border-ink/15 pt-8" delay={0.1}>
            <p className="t-number text-[clamp(3.25rem,2.2rem+3.4vw,5rem)] text-teal-800">
              <CountUp value={births.value} suffix={births.suffix} />
            </p>
            <p className="mt-3 t-h4 text-ink">{births.label}</p>
            {/* Two-up figures. The tracks are minmax(0,1fr) and the labels may
                break, because long unbreakable Malayalam words would otherwise
                set an intrinsic width wider than a 320px viewport. */}
            <div className="mt-10 grid grid-cols-[repeat(2,minmax(0,1fr))] gap-6 sm:gap-8">
              {[founded, ultrasound].map((s) => (
                <div key={s.label} className="min-w-0">
                  <p className="t-number text-[clamp(2rem,1.5rem+1.8vw,2.75rem)] text-teal-700">
                    <CountUp value={s.value} grouping={false} />
                  </p>
                  <p className="mt-2 min-w-0 t-small [overflow-wrap:anywhere]">{s.label}</p>
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
        <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-6">
          {copy.maternity.expect.map((e, i) => (
            <Reveal
              as="li"
              key={e.title}
              delay={i * 0.08}
              className="glass-card glass-card-hover rounded-[var(--radius-md)] p-6 border-t-2 border-t-clay-400 shadow-sm"
            >
              <h4 className="t-h3 text-ink font-semibold">{e.title}</h4>
              <p className="mt-2.5 text-ink-soft leading-relaxed">{e.body}</p>
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
