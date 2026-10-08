// Copy for the home page's interactive sections. Everything here regroups
// what the live site already says (services, foreword, "Strength", SHM page)
// — it adds structure, not new claims.

// "One engineering partner. Multiple disciplines." — each discipline points
// at the service page that delivers it.
export const disciplines = [
    {
        id: 'consult',
        verb: 'Consult',
        service: 'highways-bridges-buildings-irrigation',
        text: 'Detailed project reports, feasibility studies, design review and authority / independent engineering for highways, bridges, buildings and irrigation.',
    },
    {
        id: 'test',
        verb: 'Test',
        service: 'materials-testing',
        text: 'An NABL-accredited laboratory testing cement, concrete, aggregates, steel, bitumen and soil — with mix designs and load tests.',
    },
    {
        id: 'investigate',
        verb: 'Investigate',
        service: 'geotechnical-investigations',
        text: 'Bore holes, field tests and laboratory analysis to understand the ground before anything is built on it.',
    },
    {
        id: 'survey',
        verb: 'Survey',
        service: 'topo-surveys',
        text: 'Topographical surveys with total station, DGPS and drone — and traffic surveys from ATCC counts to axle load studies.',
    },
    {
        id: 'design',
        verb: 'Design',
        service: 'pavement-investigation-design',
        text: 'Flexible and rigid pavement design, foundation systems, retaining structures and ground improvement.',
    },
    {
        id: 'monitor',
        verb: 'Monitor',
        service: 'structural-health-monitoring',
        text: 'Sensors at strategic locations measure acceleration, modal frequencies, displacements, strains and forces under dynamic loading.',
    },
    {
        id: 'assess',
        verb: 'Assess',
        service: 'structural-condition-assessment',
        text: 'NDT and semi-destructive testing, independent analysis and design checks of as-built and distressed structures.',
    },
    {
        id: 'rehabilitate',
        verb: 'Rehabilitate',
        service: 'structural-condition-assessment',
        text: 'Restoration and retrofitting schemes, specialised working drawings, and supervision of restoration works on site.',
    },
    {
        id: 'train',
        verb: 'Train',
        service: 'kdm-knowledge-share-center',
        text: 'The KDM Knowledge Share Center trains engineers in concrete, construction technology, NDT, welding inspection and QA/QC.',
    },
];

// The home page's six capability panels (service slug + the panel heading).
export const capabilityPanels = [
    { service: 'materials-testing', title: 'Material Testing' },
    { service: 'geotechnical-investigations', title: 'Geotechnical Engineering' },
    { service: 'pavement-investigation-design', title: 'Pavement Engineering' },
    { service: 'highways-bridges-buildings-irrigation', title: 'Highways, Bridges & Buildings' },
    { service: 'structural-condition-assessment', title: 'Structural Assessment' },
    { service: 'structural-health-monitoring', title: 'Structural Health Monitoring' },
];

// "Why KDM?" — from the company's Strength statement, foreword and SHM page.
export const strengths = [
    {
        title: 'Eminent advisory committee',
        text: 'An advisory committee of eminent experts in the related fields mentors our work.',
        theme: 'Experience',
    },
    {
        title: 'Accredited quality',
        text: 'An NABL-accredited laboratory (ISO/IEC 17025:2017) and a well-structured quality assurance and management system.',
        theme: 'Experience',
    },
    {
        title: 'State-of-the-art equipment',
        text: 'From falling weight deflectometers and network survey vehicles to wireless structural monitoring sensors.',
        theme: 'Technology',
    },
    {
        title: 'Research collaboration',
        text: 'We work closely with research institutes to integrate sensors, automated data collection and analysis.',
        theme: 'Technology',
    },
    {
        title: 'Trained, qualified manpower',
        text: 'Trained, qualified and experienced engineers and technicians in the field and in the laboratory.',
        theme: 'People',
    },
    {
        title: 'Everything under one roof',
        text: 'Consultancy, testing, surveys, monitoring, rehabilitation and training from a single engineering partner.',
        theme: 'People',
    },
];

// The Knowledge Share Center's programme list, grouped for reading.
export const knowledgeTracks = [
    {
        title: 'Testing & inspection',
        items: [
            'Advanced in-situ testing of concrete structures',
            'Non-destructive testing of concrete structures',
            'Welding inspection',
            'Codes & standards — NDT, welding',
        ],
    },
    {
        title: 'Quality & durability',
        items: [
            'QA / QC programmes (mechanical, civil)',
            'Inspection in quality audit and rigid pavements',
            'Coastal concrete quality and durability',
            'Construction, quality control and rehabilitation of concrete structures',
        ],
    },
    {
        title: 'Design & building services',
        items: [
            'Architectural design of smart structures',
            'Building services management',
            'Metallurgy for non-metallurgists',
            'Programmes on request — HVAC, piping engineering',
        ],
    },
    {
        title: 'Formats',
        items: [
            'Industrially accepted certification programmes',
            'Internship training',
            'Workshops and guest lectures',
            'Awareness programmes',
            'Project works — mini / major',
            'Special trainings (as per college / university norms)',
        ],
    },
];

// Areas a new engineer can grow into — the company's own service lines.
export const careerTracks = [
    'Structural Health Monitoring',
    'Materials Testing',
    'Geotechnical Investigation',
    'Surveys & Traffic Engineering',
    'Pavement Engineering',
    'Design & Consultancy',
    'Structural Assessment',
    'Training',
];
