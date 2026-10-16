import logoUrl from '../assets/brand/logo.webp';
import logoLightUrl from '../assets/brand/logo-light.webp';
import { hospital } from '../content/site';
import { cn } from '../lib/format';

export function Logo({ light, className }: { light?: boolean; className?: string }) {
  return (
    <img
      src={light ? logoLightUrl : logoUrl}
      alt={`${hospital.shortName}, ${hospital.tagline}`}
      width={355}
      height={144}
      className={cn('h-12 w-auto', className)}
    />
  );
}
