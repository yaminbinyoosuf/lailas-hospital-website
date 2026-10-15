import { CalendarDays, Check, MessageCircle } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor } from '../components/Button';
import { Container } from '../components/Container';
import { PageMeta } from '../components/PageMeta';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import type { ImageId } from '../content/images';
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

      <section aria-labelledby="stages-title" className="border-t border-line py-20 md:py-28">
        <Container>
          <Reveal>
            <h2 id="stages-title" className="t-h2 max-w-2xl text-teal-950">
              {page.stagesTitle}
            </h2>
          </Reveal>
          <div className="mt-14 space-y-20 md:space-y-28">
            {page.stages.map((s, i) => (
              <Reveal key={s.title} className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
                <div className={cn('md:col-span-6', i % 2 === 1 && 'md:order-2')}>
                  <Photo
                    id={s.imageId as ImageId}
                    shape={i === 1 ? 'cradle' : 'soft'}
                    sizes="(min-width: 768px) 45vw, 90vw"
                  />
                </div>
                <div className="md:col-span-6">
                  <h3 className="t-h3 text-teal-950">{s.title}</h3>
                  <p className="t-lead mt-4">{s.body}</p>
                  <ul className="mt-6 space-y-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <Check className="mt-1 size-5 shrink-0 text-teal-600" aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="extra-care-title" className="pb-20 md:pb-28">
        <Container>
          <Reveal className="rounded-[var(--radius-lg)] bg-clay-50 px-7 py-10 md:px-14 md:py-14">
            <h2 id="extra-care-title" className="t-h3 text-teal-950">
              {page.extraCare.title}
            </h2>
            <p className="t-lead mt-4 max-w-3xl">{page.extraCare.body}</p>
          </Reveal>
        </Container>
      </section>

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
