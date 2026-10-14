/**
 * Lailas Hospital & IVF Centre: single source of facts for the website.
 *
 * Everything here was taken from the existing site: `src/data/hospitalData.ts`,
 * the page components, CONTENT.md and the newer compiled build
 * (`lailas_hospital_2026.html`). Nothing has been added.
 *
 * Items marked `// Q<n>` have an open question in OPEN_QUESTIONS.md at the
 * repo root. They stay as they are until the hospital confirms them.
 *
 * Times use 24h "HH:MM" strings and day numbers (0 = Sunday ... 6 = Saturday)
 * so the UI can format them for English or Malayalam without dashes in copy.
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface TimeWindow {
  days: Weekday[];
  open: string;
  close: string;
}

export interface Phone {
  display: string;
  tel: string;
  label: string;
}

export type ServiceGroup = 'women' | 'children' | 'emergency' | 'diagnostics';

export interface Service {
  id: string;
  name: string;
  group: ServiceGroup;
  /** Short factual summary from the existing site. Copy is rewritten later. */
  summary: string;
  offerings: string[];
  availability: string;
  /** Keywords patients may type; used for booking and search. */
  keywords: string[];
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  focus: string;
  bio: string;
  serviceIds: string[];
  languages: string[];
  opd: TimeWindow;
  /** Set once a real portrait exists in src/content/images.ts. */
  photoId?: string;
}

export interface Faq {
  id: string;
  topic: 'general' | 'maternity' | 'ivf' | 'gynaecology';
  question: string;
  answer: string;
}

export interface IvfStep {
  title: string;
  summary: string;
  details: string[];
}

export interface PregnancyStage {
  id: 'first' | 'second' | 'third';
  fromWeek: number;
  toWeek: number;
  name: string;
  focus: string;
  summary: string;
  care: string[];
}

export interface Route {
  from: string;
  distanceKm: number;
  driveMinutes: number;
  directions: string;
}

/* -------------------------------------------------------------------------- */
/* Feature flags: sections without verified data stay hidden                   */
/* -------------------------------------------------------------------------- */

export const flags = {
  /** Only sample quotes exist. Turn on when real, consented feedback is added. */
  showTestimonials: false,
  /** No accreditation has documentary proof yet (all were `confirmed: false`). */
  showAccreditations: false,
  /** Lab reports and prescriptions were sample data; there is no records system. */
  showPatientPortal: false,
  /** Health articles have no named author or medical reviewer. */
  showArticles: false,
  /** Video consultation is mentioned once in an FAQ only. Q14 */
  showVideoConsultation: false,
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
  founder: 'Dr. Laila Beegum N', // Q6
  website: 'https://lailashospital.com', // Q15
  email: 'care@lailashospital.com', // Q15
} as const;

/** The only headline figures allowed on the site. */
export const facts = {
  deliveries: { value: 70000, display: '70,000+', label: 'babies delivered' },
  since: { value: 1994, label: 'caring for Chemmad since' },
  yearsOfService: { value: 30, display: '30+', label: 'years of care' },
  allDay: { display: '24/7', label: 'emergency, lab and pharmacy' },
  firstUltrasound: { value: 1996, label: 'first ultrasound facility in the locality' },
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
  landlines: [
    { display: '0494 2463377', tel: '+914942463377', label: 'Reception' },
    { display: '0494 2464193', tel: '+914942464193', label: 'OPD and appointments' },
    { display: '0494 2953377', tel: '+914942953377', label: 'Helpdesk' },
  ] satisfies Phone[], // Q2
  email: hospital.email,
} as const;

export const address = {
  building: 'Laila Plaza',
  street: 'Kozhikode Road (Thalappara Road)', // Q18
  town: 'Chemmad',
  postOffice: 'Tirurangadi P.O.',
  district: 'Malappuram District',
  state: 'Kerala',
  pincode: '676306',
  landmark: 'Near Chemmad Town Junction',
  plusCode: '2WV6+7JH',
  geo: { lat: 11.0421, lng: 75.9221 }, // Q16
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Lailas+Hospital+Chemmad+Kerala+676306',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Lailas+Hospital+Chemmad+Malappuram+Kerala+676306&output=embed',
} as const;

export const hours = {
  /** Emergency, casualty, labour room, laboratory and pharmacy. */
  allDay: { days: [0, 1, 2, 3, 4, 5, 6], open: '00:00', close: '23:59' } as TimeWindow,
  /** Specialist OPD. The Contact page said 17:00; everything else says 19:00. Q1 */
  opd: { days: [1, 2, 3, 4, 5, 6], open: '09:00', close: '19:00' } as TimeWindow,
  /** Slots offered by the old booking form. */
  bookingSlots: [
    { id: 'morning', open: '09:30', close: '13:00' },
    { id: 'afternoon', open: '14:00', close: '17:00' },
    { id: 'evening', open: '17:00', close: '19:00' },
  ],
} as const;

export const access = {
  parking:
    'Dedicated hospital parking on the Kozhikode-Thalappara Road, with easy access to the emergency bay and main OPD block.',
  wheelchair:
    'Wheelchair-accessible entrances and direct ground-floor access to casualty, laboratory and pharmacy.',
  routes: [
    { from: 'Tirurangadi Town', distanceKm: 2, driveMinutes: 5, directions: 'Along the main Chemmad-Tirurangadi Road to Laila Plaza.' },
    { from: 'NH 66 (Thalappara Junction)', distanceKm: 4, driveMinutes: 8, directions: 'Turn onto Kozhikode-Thalappara Road towards Chemmad Town Junction.' },
    { from: 'Parappanangadi Railway Station', distanceKm: 8, driveMinutes: 15, directions: 'Frequent buses and auto-rickshaws run to Chemmad.' },
    { from: 'Calicut International Airport (CCJ)', distanceKm: 22, driveMinutes: 35, directions: 'Via Kondotty and Thenhipalam.' },
  ] satisfies Route[], // Q17
} as const;

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

export const services: Service[] = [
  {
    id: 'maternity',
    name: 'Maternity and deliveries',
    group: 'women',
    summary:
      'Antenatal to postnatal care focused on safe, ethical normal deliveries and high-risk pregnancy care.',
    offerings: [
      'Normal and high-risk pregnancy care',
      '24/7 labour suites with fetal monitoring',
      'Antenatal classes and postpartum support', // Q13
      'Painless labour options', // Q13
      'Fetal ultrasound scanning',
    ],
    availability: 'Labour room and inpatient care, 24/7',
    keywords: ['pregnant', 'pregnancy', 'antenatal', 'labour', 'delivery', 'postnatal', 'scan', 'normal delivery', 'c section', 'breastfeeding'],
  },
  {
    id: 'ivf',
    name: 'IVF and fertility',
    group: 'women',
    summary:
      'Private, affordable fertility care, from first tests to IUI and IVF.',
    offerings: [
      'Fertility tests for both partners',
      'Hormone tests and follicular ultrasound',
      'Ovulation support and IUI',
      'IVF and ICSI', // Q13
      'Embryo freezing', // Q13
    ],
    availability: 'Private appointments, Monday to Saturday',
    keywords: ['ivf', 'icsi', 'iui', 'infertility', 'conceive', 'cannot get pregnant', 'sperm', 'ovulation', 'fertility test'],
  },
  {
    id: 'gynaecology',
    name: 'Gynaecology and laparoscopy',
    group: 'women',
    summary:
      'Care for women at every age, including keyhole (laparoscopic) surgery.',
    offerings: [
      'Check-ups and screening',
      'Period problems and PCOS',
      'Laparoscopic (keyhole) surgery', // Q13
      'Fibroids, cysts and pelvic health',
      'Menopause care',
    ],
    availability: 'OPD, Monday to Saturday',
    keywords: ['periods', 'irregular periods', 'pcos', 'pcod', 'white discharge', 'pelvic pain', 'fibroid', 'cyst', 'menopause', 'laparoscopy'],
  },
  {
    id: 'paediatrics',
    name: 'Children and newborns',
    group: 'children',
    summary:
      'Newborn care, feeding support, vaccines and care for growing children.',
    offerings: [
      'Newborn and neonatal intensive care', // Q13
      'Breastfeeding and nutrition guidance',
      'Childhood vaccinations',
      'Breathing and chest care for children',
      'Growth and development checks',
    ],
    availability: 'OPD Monday to Saturday, newborn care 24/7', // Q25
    keywords: ['child', 'baby', 'infant', 'newborn', 'vaccination', 'immunisation', 'fever in child', 'growth', 'neonatal'],
  },
  {
    id: 'general-medicine',
    name: 'General and family medicine',
    group: 'children',
    summary:
      'Everyday illness, diabetes and blood pressure care, health check-ups and palliative care.',
    offerings: [
      'Fever and everyday illness',
      'Diabetes and blood pressure care',
      'Health check-ups',
      'Palliative care',
    ],
    availability: 'OPD, Monday to Saturday',
    keywords: ['fever', 'cough', 'cold', 'diabetes', 'sugar', 'blood pressure', 'thyroid', 'checkup', 'palliative'],
  },
  {
    id: 'emergency',
    name: 'Emergency and casualty',
    group: 'emergency',
    summary:
      'Casualty, labour room, laboratory and pharmacy open day and night, including Sundays and holidays.',
    offerings: [
      'Immediate assessment',
      'Emergency obstetrics and labour room',
      'Duty doctors, obstetric nurses, lab staff and pharmacists on site 24/7',
      'Observation beds', // Q13
    ],
    availability: '24 hours, 7 days',
    keywords: ['emergency', 'accident', 'injury', 'bleeding', 'urgent', 'casualty', 'labour pain'],
  },
  {
    id: 'laboratory',
    name: 'Laboratory and ultrasound',
    group: 'diagnostics',
    summary:
      'Blood tests and scans day and night. Home of the first ultrasound facility in the locality, since 1996.',
    offerings: [
      'Blood counts and pathology', // Q13 ("automated")
      'Hormone and biochemistry tests',
      'Ultrasound scans',
      'Pregnancy and follicular scans',
    ],
    availability: 'Open 24 hours',
    keywords: ['blood test', 'scan', 'report', 'sugar test', 'thyroid test', 'urine test', 'lab', 'ultrasound', 'sonography'],
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    group: 'diagnostics',
    summary:
      'Prescribed medicines plus mother, baby and emergency supplies, open around the clock.',
    offerings: [
      'Prescription medicines',
      'Mother and newborn supplies',
      'Emergency medicines',
      'Advice on how to take your medicines',
    ],
    availability: 'Open 24 hours',
    keywords: ['medicine', 'tablet', 'pharmacy', 'prescription', 'refill'],
  },
];

/* -------------------------------------------------------------------------- */
/* Doctors                                                                     */
/* -------------------------------------------------------------------------- */

const MON_SAT: Weekday[] = [1, 2, 3, 4, 5, 6]; // Q11

export const doctors: Doctor[] = [
  {
    id: 'laila-beegum',
    name: 'Dr. Laila Beegum N',
    role: 'Chief Consultant and Founder', // Q6
    qualifications: 'MBBS, DGO',
    focus: 'Obstetrics, gynaecology and fertility', // Q8
    bio: 'Over three decades of maternity care in Chemmad, with a focus on safe normal deliveries, high-risk pregnancies and fertility care.',
    serviceIds: ['maternity', 'gynaecology', 'ivf'],
    languages: ['English', 'Malayalam', 'Tamil'], // Q10
    opd: { days: MON_SAT, open: '10:00', close: '19:00' },
  },
  {
    id: 'geethanjali-s',
    name: 'Dr. Geethanjali S',
    role: 'Senior Consultant',
    qualifications: 'MBBS, DGO',
    focus: 'Obstetrics and gynaecology',
    bio: 'Antenatal care, gynaecological surgery, PCOS and period problems, and labour room care.',
    serviceIds: ['maternity', 'gynaecology'],
    languages: ['English', 'Malayalam'],
    opd: { days: MON_SAT, open: '09:30', close: '17:30' },
  },
  {
    id: 'amith-k',
    name: 'Dr. Amith K',
    role: 'Consultant Paediatrician',
    qualifications: 'MBBS, MD (Paediatrics)',
    focus: 'Newborns, infants and children',
    bio: 'Newborn care, feeding and breastfeeding support, vaccinations, and children’s breathing and development.',
    serviceIds: ['paediatrics'],
    languages: ['English', 'Malayalam'],
    opd: { days: MON_SAT, open: '09:30', close: '18:00' },
  },
  {
    id: 'jambir',
    name: 'Dr. Jambir', // Q9
    role: 'Senior General Practitioner',
    qualifications: 'MBBS, BCCPM', // Q9
    focus: 'General and family medicine',
    bio: 'Everyday illness, diabetes and blood pressure care, preventive check-ups and palliative care.',
    serviceIds: ['general-medicine'],
    languages: ['English', 'Malayalam'],
    opd: { days: MON_SAT, open: '09:00', close: '19:00' },
  },
];

/* -------------------------------------------------------------------------- */
/* IVF path (4 steps from the existing site)                                  */
/* -------------------------------------------------------------------------- */

export const ivfSteps: IvfStep[] = [
  {
    title: 'Finding the cause',
    summary:
      'Hormone tests, follicular ultrasound and fertility tests for both partners, without procedures you do not need.',
    details: ['Private history review', 'Hormone profile', 'Follicular ultrasound', 'Semen analysis'],
  },
  {
    title: 'Ovulation support and IUI',
    summary:
      'Natural cycle support, ovulation induction and IUI when it is the right step.',
    details: ['Cycle tracking', 'Ovulation induction', 'Intrauterine insemination (IUI)'],
  },
  {
    title: 'IVF and ICSI',
    summary:
      'Egg collection, ICSI, embryo culture and embryo freezing.', // Q13
    details: ['Egg collection', 'ICSI', 'Blastocyst culture', 'Embryo freezing'],
  },
  {
    title: 'Pregnancy care under the same roof',
    summary:
      'When you conceive, our maternity team cares for you through to delivery.',
    details: ['Antenatal scans', 'High-risk pregnancy care', 'Newborn check by our paediatrician at birth'],
  },
];

/** What to bring to a first fertility visit (from the IVF page). */
export const ivfFirstVisitChecklist = [
  'Ultrasound or pelvic scan reports from the last 12 months',
  'Earlier blood test reports (thyroid, prolactin, hormone tests)',
  'Any surgery or laparoscopy summaries',
  'Semen analysis reports, if done before',
];

/** Ethics statement on the existing IVF page. Keep its meaning. */
export const ivfEthics =
  'We do not publish success-rate promises. Results depend on each couple, and your doctor will explain your options honestly.';

/* -------------------------------------------------------------------------- */
/* Pregnancy week tool (from the compiled 2026 build)                          */
/* -------------------------------------------------------------------------- */

export const pregnancy = {
  totalWeeks: 40,
  defaultWeek: 12,
  milestones: [
    { week: 7, label: 'First scan' },
    { week: 12, label: 'NT scan' },
    { week: 20, label: 'Anomaly scan' },
    { week: 32, label: 'Growth scan' },
    { week: 37, label: 'Ready for birth' },
  ],
  stages: [
    {
      id: 'first',
      fromWeek: 1,
      toWeek: 13,
      name: 'First trimester',
      focus: 'Early care and dating',
      summary:
        'Confirm the pregnancy, date it with an ultrasound, start folic acid and do the first blood tests.',
      care: [
        'Early viability and dating scan (6 to 9 weeks)',
        'First blood tests, thyroid and sugar check',
        'Food advice and help with morning sickness',
      ],
    },
    {
      id: 'second',
      fromWeek: 14,
      toWeek: 27,
      name: 'Second trimester',
      focus: 'Baby’s growth and anomaly scan',
      summary:
        'A detailed scan of your baby, iron and calcium, blood pressure checks and a sugar test for pregnancy diabetes.',
      care: [
        'Detailed anomaly and growth scan (18 to 22 weeks)',
        'Iron, calcium and blood pressure checks',
        'Antenatal classes and posture advice',
      ],
    },
    {
      id: 'third',
      fromWeek: 28,
      toWeek: 40,
      name: 'Third trimester',
      focus: 'Getting ready for birth',
      summary:
        'Regular checks on your baby, planning for a normal delivery, a talk about painless labour, and a labour room ready day and night.',
      care: [
        'Growth, Doppler and wellbeing scans, with CTG monitoring',
        'Normal delivery planning and painless labour advice',
        'Admission any time, and our paediatrician ready for your baby',
      ],
    },
  ] satisfies PregnancyStage[],
  disclaimer:
    'This guide is for general information only. Your doctor will plan your scans and tests for your own pregnancy.',
} as const;

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

export const faqs: Faq[] = [
  {
    id: 'booking',
    topic: 'general',
    question: 'How do I book an appointment or an IVF consultation?',
    answer:
      'Message us on WhatsApp at +91 8606 800 999, call reception on 0494 2463377 or 0494 2464193, or use the booking form on this website. Fertility enquiries are kept private.',
  },
  {
    id: 'sundays',
    topic: 'general',
    question: 'Are emergency, pharmacy and lab open on Sundays?',
    answer:
      'Yes. Casualty, the labour room, the laboratory and the pharmacy are open 24 hours a day, every day, including Sundays and public holidays.',
  },
  {
    id: 'ivf-when',
    topic: 'ivf',
    question: 'When should we visit the fertility centre?',
    answer:
      'If you have been trying for a baby for over a year, or six months if the woman is over 35. Also if periods are irregular, you have PCOS, or you have had a pregnancy loss. Private appointments are Monday to Saturday.',
  },
  {
    id: 'first-antenatal',
    topic: 'maternity',
    question: 'When should I have my first pregnancy check-up?',
    answer:
      'As soon as your home pregnancy test is positive, usually 6 to 8 weeks after the first day of your last period.',
  },
  {
    id: 'pregnancy-emergency',
    topic: 'maternity',
    question: 'Do you give emergency care to pregnant women?',
    answer:
      'Yes, day and night. For anything urgent, please call +91 8606 800 999 before you leave home so we are ready for you.',
  },
  {
    id: 'referral',
    topic: 'gynaecology',
    question: 'Do I need a referral to see a gynaecologist?',
    answer:
      'No. You can book a gynaecology visit directly for check-ups, period problems or screening.',
  },
  {
    id: 'parking',
    topic: 'general',
    question: 'Is there parking at the hospital?',
    answer:
      'Yes. We have our own wheelchair-accessible parking on the Kozhikode-Thalappara Road, close to the emergency entrance and the OPD.',
  },
  // Video consultation FAQ held back until confirmed. Q14
];

/* -------------------------------------------------------------------------- */
/* Booking (WhatsApp is the existing channel)                                  */
/* -------------------------------------------------------------------------- */

export const booking = {
  channel: 'whatsapp' as const,
  /** Optional form endpoint, read from VITE_BOOKING_ENDPOINT at build time. Q27 */
  endpointEnv: 'VITE_BOOKING_ENDPOINT',
  privacyNote:
    'We only use your name and phone number to arrange your visit. We never ask for medical details here.',
  whatsappMessages: {
    general: 'Hello Lailas Hospital & IVF Centre, I would like to book an appointment.',
    fertility: 'Hello Lailas IVF Centre, I would like to speak privately with a fertility coordinator.',
  },
} as const;

/** Phrases that must send people to a phone call instead of booking. */
export const emergencyKeywords = [
  'unconscious', 'severe bleeding', 'bleeding heavily', 'not breathing', 'no pulse',
  'heart attack', 'stroke', 'seizure now', 'accident', 'collapsed', 'overdose',
  'poison', 'severe chest pain', 'labour bleeding', 'suicid',
];

/* -------------------------------------------------------------------------- */
/* Malayalam strings already used on the 2026 build                           */
/* Full i18n dictionaries are built in a later step. Q19                       */
/* -------------------------------------------------------------------------- */

export const malayalamExisting = {
  hospitalName: 'ലൈലാസ് ഹോസ്പിറ്റൽ & ഐ.വി.എഫ് സെന്റർ, ചെമ്മാട്',
  promise: 'കാരുണ്യത്തോടെയുള്ള പരിചരണം • സുരക്ഷിത മാതൃത്വം',
} as const;
