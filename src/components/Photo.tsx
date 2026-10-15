import { useEffect, useRef, useState } from 'react';
import { getPhoto, images, type ImageId, type Tone } from '../content/images';
import { cn } from '../lib/format';

export type PhotoShape = 'arch' | 'cradle' | 'soft' | 'circle' | 'none';

const shapes: Record<PhotoShape, string> = {
  arch: 'shape-arch',
  cradle: 'shape-cradle',
  soft: 'shape-soft',
  circle: 'rounded-full',
  none: '',
};

/* Rich, subtle modern hospital gradients for when a photo slot is unpopulated */
const tiles: Record<Tone, string> = {
  sand: 'bg-gradient-to-br from-sand via-[#f7f0e6] to-sand-deep text-clay-600',
  sage: 'bg-gradient-to-br from-sage-50 via-sage-100 to-sage-200 text-teal-700',
  clay: 'bg-gradient-to-br from-clay-50 via-[#fcf5ef] to-clay-100 text-clay-700',
  teal: 'bg-gradient-to-br from-teal-50 via-teal-100/70 to-teal-100 text-teal-800',
};

const darkTiles: Record<Tone, string> = {
  sand: 'bg-gradient-to-br from-teal-900 via-teal-850 to-teal-950 text-teal-300',
  sage: 'bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 text-teal-200',
  clay: 'bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 text-clay-300',
  teal: 'bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800 text-teal-300',
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

  const frame = cn('relative isolate overflow-hidden ring-1 ring-black/[0.04]', shapes[shape], className);

  if (!photo) {
    if (omitIfMissing) return null;
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
            'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.03]',
            loaded || priority ? 'opacity-100' : 'opacity-0',
          )}
        />
      </picture>
    </div>
  );
}
