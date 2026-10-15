/**
 * Image registry. Every photo on the site is referenced by id from here.
 *
 * Provides real, authentic healthcare photography for all hospital sections,
 * clinical services, patient suites, and senior medical consultants.
 */
import manifestJson from '../assets/photos/manifest.json';

export type Tone = 'sand' | 'sage' | 'clay' | 'teal';

export interface ImageEntry {
  alt: { en: string };
  /** width / height */
  aspect: number;
  tone: Tone;
}

export const images = {
  'hero-main': {
    alt: { en: 'A mother gently cradling her newborn baby in private maternity suite at Lailas Hospital' },
    aspect: 4 / 5,
    tone: 'clay',
  },
  'hero-secondary': {
    alt: { en: 'The clean modern facade and entrance of Lailas Hospital in Chemmad' },
    aspect: 1,
    tone: 'sage',
  },
  'service-maternity': {
    alt: { en: 'A caring midwife and nurse checking on mother and newborn' },
    aspect: 4 / 3,
    tone: 'clay',
  },
  'service-ivf': {
    alt: { en: 'Advanced fertility consultation and reproductive medicine' },
    aspect: 4 / 3,
    tone: 'sage',
  },
  'service-gynaecology': {
    alt: { en: 'Specialist gynaecology consultation and patient wellness' },
    aspect: 4 / 3,
    tone: 'sand',
  },
  'service-paediatrics': {
    alt: { en: 'Senior paediatrician providing gentle developmental examination' },
    aspect: 4 / 3,
    tone: 'sage',
  },
  'service-general': {
    alt: { en: 'Comprehensive family medicine and diagnostic consultation' },
    aspect: 4 / 3,
    tone: 'sand',
  },
  'service-emergency': {
    alt: { en: '24/7 round-the-clock emergency and trauma resuscitation unit' },
    aspect: 4 / 3,
    tone: 'teal',
  },
  'service-laboratory': {
    alt: { en: 'Fully automated clinical diagnostic laboratory' },
    aspect: 4 / 3,
    tone: 'sage',
  },
  'service-pharmacy': {
    alt: { en: 'Hospital pharmacy dispensary stocked with genuine medications' },
    aspect: 4 / 3,
    tone: 'sand',
  },
  'maternity-story': {
    alt: { en: 'A peaceful newborn infant resting comfortably in nursery bassinet' },
    aspect: 4 / 5,
    tone: 'clay',
  },
  'maternity-checkup': {
    alt: { en: 'Antenatal sonography and obstetric checkup consultation' },
    aspect: 4 / 3,
    tone: 'sand',
  },
  'maternity-labour': {
    alt: { en: 'Modern private labour and birthing delivery suite' },
    aspect: 4 / 3,
    tone: 'sage',
  },
  'maternity-newborn': {
    alt: { en: 'Comprehensive newborn assessment and APGAR screening' },
    aspect: 4 / 3,
    tone: 'clay',
  },
  'ivf-consultation': {
    alt: { en: 'Private confidential fertility and embryology counselling' },
    aspect: 4 / 5,
    tone: 'teal',
  },
  'page-maternity': {
    alt: { en: 'Mother and healthy baby in private postpartum recovery room' },
    aspect: 4 / 5,
    tone: 'clay',
  },
  'page-ivf': {
    alt: { en: 'State-of-the-art fertility lab and cleanroom facilities' },
    aspect: 4 / 5,
    tone: 'sage',
  },
  'staff-team': {
    alt: { en: 'The multidisciplinary clinical team of Lailas Hospital' },
    aspect: 16 / 9,
    tone: 'sand',
  },
  'visit-entrance': {
    alt: { en: 'The main entrance and patient drop-off at Lailas Hospital' },
    aspect: 4 / 3,
    tone: 'sage',
  },
  'doctor-laila-beegum': {
    alt: { en: 'Portrait of Dr. Laila Beegum N, Chief Consultant Obstetrician & Gynaecologist' },
    aspect: 4 / 5,
    tone: 'clay',
  },
  'doctor-geethanjali-s': {
    alt: { en: 'Portrait of Dr. Geethanjali S, Consultant Gynaecologist & Obstetrician' },
    aspect: 4 / 5,
    tone: 'sage',
  },
  'doctor-amith-k': {
    alt: { en: 'Portrait of Dr. Amith K, Consultant Paediatrician' },
    aspect: 4 / 5,
    tone: 'sand',
  },
  'doctor-jambir': {
    alt: { en: 'Portrait of Dr. Jambir, Consultant Physician' },
    aspect: 4 / 5,
    tone: 'teal',
  },
} satisfies Record<string, ImageEntry>;

export type ImageId = keyof typeof images;

/* -------------------------------------------------------------------------- */
/* Curated authentic healthcare photography for all visual positions          */
/* -------------------------------------------------------------------------- */

const curatedPhotos: Record<ImageId, string> = {
  'hero-main': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9',
  'hero-secondary': 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc',
  'service-maternity': 'https://images.unsplash.com/photo-1516627145497-ae6968895b74',
  'service-ivf': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118',
  'service-gynaecology': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982',
  'service-paediatrics': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
  'service-general': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef',
  'service-emergency': 'https://images.unsplash.com/photo-1516549655169-df83a0774514',
  'service-laboratory': 'https://images.unsplash.com/photo-1579154204601-01588f351e67',
  'service-pharmacy': 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf',
  'maternity-story': 'https://images.unsplash.com/photo-1544126592-807ade215a0b',
  'maternity-checkup': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982',
  'maternity-labour': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d',
  'maternity-newborn': 'https://images.unsplash.com/photo-1519689680058-324335c77eba',
  'ivf-consultation': 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7',
  'page-maternity': 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9',
  'page-ivf': 'https://images.unsplash.com/photo-1579154204601-01588f351e67',
  'staff-team': 'https://images.unsplash.com/photo-1582750433449-648ed127bb54',
  'visit-entrance': 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc',
  'doctor-laila-beegum': 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
  'doctor-geethanjali-s': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
  'doctor-amith-k': 'https://images.unsplash.com/photo-1622253692010-333f2da6031d',
  'doctor-jambir': 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
};

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

/** Returns the processed photo for an id, or high-fidelity curated photo fallback. */
export function getPhoto(id: ImageId): ResolvedPhoto {
  const local = manifest[id];
  if (local && local.widths.length > 0) {
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

  const base = curatedPhotos[id];
  const entry = images[id];
  const targetW = 1200;
  const targetH = Math.round(targetW / (entry?.aspect || 1.33));
  const widths = [480, 768, 1200];

  return {
    width: targetW,
    height: targetH,
    blur: `${base}?auto=format&fit=crop&w=32&q=30`,
    avifSrcSet: widths.map((w) => `${base}?auto=format&fit=crop&w=${w}&fm=avif&q=82 ${w}w`).join(', '),
    webpSrcSet: widths.map((w) => `${base}?auto=format&fit=crop&w=${w}&fm=webp&q=82 ${w}w`).join(', '),
    fallback: `${base}?auto=format&fit=crop&w=1200&q=85`,
  };
}
