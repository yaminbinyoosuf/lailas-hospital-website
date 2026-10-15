import { useEffect, useRef, useState } from 'react';
import { getPhoto, images, type ImageId, type Tone } from '../content/images';
import { useLang } from '../i18n/LanguageProvider';
import { cn } from '../lib/format';

export type PhotoShape = 'arch' | 'cradle' | 'soft' | 'circle' | 'none';

const shapes: Record<PhotoShape, string> = {
  arch: 'shape-arch',
  cradle: 'shape-cradle',
  soft: 'shape-soft',
  circle: 'rounded-full',
  none: '',
};

/* Placeholder tiles are flat washes of a single brand tint. Gradients here
   made the empty state look like decoration, which competed with the real
   content beside it. */
const tiles: Record<Tone, string> = {
  sand: 'bg-sand text-clay-500',
  sage: 'bg-sage-100 text-sage-500',
  clay: 'bg-clay-50 text-clay-500',
  teal: 'bg-teal-50 text-teal-500',
};

const darkTiles: Record<Tone, string> = {
  sand: 'bg-teal-800 text-teal-500',
  sage: 'bg-teal-800 text-teal-500',
  clay: 'bg-teal-800 text-teal-500',
  teal: 'bg-teal-800 text-teal-500',
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
 * A responsive photo with blur-up, or a calm tinted tile when the hospital
 * has not supplied the photo yet. The tile carries no text and is hidden
 * from screen readers, so nothing pretends to be a real image.
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
  const { lang } = useLang();
  const ratio = aspect ?? entry.aspect;
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  const frame = cn('relative isolate overflow-hidden', shapes[shape], className);

  if (!photo) {
    if (omitIfMissing) return null;
    return (
      <div
        aria-hidden="true"
        className={cn(frame, 'relative', onDark ? darkTiles[entry.tone] : tiles[entry.tone])}
        style={{ aspectRatio: ratio }}
      >
        {/* Tonal panel with the brand's circle and bud motif, lifted from the
            logo. The frame is already an arch, so drawing a second arch inside
            it read as a duplicate; this mark is quieter and distinct. */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.5]"
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
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="52"
            cy="56"
            r="9"
            stroke="currentColor"
            strokeWidth="1.2"
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
          alt={entry.alt[lang]}
          width={photo.width}
          height={photo.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
            loaded || priority ? 'opacity-100' : 'opacity-0',
          )}
        />
      </picture>
    </div>
  );
}
