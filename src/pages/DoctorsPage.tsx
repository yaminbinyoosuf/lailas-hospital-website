import { Clock } from 'lucide-react';
import { Container } from '../components/Container';
import { DoctorCard } from '../components/DoctorCard';
import { PageMeta } from '../components/PageMeta';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { doctorsFor } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { PageHero } from '../sections/PageHero';

export function DoctorsPage() {
  const copy = useCopy();
  const page = copy.pages.doctors;
  return (
    <>
      <PageMeta page="doctors" />
      <PageHero title={page.title} lead={page.lead} />
      <Container>
        <Photo
          id="staff-team"
          shape="soft"
          sizes="(min-width: 1280px) 76rem, 92vw"
          className="w-full"
          aspect={21 / 9}
          omitIfMissing
        />
      </Container>

      {page.groups.map((g, gi) => (
        <section key={g.title} aria-labelledby={`group-${gi}`} className="py-16 md:py-24">
          <Container>
            <Reveal>
              <h2 id={`group-${gi}`} className="t-h2 text-teal-950">
                {g.title}
              </h2>
            </Reveal>
            <ul className="mt-10 grid gap-14 lg:grid-cols-2 lg:gap-x-16">
              {doctorsFor(g.serviceId).map((d, i) => (
                <Reveal as="li" key={d.id} delay={i * 0.06}>
                  <DoctorCard doctor={d} layout="row" />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ))}

      <section aria-labelledby="duty-title" className="pb-20 md:pb-28">
        <Container>
          <Reveal className="flex flex-col gap-5 rounded-[var(--radius-lg)] bg-sage-100 p-8 md:flex-row md:items-center md:gap-10 md:p-12">
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-paper text-teal-700">
              <Clock className="size-8" aria-hidden="true" />
            </span>
            <div>
              <h2 id="duty-title" className="t-h3 text-teal-950">
                {copy.doctors.duty.title}
              </h2>
              <p className="mt-2 max-w-3xl text-ink-soft">{copy.doctors.duty.body}</p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
