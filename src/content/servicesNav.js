import { media } from './media';

// Lightweight nav-only view of the services list — just what the Navbar and
// Footer need (slug/title/cover/summary/featured), so they don't drag in
// every service's full capability list and photo gallery (see services.js)
// and defeat the route-level code-splitting on /services and /services/:slug.
//
// KDM Engineers (India) Pvt. Ltd.'s approved public service portfolio is
// exactly these three departments — Structural Health Monitoring (the
// flagship), Materials Testing and Geo-technical Investigations. The site
// previously carried six more disciplines inherited from the wider KDM
// Engineers Group's combined service menu; those have been retired from
// this site (old links redirect to /services — see App.jsx).
//
// Canonical order, used everywhere the three departments appear together:
// 01 Structural Health Monitoring, 02 Materials Testing,
// 03 Geo-technical Investigations.

const banner = (name) => media.banners.find((m) => m.src.includes(`/${name}.webp`));

export const servicesNav = [
    {
        slug: 'structural-health-monitoring',
        title: 'Structural Health Monitoring, Assessment & Rehabilitation',
        shortTitle: 'Structural Health Monitoring',
        summary:
            'Instrumenting bridges and structures to measure acceleration, modal frequencies, displacements, strains and forces — for assessment, monitoring and rehabilitation.',
        cover: banner('shm-2'),
        featured: true,
    },
    {
        slug: 'materials-testing',
        title: 'Materials Testing Laboratory Services',
        shortTitle: 'Materials Testing',
        summary:
            'Laboratory testing of construction materials — cement, concrete, aggregates, steel, bitumen and soil — with mix designs, load tests and non-destructive testing.',
        cover: media['materials-testing'][0],
    },
    {
        slug: 'geotechnical-investigations',
        title: 'Geo-technical Investigations & Foundation Design',
        shortTitle: 'Geo-technical Investigations',
        summary:
            'Bore-hole investigations, field and laboratory testing, pile and plate load tests, and the design of foundations, retaining structures and ground improvement.',
        cover: banner('pile-load-test-2'),
    },
];

export const serviceSummaryNav = (s) => s.summary;
