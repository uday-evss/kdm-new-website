// "Our Clientele" from the live site, in its order and with its Government /
// Private grouping. `featured` marks the logos the old home page carousel
// showed.

const logo = (file) => `/media/clients/${file}.webp`;

const list = [
    { name: 'National Highways Authority of India', logo: logo('logo-nhai'), sector: 'Government', featured: true },
    { name: 'Ministry of Road Transport & Highways', logo: logo('logo-morth'), sector: 'Government', featured: true },
    { name: 'Electronics Corporation of India Limited', logo: logo('logo-ecil'), sector: 'Government', featured: true },
    { name: 'Government of Andhra Pradesh', logo: logo('logo-ap'), sector: 'Government', featured: true },
    { name: 'Government of Telangana', logo: logo('logo-ts'), sector: 'Government', featured: true },
    { name: 'DRDO', logo: logo('logo-drdo'), sector: 'Government', featured: true },
    { name: 'TSIIC', logo: logo('logo-tsiic'), sector: 'Government', featured: true },
    { name: 'South Central Railway', logo: logo('logo-scr'), sector: 'Government', featured: true },
    { name: 'Bhabha Atomic Research Centre', logo: logo('logo-barc'), sector: 'Government', featured: true },
    { name: 'Central Public Works Department', logo: logo('logo-cpwd'), sector: 'Government', featured: true },
    { name: 'CSIR', logo: logo('logo-csir'), sector: 'Government', featured: true },
    { name: 'Rail Vikas Nigam Limited', logo: logo('logo-rvnl'), sector: 'Government', featured: true },
    { name: 'POWERGRID', logo: logo('logo-powergrid'), sector: 'Government', featured: true },
    { name: 'WAPCOS', logo: logo('logo-wapcos'), sector: 'Government', featured: true },
    { name: 'Aarvee Associates', logo: logo('logo-aarvee'), sector: 'Private' },
    { name: 'Artefact Projects Ltd.', logo: logo('logo-artefact'), sector: 'Private' },
    { name: 'Ashoka Buildcon', logo: logo('logo-ashoka'), sector: 'Private' },
    { name: 'Aparna Constructions', logo: logo('logo-aparna'), sector: 'Private' },
    { name: 'BSCPL Infrastructure', logo: logo('logo-bscpl'), sector: 'Private' },
    { name: 'C5 Infra Pvt. Ltd.', logo: logo('logo-c5'), sector: 'Private' },
    { name: 'Dilip Buildcon Limited', logo: logo('logo-dilip'), sector: 'Private' },
    { name: 'Eagle Infra India Ltd.', logo: logo('logo-eagle'), sector: 'Private' },
    { name: 'IJM', logo: logo('logo-ijm'), sector: 'Private' },
    { name: 'Meenakshi', logo: logo('logo-meenakshi'), sector: 'Private' },
    { name: 'My Home Group', logo: logo('logo-my-home-group'), sector: 'Private' },
    { name: 'Rajapushpa', logo: logo('logo-rajapushpa'), sector: 'Private' },
    { name: 'Ramky', logo: logo('logo-ramky'), sector: 'Private' },
    { name: 'Cube Highways', logo: logo('logo-cubehighways'), sector: 'Private' },
    { name: 'Gayatri Projects', logo: logo('logo-gayatri'), sector: 'Private' },
    { name: 'GMR', logo: logo('logo-gmr'), sector: 'Private' },
    { name: 'GVR', logo: logo('logo-gvr'), sector: 'Private' },
    { name: 'JMC Projects (India) Ltd.', logo: logo('logo-jmc'), sector: 'Private' },
    { name: 'Larsen & Toubro', logo: logo('logo-lt'), sector: 'Private' },
    { name: 'LEA Associates', logo: logo('logo-lea'), sector: 'Private' },
    { name: 'NCC Limited', logo: logo('logo-ncc'), sector: 'Private' },
    { name: 'MIDHANI', logo: logo('logo-midhani'), sector: 'Private' },
    { name: 'RITES', logo: logo('logo-rites'), sector: 'Private' },
    { name: 'Shapoorji Pallonji', logo: logo('logo-shapoorji'), sector: 'Private' },
    { name: 'Tata Projects', logo: logo('logo-tata'), sector: 'Private' },
    { name: 'Vishwa Samudra', logo: logo('logo-vshwa-samudra'), sector: 'Private' },
    { name: 'Indian Road Survey and Management Pvt. Ltd.', logo: logo('logo-irsm'), sector: 'Private', featured: true },
];

// Each logo also has a small version (≤200 × 112) for rows and grids; the
// full-size file serves high-density screens.
export const clients = list.map((c) => ({ ...c, logoSm: c.logo.replace(/\.webp$/, '-sm.webp') }));
