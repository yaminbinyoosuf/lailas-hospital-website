# Lailas Hospital & IVF Centre website

React 19, Vite, Tailwind 4 and TypeScript. Every page is pre-rendered to static HTML at build time. The site is English only.

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
| Photo list and alt text | `src/content/images.ts` |
| Page titles, Google data | `src/content/seo.ts` (uses `en.ts` meta) |

- **Change a doctor's timings:** edit `opd` in `site.ts`. The site and Google data update together.
- **Add a doctor:** add an entry to `doctors` in `site.ts`, add the text under `doctors.profiles` in `en.ts`, and add an image id in `images.ts`.
- **Hide a section:** use `flags` in `site.ts`. Testimonials, accreditations, patient portal, articles and travel times are hidden until verified.
- **Copy rules:** short, plain sentences. No en or em dashes, no emojis, and none of the banned words. `npm run check:copy` enforces this.
- One language only. `en.ts` is the single source of copy.

## Swapping in real photos

1. Save the original as `photos/<id>.jpg` (ids are in `PHOTO_SHOTLIST.md`).
2. Run `npm run photos`. This makes AVIF and WebP sizes plus a blur preview in `src/assets/photos/`.
3. Commit `src/assets/photos/`. That position switches from its no-photo layout to the photograph automatically.

**Photographs are never substituted with stock images.** If an id has no processed photo, `getPhoto()` returns undefined: image-led layouts switch to a composition without the image (see Design system), and the remaining small positions, such as doctor portraits, show a flat placeholder or initials. Several positions are named consultants or this hospital's own rooms, and a borrowed photograph would misrepresent a real person or place. See `PHOTO_SHOTLIST.md` for the list and the rules.

The logo and share image come from `brand/lailas-logo-source.jpg`. When the vector logo arrives, replace that file and run `npm run brand`.

## Booking

Every "Book" button opens one three-step form: who, which day, then name and phone. By default it opens WhatsApp to +91 8606 800 999 with the details filled in. To send to a form service instead, set `VITE_BOOKING_ENDPOINT` in `.env`. It receives a JSON POST of `{ name, phone, who, day, language, page }`.

If the endpoint fails or takes longer than 15 seconds (`booking.timeoutMs` in `site.ts`), the form shows an error with Call and WhatsApp links, with the patient's details already filled in. After the WhatsApp step the form always offers the same two links, because the browser cannot report whether WhatsApp actually opened. If the booking form itself cannot load, a small dialog offers Call and WhatsApp instead, and the rest of the page keeps working.

## Hosting

Upload `dist/`. Each page has its own `index.html`, plus `404.html`. `public/_redirects` sends old URLs (`/ivf-fertility`, `/about`, ...) to the new pages on Netlify and Cloudflare Pages. Other hosts need the same four rules.

## Design system

Everything visual is driven by tokens and utilities in `src/styles/index.css`. When adding a
section, use these rather than inventing values. `/styleguide` (dev server only) shows them.

### Typography

Two families, both bundled with Fontsource (`@fontsource-variable/*`). There is no Google Fonts
or other external font request.

- **DM Sans Variable** (`--font-heading`): headings, figures, labels, buttons, tabs, navigation.
- **Source Sans 3 Variable** (`--font-sans`): reading text.

Only the upright faces are imported, so **never use `italic`**: the browser would fake it. The
prerender step (`tools/prerender.mjs`) preloads the two Latin files these families use; if you
change a family, change the `@import` lines, the `--font-*` stacks and the preload list together.

**The scale.** Fluid between a 400px and a 1500px viewport. Headings are weight 600 throughout.

| Utility | Use | Phone | Desktop |
| --- | --- | --- | --- |
| `t-display` | home hero only | 36px | 60px |
| `t-h1` | page title | 30px | 44px |
| `t-h2` | section heading | 26px | 36px |
| `t-h3` | subsection, card title | 20px | 26px |
| `t-h4` | list item, question, column head | 17px | 20px |
| `t-lead` | intro paragraph | 17px | 19px |
| `t-body` | default copy | 16px | 16px |
| `t-small` | supporting copy | 15px | 15px |
| `t-meta` | captions, chips | 13px | 13px |
| `t-label` | eyebrow, role label (DM Sans, uppercase) | 13px | 13px |
| `t-ui` / `t-ui-lg` | buttons, tabs, filters, nav (DM Sans 600) | 15 / 17px | 15 / 17px |
| `t-number` | figures (tabular); size set where used | context | context |

**Rules**
- `t-*` utilities set family, size, weight and line height. **They never set a colour.** Give the
  element its own colour (`text-ink-soft` for leads and supporting copy on light surfaces,
  `text-teal-100`/`text-teal-200` on dark ones), or let it inherit. This is what removed every
  `!text-*` override, and the grey-on-teal text that came from the old built-in colours.
- Headings inherit colour from their surface; most set `text-teal-950` (light) or `text-ivory`
  (dark) explicitly.
- A heading uses `t-h1` to `t-h4`, never `t-small`/`t-meta`/`t-label`. Don't override a `t-*` size
  with `text-[…]`, except `t-number`, which has no size by design.
- Keep body copy near 65 characters per line (`max-w-[34rem]` to `max-w-[38rem]`).

### Colour

Retained palette: ivory, paper, sand and sage surfaces; ink, ink-soft and ink-muted text; deep teal
for primary actions (`teal-800`) and dark sections (`teal-900`, `teal-950`); clay for small accents
only (for example doctor role labels, step numerals, the short rule on maternity cards); `emergency` red only for
emergency actions and notes. No other hues and no decorative gradients.

Dark surfaces carry the `on-dark` class. It switches the focus ring (`--focus-ring`) from
`teal-600` to `teal-200`, which keeps it above 3:1 on teal-800/900/950. `npm run check:contrast`
checks the text and background pairs the site uses (listed in `tools/check-contrast.mjs`) and
both focus rings; add a pair there when you introduce a new combination.

### Surfaces, shape and elevation

- **Cards** are plain utilities: `border border-line bg-paper` on light sections,
  `border border-white/10 bg-teal-800` on the teal IVF section. No card is translucent, and cards
  that are not links do not react to hover.
- **Translucency** is limited to `glass-bar`: the sticky header and the mobile action bar. It is
  92% ivory with a 12px blur, and falls back to solid ivory where `backdrop-filter` is not
  supported. Nothing translucent is placed inside it. The booking sheet and menu are solid; their
  backdrop is a plain dim.
- **Shadows** are for floating things only: `--shadow-soft` (header once scrolled, mobile bar) and
  `--shadow-lift` (dialogs).
- **Radius**, three tiers: `--radius-sm` 10px for buttons, inputs, tabs and chips; `--radius-md`
  16px for cards, panels inside cards and portraits; `--radius-lg` 24px for page-level panels and
  photographs. `rounded-full` only for round icon buttons, dots and the hero tagline.

Why plain utilities for cards: a custom `@utility` that sets `border` or `background` has no
reliable order against Tailwind's own `border-*`/`bg-*` utilities, and `tailwind-merge` cannot
resolve it either. Keep custom utilities for things that need extra CSS (`glass-bar` needs
`@supports`), and use core utilities for everything else.

### Layout and rhythm

- `Container`: 80rem wide, 20 / 32 / 48px side padding.
- `Section`: every full-width band uses it. `space="tight" | "base" | "loose"` (56/80, 80/112,
  96/144px top and bottom, phone/desktop); `className="pt-0 md:pt-0"` when a band continues the one
  above it. `tone` sets the surface; `tone="teal"` also adds `on-dark`.
- Header: a constant 64px (72px from xl). Scrolling only adds a shadow. Below lg the mobile bar
  (exactly 56px plus its border and the safe area) carries Call, WhatsApp and Book, and `App`
  reserves that height at the bottom of the page. From lg the header carries Book.
- **Without photographs**: every image-led layout checks `hasPhoto(id)` (`src/content/images.ts`)
  and has a composition that does not need the image: the hero shows visiting hours, page heroes
  are text-only, service cards drop the image band, the maternity and IVF sections move their
  figures or promise into the photo's column, and the maternity stages become numbered rows. Adding
  a photo switches that position back automatically.

### Motion

- 150ms for colour and hover changes, 200 to 250ms for interface state (accordion, its icon),
  300ms for the booking sheet and menu.
- `Reveal`: 400ms fade and 12px rise, stagger capped at 120ms. It only hides content that starts
  **below the first screen**, and only after hydration, so the prerendered HTML is always fully
  visible and a JavaScript or motion failure never leaves content invisible.
- No looping animations, no count-up figures, no image zoom, no header resizing.
- Hover styles use Tailwind's `hover:` variant, which Tailwind 4 already limits to
  `@media (hover: hover)`, so taps on phones never leave a hover state behind.
- `prefers-reduced-motion`: transitions and animations are cut to a single near-instant run,
  smooth scrolling is off in CSS and in `ScrollManager`, and `Reveal` does nothing.

### A note on `cn()`

`cn()` in `src/lib/format.ts` runs `tailwind-merge`, so a `className` passed to a component
correctly overrides the component's own utilities (it knows the `t-*` scale and the radius tokens).
With a plain string join, `<Container className="max-w-3xl">` silently lost to the component's
`max-w-[80rem]` because CSS order decided the winner rather than intent. It cannot order a custom
`@utility` against a core utility for the same property, which is one more reason the `t-*` scale
sets no colour.

## Quality checks

- `npm run check`: typecheck, every colour pair against WCAG AA, and the copy rules (including alt
  text).
- `npm run screenshots -- http://localhost:4173 / /maternity ...`: full-page screenshots and a
  sideways-overflow check. It needs Google Chrome (or `CHROME_PATH`).
- Lighthouse has **not** been run since the October 2026 AI Studio changes and the redesign that
  followed. Earlier figures (performance 92 to 94, accessibility 100) are out of date. Run it on
  the deployed site, on a mid-range Android phone profile, before launch.

Open questions for the hospital: `OPEN_QUESTIONS.md`.
