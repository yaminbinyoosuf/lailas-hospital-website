import { useEffect, useRef, useState } from 'react';
import { getPhoto, images, type ImageId, type Tone } from '../content/images';
import { useLang } from '../i18n/LanguageProvider';
import { cn } from '../lib/format';

export type PhotoShape = 'arch' | 'cradle' | 'soft' | 'leaf' | 'circle' | 'none';

const shapes: Record<PhotoShape, string> = {
  arch: 'shape-arch',
  cradle: 'shape-cradle',
  soft: 'shape-soft',
  leaf: 'shape-leaf',
  circle: 'rounded-full',
  none: '',
};

const tiles: Record<Tone, string> = {
  sand: 'bg-[linear-gradient(155deg,var(--color-sand)_10%,var(--color-sand-deep)_100%)] text-clay-400',
  sage: 'bg-[linear-gradient(155deg,var(--color-sage-100)_10%,var(--color-sage-200)_100%)] text-sage-500',
  clay: 'bg-[linear-gradient(155deg,var(--color-clay-50)_10%,var(--color-clay-100)_100%)] text-clay-400',
  teal: 'bg-[linear-gradient(155deg,var(--color-teal-50)_10%,var(--color-teal-100)_100%)] text-teal-300',
};

const darkTiles: Record<Tone, string> = {
  sand: 'bg-[linear-gradient(155deg,var(--color-teal-800)_10%,var(--color-teal-700)_100%)] text-teal-500',
  sage: 'bg-[linear-gradient(155deg,var(--color-teal-800)_10%,var(--color-teal-700)_100%)] text-teal-500',
  clay: 'bg-[linear-gradient(155deg,var(--color-teal-800)_10%,var(--color-teal-700)_100%)] text-teal-500',
  teal: 'bg-[linear-gradient(155deg,var(--color-teal-800)_10%,var(--color-teal-700)_100%)] text-teal-500',
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
  className?: string;
}

/**
 * A responsive photo with blur-up, or a calm tinted tile when the hospital
 * has not supplied the photo yet. The tile carries no text and is hidden
 * from screen readers, so nothing pretends to be a real image.
 */
export function Photo({ id, shape = 'soft', aspect, sizes = '100vw', priority, onDark, className }: PhotoProps) {
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
    return (
      <div aria-hidden="true" className={cn(frame, onDark ? darkTiles[entry.tone] : tiles[entry.tone])} style={{ aspectRatio: ratio }}>
        <svg className="absolute -right-[18%] -bottom-[22%] h-[78%] w-auto opacity-30" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="66" cy="34" r="9" stroke="currentColor" strokeWidth="1.4" />
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
