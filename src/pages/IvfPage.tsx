import { CalendarDays, Check, FileText, MessageCircle } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { Section } from '../components/Section';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { doctorsFor, pageFaqs, whatsappLink } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { CtaBand } from '../sections/CtaBand';
import { DoctorsSection } from '../sections/DoctorsSection';
import { FaqSection } from '../sections/FaqSection';
import { IvfTimeline } from '../sections/IvfPath';
import { PageHero } from '../sections/PageHero';

export function IvfPage() {
  const copy = useCopy();
  const page = copy.pages.ivf;
  const { open } = useBooking();
  const book = () => open({ kind: 'service', id: 'ivf' });
  const whatsapp = (variant: 'primary' | 'light') => (
    <ButtonAnchor
      href={whatsappLink(copy.ivf.whatsappMessage)}
      variant={variant}
      size="lg"
      icon={<MessageCircle aria-hidden="true" />}
    >
      {copy.ivf.whatsapp}
    </ButtonAnchor>
  );

  return (
    <>
      <PageMeta page="ivf" />
      <PageHero
        title={page.title}
        lead={page.lead}
        imageId="page-ivf"
        actions={
          <>
            {whatsapp('primary')}
            <Button variant="secondary" size="lg" icon={<CalendarDays aria-hidden="true" />} onClick={book}>
              {copy.ivf.book}
            </Button>
          </>
        }
      />

      <Section tone="sage" labelledBy="when-title">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 id="when-title" className="t-h2 text-teal-950">
              {page.whenTitle}
            </h2>
            <ul className="mt-8 space-y-4">
              {page.when.map((w) => (
                <li key={w} className="flex gap-3 t-h4">
                  <Check className="mt-1.5 size-5 shrink-0 text-teal-600" aria-hidden="true" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <h2 className="t-h2 text-teal-950">{page.firstVisitTitle}</h2>
            <ol className="mt-8 space-y-8">
              {page.firstVisit.map((f, i) => (
                <li key={f.title} className="grid grid-cols-[3.5rem_1fr] gap-4">
                  <span className="t-number text-[clamp(2rem,1.5rem+1.6vw,2.75rem)] text-clay-500" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="t-h3 text-teal-950">{f.title}</h3>
                    <p className="mt-1.5 text-ink-soft">{f.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </Section>

      <Section labelledBy="path-title">
        <Container>
          <Reveal>
            <h2 id="path-title" className="t-h2 max-w-2xl text-teal-950">
              {page.pathTitle}
            </h2>
          </Reveal>
          <div className="mt-14">
            <IvfTimeline onDark={false} />
          </div>
        </Container>
      </Section>

      <Section labelledBy="bring-title" className="pt-0 md:pt-0">
        <Container className="grid gap-8 lg:grid-cols-2">
          <Reveal className="rounded-[var(--radius-lg)] bg-paper p-8 ring-1 ring-line md:p-12">
            <h2 id="bring-title" className="t-h3 text-teal-950">
              {page.bringTitle}
            </h2>
            <ul className="mt-6 space-y-3">
              {page.bring.map((b) => (
                <li key={b} className="flex gap-3">
                  <FileText className="mt-1 size-5 shrink-0 text-clay-500" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-ink-muted">{page.bringNote}</p>
          </Reveal>
          <Reveal className="on-dark rounded-[var(--radius-lg)] bg-teal-900 p-8 text-ivory md:p-12" delay={0.08}>
            <h2 className="t-h3 text-ivory">{page.promiseTitle}</h2>
            <p className="mt-6 t-h3">{copy.ivf.promise}</p>
          </Reveal>
        </Container>
      </Section>

      <DoctorsSection title={page.doctorsTitle} lead="" doctors={doctorsFor('ivf')} showAllLink={false} tone="paper" />
      <FaqSection title={page.faqTitle} ids={pageFaqs.ivf} />
      <CtaBand title={page.cta.title} body={page.cta.body} actions={whatsapp('light')} />
    </>
  );
}
