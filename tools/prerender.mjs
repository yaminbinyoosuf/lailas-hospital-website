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
const { render, pages, renderHead, siteUrl } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

const template = await readFile(path.join(dist, 'index.html'), 'utf8');

// Preload the two Latin fonts used above the fold to avoid layout shift.
const assets = await readdir(path.join(dist, 'assets'));
const preload = ['dm-sans-latin-wght-normal', 'source-sans-3-latin-wght-normal']
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
