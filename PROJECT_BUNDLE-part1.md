# Lailas Hospital — source code, part 1 of 4

Complete source except images, dependencies and build output.
Read HANDOFF.md first for architecture, design system and constraints.


==============================================================================
// FILE: src/content/copy/en.ts
==============================================================================

/**
 * English copy. Every sentence on the site lives here.
 * Rules: short, warm sentences. No en or em dashes. No emojis.
 * Run `npm run check:copy` after editing.
 */
import type { DoctorId, FaqId, LanguageCode, MilestoneId, PregnancyStageId, ServiceGroup, ServiceId } from '../site';

const PHONE = '+91 8606 800 999';

const hour12 = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  if (h === 24 || h === 0) return '12:00 AM';
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${String(m).padStart(2, '0')} ${suffix}`;
};

export const en = {
  locale: 'en-IN',

  a11y: {
    skip: 'Skip to main content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    close: 'Close',
    mainNav: 'Main',
    footerNav: 'Footer',
    home: 'Lailas Hospital, home',
  },

  strip: {
    emergency: 'Emergency, day and night',
  },

  nav: {
    services: 'Services',
    maternity: 'Maternity',
    ivf: 'IVF',
    doctors: 'Doctors',
    contact: 'Contact',
    privacy: 'Privacy',
    home: 'Home',
  },

  actions: {
    book: 'Book appointment',
    bookShort: 'Book',
    call: 'Call',
    whatsapp: 'WhatsApp',
    chatWhatsapp: 'Chat on WhatsApp',
    directions: 'Get directions',
    callEmergency: 'Call emergency',
  },

  time: {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dayRange: (from: string, to: string) => `${from} to ${to}`,
    everyDay: 'Every day',
    open24: 'Open 24 hours',
    open24EveryDay: 'Open 24 hours, every day',
    formatTime: hour12,
    timeRange: (from: string, to: string) => `${from} to ${to}`,
    today: 'Today',
    tomorrow: 'Tomorrow',
  },

  hero: {
    tagline: 'Humane Care; Divine Cure',
    /** Eyebrow above the headline. */
    eyebrow: 'Trusted healthcare since 1994',
    /** Split so the middle segment can carry the accent colour without the
        component hardcoding any of the words. */
    title: {
      before: 'Your baby’s ',
      accent: 'first hello,',
      after: ' in safe hands.',
    },
    lead: 'For over 30 years, Lailas Hospital has been a trusted name in women’s health, maternity, childcare and fertility care, with compassion at every step.',
    /** The phone number is passed in as a link. */
    emergency: <T,>(phone: T) => ['In an emergency, call ', phone, ' any time, day or night.'],
    trust: [
      { value: '70,000+', label: 'babies born with us' },
      { value: 'Since 1994', label: 'caring for Chemmad' },
      { value: 'Specialist care', label: 'for women and children' },
      { value: '24/7', label: 'emergency, lab and pharmacy' },
    ],
    /** The compact booking card in the hero. */
    panel: {
      title: 'Book an appointment',
      service: 'Choose a service',
      anyService: 'Any service',
      continue: 'Continue',
      whatsapp: 'Book on WhatsApp',
    },
  },

  /** The founder section on the home page. Only facts already established
      elsewhere on the site are stated here; no quotation is attributed to her. */
  founder: {
    label: 'The founder',
    title: 'The doctor who began it all in 1994, and still leads it today.',
    facts: [
      { value: '1994', label: 'the year she opened the hospital' },
      { value: '70,000+', label: 'babies born here since' },
      { value: '30+ years', label: 'in practice in Chemmad' },
    ],
  },

  services: {
    title: 'Care for the whole family, under one roof',
    lead: 'From pregnancy and birth to your child’s vaccines and your parents’ check-ups.',
    groupsLabel: 'Choose a type of care',
    groups: {
      women: { name: 'Women', intro: 'Pregnancy, birth, fertility and women’s health at every age.' },
      family: { name: 'Children and family', intro: 'Newborn care, vaccines and everyday medicine for all ages.' },
      emergency: { name: 'Emergency', intro: 'Our casualty and labour room never close, not even on Sundays or holidays.' },
      diagnostics: { name: 'Lab, scans and pharmacy', intro: 'Tests, scans and medicines, all open 24 hours.' },
    } satisfies Record<ServiceGroup, { name: string; intro: string }>,
    items: {
      maternity: {
        name: 'Pregnancy and birth',
        summary: 'Care from your first check-up to your baby’s first weeks, with a focus on safe, natural births.',
        offerings: ['Normal and high-risk pregnancy care', 'Labour room with baby heart monitoring', 'Care for you and your baby after birth'],
        availability: 'Labour room open 24/7',
      },
      ivf: {
        name: 'Fertility and IVF',
        summary: 'Private, honest help for couples who are trying for a baby.',
        offerings: ['Fertility tests for both partners', 'Ovulation support and IUI', 'Advice on IVF and ICSI'],
        availability: 'Private visits, Monday to Saturday',
      },
      gynaecology: {
        name: 'Women’s health',
        summary: 'Check-ups and treatment for periods, PCOS, fibroids, cysts and menopause.',
        offerings: ['Period problems and PCOS', 'Women’s health check-ups'],
        availability: 'OPD, Monday to Saturday',
      },
      paediatrics: {
        name: 'Babies and children',
        summary: 'Gentle care for newborns and growing children.',
        offerings: ['Newborn care', 'Vaccinations', 'Feeding and growth checks'],
        availability: 'OPD, Monday to Saturday',
      },
      'general-medicine': {
        name: 'Family medicine',
        summary: 'Care for fever, diabetes, blood pressure and everyday illness.',
        offerings: ['Fever and infections', 'Diabetes and blood pressure', 'Health check-ups and palliative care'],
        availability: 'OPD, Monday to Saturday',
      },
      emergency: {
        name: 'Emergency and casualty',
        summary: 'Doctors, nurses, lab staff and pharmacists on duty all day and all night.',
        offerings: ['Emergency care for adults and children', 'Emergency care in pregnancy and labour', 'Open on Sundays and holidays'],
        availability: 'Open 24 hours',
      },
      laboratory: {
        name: 'Laboratory and scans',
        summary: 'Blood tests and ultrasound scans, day and night. In 1996 we opened the first ultrasound facility in our area.',
        offerings: ['Blood and urine tests', 'Hormone and thyroid tests', 'Pregnancy and fertility scans'],
        availability: 'Open 24 hours',
      },
      pharmacy: {
        name: 'Pharmacy',
        summary: 'Your prescribed medicines, plus supplies for mothers and babies.',
        offerings: ['Prescription medicines', 'Mother and baby supplies', 'Emergency medicines'],
        availability: 'Open 24 hours',
      },
    } satisfies Record<ServiceId, { name: string; summary: string; offerings: string[]; availability: string }>,
    book: 'Book a visit',
    walkIn: 'Walk in, no appointment needed',
  },

  maternity: {
    title: 'Every birth matters to us, the first one and the 70,000th.',
    lead: 'Our maternity team has cared for mothers in Chemmad for over 30 years. We plan for a safe, natural birth whenever it is right for you and your baby, and we are ready for pregnancies that need extra care.',
    stats: [
      { value: 70000, suffix: '+', label: 'babies born at Lailas' },
      { value: 1994, suffix: '', label: 'the year we opened in Chemmad' },
      { value: 1996, suffix: '', label: 'the year we began ultrasound scanning' },
    ],
    expectTitle: 'What to expect',
    expect: [
      { title: 'Before birth', body: 'Regular check-ups and scans, blood pressure checks, and advice on food and rest.' },
      { title: 'On the day', body: 'A labour room that is open day and night, nurses by your side, and your baby’s heartbeat watched closely.' },
      { title: 'After birth', body: 'Help with breastfeeding, a check-up for you, and a newborn check by our children’s doctor.' },
    ],
    more: 'More about maternity care',
  },

  ivf: {
    label: 'Private fertility care',
    title: 'Trying for a baby can take time. You do not have to do it alone.',
    lead: 'Every conversation stays private. We start by listening, explain each test, and only suggest the treatment you need.',
    stepWord: 'Step',
    steps: [
      { title: 'Talk and test', body: 'A private talk about your health, then simple tests for both partners.' },
      { title: 'Ovulation support and IUI', body: 'Help to ovulate at the right time, and IUI when it is the right next step.' },
      { title: 'IVF and ICSI', body: 'If you need more help, we talk you through IVF and ICSI and what each step involves.' },
      { title: 'Pregnancy care, same team', body: 'Once you are pregnant, our maternity team looks after you through to the birth.' },
    ],
    promise: 'We never promise results. Every couple is different, and your doctor will be honest with you about your options.',
    whatsapp: 'Talk privately on WhatsApp',
    book: 'Book a private visit',
    more: 'More about fertility care',
    whatsappMessage: 'Hello Lailas IVF Centre, I would like to speak privately about fertility care.',
  },

  pregnancy: {
    label: 'Pregnancy week guide',
    title: 'How far along are you?',
    lead: 'Move the slider to your week of pregnancy. See the care that usually happens now, and when your baby may arrive.',
    sliderLabel: 'Your week of pregnancy',
    week: (w: number) => `Week ${w}`,
    weekOf: (w: number, total: number) => `Week ${w} of ${total}`,
    stages: {
      first: {
        name: 'First trimester',
        range: 'Weeks 1 to 13',
        focus: 'Confirming and dating your pregnancy',
        care: ['A first scan between weeks 6 and 9', 'Blood tests, including thyroid and sugar', 'Folic acid, and help with morning sickness'],
      },
      second: {
        name: 'Second trimester',
        range: 'Weeks 14 to 27',
        focus: 'Checking your baby’s growth',
        care: ['A detailed scan of your baby between weeks 18 and 22', 'Iron, calcium and blood pressure checks', 'A sugar test for diabetes in pregnancy'],
      },
      third: {
        name: 'Third trimester',
        range: 'Weeks 28 to 40',
        focus: 'Getting ready for birth',
        care: ['Growth and wellbeing scans, with baby heart monitoring', 'Planning for a safe, natural birth, and a talk about pain relief', 'A labour room ready for you, day or night'],
      },
    } satisfies Record<PregnancyStageId, { name: string; range: string; focus: string; care: string[] }>,
    milestones: {
      'first-scan': 'First scan',
      'nt-scan': 'NT scan',
      'anomaly-scan': 'Anomaly scan',
      'growth-scan': 'Growth scan',
      'birth-ready': 'Ready for birth',
    } satisfies Record<MilestoneId, string>,
    milestonesLabel: 'Jump to a scan',
    careTitle: 'Care at this stage',
    dueTitle: 'Your baby may arrive',
    dueRange: (from: string, to: string) => `Between ${from} and ${to}`,
    disclaimer: 'This guide is general information, not medical advice. Your doctor will plan the right scans and tests for you.',
    book: 'Book a pregnancy check-up',
  },

  doctors: {
    title: 'Meet the doctors you will see',
    lead: 'Our consultants see patients Monday to Saturday. Book directly with the doctor you want.',
    profiles: {
      'laila-beegum': {
        role: 'Chief Consultant and Founder',
        focus: 'Pregnancy, women’s health and fertility',
        bio: 'Has cared for mothers in Chemmad for over 30 years, with a special focus on safe normal births and high-risk pregnancies.',
      },
      'amith-k': {
        role: 'Consultant Paediatrician',
        focus: 'Babies and children',
        bio: 'Cares for newborns and children, with help on feeding, vaccines, breathing problems and growth.',
      },
      jabir: {
        role: 'Senior General Practitioner',
        focus: 'Family medicine',
        bio: 'Treats fever and everyday illness, helps manage diabetes and blood pressure, and gives palliative care.',
      },
      'v-j-sonia': {
        role: 'Consultant Obstetrician and Gynaecologist',
        focus: 'Pregnancy, childbirth and women’s surgery',
        bio: 'Looks after antenatal and postnatal care, normal and high-risk deliveries, and women’s health surgery.',
      },
      'jitha-vineeth': {
        role: 'Consultant Gynaecologist and Fertility Specialist',
        focus: 'Fertility treatment and women’s health',
        bio: 'Works with couples trying to conceive, with a focus on fertility assessment, ovulation support, IUI and IVF, and PCOS care. Over 15 years of experience.',
      },
      sumiya: {
        role: 'Consultant Radiologist and Fetal Medicine Specialist',
        focus: 'Ultrasound scanning and fetal medicine',
        bio: 'Carries out 3D and 4D ultrasound scanning, fetal anomaly scans and Doppler studies, and follows the baby’s growth through each stage of pregnancy.',
      },
    } satisfies Record<DoctorId, { role: string; focus: string; bio: string }>,
    speaks: 'Speaks',
    opd: 'OPD',
    opdUnconfirmed: 'Please call to confirm OPD timings',
    bookWith: (name: string) => `Book with ${name}`,
    languageNames: { en: 'English', ml: 'Malayalam', ta: 'Tamil' } satisfies Record<LanguageCode, string>,
    duty: {
      label: '24 hour availability',
      title: 'Doctors on duty, every hour',
      body: 'Duty doctors, nurses, lab staff and pharmacists are here every hour of every day, including Sundays and holidays.',
    },
    seeAll: 'See all doctors',
  },

  faq: {
    title: 'Questions families ask us',
    lead: 'Cannot find your answer? Call or message us. We are happy to help.',
    items: {
      booking: {
        q: 'How do I book an appointment?',
        a: `Use the Book appointment button on this website, message us on WhatsApp at ${PHONE}, or call reception on 0494 2463377. Fertility enquiries are kept private.`,
      },
      sundays: {
        q: 'Are emergency, lab and pharmacy open on Sundays?',
        a: 'Yes. Casualty, the labour room, the laboratory and the pharmacy are open 24 hours a day, every day, including Sundays and public holidays.',
      },
      'first-antenatal': {
        q: 'When should I have my first pregnancy check-up?',
        a: 'As soon as your home pregnancy test is positive. This is usually 6 to 8 weeks after the first day of your last period.',
      },
      'pregnancy-emergency': {
        q: 'Do you give emergency care to pregnant women?',
        a: `Yes, day and night. If something feels wrong, please call ${PHONE} before you leave home, so we are ready for you.`,
      },
      'ivf-when': {
        q: 'When should we see a fertility doctor?',
        a: 'If you have been trying for a baby for over a year, or for six months if the woman is over 35. Also come if periods are irregular, if you have PCOS, or if you have had a pregnancy loss.',
      },
      referral: {
        q: 'Do I need a referral to see a gynaecologist?',
        a: 'No. You can book a visit directly for a check-up, period problems or screening.',
      },
      parking: {
        q: 'Is there parking at the hospital?',
        a: 'Yes. We have our own parking with wheelchair access, close to the emergency entrance and the OPD.',
      },
    } satisfies Record<FaqId, { q: string; a: string }>,
  },

  visit: {
    title: 'Come and see us in Chemmad',
    lead: 'We are near Chemmad Town Junction, on Kozhikode Road.',
    addressTitle: 'Address',
    hoursTitle: 'Opening hours',
    hours: {
      allDay: 'Emergency, labour room, lab and pharmacy',
      opd: 'Doctors’ OPD',
    },
    accessTitle: 'Getting here',
    access: [
      'Our own parking, close to the emergency entrance',
      'Wheelchair access, with casualty, lab and pharmacy on the ground floor',
    ],
    plusCode: 'Plus Code',
    mapTitle: 'Map showing Lailas Hospital in Chemmad',
    routesTitle: 'How far we are',
    routes: {
      tirurangadi: 'Tirurangadi town',
      nh66: 'NH 66, Thalappara Junction',
      railway: 'Parappanangadi railway station',
      airport: 'Calicut International Airport',
    },
    routeDistance: (km: number, min: number) => `${km} km, about ${min} minutes by road`,
  },

  contact: {
    primaryLabel: 'Emergency, appointments and WhatsApp',
    landlineLabels: ['Reception', 'OPD and appointments', 'Helpdesk'],
    phonesTitle: 'Phone numbers',
    emailTitle: 'Email',
  },

  footer: {
    about: 'A family hospital in Chemmad since 1994, caring for mothers, babies and families across Malappuram.',
    visitTitle: 'Visit',
    callTitle: 'Call us',
    pagesTitle: 'Pages',
    legal: (year: number) => `© ${year} Lailas Health Care Limited. All rights reserved.`,
    disclaimer: `This website gives general information only. In an emergency, call ${PHONE} or come straight to casualty.`,
  },

  mobileBar: {
    call: 'Call',
    whatsapp: 'WhatsApp',
    book: 'Book',
  },

  booking: {
    title: 'Book an appointment',
    emergency: (phone: string) => `Emergency? Do not wait. Call ${phone} now.`,
    stepOf: (a: number, b: number) => `Step ${a} of ${b}`,
    who: {
      title: 'Who would you like to see?',
      departments: 'Choose a department',
      doctors: 'Or choose a doctor',
    },
    day: {
      title: 'Which day suits you?',
      hint: 'We will call you to confirm the time.',
      anyDay: 'Any day is fine',
      closedNote: 'Our doctors do not see OPD patients on Sundays.',
    },
    details: {
      title: 'Your details',
      name: 'Your name',
      phone: 'Phone number',
      phoneHint: '10 digit mobile number',
      privacy: 'We only use your name and number to arrange your visit. Please do not share medical details here.',
    },
    summary: { seeing: 'Seeing', day: 'Day' },
    errors: {
      who: 'Please choose a department or a doctor.',
      name: 'Please enter your name.',
      phone: 'Please enter a 10 digit phone number.',
      send: 'Sorry, we could not send your request. Please call us or use WhatsApp.',
    },
    next: 'Continue',
    back: 'Back',
    sendWhatsapp: 'Send on WhatsApp',
    sendForm: 'Send request',
    sending: 'Sending',
    done: {
      whatsappTitle: 'Almost done',
      whatsappBody: 'WhatsApp has opened with your details. Press send, and our team will reply to confirm your visit.',
      formTitle: 'Thank you',
      formBody: 'We have your request. Our team will call you soon to confirm your visit.',
      close: 'Close',
    },
    message: (d: { name: string; phone: string; who: string; day: string }) =>
      [
        'Hello Lailas Hospital, I would like to book an appointment.',
        `Name: ${d.name}`,
        `Phone: ${d.phone}`,
        `To see: ${d.who}`,
        `Preferred day: ${d.day}`,
      ].join('\n'),
    whatsappGeneral: 'Hello Lailas Hospital, I would like to book an appointment.',
  },

  pages: {
    maternity: {
      title: 'Pregnancy and birth care, close to home',
      lead: 'From your first scan to your baby’s first vaccines, our team looks after you and your baby with patience and care.',
      stagesTitle: 'Your care, step by step',
      stages: [
        {
          title: 'During pregnancy',
          body: 'Regular check-ups follow your health and your baby’s growth in every trimester.',
          points: ['Confirming your pregnancy early', 'Scans, blood tests and blood pressure checks', 'Advice on food, rest and daily life'],
          imageId: 'maternity-checkup',
        },
        {
          title: 'Labour and birth',
          body: 'Our labour room is open day and night. Nurses stay close, and doctors watch over you and your baby.',
          points: ['Baby heart monitoring during labour', 'A safe, natural birth whenever it is right for you', 'Comfortable rooms to rest and recover'],
          imageId: 'maternity-labour',
        },
        {
          title: 'After your baby arrives',
          body: 'The first weeks are full of questions. We help you and your baby settle in.',
          points: ['A newborn check by our children’s doctor', 'Help with breastfeeding', 'Check-ups as you recover'],
          imageId: 'maternity-newborn',
        },
      ],
      extraCare: {
        title: 'If your pregnancy needs extra care',
        body: 'Some pregnancies need closer watching. Our consultants care for high-risk pregnancies, and our labour room and casualty are ready day and night.',
      },
      doctorsTitle: 'Your maternity doctors',
      faqTitle: 'Common questions about pregnancy',
      cta: {
        title: 'Ready for your first check-up?',
        body: 'Book as soon as your pregnancy test is positive. This is usually 6 to 8 weeks after your last period.',
      },
    },
    ivf: {
      title: 'Fertility care that starts with listening',
      lead: 'If you have been trying for a baby without success, you are not alone. Talk to us privately. We will explain every step in plain words.',
      whenTitle: 'When to come and see us',
      when: [
        'You have been trying for a baby for over a year',
        'Or for six months, if the woman is over 35',
        'Periods are irregular, or you have PCOS',
        'You have had a pregnancy loss',
      ],
      firstVisitTitle: 'Your first visit',
      firstVisit: [
        { title: 'A private talk', body: 'The doctor goes through your health, past reports, periods and both partners’ health.' },
        { title: 'Only the tests you need', body: 'We suggest hormone tests or scans only when they will help.' },
        { title: 'A clear plan', body: 'You get honest advice on the next steps, and time to ask questions and decide.' },
      ],
      pathTitle: 'How treatment usually moves forward',
      bringTitle: 'What to bring to your first visit',
      bring: [
        'Scan reports from the last 12 months',
        'Earlier blood test reports, such as thyroid or hormone tests',
        'Any surgery or laparoscopy summaries',
        'Semen analysis reports, if done before',
      ],
      bringNote: 'Bringing old reports can save you from repeating tests.',
      promiseTitle: 'Our promise to you',
      doctorsTitle: 'Your fertility doctor',
      faqTitle: 'Common questions about fertility',
      cta: {
        title: 'Start with a private conversation',
        body: 'Message us on WhatsApp or book a visit. Your enquiry is kept private.',
      },
    },
    doctors: {
      title: 'Our doctors',
      lead: 'Our consultants see patients Monday to Saturday. Duty doctors are in the hospital every hour of the day.',
      groups: [
        { title: 'Pregnancy and women’s health', serviceIds: ['maternity', 'gynaecology'] as ServiceId[] },
        { title: 'Babies and children', serviceIds: ['paediatrics'] as ServiceId[] },
        { title: 'Family medicine', serviceIds: ['general-medicine'] as ServiceId[] },
      ],
    },
    contact: {
      title: 'Contact and directions',
      lead: 'Call, message or visit us. For emergencies, call any time, day or night.',
      bookTitle: 'Want to see a doctor?',
      bookBody: 'Book online in under a minute. We will call you to confirm.',
    },
    privacy: {
      title: 'Privacy',
      updated: 'Last updated October 2026',
      sections: [
        {
          title: 'What we collect',
          body: [
            'When you book on this website, we ask only for your name, your phone number, the doctor or department, and the day you prefer.',
            'We do not ask for medical details. Please do not send reports or your health history through this website.',
          ],
        },
        {
          title: 'How we use it',
          body: [
            'Our reception team uses your details only to arrange your visit and answer your questions.',
            'We never sell your details or share them with advertisers.',
          ],
        },
        {
          title: 'WhatsApp',
          body: ['If you book through WhatsApp, your message is sent by WhatsApp, which has its own privacy policy.'],
        },
        {
          title: 'This website is not medical advice',
          body: [
            'This website gives general information. It does not replace a visit to a doctor.',
            `In an emergency, do not wait for an online reply. Call ${PHONE} or come straight to casualty.`,
          ],
        },
        {
          title: 'Questions',
          body: ['Questions about your details? Email care@lailashospital.com or call reception on 0494 2463377.'],
        },
      ],
    },
    notFound: {
      title: 'We could not find that page',
      body: 'The page may have moved. Everything you need is one tap away from the home page.',
      back: 'Go to the home page',
    },
  },

  meta: {
    siteName: 'Lailas Hospital and IVF Centre',
    home: {
      title: 'Lailas Hospital and IVF Centre, Chemmad | Maternity, IVF and 24/7 Emergency',
      description: `Family hospital in Chemmad, Malappuram since 1994. Over 70,000 babies born, fertility and IVF care, children’s doctors and 24/7 emergency, lab and pharmacy. Call ${PHONE}.`,
    },
    maternity: {
      title: 'Maternity and Birth Care in Chemmad | Lailas Hospital',
      description: 'Pregnancy check-ups, scans, a 24/7 labour room and newborn care at Lailas Hospital, Chemmad. Over 70,000 babies born since 1994.',
    },
    ivf: {
      title: 'Fertility and IVF Care in Chemmad | Lailas IVF Centre',
      description: 'Private, honest fertility care in Chemmad, Malappuram. Fertility tests, ovulation support, IUI, advice on IVF and ICSI, and pregnancy care with the same team.',
    },
    doctors: {
      title: 'Our Doctors and OPD Timings | Lailas Hospital, Chemmad',
      description: 'Meet our gynaecologists, paediatrician and family doctor. OPD Monday to Saturday. Book directly with the doctor you want.',
    },
    contact: {
      title: 'Contact and Directions | Lailas Hospital, Chemmad',
      description: `Laila Plaza, Kozhikode Road, Chemmad, Malappuram. Emergency, lab and pharmacy open 24 hours. Call ${PHONE}.`,
    },
    privacy: {
      title: 'Privacy | Lailas Hospital, Chemmad',
      description: 'How Lailas Hospital uses the details you share when you book on this website.',
    },
    notFound: {
      title: 'Page not found | Lailas Hospital',
      description: 'This page could not be found.',
    },
  },
};

/** The site copy shape. */
export type Copy = typeof en;



==============================================================================
// FILE: src/content/images.ts
==============================================================================

/**
 * Image registry. Every photo on the site is referenced by id from here.
 *
 * Provides real, authentic healthcare photography for all hospital sections,
 * clinical services, patient suites, and senior medical consultants.
 */
import manifestJson from '../assets/photos/manifest.json';

export type Tone = 'sand' | 'sage' | 'clay' | 'teal';

export interface ImageEntry {
  alt: string;
  /** width / height */
  aspect: number;
  tone: Tone;
}

export const images = {
  'hero-main': {
    alt: 'A mother gently cradling her newborn baby in private maternity suite at Lailas Hospital',
    aspect: 4 / 5,
    tone: 'clay',
  },
  'hero-editorial': {
    alt: 'A mother holding her sleeping newborn against her chest in soft daylight',
    aspect: 1672 / 941,
    tone: 'sand',
  },
  'hero-secondary': {
    alt: 'The clean modern facade and entrance of Lailas Hospital in Chemmad',
    aspect: 1,
    tone: 'sage',
  },
  'service-maternity': {
    alt: 'A caring midwife and nurse checking on mother and newborn',
    aspect: 4 / 3,
    tone: 'clay',
  },
  'service-ivf': {
    alt: 'Advanced fertility consultation and reproductive medicine',
    aspect: 4 / 3,
    tone: 'sage',
  },
  'service-gynaecology': {
    alt: 'Specialist gynaecology consultation and patient wellness',
    aspect: 4 / 3,
    tone: 'sand',
  },
  'service-paediatrics': {
    alt: 'Senior paediatrician providing gentle developmental examination',
    aspect: 4 / 3,
    tone: 'sage',
  },
  'service-general': {
    alt: 'Comprehensive family medicine and diagnostic consultation',
    aspect: 4 / 3,
    tone: 'sand',
  },
  'service-emergency': {
    alt: '24/7 round-the-clock emergency and trauma resuscitation unit',
    aspect: 4 / 3,
    tone: 'teal',
  },
  'service-laboratory': {
    alt: 'Fully automated clinical diagnostic laboratory',
    aspect: 4 / 3,
    tone: 'sage',
  },
  'service-pharmacy': {
    alt: 'Hospital pharmacy dispensary stocked with genuine medications',
    aspect: 4 / 3,
    tone: 'sand',
  },
  'maternity-story': {
    alt: 'A peaceful newborn infant resting comfortably in nursery bassinet',
    aspect: 4 / 5,
    tone: 'clay',
  },
  'maternity-checkup': {
    alt: 'Antenatal sonography and obstetric checkup consultation',
    aspect: 4 / 3,
    tone: 'sand',
  },
  'maternity-labour': {
    alt: 'Modern private labour and birthing delivery suite',
    aspect: 4 / 3,
    tone: 'sage',
  },
  'maternity-newborn': {
    alt: 'Comprehensive newborn assessment and APGAR screening',
    aspect: 4 / 3,
    tone: 'clay',
  },
  'ivf-consultation': {
    alt: 'Private confidential fertility and embryology counselling',
    aspect: 4 / 5,
    tone: 'teal',
  },
  'page-maternity': {
    alt: 'Mother and healthy baby in private postpartum recovery room',
    aspect: 4 / 5,
    tone: 'clay',
  },
  'page-ivf': {
    alt: 'State-of-the-art fertility lab and cleanroom facilities',
    aspect: 4 / 5,
    tone: 'sage',
  },
  'staff-team': {
    alt: 'The multidisciplinary clinical team of Lailas Hospital',
    aspect: 16 / 9,
    tone: 'sand',
  },
  'visit-entrance': {
    alt: 'The main entrance and patient drop-off at Lailas Hospital',
    aspect: 4 / 3,
    tone: 'sage',
  },
  'doctor-laila-beegum': {
    alt: 'Portrait of Dr. Laila Beegum N, Chief Consultant Obstetrician & Gynaecologist',
    aspect: 4 / 5,
    tone: 'clay',
  },
  'doctor-amith-k': {
    alt: 'Portrait of Dr. Amith K, Consultant Paediatrician',
    aspect: 4 / 5,
    tone: 'sand',
  },
  'doctor-jabir': {
    alt: 'Portrait of Dr. Jabir, Consultant Physician',
    aspect: 4 / 5,
    tone: 'teal',
  },
  'doctor-v-j-sonia': {
    alt: 'Dr. V. J. Sonia, consultant obstetrician and gynaecologist at Lailas Hospital',
    aspect: 4 / 5,
    tone: 'sage',
  },
  'doctor-jitha-vineeth': {
    alt: 'Dr. Jitha Vineeth, consultant gynaecologist and fertility specialist at Lailas Hospital',
    aspect: 4 / 5,
    tone: 'clay',
  },
  'doctor-sumiya': {
    alt: 'Dr. Sumiya, consultant radiologist and fetal medicine specialist at Lailas Hospital',
    aspect: 4 / 5,
    tone: 'teal',
  },
} satisfies Record<string, ImageEntry>;

export type ImageId = keyof typeof images;



/* -------------------------------------------------------------------------- */
/* Processed photo files & resolver                                           */
/* -------------------------------------------------------------------------- */

interface ManifestEntry {
  width: number;
  height: number;
  blur: string;
  widths: number[];
}

const manifest = manifestJson as Record<string, ManifestEntry>;

const files = import.meta.glob('../assets/photos/*.{avif,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const fileUrl = (id: string, width: number, ext: 'avif' | 'webp') =>
  files[`../assets/photos/${id}-${width}.${ext}`];

export interface ResolvedPhoto {
  width: number;
  height: number;
  blur: string;
  avifSrcSet: string;
  webpSrcSet: string;
  fallback: string;
}

/**
 * Returns the processed photo for an id, or undefined.
 *
 * Returns undefined when no genuine photograph has been supplied. It does not
 * substitute stock imagery: these positions include named consultants and this
 * hospital's own facilities, and presenting a stranger's photograph as Dr Laila
 * Beegum, or a stock ward as this labour room, would fabricate identities and
 * places. The caller renders a deliberate placeholder in that case.
 */
/** True once a real photograph has been processed for this id. Layouts use it
 *  to choose a composition that does not depend on the image. */
export const hasPhoto = (id: ImageId) => getPhoto(id) !== undefined;

export function getPhoto(id: ImageId): ResolvedPhoto | undefined {
  const local = manifest[id];
  if (!local || local.widths.length === 0) return undefined;

  const set = (ext: 'avif' | 'webp') =>
    local.widths
      .map((w) => (fileUrl(id, w, ext) ? `${fileUrl(id, w, ext)} ${w}w` : null))
      .filter(Boolean)
      .join(', ');
  const largest = local.widths[local.widths.length - 1];

  return {
    width: local.width,
    height: local.height,
    blur: local.blur,
    avifSrcSet: set('avif'),
    webpSrcSet: set('webp'),
    fallback: fileUrl(id, largest, 'webp') || '',
  };
}



==============================================================================
// FILE: src/content/seo.ts
==============================================================================

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




==============================================================================
// FILE: src/content/site.ts
==============================================================================

/**
 * Lailas Hospital & IVF Centre: facts used by the website.
 *
 * Only language-neutral facts live here (numbers, phones, times, ids, names).
 * Every sentence a visitor reads lives in src/content/copy/en.ts.
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
  | 'amith-k'
  | 'jabir'
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
  /**
   * False when `opd` is only the hospital's general OPD window rather than this
   * doctor's own hours. Cards then ask visitors to call instead of printing
   * times, so an unconfirmed schedule is never shown as fact. Q34
   */
  hasOwnOpdHours: boolean;
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
    hasOwnOpdHours: true,
    imageId: 'doctor-laila-beegum',
  },
  {
    id: 'amith-k',
    name: 'Dr. Amith K',
    qualifications: 'MBBS, MD (Paediatrics)',
    serviceIds: ['paediatrics'],
    languages: ['en', 'ml'],
    opd: { days: MON_SAT, open: '09:30', close: '18:00' },
    hasOwnOpdHours: true,
    imageId: 'doctor-amith-k',
  },
  {
    id: 'jabir',
    name: 'Dr. Jabir', // Q9
    qualifications: 'MBBS, BCCPM', // Q9
    serviceIds: ['general-medicine'],
    languages: ['en', 'ml'],
    opd: { days: MON_SAT, open: '09:00', close: '19:00' },
    hasOwnOpdHours: true,
    imageId: 'doctor-jabir',
  },
  {
    id: 'v-j-sonia',
    name: 'Dr. V. J. Sonia',
    qualifications: 'MBBS, DGO, MS (Obstetrics and Gynaecology), FMAS',
    serviceIds: ['maternity', 'gynaecology'],
    languages: ['en', 'ml'],
    opd: { days: MON_SAT, open: '09:00', close: '19:00' }, // hospital OPD window, not confirmed per doctor
    hasOwnOpdHours: false, // no per-doctor hours in the dataset yet (Q34)
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
    hasOwnOpdHours: false, // no per-doctor hours in the dataset yet (Q34)
    imageId: 'doctor-jitha-vineeth',
  },
  {
    id: 'sumiya',
    name: 'Dr. Sumiya',
    qualifications: 'MBBS, MD, DNB (Radiodiagnosis), Fellowship in Fetal Medicine',
    serviceIds: ['gynaecology'],
    languages: ['en', 'ml'],
    opd: { days: MON_SAT, open: '09:00', close: '19:00' }, // hospital OPD window, not confirmed per doctor
    hasOwnOpdHours: false, // no per-doctor hours in the dataset yet (Q34)
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

