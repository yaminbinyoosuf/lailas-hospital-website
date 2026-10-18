import { useEffect, useRef, useState } from 'react';
import { getPhoto, images, type ImageId, type Tone } from '../content/images';
import { cn } from '../lib/format';

export type PhotoShape = 'arch' | 'cradle' | 'soft' | 'circle' | 'none';

const shapes: Record<PhotoShape, string> = {
  arch: 'shape-arch',
  cradle: 'shape-arch',
  soft: 'shape-soft',
  circle: 'rounded-full',
  none: '',
};

/* A reserved slot, not a decoration: one flat tone and a hairline. The four
   gradients that stood here were the only gradients on the site. */
const tiles: Record<Tone, string> = {
  sand: 'bg-sand-deep text-clay-600',
  sage: 'bg-sand-deep text-clay-600',
  clay: 'bg-sand-deep text-clay-600',
  teal: 'bg-sand-deep text-clay-600',
};

const darkTiles: Record<Tone, string> = {
  sand: 'bg-teal-950 text-teal-300',
  sage: 'bg-teal-950 text-teal-300',
  clay: 'bg-teal-950 text-teal-300',
  teal: 'bg-teal-950 text-teal-300',
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
 * A responsive photo with blur-up, or a sophisticated clinical placeholder
 * when the photo is being shot. Clean, dignified and accessible.
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

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  const frame = cn('relative isolate overflow-hidden', shapes[shape], className);

const doctorInitials: Record<string, string> = {
  'doctor-laila-beegum': 'LB',
  'doctor-amith-k': 'AK',
  'doctor-jabir': 'JB',
  'doctor-v-j-sonia': 'VS',
  'doctor-jitha-vineeth': 'JV',
  'doctor-sumiya': 'DS',
};

  if (!photo) {
    if (omitIfMissing) return null;

    if (id.startsWith('doctor-')) {
      const initials = doctorInitials[id] || id.replace('doctor-', '').slice(0, 2).toUpperCase();
      return (
        <div
          aria-hidden="true"
          className={cn(
            frame,
            'flex flex-col items-center justify-center border border-line bg-sand-deep text-teal-900 relative select-none',
          )}
          style={{ aspectRatio: ratio }}
        >
          {/* Subtle medical emblem watermark */}
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.14] text-teal-800"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M50 24v52M24 50h52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          <div className="relative z-10 flex flex-col items-center">
            <span className="font-heading font-semibold text-teal-900 text-xl sm:text-2xl tracking-tight drop-shadow-xs">
              {initials}
            </span>
          </div>
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
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
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out',
            loaded || priority ? 'opacity-100' : 'opacity-0',
          )}
        />
      </picture>
    </div>
  );
}
