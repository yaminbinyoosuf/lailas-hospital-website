/**
 * Renders every page to static HTML after the client build, so search engines
 * and slow phones get real content immediately. Also writes sitemap.xml.
 */
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

/**
 * Locate the SSR entry.
 *
 * Vite emits `dist-ssr/entry-server.js` on its own, but when a plugin changes
 * the output (Cloudflare's Vite plugin does, because it enables chunking) the
 * entry becomes `dist-ssr/assets/entry-server-<hash>.js`. Both are valid, so
 * find whichever exists rather than assuming one path.
 */
async function findSsrEntry(dir) {
  const direct = path.join(dir, 'entry-server.js');
  const found = [];
  const walk = async (d) => {
    for (const e of await readdir(d, { withFileTypes: true })) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) await walk(full);
      else if (/^entry-server.*\.js$/.test(e.name)) found.push(full);
    }
  };
  try {
    await readdir(dir);
  } catch {
    throw new Error(
      `SSR build output not found at ${dir}. Did \`vite build --ssr\` run before prerender?`,
    );
  }
  await walk(dir);
  if (found.length === 0) {
    throw new Error(`No entry-server*.js found in ${dir}. Contents could not be prerendered.`);
  }
  // Prefer a top-level entry over a hashed chunk when both are present.
  found.sort((a, b) => a.length - b.length);
  return found[0];
}

const ssrEntry = await findSsrEntry(ssrDir);
console.log(`prerender: using SSR entry ${path.relative(root, ssrEntry)}`);
/**
 * Accept either export shape.
 *
 * Vite emits the entry with named exports. When a plugin changes the output
 * format (Cloudflare's Vite plugin does) the same values arrive wrapped in
 * `default`, which made `pages` undefined and failed with "pages is not
 * iterable". Normalise rather than assume.
 */
const ssrModule = await import(pathToFileURL(ssrEntry).href);
const ssr = typeof ssrModule.render === 'function' ? ssrModule : ssrModule.default;

if (!ssr || typeof ssr.render !== 'function' || !Array.isArray(ssr.pages)) {
  throw new Error(
    `SSR entry at ${path.relative(root, ssrEntry)} did not expose render() and pages[]. ` +
      `Found keys: ${Object.keys(ssrModule).join(', ') || 'none'}`,
  );
}

const { render, pages, renderHead, siteUrl } = ssr;

const template = await readFile(path.join(dist, 'index.html'), 'utf8');

// Preload the two Latin fonts used above the fold to avoid layout shift.
const assets = await readdir(path.join(dist, 'assets'));
const preload = ['dm-sans-latin-wght-normal']
  .map((n) => assets.find((f) => f.startsWith(n) && f.endsWith('.woff2')))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ');

const page = (url) =>
  template
    .replace(/<title>.*?<\/title>\s*/, '')
    .replace(/<meta name="description".*?\/>\s*/, '')
    .replace(/<meta property="og:title".*?\/>\s*/, '')
    .replace(/<meta property="og:description".*?\/>\s*/, '')
    .replace('<!--app-head-->', `${renderHead(url)}\n    ${preload}`)
    .replace('<!--app-html-->', render(url));

for (const p of pages) {
  const html = page(p.path);
  const file = p.path === '/' ? path.join(dist, 'index.html') : path.join(dist, p.path.slice(1), 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
  if (p.path !== '/') await writeFile(path.join(dist, `${p.path.slice(1)}.html`), html);
  console.log(`prerendered ${p.path}`);
}
await writeFile(path.join(dist, '404.html'), page('/404'));
console.log('prerendered 404.html');

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${siteUrl}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await rm(ssrDir, { recursive: true, force: true });
console.log('wrote sitemap.xml');
