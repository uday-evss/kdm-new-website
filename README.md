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

## Design system — "KDM Engineering System"

**Colour** (from the logo; tokens in `src/index.css`, Tailwind names `kdm-*`): ink `#0F1B2D`, graphite, muted `#5B6B82`, line `#DDE5EE`, paper `#F7FAFC`, surface, mist; brand blue `#153B8F`, navy `#0E2A5E`, cyan `#14A6DA` (data/technical), red `#E2321F` (signal/accent), yellow `#F6C400` (measurement marker). Use `*-ink` variants (`kdm-red-ink`, `kdm-cyan-ink`) for small text so contrast stays AA.

**Type**: Space Grotesk (display, labels, numbers) + Inter (body). Classes: `t-display`, `t-h1`, `t-h2`, `t-h3`, `t-lead`, `t-label` (technical annotation), `t-num`.

**Layout**: `container-kdm` (max 1320px, 16px mobile gutter), `Section` with tones `white | paper | surface | mist`, radii `rounded-card` (14px) / `rounded-panel` (20px), shadows `shadow-soft` / `shadow-lift`.

**Motion** (`src/lib/motion.js`): one easing `cubic-bezier(0.22, 1, 0.36, 1)`, fade-up reveals, line-by-line headline rises, masked image wipes, SVG line drawing. Every section opens with a numbered `SectionLabel` and the `MeasureRule` draws itself between key sections. Reduced-motion users get static content (MotionConfig `reducedMotion="user"` + CSS), and infinite animations pause when off screen.

## Content placeholders to fill

- The NABL certificate image (TC-4036) shows "Valid until 11/11/2025" — replace with the renewed certificate.
- Stats (300+ clients, 200+ projects, 15+ awards) come from the old site — update in `company.stats` if they have changed.
