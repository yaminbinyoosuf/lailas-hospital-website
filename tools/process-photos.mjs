/**
 * Turns originals in photos/<id>.(jpg|jpeg|png|webp|heic) into responsive
 * AVIF + WebP files and a blur preview, and updates the manifest that
 * src/content/images.ts reads.
 *
 *   npm run photos
 */
import { readdir, readFile, writeFile, mkdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const inDir = path.join(root, 'photos');
const outDir = path.join(root, 'src/assets/photos');
const manifestPath = path.join(outDir, 'manifest.json');
const WIDTHS = [480, 800, 1200, 1800];

const imagesTs = await readFile(path.join(root, 'src/content/images.ts'), 'utf8');
const knownIds = new Set([...imagesTs.matchAll(/^\s{2}'([a-z0-9-]+)': \{/gm)].map((m) => m[1]));

await mkdir(outDir, { recursive: true });
const manifest = JSON.parse(await readFile(manifestPath, 'utf8').catch(() => '{}'));
const originals = (await readdir(inDir)).filter((f) => /\.(jpe?g|png|webp|heic|tiff?)$/i.test(f));

if (originals.length === 0) {
  console.log('No photos found in photos/. Add files named by image id, e.g. hero-main.jpg');
}

for (const file of originals) {
  const id = path.parse(file).name.toLowerCase();
  if (!knownIds.has(id)) {
    console.warn(`Skipping ${file}: "${id}" is not an id in src/content/images.ts`);
    continue;
  }
  const input = sharp(path.join(inDir, file)).rotate();
  const { width, height } = await input.metadata();
  const oriented = (await input.clone().metadata()).orientation >= 5 ? { width: height, height: width } : { width, height };

  // Remove older sizes for this id.
  for (const f of await readdir(outDir)) {
    if (f.startsWith(`${id}-`) && /\.(avif|webp)$/.test(f)) await unlink(path.join(outDir, f));
  }

  const widths = WIDTHS.filter((w) => w <= oriented.width);
  if (widths.length === 0) widths.push(oriented.width);

  for (const w of widths) {
    const resized = input.clone().resize({ width: w, withoutEnlargement: true });
    await resized.clone().avif({ quality: 52, effort: 5 }).toFile(path.join(outDir, `${id}-${w}.avif`));
    await resized.clone().webp({ quality: 74, effort: 5 }).toFile(path.join(outDir, `${id}-${w}.webp`));
  }

  const blurBuffer = await input.clone().resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer();
  manifest[id] = {
    width: oriented.width,
    height: oriented.height,
    blur: `data:image/webp;base64,${blurBuffer.toString('base64')}`,
    widths,
  };
  console.log(`${id}: ${widths.join(', ')}px`);
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Manifest has ${Object.keys(manifest).length} photo(s).`);
