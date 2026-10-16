/**
 * Scans site copy (and the built HTML, if present) for banned words, en and
 * em dashes, emojis and leftover draft wording.   npm run check:copy
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const banned = [
  'seamless', 'holistic', 'cutting edge', 'cutting-edge', 'world class', 'world-class',
  'quiet empathy', 'state of the art', 'state-of-the-art', 'journey',
  // draft text that must never ship
  'placeholder', 'lorem', 'sample patient', 'documentation in progress', 'reported milestone', 'todo', 'tbd',
];
const dash = /[–—]/;
const emoji = /\p{Extended_Pictographic}/u;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const targets = [];
for await (const f of walk(path.join(root, 'src/content/copy'))) targets.push(f);
try {
  if ((await stat(path.join(root, 'dist'))).isDirectory()) {
    for await (const f of walk(path.join(root, 'dist'))) if (f.endsWith('.html')) targets.push(f);
  }
} catch {
  /* no build yet */
}

// Alt text is visible to screen readers and search engines, so it follows the
// same rules. Only the alt strings are checked, not the code comments.
const altTargets = [path.join(root, 'src/content/images.ts')];

let issues = 0;
for (const file of [...targets, ...altTargets]) {
  let text = await readFile(file, 'utf8');
  if (altTargets.includes(file)) {
    text = [...text.matchAll(/alt:\s*'([^']*)'/g)].map((m) => m[1]).join('\n');
  }
  if (file.endsWith('.html')) {
    // Visible text only: drop scripts, styles, tags and the © line exception.
    text = text
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<[^>]+>/g, '\n');
  }
  text.split('\n').forEach((line, i) => {
    const lower = line.toLowerCase();
    const hits = banned.filter((w) => new RegExp(`\\b${w}\\b`).test(lower));
    if (dash.test(line)) hits.push('dash');
    if (emoji.test(line.replace(/[©®™]/g, ''))) hits.push('emoji');
    if (hits.length) {
      issues++;
      console.log(`${path.relative(root, file)}:${i + 1}  [${hits.join(', ')}]  ${line.trim().slice(0, 120)}`);
    }
  });
}
console.log(issues ? `\n${issues} line(s) need fixing` : `Copy check passed (${targets.length} files)`);
process.exitCode = issues ? 1 : 0;
