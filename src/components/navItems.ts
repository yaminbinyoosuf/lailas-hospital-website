import type { Copy } from '../content/copy/en';

export interface NavItem {
  key: keyof Copy['nav'];
  to: string;
}

/** Five links maximum in the main navigation. */
export const mainNav: NavItem[] = [
  { key: 'services', to: '/#services' },
  { key: 'maternity', to: '/maternity' },
  { key: 'ivf', to: '/ivf' },
  { key: 'doctors', to: '/doctors' },
  { key: 'contact', to: '/contact' },
];
