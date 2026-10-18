import { ArrowRight, Lock, MessageCircle } from 'lucide-react';
import { ButtonAnchor, ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import { Photo } from '../components/Photo';
import { SectionLabel } from '../components/SectionLabel';
import { Section } from '../components/Section';
import { whatsappLink } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';

/**
 * Fertility and IVF, as a standalone editorial section on the home page.
 *
 * The highlights are the hospital's existing approved offerings, taken from the
 * services copy rather than written here, so nothing claims a treatment that has
 * not been verified. The photograph slot is registered but empty, so it renders
 * the intentional placeholder until a real image is supplied.
 */
export function FertilitySection() {
  const copy = useCopy();
  const offerings = copy.services.items.ivf.offerings;

  return (
    <Section tone="sand" labelledBy="fertility-title" space="loose">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Statement ------------------------------------------------------- */}
        <div className="lg:col-span-6">
          <SectionLabel index={3} name={copy.fertility.eyebrow} />

          <h2 id="fertility-title" className="t-h2 mt-5 max-w-[16ch] text-teal-950">
            {copy.fertility.title}
          </h2>

          <p className="measure mt-5 t-lead text-ink-soft">{copy.fertility.lead}</p>

          <ul className="mt-8 max-w-[30rem] divide-y divide-line border-y border-line">
            {offerings.map((item) => (
              <li key={item} className="flex items-start gap-3 py-3.5">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-clay-500" />
                <span className="text-ink">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink to="/ivf" size="lg" className="whitespace-nowrap" iconAfter={<ArrowRight aria-hidden="true" />}>
              {copy.fertility.cta}
            </ButtonLink>
            <ButtonAnchor
              href={whatsappLink(copy.ivf.whatsappMessage)}
              variant="secondary"
              size="lg"
              className="whitespace-nowrap"
              icon={<MessageCircle aria-hidden="true" />}
            >
              {copy.fertility.whatsapp}
            </ButtonAnchor>
          </div>

          <p className="mt-4 flex items-center gap-2 t-meta text-ink-muted">
            <Lock className="size-3.5 shrink-0 text-teal-700" aria-hidden="true" />
            {copy.ivf.confidential}
          </p>
        </div>

        {/* Photograph ------------------------------------------------------ */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Photo
            id="ivf-consultation"
            shape="arch"
            aspect={4 / 5}
            sizes="(min-width: 1024px) 34vw, 90vw"
            className="mx-auto w-full max-w-[26rem] lg:mx-0"
          />
        </div>
      </Container>
    </Section>
  );
}
