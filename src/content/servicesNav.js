import { media } from './media';

// Lightweight nav-only view of the services list — just what the Navbar and
// Footer need (slug/title/cover/summary/featured), so they don't drag in
// every service's full capability list and photo gallery (see services.js)
// and defeat the route-level code-splitting on /services and /services/:slug.

const banner = (name) => media.banners.find((m) => m.src.includes(`/${name}.webp`));

export const servicesNav = [
    {
        slug: 'materials-testing',
        title: 'Materials Testing Laboratory Services',
        shortTitle: 'Materials Testing',
        summary:
            'Laboratory testing of construction materials — cement, concrete, aggregates, steel, bitumen and soil — with mix designs, load tests and non-destructive testing.',
        cover: media['materials-testing'][0],
    },
    {
        slug: 'topo-surveys',
        title: 'Topo Surveys',
        shortTitle: 'Topo Surveys',
        summary:
            'Topographical surveys with total station, DGPS, GPS and drone — levelling, profiling, contouring, route alignment and as-built surveys.',
        cover: media.topo[4],
    },
    {
        slug: 'geotechnical-investigations',
        title: 'Geo-technical Investigations & Foundation Design',
        shortTitle: 'Geo-technical Investigations',
        summary:
            'Bore-hole investigations, field and laboratory testing, pile and plate load tests, and the design of foundations, retaining structures and ground improvement.',
        cover: banner('pile-load-test-2'),
    },
    {
        slug: 'traffic-surveys',
        title: 'Traffic Surveys',
        shortTitle: 'Traffic Surveys',
        summary:
            'Automatic and video traffic counts, origin–destination, axle load, turning movement, parking, pedestrian and speed-and-delay surveys.',
        cover: banner('sign-boards-3'),
    },
    {
        slug: 'highways-bridges-buildings-irrigation',
        title: 'Highways, Bridges, Buildings And Irrigation',
        shortTitle: 'Highways, Bridges & Buildings',
        summary:
            'Detailed project reports, feasibility studies, design review, authority / independent engineering, quality control and road safety audits.',
        cover: banner('ssr-bridges-1'),
    },
    {
        slug: 'pavement-investigation-design',
        title: 'Pavement Investigation & Pavement Design',
        shortTitle: 'Pavement Investigation & Design',
        summary:
            'Network survey vehicle, falling weight deflectometer, Benkelman beam, roughness and skid testing — with flexible and rigid pavement design.',
        cover: banner('pavement-design-3'),
    },
    {
        slug: 'structural-condition-assessment',
        title: 'Structural Condition Assessment & Rehabilitation',
        shortTitle: 'Structural Condition Assessment',
        summary:
            'Condition assessment of existing structures by NDT and semi-destructive testing, seismic and fire-damage assessment, and retrofitting schemes.',
        cover: banner('railways-19'),
    },
    {
        slug: 'kdm-knowledge-share-center',
        title: 'KDM Knowledge Share Center (KDMKSC)',
        shortTitle: 'Knowledge Share Center',
        summary:
            'Training and technology sharing in cement, concrete and construction technology — certification programmes, NDT, welding inspection, QA/QC and internships.',
        cover: banner('kdmksc-2-1'),
    },
    {
        slug: 'structural-health-monitoring',
        title: 'Structural Health Monitoring, Assessment & Rehabilitation',
        shortTitle: 'Structural Health Monitoring',
        summary:
            'Instrumenting bridges and structures to measure acceleration, modal frequencies, displacements, strains and forces — for assessment, monitoring and rehabilitation.',
        cover: banner('shm-2'),
        featured: true,
    },
];

export const serviceSummaryNav = (s) => s.summary;
