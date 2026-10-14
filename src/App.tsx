import { LazyMotion, MotionConfig } from 'motion/react';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { BookingProvider } from './booking/BookingProvider';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MobileBar } from './components/MobileBar';
import { ScrollManager } from './components/ScrollManager';
import { TopStrip } from './components/TopStrip';
import { LanguageProvider, useCopy } from './i18n/LanguageProvider';
import { ContactPage } from './pages/ContactPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { HomePage } from './pages/HomePage';
import { IvfPage } from './pages/IvfPage';
import { MaternityPage } from './pages/MaternityPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPage } from './pages/PrivacyPage';

const loadMotionFeatures = () => import('./lib/motionFeatures').then((m) => m.default);

const StyleguidePage = import.meta.env.DEV ? lazy(() => import('./pages/StyleguidePage')) : null;

function SkipLink() {
  const copy = useCopy();
  return (
    <a
      href="#main"
      className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-teal-900 px-5 py-3 font-semibold text-ivory transition-transform focus:translate-y-0"
    >
      {copy.a11y.skip}
    </a>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <BookingProvider>
        <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">
          <SkipLink />
          <ScrollManager />
          <div className="flex min-h-dvh flex-col pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0">
            <TopStrip />
            <Header />
            <main id="main" tabIndex={-1} className="flex-1 outline-none">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/maternity" element={<MaternityPage />} />
                <Route path="/ivf" element={<IvfPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                {/* Old addresses from the previous site */}
                <Route path="/ivf-fertility" element={<Navigate to="/ivf" replace />} />
                <Route path="/obstetrics-gynaecology" element={<Navigate to="/#services" replace />} />
                <Route path="/departments" element={<Navigate to="/#services" replace />} />
                <Route path="/about" element={<Navigate to="/" replace />} />
                {StyleguidePage && (
                  <Route
                    path="/styleguide"
                    element={
                      <Suspense fallback={null}>
                        <StyleguidePage />
                      </Suspense>
                    }
                  />
                )}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <MobileBar />
        </MotionConfig>
        </LazyMotion>
      </BookingProvider>
    </LanguageProvider>
  );
}
