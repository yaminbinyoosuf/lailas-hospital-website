import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Clock,
  MessageCircle,
  Siren,
} from 'lucide-react';
import { HOSPITAL_DATA, whatsappUrl, WHATSAPP_MESSAGES } from '../data/hospitalData';
import { BrandMark } from './Header';
import { Button, Container } from './ui';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenAppointmentModal: (department?: string) => void;
  onOpenTriage: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAppointmentModal,
  onOpenTriage,
}) => {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const primaryPhone = HOSPITAL_DATA.primary;

  const linkClass =
    'inline-flex min-h-11 items-center text-[0.9375rem] text-brand-200/70 transition-colors duration-300 hover:text-white';

  return (
    <footer className="relative isolate overflow-hidden bg-brand-950 text-brand-100">

      {/* --- Emergency band --- */}
      <div className="relative z-10 border-b border-white/10">
        <Container width="wide">
          <div className="flex flex-col items-start justify-between gap-6 py-8 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-coral-500/15 text-coral-300 ring-1 ring-coral-500/25">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="eyebrow text-coral-300">Emergency &amp; direct support</p>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-brand-200/70">
                  For immediate appointment enquiries or urgent clinical assistance, call our
                  Chemmad reception desk.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${primaryPhone.tel}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-critical px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:brightness-110"
              >
                <Siren className="h-4 w-4" aria-hidden="true" />
                <span className="tabular-numbers">{primaryPhone.display}</span>
              </a>
              <a
                href={whatsappUrl(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:brightness-110"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
              {HOSPITAL_DATA.phones.slice(0, 2).map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/15"
                >
                  <Phone className="h-4 w-4 text-coral-300" aria-hidden="true" />
                  <span className="tabular-numbers">{phone.display}</span>
                </a>
              ))}
              <Button variant="coral" onClick={() => onOpenAppointmentModal()}>
                Book appointment
              </Button>
              <button
                type="button"
                onClick={onOpenTriage}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
              >
                Not sure which clinic?
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* --- Main columns --- */}
      <Container width="wide" className="relative z-10">
        <div className="grid gap-12 py-14 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] lg:gap-10">
          {/* Identity */}
          <div>
            <BrandMark tone="light" />
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-brand-200/70">
              Dedicated to compassionate, responsible medical care in Chemmad, Malappuram district —
              with focused care in obstetrics, gynaecology, maternity and fertility consultations.
            </p>

            <div className="mt-6 space-y-3.5 text-sm text-brand-200/70">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>{HOSPITAL_DATA.address.fullFormatted}</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brand-400" />
                <a
                  href={`mailto:${HOSPITAL_DATA.email}`}
                  className="inline-flex min-h-11 items-center break-all underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
                >
                  {HOSPITAL_DATA.email}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>{HOSPITAL_DATA.operatingHours.opdConsultations}</span>
              </p>
            </div>

            <a
              href={HOSPITAL_DATA.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/15"
            >
              Get directions
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Institution */}
          <nav aria-label="Institution">
            <h3 className="font-sans text-sm font-semibold text-white">Institution</h3>
            <ul className="mt-5 space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'About our hospital', path: '/about' },
                { label: 'Medical team & roster', path: '/doctors' },
                { label: 'Location & contact', path: '/contact' },
                { label: 'Privacy policy', path: '/privacy' },
              ].map((link) => (
                <li key={link.path}>
                  <button onClick={() => handleNav(link.path)} className={linkClass}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Clinical care */}
          <nav aria-label="Clinical care">
            <h3 className="font-sans text-sm font-semibold text-white">Clinical care</h3>
            <ul className="mt-5 space-y-3">
              {[
                { label: 'IVF & fertility centre', path: '/ivf-fertility' },
                { label: 'Obstetrics & gynaecology', path: '/obstetrics-gynaecology' },
                { label: 'Maternity care', path: '/maternity' },
                { label: 'All departments', path: '/departments' },
              ].map((link) => (
                <li key={link.path}>
                  <button onClick={() => handleNav(link.path)} className={linkClass}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hours card */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-sans text-sm font-semibold text-white">Enquiries &amp; timings</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-brand-300">Hospital services</dt>
                <dd className="mt-0.5 text-brand-200/75">
                  {HOSPITAL_DATA.operatingHours.hospitalServices}
                </dd>
              </div>
              <div>
                <dt className="text-brand-300">Outpatient consultations</dt>
                <dd className="mt-0.5 text-brand-200/75">
                  {HOSPITAL_DATA.operatingHours.opdConsultations}
                </dd>
              </div>
              <div>
                <dt className="text-brand-300">Emergency casualty</dt>
                <dd className="mt-0.5 text-brand-200/75">
                  {HOSPITAL_DATA.operatingHours.emergencyCasualty}
                </dd>
              </div>
            </dl>

            <button
              onClick={() => onOpenAppointmentModal()}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-900 transition-colors duration-300 hover:bg-brand-50"
            >
              Request a consultation
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>

      {/* --- Disclaimer + legal --- */}
      <div className="relative z-10 border-t border-white/10">
        <Container width="wide">
          <div className="py-8">
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
              <p className="text-[0.8125rem] leading-relaxed text-brand-200/60">
                <strong className="font-semibold text-brand-200/90">
                  Medical disclaimer &amp; institutional transparency:
                </strong>{' '}
                Content on this website is general informational and educational guidance. It does
                not replace individualised clinical evaluation by a qualified medical practitioner.
                Lailas Hospital and IVF Centre operates in Chemmad, Kerala under the entity Lailas
                Health Care Limited (formal relationship and the reported 1994 founding milestone
                remain subject to ongoing operational confirmation with management). In a medical
                emergency, visit casualty directly or call{' '}
                <a
                  href={`tel:${primaryPhone.tel}`}
                  className="tabular-numbers inline-flex min-h-11 items-center font-medium text-white underline decoration-white/30 underline-offset-2"
                >
                  {primaryPhone.display}
                </a>
                .
              </p>
            </div>

            <div className="mt-7 flex flex-col items-center justify-between gap-4 text-[0.8125rem] text-brand-200/50 sm:flex-row">
              <p>
                &copy; {new Date().getFullYear()} Lailas Hospital and IVF Centre. All rights
                reserved.
              </p>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => handleNav('/privacy')}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                >
                  Privacy &amp; data practices
                </button>
                <button
                  onClick={() => handleNav('/contact')}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                >
                  Contact hospital
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};
