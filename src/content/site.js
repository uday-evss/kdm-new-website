// Company-wide content, taken from the live kdmengineers.com site. Pages and
// layout read everything from here (and from services.js, projects.js,
// clients.js) so the copy lives in one place.

export const company = {
    name: 'KDM Engineers (India) Pvt. Ltd.',
    shortName: 'KDMEI',
    legalName: 'KDM Engineers (India) Pvt. Ltd.',
    tagline: 'Complete Civil Engineering Solutions',
    foundedYear: 2012,
    // The words set around the gear in the KDM logo.
    logoWords: ['Kwality', 'Design', 'Measure'],
    values: ['Integrity', 'Customer Delight', 'Social Commitment'],

    intro: [
        'KDM Engineers (India) Pvt. Ltd. is a civil engineering company specialising in Structural Health Monitoring, Materials Testing and Geo-technical Investigations — a centre of excellence and accessibility to the construction industry.',
        'We work to a well-structured quality assurance and management system, with a strong commitment to supplying clients with complete, defensible engineering solutions — pursuing optimum, high-quality outcomes on every project.',
    ],

    foreword: [
        'KDM Engineers (India) Pvt. Ltd. is a civil engineering company that aspires to be a centre of excellence in structural health monitoring, materials testing and geo-technical investigations for the construction sector.',
        'We work to a well-structured quality assurance and management system, with a strong commitment to supplying clients with complete, defensible engineering solutions — pursuing optimum, high-quality outcomes on every project.',
    ],

    // "We believe in Our …"
    pillars: [
        {
            title: 'Vision',
            text: 'To bring Structural Health Monitoring, Materials Testing and Geo-technical Investigation under one roof, and to become a center of excellence and approachable for the construction industry.',
        },
        {
            title: 'Mission',
            text: 'To update and enhance our processes in tune with the latest technology to maximize the efficiency of our services and improve the standards. To make significant contribution for sustainability of industry through technical and trained manpower.',
        },
        {
            title: 'Strength',
            text: 'An advisory committee with eminent experts in the related fields as mentors, Trained, qualified and experienced manpower, State-of-the-art equipment.',
        },
    ],

    // From the "KDM Milestones" roadmap graphic on the About page.
    milestones: [
        { year: '2012', text: 'Established as KDM Engineers (India) Pvt. Ltd.', done: true },
        { year: '2021', text: 'Completed 26+ detailed engineering projects', done: true },
        { year: '2025', text: 'To be a premier organization at national level' },
        { year: '2030', text: 'To create an international image' },
    ],

    mdMessage: [
        'Since 2012, KDM Engineers (India) Pvt. Ltd. has been providing Structural Health Monitoring, Materials Testing and Geo-technical Investigation services to clients across the country. The efficiency of our services and our commitment towards work has placed us at a high level in the construction industry.',
        'Our integrity, resources and prompt completion of projects have put us on the radar of major infrastructure companies.',
        'We have never left any stone unturned, and are constantly one step ahead of the obstacles, striving to provide the client with satisfactory service as promised.',
    ],

    // Portrait for the MD's message (null shows a monogram instead).
    mdPortrait: { src: '/media/about/md-portrait.webp', sm: '/media/about/md-portrait-sm.webp', w: 1078, h: 1460 },

    directors: [
        { name: 'Er. K. Srinivasulu', role: 'Managing Director' },
        { name: 'Mrs. K. Subhashini', role: 'Director' },
        { name: 'Mr. M. Ramakrishna', role: 'Director' },
    ],

    // "Our Forte" — SHM first, per the company's flagship positioning.
    forte: [
        'Structural Health Monitoring & Long-Term Live Monitoring',
        'Bridge Load Testing & Condition Assessment',
        'Non-Destructive / Semi-Destructive Testing',
        'Material Testing Laboratory Services',
        'Geo-technical Investigations & Foundation Design',
        'Quality Control/Assurance',
    ],

    stats: [
        { value: 300, suffix: '+', label: 'Clients' },
        { value: 200, suffix: '+', label: 'Projects' },
        { value: 15, suffix: '+', label: 'Awards' },
    ],

    brochures: [
        { title: 'KDM Engineers Profile', href: 'https://drive.google.com/file/d/1J9KQLghQKdf4ysizBXIrKjo0oomcPoZr/view?usp=sharing' },
        { title: 'KDM SHM Profile', href: 'https://drive.google.com/file/d/1E5ztLv0i6x2s26PjVY_4Wyy4zcBuanvW/view?usp=sharing' },
    ],

    accreditations: [
        {
            // NOTE: the certificate image on the old site (TC-4036) shows
            // "Valid Until: 11/11/2025" — replace it with the renewed one.
            title: 'NABL Accreditation — ISO/IEC 17025:2017',
            text: 'KDM Engineers (India) Pvt. Ltd. is accredited by the National Accreditation Board for Testing and Calibration Laboratories in the field of Testing, for its laboratory at Plot No. 93, E-Block, Autonagar, Visakhapatnam.',
            certificateNo: 'TC-4036',
            image: { src: '/media/about/1-vskp-nabl-certificate-page-0001.webp', sm: '/media/about/1-vskp-nabl-certificate-page-0001-sm.webp', w: 1130, h: 1600 },
        },
    ],
};

// Where the site is served from — used for canonical URLs and share previews.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://kdmengineers.com').replace(/\/$/, '');

export const contact = {
    headOffice: {
        label: 'Regd. & Corporate Office',
        company: 'KDM Engineers (India) Pvt. Ltd.',
        address: "9th Floor, Pardha's Picasa, Madhapur, Hyderabad 500081",
        email: 'srinivasulu.kunchala@kdmengineers.com',
        mapQuery: "Pardha's Picasa, Madhapur, Hyderabad 500081",
    },
    branches: [
        {
            city: 'Hyderabad',
            address: "9th Floor, Pardha's Picasa, Madhapur, Hyderabad - 500081",
            email: 'srinivasulu.kunchala@kdmengineers.com',
            person: 'Mr. K Srinivasulu',
            phone: '9912806685',
        },
        {
            city: 'Visakhapatnam',
            address: 'Plot No. 93, E-Block, Autonagar, Visakhapatnam – 530 012, Andhra Pradesh',
            email: 'mrk@kdmengineers.com',
            person: 'Mr. Ramakrishna',
            phone: '9912944495',
        },
    ],
};

export const socials = [
    { name: 'LinkedIn', href: 'https://in.linkedin.com/company/kdm-engineers-group' },
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100095421139655' },
    { name: 'Instagram', href: 'https://www.instagram.com/kdmengineersindiapvtltd/' },
    { name: 'YouTube', href: 'https://youtube.com/@KDMEngineers' },
];

// Phone numbers are stored as dialled in India; this formats them for tel: links.
export const telHref = (phone) => `tel:+91${phone.replace(/\D/g, '')}`;
export const formatPhone = (phone) => {
    const digits = phone.replace(/\D/g, '');
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
};
