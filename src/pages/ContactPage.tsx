import { CalendarDays, Mail, Phone } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button } from '../components/Button';
import { ContactEnquiry } from '../components/ContactEnquiry';
import { Container } from '../components/Container';
import { PageMeta } from '../components/PageMeta';
import { Reveal } from '../components/Reveal';
import { contact } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { PageHero } from '../sections/PageHero';
import { VisitUs } from '../sections/VisitUs';

export function ContactPage() {
  const copy = useCopy();
  const page = copy.pages.contact;
  const { open } = useBooking();

  return (
    <>
      <PageMeta page="contact" />
      <PageHero title={page.title} lead={page.lead} />
      <section aria-labelledby="phones-title" className="pb-20 md:pb-24">
        <Container className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 id="phones-title" className="sr-only">
              {copy.contact.phonesTitle}
            </h2>
            <a
              href={`tel:${contact.primary.tel}`}
              className="group flex flex-col gap-2 rounded-[var(--radius-lg)] bg-emergency-50 p-8 ring-1 ring-emergency/15 transition-colors hover:ring-emergency/40 md:p-10"
            >
              <span className="flex items-center gap-2.5 font-semibold text-emergency-700">
                <Phone className="size-5" aria-hidden="true" />
                {copy.contact.primaryLabel}
              </span>
              <span className="t-number text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)] text-ink">{contact.primary.display}</span>
              <span className="text-ink-soft">{copy.time.open24EveryDay}</span>
            </a>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {contact.landlines.map((p, i) => (
                <li key={p.tel}>
                  <a
                    href={`tel:${p.tel}`}
                    className="flex min-h-24 flex-col justify-center rounded-[var(--radius-md)] bg-paper px-5 py-4 ring-1 ring-line transition-colors hover:ring-teal-600"
                  >
                    <span className="t-small text-ink-muted">{copy.contact.landlineLabels[i]}</span>
                    <span className="font-semibold tabular-nums">{p.display}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${contact.email}`}
              className="mt-3 flex min-h-16 items-center gap-3 rounded-[var(--radius-md)] bg-paper px-5 ring-1 ring-line transition-colors hover:ring-teal-600"
            >
              <Mail className="size-5 text-teal-700" aria-hidden="true" />
              <span>
                <span className="sr-only">{copy.contact.emailTitle}: </span>
                {contact.email}
              </span>
            </a>
          </Reveal>
          <Reveal className="flex flex-col justify-center rounded-[var(--radius-lg)] bg-teal-800 p-8 text-ivory md:p-10 lg:col-span-5" delay={0.08}>
            <h2 className="t-h3 text-ivory">{page.bookTitle}</h2>
            <p className="mt-3 text-teal-100">{page.bookBody}</p>
            <Button variant="light" size="lg" className="mt-8 self-start" icon={<CalendarDays aria-hidden="true" />} onClick={() => open()}>
              {copy.actions.book}
            </Button>
          </Reveal>
        </Container>
      </section>
      <Container>
        <Reveal>
          <ContactEnquiry />
        </Reveal>
      </Container>
      <VisitUs />
    </>
  );
}
