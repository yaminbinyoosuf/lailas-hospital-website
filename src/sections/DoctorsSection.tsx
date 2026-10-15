import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import { DoctorCard } from '../components/DoctorCard';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { doctors as allDoctors, type Doctor } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { cn } from '../lib/format';

interface Props {
  title?: string;
  lead?: string;
  doctors?: Doctor[];
  showAllLink?: boolean;
  tone?: 'ivory' | 'paper';
}

/** Portrait cards. A swipeable row on phones, a grid on larger screens. */
export function DoctorsSection({ title, lead, doctors = allDoctors, showAllLink = true, tone = 'ivory' }: Props) {
  const copy = useCopy();
  const few = doctors.length < 3;
  return (
    <Section tone={tone} labelledBy="doctors-title" space="tight">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id="doctors-title" className="t-h2 text-teal-950">
              {title ?? copy.doctors.title}
            </h2>
            {(lead ?? copy.doctors.lead) && <p className="t-lead mt-5">{lead ?? copy.doctors.lead}</p>}
          </div>
          {showAllLink && (
            <ButtonLink to="/doctors" variant="quiet" className="shrink-0 self-start md:self-auto" iconAfter={<ArrowRight aria-hidden="true" />}>
              {copy.doctors.seeAll}
            </ButtonLink>
          )}
        </Reveal>
        <ul
          className={cn(
            'mt-12',
            few
              ? 'grid gap-12 lg:grid-cols-2'
              : 'scroll-row -mx-5 auto-cols-[74%] gap-5 px-5 pb-2 xs:auto-cols-[60%] sm:auto-cols-[44%] lg:mx-0 lg:grid lg:grid-flow-row lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:px-0',
          )}
        >
          {doctors.map((d, i) => (
            <Reveal as="li" key={d.id} delay={i * 0.06}>
              <DoctorCard doctor={d} layout="row" />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
