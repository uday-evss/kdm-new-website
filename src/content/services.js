import { media } from './media';

// The services KDM offers, with the "What We Do?" lists and photo galleries
// from each service page of the live site. `legacyPath` is the old WordPress
// URL, redirected to the new page so existing links and search results keep
// working. Structural Health Monitoring has its own, richer page (ShmPage).

const banner = (name) => media.banners.find((m) => m.src.includes(`/${name}.webp`));

export const services = [
    {
        slug: 'materials-testing',
        legacyPath: '/materials-testing-laboratory-services',
        title: 'Materials Testing Laboratory Services',
        shortTitle: 'Materials Testing',
        summary:
            'Laboratory testing of construction materials — cement, concrete, aggregates, steel, bitumen and soil — with mix designs, load tests and non-destructive testing.',
        cover: media['materials-testing'][0],
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
        slug: 'topo-surveys',
        legacyPath: '/topo-surveys',
        title: 'Topo Surveys',
        shortTitle: 'Topo Surveys',
        summary:
            'Topographical surveys with total station, DGPS, GPS and drone — levelling, profiling, contouring, route alignment and as-built surveys.',
        cover: media.topo[4],
        capabilities: [
            'Topographical Survey with TS, DGPS, GPS & Drone',
            'Leveling by Digital Level & Auto Level instruments',
            'Profiling, Contouring, Leveling, Curve setting, etc.',
            'Route alignment for roads, bridges, pipelines, power lines etc.',
            'As built survey for developed city regions',
            'Quantity survey after construction',
        ],
        gallery: media.topo,
    },
    {
        slug: 'geotechnical-investigations',
        legacyPath: '/geo-technical-investigations-foundation-design',
        title: 'Geo-technical Investigations & Foundation Design',
        shortTitle: 'Geo-technical Investigations',
        summary:
            'Bore-hole investigations, field and laboratory testing, pile and plate load tests, and the design of foundations, retaining structures and ground improvement.',
        cover: banner('pile-load-test-2'),
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
        slug: 'traffic-surveys',
        legacyPath: '/traffic-survey',
        title: 'Traffic Surveys',
        shortTitle: 'Traffic Surveys',
        summary:
            'Automatic and video traffic counts, origin–destination, axle load, turning movement, parking, pedestrian and speed-and-delay surveys.',
        cover: banner('sign-boards-3'),
        capabilities: [
            'Automatic Traffic Counter / Classifier (ATCC)',
            'Video Traffic Counter / Classifier (VTCC)',
            'Origin – Destination survey',
            'Axle Load survey',
            'Turning Movement Count (TMC)',
            'Parking Studies',
            'Traffic Sign boards',
            'Pedestrian Cross Survey',
            'Speed and Delay Survey',
            'Registered Number Plate Survey',
        ],
        gallery: media.traffic,
    },
    {
        slug: 'highways-bridges-buildings-irrigation',
        legacyPath: '/highways-bridges-buildings-and-irrigation-our-services',
        title: 'Highways, Bridges, Buildings And Irrigation',
        shortTitle: 'Highways, Bridges & Buildings',
        summary:
            'Detailed project reports, feasibility studies, design review, authority / independent engineering, quality control and road safety audits.',
        cover: banner('ssr-bridges-1'),
        capabilities: [
            'Authority/Independent Engineering Services',
            'Detailed Engineering Design Review',
            'Detailed Engineering Works',
            'Detailed Project Reports',
            'Feasibility Studies',
            'Hydrological and Hydraulics Study',
            'Land Acquisition & Resettlement Monitoring',
            'Pavement Design & Review',
            'Pre/Post Bid Engineering Services',
            'Quality Control/ Assurance',
            'Road Safety Audits & Action Plans',
            'Traffic Engineering',
        ],
        gallery: media['highways-bridges'],
    },
    {
        slug: 'pavement-investigation-design',
        legacyPath: '/pavement-investigation-and-pavement-design',
        title: 'Pavement Investigation & Pavement Design',
        shortTitle: 'Pavement Investigation & Design',
        summary:
            'Network survey vehicle, falling weight deflectometer, Benkelman beam, roughness and skid testing — with flexible and rigid pavement design.',
        cover: banner('pavement-design-3'),
        capabilities: [
            'Networking Survey Vehicle (NSV)',
            'Falling Weight Deflectometer (FWD)',
            'Benkelman Beam Deflection (BBD)',
            'Bump Indicator (Roughness Test)',
            'Road Inventory and Condition Monitoring',
            'Skid Resistance',
            'Sub-grade Investigations',
            'Dynamic Cone Penetration Test',
            'Flexible Pavement Design',
            'Rigid Pavement Design',
            'Semi Flexible & Rigid Pavement',
            'Road Markings',
        ],
        gallery: media.pavement,
    },
    {
        slug: 'structural-condition-assessment',
        legacyPath: '/structural-condition-assessment-rehabilitation',
        title: 'Structural Condition Assessment & Rehabilitation',
        shortTitle: 'Structural Condition Assessment',
        summary:
            'Condition assessment of existing structures by NDT and semi-destructive testing, seismic and fire-damage assessment, and retrofitting schemes.',
        cover: banner('railways-19'),
        capabilities: [
            'Structural soundness assessment by NDT & Semi-Destructive tests, independent analysis and design check of as-built structures.',
            'Structures stability assessment for change in occupancy, future expansion, proposed modification, as per latest standards.',
            'Assessment of fire and other calamity damaged structures.',
            'Structural adequacy assessment for seismic forces as per latest standards.',
            'Investigation of distressed structures through non-destructive and other related evaluation tests.',
            'Working out appropriate restoration and retrofitting schemes to rehabilitate the structures to normal.',
            'Preparation and issue of specialized working drawings & specifications.',
            'Supervision of restoration works during execution.',
            'Assessment of quality of welded fabricated steel structures through DPT, UT, MPT etc.',
        ],
        gallery: media['structural-assessment'],
    },
    {
        slug: 'kdm-knowledge-share-center',
        legacyPath: '/kdm-knowledge-share-center-kdmksc',
        title: 'KDM Knowledge Share Center (KDMKSC)',
        shortTitle: 'Knowledge Share Center',
        summary:
            'Training and technology sharing in cement, concrete and construction technology — certification programmes, NDT, welding inspection, QA/QC and internships.',
        cover: banner('kdmksc-2-1'),
        intro:
            'With the availability of different expertise groups with well experienced faculty and state-of-the-art equipment, KDM Engineers (India) Pvt. Ltd. started a new centre, the KDM Knowledge Share Centre (KDMKSC), dedicated to training and technology share on several aspects of Cement & Concrete and Construction Technology including Structural Assessment & Rehabilitation.',
        capabilities: [
            'Advanced In-Situ Testing of Concrete Structures',
            'Architectural Design of Smart Structures',
            'Awareness Programmes',
            'Building Services Management',
            'Coastal concrete quality and durability',
            'Codes & standards – NDT, Welding etc.',
            'Construction, Quality control and rehabilitation of Concrete structures',
            'Guest lectures',
            'Industrially Accepted Certification Programmes',
            'Inspection in Quality audit and rigid pavements',
            'Internship Training',
            'Metallurgy for non-metallurgists',
            'Non Destructive testing of Concrete structures',
            'Programs on request – HVAC, Piping Engineering etc.',
            'Project works – Mini/Major',
            'QA QC programs (Mechanical, Civil)',
            'Special Trainings (As per college/University norms)',
            'Welding inspection',
            'Workshop',
        ],
        gallery: media.kdmksc,
    },
    {
        slug: 'structural-health-monitoring',
        legacyPath: '/structural-health-monitoring-assessment-rehabilitation',
        title: 'Structural Health Monitoring, Assessment & Rehabilitation',
        shortTitle: 'Structural Health Monitoring',
        summary:
            'Instrumenting bridges and structures to measure acceleration, modal frequencies, displacements, strains and forces — for assessment, monitoring and rehabilitation.',
        cover: banner('shm-2'),
        featured: true,
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
