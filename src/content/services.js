import { media } from './media';
import { servicesNav } from './servicesNav';

// KDM Engineers (India) Pvt. Ltd.'s three approved departments, with the
// "What We Do?" lists and photo galleries from each service's page on the
// live site. `legacyPath` is the old WordPress URL, redirected to the new
// page so existing links and search results keep working. Structural
// Health Monitoring has its own, richer page (ShmPage). Shared nav fields
// (slug/title/shortTitle/summary/cover/featured) live in servicesNav.js so
// the Navbar/Footer can import just those without pulling in every gallery
// image below.
//
// Six further disciplines the wider KDM Engineers Group site used to carry
// (Topo Surveys, Traffic Surveys, Highways/Bridges/Buildings/Irrigation,
// Pavement Investigation & Design, Structural Condition Assessment, the
// Knowledge Share Center) are outside this entity's approved three-
// department portfolio and have been retired from this site — their old
// URLs now redirect to /services (see App.jsx's REMOVED_SERVICE_REDIRECTS).

const banner = (name) => media.banners.find((m) => m.src.includes(`/${name}.webp`));
const nav = (slug) => servicesNav.find((s) => s.slug === slug);

export const services = [
    {
        ...nav('materials-testing'),
        legacyPath: '/materials-testing-laboratory-services',
        capabilities: [
            'Admixture & Curing Compound',
            'Bituminous Mix Designs',
            'Bricks, Blocks & Mix Designs',
            'Bump Integrator Test',
            'Cement, Fly Ash, Silica Fume, GGBS, Lime, Gypsum, Limestone, Coal/Coke',
            'Coarse & Fine Aggregate',
            'Concrete Mix Designs',
            'Construction Materials Testing',
            'Falling Weight Deflectometer Test',
            'Load Test on Piles, Bridges, Floor, Slabs & Soil',
            'Mass of Zinc in Zinc Coated Iron & Steel Articles',
            'Non-Destructive Testing',
            'Reinforcement and Structural Steel',
            'Soil, GSB, WMM, Rock & Soil Stabilization Studies',
            'Tiles & Tile Adhesives, Grouts',
            'Water, Wood & Doors',
        ],
        gallery: media['materials-testing'],
    },
    {
        ...nav('geotechnical-investigations'),
        legacyPath: '/geo-technical-investigations-foundation-design',
        capabilities: [
            'Investigation by drilling bore holes, conducting field testing, collecting samples, carrying out laboratory tests and furnishing report with recommendations.',
            'Conducting field tests such as Plate Load Test, Static Cone Penetration Test, Electrical Resistivity Test and Permeability Test.',
            'Facilities to conduct Pile Testing — Vertical, Lateral, Dynamic, Pullout & Pile Integrity.',
            'Conducting tests for compaction and quality control in earth works, K-value tests on subgrade.',
            'Designing foundation systems & retaining structures, study of structures subjected to settlement / foundation failure and suggesting remedial measures.',
            'Designing ground improvement techniques in weak soil conditions.',
        ],
        gallery: media.geotechnical,
    },
    {
        ...nav('structural-health-monitoring'),
        legacyPath: '/structural-health-monitoring-assessment-rehabilitation',
        // Rendered by its own page (pages/ShmPage.jsx) — see shm.js.
    },
];

export const findService = (slug) => services.find((s) => s.slug === slug);

// A one-line description for search results, menus and cards. `summary` is
// written from the service's own capability list (no new claims); the
// fallback builds one from that list directly.
export const serviceSummary = (service) => {
    if (service.summary) return service.summary;
    if (service.intro) return service.intro;
    const items = (service.capabilities ?? []).slice(0, 4).map((c) => c.replace(/\.$/, ''));
    return items.length ? `${service.title}: ${items.join('; ')} and more.` : service.title;
};
