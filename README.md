# KDM Engineers Group — website

React rebuild of [kdmengineers.com](https://kdmengineers.com). Vite + React 18 + Tailwind 3 + Framer Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/ (static; host with an SPA fallback: try_files $uri /index.html)
npm run lint
```

`VITE_ERP_API_URL` (default `https://erp.kdmengineers.com/api`) feeds the Careers pages from the KDM ERP.
`VITE_SITE_URL` (default `https://kdmengineers.com`) is used for canonical URLs and share previews.

## Where things live

| Path | What |
| --- | --- |
| `src/content/` | All copy and data — company, services, projects, SHM, clients, media registry, home-page groupings. Edit text here, not in components. |
| `src/components/engineering/` | The motion language: blueprint grid, measuring rule, crop marks, sensor nodes, waveforms, gear motif. |
| `src/components/site/` | Layout, navigation + mega menu, footer, shared primitives (buttons, headings, reveals, page hero), widgets. |
| `src/components/home/` | Home page sections, one file each (hero, proof, ecosystem, capabilities, SHM, projects, why KDM, technology, clients, knowledge, careers). |
| `src/components/brand/` | Logo and the intro loader. |
| `src/pages/` | One file per route; routes are declared in `src/App.jsx` (old WordPress URLs redirect there too). |
| `public/media/` | Optimised WebP photos (`*-sm.webp` small variants), logos and client logos. |

## Design system — "Living Blueprint"

**Colour** (sampled from the official logo artwork; tokens in `src/index.css`, Tailwind names `kdm-*`): logo ring red `#DB2C1D` (`kdm-red`, primary actions), outline indigo `#352F96` (`kdm-blue`, links, drawing lines, focus, active states), field cyan `#02A2D3` (`kdm-cyan`, data and grids), base yellow `#FAD403` (`kdm-yellow`, markers only), wordmark red `#A62F20` (`kdm-red-ink`, small red text). Neutrals: warm paper `#FBFAF7`, warm-grey surface `#F3F2ED`, cool mist `#EAF2F6`, graphite ink `#16181D`, muted `#646A75`, line `#E2E0D8`. States: `kdm-success`, `kdm-error`.

**Type**: Inter Tight (display), Inter (body), IBM Plex Mono (technical annotations, references, numbers). Classes: `t-display`, `t-h1`, `t-h2`, `t-h3`, `t-lead`, `t-stat`, `t-label` (mono uppercase), `t-num`.

**Geometry**: `container-kdm` (max 1320px, 16px mobile gutter); radii `rounded-tag` 3px, `rounded-card` 4px, `rounded-panel` 6px; light `shadow-soft` / `shadow-lift`; no glass, no gradients, square-cornered buttons with a ruled-off arrow cell.

**Drawing language** (`src/components/engineering/`): `BlueprintGrid` (faint drafting grid), `SheetZones` (A–F / 1–4 sheet markers), `SectionBubble` (section callouts used by every `SectionLabel`), `TitleBlock` (sheet title blocks with real values only), `DimensionLine`, `CoordinateMarker`, `Annotation`, `CornerMarks`/`Figure`, `MeasureRule`, `ServiceDiagram` (one illustrative line drawing per service), `Waveform`, `SensorNode`. Decorative pieces are `aria-hidden`; illustrative drawings are labelled as such and carry no invented measurements.

**Motion** (`src/lib/motion.js`): one easing `cubic-bezier(0.22, 1, 0.36, 1)`; line drawing, headline line rises, masked image wipes and short fades. There is no blocking intro — the page is usable immediately. Reduced-motion users get static content, and continuous animations pause off screen.

## Content placeholders to fill

- The NABL certificate image (TC-4036) shows "Valid until 11/11/2025" — replace with the renewed certificate.
- Stats (300+ clients, 200+ projects, 15+ awards) come from the old site — update in `company.stats` if they have changed.
