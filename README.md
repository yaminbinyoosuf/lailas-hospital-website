# Lailas Hospital & IVF Centre website

React 19, Vite, Tailwind 4 and TypeScript. Every page is pre-rendered to static HTML at build time. The site works in English and Malayalam.

```
npm install
npm run dev        # http://localhost:3000  (style reference at /styleguide)
npm run build      # static site in dist/
npm run preview    # serve the build at http://localhost:4173
npm run check      # typecheck + contrast + banned-words check
```

## Editing content

You never need to touch components to change words or facts.

| What | File |
|---|---|
| Phones, address, hours, doctors, services, flags | `src/content/site.ts` |
| Every English sentence | `src/content/copy/en.ts` |
| Every Malayalam sentence (same structure) | `src/content/copy/ml.ts` |
| Photo list and alt text | `src/content/images.ts` |
| Page titles, Google data | `src/content/seo.ts` (uses `en.ts` meta) |

- **Change a doctor's timings:** edit `opd` in `site.ts`. The site and Google data update together.
- **Add a doctor:** add an entry to `doctors` in `site.ts`, add the text under `doctors.profiles` in both copy files, and add an image id in `images.ts`.
- **Hide a section:** use `flags` in `site.ts`. Testimonials, accreditations, patient portal, articles and travel times are hidden until verified.
- **Copy rules:** short, plain sentences. No en or em dashes, no emojis, and none of the banned words. `npm run check:copy` enforces this.
- TypeScript stops the build if the English and Malayalam files don't match.

## Swapping in real photos

1. Save the original as `photos/<id>.jpg` (ids are in `PHOTO_SHOTLIST.md`).
2. Run `npm run photos`. This makes AVIF and WebP sizes plus a blur preview in `src/assets/photos/`.
3. Commit `src/assets/photos/`. The warm tile is replaced automatically.

The logo and share image come from `brand/lailas-logo-source.jpg`. When the vector logo arrives, replace that file and run `npm run brand`.

## Booking

Every "Book" button opens one three-step form: who, which day, then name and phone. By default it opens WhatsApp to +91 8606 800 999 with the details filled in. To send to a form service instead, set `VITE_BOOKING_ENDPOINT` in `.env`. It receives a JSON POST of `{ name, phone, who, day, language, page }`.

## Hosting

Upload `dist/`. Each page has its own `index.html`, plus `404.html`. `public/_redirects` sends old URLs (`/ivf-fertility`, `/about`, ...) to the new pages on Netlify and Cloudflare Pages. Other hosts need the same four rules.

## Quality checks (October 2026)

- Lighthouse mobile, all pages: performance 92 to 94, accessibility 100, best practices 100, SEO 100. CLS 0, TBT 0 ms.
- Every colour pair meets WCAG AA (`npm run check:contrast`).
- `npm run screenshots` captures 390, 768 and 1440 px and flags sideways overflow.

Open questions for the hospital: `OPEN_QUESTIONS.md`.
