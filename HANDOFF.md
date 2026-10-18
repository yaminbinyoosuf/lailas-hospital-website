# Lailas Hospital — complete project context

> A single self-contained brief. Read this and you can work on the project without
> the repository. Written for an AI assistant or a new developer picking it up cold.

---

## 1. What this is

A production website for **Lailas Hospital & IVF Centre**, a family hospital in
Chemmad, Tirurangadi PO, Malappuram District, Kerala, India. Founded 1994. Roughly
70,000 births. Services: maternity, fertility/IVF, women's health, paediatrics,
family medicine, plus emergency, laboratory and pharmacy.

The site is **English only**. It is five public pages plus a privacy page and a 404.

Repo: `yaminbinyoosuf/lailas-hospital-website` (branch `main`)

---

## 2. The rules that matter most

These are not style preferences. Breaking them caused real problems.

1. **Never invent clinical claims, statistics, quotations or credentials.**
   If a fact is not in the content files, it does not go on the site. Content that
   could not be verified was deliberately *removed*, not softened: laparoscopic
   surgery, menopause care, "IVF and ICSI" as an offering, and "first in our area"
   are all absent on purpose. See `OPEN_QUESTIONS.md`.

2. **Never substitute stock photography** for a named consultant, this hospital's
   rooms, or this hospital's equipment. `getPhoto()` returns `undefined` rather
   than borrowing an image. Placeholders are deliberate.

3. **Do not ask the client to choose fonts, colours or layouts.** Decide and
   justify. They have said this repeatedly and are frustrated by being asked.

4. **No Malayalam.** It was removed at the client's request. The i18n layer still
   exists but holds one locale.

5. **Every user-visible string lives in `src/content/copy/en.ts`.** Not in
   components. `npm run check:copy` will fail the build if JSX contains prose.

6. **Verify, don't assume.** Every claim about the build in this document was
   measured. See §13 for how.

---

## 3. Stack

| | |
|---|---|
| Framework | **React 19** |
| Language | **TypeScript**, strict |
| Build | **Vite 8** |
| Styling | **Tailwind CSS v4** — design tokens via `@theme` in `src/styles/index.css`, utilities via `@utility` |
| Routing | **React Router 8** |
| Animation | **motion 14** — `LazyMotion` + `strict`, features loaded lazily in `src/lib/motionFeatures.ts` |
| Icons | **lucide-react** |
| Class merge | **tailwind-merge**, wrapped by `cn()` in `src/lib/format.ts` |
| Fonts | **DM Sans** variable, self-hosted via `@fontsource-variable/dm-sans` |

No CSS-in-JS. No component library. No state manager — React context for booking.

Node 20+. Package manager: npm.

---

## 4. Commands

```bash
npm run dev          # Vite on :3000, host 0.0.0.0
npm run build        # client build → SSR build → prerender all routes
npm run preview      # :4173
npm run check        # typecheck + contrast + copy + fonts  ← run before every commit
npm run typecheck    # tsc --noEmit
npm run check:copy   # fails if prose is hardcoded in JSX
npm run check:contrast # every colour pair meets WCAG AA
npm run check:fonts  # CSS must not name an unbundled family
npm run photos       # photos/ originals → responsive AVIF+WebP in src/assets/photos
npm run brand        # regenerate favicons from the logo
```

`npm run check` must pass. It is the quality gate.

---

## 5. File map

```
src/
  main.tsx              client entry
  entry-server.tsx      SSR entry (used only by the prerender)
  App.tsx               routes + providers + layout
  booking/
    BookingProvider.tsx context: { open, close, state }
    BookingSheet.tsx    the 3-step booking dialog
  components/
    Accordion.tsx       flat FAQ on hairline dividers
    Button.tsx          Button, ButtonLink, ButtonAnchor
    CareForm.tsx        contact form
    Container.tsx       max-width + horizontal padding
    CountUp.tsx         animated stat
    DoctorCard.tsx      consultant profile (portrait or monogram)
    Footer.tsx  Header.tsx  Logo.tsx  MobileBar.tsx  TopStrip.tsx
    PageMeta.tsx        title/description/OG/canonical per page
    Photo.tsx           <picture> with AVIF+WebP, blur placeholder, shapes
    Reveal.tsx          scroll-in wrapper
    ScrollManager.tsx   scroll restoration
    Section.tsx         tone + vertical rhythm
    ServiceCard.tsx     exports ServiceRow (services are a list, not cards)
    navItems.ts
  content/
    site.ts             doctors, services, groups, contact, facts, flags
    copy/en.ts          ALL user-visible strings (~26KB, the largest file)
    images.ts           photo registry: id, alt, aspect, tone
    seo.ts              per-page metadata
  i18n/LanguageProvider.tsx   useCopy()
  lib/format.ts         cn(), formatDays(), formatHours()
  pages/                Home, Maternity, Ivf, Doctors, Contact, Privacy, 404, Styleguide
  sections/             Hero, Services, MaternityStory, IvfPath, PregnancyTool,
                        FounderSection, DoctorsSection, FaqSection, VisitUs,
                        PageHero, CtaBand
  styles/index.css      design tokens + utilities + component CSS (~22KB)
tools/
  check-contrast.mjs  check-copy.mjs  check-fonts.mjs
  prerender.mjs       process-photos.mjs  make-brand-assets.mjs  screenshot.mjs
photos/                 originals — GITIGNORED except README
src/assets/photos/      processed output — committed (AVIF/WebP + manifest.json)
dist/                   build output — gitignored
```

---

## 6. Design system

### Colour — every value is a CSS custom property

```
Ink        ink #1f2a27   ink-soft #4b5753   ink-muted #5f6a66
Paper      ivory #fbf7f0  paper #fffdf9   sand #f3ece0
           sand-deep #e8dece   line #e2d8c8
Teal       teal-50 #eef5f3  100 #dcebe6  200 #b9d5cd  300 #8db9ad
           500 #3e8073  600 #2b6b60  700 #1f5a51  800 #18473f
           900 #12362f  950 #0b241f
Clay       clay-50 #fbf1ea  100 #f6e6da  200 #edcdb6  400 #d18b63
           500 #bf6e45  600 #a3552f  700 #874425
Sage       sage-50 #f2f5ef  100 #e6ece1  200 #d3ddcb
           300 #b7c6ac  500 #7c9071  700 #4d6044
Emergency  #b3261e   700 #8c1d17   50 #fcedeb
```

Roles: teal is the brand and the dark surfaces. Clay is the warm accent used for
eyebrows and rules. Sage tints a band. Emergency is used **only** for emergency
affordances — never decoratively.

### Type — one family, DM Sans

```
t-display   clamp(2.5rem, 1.55rem + 3.6vw, 4.75rem)   600   -0.045em
t-h1        clamp(2rem, 1.5rem + 2.1vw, 3.25rem)      600   -0.04em
t-h2        clamp(1.625rem, 1.3rem + 1.05vw, 2.25rem) 600   -0.035em
t-h3        clamp(1.1875rem, 1.07rem + .55vw, 1.5rem) 600   -0.025em
t-h4        clamp(1.0625rem, .994rem + .27vw, 1.25rem) 600  -0.01em
t-lead      clamp(1.1875rem, 1.12rem + .3vw, 1.375rem) 400
t-body      1rem                                      400
t-small     clamp(1rem, .97rem + .12vw, 1.0625rem)    400
t-meta      0.875rem                                  400
t-label     0.75rem  uppercase  0.085em tracking      600
```

**Two non-obvious decisions, both learned the hard way:**

- **One family, not two.** A previous pairing (DM Sans headings + Source Sans 3
  body) failed because Source Sans is narrow with a small x-height and DM Sans is
  geometric with a large one, so body text sat visibly lighter than headings.
- **Headings are 600, not 650.** The whole scale was briefly set to 650, which
  flattened it: a 76px headline and a 24px card title at the same weight stop
  relating and just feel heavy. Large type carries better lighter. Weight contrast
  belongs at small sizes.
- **Typography utilities never set colour.** `t-small` and `t-meta` used to
  hardcode `ink-soft`/`ink-muted`, so inside dark bands they rendered at ~2:1 and
  were invisible. Colour is applied explicitly at call sites.

### Space, radius, elevation

- Section rhythm is a **3-step scale**: `tight` 80px · `base` 112px · `loose` 144px
  (at md; 56/80/96 below). Even 32px increments. The hero is deliberately custom.
- Radii: `--radius-sm` .375rem · `--radius-md` .75rem · `--radius-lg` 1.25rem
- Shadows: `--shadow-soft`, `--shadow-lift`. Prefer hairlines and tone over shadow.
- Motion: `motion` with `LazyMotion strict`. Everything respects
  `prefers-reduced-motion` via a global rule.

---

## 7. Content architecture

### `src/content/site.ts`

- `hospital` — name, founded, address, phones, email, plus code, geo
- `doctors: Doctor[]` — 6 entries: `laila-beegum`, `amith-k`, `jabir`,
  `v-j-sonia`, `jitha-vineeth`, `sumiya`.
  `Doctor` = `{ id, name, qualifications, specialties, languages, opd: {days,hours}, hasOwnOpdHours, imageId, group }`
- `services: Service[]` — `{ id, group, bookable }`; copy lives in `en.ts`
- `serviceGroups`, `doctorsForAny`, `getDoctor()`
- `facts` — `{ deliveries: 70000, founded, yearsOfService, firstUltrasoundYear }`
- `flags` — booleans that hide unverified content. **Check this before adding
  anything factual.**

### `src/content/copy/en.ts`

Every string. Structured by page (`pages.home`, `pages.doctors`…), by component
(`hero`, `services`, `doctors.duty`…), and by entity (`services.items[id]`,
`doctors.profiles[id]`). Functions exist where interpolation is needed, e.g.
`bookWith: (name) => \`Book with ${name}\``.

### `src/content/images.ts`

Registry of every photo position: `{ alt, aspect, tone }`. 26 positions, 7 filled.
`getPhoto(id)` returns processed data or `undefined` — it never substitutes.

### Photography pipeline

```
photos/<id>.(jpg|jpeg|png|webp|heic)
  ↓ npm run photos  (sharp)
src/assets/photos/<id>-{480,800,1200,1800}.{avif,webp} + blur + manifest.json
```

Only widths ≤ the source width are produced. Originals stay out of git; derivatives
are committed. Current total: 1.8 MB across 7 photos.

---

## 8. Pages and sections

| Route | Page | Sections |
|---|---|---|
| `/` | Home | Hero, Services, MaternityStory, IvfPath, PregnancyTool, FounderSection, DoctorsSection, FaqSection, VisitUs |
| `/maternity` | Maternity | PageHero, story, expectations, CtaBand |
| `/ivf` | IVF | PageHero, IvfPath, CtaBand |
| `/doctors` | Doctors | PageHero, filter, founder feature, 2-up directory, duty band |
| `/contact` | Contact | PageHero, CareForm, VisitUs |
| `/privacy` | Privacy | prose |
| `/styleguide` | internal | type/colour samples |

Key components:

- **`Section`** — `tone` (ivory/paper/sand/teal/sage) + `space` (tight/base/loose).
- **`ServiceRow`** — services are a hairline list of numbered rows, **not cards**.
  This was deliberate: three white cards on a dark band read as a template.
- **`DoctorCard`** — portrait (or monogram fallback), name, role in sentence case,
  qualifications on one line, OPD hours, Book. `featured` variant for the founder:
  sand panel, clay rule, larger portrait, two-column at `lg`.
- **`Photo`** — `<picture>` with AVIF → WebP → fallback, `loading="lazy"` except
  the hero, blur placeholder, shapes `arch | circle | rect`.
- **`Button`** — variants `primary | secondary | quiet | emergency | lightOutline`,
  sizes `sm | md | lg`.

---

## 9. Booking

`BookingProvider` exposes `open(target?)` where target is
`{ kind: 'service', id } | { kind: 'doctor', id }`. `BookingSheet` is a 3-step
`<dialog>`: choice → details → confirmation, with a WhatsApp fallback at every
step. The hero's service `<select>` feeds `open({kind:'service', id})`, so choosing
"Fertility and IVF" and continuing opens the sheet already scoped to it.

---

## 10. Build and deploy

```
vite build                                  → dist/ (client)
vite build --ssr src/entry-server.tsx       → dist-ssr/
node tools/prerender.mjs                    → renders 7 routes into dist/
```

Prerendering produces real HTML for every route plus `sitemap.xml` and `404.html`.
`findSsrEntry()` walks `dist-ssr` because the Cloudflare plugin emits chunked
filenames. Both named and `default` export shapes are handled.

Deploy target: **Cloudflare Workers with static assets only**. `wrangler.jsonc` is
committed: `assets.directory "./dist"`, `html_handling "auto-trailing-slash"`,
`not_found_handling "404-page"`. `dist/_redirects` is honoured.

---

## 11. Accessibility

Target: WCAG 2.2 AA. Current state, measured: **0 axe violations across 7 pages at
1440px and 390px** (1440 and 390 × 7 routes).

Conventions:
- One `h1` per page; sections use `aria-labelledby` pointing at their heading.
- The FAQ accordion is a real button + panel pair with `aria-expanded`/`controls`.
- The doctors filter is a `tablist` with proper roles and arrow-key handling.
- Dark surfaces inherit their own text colour; typography utilities set no colour.
- Icon-only controls always carry an accessible name; decorative SVG is
  `aria-hidden`.
- Focus is never removed, only styled.

---

## 12. Known state and history

Fixed in recent passes, with the reasoning:

| Problem | Fix |
|---|---|
| 38 headings rendered in the body font | a scale step pointed at `--font-sans` |
| Hero booking panel was decoration (spans, no inputs, `maternity` hardcoded) | real `<select>` feeding the booking context |
| `t-small`/`t-meta` hardcoded colour → 2.16:1 inside dark bands | utilities set type only |
| Footer/top-strip links invisible on dark | same root cause |
| WhatsApp link had no accessible name below 26rem | `sr-only` at that width |
| Hero photo 92KB served to every device | AVIF/WebP at 480/800/1200; phone gets 8KB |
| Booking panel covered the mother's face | image 134% width, pulled left 34% |
| Mobile page scrolled sideways 39px | hero image rule left it at 110% of viewport |
| Trust band overlapped the section below on mobile | static in flow below 900px |
| Doctor credentials as one chip each → ragged cards | single line |
| Every heading was weight 650 | 600, with h2 pulled from 41.6 to 36px |
| Services: 3 white cards on dark | hairline numbered list |
| Mobile hero photo looked like a stock banner | removed on phones; type carries it |

---

## 13. How to verify anything

Do not trust a claim about this build unless it was measured.

- `npm run check` — types, contrast, copy, fonts.
- Prerender count should be **7**.
- axe: run `axe-core` in a real browser against all 7 routes at 1440 and 390. A
  passing audit reports **0 nodes**.
- Horizontal overflow: compare `document.documentElement.scrollWidth` with
  `clientWidth`. Testing `scrollWidth - clientWidth` on individual elements gives
  false positives.
- Clamp arithmetic was got wrong repeatedly by estimating. Solve it in devtools
  and copy the computed value.

---

## 14. Open questions (unresolved, in `OPEN_QUESTIONS.md`)

Q30–Q37, in summary: the hospital's email address, final confirmation of the
spelling **"Dr. Jabir"**, per-doctor OPD hours for three consultants, where the
group practices appear, which claims are safe to publish, and which departments
exist. Each is written as a specific question with the current state recorded.

---

## 15. Sensible next steps

1. **Real photography for the remaining positions** — the biggest remaining gap.
   26 slots, 7 filled. Consultant portraits are done; rooms and equipment are not.
2. **Doctor and service detail pages** — six URLs is little for search to rank.
3. **Repo visibility decision** — the repository is currently **public** while
   `OPEN_QUESTIONS.md` lists unverified clinical claims. It should be private, or
   that document should be removed from it.
4. Reduce card repetition further on the home page.

---

## 16. Tone of the product

Warm, plain, specific. It talks to families in Kerala, often on a phone, often
anxious. It never sells, never exaggerates, and never promises an outcome. Where a
fact is uncertain the site says less rather than guessing.

Copy should sound like a competent person at a reception desk, not like marketing.
