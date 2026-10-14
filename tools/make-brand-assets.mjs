/**
 * Builds the Open Graph image and app icons from brand/lailas-logo-source.jpg.
 * Replace the source with a vector logo when the hospital supplies one.
 *
 *   npm run brand
 */
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'brand/lailas-logo-source.jpg');
const out = (f) => path.join(root, 'public', f);
const IVORY = { r: 251, g: 247, b: 240 };

// Full logo (symbol + wordmark) and the round symbol on its own.
const logo = await sharp(src).extract({ left: 180, top: 390, width: 720, height: 300 }).toBuffer();
const symbol = await sharp(src).extract({ left: 176, top: 388, width: 300, height: 300 }).toBuffer();

// White JPG background disappears into ivory with a multiply blend.
const onIvory = async (input, width, height) =>
  sharp({ create: { width, height, channels: 3, background: IVORY } })
    .composite([{ input, blend: 'multiply', gravity: 'center' }])
    .png()
    .toBuffer();

// Open Graph 1200x630: logo on ivory with a soft clay arch.
const arch = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <path d="M860 630V330a170 170 0 0 1 340 0v300z" fill="#f6e6da"/>
  <circle cx="1030" cy="420" r="120" fill="none" stroke="#d18b63" stroke-opacity=".45" stroke-width="3"/>
  <circle cx="1080" cy="368" r="22" fill="none" stroke="#d18b63" stroke-opacity=".45" stroke-width="3"/>
</svg>`);
const logoWide = await sharp(logo).resize({ width: 720 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: IVORY } })
  .composite([
    { input: arch, top: 0, left: 0 },
    { input: logoWide, top: 165, left: 90, blend: 'multiply' },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(out('og.jpg'));

for (const [file, size] of [
  ['icon-512.png', 512],
  ['icon-192.png', 192],
  ['apple-touch-icon.png', 180],
  ['favicon-32.png', 32],
]) {
  const inner = Math.round(size * 0.8);
  const sym = await sharp(symbol).resize(inner, inner).toBuffer();
  await sharp(await onIvory(sym, size, size)).png().toFile(out(file));
}
console.log('Wrote public/og.jpg and icons');
