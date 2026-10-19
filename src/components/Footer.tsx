import { Link } from 'react-router';
import { address, contact, hours } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { formatDays, formatHours } from '../lib/format';
import { Container } from './Container';
import { Logo } from './Logo';
import { mainNav } from './navItems';

export function Footer() {
  const copy = useCopy();
  const year = new Date().getFullYear();
  /* Column headings get a hairline so four same-sized columns still read as
     distinct groups rather than one block of text. */
  const heading = 't-label border-b border-teal-800 pb-3 !text-teal-200';
  const link = 'text-teal-100 underline-offset-4 hover:text-ivory hover:underline';
  return (
    <footer className="bg-teal-950 text-teal-100">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo light className="h-16" />
          <p className="mt-6 max-w-sm">{copy.footer.about}</p>
        </div>
        <div className="lg:col-span-3">
          <div className={heading}>{copy.footer.visitTitle}</div>
          <address className="mt-4 not-italic">
            {address.postalLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <a href={address.directionsUrl} target="_blank" rel="noopener noreferrer" className={`${link} mt-3 inline-flex min-h-12 items-center`}>
            {copy.actions.directions}
          </a>
          <p className="mt-5">
            <span className="block text-ivory">{copy.visit.hours.allDay}</span>
            {copy.time.open24EveryDay}
          </p>
          <p className="mt-3">
            <span className="block text-ivory">{copy.visit.hours.opd}</span>
            {formatDays(hours.opd.days, copy)}, {formatHours(hours.opd, copy)}
          </p>
        </div>
        <div className="lg:col-span-3">
          <div className={heading}>{copy.footer.callTitle}</div>
          {/* Number on its own line, purpose underneath. Inline labels collided
              with the numbers and wrapped awkwardly at this column width. */}
          <ul className="mt-4 space-y-3">
            <li>
              <a href={`tel:${contact.primary.tel}`} className={`${link} inline-flex min-h-11 items-center font-semibold text-ivory tabular-nums`}>
                {contact.primary.display}
              </a>
              <span className="block t-small">{copy.contact.primaryLabel}</span>
            </li>
            {contact.landlines.map((p, i) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className={`${link} inline-flex min-h-11 items-center tabular-nums`}>
                  {p.display}
                </a>
                <span className="block t-small">{copy.contact.landlineLabels[i]}</span>
              </li>
            ))}
            <li>
              <a href={`mailto:${contact.email}`} className={`${link} inline-flex min-h-11 items-center`}>
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
        <nav aria-label={copy.a11y.footerNav} className="lg:col-span-2">
          <div className={heading}>{copy.footer.pagesTitle}</div>
          <ul className="mt-4">
            {mainNav.map((item) => (
              <li key={item.key}>
                <Link to={item.to} className={`${link} inline-flex min-h-11 items-center`}>
                  {copy.nav[item.key]}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/privacy" className={`${link} inline-flex min-h-11 items-center`}>
                {copy.nav.privacy}
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
      <div className="border-t border-teal-800">
        <Container className="flex flex-col gap-3 py-6 t-meta text-teal-200 md:flex-row md:justify-between">
          <p>{copy.footer.legal(year)}</p>
          <p className="max-w-[34rem] md:text-right">{copy.footer.disclaimer}</p>
        </Container>
      </div>
    </footer>
  );
}
