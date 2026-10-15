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

## Design system

Everything visual is driven by tokens in `src/styles/index.css`. If you are adding a section,
extend these rather than inventing values.

### Typography

Two families, self-hosted via Fontsource:

- **Fraunces** (optical-size serif) for display, section headings and figures. It is the brand's
  voice; weight 450 at large sizes keeps it from thinning out on cream stock.
- **Instrument Sans** for interface and body. A sharper editorial grotesque than the previous
  Source Sans 3, and it holds up at the 14–17px sizes most of this site lives at.
- **Noto Sans Malayalam** sits in both fallback chains so Malayalam copy renders correctly.

The scale has one step per role — `t-display`, `t-h1`…`t-h4`, `t-lead`, `t-body`, `t-small`,
`t-meta`, `t-label`, `t-number`. Use them instead of `text-[…]`; arbitrary sizes are what made the
old pages inconsistent. Body copy is 16px on phones and 17px from 768px up.

### Colour

Ivory / paper / sand surfaces, deep teal as the primary, a single clay accent, sage as a secondary
surface, and `emergency` reserved strictly for emergency use. Muted text is `ink-soft`, with
`ink-muted` for captions. Every text pair is verified by `npm run check:contrast`.

### Shape and elevation

Three radius tiers only:

| Token | Value | Used for |
| --- | --- | --- |
| `--radius-sm` | 0.625rem | buttons, inputs, chips |
| `--radius-md` | 1.125rem | cards, media, inner blocks |
| `--radius-lg` | 1.5rem | page-level panels, hero media |

Photo shapes (`shape-arch`, `shape-cradle`, `shape-soft`) are the brand motif — an arch echoes a
doorway, a cradle echoes a newborn. Keep them for imagery; do not apply them to controls.

Shadow is reserved for things that genuinely float — the sticky header, the booking sheet, the
mobile bar. Cards use a hairline ring instead.

### Rhythm

`Section` takes `space="tight" | "base" | "loose"`. A page of identically spaced sections reads as
monotonous, so spacing is mapped deliberately across the home page: tight where two sections share
a thought, loose where the subject or the tone changes.

### A note on `cn()`

`cn()` in `src/lib/format.ts` runs `tailwind-merge`, so a `className` passed to a component
correctly overrides the component's own utilities. This matters: with a plain string join,
`<Container className="max-w-3xl">` silently lost to the component's `max-w-[80rem]` because CSS
order decided the winner rather than intent.

## Quality checks (October 2026)

- Lighthouse mobile, all pages: performance 92 to 94, accessibility 100, best practices 100, SEO 100. CLS 0, TBT 0 ms.
- Every colour pair meets WCAG AA (`npm run check:contrast`).
- `npm run screenshots` captures 390, 768 and 1440 px and flags sideways overflow.

Open questions for the hospital: `OPEN_QUESTIONS.md`.
