import { Suspense, useState, useEffect } from 'react';
import { Loader2, Siren } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { WhatsAppFab } from './components/WhatsAppFab';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useInertBackground } from './components/Overlay';
import { HOSPITAL_DATA } from './data/hospitalData';

import {
  HomePage,
  AboutPage,
  IvfFertilityPage,
  ObstetricsGynaecologyPage,
  MaternityCarePage,
  DoctorsPage,
  DepartmentsPage,
  ContactPage,
  PrivacyPage,
  AppointmentWizard,
  TriageAssistant,
} from './routes';

/* ============================================================================
   Route table + per-route SEO metadata
   ========================================================================== */

interface RouteMeta {
  title: string;
  description: string;
}

const PAGE_METADATA: Record<string, RouteMeta> = {
  '/': {
    title: "Lailas Hospital & IVF Centre, Chemmad | Maternity, IVF & 24/7 Emergency Care",
    description:
      "Lailas Hospital and IVF Centre, Chemmad — ethical maternity care, 70,000+ safe deliveries, advanced IVF & fertility treatment, paediatrics and 24/7 emergency care in Malappuram, Kerala. Call +91 8606 800 999.",
  },
  '/about': {
    title: 'About Us | Lailas Hospital & IVF Centre, Chemmad',
    description:
      'Learn about Lailas Hospital and IVF Centre in Chemmad, Kerala. Discover our institutional mission, heritage, and patient care philosophy.',
  },
  '/ivf-fertility': {
    title: 'IVF & Fertility Centre | Lailas Hospital Chemmad',
    description:
      'Sensitive, confidential fertility consultations and reproductive health guidance at Lailas Hospital in Chemmad, Malappuram.',
  },
  '/obstetrics-gynaecology': {
    title: 'Obstetrics & Gynaecology | Lailas Hospital Chemmad',
    description:
      "Dedicated clinical consultations for women's health, menstrual wellness, and prenatal care at Lailas Hospital in Chemmad.",
  },
  '/maternity': {
    title: 'Maternity Care & Antenatal Support | Lailas Hospital Chemmad',
    description:
      'Comprehensive antenatal, labour, and postnatal care supporting mothers and newborns at Lailas Hospital in Chemmad, Kerala.',
  },
  '/doctors': {
    title: 'Medical Team & Consultation Schedule | Lailas Hospital Chemmad',
    description:
      'Meet our obstetricians, fertility specialists, paediatrician and family physician, with confirmed OPD timings at Lailas Hospital, Chemmad.',
  },
  '/departments': {
    title: 'Departments & Specialities | Lailas Hospital Chemmad',
    description:
      'Maternity, IVF & fertility, gynaecology & laparoscopy, paediatrics & neonatology, general medicine, and 24/7 emergency, laboratory and pharmacy services in Chemmad.',
  },
  '/contact': {
    title: 'Contact & Appointment Enquiry | Lailas Hospital Chemmad',
    description:
      'Telephone numbers, Thalappara Road location, directions, and appointment enquiries for Lailas Hospital in Chemmad.',
  },
  '/privacy': {
    title: 'Privacy Policy | Lailas Hospital & IVF Centre',
    description:
      'Healthcare information handling and patient data privacy practices at Lailas Hospital and IVF Centre, Chemmad.',
  },
};

/** Calm placeholder shown while a lazily-loaded route chunk arrives. */
const RouteFallback: React.FC = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
    <Loader2 className="h-7 w-7 animate-spin text-sand-600" aria-hidden="true" />
    <p className="text-sm text-ink-soft" role="status">
      Loading…
    </p>
  </div>
);

/* -------------------------------------------------------------------------- */

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname) {
      const path = window.location.pathname;
      if (PAGE_METADATA[path]) return path;
    }
    return '/';
  });

  /** Booking wizard. `step` lets entry points skip the department question. */
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardSpeciality, setWizardSpeciality] = useState<string | undefined>();
  const [wizardStep, setWizardStep] = useState(1);
  const [triageOpen, setTriageOpen] = useState(false);

  useScrollReveal(currentPath);
  useInertBackground(wizardOpen || triageOpen);

  // Browser back / forward.
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(PAGE_METADATA[path] ? path : '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keep the document title and description aligned with the active route.
  useEffect(() => {
    const meta = PAGE_METADATA[currentPath] || PAGE_METADATA['/'];
    document.title = meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', meta.description);
  }, [currentPath]);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWizard = (specialityId?: string, step = 1) => {
    setWizardSpeciality(specialityId);
    setWizardStep(step);
    setWizardOpen(true);
  };

  const closeWizard = () => {
    setWizardOpen(false);
    setWizardSpeciality(undefined);
    setWizardStep(1);
  };

  /** Triage result → booking wizard, skipping the department step. */
  const bookFromTriage = (specialityId: string) => {
    setTriageOpen(false);
    openWizard(specialityId, 2);
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas pb-24 text-ink 2xl:pb-0">
      <Suspense fallback={<RouteFallback />}>
        <Header
          currentPath={currentPath}
          onNavigate={handleNavigate}
          onBookSpeciality={(id) => openWizard(id, 2)}
          onOpenAppointmentModal={() => openWizard()}
          onOpenTriage={() => setTriageOpen(true)}
        />

        <main id="main-content" className="flex-1" tabIndex={-1}>
          <Suspense fallback={<RouteFallback />}>
            {currentPath === '/' && (
              <HomePage
                onNavigate={handleNavigate}
                onOpenAppointmentModal={(dept?: string) => openWizard(dept)}
                onBookSpeciality={(id: string) => openWizard(id, 2)}
                onOpenTriage={() => setTriageOpen(true)}
              />
            )}
            {currentPath === '/about' && (
              <AboutPage onNavigate={handleNavigate} onOpenAppointmentModal={() => openWizard()} />
            )}
            {currentPath === '/ivf-fertility' && (
              <IvfFertilityPage
                onNavigate={handleNavigate}
                onOpenAppointmentModal={(dept?: string) => openWizard(dept)}
              />
            )}
            {currentPath === '/obstetrics-gynaecology' && (
              <ObstetricsGynaecologyPage
                onNavigate={handleNavigate}
                onOpenAppointmentModal={(dept?: string) => openWizard(dept)}
              />
            )}
            {currentPath === '/maternity' && (
              <MaternityCarePage
                onNavigate={handleNavigate}
                onOpenAppointmentModal={(dept?: string) => openWizard(dept)}
              />
            )}
            {currentPath === '/doctors' && (
              <DoctorsPage
                onNavigate={handleNavigate}
                onBookSpeciality={(id: string) => openWizard(id, 2)}
              />
            )}
            {currentPath === '/departments' && (
              <DepartmentsPage
                onNavigate={handleNavigate}
                onBookSpeciality={(id: string) => openWizard(id, 2)}
              />
            )}
            {currentPath === '/contact' && <ContactPage onNavigate={handleNavigate} />}
            {currentPath === '/privacy' && <PrivacyPage onNavigate={handleNavigate} />}
          </Suspense>
        </main>

        <Footer
          onNavigate={handleNavigate}
          onOpenAppointmentModal={() => openWizard()}
          onOpenTriage={() => setTriageOpen(true)}
        />
      </Suspense>

      <MobileStickyBar onOpenAppointmentModal={() => openWizard()} />

      {/* Desktop / tablet floating helpdesk */}
      <WhatsAppFab />

      {/* Overlays load on demand — the page stays interactive without them. */}
      {wizardOpen && (
        <Suspense fallback={null}>
          <AppointmentWizard
            isOpen
            onClose={closeWizard}
            defaultSpecialityId={wizardSpeciality}
            initialStep={wizardStep}
          />
        </Suspense>
      )}

      {triageOpen && (
        <Suspense fallback={null}>
          <TriageAssistant
            isOpen
            onClose={() => setTriageOpen(false)}
            onBookSpeciality={bookFromTriage}
          />
        </Suspense>
      )}

      {/* Without JavaScript the site cannot book, so surface the confirmed 24/7 number. */}
      <noscript>
        <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2 bg-critical p-4 text-center text-white">
          <Siren className="h-4 w-4" aria-hidden="true" />
          <p className="text-sm font-semibold">
            For appointments or emergencies please call{' '}
            <a href={`tel:${HOSPITAL_DATA.emergency.tel}`} className="tabular-numbers underline">
              {HOSPITAL_DATA.emergency.display}
            </a>
          </p>
        </div>
      </noscript>
    </div>
  );
}
