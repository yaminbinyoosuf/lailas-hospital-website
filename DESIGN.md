# Design system

This documents the design of the site **as it exists on `main` in this repository**, not as
planned. Every value below was read from the source on `main` at the time of writing; the file
is the reference, the code is the truth. If the two disagree, the code wins and this file is out
of date.

Scope: visual language, typography, colour, shape, spacing, motion, components, imagery strategy
and accessibility. Content editing, booking and hosting are covered in `README.md`.

---

## 1. The idea

An established hospital in Chemmad, 1994 to now, built on maternity, fertility, women's health and
24 hour emergency care. The design has to carry two things at once: the calm of a place you would
choose to have a baby in, and the authority of a hospital you would trust in an emergency.

That tension is resolved by restraint. Warm off white surfaces, one deep green, one warm accent,
two typefaces with clear jobs, and hairline borders instead of decoration. Nothing is added to
look contemporary. The confidence comes from spacing, typography and hierarchy.

The visual language is **glass and light on warm paper**: translucent cards over soft ambient
colour gradients, generous white space, and colour used sparingly enough that it still means
something.

---

## 2. Typography

### Families

One variable family, **self-hosted** through Fontsource. No network request to a font CDN is made
at runtime, and `npm run check:fonts` fails the build if that stops being true.

| Token | Family | Role |
| --- | --- | --- |
| `--font-heading` | **DM Sans** | every heading, every figure, every statistic |
| `--font-sans` | **DM Sans** | body copy, interface labels, controls, navigation |

**DM Sans** does both jobs. It was drawn for display and text, so the same geometry carries a 76px
headline and a 13px credential without the two looking like they came from different sites.

This replaced a two-family pairing with Source Sans 3, which was the wrong partner: Source Sans is
narrow with a small x-height, DM Sans is geometric with a large one, so body text sat visibly
lighter and smaller than the headings beside it. Hierarchy now comes from weight, size, spacing and
colour within one typeface, which is also how Swiss clinical typography has always done it.

It is one family, not one weight. Headings run at 650 and are tracked tight; body sits at 400 with
normal spacing. The contrast is in the treatment, not the typeface.

### Scale

One step per role. Sizes are fluid so no component needs its own media query.

| Utility | Role | 390px | 768px | 1440px | Weight | Line height | Tracking |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `t-display` | home hero only | 40.0 | 52.4 | 76.0 | 650 | 1.03 | -0.045em |
| `t-h1` | page title | 32.2 | 40.1 | 52.0 | 650 | 1.08 | -0.04em |
| `t-h2` | section heading | 28.0 | 32.0 | 41.0 | 650 | 1.12 | -0.035em |
| `t-h3` | subsection, card title | 20.3 | 23.0 | 27.2 | 650 | 1.22 | -0.025em |
| `t-h4` | list item, question, column head | 17.0 | 18.0 | 19.8 | 600 | 1.38 | -0.01em |
| `t-lead` | intro paragraph | 17.0 | 17.5 | 18.5 | 400 | 1.65 | -0.005em |
| `t-body` | default copy | 16.0 | 16.0 | 16.0 | 400 | 1.65 | normal |
| `t-small` | supporting copy | 15.0 | 15.0 | 15.0 | 400 | 1.60 | normal |
| `t-meta` | caption, credentials | 13.0 | 13.0 | 13.0 | 400 | 1.50 | normal |
| `t-label` | eyebrow, small-caps label | 12.0 | 12.0 | 12.0 | 600 | — | 0.12em |
| `t-number` | statistics | context | context | context | 600 | 1.00 | -0.03em |

Values in px. The four smallest steps are intentionally fixed rather than fluid: micro type that
scales is usually a mistake, because it is already at the limit of comfortable reading.

The body root is 16px, stepping to 17px from 768px up.

### Rules

- **A heading uses a heading utility.** Never put `t-small`, `t-meta` or `t-label` on an
  `<h1>` to `<h4>`. Headings styled as UI labels were the other half of the original
  inconsistency.
- **Never override a `t-*` size with `text-[…]`.** Two such overrides once inverted the
  hierarchy, making an `<h3>` larger than the `<h2>` above it.
- **Measure matters.** **Typography utilities never set colour.** `t-small` and `t-meta` used to hardcode `ink-soft` and
`ink-muted`, which meant any use inside a dark band rendered at about 2:1 and was effectively
invisible. An axe audit caught it in the footer and the top strip. They now set type only; a
muted colour is applied explicitly where it belongs, and text inside a dark surface inherits that
surface's colour.

Body copy is capped near 65 to 70 characters per line. The FAQ answers use
  `max-w-[34rem]`. No automated check measures this, so verify by hand after changing a
  paragraph width.
- **Do not add a third family.** The two families are budgeted; the second serif that earlier
  drafts used was removed precisely to stay at two.

---

## 3. Colour

### Surfaces

| Token | Hex | Use |
| --- | --- | --- |
| `--color-ivory` | `#fbf7f0` | page background |
| `--color-paper` | `#fffdf9` | cards, panels |
| `--color-sand` | `#f3ece0` | alternate section tone |
| `--color-sand-deep` | `#e8dece` | pressed and deep sand |
| `--color-line` | `#e2d8c8` | every hairline border |

### Text

| Token | Hex | Use |
| --- | --- | --- |
| `--color-ink` | `#1f2a27` | body and headings |
| `--color-ink-soft` | `#4b5753` | secondary copy |
| `--color-ink-muted` | `#5f6a66` | captions, credentials |

### Primary: deep teal

`50 #eef5f3` · `100 #dcebe6` · `200 #b9d5cd` · `300 #8db9ad` · `500 #3e8073` ·
`600 #2b6b60` · `700 #1f5a51` · `800 #18473f` · `900 #12362f` · `950 #0b241f`

Teal is the brand colour. `700` to `900` carry the dark bands, the primary button and the sticky
header. `50` to `200` are surfaces and tints.

### Accent: clay

`50 #fbf1ea` · `100 #f6e6da` · `200 #edcdb6` · `400 #d18b63` · `500 #bf6e45` ·
`600 #a3552f` · `700 #874425`

One warm accent, used sparingly. Its job is to stop the palette reading as cold medicine. It is
not a second brand colour and should not decorate more than one element per view.

### Secondary surface: sage

`50 #f2f5ef` · `100 #e6ece1` · `200 #d3ddcb` · `300 #b7c6ac` · `500 #7c9071` · `700 #4d6044`

Alternative section tone, used for the pregnancy tool band. Never for text.

### Emergency

`--color-emergency #b3261e` · `-700 #8c1d17` · `-50 #fcedeb`

**Reserved strictly for emergency information.** It appears on the casualty line in the top strip,
the emergency note in the hero, the emergency phone button and the booking sheet's emergency
reminder. Nowhere else. Diluting it is how a site trains people to ignore the one colour that
should stop them.

### Contrast

Every text pair is verified by `npm run check:contrast`, which prints real ratios and fails below
WCAG AA. Currently all pairs pass.

---

## 4. Shape and elevation

### Radii

Three tiers, each with a job.

| Token | Value | Use |
| --- | --- | --- |
| `--radius-sm` | `0.375rem` (6px) | buttons, inputs, chips, small tiles |
| `--radius-md` | `0.75rem` (12px) | cards, media, inner blocks |
| `--radius-lg` | `1.25rem` (20px) | page-level panels, hero media, the booking sheet |

`rounded-full` is the fourth shape, for icon buttons, avatars and circular media only.

The only other radius class in the codebase is a `rounded-md` on the header's logo link, which is
invisible: it exists to keep the focus ring from being a sharp rectangle. Every visible radius is
a token. Arbitrary radii are the fastest way to make a page look assembled rather than designed.

### Elevation

Only two shadows exist, and shadow is reserved for things that genuinely float.

| Token | Value | Use |
| --- | --- | --- |
| `--shadow-soft` | `0 8px 28px -18px rgb(11 36 31 / 0.22)` | resting cards, sticky header |
| `--shadow-lift` | `0 24px 56px -24px rgb(11 36 31 / 0.28), 0 6px 16px -8px rgb(11 36 31 / 0.16)` | the booking sheet, hovered cards |

Everything that is not floating uses a **hairline border** (`--color-line`) or a subtle ring
instead. Borders carry hierarchy; shadows only signal that something is above the page.

### `shape-arch`, `shape-cradle`, `shape-soft`

These three utilities currently all resolve to `--radius-lg`. They are kept as named hooks because
they mark intent — an arch for portraits, a cradle for newborn imagery — so the shapes can be
reintroduced without touching call sites. **As of this commit they render identically.** Do not
claim otherwise: there is no arch silhouette on the site today.

### Glass

The defining surface treatment, used instead of flat cards.

| Utility | Treatment |
| --- | --- |
| `glass-card` | `rgb(255 253 249 / 0.76)`, 16px backdrop blur, 1px white border, inner top highlight |
| `glass-card-hover` | lifts 3px, swaps to `--shadow-lift`, warms the border on hover |
| `glass-pill` | lighter 65% paper, 12px blur — the header navigation capsule |
| `glass-dark` | `rgb(18 54 47 / 0.65)`, 18px blur — panels on dark bands |

Glass needs something behind it to be legible. It is always paired with `ambient-mesh` or a dark
section, never placed on flat ivory where it would look like a plain white box.

### Ambient mesh

`ambient-mesh` paints three soft radial gradients — teal top left, clay top right, sage bottom —
across a section. Used on the hero and other light bands to give the paper some light and make the
glass cards read as glass.

---

## 5. Layout and rhythm

### Container

`mx-auto w-full max-w-[80rem] px-5 sm:px-8 lg:px-12`

One container, one left edge, one right edge. 80rem maximum width, gutters stepping from 20px to
32px to 48px.

### Section spacing

`Section` takes `space="tight" | "base" | "loose"`.

| Space | Padding |
| --- | --- |
| `tight` | `py-14 md:py-20` |
| `base` | `py-20 md:py-28` |
| `loose` | `py-24 md:py-36` |

A page of identically spaced sections reads as monotonous, so the spacing is mapped deliberately:
tight where two sections share a thought, loose where the subject or the tone changes.

### Section tones

`ivory` (default), `paper`, `sand`, `sage` (`bg-sage-50`), `teal` (`bg-teal-900 text-ivory`).

A dark teal band roughly once per page gives the eye somewhere to rest and marks a change of
subject. Reaching for it more often removes the effect.

### Grid

Twelve columns at `lg`, used as `lg:col-span-N`. An asymmetric split such as 7/5 or 5/7 is
preferred over halves when one side is text and the other is an image or panel. Lists that must
wrap long words use `min-w-0` on the children and `minmax(0,1fr)` tracks, otherwise an
unbreakable word sets an intrinsic width wider than a phone.

---

## 6. Motion

Motion is quiet, purposeful, and only below the first screen.

| Where | Treatment |
| --- | --- |
| Scroll reveal (`Reveal`) | opacity 0 to 1, y 20px to 0, 800ms, `cubic-bezier(0.22, 1, 0.36, 1)`, once |
| Card hover (`glass-card-hover`) | 3px lift plus shadow, 350ms |
| Header on scroll | height and padding compress, background gains blur and a hairline |
| Care form | slow 12s float, desktop only, motion-safe only |
| Accordion | grid row 0fr to 1fr plus opacity, 400ms |

**Nothing bounces, springs or scales on press.** `--ease-gentle` is
`cubic-bezier(0.22, 1, 0.36, 1)`; use it rather than a new curve.

`prefers-reduced-motion: reduce` disables scroll behaviour and collapses transition and animation
durations to 0.01ms globally. The care-form float is also gated behind
`prefers-reduced-motion: no-preference` at source rather than relying on the global override.

---

## 7. Components

### Button

Variants: `primary` (teal 700), `secondary` (paper with hairline border), `quiet` (a text link with
a thick underline, no box), `emergency`, `light`, `lightOutline`.

Sizes: `md` (`min-h-12`) and `lg` (`min-h-[3.25rem]`). Radius `--radius-sm`, weight 600.
The primary button carried Tailwind's default `rounded-lg` (8px) until it was brought onto the
scale; every visual radius in the site is now a token.

One primary action per view. `quiet` exists specifically so a second action can sit beside the
first without competing with it.

### Photo and placeholders

`Photo` resolves an image id from `src/content/images.ts`. It renders a responsive `<picture>` with
AVIF, WebP, a blur-up background and real alt text.

**When no genuine photograph exists it renders a placeholder, and never a stock image.**

- **Consultant portraits** show initials over a soft emblem watermark — a deliberate profile mark,
  not a grey box.
- **Everything else** gets a flat tonal panel carrying the logo's circle-and-bud motif.
- `omitIfMissing` renders nothing at all, for wide decorative bands that would otherwise be a void.

The one real photograph (`hero-editorial`) goes through `npm run photos`, which writes AVIF and
WebP at 480, 800 and 1200 px plus a blur preview. The hero serves it with `<picture>` and `sizes`,
so a phone fetches the 8 KB AVIF rather than the 92 KB original, and there is no layout shift
because width and height are set.

`getPhoto()` returns `undefined` rather than substituting borrowed imagery. Several positions are
named consultants or this hospital's own rooms, and a stranger's photograph above a real doctor's
name would misrepresent a person. `PHOTO_SHOTLIST.md` lists the 26 positions and the rules.

### Header

Sticky, translucent on scroll, with a capsule navigation (`glass-pill`) and a persistent Book
button. The desktop navigation appears at `xl`, not `lg`: the cluster did not fit at 1024px and
overflowed by 8px before this was corrected.

### Booking sheet

A native `<dialog>` with `showModal()`. Three steps (who, when, details), a progress line, the
emergency reminder pinned at the top, and `inert` on everything closed. Falls back to WhatsApp
when no endpoint is configured. Scroll is locked while open and focus moves to the heading on each
step.

### Accordion

A flat list on hairline dividers — no cards. The open row is tinted `sand/35` rather than raised.
`aria-expanded` on the trigger, `aria-controls` to a `role="region"` panel, `inert` when closed,
and arrow keys, Home and End move between questions. Answers stay in the markup so find-in-page
and search engines still see them.

---

## 8. Accessibility

Non-negotiable, and mostly enforced by the checks rather than by review.

- **Contrast.** All text pairs meet WCAG AA; `npm run check:contrast` fails the build otherwise.
- **Focus.** A global `:focus-visible` rule gives a 3px teal outline with a 3px offset. It is not
  removed anywhere; the one exception, the pregnancy week slider, moves the outline onto the
  thumb so it stays visible.
- **Reduced motion.** Honoured globally, and the decorative float is gated at source.
- **Targets.** Interactive elements are at least 44px tall on touch.
- **Language.** `lang="en"` on the document; the site is English only.
- **Semantics.** One `<h1>` per page, headings describe structure and never skip a level, the
  accordion and tab interfaces carry the correct ARIA roles, and decorative layers are
  `aria-hidden`.
- **No-JS.** Content is prerendered, and a `noscript` rule forces reveal animations visible so
  nothing is left at `opacity: 0` without JavaScript.

---

## 9. What is deliberately not here

The `flags` object in `src/content/site.ts` hides content that cannot be substantiated. All of the
following are `false`, and should stay that way until the hospital provides evidence:

| Flag | Why |
| --- | --- |
| `showTestimonials` | only sample quotes existed |
| `showAccreditations` | no documentary proof |
| `showPatientPortal` | the old portal used sample data; there is no records system |
| `showArticles` | no named author or medical reviewer |
| `showVideoConsultation` | mentioned once only, never confirmed |
| `showTravelTimes` | unverified |

Clinical capabilities follow the same rule. Laparoscopic surgery, menopause care and "IVF and
ICSI" as a listed offering are **not** on the site, because they were never confirmed by the
hospital; see `OPEN_QUESTIONS.md` Q13. Do not add them back from social media or directory
listings.

Third party ratings (Justdial, Google) are also excluded. They change, and they belong to the
directory rather than to the hospital.

---

## 10. Conventions

- **Tokens or nothing.** Every colour, radius, shadow and type size comes from
  `src/styles/index.css`. If a value is missing, add a token rather than a literal.
- **`cn()` merges.** It runs `tailwind-merge`, so a `className` passed into a component correctly
  overrides that component's own utilities. With a plain string join, `<Container
  className="max-w-3xl">` silently lost to the component's `max-w-[80rem]`.
- **Checks are the gate.** `npm run check` runs typecheck, contrast, copy and font checks. A change
  that compiles but fails one of these is not finished.
- **Verify in the browser.** Typecheck and Lighthouse do not measure visual quality. Render the
  page, look at it, and measure what you are unsure about rather than assuming.

---

## Maintenance

This file describes `main`. When the tokens, scale, fonts or surface treatments change, update the
tables above in the same commit. A design document that lags behind the code is worse than none,
because people trust it.

Note that `README.md` still describes Outfit and Plus Jakarta Sans, and the older 0.625rem radius
scale. Those paragraphs are out of date as of this commit; the values in this file are the ones in
the source.
