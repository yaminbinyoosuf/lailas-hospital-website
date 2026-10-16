/**
 * WCAG contrast check for the text/background pairs the site uses.
 * Reads token values from src/styles/index.css.  npm run check:contrast
 */
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../src/styles/index.css', import.meta.url), 'utf8');
const tokens = Object.fromEntries([...css.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
const hex = (name) => (name === 'white' ? '#ffffff' : tokens[name]);

// [text, background, min ratio, where]
const pairs = [
  ['ink', 'ivory', 4.5, 'body text'],
  ['ink-soft', 'ivory', 4.5, 'secondary text'],
  ['ink-muted', 'ivory', 4.5, 'small notes'],
  ['ink-muted', 'paper', 4.5, 'card notes'],
  ['ink-soft', 'sand', 4.5, 'sand sections'],
  ['ink-muted', 'sand', 4.5, 'sand notes'],
  ['ink-soft', 'sage-50', 4.5, 'pregnancy section'],
  ['ink-muted', 'sage-50', 4.5, 'pregnancy notes'],
  ['ink-soft', 'sage-100', 4.5, 'duty band'],
  ['ink-soft', 'clay-50', 4.5, 'extra care band'],
  ['teal-950', 'ivory', 4.5, 'headings'],
  ['teal-800', 'ivory', 4.5, 'links'],
  ['teal-800', 'paper', 4.5, 'card links'],
  ['ivory', 'teal-700', 4.5, 'primary button'],
  ['ivory', 'teal-800', 4.5, 'active tab, CTA band'],
  ['teal-100', 'teal-800', 4.5, 'CTA band text'],
  ['ivory', 'teal-900', 4.5, 'IVF section'],
  ['teal-100', 'teal-900', 4.5, 'IVF lead'],
  ['teal-200', 'teal-900', 4.5, 'IVF label, step word'],
  ['clay-200', 'teal-800', 3, 'IVF illustration (non-text)'],
  ['teal-100', 'teal-950', 4.5, 'footer text'],
  ['teal-200', 'teal-950', 4.5, 'footer legal'],
  ['clay-600', 'ivory', 4.5, 'role labels'],
  ['clay-600', 'paper', 4.5, 'stage focus'],
  ['clay-600', 'sand', 3, '70,000+ (large)'],
  ['clay-700', 'sand', 4.5, 'visit labels'],
  ['clay-700', 'clay-50', 4.5, 'due window label'],
  ['clay-600', 'ivory', 4.5, 'tagline (italic)'],
  ['sage-700', 'sage-50', 4.5, 'pregnancy label'],
  ['teal-800', 'sage-50', 3, 'week number (large)'],
  ['white', 'emergency', 4.5, 'emergency button'],
  ['emergency', 'paper', 4.5, 'mobile bar Call'],
  ['emergency-700', 'emergency-50', 4.5, 'emergency notes'],
  ['ink-soft', 'sand', 4.5, 'inactive tab'],
  ['teal-900', 'ivory', 4.5, 'light button text'],
  ['teal-600', 'ivory', 3, 'focus ring (non-text)'],
  ['teal-600', 'paper', 3, 'check icons (non-text)'],
  ['teal-300', 'teal-800', 4.5, 'IVF step label on solid step cards'],
  ['clay-700', 'paper', 4.5, 'doctor role label on paper cards'],
  // .on-dark sets --focus-ring to teal-200 on these surfaces
  ['teal-200', 'teal-800', 3, 'focus ring on dark (CTA band, contact card)'],
  ['teal-200', 'teal-900', 3, 'focus ring on dark (IVF section)'],
  ['teal-200', 'teal-950', 3, 'focus ring on dark (footer, top strip)'],
];

let failed = 0;
for (const [fg, bg, min, where] of pairs) {
  const r = ratio(hex(fg), hex(bg));
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? 'pass' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  (min ${min})  ${fg} on ${bg}  ${where}`);
}
console.log(failed ? `\n${failed} pair(s) below WCAG AA` : '\nAll pairs meet WCAG AA');
process.exitCode = failed ? 1 : 0;
