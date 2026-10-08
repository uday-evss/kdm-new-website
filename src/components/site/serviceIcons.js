import {
    FlaskConical,
    Mountain,
    Layers,
    TrafficCone,
    Route,
    Construction,
    Building2,
    GraduationCap,
    Activity,
} from 'lucide-react';

// One icon per service slug (kept out of the content files so those stay
// plain data).
export const serviceIcons = {
    'materials-testing': FlaskConical,
    'topo-surveys': Mountain,
    'geotechnical-investigations': Layers,
    'traffic-surveys': TrafficCone,
    'highways-bridges-buildings-irrigation': Route,
    'pavement-investigation-design': Construction,
    'structural-condition-assessment': Building2,
    'kdm-knowledge-share-center': GraduationCap,
    'structural-health-monitoring': Activity,
};
