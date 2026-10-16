import { useEffect, useRef, useState } from 'react';
import { getPhoto, images, type ImageId, type Tone } from '../content/images';
import { cn } from '../lib/format';

export type PhotoShape = 'arch' | 'cradle' | 'soft' | 'circle' | 'none';

/* arch, cradle and soft were three names for the same radius; kept as
   aliases so callers do not change. */
const shapes: Record<PhotoShape, string> = {
  arch: 'rounded-[var(--radius-lg)]',
  cradle: 'rounded-[var(--radius-lg)]',
  soft: 'rounded-[var(--radius-lg)]',
  circle: 'rounded-full',
  none: '',
};

/* Flat tonal panels for positions still waiting for a photograph. */
const tiles: Record<Tone, string> = {
  sand: 'bg-sand text-clay-600',
  sage: 'bg-sage-100 text-teal-700',
  clay: 'bg-clay-50 text-clay-600',
  teal: 'bg-teal-50 text-teal-700',
};

/* On teal-900 sections. */
const darkTiles: Record<Tone, string> = {
  sand: 'bg-teal-800 text-teal-300',
  sage: 'bg-teal-800 text-teal-200',
  clay: 'bg-teal-800 text-clay-200',
  teal: 'bg-teal-800 text-teal-300',
};

/* Shown instead of a portrait until one is supplied. "J" and "S": only the
   names as given are used (Dr. Jambir's full name is unconfirmed, Q9/Q31). */
const doctorInitials: Record<string, string> = {
  'doctor-laila-beegum': 'LB',
  'doctor-geethanjali-s': 'GS',
  'doctor-amith-k': 'AK',
  'doctor-jambir': 'J',
  'doctor-v-j-sonia': 'VS',
  'doctor-jitha-vineeth': 'JV',
  'doctor-sumiya': 'S',
};

interface PhotoProps {
  id: ImageId;
  shape?: PhotoShape;
  /** Override the registry aspect ratio (width / height). */
  aspect?: number;
  sizes?: string;
  /** Above the fold: load eagerly with high priority. */
  priority?: boolean;
  /** Use a darker tile on dark sections. */
  onDark?: boolean;
  /**
   * Render nothing at all while the photograph is missing. Use for wide
   * decorative bands, where an empty tile reads as a void; leave it off for
   * portraits and service images, where the tile reserves the layout slot.
   */
  omitIfMissing?: boolean;
  className?: string;
}

/**
 * A responsive photo with blur-up, or a flat placeholder while the photo is
 * still to be taken. Placeholders are decorative and hidden from assistive tech.
 */
export function Photo({
  id,
  shape = 'soft',
  aspect,
  sizes = '100vw',
  priority,
  onDark,
  omitIfMissing,
  className,
}: PhotoProps) {
  const entry = images[id];
  const photo = getPhoto(id);
  const ratio = aspect ?? entry.aspect;
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  // The fade-in only applies after hydration, so the prerendered image is
  // visible even if JavaScript never runs.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  const frame = cn('relative isolate overflow-hidden', shapes[shape], className);

  if (!photo) {
    if (omitIfMissing) return null;

    if (id.startsWith('doctor-')) {
      const initials = doctorInitials[id] || id.replace('doctor-', '').slice(0, 2).toUpperCase();
      return (
        <div
          aria-hidden="true"
          className={cn(frame, 'flex select-none items-center justify-center bg-teal-50 text-teal-800')}
          style={{ aspectRatio: ratio }}
        >
          <span className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">{initials}</span>
        </div>
      );
    }

    /* Tonal panel carrying the brand's circle-and-bud motif. No icon, no
       uppercase alt block: the panel is decoration, and repeating the alt text
       as visible type made every missing image look like a mock-up. */
    return (
      <div
        aria-hidden="true"
        className={cn(frame, onDark ? darkTiles[entry.tone] : tiles[entry.tone])}
        style={{ aspectRatio: ratio }}
      >
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.45]"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle
            cx="52"
            cy="56"
            r="24"
            stroke="currentColor"
            strokeWidth="1.1"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="52"
            cy="56"
            r="9"
            stroke="currentColor"
            strokeWidth="1.1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={frame}
      style={{
        aspectRatio: ratio,
        backgroundImage: `url(${photo.blur})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <picture>
        <source type="image/avif" srcSet={photo.avifSrcSet} sizes={sizes} />
        <source type="image/webp" srcSet={photo.webpSrcSet} sizes={sizes} />
        <img
          ref={imgRef}
          src={photo.fallback}
          alt={entry.alt}
          width={photo.width}
          height={photo.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out',
            loaded || priority || !hydrated ? 'opacity-100' : 'opacity-0',
          )}
        />
      </picture>
    </div>
  );
}
