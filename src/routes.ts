import { lazy } from 'react';

/* ============================================================================
   Route-level code splitting
   ----------------------------------------------------------------------------
   The homepage ships in the initial bundle because it is the most common entry
   point. Every other route is loaded on demand, so a first-time visitor on a
   slow mobile connection downloads only what they need to see.
   ========================================================================== */

export const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage })),
);
export const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
);
export const IvfFertilityPage = lazy(() =>
  import('./pages/IvfFertilityPage').then((m) => ({ default: m.IvfFertilityPage })),
);
export const ObstetricsGynaecologyPage = lazy(() =>
  import('./pages/ObstetricsGynaecologyPage').then((m) => ({
    default: m.ObstetricsGynaecologyPage,
  })),
);
export const MaternityCarePage = lazy(() =>
  import('./pages/MaternityCarePage').then((m) => ({ default: m.MaternityCarePage })),
);
export const DoctorsPage = lazy(() =>
  import('./pages/DoctorsPage').then((m) => ({ default: m.DoctorsPage })),
);
export const DepartmentsPage = lazy(() =>
  import('./pages/DepartmentsPage').then((m) => ({ default: m.DepartmentsPage })),
);
export const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
);
export const PrivacyPage = lazy(() =>
  import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })),
);

/* --- Overlays: heavy, and never needed on first paint --------------------- */

export const AppointmentWizard = lazy(() =>
  import('./components/AppointmentWizard').then((m) => ({ default: m.AppointmentWizard })),
);
export const TriageAssistant = lazy(() =>
  import('./components/TriageAssistant').then((m) => ({ default: m.TriageAssistant })),
);
