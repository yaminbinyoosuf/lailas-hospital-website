import { MessageCircle, Phone } from 'lucide-react';
import { Accordion } from '../components/Accordion';
import { ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { contact, faqs, whatsappLink, type FaqId } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { SectionLabel } from '../components/SectionLabel';

export function FaqSection({ ids, title }: { ids?: FaqId[]; title?: string }) {
  const copy = useCopy();
  const list = ids ? faqs.filter((f) => ids.includes(f.id)) : faqs;
  const items = list.map((f) => ({ id: f.id, title: copy.faq.items[f.id].q, body: copy.faq.items[f.id].a }));

  return (
    <Section tone="paper" labelledBy="faq-title" className="border-y border-line">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionLabel index={6} name={copy.sections.questions} />

          <h2 id="faq-title" className="t-h2 text-teal-950">
            {title ?? copy.faq.title}
          </h2>
          <p className="t-lead mt-5">{copy.faq.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <ButtonAnchor href={`tel:${contact.primary.tel}`} variant="secondary" icon={<Phone aria-hidden="true" />}>
              {copy.actions.call}
            </ButtonAnchor>
            <ButtonAnchor
              href={whatsappLink(copy.booking.whatsappGeneral)}
              variant="secondary"
              icon={<MessageCircle aria-hidden="true" />}
            >
              {copy.actions.whatsapp}
            </ButtonAnchor>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.08}>
          <Accordion items={items} defaultOpen={items[0]?.id} />
        </Reveal>
      </Container>
    </Section>
  );
}
