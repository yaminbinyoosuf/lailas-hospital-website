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
            'mt-12 grid gap-4 md:gap-5',
            few
              ? 'sm:grid-cols-2'
              : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          )}
        >
          {doctors.map((d, i) => (
            <Reveal as="li" key={d.id} delay={i * 0.05} className="h-full">
              <DoctorCard doctor={d} layout="stack" />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
