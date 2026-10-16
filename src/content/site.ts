/**
 * Lailas Hospital & IVF Centre: facts used by the website.
 *
 * Only language-neutral facts live here (numbers, phones, times, ids, names).
 * Every sentence a visitor reads lives in src/content/copy/en.ts and ml.ts.
 *
 * All facts come from the previous site. Nothing has been added.
 * Items marked `// Q<n>` have an open question in OPEN_QUESTIONS.md.
 *
 * Times are 24h "HH:MM". Days are 0 = Sunday ... 6 = Saturday.
 */

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface TimeWindow {
  days: Weekday[];
  open: string;
  close: string;
}

export type ServiceId =
  | 'maternity'
  | 'ivf'
  | 'gynaecology'
  | 'paediatrics'
  | 'general-medicine'
  | 'emergency'
  | 'laboratory'
  | 'pharmacy';

export type ServiceGroup = 'women' | 'family' | 'emergency' | 'diagnostics';

export interface Service {
  id: ServiceId;
  group: ServiceGroup;
  /** Can be booked as an OPD appointment. Emergency, lab and pharmacy are walk-in. */
  bookable: boolean;
  /** 24/7 service. */
  allDay: boolean;
  imageId: string;
}

export type DoctorId =
  | 'laila-beegum'
  | 'geethanjali-s'
  | 'amith-k'
  | 'jambir'
  | 'v-j-sonia'
  | 'jitha-vineeth'
  | 'sumiya';
export type LanguageCode = 'en' | 'ml' | 'ta';

export interface Doctor {
  id: DoctorId;
  name: string;
  qualifications: string;
  serviceIds: ServiceId[];
  languages: LanguageCode[];
  opd: TimeWindow;
  imageId: string;
}

export type FaqId =
  | 'booking'
  | 'sundays'
  | 'ivf-when'
  | 'first-antenatal'
  | 'pregnancy-emergency'
  | 'referral'
  | 'parking';

export type FaqTopic = 'general' | 'maternity' | 'ivf' | 'gynaecology';

/* -------------------------------------------------------------------------- */
/* Flags: sections without verified data stay hidden                           */
/* -------------------------------------------------------------------------- */

export const flags = {
  /** Only sample quotes existed. Turn on with real, consented feedback. */
  showTestimonials: false,
  /** No accreditation has documentary proof yet. */
  showAccreditations: false,
  /** The old portal used sample data; there is no records system. */
  showPatientPortal: false,
  /** Articles had no named author or medical reviewer. */
  showArticles: false,
  /** Video consultation was mentioned once only. Q14 */
  showVideoConsultation: false,
  /** Travel times are unverified. Q17 */
  showTravelTimes: false,
} as const;

/* -------------------------------------------------------------------------- */
/* Identity                                                                    */
/* -------------------------------------------------------------------------- */

export const hospital = {
  name: 'Lailas Hospital and IVF Centre',
  shortName: 'Lailas Hospital',
  legalEntity: 'Lailas Health Care Limited', // Q7
  tagline: 'Humane Care; Divine Cure',
  founded: 1994, // Q4
  firstUltrasoundYear: 1996, // Q5
  website: 'https://lailashospital.com', // Q15
  email: 'info@lailashospital.com', // Q15
} as const;

/** The only headline figures allowed on the site. */
export const facts = {
  deliveries: 70000,
  founded: hospital.founded,
  yearsOfService: 30,
  firstUltrasoundYear: hospital.firstUltrasoundYear,
} as const;

/* -------------------------------------------------------------------------- */
/* Contact                                                                     */
/* -------------------------------------------------------------------------- */

export const contact = {
  /** One number for emergency, appointments and WhatsApp. Q3 */
  primary: {
    display: '+91 8606 800 999',
    tel: '+918606800999',
    whatsapp: '918606800999',
  },
  /** Labels live in copy (contact.landlineLabels), same order. Q2 */
  landlines: [
    { display: '0494 2463377', tel: '+914942463377' },
    { display: '0494 2464193', tel: '+914942464193' },
    { display: '0494 2953377', tel: '+914942953377' },
  ],
  email: hospital.email,
} as const;

export const address = {
  postalLines: [
    'Laila Plaza, Kozhikode Road (Thalappara Road)', // Q18
    'Tirurangadi P.O., Chemmad',
    'Malappuram District, Kerala 676306',
  ],
  streetAddress: 'Laila Plaza, Kozhikode Road (Thalappara Road)',
  locality: 'Chemmad',
  postOffice: 'Tirurangadi P.O.',
  district: 'Malappuram',
  region: 'Kerala',
  postalCode: '676306',
  country: 'IN',
  plusCode: '7J3Q2WV6+9G', // full code; decodes to the coordinates below
  geo: { lat: 11.0434, lng: 75.91134 }, // Q16
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Lailas+Hospital+Chemmad+Kerala+676306',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Lailas+Hospital+Chemmad+Kerala+676306',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Lailas+Hospital+Chemmad+Malappuram+Kerala+676306&output=embed',
} as const;

const ALL_DAYS: Weekday[] = [0, 1, 2, 3, 4, 5, 6];
const MON_SAT: Weekday[] = [1, 2, 3, 4, 5, 6]; // Q11

export const hours = {
  /** Emergency, casualty, labour room, laboratory and pharmacy. */
  allDay: { days: ALL_DAYS, open: '00:00', close: '24:00' } satisfies TimeWindow,
  /** Specialist OPD. The old Contact page said 17:00. Q1 */
  opd: { days: MON_SAT, open: '09:00', close: '19:00' } satisfies TimeWindow,
} as const;

/** Distances from the old travel guide. Shown only with flags.showTravelTimes. Q17 */
export const routes = [
  { id: 'tirurangadi', km: 2, minutes: 5 },
  { id: 'nh66', km: 4, minutes: 8 },
  { id: 'railway', km: 8, minutes: 15 },
  { id: 'airport', km: 22, minutes: 35 },
] as const;

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

export const services: Service[] = [
  { id: 'maternity', group: 'women', bookable: true, allDay: true, imageId: 'service-maternity' },
  { id: 'ivf', group: 'women', bookable: true, allDay: false, imageId: 'service-ivf' },
  { id: 'gynaecology', group: 'women', bookable: true, allDay: false, imageId: 'service-gynaecology' },
  { id: 'paediatrics', group: 'family', bookable: true, allDay: false, imageId: 'service-paediatrics' },
  { id: 'general-medicine', group: 'family', bookable: true, allDay: false, imageId: 'service-general' },
  { id: 'emergency', group: 'emergency', bookable: false, allDay: true, imageId: 'service-emergency' },
  { id: 'laboratory', group: 'diagnostics', bookable: false, allDay: true, imageId: 'service-laboratory' },
  { id: 'pharmacy', group: 'diagnostics', bookable: false, allDay: true, imageId: 'service-pharmacy' },
];

export const serviceGroups: ServiceGroup[] = ['women', 'family', 'emergency', 'diagnostics'];

/* -------------------------------------------------------------------------- */
/* Doctors                                                                     */
/* -------------------------------------------------------------------------- */

export const doctors: Doctor[] = [
  {
    id: 'laila-beegum',
    name: 'Dr. Laila Beegum N',
    qualifications: 'MBBS, DGO',
    serviceIds: ['maternity', 'gynaecology', 'ivf'],
    languages: ['en', 'ml', 'ta'], // Q10
    opd: { days: MON_SAT, open: '10:00', close: '19:00' },
    imageId: 'doctor-laila-beegum',
  },
  {
    id: 'geethanjali-s',
    name: 'Dr. Geethanjali S',
    qualifications: 'MBBS, DGO',
    serviceIds: ['maternity', 'gynaecology'],
    languages: ['en', 'ml'],
    opd: { days: MON_SAT, open: '09:30', close: '17:30' },
    imageId: 'doctor-geethanjali-s',
  },
  {
    id: 'amith-k',
    name: 'Dr. Amith K',
    qualifications: 'MBBS, MD (Paediatrics)',
    serviceIds: ['paediatrics'],
    languages: ['en', 'ml'],
    opd: { days: MON_SAT, open: '09:30', close: '18:00' },
    imageId: 'doctor-amith-k',
  },
  {
    id: 'jambir',
    name: 'Dr. Jambir', // Q9
    qualifications: 'MBBS, BCCPM', // Q9
    serviceIds: ['general-medicine'],
    languages: ['en', 'ml'],
    opd: { days: MON_SAT, open: '09:00', close: '19:00' },
    imageId: 'doctor-jambir',
  },
  {
    id: 'v-j-sonia',
    name: 'Dr. V. J. Sonia',
    qualifications: 'MBBS, DGO, MS (Obstetrics and Gynaecology), FMAS',
    serviceIds: ['maternity', 'gynaecology'],
    languages: ['en', 'ml'],
    opd: { days: MON_SAT, open: '09:00', close: '19:00' }, // hospital OPD window, not confirmed per doctor
    imageId: 'doctor-v-j-sonia',
  },
  {
    id: 'jitha-vineeth',
    name: 'Dr. Jitha Vineeth',
    qualifications:
      'MBBS, DGO, Clinical Embryology (ARMC), Advanced Diploma in ART and Reproductive Medicine (Kiel)',
    serviceIds: ['ivf', 'gynaecology'],
    languages: ['en', 'ml'],
    opd: { days: MON_SAT, open: '09:00', close: '19:00' }, // hospital OPD window, not confirmed per doctor
    imageId: 'doctor-jitha-vineeth',
  },
  {
    id: 'sumiya',
    name: 'Dr. Sumiya',
    qualifications: 'MBBS, MD, DNB (Radiodiagnosis), Fellowship in Fetal Medicine',
    serviceIds: ['gynaecology'],
    languages: ['en', 'ml'],
    opd: { days: MON_SAT, open: '09:00', close: '19:00' }, // hospital OPD window, not confirmed per doctor
    imageId: 'doctor-sumiya',
  },
];

/* -------------------------------------------------------------------------- */
/* FAQ order and topics (wording in copy)                                      */
/* -------------------------------------------------------------------------- */

export const faqs: { id: FaqId; topic: FaqTopic }[] = [
  { id: 'booking', topic: 'general' },
  { id: 'sundays', topic: 'general' },
  { id: 'first-antenatal', topic: 'maternity' },
  { id: 'pregnancy-emergency', topic: 'maternity' },
  { id: 'ivf-when', topic: 'ivf' },
  { id: 'referral', topic: 'gynaecology' },
  { id: 'parking', topic: 'general' },
];

/** Which questions each page shows. Also used for FAQPage structured data. */
export const pageFaqs: Record<'home' | 'maternity' | 'ivf', FaqId[]> = {
  home: faqs.map((f) => f.id),
  maternity: ['first-antenatal', 'pregnancy-emergency', 'sundays', 'parking'],
  ivf: ['ivf-when', 'booking', 'referral'],
};

/* -------------------------------------------------------------------------- */
/* Pregnancy week tool                                                         */
/* -------------------------------------------------------------------------- */

export const pregnancy = {
  minWeek: 4,
  maxWeek: 40,
  defaultWeek: 12,
  /** Due window shown as due date plus or minus this many days. */
  windowDays: 7,
  stages: [
    { id: 'first', fromWeek: 1, toWeek: 13 },
    { id: 'second', fromWeek: 14, toWeek: 27 },
    { id: 'third', fromWeek: 28, toWeek: 40 },
  ],
  milestones: [
    { id: 'first-scan', week: 7 },
    { id: 'nt-scan', week: 12 },
    { id: 'anomaly-scan', week: 20 },
    { id: 'growth-scan', week: 32 },
    { id: 'birth-ready', week: 37 },
  ],
} as const;

export type PregnancyStageId = (typeof pregnancy.stages)[number]['id'];
export type MilestoneId = (typeof pregnancy.milestones)[number]['id'];

/* -------------------------------------------------------------------------- */
/* Booking                                                                     */
/* -------------------------------------------------------------------------- */

export const booking = {
  /** Optional form endpoint. Without it, bookings open WhatsApp. Q27 */
  endpoint: (import.meta.env.VITE_BOOKING_ENDPOINT as string | undefined) || undefined,
  /** How many upcoming OPD days to offer. */
  daysAhead: 7,
} as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${contact.primary.whatsapp}?text=${encodeURIComponent(message)}`;

export const getService = (id: ServiceId) => services.find((s) => s.id === id)!;
export const getDoctor = (id: DoctorId) => doctors.find((d) => d.id === id)!;
export const doctorsFor = (serviceId: ServiceId) =>
  doctors.filter((d) => d.serviceIds.includes(serviceId));

/** A doctors-page group may span more than one service. */
export const doctorsForAny = (serviceIds: ServiceId[]) =>
  doctors.filter((d) => d.serviceIds.some((s) => serviceIds.includes(s)));
