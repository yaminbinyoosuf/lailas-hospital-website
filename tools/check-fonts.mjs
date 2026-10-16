/**
 * Font consistency check.   npm run check:fonts
 *
 * Catches two silent failures that no other check covers:
 *
 *  1. A font loaded from a CDN in index.html that the stylesheet never uses.
 *     That happened here: index.html requested Outfit and Plus Jakarta Sans
 *     while the CSS had moved to self-hosted DM Sans and Source Sans 3, so
 *     every visitor downloaded two families the page never rendered with.
 *
 *  2. A font named in the CSS that is neither bundled via Fontsource nor
 *     loaded from a CDN, which means it silently falls back to a system font.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const css = await readFile(path.join(root, 'src/styles/index.css'), 'utf8');
const html = await readFile(path.join(root, 'index.html'), 'utf8');

const problems = [];

/* Families the stylesheet actually uses, from the --font-* tokens. */
const tokens = [...css.matchAll(/--font-[a-z]+:\s*([^;]+);/g)].map((m) => m[1]).join(' ');
const declared = new Set(
  [...tokens.matchAll(/'([^']+)'/g)]
    .map((m) => m[1].trim())
    .filter((n) => !/^(ui-|system-ui|-apple-system|Segoe UI|Roboto|sans-serif|serif|Georgia|monospace)$/i.test(n))
    .map((n) => n.replace(/\s+Variable$/, '')),
);

/* Families bundled through Fontsource (@import '@fontsource.../<family>/...'). */
const bundled = new Set(
  [...css.matchAll(/@fontsource(?:-variable)?\/([a-z0-9-]+)\//g)].map((m) =>
    m[1].split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' '),
  ),
);

/* Families requested from a CDN. */
const cdn = new Set(
  [...html.matchAll(/fonts\.googleapis\.com\/css2\?([^"']+)/g)]
    .flatMap((m) => decodeURIComponent(m[1]).split('&'))
    .filter((p) => p.startsWith('family='))
    .map((p) => p.replace('family=', '').split(':')[0].replace(/\+/g, ' ')),
);

for (const family of cdn) {
  if (![...declared].some((d) => d.toLowerCase() === family.toLowerCase())) {
    problems.push(`index.html loads "${family}" from Google Fonts but the CSS never uses it.`);
  }
}

for (const family of declared) {
  const same = (a, b) => a.toLowerCase() === b.toLowerCase();
  const known = [...bundled].some((b) => same(b, family)) || [...cdn].some((c) => same(c, family));
  if (!known) {
    problems.push(`CSS names "${family}" but it is neither bundled via Fontsource nor loaded from a CDN.`);
  }
}

if (problems.length) {
  console.error('Font check failed:\n' + problems.map((p) => '  - ' + p).join('\n'));
  process.exit(1);
}

console.log(
  `Font check passed. Used: ${[...declared].join(', ') || 'none'}. ` +
    `Bundled: ${[...bundled].join(', ') || 'none'}. CDN: ${[...cdn].join(', ') || 'none'}.`,
);
