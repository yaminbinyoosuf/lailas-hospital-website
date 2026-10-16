import { CalendarDays, Check, MessageCircle } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { PageMeta } from '../components/PageMeta';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { hasPhoto, type ImageId } from '../content/images';
import { doctorsFor, pageFaqs, whatsappLink } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { cn } from '../lib/format';
import { CtaBand } from '../sections/CtaBand';
import { DoctorsSection } from '../sections/DoctorsSection';
import { FaqSection } from '../sections/FaqSection';
import { PageHero } from '../sections/PageHero';
import { PregnancyTool } from '../sections/PregnancyTool';

export function MaternityPage() {
  const copy = useCopy();
  const page = copy.pages.maternity;
  const { open } = useBooking();
  const book = () => open({ kind: 'service', id: 'maternity' });

  return (
    <>
      <PageMeta page="maternity" />
      <PageHero
        title={page.title}
        lead={page.lead}
        imageId="page-maternity"
        actions={
          <>
            <Button size="lg" icon={<CalendarDays aria-hidden="true" />} onClick={book}>
              {copy.actions.book}
            </Button>
            <ButtonAnchor
              href={whatsappLink(copy.booking.whatsappGeneral)}
              variant="secondary"
              size="lg"
              icon={<MessageCircle aria-hidden="true" />}
            >
              {copy.actions.chatWhatsapp}
            </ButtonAnchor>
          </>
        }
      />

      <Section labelledBy="stages-title" className="border-t border-line">
        <Container>
          <Reveal>
            <h2 id="stages-title" className="t-h2 max-w-2xl text-teal-950">
              {page.stagesTitle}
            </h2>
          </Reveal>
          <ol className="mt-14 space-y-16 md:space-y-24">
            {page.stages.map((s, i) => {
              const imageId = s.imageId as ImageId;
              const points = (
                <ul className="mt-6 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <Check className="mt-1 size-5 shrink-0 text-teal-600" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              );
              return hasPhoto(imageId) ? (
                <Reveal as="li" key={s.title} className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
                  <div className={cn('md:col-span-6', i % 2 === 1 && 'md:order-2')}>
                    <Photo id={imageId} shape={i === 1 ? 'cradle' : 'soft'} sizes="(min-width: 768px) 45vw, 90vw" />
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="t-h3 text-teal-950">{s.title}</h3>
                    <p className="t-lead mt-4 text-ink-soft">{s.body}</p>
                    {points}
                  </div>
                </Reveal>
              ) : (
                /* No photograph yet: a numbered row, so three stages read as a
                   sequence rather than three half-empty splits. */
                <Reveal
                  as="li"
                  key={s.title}
                  className="grid gap-6 border-t border-line pt-10 md:grid-cols-12 md:gap-16"
                >
                  <div className="md:col-span-4">
                    <span className="t-number text-[clamp(2rem,1.5rem+1.6vw,2.75rem)] text-clay-600" aria-hidden="true">
                      {i + 1}
                    </span>
                    <h3 className="t-h3 mt-3 text-teal-950">{s.title}</h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="t-lead text-ink-soft">{s.body}</p>
                    {points}
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </Section>

      <Section labelledBy="extra-care-title" className="pt-0 md:pt-0">
        <Container>
          <Reveal className="rounded-[var(--radius-lg)] bg-clay-50 px-7 py-10 md:px-14 md:py-14">
            <h2 id="extra-care-title" className="t-h3 text-teal-950">
              {page.extraCare.title}
            </h2>
            <p className="t-lead mt-4 max-w-3xl text-ink-soft">{page.extraCare.body}</p>
          </Reveal>
        </Container>
      </Section>

      <PregnancyTool />
      <DoctorsSection title={page.doctorsTitle} lead="" doctors={doctorsFor('maternity')} />
      <FaqSection title={page.faqTitle} ids={pageFaqs.maternity} />
      <CtaBand
        title={page.cta.title}
        body={page.cta.body}
        actions={
          <Button variant="light" size="lg" icon={<CalendarDays aria-hidden="true" />} onClick={book}>
            {copy.pregnancy.book}
          </Button>
        }
      />
    </>
  );
}
