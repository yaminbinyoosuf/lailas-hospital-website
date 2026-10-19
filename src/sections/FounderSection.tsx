import { ArrowRight, CalendarDays } from 'lucide-react';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import { Photo } from '../components/Photo';
import { Section } from '../components/Section';
import { getDoctor } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { SectionLabel } from '../components/SectionLabel';

/**
 * The founder, on the home page.
 *
 * The doctors page lists six consultants, so the person who started the hospital
 * arrives as one card among many. This gives her the position the story actually
 * has: a tall portrait and a short statement before the team is introduced.
 *
 * Only facts stated elsewhere on the site appear here, and no words are put in
 * her mouth: there is no quotation because none has been verified.
 */
export function FounderSection() {
  const copy = useCopy();
  const { open } = useBooking();
  const founder = getDoctor('laila-beegum');
  const profile = copy.doctors.profiles['laila-beegum'];

  return (
    <Section tone="sand" labelledBy="founder-title" space="loose">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Portrait -------------------------------------------------------- */}
        <div className="lg:col-span-5">
          <Photo
            id="doctor-laila-beegum"
            shape="arch"
            aspect={4 / 5}
            sizes="(min-width: 1024px) 34vw, 80vw"
            className="mx-auto w-[78%] max-w-[24rem] lg:mx-0 lg:w-full"
          />

          {/* Two figures that carry the whole story, set on glass over the
              portrait rather than in a row of statistics underneath it. */}
          <div className="glass-card relative z-10 mx-auto -mt-12 w-[88%] max-w-[22rem] px-6 py-5 lg:mx-0 lg:-mt-16 lg:ml-6">
            <dl className="grid grid-cols-2 gap-4">
              {copy.founder.facts.slice(1).map((fact) => (
                <div key={fact.value}>
                  <dt className="t-label uppercase text-ink-muted">{fact.label}</dt>
                  <dd className="mt-1 t-h3 tabular-nums text-teal-900">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Statement ------------------------------------------------------- */}
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionLabel index={4} name={copy.sections.founder} />

          <h2 id="founder-title" className="t-h2 mt-4 text-teal-950">
            {founder.name}
          </h2>
          <p className="mt-2 t-body font-medium text-teal-800">{profile.role}</p>
          <p className="mt-0.5 t-meta text-ink-muted">{founder.qualifications}</p>

          <p className="t-lead mt-6 max-w-[34rem]">{copy.founder.title}</p>
          <p className="mt-4 max-w-[34rem] t-small text-ink-soft">{profile.bio}</p>

          {/* Figures ------------------------------------------------------- */}
          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
            {copy.founder.facts.map((fact) => (
              <div key={fact.value}>
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="block t-h3 text-teal-900">{fact.value}</span>
                  <span className="mt-1 block t-meta text-ink-muted">{fact.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Button
              size="lg"
              icon={<CalendarDays aria-hidden="true" />}
              onClick={() => open({ kind: 'doctor', id: founder.id })}
            >
              {copy.doctors.bookWith(founder.name)}
            </Button>
            <ButtonLink
              to="/doctors"
              variant="quiet"
              size="lg"
              iconAfter={<ArrowRight aria-hidden="true" />}
            >
              {copy.doctors.seeAll}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
