# Lailas Hospital — source code, part 2 of 4

Complete source except images, dependencies and build output.
Read HANDOFF.md first for architecture, design system and constraints.


==============================================================================
// FILE: src/styles/index.css
==============================================================================

/* Self-hosted fonts (font-display: swap is set by Fontsource). */
@import '@fontsource-variable/dm-sans/index.css';

@import 'tailwindcss';

/* ==========================================================================
   Design tokens
   Contrast (WCAG AA) is checked by `npm run check:contrast`.
   ========================================================================== */
@theme {
  /* The two locally bundled variable families intentionally do different jobs:
     DM Sans gives headings a confident, contemporary voice; Source Sans 3
     remains exceptionally clear in dense clinical information and controls. */
  --font-heading: 'DM Sans Variable', 'DM Sans', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-sans: 'DM Sans Variable', 'DM Sans', ui-sans-serif, system-ui, -apple-system, sans-serif;

  /* Surfaces */
  --color-ivory: #fbf7f0;
  --color-paper: #fffdf9;
  --color-sand: #f3ece0;
  --color-sand-deep: #e8dece;
  --color-line: #e2d8c8;

  /* Text */
  --color-ink: #1f2a27;
  --color-ink-soft: #4b5753;
  --color-ink-muted: #5f6a66;

  /* Primary: deep teal green */
  --color-teal-50: #eef5f3;
  --color-teal-100: #dcebe6;
  --color-teal-200: #b9d5cd;
  --color-teal-300: #8db9ad;
  --color-teal-500: #3e8073;
  --color-teal-600: #2b6b60;
  --color-teal-700: #1f5a51;
  --color-teal-800: #18473f;
  --color-teal-900: #12362f;
  --color-teal-950: #0b241f;

  /* Single warm accent: clay */
  --color-clay-50: #fbf1ea;
  --color-clay-100: #f6e6da;
  --color-clay-200: #edcdb6;
  --color-clay-400: #d18b63;
  --color-clay-500: #bf6e45;
  --color-clay-600: #a3552f;
  --color-clay-700: #874425;

  /* Secondary surfaces: sage */
  --color-sage-50: #f2f5ef;
  --color-sage-100: #e6ece1;
  --color-sage-200: #d3ddcb;
  --color-sage-300: #b7c6ac;
  --color-sage-500: #7c9071;
  --color-sage-700: #4d6044;

  /* Emergency only */
  --color-emergency: #b3261e;
  --color-emergency-700: #8c1d17;
  --color-emergency-50: #fcedeb;

  /* Refined Glassmorphism Radii Scale */
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.25rem;

  /* Multi-layered Glassmorphic Shadows */
  --shadow-soft: 0 8px 28px -18px rgb(11 36 31 / 0.22);
  --shadow-lift: 0 24px 56px -24px rgb(11 36 31 / 0.28), 0 6px 16px -8px rgb(11 36 31 / 0.16);

  --ease-gentle: cubic-bezier(0.22, 1, 0.36, 1);

  --breakpoint-xs: 26rem;
}

/* ==========================================================================
   Base
   ========================================================================== */
@layer base {
  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
    scroll-padding-top: 6rem;
    /* Guard: a single long unbreakable word can set an intrinsic width a few
       pixels wider than a small viewport. clip contains that at the root
       without creating a scroll container, so position: sticky and the inner
       horizontal scrollers keep working. */
    overflow-x: clip;
  }
  body {
    background: var(--color-ivory);
    color: var(--color-ink);
    font-family: var(--font-sans);
    font-size: 1rem; /* 16px */
    line-height: 1.62;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  @media (min-width: 768px) {
    body {
      font-size: 1.0625rem; /* 17px */
    }
  }
  h1, h2, h3, h4 {
    font-family: var(--font-heading);
    font-weight: 600;
    color: var(--color-ink);
    text-wrap: balance;
    letter-spacing: -0.015em;
  }
  p, li {
    text-wrap: pretty;
  }
  ::selection {
    background: var(--color-teal-200);
    color: var(--color-teal-950);
  }
  :focus-visible {
    outline: 3px solid var(--color-teal-600);
    outline-offset: 3px;
    border-radius: 6px;
  }
  [id] {
    scroll-margin-top: 6rem;
  }
}

/* ==========================================================================
   Type scale: DM Sans headings + Source Sans 3 body and UI
   ========================================================================== */
@utility t-display {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(2.5rem, 1.55rem + 3.6vw, 4.75rem);
  line-height: 1.03;
  letter-spacing: -0.045em;
}
@utility t-h1 {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(2rem, 1.5rem + 2.1vw, 3.25rem);
  line-height: 1.08;
  letter-spacing: -0.04em;
}
@utility t-h2 {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(1.625rem, 1.3rem + 1.05vw, 2.25rem);
  line-height: 1.12;
  letter-spacing: -0.035em;
}
@utility t-h3 {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(1.1875rem, 1.07rem + 0.55vw, 1.5rem);
  line-height: 1.22;
  letter-spacing: -0.025em;
}
@utility t-h4 {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(1.0625rem, 0.9943rem + 0.2727vw, 1.25rem);
  line-height: 1.38;
  letter-spacing: -0.01em;
}
@utility t-lead {
  font-family: var(--font-sans);
  font-weight: 400;
  /* Lead copy must read as a deliberate introduction, not card metadata. */
  font-size: clamp(1.1875rem, 1.12rem + 0.3vw, 1.375rem);
  line-height: 1.58;
  letter-spacing: -0.005em;
  color: var(--color-ink-soft);
}
@utility t-body {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.65;
}
/* Supporting copy inside cards and lists */
@utility t-small {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: clamp(1rem, 0.97rem + 0.12vw, 1.0625rem);
  line-height: 1.55;
}
@utility t-meta {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.45;
}

/* Eyebrow above a section heading. Refined uppercase pill-like tracking */
@utility t-label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.085em;
  text-transform: uppercase;
  color: var(--color-teal-700);
}
/* Oversized figures with tabular numerals */
@utility t-number {
  font-family: var(--font-heading);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.03em;
  font-variant-numeric: lining-nums tabular-nums;
}

/* ==========================================================================
   Glassmorphism UI System
   ========================================================================== */
@utility glass-card {
  background: rgb(255 253 249 / 0.76);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgb(255 255 255 / 0.85);
  box-shadow: var(--shadow-soft), inset 0 1px 0 0 rgb(255 255 255 / 0.9);
}

@utility glass-card-hover {
  transition: transform 0.35s var(--ease-gentle), box-shadow 0.35s var(--ease-gentle), border-color 0.35s var(--ease-gentle);
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lift);
    border-color: rgb(43 107 96 / 0.28);
  }
}

@utility glass-pill {
  background: rgb(255 253 249 / 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgb(226 216 200 / 0.8);
  box-shadow: inset 0 1px 0 0 rgb(255 255 255 / 0.8);
}

@utility glass-dark {
  background: rgb(18 54 47 / 0.65);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgb(255 255 255 / 0.14);
  box-shadow: 0 16px 40px -12px rgb(0 0 0 / 0.25), inset 0 1px 0 0 rgb(255 255 255 / 0.12);
}

@utility ambient-mesh {
  background-image: 
    radial-gradient(at 0% 0%, rgba(220, 235, 230, 0.5) 0px, transparent 55%),
    radial-gradient(at 100% 0%, rgba(246, 230, 218, 0.45) 0px, transparent 50%),
    radial-gradient(at 50% 100%, rgba(230, 236, 225, 0.4) 0px, transparent 55%);
}

/* A quiet, code-native art direction. This takes the place of generic stock
   imagery while the hospital's genuine photography library is being prepared. */
.hero-composition {
  background:
    radial-gradient(circle at 50% 34%, rgb(255 253 249 / 0.16), transparent 22%),
    linear-gradient(145deg, #0b241f 2%, #18473f 58%, #2b6b60 100%);
}
.hero-composition::before,
.hero-composition::after {
  content: '';
  position: absolute;
  border: 1px solid rgb(255 253 249 / 0.26);
  border-radius: 999px;
  pointer-events: none;
}
.hero-composition::before { width: 22rem; height: 22rem; left: -8rem; top: -7rem; }
.hero-composition::after { width: 32rem; height: 32rem; right: -16rem; bottom: -19rem; }

/* The site's one signature three-dimensional detail. All layers are static
   geometry first; the very slow movement is only a progressive enhancement. */
.care-form {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  perspective: 52rem;
  transform-style: preserve-3d;
}
.care-form__ring,
.care-form__core,
.care-form__plane {
  position: absolute;
  border-radius: 50%;
  transform-style: preserve-3d;
}
.care-form__ring--outer {
  width: 17rem;
  height: 17rem;
  border: 1px solid rgb(255 253 249 / 0.65);
  background: radial-gradient(circle, rgb(255 253 249 / 0.18), transparent 63%);
  box-shadow: inset 0 0 2.5rem rgb(255 253 249 / 0.12), 0 1.5rem 3.25rem rgb(0 0 0 / 0.22);
  transform: rotateX(63deg) rotateZ(-18deg) translateZ(1.3rem);
}
.care-form__ring--inner {
  width: 10.5rem;
  height: 10.5rem;
  border: 1px solid rgb(209 139 99 / 0.9);
  background: rgb(209 139 99 / 0.14);
  box-shadow: inset 0 0 1.5rem rgb(255 253 249 / 0.2);
  transform: rotateX(63deg) rotateZ(28deg) translateZ(3rem);
}
.care-form__core {
  width: 5.25rem;
  height: 5.25rem;
  background: radial-gradient(circle at 32% 26%, #fffdf9 0 7%, #f3ece0 31%, #d3ddcb 100%);
  box-shadow: 0 1.5rem 2.75rem rgb(0 0 0 / 0.3), inset -0.6rem -0.7rem 1rem rgb(31 90 81 / 0.16);
  transform: translateZ(5rem);
}
.care-form__plane--back {
  width: 20rem;
  height: 8rem;
  border-radius: 50%;
  background: rgb(211 221 203 / 0.16);
  filter: blur(0.2rem);
  transform: rotateX(63deg) translateZ(-1.5rem);
}
.care-form__plane--front {
  width: 19rem;
  height: 19rem;
  border: 1px solid rgb(255 253 249 / 0.18);
  transform: rotateY(52deg) rotateX(60deg) translateZ(0.2rem);
}
@media (min-width: 768px) and (prefers-reduced-motion: no-preference) {
  .care-form { animation: care-form-float 12s ease-in-out infinite alternate; }
}
@keyframes care-form-float {
  from { transform: rotateZ(-2deg) translate3d(-0.25rem, 0.35rem, 0); }
  to { transform: rotateZ(2deg) translate3d(0.25rem, -0.35rem, 0); }
}
.maternity-mark, .ivf-mark {
  min-height: 23rem;
  border: 1px solid rgb(31 42 39 / 0.14);
  border-radius: 999px 999px 0 0;
  align-items: end;
  justify-content: center;
  padding-bottom: 3rem;
}
.maternity-mark { background: linear-gradient(160deg, rgb(255 253 249 / 0.72), rgb(237 205 182 / 0.5)); color: var(--color-clay-600); }
.ivf-mark { background: radial-gradient(circle at center, rgb(255 253 249 / 0.14) 0 12%, transparent 12.5%), linear-gradient(160deg, rgb(31 90 81 / 0.8), rgb(11 36 31 / 0.5)); color: var(--color-clay-200); }
.maternity-mark span, .ivf-mark span { font: 650 clamp(3rem, 6vw, 6rem)/1 var(--font-heading); letter-spacing: -0.06em; }
.page-hero { border-bottom: 1px solid var(--color-line); background: linear-gradient(110deg, var(--color-ivory), var(--color-paper)); }

/* Approved homepage reference: visual rules are scoped to the hero so the
   existing responsive page system remains intact below the fold. */
.reference-hero { position: relative; min-height: 42rem; overflow: visible; background: #edf2ed; padding: clamp(3rem, 6vw, 6rem) 0 6.5rem; }
.reference-hero__image { position: absolute; top: 0; left: -34%; width: 134%; max-width: none; height: 100%; object-fit: cover; object-position: center; }
.reference-hero__wash { position: absolute; inset: 0; background: linear-gradient(90deg, rgb(255 253 249 / .97) 0%, rgb(255 253 249 / .88) 34%, rgb(255 253 249 / .10) 56%, rgb(255 253 249 / .06) 100%); }
.reference-hero__content { display: grid; min-height: 31rem; grid-template-columns: minmax(0, 1fr) minmax(23rem, 28rem); align-items: center; gap: 2rem; }
.reference-hero__copy { max-width: 36rem; }
.reference-hero__eyebrow { display: inline-flex; align-items: center; gap: .55rem; margin: 0 0 1rem; border: 1px solid rgb(43 107 96 / .22); border-radius: 999px; background: rgb(255 253 249 / .72); padding: .45rem .8rem; color: #18473f; font-size: .8rem; font-weight: 700; }
.reference-hero__eyebrow span { width: .55rem; height: .55rem; border-radius: 50%; background: #19a974; }
.reference-hero__title { max-width: 34rem; font-size: clamp(3rem, 4.45vw, 5.2rem); line-height: .99; letter-spacing: -.065em; color: #062c28; }
.reference-hero__title em { display: block; color: #3f8f79; font-style: normal; }
.reference-hero__lead { max-width: 31rem; margin-top: 1.25rem; color: #25524a; font-size: clamp(1.1875rem, 1.1rem + .35vw, 1.375rem); line-height: 1.55; letter-spacing: -.012em; }
.reference-booking { border: 1px solid rgb(255 255 255 / .8); border-radius: 1.75rem; background: rgb(251 255 253 / .86); padding: 1.5rem; box-shadow: 0 1.5rem 3.5rem rgb(11 36 31 / .22), inset 0 1px 0 rgb(255 255 255 / .9); backdrop-filter: blur(18px); }
.reference-booking h2 { font-size: 1.35rem; letter-spacing: -.04em; color: #082c28; }
.reference-booking p { margin-top: .2rem; color: #4b5753; font-size: .9rem; }
.reference-booking__care { display: inline-flex; align-items: center; gap: .35rem; border-radius: 999px; background: #eef5f3; padding: .35rem .55rem; color: #175f50; font-size: .72rem; font-weight: 700; }
.reference-booking__care svg { width: .9rem; }.reference-booking__select { display: block; width: 100%; min-height: 2.9rem; margin-top: .45rem; padding: 0 2.2rem 0 .9rem; border: 1px solid #cfe0da; border-radius: .7rem; background-color: #fff; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5l5-5' stroke='%23175f50' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right .9rem center; color: #0a332c; font: 600 .98rem/1.2 var(--font-sans); appearance: none; cursor: pointer; }
.reference-booking__select:focus-visible { outline: 3px solid var(--color-teal-600); outline-offset: 2px; }.reference-hero__trust { position: absolute; right: 0; bottom: -3.1rem; left: 0; }
.reference-hero__trust dl { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid rgb(255 255 255 / .78); border-radius: 1.6rem; background: rgb(255 255 255 / .85); padding: 1.3rem; box-shadow: 0 1rem 2.6rem rgb(11 36 31 / .12); backdrop-filter: blur(18px); }
.reference-hero__trust dl > div { display: flex; align-items: center; gap: .8rem; min-width: 0; padding: .15rem 1.1rem; border-right: 1px solid #cbded8; }
.reference-hero__trust dl > div:last-child { border-right: 0; }
.reference-hero__trust dt { display: grid; width: 2.7rem; height: 2.7rem; flex: 0 0 auto; place-items: center; border-radius: 50%; background: #e5f4f0; color: #08705b; }
.reference-hero__trust dt svg { width: 1.35rem; }
.reference-hero__trust dd { min-width: 0; }
.reference-hero__trust strong { display: block; color: #072f2a; font-family: var(--font-heading); font-size: 1.25rem; line-height: 1.1; letter-spacing: -.045em; }
.reference-hero__trust span { display: block; margin-top: .2rem; color: #33504a; font-size: .78rem; line-height: 1.3; }
.service-card__visual { display: grid; width: 3.35rem; height: 3.35rem; place-items: center; margin-bottom: 1.4rem; border-radius: 1rem; color: #0a5a4c; }
.service-card__visual svg { width: 1.55rem; height: 1.55rem; }
.service-card__visual--women { background: linear-gradient(135deg, #e8f6f2, #cbe8df); }
.service-card__visual--family { background: linear-gradient(135deg, #f8efd9, #edd9a9); }
.service-card__visual--emergency { background: linear-gradient(135deg, #fde8e6, #f6c7c3); color: #a52f2a; }
.service-card__visual--diagnostics { background: linear-gradient(135deg, #e8edf7, #d6e0ef); }
@media (max-width: 900px) {
  .reference-hero { min-height: auto; padding-bottom: 3rem; }
  .reference-hero__content { grid-template-columns: 1fr; min-height: 0; }
  .reference-booking { max-width: 34rem; }
  /* The band was absolutely positioned with a negative offset, so on a phone
     it hung over the section below and was partly covered by it. In one column
     there is nothing to hang beside, so it belongs in the flow. */
  .reference-hero__trust { position: static; margin-top: 2.25rem; }
  .reference-hero__trust dl { grid-template-columns: repeat(2, 1fr); gap: .7rem; }
  .reference-hero__trust dl > div:nth-child(2) { border-right: 0; }
}
@media (max-width: 540px) {
  .reference-hero { padding-top: 1.5rem; background: var(--color-ivory); }
  /* As a full background the photograph washed out to a smudge behind the copy.
     As a band at the top it keeps its colour, and the text below sits on solid
     paper, which is both more legible and a better use of the picture. */
  /* A photograph sitting directly above the headline read as a stock banner
     rather than an editorial choice. On a phone the hero is typographic: the
     headline does the work, and the first face a visitor meets is a real
     consultant further down rather than a borrowed one at the top. */
  .reference-hero picture { display: none; }
  .reference-hero__wash { display: none; }
  .reference-hero__content { padding-top: 1.25rem; }
  .reference-hero__content { padding-top: 2.25rem; }
  /* A second booking form in the hero cost 280px of first screen and pushed the
     photograph and the figures out of view. The fixed bar already puts Book,
     Call and WhatsApp one tap away at every scroll position, so on a phone the
     hero is the claim and the photo. */
  .reference-booking { display: none; } .reference-hero__image { left: 0; width: 100%; max-width: 100%; object-position: 42% center; } .reference-hero__wash { background: linear-gradient(180deg, rgb(255 253 249 / .96) 0%, rgb(255 253 249 / .82) 38%, rgb(255 253 249 / .34) 62%, rgb(255 253 249 / .12) 100%); } .reference-hero__title { font-size: clamp(2.75rem, 14vw, 3.6rem); } .reference-hero__lead { font-size: 1.125rem; line-height: 1.58; } .reference-booking { padding: 1.1rem; border-radius: 1.25rem; } .reference-hero__trust dl { padding: .65rem; border-radius: 1rem; } .reference-hero__trust dl > div { gap: .5rem; padding: .35rem; border-right: 0; } .reference-hero__trust dt { width: 2.2rem; height: 2.2rem; } .reference-hero__trust strong { font-size: 1rem; } .reference-hero__trust span { font-size: .67rem; } }

/* ==========================================================================
   Shapes: Clean contemporary architectural curves
   ========================================================================== */
@utility shape-arch {
  border-radius: var(--radius-lg);
}
@utility shape-cradle {
  border-radius: var(--radius-lg);
}
@utility shape-soft {
  border-radius: var(--radius-lg);
}

/* Scroll rows: snap, hidden scrollbar, keep focus rings visible */
@utility scroll-row {
  display: grid;
  grid-auto-flow: column;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 1.25rem;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  & > * {
    scroll-snap-align: start;
  }
}

/* Hero entrance: pure CSS so the hero never waits for JavaScript */
@keyframes hero-enter {
  from {
    opacity: 0;
    translate: 0 1.5rem;
  }
}
.hero-enter {
  animation: hero-enter 1s var(--ease-gentle) both;
}

/* Native <dialog> sheet animation */
dialog.sheet {
  opacity: 0;
  translate: 0 2rem;
  transition:
    opacity 0.3s var(--ease-gentle),
    translate 0.4s var(--ease-gentle),
    overlay 0.4s allow-discrete,
    display 0.4s allow-discrete;
}
dialog.sheet[open] {
  opacity: 1;
  translate: 0 0;
}
@starting-style {
  dialog.sheet[open] {
    opacity: 0;
    translate: 0 2rem;
  }
}
dialog.sheet::backdrop {
  background: rgb(11 36 31 / 0);
  transition:
    background 0.3s,
    overlay 0.3s allow-discrete,
    display 0.3s allow-discrete;
}
dialog.sheet[open]::backdrop {
  background: rgb(11 36 31 / 0.45);
}
@starting-style {
  dialog.sheet[open]::backdrop {
    background: rgb(11 36 31 / 0);
  }
}

/* Range input for the pregnancy guide */
.week-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 3rem;
  background: transparent;
  cursor: pointer;
}
.week-range::-webkit-slider-runnable-track {
  height: 0.5rem;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    var(--color-teal-600) var(--fill, 0%),
    var(--color-sage-200) var(--fill, 0%)
  );
}
.week-range::-moz-range-track {
  height: 0.5rem;
  border-radius: 999px;
  background: var(--color-sage-200);
}
.week-range::-moz-range-progress {
  height: 0.5rem;
  border-radius: 999px;
  background: var(--color-teal-600);
}
.week-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 2rem;
  height: 2rem;
  margin-top: -0.75rem;
  border-radius: 999px;
  background: var(--color-paper);
  border: 3px solid var(--color-teal-700);
  box-shadow: var(--shadow-soft);
}
.week-range::-moz-range-thumb {
  width: 1.625rem;
  height: 1.625rem;
  border-radius: 999px;
  background: var(--color-paper);
  border: 3px solid var(--color-teal-700);
}
.week-range:focus-visible {
  outline: none;
}
.week-range:focus-visible::-webkit-slider-thumb {
  outline: 3px solid var(--color-teal-600);
  outline-offset: 3px;
}
.week-range:focus-visible::-moz-range-thumb {
  outline: 3px solid var(--color-teal-600);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}



==============================================================================
// FILE: src/App.tsx
==============================================================================

import { LazyMotion, MotionConfig } from 'motion/react';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { BookingProvider } from './booking/BookingProvider';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MobileBar } from './components/MobileBar';
import { ScrollManager } from './components/ScrollManager';
import { TopStrip } from './components/TopStrip';
import { LanguageProvider, useCopy } from './i18n/LanguageProvider';
import { ContactPage } from './pages/ContactPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { HomePage } from './pages/HomePage';
import { IvfPage } from './pages/IvfPage';
import { MaternityPage } from './pages/MaternityPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPage } from './pages/PrivacyPage';

const loadMotionFeatures = () => import('./lib/motionFeatures').then((m) => m.default);

const StyleguidePage = import.meta.env.DEV ? lazy(() => import('./pages/StyleguidePage')) : null;

function SkipLink() {
  const copy = useCopy();
  return (
    <a
      href="#main"
      className="fixed top-3 left-3 z-[60] max-w-[calc(100vw-1.5rem)] -translate-y-24 rounded-[var(--radius-sm)] bg-teal-900 px-5 py-3 font-semibold text-ivory transition-transform focus:translate-y-0"
    >
      {copy.a11y.skip}
    </a>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <BookingProvider>
        <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">
          <SkipLink />
          <ScrollManager />
          <div className="flex min-h-dvh flex-col pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0">
            <TopStrip />
            <Header />
            <main id="main" tabIndex={-1} className="flex-1 outline-none">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/maternity" element={<MaternityPage />} />
                <Route path="/ivf" element={<IvfPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                {/* Old addresses from the previous site */}
                <Route path="/ivf-fertility" element={<Navigate to="/ivf" replace />} />
                <Route path="/obstetrics-gynaecology" element={<Navigate to="/#services" replace />} />
                <Route path="/departments" element={<Navigate to="/#services" replace />} />
                <Route path="/about" element={<Navigate to="/" replace />} />
                {StyleguidePage && (
                  <Route
                    path="/styleguide"
                    element={
                      <Suspense fallback={null}>
                        <StyleguidePage />
                      </Suspense>
                    }
                  />
                )}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <MobileBar />
        </MotionConfig>
        </LazyMotion>
      </BookingProvider>
    </LanguageProvider>
  );
}



==============================================================================
// FILE: src/booking/BookingProvider.tsx
==============================================================================

import { createContext, lazy, Suspense, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { DoctorId, ServiceId } from '../content/site';

export type BookingTarget = { kind: 'service'; id: ServiceId } | { kind: 'doctor'; id: DoctorId };

interface BookingContextValue {
  open: (target?: BookingTarget) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);
const BookingSheet = lazy(() => import('./BookingSheet'));

export function BookingProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<{ target?: BookingTarget; key: number } | null>(null);

  const open = useCallback((target?: BookingTarget) => {
    setRequest({ target, key: Date.now() });
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {request && (
        <Suspense fallback={null}>
          <BookingSheet key={request.key} initialTarget={request.target} onClosed={() => setRequest(null)} />
        </Suspense>
      )}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}



==============================================================================
// FILE: src/booking/BookingSheet.tsx
==============================================================================

import { ArrowLeft, Check, MessageCircle, Phone, Send, X } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react';
import { Button } from '../components/Button';
import { booking, contact, doctors, hours, services, whatsappLink, type Weekday } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { addDays, cn, formatDate, formatHours } from '../lib/format';
import type { BookingTarget } from './BookingProvider';

type Step = 'who' | 'day' | 'details' | 'done';
const STEPS: Step[] = ['who', 'day', 'details'];

interface Props {
  initialTarget?: BookingTarget;
  onClosed: () => void;
}

/**
 * One booking flow for the whole site: who, which day, name and phone.
 * Sends to VITE_BOOKING_ENDPOINT when set, otherwise opens WhatsApp.
 */
export default function BookingSheet({ initialTarget, onClosed }: Props) {
  const copy = useCopy();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ids = useId();

  const [target, setTarget] = useState<BookingTarget | undefined>(initialTarget);
  const [step, setStep] = useState<Step>(initialTarget ? 'day' : 'who');
  const [day, setDay] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; send?: string }>({});
  const [sending, setSending] = useState(false);
  const [sentVia, setSentVia] = useState<'whatsapp' | 'form'>('whatsapp');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const close = () => dialogRef.current?.close();

  const doctor = target?.kind === 'doctor' ? doctors.find((d) => d.id === target.id) : undefined;
  const whoLabel = target
    ? target.kind === 'doctor'
      ? `${doctor!.name}`
      : copy.services.items[target.id].name
    : '';

  const openDays: Weekday[] = doctor ? doctor.opd.days : hours.opd.days;
  const dayOptions = useMemo(() => {
    const today = new Date();
    const out: { key: string; label: string; sub: string }[] = [];
    for (let i = 0; out.length < booking.daysAhead && i < 14; i++) {
      const d = addDays(today, i);
      if (!openDays.includes(d.getDay() as Weekday)) continue;
      const date = formatDate(d, copy, { day: 'numeric', month: 'long' });
      const label = i === 0 ? copy.time.today : i === 1 ? copy.time.tomorrow : copy.time.days[d.getDay()];
      out.push({ key: d.toDateString(), label, sub: date });
    }
    return out;
  }, [openDays, copy]);

  const stepIndex = STEPS.indexOf(step);

  const chooseTarget = (t: BookingTarget) => {
    setTarget(t);
    setStep('day');
  };

  const chooseDay = (label: string) => {
    setDay(label);
    setStep('details');
  };

  const back = () => {
    if (step === 'details') setStep('day');
    else if (step === 'day') setStep('who');
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '').replace(/^0(?=\d{10}$)/, '');
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = copy.booking.errors.name;
    if (!/^\d{10}$/.test(digits)) next.phone = copy.booking.errors.phone;
    setErrors(next);
    if (next.name || next.phone) {
      document.getElementById(next.name ? `${ids}-name` : `${ids}-phone`)?.focus();
      return;
    }
    const details = { name: name.trim(), phone: digits, who: whoLabel, day: day ?? copy.booking.day.anyDay };

    if (booking.endpoint) {
      setSending(true);
      try {
        const res = await fetch(booking.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...details, language: 'en', page: window.location.pathname }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setSentVia('form');
        setStep('done');
      } catch {
        setErrors({ send: copy.booking.errors.send });
      } finally {
        setSending(false);
      }
      return;
    }

    window.open(whatsappLink(copy.booking.message(details)), '_blank', 'noopener');
    setSentVia('whatsapp');
    setStep('done');
  };

  const choice =
    'flex min-h-14 w-full items-center justify-between gap-4 rounded-[var(--radius-md)] glass-card border border-white/80 px-5 py-3.5 text-left transition-all duration-200 hover:border-teal-600 hover:bg-teal-50/80 shadow-xs';

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${ids}-title`}
      onClose={onClosed}
      onClick={(e) => e.target === dialogRef.current && close()}
      className="sheet fixed inset-x-0 top-auto bottom-0 m-0 max-h-[92dvh] w-full max-w-none overflow-hidden rounded-t-[var(--radius-lg)] bg-ivory/95 backdrop-blur-2xl ring-1 ring-white/80 shadow-[var(--shadow-lift)] p-0 text-ink sm:inset-0 sm:m-auto sm:h-fit sm:max-w-xl sm:rounded-[var(--radius-lg)]"
    >
      <div className="flex max-h-[92dvh] flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-line/60 px-6 pt-5 pb-4">
          <div>
            <p id={`${ids}-title`} className="t-h3 text-teal-950">
              {copy.booking.title}
            </p>
            {step !== 'done' && (
              <p className="mt-1 t-small text-ink-muted">{copy.booking.stepOf(stepIndex + 1, STEPS.length)}</p>
            )}
          </div>
          <button
            type="button"
            onClick={close}
            className="grid size-12 shrink-0 place-items-center rounded-full border border-ink/15"
            aria-label={copy.a11y.close}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 pt-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          {step !== 'done' && (
            <a
              href={`tel:${contact.primary.tel}`}
              className="mb-5 flex min-h-12 items-center gap-3 rounded-[var(--radius-sm)] bg-emergency-50 px-4 py-2 t-small text-emergency-700"
            >
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              <span>{copy.booking.emergency(contact.primary.display)}</span>
            </a>
          )}

          {step === 'who' && (
            <div>
              <h2 ref={headingRef} tabIndex={-1} className="t-h3 outline-none">
                {copy.booking.who.title}
              </h2>
              <p className="mt-5 font-semibold text-ink-soft">{copy.booking.who.departments}</p>
              <ul className="mt-3 grid gap-2">
                {services
                  .filter((s) => s.bookable)
                  .map((s) => (
                    <li key={s.id}>
                      <button type="button" className={choice} onClick={() => chooseTarget({ kind: 'service', id: s.id })}>
                        <span className="font-semibold">{copy.services.items[s.id].name}</span>
                        <span className="t-small text-ink-muted">{copy.services.items[s.id].availability}</span>
                      </button>
                    </li>
                  ))}
              </ul>
              <p className="mt-6 font-semibold text-ink-soft">{copy.booking.who.doctors}</p>
              <ul className="mt-3 grid gap-2">
                {doctors.map((d) => (
                  <li key={d.id}>
                    <button type="button" className={choice} onClick={() => chooseTarget({ kind: 'doctor', id: d.id })}>
                      <span>
                        <span className="block font-semibold">{d.name}</span>
                        <span className="block t-small text-ink-muted">{copy.doctors.profiles[d.id].focus}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step === 'day' && (
            <div>
              <Summary label={copy.booking.summary.seeing} value={whoLabel} />
              <h2 ref={headingRef} tabIndex={-1} className="t-h3 mt-5 outline-none">
                {copy.booking.day.title}
              </h2>
              <p className="mt-1 text-ink-soft">{copy.booking.day.hint}</p>
              {doctor && (
                <p className="mt-1 t-small text-ink-muted">
                  {copy.doctors.opd}: {formatHours(doctor.opd, copy)}
                </p>
              )}
              <ul className="mt-5 grid grid-cols-2 gap-2">
                {dayOptions.map((d) => (
                  <li key={d.key}>
                    <button
                      type="button"
                      onClick={() => chooseDay(`${d.label}, ${d.sub}`)}
                      className={cn(choice, 'flex-col items-start justify-center gap-0')}
                    >
                      <span className="font-semibold">{d.label}</span>
                      <span className="t-small text-ink-muted">{d.sub}</span>
                    </button>
                  </li>
                ))}
                <li className="col-span-2">
                  <button type="button" onClick={() => chooseDay(copy.booking.day.anyDay)} className={choice}>
                    <span className="font-semibold">{copy.booking.day.anyDay}</span>
                  </button>
                </li>
              </ul>
              <p className="mt-3 t-small text-ink-muted">{copy.booking.day.closedNote}</p>
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={submit} noValidate>
              <Summary label={copy.booking.summary.seeing} value={whoLabel} />
              <Summary label={copy.booking.summary.day} value={day ?? ''} />
              <h2 ref={headingRef} tabIndex={-1} className="t-h3 mt-5 outline-none">
                {copy.booking.details.title}
              </h2>
              <div className="mt-4 grid gap-4">
                <Field
                  id={`${ids}-name`}
                  label={copy.booking.details.name}
                  value={name}
                  onChange={setName}
                  error={errors.name}
                  autoComplete="name"
                />
                <Field
                  id={`${ids}-phone`}
                  label={copy.booking.details.phone}
                  hint={copy.booking.details.phoneHint}
                  value={phone}
                  onChange={setPhone}
                  error={errors.phone}
                  autoComplete="tel"
                  type="tel"
                  inputMode="tel"
                />
              </div>
              <p className="mt-4 t-small text-ink-muted">{copy.booking.details.privacy}</p>
              {errors.send && (
                <p role="alert" className="mt-4 rounded-[var(--radius-sm)] bg-emergency-50 px-4 py-3 text-emergency-700">
                  {errors.send}
                </p>
              )}
              <Button
                type="submit"
                size="lg"
                className="mt-6 w-full"
                disabled={sending}
                icon={booking.endpoint ? <Send aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
              >
                {sending ? copy.booking.sending : booking.endpoint ? copy.booking.sendForm : copy.booking.sendWhatsapp}
              </Button>
            </form>
          )}

          {step === 'done' && (
            <div className="py-4 text-center">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-teal-100 text-teal-800">
                <Check className="size-8" aria-hidden="true" />
              </span>
              <h2 ref={headingRef} tabIndex={-1} className="t-h3 mt-5 outline-none" role="status">
                {sentVia === 'form' ? copy.booking.done.formTitle : copy.booking.done.whatsappTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-ink-soft">
                {sentVia === 'form' ? copy.booking.done.formBody : copy.booking.done.whatsappBody}
              </p>
              <Button variant="secondary" className="mt-6" onClick={close}>
                {copy.booking.done.close}
              </Button>
            </div>
          )}

          {(step === 'day' || step === 'details') && (
            <Button variant="quiet" className="mt-4" onClick={back} icon={<ArrowLeft aria-hidden="true" />}>
              {copy.booking.back}
            </Button>
          )}
        </div>
      </div>
    </dialog>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <p className="flex items-baseline gap-2 t-small">
      <span className="text-ink-muted">{label}:</span>
      <span className="font-semibold text-teal-900">{value}</span>
    </p>
  );
}

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
  type?: string;
  inputMode?: 'tel' | 'text';
}

function Field({ id, label, hint, value, onChange, error, autoComplete, type = 'text', inputMode }: FieldProps) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="t-small text-ink-muted">
          {hint}
        </p>
      )}
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          'mt-2 block min-h-14 w-full rounded-[var(--radius-md)] border bg-paper px-4 t-body outline-none transition-colors focus:border-teal-700 focus:ring-2 focus:ring-teal-200',
          error ? 'border-emergency' : 'border-line',
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 t-small font-semibold text-emergency-700">
          {error}
        </p>
      )}
    </div>
  );
}



==============================================================================
// FILE: src/components/Accordion.tsx
==============================================================================

import { Plus } from 'lucide-react';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '../lib/format';

export interface AccordionItem {
  id: string;
  title: string;
  body: string;
}

/**
 * Accessible accordion. Answers stay in the markup (for search engines and
 * find-in-page) and are made inert while closed. Arrow keys, Home and End
 * move between questions.
 */
export function Accordion({ items, defaultOpen }: { items: AccordionItem[]; defaultOpen?: string }) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);
  const base = useId();
  const listRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const buttons = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>('[data-acc-trigger]') ?? []);
    const i = buttons.indexOf(e.currentTarget);
    const go = (n: number) => {
      e.preventDefault();
      buttons[(n + buttons.length) % buttons.length]?.focus();
    };
    if (e.key === 'ArrowDown') go(i + 1);
    else if (e.key === 'ArrowUp') go(i - 1);
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(buttons.length - 1);
  };

  return (
    <div ref={listRef} className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const isOpen = open === item.id;
        const triggerId = `${base}-${item.id}-t`;
        const panelId = `${base}-${item.id}-p`;
        return (
          <div
            key={item.id}
            className={cn(
              'px-1 transition-colors duration-300',
              isOpen && 'bg-sand/35',
            )}
          >
            <h3 className="t-h4">
              <button
                id={triggerId}
                type="button"
                data-acc-trigger
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                onKeyDown={onKeyDown}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left t-h4 font-semibold text-ink transition-colors hover:text-teal-800"
              >
                <span>{item.title}</span>
                <span
                  className={cn(
                    'grid size-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-300',
                    isOpen ? 'rotate-45 border-teal-700 bg-teal-700 text-ivory' : 'border-line bg-paper text-teal-800',
                  )}
                  aria-hidden="true"
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-400 ease-[var(--ease-gentle)]',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-[34rem] pb-6 text-ink-soft leading-relaxed">{item.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}



==============================================================================
// FILE: src/components/Button.tsx
==============================================================================

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router';
import { cn } from '../lib/format';

export type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'emergency' | 'light' | 'lightOutline';
export type ButtonSize = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-sm)] font-sans font-semibold leading-tight text-center ' +
  'transition-colors duration-200 ease-[var(--ease-gentle)] ' +
  'disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4.5 [&_svg]:shrink-0';

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-12 px-6 t-small',
  lg: 'min-h-[3.25rem] px-7 t-h4',
};

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-teal-800 text-ivory hover:bg-teal-900',
  secondary: 'border border-line bg-paper text-ink hover:border-teal-700 hover:text-teal-950 hover:bg-white',
  quiet:
    '!min-h-11 !px-0 rounded-none text-teal-800 underline decoration-teal-300 decoration-2 underline-offset-[6px] hover:decoration-teal-700 hover:text-teal-950',
  emergency: 'bg-emergency text-white hover:bg-emergency-700',
  light: 'bg-ivory text-teal-950 hover:bg-white',
  lightOutline: 'border border-ivory/50 text-ivory hover:border-ivory hover:bg-ivory/10',
};

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconAfter?: ReactNode;
  className?: string;
  children: ReactNode;
}

export const buttonClass = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) =>
  cn(base, sizes[size], variants[variant], className);

function Inner({ icon, iconAfter, children }: Pick<StyleProps, 'icon' | 'iconAfter' | 'children'>) {
  return (
    <>
      {icon}
      <span>{children}</span>
      {iconAfter}
    </>
  );
}

export function Button({
  variant,
  size,
  icon,
  iconAfter,
  className,
  children,
  type = 'button',
  ...rest
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClass(variant, size, className)} {...rest}>
      <Inner icon={icon} iconAfter={iconAfter}>
        {children}
      </Inner>
    </button>
  );
}

/** Internal route link styled as a button. */
export function ButtonLink({ variant, size, icon, iconAfter, className, children, ...rest }: StyleProps & LinkProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...rest}>
      <Inner icon={icon} iconAfter={iconAfter}>
        {children}
      </Inner>
    </Link>
  );
}

/** External link (tel:, WhatsApp, maps) styled as a button. */
export function ButtonAnchor({
  variant,
  size,
  icon,
  iconAfter,
  className,
  children,
  href,
  ...rest
}: StyleProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={buttonClass(variant, size, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      <Inner icon={icon} iconAfter={iconAfter}>
        {children}
      </Inner>
    </a>
  );
}



==============================================================================
// FILE: src/components/CareForm.tsx
==============================================================================

/**
 * Decorative CSS 3D signature for the homepage. It uses layered, softly
 * translucent forms rather than WebGL so the hero stays resilient and light.
 */
export function CareForm() {
  return (
    <div className="care-form" aria-hidden="true">
      <div className="care-form__plane care-form__plane--back" />
      <div className="care-form__ring care-form__ring--outer" />
      <div className="care-form__ring care-form__ring--inner" />
      <div className="care-form__core" />
      <div className="care-form__plane care-form__plane--front" />
    </div>
  );
}



==============================================================================
// FILE: src/components/Container.tsx
==============================================================================

import type { ReactNode } from 'react';
import { cn } from '../lib/format';

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-[80rem] px-5 sm:px-8 lg:px-12', className)}>{children}</div>;
}



==============================================================================
// FILE: src/components/CountUp.tsx
==============================================================================

import { useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

interface CountUpProps {
  value: number;
  suffix?: string;
  /** Years should not get a thousands separator. */
  grouping?: boolean;
  className?: string;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Counts up gently the first time it is seen. The final number is always in
 * the markup, so search engines, screen readers and no-JS visitors see it.
 */
export function CountUp({ value, suffix = '', grouping = true, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const format = (n: number) => new Intl.NumberFormat('en-IN', { useGrouping: grouping }).format(n) + suffix;

  useEffect(() => {
    const el = ref.current;
    if (!inView || reduce || !el) return;
    const from = grouping ? 0 : value - 30;
    const duration = grouping ? 1800 : 1200;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = format(Math.round(from + (value - from) * easeOut(t)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value]);

  return (
    <span className={className}>
      <span className="sr-only">{format(value)}</span>
      <span ref={ref} aria-hidden="true">
        {format(value)}
      </span>
    </span>
  );
}



==============================================================================
// FILE: src/components/DoctorCard.tsx
==============================================================================

import { CalendarDays, Clock } from 'lucide-react';
import { hasPhoto, type ImageId } from '../content/images';
import type { Doctor } from '../content/site';
import { useBooking } from '../booking/BookingProvider';
import { useCopy } from '../i18n/LanguageProvider';
import { cn, formatDays, formatHours } from '../lib/format';
import { Button } from './Button';
import { Photo } from './Photo';

/**
 * A consultant profile.
 *
 * The monogram stands in for a portrait until verified photographs exist: a
 * real name over a borrowed face would misrepresent a person.
 *
 * The structure is fixed rather than content-driven so cards in a row line up.
 * Credentials are one line instead of a chip each, because a consultant with
 * five qualifications was wrapping onto three rows and towering over the card
 * beside it, and the action is pushed to the bottom with mt-auto.
 */
export function DoctorCard({
  doctor,
  featured = false,
}: {
  doctor: Doctor;
  /** The founder treatment: larger monogram, accent rule, more room. */
  featured?: boolean;
}) {
  const copy = useCopy();
  const { open } = useBooking();
  const profile = copy.doctors.profiles[doctor.id];

  const initials = doctor.name
    .replace('Dr. ', '')
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border bg-paper transition-[border-color,box-shadow] duration-300',
        featured && 'lg:grid lg:grid-cols-12 lg:gap-x-10',
        featured
          ? 'border-clay-200 bg-sand/45 p-6 md:p-10'
          : 'border-line p-5 hover:border-teal-600/40 hover:shadow-[var(--shadow-soft)] md:p-6',
      )}
    >
      {featured && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-clay-500 via-clay-400 to-clay-200"
        />
      )}

      {/* Identity ------------------------------------------------------- */}
      <div className={cn('flex items-start gap-4', featured && 'lg:col-span-5')}>
        {hasPhoto(doctor.imageId as ImageId) ? (
          <Photo
            id={doctor.imageId as ImageId}
            shape="circle"
            aspect={1}
            sizes={featured ? '80px' : '(min-width: 768px) 64px, 56px'}
            className={cn('shrink-0 ring-1 ring-line', featured ? 'size-20 sm:size-28' : 'size-16 md:size-20')}
          />
        ) : (
          <div
            aria-hidden="true"
            className={cn(
              'grid shrink-0 place-items-center rounded-full ring-1',
              featured
                ? 'size-20 bg-clay-50 text-clay-700 ring-clay-200 sm:size-28'
                : 'size-16 bg-sand text-teal-800 ring-line md:size-20',
            )}
          >
            <span className={cn('t-number', featured ? 'text-4xl' : 'text-xl')}>{initials}</span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className={cn('text-teal-950', featured ? 't-h3 sm:t-h2' : 't-h3')}>{doctor.name}</h3>
          <p className={cn('mt-1.5 font-medium text-teal-800', featured ? 't-body' : 't-meta')}>
            {profile.role}
          </p>
          <p className={cn('mt-1 text-ink-muted', featured ? 't-small' : 't-meta')}>{doctor.qualifications}</p>
        </div>
      </div>

      {/* Description ----------------------------------------------------- */}
      <p
        className={cn(
          'mt-4 t-small text-ink-soft',
          featured ? 'text-ink lg:col-span-7 lg:col-start-6 lg:mt-0 lg:text-base' : 'line-clamp-3',
        )}
      >
        {featured ? profile.bio : profile.focus}
      </p>

      {/* Practicalities --------------------------------------------------- */}
      <dl className={cn('mt-4 flex items-start gap-2 border-t border-line pt-4 t-small text-ink-soft', featured && 'lg:col-span-7 lg:col-start-6')}>
          <dt className="mt-0.5 shrink-0">
            <Clock className="size-4 text-teal-700" aria-hidden="true" />
            <span className="sr-only">{copy.doctors.opd}</span>
          </dt>
          <dd className="min-w-0">
            {doctor.hasOwnOpdHours ? (
              <span className="block text-ink">
                {formatDays(doctor.opd.days, copy)}, {formatHours(doctor.opd, copy)}
              </span>
            ) : (
              <span className="block text-ink-muted">{copy.doctors.opdUnconfirmed}</span>
            )}
          </dd>
      </dl>

      {/* Action ----------------------------------------------------------- */}
      <div className={cn('mt-4 flex flex-1 items-end', featured && 'lg:col-span-7 lg:col-start-6 lg:flex-none')}>
        <Button
          variant={featured ? 'primary' : 'secondary'}
          className={featured ? 'sm:w-auto' : 'w-full'}
          icon={<CalendarDays className="size-4" aria-hidden="true" />}
          aria-label={copy.doctors.bookWith(doctor.name)}
          onClick={() => open({ kind: 'doctor', id: doctor.id })}
        >
          {copy.actions.bookShort}
        </Button>
      </div>
    </article>
  );
}



==============================================================================
// FILE: src/components/Footer.tsx
==============================================================================

import { Link } from 'react-router';
import { address, contact, hours } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { formatDays, formatHours } from '../lib/format';
import { Container } from './Container';
import { Logo } from './Logo';
import { mainNav } from './navItems';

export function Footer() {
  const copy = useCopy();
  const year = new Date().getFullYear();
  /* Column headings get a hairline so four same-sized columns still read as
     distinct groups rather than one block of text. */
  const heading = 't-label border-b border-teal-800 pb-3 !text-teal-200';
  const link = 'text-teal-100 underline-offset-4 hover:text-ivory hover:underline';
  return (
    <footer className="bg-teal-950 text-teal-100">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo light className="h-14" />
          <p className="mt-6 max-w-sm">{copy.footer.about}</p>
        </div>
        <div className="lg:col-span-3">
          <div className={heading}>{copy.footer.visitTitle}</div>
          <address className="mt-4 not-italic">
            {address.postalLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <a href={address.directionsUrl} target="_blank" rel="noopener noreferrer" className={`${link} mt-3 inline-flex min-h-12 items-center`}>
            {copy.actions.directions}
          </a>
          <p className="mt-5">
            <span className="block text-ivory">{copy.visit.hours.allDay}</span>
            {copy.time.open24EveryDay}
          </p>
          <p className="mt-3">
            <span className="block text-ivory">{copy.visit.hours.opd}</span>
            {formatDays(hours.opd.days, copy)}, {formatHours(hours.opd, copy)}
          </p>
        </div>
        <div className="lg:col-span-3">
          <div className={heading}>{copy.footer.callTitle}</div>
          {/* Number on its own line, purpose underneath. Inline labels collided
              with the numbers and wrapped awkwardly at this column width. */}
          <ul className="mt-4 space-y-3">
            <li>
              <a href={`tel:${contact.primary.tel}`} className={`${link} inline-flex min-h-11 items-center font-semibold text-ivory tabular-nums`}>
                {contact.primary.display}
              </a>
              <span className="block t-small">{copy.contact.primaryLabel}</span>
            </li>
            {contact.landlines.map((p, i) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className={`${link} inline-flex min-h-11 items-center tabular-nums`}>
                  {p.display}
                </a>
                <span className="block t-small">{copy.contact.landlineLabels[i]}</span>
              </li>
            ))}
            <li>
              <a href={`mailto:${contact.email}`} className={`${link} inline-flex min-h-11 items-center`}>
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
        <nav aria-label={copy.a11y.footerNav} className="lg:col-span-2">
          <div className={heading}>{copy.footer.pagesTitle}</div>
          <ul className="mt-4">
            {mainNav.map((item) => (
              <li key={item.key}>
                <Link to={item.to} className={`${link} inline-flex min-h-11 items-center`}>
                  {copy.nav[item.key]}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/privacy" className={`${link} inline-flex min-h-11 items-center`}>
                {copy.nav.privacy}
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
      <div className="border-t border-teal-800">
        <Container className="flex flex-col gap-3 py-6 t-meta text-teal-200 md:flex-row md:justify-between">
          <p>{copy.footer.legal(year)}</p>
          <p className="max-w-[34rem] md:text-right">{copy.footer.disclaimer}</p>
        </Container>
      </div>
    </footer>
  );
}



==============================================================================
// FILE: src/components/Header.tsx
==============================================================================

import { CalendarDays, Menu, Phone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { contact } from '../content/site';
import { useCopy } from '../i18n/LanguageProvider';
import { cn } from '../lib/format';
import { useBooking } from '../booking/BookingProvider';
import { Button, ButtonAnchor } from './Button';
import { Container } from './Container';
import { Logo } from './Logo';
import { mainNav } from './navItems';

export function Header() {
  const copy = useCopy();
  const { open } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300',
        scrolled
          ? 'border-white/80 bg-ivory/85 shadow-[0_8px_30px_rgb(11_36_31/0.08)]'
          : 'border-white/60 bg-ivory/70 shadow-[0_2px_12px_rgb(11_36_31/0.03)]',
      )}
    >
      <Container
        className={cn(
          'flex items-center justify-between gap-5 transition-[padding] duration-300',
          scrolled ? 'py-2.5' : 'py-3.5 lg:py-4',
        )}
      >
        <Link to="/" aria-label={copy.a11y.home} className="shrink-0 rounded-md">
          <Logo className={cn('transition-[height] duration-300', scrolled ? 'h-10 lg:h-12' : 'h-11 lg:h-16')} />
        </Link>

        <nav aria-label={copy.a11y.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-white/80 bg-white/70 p-1 shadow-[0_10px_25px_rgb(11_36_31/0.07)] backdrop-blur-xl">
            {mainNav.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    cn(
                      'relative inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-3.5 t-small font-medium transition-colors duration-200',
                      isActive && !item.to.includes('#')
                        ? 'bg-teal-900 text-ivory shadow-sm'
                        : 'text-ink-soft hover:bg-teal-50 hover:text-teal-900',
                    )
                  }
                >
                  {copy.nav[item.key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={`tel:${contact.primary.tel}`} className="hidden min-h-11 items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 text-sm font-semibold text-teal-950 shadow-[0_10px_25px_rgb(11_36_31/0.07)] backdrop-blur-xl lg:inline-flex">
            <Phone className="size-4" aria-hidden="true" /> {contact.primary.display}
          </a>
          <div className="hidden lg:block">
            <Button icon={<CalendarDays aria-hidden="true" />} onClick={() => open()}>
              {copy.actions.book}
            </Button>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}

function MobileMenu() {
  const copy = useCopy();
  const ref = useRef<HTMLDialogElement>(null);
  const location = useLocation();

  useEffect(() => {
    ref.current?.close();
  }, [location.pathname, location.hash]);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="grid size-12 place-items-center rounded-full border border-ink/15 text-ink lg:hidden"
        aria-label={copy.a11y.openMenu}
        aria-haspopup="dialog"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>
      <dialog
        ref={ref}
        aria-label={copy.a11y.mainNav}
        className="sheet fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-ivory p-0 text-ink"
        onClick={(e) => e.target === ref.current && ref.current.close()}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-3">
            <Logo className="h-11" />
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="grid size-12 place-items-center rounded-full border border-ink/15"
              aria-label={copy.a11y.closeMenu}
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label={copy.a11y.mainNav} className="flex-1 overflow-y-auto px-5 pt-6">
            <ul className="divide-y divide-line border-y border-line">
              {mainNav.map((item) => (
                <li key={item.key}>
                  <Link to={item.to} className="flex min-h-16 items-center t-h3 text-teal-950">
                    {copy.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-line p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
            <ButtonAnchor
              href={`tel:${contact.primary.tel}`}
              variant="emergency"
              size="lg"
              className="w-full"
              icon={<Phone aria-hidden="true" />}
            >
              {copy.actions.callEmergency}
            </ButtonAnchor>
          </div>
        </div>
      </dialog>
    </>
  );
}



==============================================================================
// FILE: src/components/Logo.tsx
==============================================================================

import logoUrl from '../assets/brand/logo.webp';
import logoLightUrl from '../assets/brand/logo-light.webp';
import { hospital } from '../content/site';
import { cn } from '../lib/format';

export function Logo({ light, className }: { light?: boolean; className?: string }) {
  return (
    <img
      src={light ? logoLightUrl : logoUrl}
      alt={`${hospital.shortName}, ${hospital.tagline}`}
      width={355}
      height={144}
      className={cn('h-12 w-auto', className)}
    />
  );
}



==============================================================================
// FILE: src/components/MobileBar.tsx
==============================================================================

import { CalendarDays, MessageCircle, Phone } from 'lucide-react';
import { contact, whatsappLink } from '../content/site';
import { useBooking } from '../booking/BookingProvider';
import { useCopy } from '../i18n/LanguageProvider';

/** Phones only: Call, WhatsApp and Book, always one tap away. */
export function MobileBar() {
  const copy = useCopy();
  const { open } = useBooking();
  const item =
    'flex min-h-14 min-w-0 flex-col items-center justify-center gap-0.5 px-1 text-center t-meta font-semibold leading-tight [overflow-wrap:anywhere]';
  return (
    <div className="fixed bottom-0 left-0 z-40 w-screen max-w-full overflow-hidden border-t border-white/80 bg-paper/85 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgb(11_36_31/0.08)] lg:hidden">
      <div className="grid min-w-0 grid-cols-[repeat(3,minmax(0,1fr))]">
        <a href={`tel:${contact.primary.tel}`} className={`${item} text-emergency`}>
          <Phone className="size-5" aria-hidden="true" />
          {copy.mobileBar.call}
        </a>
        <a
          href={whatsappLink(copy.booking.whatsappGeneral)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item} text-teal-800`}
        >
          <MessageCircle className="size-5" aria-hidden="true" />
          {copy.mobileBar.whatsapp}
        </a>
        <button type="button" onClick={() => open()} className={`${item} m-1.5 rounded-[var(--radius-md)] bg-teal-700 text-ivory`}>
          <CalendarDays className="size-5" aria-hidden="true" />
          {copy.mobileBar.book}
        </button>
      </div>
    </div>
  );
}

