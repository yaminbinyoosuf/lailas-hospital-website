/**
 * Image asset registry.
 *
 * The Vite build hashes exactly what is imported here, so nothing unused ships.
 * Each photograph is exported as a responsive set (small + large WebP, plus a
 * JPEG fallback for the hero) so phones never download a desktop-sized file.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * THESE ARE STOCK PHOTOGRAPHS, NOT PHOTOGRAPHS OF LAILAS HOSPITAL.
 * Replace them with authentic photography of the hospital before go-live.
 * The hero file is framed so that no unrelated third-party signage is visible.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import heroSmallWebp from '../assets/images/hero-lobby-960.webp';
import heroLargeWebp from '../assets/images/hero-lobby-1376.webp';
import heroSmallJpg from '../assets/images/hero-lobby-960.jpg';
import heroLargeJpg from '../assets/images/hero-lobby-1376.jpg';

import consultationSmall from '../assets/images/consultation-600.webp';
import consultationLarge from '../assets/images/consultation-1200.webp';

import maternitySmall from '../assets/images/maternity-600.webp';
import maternityLarge from '../assets/images/maternity-1200.webp';

import laboratorySmall from '../assets/images/laboratory-600.webp';
import laboratoryLarge from '../assets/images/laboratory-1200.webp';

export interface ResponsiveImage {
  src: string;
  /** `srcset` candidate string for the modern format. */
  webpSrcSet: string;
  /** Optional broadly-compatible fallback set. */
  jpgSrcSet?: string;
  fallback?: string;
  sizes: string;
}

export const heroLobby: ResponsiveImage = {
  src: heroLargeWebp,
  webpSrcSet: `${heroSmallWebp} 960w, ${heroLargeWebp} 1376w`,
  jpgSrcSet: `${heroSmallJpg} 960w, ${heroLargeJpg} 1376w`,
  fallback: heroLargeJpg,
  // Hero occupies roughly half the grid on desktop, full width on mobile.
  sizes: '(min-width: 1024px) 46vw, (min-width: 640px) 80vw, 92vw',
};

export const consultationRoom: ResponsiveImage = {
  src: consultationLarge,
  webpSrcSet: `${consultationSmall} 600w, ${consultationLarge} 1200w`,
  sizes: '(min-width: 1024px) 46vw, 92vw',
};

export const maternityRoom: ResponsiveImage = {
  src: maternityLarge,
  webpSrcSet: `${maternitySmall} 600w, ${maternityLarge} 1200w`,
  sizes: '(min-width: 1024px) 46vw, 92vw',
};

export const laboratory: ResponsiveImage = {
  src: laboratoryLarge,
  webpSrcSet: `${laboratorySmall} 600w, ${laboratoryLarge} 1200w`,
  sizes: '(min-width: 1024px) 42vw, (min-width: 640px) 60vw, 92vw',
};
