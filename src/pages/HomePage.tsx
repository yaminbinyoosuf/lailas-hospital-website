import { PageMeta } from '../components/PageMeta';
import { DoctorsSection } from '../sections/DoctorsSection';
import { FaqSection } from '../sections/FaqSection';
import { FounderSection } from '../sections/FounderSection';
import { Hero } from '../sections/Hero';
import { IvfPath } from '../sections/IvfPath';
import { MaternityStory } from '../sections/MaternityStory';
import { PregnancyTool } from '../sections/PregnancyTool';
import { Services } from '../sections/Services';
import { VisitUs } from '../sections/VisitUs';

export function HomePage() {
  return (
    <>
      <PageMeta page="home" />
      <Hero />
      <Services />
      <MaternityStory />
      <IvfPath />
      <PregnancyTool />
      <FounderSection />
      <DoctorsSection />
      <FaqSection />
      <VisitUs />
    </>
  );
}
