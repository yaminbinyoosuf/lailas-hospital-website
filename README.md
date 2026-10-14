# Lailas Hospital & IVF Centre — Official Website

Website for **Lailas Hospital and IVF Centre**, Laila Plaza, Kozhikode Road (Thalappara Road),
Tirurangadi P.O., Chemmad, Malappuram District, Kerala — 676306.

Ethical maternity care, advanced IVF & fertility treatment, gynaecology & laparoscopy,
paediatrics & neonatology, general medicine, and 24/7 emergency, laboratory and pharmacy
services. Serving Chemmad since 1994 with 70,000+ safe deliveries.

**24/7 appointments & emergency:** +91 8606 800 999 · **WhatsApp:** same number
**Landlines:** 0494 2463377 · 0494 2464193 · 0494 2953377 · **Email:** care@lailashospital.com

## Architecture

```
src/
  App.tsx                 route table, SEO metadata, overlay orchestration
  routes.ts               React.lazy route + overlay code splitting
  index.css               design tokens, typography, a11y utilities
  components/
    ui.tsx                Button / LinkButton / Container / SectionHeading / Stat
    Overlay.tsx           accessible Modal + Drawer (focus trap, scroll lock)
    Header.tsx            sticky header, department dropdown, conversion bar
    SearchBar.tsx         instant search (ARIA combobox + listbox)
    AppointmentWizard.tsx 4-step booking flow with telehealth toggle
    TriageAssistant.tsx   symptom → department guidance drawer
    FaqAccordion.tsx      accessible FAQ accordion
    PatientPortal.tsx     lab results / prescriptions preview + resources
    TrustSignals.tsx      accreditations, security assurance, testimonials
    WhatsAppFab.tsx       floating helpdesk button (xl and up)
    Footer.tsx, MobileStickyBar.tsx, Breadcrumbs.tsx
  lib/search.ts           search index + scoring
  hooks/useScrollReveal.ts progressive scroll animation (observer + fail-safe)
  data/hospitalData.ts    ALL hospital facts — single source of truth
  assets/images.ts        responsive image registry
tools/optimize-images.py  regenerates the WebP derivatives in src/assets/images
```

Routing is a lightweight in-app router in `App.tsx` (`PAGE_METADATA` +
`history.pushState`). Add a route by extending that map and rendering the page there.

### Typography

**Figtree** for headings and UI, **Inter Tight** for body copy, with **Newsreader italic**
reserved for the single pull-quote. Figtree was chosen over Bricolage Grotesque (too quirky),
Geist (too cold) and Instrument Sans (too neutral) as the most trustworthy-yet-warm sans for a
hospital. All three load as variable fonts from Google Fonts.

### Performance

- Route-level code splitting via `React.lazy`: initial JS is **~79 kB gzipped**; the homepage
  adds ~12 kB. Every other route and both overlays load on demand.
- Photography is served as **WebP with `srcset`/`sizes`** through `<picture>`, with a JPEG
  fallback on the hero. The hero is ~101 kB on phones instead of ~965 kB — an 87% reduction
  across all four images.
- Below-the-fold images are `loading="lazy" decoding="async"`; the hero is `fetchPriority="high"`.

### Accessibility (WCAG 2.2 AA / ADA)

- Every text/background pairing meets or exceeds **4.5:1**; ratios are documented in
  `src/index.css`. Accent colours were darkened specifically to pass (`coral-600` 5.8:1).
- Every interactive control is at least **44×44 CSS px** (SC 2.5.8), verified by an automated
  audit across 8 viewport widths.
- Modals and drawers use `role="dialog"`, `aria-modal`, a focus trap, Escape-to-close, focus
  restoration, background scroll lock, and `aria-hidden` on the rest of the page.
- Search is a full ARIA combobox/listbox with ↑/↓/Enter/Escape and a live result count; FAQs use
  `aria-expanded` / `aria-controls`.
- A "Skip to main content" link is the first tab stop; `:focus-visible` uses a 3px ring.
- The root font size is never overridden in px, so browser-level font scaling works.
- All motion is disabled under `prefers-reduced-motion`, and reveals have a 1.2s fail-safe so
  content can never be stranded invisible.

## Content and data

All hospital facts — address, telephones, specialities, doctor roster, FAQ, triage guidance,
trust signals and portal samples — live in **`src/data/hospitalData.ts`**. Update that file
rather than editing page components.

**Confirmed and published:**

- Four consultants with qualifications and OPD timings — Dr. Laila Beegum N (MBBS, DGO),
  Dr. Geethanjali S (MBBS, DGO), Dr. Amith K (MBBS, MD Paediatrics), Dr. Jambir (MBBS, BCCPM).
- 70,000+ safe deliveries, 30+ years since 1994, first ultrasound in the locality (1996).
- Six core services plus the diagnostic laboratory and in-house pharmacy.
- The four-step IVF care pathway and the hospital's four institutional pillars.

### Still to review before go-live

1. `TESTIMONIALS` in `hospitalData.ts` is **placeholder content** and renders with a visible
   "illustrative samples" note. Replace with real, consented feedback or delete it.
2. `ACCREDITATIONS` all carry `confirmed: false` and render as "Documentation in progress".
   Set `confirmed: true` only with documentary proof.
3. `LAB_REPORTS` / `PRESCRIPTIONS` are **sample data** for the portal preview — the UI labels
   them "Sample data" because there is no live records system.
4. Confirm the WhatsApp number (+91 8606 800 999) is monitored by reception, since it is now the
   primary booking channel across the site.

### Clinical safety notes

`TriageAssistant` is wayfinding only. It never diagnoses, reports a confidence level rather than
guessing, and short-circuits to a phone call — with the booking action deliberately hidden —
whenever emergency language is detected (`EMERGENCY_KEYWORDS`). Chest symptoms deliberately route
to casualty rather than to a department the hospital does not have. The booking form only ever
collects contact details, never clinical history.

## Brand assets

The supplied logo (`~/Downloads/lailas logo insta.jpg`) is **not currently wired into the site** —
the header uses a small inline vector mark instead. The rollback removed the logo-derivative
pipeline and its generated assets. To put the real logo back in the header, generate transparent
PNG/SVG derivatives from the source file and point `BrandMark` in `src/components/Header.tsx` at
them.

## Photography

`src/assets/images/` contains **stock photographs, not photographs of Lailas Hospital**, and the
images are processed into WebP derivatives by `tools/optimize-images.py`. The hero is framed
tightly to exclude all third-party signage. **Replace these with authentic photographs of the
hospital before going live** — it is the single biggest remaining credibility gap.

## Deployment

`npm run build` emits a static site to `dist/`. Host it on any static host (Netlify, Vercel,
Cloudflare Pages, S3, or the hospital's own server). Because routing is client-side, configure the
host to fall back to `index.html` for unknown paths. Serve over HTTPS — the security messaging in
the UI depends on it.
