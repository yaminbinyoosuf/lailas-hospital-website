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
    requestSlot: 'Request slot',
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
    confidential: 'Private consultations, kept in confidence',
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
    opdUnconfirmed: 'Consultation by prior reservation',
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
