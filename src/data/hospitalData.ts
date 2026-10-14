/**
 * Central data layer for Lailas Hospital & IVF Centre, Chemmad, Kerala.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * IMPORTANT — VERIFICATION FLAGS
 * ─────────────────────────────────────────────────────────────────────────────
 * Anything NOT confirmed by hospital administration carries `verified: false`
 * (or, for doctors, `isVerifiedPlaceholder: true`). The UI renders a
 * "Pending confirmation" badge for those entries, so the site never silently
 * asserts a service the hospital may not actually provide.
 *
 * To publish something as confirmed: set the flag to `true` and remove the
 * `pendingNote`. To hide a speciality from online booking while still listing
 * it, set `comingSoon: true`.
 *
 * MANAGEMENT TODO BEFORE GO-LIVE
 *   • Confirm every `verified: false` speciality and switch it on/off.
 *   • Confirm the reported 1994 founding milestone and the legal-entity wording.
 *   • Confirm doctor qualifications, registration numbers and consultation days.
 *   • Replace the placeholder TESTIMONIALS with consented real feedback, or delete.
 *   • Confirm every ACCREDITATION before publishing the accreditation strip.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ========================================================================== */
/* CORE TYPES                                                                  */
/* ========================================================================== */

export interface DoctorProfile {
  id: string;
  name: string;
  designation: string;
  qualifications: string;
  specialty: string;
  /** Speciality ids this clinician consults for — drives search and booking. */
  specialityIds: string[];
  experienceNotes: string;
  schedule: string;
  /** Consultation days for the booking wizard. 0 = Sunday … 6 = Saturday. */
  consultingDays: number[];
  languages: string[];
  /** Confirmed OPD window, shown on the profile card. */
  opdTimings: string;
  /** false only where credentials are still with hospital administration. */
  isVerifiedPlaceholder: boolean;
  /** Tailwind gradient classes for the monogram avatar. */
  accent: string;
  /** Filter group used by the doctor directory. */
  category: 'obgyn' | 'pediatrics' | 'general';
}

export interface DepartmentItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  status: 'Core Clinical Focus' | 'Reported Facility';
  availability: string;
  services: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'ivf' | 'maternity' | 'obgyn' | 'general';
}

/* ========================================================================== */
/* HOSPITAL IDENTITY                                                           */
/* ========================================================================== */

export const HOSPITAL_DATA = {
  name: 'Lailas Hospital and IVF Centre',
  shortName: 'Lailas Hospital',
  legalEntity: 'Lailas Health Care Limited',
  tagline: 'Humane Care; Divine Cure',
  establishedYear: '1994',
  /** Reported by the hospital's own material: the area's first ultrasound unit. */
  firstUltrasoundYear: '1996',

  address: {
    building: 'Laila Plaza',
    street: 'Kozhikode Road (Thalappara Road)',
    town: 'Chemmad',
    postOffice: 'Tirurangadi P.O.',
    district: 'Malappuram District',
    state: 'Kerala',
    pincode: '676306',
    fullFormatted:
      'Laila Plaza, Kozhikode Road (Thalappara Road), Tirurangadi P.O., Chemmad, Malappuram District, Kerala — 676306',
    landmark: 'Near Chemmad Town Junction',
    plusCode: '2WV6+7JH',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Lailas+Hospital+Chemmad+Kerala+676306',
    mapEmbedUrl:
      'https://www.google.com/maps?q=Lailas+Hospital+Chemmad+Malappuram+Kerala+676306&output=embed',
  },

  /** Primary booking + emergency line, and the WhatsApp desk. */
  primary: {
    display: '+91 8606 800 999',
    tel: '+918606800999',
    whatsapp: '918606800999',
    label: '24/7 Emergency, Appointments & WhatsApp',
  },

  /** Landlines, in the order the hospital lists them. */
  phones: [
    { display: '0494 2463377', tel: '+914942463377', label: 'Hospital Reception' },
    { display: '0494 2464193', tel: '+914942464193', label: 'OPD & Appointments' },
    { display: '0494 2953377', tel: '+914942953377', label: 'Alternate Helpdesk' },
  ],

  /** Surfaced by the persistent emergency action in the header and footer. */
  emergency: {
    display: '+91 8606 800 999',
    tel: '+918606800999',
    whatsapp: '918606800999',
    label: '24-Hour Emergency & Casualty',
  },

  email: 'care@lailashospital.com',
  website: 'https://lailashospital.com',

  operatingHours: {
    hospitalServices: 'Emergency, Laboratory & Pharmacy open 24 hours, all days',
    /** Widest confirmed window; individual consultants vary — see DOCTORS_DATA. */
    opdConsultations: 'Specialist OPD: Monday – Saturday, 9:00 AM – 7:00 PM',
    emergencyCasualty: '24/7 casualty, labour room, laboratory and in-house pharmacy',
  },

  /** Confirmed headline figures used across the site. */
  metrics: {
    safeBirths: '70,000+',
    yearsOfService: '30+',
    established: '1994',
    emergencies: '24/7',
  },

  missionStatement:
    'To provide compassionate, responsible healthcare that respects every individual’s dignity and supports informed decisions at every stage of life.',
  philosophy:
    'At Lailas Hospital and IVF Centre, we believe that medical excellence is built upon clinical integrity, quiet empathy, and patient dignity. Every patient is treated as an individual, with clear communication and ethical clinical care.',
};

/* ========================================================================== */
/* WHATSAPP BOOKING                                                            */
/* ========================================================================== */

/**
 * WhatsApp is the primary booking channel for this hospital, so every CTA that
 * submits an enquiry opens a pre-filled WhatsApp conversation with reception.
 * Keeping the message construction here means the wording stays consistent and
 * no patient details are ever sent anywhere else.
 */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${HOSPITAL_DATA.primary.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  general: 'Hello Lailas Hospital & IVF Centre, I would like to book an appointment.',
  fertility:
    'Hello Lailas IVF Centre, I would like to speak privately with a fertility coordinator.',
  emergency: 'Hello Lailas Hospital, I need urgent assistance.',
  appointment: (details: {
    name: string;
    phone: string;
    department: string;
    doctor?: string;
    date?: string;
    time?: string;
    mode?: string;
    notes?: string;
  }): string =>
    [
      'Hello Lailas Hospital & IVF Centre, I would like to book an appointment.',
      '',
      `Patient name: ${details.name}`,
      `Phone: ${details.phone}`,
      `Department: ${details.department}`,
      details.doctor ? `Doctor: ${details.doctor}` : null,
      details.date ? `Preferred date: ${details.date}` : null,
      details.time ? `Preferred time: ${details.time}` : null,
      details.mode ? `Visit type: ${details.mode}` : null,
      details.notes ? `Note: ${details.notes}` : null,
    ]
      .filter(Boolean)
      .join('\n'),
};

/* ========================================================================== */
/* DEPARTMENTS & FACILITIES                                                    */
/* ========================================================================== */

export const CORE_DEPARTMENTS: DepartmentItem[] = [
  {
    id: 'maternity-care',
    title: 'Maternity Care & Deliveries',
    shortDesc:
      'Complete antenatal-to-postnatal care built around safe, ethical normal deliveries and high-risk pregnancy management.',
    fullDesc:
      'From your first prenatal scan to postpartum recovery, our maternity service prioritises safe, ethical normal deliveries. We manage high-risk pregnancies, offer painless labour options and fetal ultrasound scanning, and maintain 24/7 modern labour suites with continuous fetal monitoring.',
    status: 'Core Clinical Focus',
    availability: '24/7 Labour Room & Inpatient Care',
    services: [
      'Normal & high-risk pregnancy care',
      '24/7 modern labour suites & fetal monitoring',
      'Antenatal classes & postpartum support',
      'Painless labour options',
      'Fetal ultrasound scanning',
    ],
  },
  {
    id: 'ivf-fertility',
    title: 'IVF & Fertility Centre',
    shortDesc:
      'Personalised, confidential fertility protocols — from first evaluation through to a supported pregnancy.',
    fullDesc:
      'Fertility journeys need patience, privacy and emotional warmth. Our Chemmad IVF centre offers personalised, affordable fertility protocols with complete confidentiality, including hormonal profiling, follicular ultrasound, IUI, and advanced IVF with ICSI.',
    status: 'Core Clinical Focus',
    availability: 'By Confidential Appointment (Mon–Sat)',
    services: [
      'Root-cause fertility evaluation',
      'Hormonal profiling & follicular ultrasound',
      'Guided ovulation & IUI',
      'Advanced IVF & ICSI',
      'Male & female fertility diagnostics',
    ],
  },
  {
    id: 'obstetrics-gynaecology',
    title: 'Gynaecology & Laparoscopy',
    shortDesc:
      'Clinical care for women across adolescence, reproductive years, motherhood and mature health.',
    fullDesc:
      'Comprehensive healthcare tailored to women’s physiological and reproductive health, covering preventive screenings, menstrual and hormonal conditions, and minimally invasive keyhole (laparoscopic) gynaecological surgery.',
    status: 'Core Clinical Focus',
    availability: 'Daily OPD (Mon–Sat)',
    services: [
      'Gynaecological examinations & screenings',
      'Menstrual irregularity & PCOS management',
      'Laparoscopic (keyhole) gynaecological surgery',
      'Fibroid, cyst & pelvic health care',
      'Menopause & mature wellness consultations',
    ],
  },
  {
    id: 'pediatrics',
    title: 'Paediatrics & Neonatology',
    shortDesc:
      'Newborn intensive care, infant nutrition guidance and childhood immunisation under one roof.',
    fullDesc:
      'Attentive medical care for newborns, infants and growing children — newborn intensive care, breastfeeding and nutrition guidance, immunisation schedules, and paediatric respiratory and developmental health.',
    status: 'Core Clinical Focus',
    availability: 'OPD Mon–Sat · Newborn care 24/7',
    services: [
      'Newborn & neonatal intensive care',
      'Infant nutrition & breastfeeding guidance',
      'Childhood immunisation',
      'Paediatric respiratory care',
      'Growth & developmental tracking',
    ],
  },
  {
    id: 'general-medicine',
    title: 'General & Family Medicine',
    shortDesc:
      'Acute consultations, chronic disease management and preventive care for the whole family.',
    fullDesc:
      'Primary medical care for adult health concerns — acute illness, diabetes and blood pressure management, preventive health checks and palliative medicine — for families across Tirurangadi and Malappuram.',
    status: 'Core Clinical Focus',
    availability: 'Daily OPD (Mon–Sat)',
    services: [
      'Acute medical consultations',
      'Diabetes & hypertension management',
      'Preventive health check-ups',
      'Palliative medicine',
      'Fever & acute illness evaluation',
    ],
  },
  {
    id: 'emergency-casualty',
    title: '24/7 Emergency & Casualty',
    shortDesc:
      'Round-the-clock casualty, labour room, diagnostic laboratory and in-house pharmacy.',
    fullDesc:
      'Resident medical officers, obstetric nurses, laboratory technicians and pharmacists are available 24 hours a day, including Sundays and public holidays — so help is always ready when you need it.',
    status: 'Core Clinical Focus',
    availability: '24 Hours / 7 Days',
    services: [
      'Immediate medical triage',
      'Emergency obstetrics & labour room',
      '24-hour diagnostic laboratory',
      'In-house pharmacy',
      'Casualty observation beds',
    ],
  },
  {
    id: 'diagnostic-laboratory',
    title: 'Diagnostic Laboratory & Ultrasound',
    shortDesc:
      'Automated pathology and imaging — the first ultrasound facility in the Chemmad locality, introduced in 1996.',
    fullDesc:
      'From introducing Chemmad’s first diagnostic ultrasound in 1996 to today’s 24/7 automated pathology service, our laboratory supports inpatient and outpatient diagnosis with reliable turnaround times.',
    status: 'Core Clinical Focus',
    availability: 'Open 24 Hours',
    services: [
      'Automated clinical pathology & haematology',
      'Biochemical & hormonal investigations',
      'Diagnostic ultrasound scanning',
      'Antenatal & follicular scans',
      'Routine clinical microbiology',
    ],
  },
  {
    id: 'pharmacy',
    title: 'In-House Pharmacy',
    shortDesc:
      'Genuine prescribed medicines and maternal, neonatal and emergency supplies — open around the clock.',
    fullDesc:
      'Our in-house pharmacy stocks hospital-prescribed formulations, maternal and neonatal essentials and emergency drugs, and remains open 24 hours for patient convenience.',
    status: 'Core Clinical Focus',
    availability: 'Open 24 Hours',
    services: [
      'Prescription medicine dispensing',
      'Maternal & neonatal supplies',
      'Emergency drug availability',
      'Patient medication counselling',
    ],
  },
];

/* ========================================================================== */
/* CLINICAL TEAM                                                               */
/* ========================================================================== */

export const DOCTORS_DATA: DoctorProfile[] = [
  {
    id: 'dr-laila-beegum',
    name: 'Dr. Laila Beegum N',
    designation: 'Chief Consultant & Founder',
    qualifications: 'MBBS, DGO',
    specialty: 'Obstetrics, Gynaecology & IVF',
    specialityIds: ['obstetrics-gynaecology', 'maternity-care', 'ivf-fertility'],
    experienceNotes:
      'Acclaimed leader in maternal care with over three decades of service in Chemmad, specialising in safe normal deliveries, high-risk obstetrics and infertility management.',
    schedule: 'Mon – Sat · OPD 10:00 AM – 7:00 PM',
    opdTimings: '10:00 AM – 7:00 PM',
    consultingDays: [1, 2, 3, 4, 5, 6],
    languages: ['English', 'Malayalam', 'Tamil'],
    isVerifiedPlaceholder: false,
    /** Tailwind gradient classes for the monogram avatar. */
    accent: 'from-brand-600 to-brand-800',
    category: 'obgyn',
  },
  {
    id: 'dr-geethanjali-s',
    name: 'Dr. Geethanjali S',
    designation: 'Senior Consultant',
    qualifications: 'MBBS, DGO',
    specialty: 'Obstetrician & Gynaecologist',
    specialityIds: ['obstetrics-gynaecology', 'maternity-care'],
    experienceNotes:
      'Specialises in comprehensive antenatal care, gynaecological surgery, PCOS and menstrual health, with compassionate labour room management.',
    schedule: 'Mon – Sat · OPD 9:30 AM – 5:30 PM',
    opdTimings: '9:30 AM – 5:30 PM',
    consultingDays: [1, 2, 3, 4, 5, 6],
    languages: ['English', 'Malayalam'],
    isVerifiedPlaceholder: false,
    accent: 'from-brand-400 to-brand-700',
    category: 'obgyn',
  },
  {
    id: 'dr-amith-k',
    name: 'Dr. Amith K',
    designation: 'Consultant Paediatrician',
    qualifications: 'MBBS, MD (Paediatrics)',
    specialty: 'Newborn, Infant & Child Health',
    specialityIds: ['pediatrics'],
    experienceNotes:
      'Dedicated to newborn intensive care, infant nutrition and breastfeeding guidance, childhood immunisation, and paediatric respiratory and developmental health.',
    schedule: 'Mon – Sat · OPD 9:30 AM – 6:00 PM',
    opdTimings: '9:30 AM – 6:00 PM',
    consultingDays: [1, 2, 3, 4, 5, 6],
    languages: ['English', 'Malayalam'],
    isVerifiedPlaceholder: false,
    accent: 'from-coral-400 to-coral-600',
    category: 'pediatrics',
  },
  {
    id: 'dr-jambir',
    name: 'Dr. Jambir',
    designation: 'Senior General Practitioner',
    qualifications: 'MBBS, BCCPM',
    specialty: 'General & Family Medicine',
    specialityIds: ['general-medicine'],
    experienceNotes:
      'Experienced family physician providing acute medical consultations, chronic diabetes and blood pressure management, preventive care and palliative medicine.',
    schedule: 'Mon – Sat · OPD 9:00 AM – 7:00 PM',
    opdTimings: '9:00 AM – 7:00 PM',
    consultingDays: [1, 2, 3, 4, 5, 6],
    languages: ['English', 'Malayalam'],
    isVerifiedPlaceholder: false,
    accent: 'from-brand-700 to-brand-900',
    category: 'general',
  },
];

/* ========================================================================== */
/* FAQs                                                                        */
/* ========================================================================== */

export const FAQS_DATA: FaqItem[] = [
  {
    category: 'general',
    question: 'How can I book an OPD token or an IVF consultation?',
    answer:
      'You can message our WhatsApp desk on +91 8606 800 999, call reception on 0494 2463377 or 0494 2464193, or use the booking form on this website. Fertility enquiries are handled confidentially.',
  },
  {
    category: 'general',
    question: 'Are emergency, pharmacy and laboratory services open on Sundays?',
    answer:
      'Yes. Our emergency and casualty department, labour room, clinical laboratory and in-house pharmacy operate 24 hours a day, 7 days a week, including Sundays and public holidays.',
  },
  {
    category: 'ivf',
    question: 'When should we visit the IVF & Fertility Centre?',
    answer:
      'Couples trying to conceive for over a year — or six months if the female partner is over 35 — as well as anyone with irregular cycles, PCOS or previous pregnancy loss can schedule a confidential evaluation, Monday to Saturday.',
  },
  {
    category: 'maternity',
    question: 'When should I schedule my first antenatal check-up?',
    answer:
      'We recommend arranging a consultation as soon as a home pregnancy test is positive, typically around 6 to 8 weeks from your last menstrual period, to confirm early pregnancy health and receive early guidance.',
  },
  {
    category: 'maternity',
    question: 'Does the hospital provide emergency care for pregnant patients?',
    answer:
      'Yes. Lailas Hospital maintains round-the-clock emergency casualty and inpatient obstetric support. For urgent concerns, please call +91 8606 800 999 immediately before arriving.',
  },
  {
    category: 'obgyn',
    question: 'Do I need a doctor’s referral to consult a gynaecologist?',
    answer:
      'No formal referral is required. You can book an outpatient consultation directly with our gynaecology department for routine check-ups, menstrual concerns or preventive screenings.',
  },
  {
    category: 'general',
    question: 'Is parking available at the hospital in Chemmad town?',
    answer:
      'Yes. Lailas Hospital has a dedicated, wheelchair-accessible parking facility along the Chemmad–Thalappara (Kozhikode) Road, with easy access to the emergency bay and the main OPD block.',
  },
  {
    category: 'general',
    question: 'Can I choose a video consultation instead of visiting the hospital?',
    answer:
      'A video consultation can be requested for follow-up reviews and second opinions where a physical examination is not essential. Antenatal scans, laboratory sample collection and emergency care must always be done in person, and our reception team will advise you if a visit is required.',
  },
];

/* ========================================================================== */
/* SPECIALITY CATALOGUE                                                        */
/* -------------------------------------------------------------------------- */
/* Built by layering clinical metadata (category, icons, search synonyms) onto */
/* CORE_DEPARTMENTS so there is a single source of truth for department text.  */
/* ========================================================================== */

export type SpecialityCategory =
  | "Women's Health"
  | 'Family & Child'
  | 'Emergency & Diagnostics';

export type SpecialityIcon =
  | 'baby'
  | 'heart'
  | 'brain'
  | 'bone'
  | 'child'
  | 'stethoscope'
  | 'flask'
  | 'pill'
  | 'ambulance'
  | 'sparkles';

export interface Speciality extends DepartmentItem {
  /** Compact label used in dense UI — dropdowns, chips and tabs. */
  shortTitle: string;
  category: SpecialityCategory;
  /** ADMINISTRATIVE FLAG — has management confirmed this service exists? */
  verified: boolean;
  pendingNote?: string;
  /** Lay-language search terms so patients can find care in their own words. */
  searchTerms: string[];
  icon: SpecialityIcon;
  /** Displayed length of a first consultation. */
  consultDuration: string;
  /** Visiting consultants that are not yet bookable online. */
  comingSoon?: boolean;
}

interface SpecialityMeta {
  shortTitle: string;
  category: SpecialityCategory;
  verified: boolean;
  pendingNote?: string;
  searchTerms: string[];
  icon: SpecialityIcon;
  consultDuration: string;
  comingSoon?: boolean;
}

const SPECIALITY_META: Record<string, SpecialityMeta> = {
  'maternity-care': {
    shortTitle: 'Maternity',
    category: "Women's Health",
    verified: true,
    searchTerms: [
      'pregnant', 'pregnancy', 'antenatal', 'labour', 'delivery', 'baby movements',
      'breastfeeding', 'lactation', 'postnatal', 'c section', 'normal delivery',
      'painless labour', 'scan',
    ],
    icon: 'baby',
    consultDuration: '30 min',
  },
  'ivf-fertility': {
    shortTitle: 'Fertility',
    category: "Women's Health",
    verified: true,
    searchTerms: [
      'infertility', 'ivf', 'icsi', 'iui', 'conceive', 'cannot get pregnant', 'sperm',
      'ovulation', 'reproductive', 'fertility test', 'follicular',
    ],
    icon: 'sparkles',
    consultDuration: '45 min',
  },
  'obstetrics-gynaecology': {
    shortTitle: 'Gynaecology',
    category: "Women's Health",
    verified: true,
    searchTerms: [
      'periods', 'irregular periods', 'pcos', 'pcod', 'white discharge', 'pelvic pain',
      'fibroid', 'cyst', 'menopause', 'laparoscopy', 'keyhole surgery', 'womens health',
    ],
    icon: 'heart',
    consultDuration: '30 min',
  },
  pediatrics: {
    shortTitle: 'Paediatrics',
    category: 'Family & Child',
    verified: true,
    searchTerms: [
      'child', 'baby', 'infant', 'newborn', 'vaccination', 'immunisation',
      'fever in child', 'growth', 'not eating', 'breastfeeding', 'neonatal',
    ],
    icon: 'child',
    consultDuration: '25 min',
  },
  'general-medicine': {
    shortTitle: 'General Medicine',
    category: 'Family & Child',
    verified: true,
    searchTerms: [
      'fever', 'cough', 'cold', 'body pain', 'headache', 'diabetes', 'sugar',
      'blood pressure', 'thyroid', 'tiredness', 'infection', 'checkup', 'palliative',
    ],
    icon: 'stethoscope',
    consultDuration: '20 min',
  },
  'emergency-casualty': {
    shortTitle: 'Emergency',
    category: 'Emergency & Diagnostics',
    verified: true,
    searchTerms: [
      'emergency', 'accident', 'injury', 'bleeding', 'unconscious', 'urgent',
      'casualty', 'trauma', 'labour pain',
    ],
    icon: 'ambulance',
    consultDuration: 'Immediate triage',
  },
  'diagnostic-laboratory': {
    shortTitle: 'Laboratory',
    category: 'Emergency & Diagnostics',
    verified: true,
    searchTerms: [
      'blood test', 'scan', 'report', 'sugar test', 'thyroid test', 'urine test',
      'lab', 'pathology', 'screening', 'ultrasound', 'sonography',
    ],
    icon: 'flask',
    consultDuration: 'Walk-in',
  },
  pharmacy: {
    shortTitle: 'Pharmacy',
    category: 'Emergency & Diagnostics',
    verified: true,
    searchTerms: ['medicine', 'tablet', 'pharmacy', 'prescription', 'drug', 'refill'],
    icon: 'pill',
    consultDuration: 'Walk-in',
  },
};

/** Guard so a department without metadata fails loudly in dev, not silently. */
function metaFor(id: string): SpecialityMeta {
  const meta = SPECIALITY_META[id];
  if (!meta) {
    throw new Error(
      `Missing SPECIALITY_META entry for department "${id}". Add one in hospitalData.ts.`,
    );
  }
  return meta;
}

export const SPECIALITIES: Speciality[] = CORE_DEPARTMENTS.map((dept) => ({
  ...dept,
  ...metaFor(dept.id),
}));

export const SPECIALITY_CATEGORIES: SpecialityCategory[] = [
  "Women's Health",
  'Family & Child',
  'Emergency & Diagnostics',
];

export const getSpeciality = (id: string): Speciality | undefined =>
  SPECIALITIES.find((s) => s.id === id);

/** Specialities that can be booked online today. */
export const BOOKABLE_SPECIALITIES: Speciality[] = SPECIALITIES.filter((s) => !s.comingSoon);

export const doctorsForSpeciality = (specialityId: string): DoctorProfile[] =>
  DOCTORS_DATA.filter((d) => d.specialityIds.includes(specialityId));

/* ========================================================================== */
/* SYMPTOM TRIAGE GUIDANCE                                                     */
/* -------------------------------------------------------------------------- */
/* CLINICAL SAFETY: this is a wayfinding aid only. It does not diagnose and    */
/* does not replace clinical assessment. Emergency matches must route to the   */
/* telephone number BEFORE any booking is offered.                             */
/* ========================================================================== */

export interface TriageRule {
  id: string;
  /** Plain-language wording a patient would actually type or say. */
  label: string;
  keywords: string[];
  specialityId: string;
  /** 1 = routine, 2 = see someone soon, 3 = emergency now. */
  urgency: 1 | 2 | 3;
  advice: string;
}

export const TRIAGE_RULES: TriageRule[] = [
  {
    id: 't-pregnancy',
    label: 'Pregnancy, antenatal care or labour',
    keywords: [
      'pregnan', 'antenatal', 'labour', 'labor pain', 'contraction',
      'baby movement', 'water break', 'due date',
    ],
    specialityId: 'maternity-care',
    urgency: 1,
    advice: 'Our maternity team handles antenatal reviews, labour and postnatal care.',
  },
  {
    id: 't-fertility',
    label: 'Difficulty conceiving or fertility questions',
    keywords: [
      'conceiv', 'infertil', 'ivf', 'iui', 'cannot get pregnant', 'sperm',
      'ovulation', 'trying for a baby',
    ],
    specialityId: 'ivf-fertility',
    urgency: 1,
    advice: 'Fertility consultations are confidential and begin with a full history review.',
  },
  {
    id: 't-periods',
    label: 'Period problems, PCOS or pelvic pain',
    keywords: [
      'period', 'menstrual', 'pcos', 'pcod', 'white discharge', 'pelvic',
      'fibroid', 'cyst', 'menopause', 'hot flush',
    ],
    specialityId: 'obstetrics-gynaecology',
    urgency: 1,
    advice: 'A gynaecology consultation can assess menstrual and pelvic symptoms.',
  },
  {
    id: 't-child',
    label: 'Child or newborn unwell',
    keywords: [
      'child', 'baby', 'infant', 'newborn', 'vaccin', 'immunis', 'immuniz',
      'not eating', 'crying',
    ],
    specialityId: 'pediatrics',
    urgency: 1,
    advice: 'Paediatric consultation days vary — reception can confirm the next available slot.',
  },
  {
    id: 't-fever',
    label: 'Fever, cough, cold or general unwellness',
    keywords: [
      'fever', 'cough', 'cold', 'throat', 'body pain', 'weakness', 'tired',
      'infection', 'vomit', 'loose motion',
    ],
    specialityId: 'general-medicine',
    urgency: 1,
    advice: 'General medicine handles fevers and common illnesses in adults.',
  },
  {
    id: 't-heart',
    label: 'Chest discomfort, palpitations or blood pressure',
    keywords: ['chest', 'heart', 'palpitation', 'bp', 'blood pressure', 'cholesterol', 'breathless'],
    // No on-site cardiology service, so chest symptoms route to casualty —
    // the safest place for them — rather than to a department that cannot help.
    specialityId: 'emergency-casualty',
    urgency: 2,
    advice:
      'Chest pain can be an emergency. If it is severe or crushing, or comes with sweating or breathlessness, call us immediately or come straight to casualty rather than booking online.',
  },
  {
    id: 't-head',
    label: 'Headache, migraine or dizziness',
    keywords: [
      'headache', 'migraine', 'dizzy', 'giddiness', 'vertigo', 'numb',
      'tingling', 'fits', 'seizure', 'tremor',
    ],
    specialityId: 'general-medicine',
    urgency: 1,
    advice:
      'Our general medicine team assesses persistent headaches and dizziness, and will refer you onward if a specialist opinion is needed.',
  },
  {
    id: 't-bone',
    label: 'Joint, back or bone pain',
    keywords: [
      'joint', 'knee', 'back pain', 'bone', 'fracture', 'sprain', 'arthrit',
      'shoulder', 'neck',
    ],
    specialityId: 'general-medicine',
    urgency: 1,
    advice:
      'General medicine reviews joint and back pain and arranges imaging through our diagnostic laboratory; suspected fractures are seen at casualty.',
  },
];

/** Matches that must always escalate to a phone call, never a booking wizard. */
export const EMERGENCY_KEYWORDS = [
  'unconscious', 'severe bleeding', 'bleeding heavily', 'not breathing', 'no pulse',
  'heart attack', 'stroke', 'seizure now', 'accident', 'collapsed', 'overdose',
  'poison', 'severe chest pain', 'labour bleeding', 'suicid',
];

/* ========================================================================== */
/* TRUST SIGNALS                                                               */
/* ========================================================================== */

export interface Accreditation {
  id: string;
  name: string;
  detail: string;
  /** false → rendered as "under process", never as a live claim. */
  confirmed: boolean;
}

export const ACCREDITATIONS: Accreditation[] = [
  {
    id: 'acc-clinical-est',
    name: 'Kerala Clinical Establishments Registration',
    detail: 'Statutory registration applicable to clinical establishments in Kerala.',
    confirmed: false,
  },
  {
    id: 'acc-biomedical',
    name: 'Biomedical Waste Management Compliance',
    detail: 'Segregation and disposal protocols under state pollution control rules.',
    confirmed: false,
  },
  {
    id: 'acc-ivf-lab',
    name: 'IVF Laboratory Quality Protocols',
    detail: 'Andrology and embryology handling standards within the fertility unit.',
    confirmed: false,
  },
  {
    id: 'acc-fire',
    name: 'Fire & Life Safety Certification',
    detail: 'Periodic fire safety audit covering inpatient and casualty areas.',
    confirmed: false,
  },
];

export interface SecurityBadge {
  id: string;
  title: string;
  detail: string;
  icon: 'lock' | 'shield' | 'check' | 'ban';
}

export const SECURITY_BADGES: SecurityBadge[] = [
  {
    id: 'sec-encryption',
    title: 'Encrypted in transit',
    detail: 'Enquiry details are submitted over HTTPS.',
    icon: 'lock',
  },
  {
    id: 'sec-minimal-data',
    title: 'Minimal data collection',
    detail: 'Web forms ask only for contact details — never clinical history.',
    icon: 'shield',
  },
  {
    id: 'sec-consent',
    title: 'Explicit consent',
    detail: 'We contact you only about the enquiry you submitted.',
    icon: 'check',
  },
  {
    id: 'sec-no-selling',
    title: 'Never sold or shared',
    detail: 'No data is sold, rented or shared with advertising brokers.',
    icon: 'ban',
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context: string;
  /** Placeholder content must never ship as though it were a real patient story. */
  isSample: boolean;
}

/** SAMPLE CONTENT — replace with consented real patient feedback before launch. */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'tm-1',
    quote:
      'The team explained every step of my antenatal visits clearly and never rushed us. As a first-time mother that mattered more than anything.',
    author: 'Sample patient story',
    context: 'Maternity care · Chemmad',
    isSample: true,
  },
  {
    id: 'tm-2',
    quote:
      'We had almost given up after two years. The fertility consultations were honest about what was possible and what was not.',
    author: 'Sample patient story',
    context: 'Fertility consultation · Tirurangadi',
    isSample: true,
  },
  {
    id: 'tm-3',
    quote:
      'Reception answered late at night when my daughter had a fever and told us exactly what to do before we reached casualty.',
    author: 'Sample patient story',
    context: 'Emergency & casualty · Parappanangadi',
    isSample: true,
  },
];

/* ========================================================================== */
/* PATIENT PORTAL PREVIEW — sample data, no live backend                       */
/* ========================================================================== */

export interface LabReport {
  id: string;
  testName: string;
  orderedBy: string;
  collectedOn: string;
  status: 'Ready' | 'Processing' | 'Pending collection';
}

export const LAB_REPORTS: LabReport[] = [
  {
    id: 'lab-1',
    testName: 'Complete Blood Count (CBC)',
    orderedBy: 'General Medicine',
    collectedOn: '12 Sep',
    status: 'Ready',
  },
  {
    id: 'lab-2',
    testName: 'Thyroid Profile (T3, T4, TSH)',
    orderedBy: 'Obstetrics & Gynaecology',
    collectedOn: '14 Sep',
    status: 'Ready',
  },
  {
    id: 'lab-3',
    testName: 'Fasting & Post-prandial Glucose',
    orderedBy: 'General Medicine',
    collectedOn: '16 Sep',
    status: 'Processing',
  },
  {
    id: 'lab-4',
    testName: 'Antenatal Profile',
    orderedBy: 'Maternity Care',
    collectedOn: '—',
    status: 'Pending collection',
  },
];

export interface Prescription {
  id: string;
  medicine: string;
  dosage: string;
  prescribedBy: string;
  issuedOn: string;
  refillsLeft: number;
}

export const PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-1',
    medicine: 'Folic Acid 5 mg',
    dosage: 'Once daily after food',
    prescribedBy: 'Maternity Care',
    issuedOn: '14 Sep',
    refillsLeft: 2,
  },
  {
    id: 'rx-2',
    medicine: 'Iron & Calcium supplement',
    dosage: 'Once daily at night',
    prescribedBy: 'Obstetrics & Gynaecology',
    issuedOn: '02 Sep',
    refillsLeft: 0,
  },
  {
    id: 'rx-3',
    medicine: 'Paracetamol 500 mg',
    dosage: 'As needed, maximum 3 per day',
    prescribedBy: 'General Medicine',
    issuedOn: '21 Sep',
    refillsLeft: 1,
  },
];

/* ========================================================================== */
/* HEALTH RESOURCES                                                            */
/* ========================================================================== */

export interface HealthArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  publishedOn: string;
}

export const HEALTH_ARTICLES: HealthArticle[] = [
  {
    id: 'art-1',
    title: 'Irregular periods: when it is worth getting checked',
    excerpt:
      'Occasional variation is normal. Here is how to tell the difference between a busy month and something worth investigating with a doctor.',
    category: "Women's Health",
    readMinutes: 4,
    publishedOn: 'Sep 2026',
  },
  {
    id: 'art-2',
    title: 'Your first antenatal visit: a simple checklist',
    excerpt:
      'What to bring, what the doctor will ask, and the tests usually offered in early pregnancy — explained without medical jargon.',
    category: 'Maternity',
    readMinutes: 5,
    publishedOn: 'Sep 2026',
  },
  {
    id: 'art-3',
    title: 'Understanding fertility tests without the panic',
    excerpt:
      'Blood tests, ultrasound and semen analysis are information-gathering steps, not verdicts. Here is what each one actually looks for.',
    category: 'Fertility',
    readMinutes: 6,
    publishedOn: 'Aug 2026',
  },
  {
    id: 'art-4',
    title: 'Managing blood pressure at home between visits',
    excerpt:
      'How to measure correctly, what the numbers mean, and the warning signs that mean you should call the hospital rather than wait.',
    category: 'General Medicine',
    readMinutes: 4,
    publishedOn: 'Aug 2026',
  },
];

/* ========================================================================== */
/* IVF CARE PATHWAY                                                            */
/* ========================================================================== */

export interface CareStep {
  step: string;
  title: string;
  description: string;
}

export const IVF_PATHWAY: CareStep[] = [
  {
    step: '01',
    title: 'Root-Cause Evaluation',
    description:
      'Comprehensive hormonal profiling, 3D follicular ultrasound, and male and female fertility diagnostics — without unnecessary procedures.',
  },
  {
    step: '02',
    title: 'Guided Ovulation & IUI',
    description:
      'First-line natural cycle optimisation, ovulation induction, and intrauterine insemination (IUI) where clinically appropriate.',
  },
  {
    step: '03',
    title: 'Advanced IVF & ICSI',
    description:
      'Precision oocyte retrieval, ICSI fertilisation, blastocyst culture and embryo freezing in a controlled embryology environment.',
  },
  {
    step: '04',
    title: 'Seamless Maternity Transition',
    description:
      'Continuous high-risk obstetric monitoring under the same trusted roof, from conception all the way through to safe delivery.',
  },
];

/* ========================================================================== */
/* INSTITUTIONAL PILLARS                                                       */
/* ========================================================================== */

export interface Pillar {
  title: string;
  description: string;
  /** Token name for the accent dot; mapped to a class in the component. */
  accent: 'brand' | 'coral' | 'teal';
}

export const HOSPITAL_PILLARS: Pillar[] = [
  {
    title: 'Patient-First Medical Ethics',
    description:
      'We prioritise natural deliveries and evidence-based treatment, with transparent communication and affordable care for every family.',
    accent: 'teal',
  },
  {
    title: 'Pioneering Diagnostics',
    description:
      'From introducing Chemmad’s first ultrasound in 1996 to today’s 24/7 automated pathology and IVF embryology laboratories.',
    accent: 'brand',
  },
  {
    title: 'Warm, Accessible Campus',
    description:
      'Wheelchair-accessible entrances, a dedicated hospital parking lot on the Chemmad–Thalappara Road, and comfortable inpatient suites.',
    accent: 'coral',
  },
  {
    title: 'Round-the-Clock Support',
    description:
      '24-hour emergency casualty, labour room, diagnostic laboratory and in-house pharmacy, so help is always ready when you need it.',
    accent: 'brand',
  },
];

/* ========================================================================== */
/* HOSPITAL HIGHLIGHTS                                                         */
/* ========================================================================== */

export const HOSPITAL_HIGHLIGHTS: { value: string; label: string; accent: string }[] = [
  { value: '70,000+', label: 'Safe births delivered since 1994', accent: 'text-brand-800' },
  { value: '30+ Yrs', label: 'Caring for Chemmad families', accent: 'text-brand-600' },
  { value: 'Low C-Section', label: 'Ethical normal-birth focus', accent: 'text-coral-600' },
  { value: '24 / 7', label: 'Emergency, laboratory & pharmacy', accent: 'text-brand-800' },
];

/* ========================================================================== */
/* DOCTOR DIRECTORY FILTERS                                                    */
/* ========================================================================== */

export interface DoctorCategory {
  id: 'all' | 'obgyn' | 'pediatrics' | 'general';
  label: string;
}

export const DOCTOR_CATEGORIES: DoctorCategory[] = [
  { id: 'all', label: 'All Doctors' },
  { id: 'obgyn', label: 'Obstetrics, Gynaecology & IVF' },
  { id: 'pediatrics', label: 'Paediatrics' },
  { id: 'general', label: 'General Medicine' },
];

export const doctorsByCategory = (category: DoctorCategory['id']): DoctorProfile[] =>
  category === 'all'
    ? DOCTORS_DATA
    : DOCTORS_DATA.filter((d) => d.category === category);
