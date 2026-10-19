import { PageMeta } from '../components/PageMeta';
import { DoctorsSection } from '../sections/DoctorsSection';
import { FaqSection } from '../sections/FaqSection';
import { FertilitySection } from '../sections/FertilitySection';
import { FounderSection } from '../sections/FounderSection';
import { Hero } from '../sections/Hero';
import { MaternityStory } from '../sections/MaternityStory';
import { PregnancyTool } from '../sections/PregnancyTool';
import { Services } from '../sections/Services';
import { CtaHomeBand } from '../sections/CtaBand';
import { VisitUs } from '../sections/VisitUs';

export function HomePage() {
  return (
    <>
      <PageMeta page="home" />
      <Hero />
      <Services />
      <CtaHomeBand />
      <MaternityStory />
      <FertilitySection />
      <PregnancyTool />
      <FounderSection />
      <DoctorsSection />
      <FaqSection />
      <VisitUs />
    </>
  );
}
