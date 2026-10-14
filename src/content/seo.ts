/**
 * Head tags and structured data for each prerendered page (English).
 * Used by tools/prerender.mjs through src/entry-server.tsx.
 */
import { en } from './copy/en';
import { address, contact, doctors, faqs, hospital, pageFaqs, type FaqId } from './site';

export const siteUrl = hospital.website;

type MetaKey = 'home' | 'maternity' | 'ivf' | 'doctors' | 'contact' | 'privacy';

export const pages: { path: string; key: MetaKey; priority: number; changefreq: string }[] = [
  { path: '/', key: 'home', priority: 1.0, changefreq: 'weekly' },
  { path: '/maternity', key: 'maternity', priority: 0.9, changefreq: 'monthly' },
  { path: '/ivf', key: 'ivf', priority: 0.9, changefreq: 'monthly' },
  { path: '/doctors', key: 'doctors', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact', key: 'contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/privacy', key: 'privacy', priority: 0.3, changefreq: 'yearly' },
];

const hospitalId = `${siteUrl}/#hospital`;
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const specialtyFor: Record<string, string[]> = {
  maternity: ['Obstetric'],
  gynaecology: ['Gynecologic'],
  ivf: ['Gynecologic'],
  paediatrics: ['Pediatric'],
  'general-medicine': ['PrimaryCare'],
};

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: address.streetAddress,
  addressLocality: `${address.locality}, ${address.postOffice}`,
  addressRegion: address.region,
  postalCode: address.postalCode,
  addressCountry: address.country,
};

function hospitalLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Hospital',
    '@id': hospitalId,
    name: hospital.name,
    alternateName: 'Lailas Hospital Chemmad',
    slogan: hospital.tagline,
    url: siteUrl,
    logo: `${siteUrl}/icon-512.png`,
    image: `${siteUrl}/og.jpg`,
    telephone: contact.primary.tel,
    email: contact.email,
    foundingDate: String(hospital.founded),
    address: postalAddress,
    geo: { '@type': 'GeoCoordinates', latitude: address.geo.lat, longitude: address.geo.lng },
    hasMap: address.mapsUrl,
    isAcceptingNewPatients: true,
    medicalSpecialty: ['Obstetric', 'Gynecologic', 'Pediatric', 'Emergency'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: dayNames,
        opens: '00:00',
        closes: '23:59',
      },
    ],
    contactPoint: [
      { '@type': 'ContactPoint', telephone: contact.primary.tel, contactType: 'emergency', availableLanguage: ['English', 'Malayalam'] },
      ...contact.landlines.map((p, i) => ({
        '@type': 'ContactPoint',
        telephone: p.tel,
        contactType: en.contact.landlineLabels[i],
      })),
    ],
  };
}

function physiciansLd() {
  return doctors.map((d) => ({
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: d.name,
    description: `${en.doctors.profiles[d.id].role}. ${d.qualifications}. ${en.doctors.profiles[d.id].focus}.`,
    medicalSpecialty: [...new Set(d.serviceIds.flatMap((s) => specialtyFor[s] ?? []))],
    knowsLanguage: d.languages.map((l) => en.doctors.languageNames[l]),
    hospitalAffiliation: { '@id': hospitalId },
    telephone: contact.primary.tel,
    address: postalAddress,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: d.opd.days.map((n) => dayNames[n]),
      opens: d.opd.open,
      closes: d.opd.close,
    },
    url: `${siteUrl}/doctors`,
  }));
}

function faqLd(ids: FaqId[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs
      .filter((f) => ids.includes(f.id))
      .map((f) => ({
        '@type': 'Question',
        name: en.faq.items[f.id].q,
        acceptedAnswer: { '@type': 'Answer', text: en.faq.items[f.id].a },
      })),
  };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const ld = (data: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

/** All head tags for a path. Unknown paths get the not-found meta and noindex. */
export function renderHead(path: string) {
  const page = pages.find((p) => p.path === path);
  const meta = page ? en.meta[page.key] : en.meta.notFound;
  const url = `${siteUrl}${path === '/' ? '/' : path}`;
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    page ? `<link rel="canonical" href="${url}" />` : `<meta name="robots" content="noindex" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(en.meta.siteName)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:locale:alternate" content="ml_IN" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${siteUrl}/og.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(`${hospital.shortName}, ${hospital.tagline}`)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    ld(hospitalLd()),
  ];
  if (page?.key === 'doctors') tags.push(...physiciansLd().map(ld));
  if (page && (page.key === 'home' || page.key === 'maternity' || page.key === 'ivf')) tags.push(ld(faqLd(pageFaqs[page.key])));
  return tags.join('\n    ');
}

