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
    alt: 'A couple sitting close together at home',
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
