/**
 * Image registry. Every photo on the site is referenced by id from here.
 *
 * No photographs have been supplied yet (src/assets/photos/manifest.json is
 * empty), so every id currently renders a placeholder. See PHOTO_SHOTLIST.md.
 *
 * Alt text describes what PHOTO_SHOTLIST.md asks to be photographed, in plain
 * words and without claims about equipment or services. When a real photo is
 * added, check its alt text against what the photo actually shows.
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
    alt: 'A mother holding her newborn baby in a recovery room at Lailas Hospital',
    aspect: 4 / 5,
    tone: 'clay',
  },
  'hero-secondary': {
    alt: 'The front entrance of Lailas Hospital in Chemmad',
    aspect: 1,
    tone: 'sage',
  },
  'service-maternity': {
    alt: 'A nurse with a mother after the birth of her baby',
    aspect: 4 / 3,
    tone: 'clay',
  },
  'service-ivf': {
    alt: 'A corner of the fertility consultation room at Lailas Hospital',
    aspect: 4 / 3,
    tone: 'sage',
  },
  'service-gynaecology': {
    alt: 'A gynaecologist talking with a patient during a consultation',
    aspect: 4 / 3,
    tone: 'sand',
  },
  'service-paediatrics': {
    alt: 'A paediatrician with a young child',
    aspect: 4 / 3,
    tone: 'sage',
  },
  'service-general': {
    alt: 'A family doctor with an older patient',
    aspect: 4 / 3,
    tone: 'sand',
  },
  'service-emergency': {
    alt: 'The emergency entrance of Lailas Hospital at dusk',
    aspect: 4 / 3,
    tone: 'teal',
  },
  'service-laboratory': {
    alt: 'A technician at work in the hospital laboratory',
    aspect: 4 / 3,
    tone: 'sage',
  },
  'service-pharmacy': {
    alt: 'The pharmacist at the hospital pharmacy counter',
    aspect: 4 / 3,
    tone: 'sand',
  },
  'maternity-story': {
    alt: 'A newborn baby resting in the nursery, with a nurse’s hands nearby',
    aspect: 4 / 5,
    tone: 'clay',
  },
  'maternity-checkup': {
    alt: 'A doctor talking with a pregnant woman during an antenatal check-up',
    aspect: 4 / 3,
    tone: 'sand',
  },
  'maternity-labour': {
    alt: 'An empty labour room at Lailas Hospital',
    aspect: 4 / 3,
    tone: 'sage',
  },
  'maternity-newborn': {
    alt: 'A paediatrician gently checking a newborn baby',
    aspect: 4 / 3,
    tone: 'clay',
  },
  'ivf-consultation': {
    alt: 'A couple, seen from behind, in a private fertility consultation',
    aspect: 4 / 5,
    tone: 'teal',
  },
  'page-maternity': {
    alt: 'A mother with her newborn baby',
    aspect: 4 / 5,
    tone: 'clay',
  },
  'page-ivf': {
    alt: 'The fertility consultation room at Lailas Hospital',
    aspect: 4 / 5,
    tone: 'sage',
  },
  'staff-team': {
    alt: 'Doctors, nurses and staff of Lailas Hospital together',
    aspect: 16 / 9,
    tone: 'sand',
  },
  'visit-entrance': {
    alt: 'The hospital entrance and parking area, with the wheelchair ramp',
    aspect: 4 / 3,
    tone: 'sage',
  },
  'doctor-laila-beegum': {
    alt: 'Portrait of Dr. Laila Beegum N',
    aspect: 4 / 5,
    tone: 'clay',
  },
  'doctor-geethanjali-s': {
    alt: 'Portrait of Dr. Geethanjali S',
    aspect: 4 / 5,
    tone: 'sage',
  },
  'doctor-amith-k': {
    alt: 'Portrait of Dr. Amith K',
    aspect: 4 / 5,
    tone: 'sand',
  },
  'doctor-jambir': {
    alt: 'Portrait of Dr. Jambir',
    aspect: 4 / 5,
    tone: 'teal',
  },
  'doctor-v-j-sonia': {
    alt: 'Portrait of Dr. V. J. Sonia',
    aspect: 4 / 5,
    tone: 'sage',
  },
  'doctor-jitha-vineeth': {
    alt: 'Portrait of Dr. Jitha Vineeth',
    aspect: 4 / 5,
    tone: 'clay',
  },
  'doctor-sumiya': {
    alt: 'Portrait of Dr. Sumiya',
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
/** True once a real photograph has been processed for this id. Layouts use
 *  it to choose a composition that does not depend on the image. */
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
