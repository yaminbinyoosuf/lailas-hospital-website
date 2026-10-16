/**
 * Full-page screenshots at phone, tablet and desktop widths, plus a check for
 * horizontal overflow and console errors.
 *
 *   node tools/screenshot.mjs [baseUrl] [path ...] [--lang=ml] [--out=screenshots]
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
// Stripped native dependency for AI Studio environment:
// import puppeteer from 'puppeteer-core';

const args = process.argv.slice(2);
const flag = (name, def) => args.find((a) => a.startsWith(`--${name}=`))?.split('=')[1] ?? def;
const positional = args.filter((a) => !a.startsWith('--'));
const base = positional[0] ?? 'http://localhost:3000';
const paths = positional.slice(1).length ? positional.slice(1) : ['/'];
const lang = flag('lang', 'en');
const outDir = path.resolve(flag('out', 'screenshots'));
const widths = (flag('widths', '390,768,1440')).split(',').map(Number);

await mkdir(outDir, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});

let problems = 0;
for (const p of paths) {
  for (const width of widths) {
    const page = await browser.newPage();
    const errors = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width, height: width < 600 ? 844 : 900, deviceScaleFactor: 1, isMobile: width < 600, hasTouch: width < 600 });
    await page.evaluateOnNewDocument((l) => localStorage.setItem('lailas.lang', l), lang);
    await page.goto(base + p, { waitUntil: 'networkidle0' });
    // Reveal everything that animates on scroll, then settle.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 900));
    });
    const overflow = await page.evaluate(() => {
      const w = document.documentElement.clientWidth;
      const offenders = [];
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.right > w + 1 && getComputedStyle(el).position !== 'fixed') {
          let a = el.parentElement;
          let clipped = false;
          while (a) {
            const s = getComputedStyle(a);
            if (/(hidden|auto|scroll|clip)/.test(s.overflowX) && a.getBoundingClientRect().right <= w + 1) {
              clipped = true;
              break;
            }
            a = a.parentElement;
          }
          if (!clipped) offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
        }
      }
      return { scrollWidth: document.documentElement.scrollWidth, width: w, offenders: offenders.slice(0, 5) };
    });
    const name = `${p === '/' ? 'home' : p.replace(/\//g, '')}-${lang}-${width}.png`;
    await page.screenshot({ path: path.join(outDir, name), fullPage: true });
    const bad = overflow.scrollWidth > overflow.width || errors.length;
    if (bad) problems++;
    console.log(
      `${bad ? 'FAIL' : 'ok  '} ${name}  overflow:${overflow.scrollWidth - overflow.width}px ${overflow.offenders.join(' ')} ${errors.length ? 'errors: ' + errors.join(' | ').slice(0, 300) : ''}`,
    );
    await page.close();
  }
}
await browser.close();
process.exitCode = problems ? 1 : 0;
