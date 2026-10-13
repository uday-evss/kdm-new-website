import React from 'react';
import { ContactBand } from '@/components/site/widgets';
import ServiceIndex from './ServiceIndex';
import Ecosystem from './Ecosystem';
import ShmSignature from './ShmSignature';
import DataPipeline from './DataPipeline';
import ProjectStories from './ProjectStories';
import Difference from './Difference';
import ClientsShowcase from './ClientsShowcase';
import LeadershipTeaser from './LeadershipTeaser';
import KnowledgeTeaser from './KnowledgeTeaser';
import CareersTeaser from './CareersTeaser';

// Everything below the home page's first two screens, loaded as its own
// chunk so the hero can paint and respond sooner. Read top to bottom it is
// one drawing set: services, expertise, monitoring and its technology,
// projects, why KDM, trust, the company and its people, training, careers —
// then an invitation to talk.
export default function HomeBelowFold() {
    return (
        <>
            <ServiceIndex />
            <Ecosystem />
            <ShmSignature />
            <DataPipeline />
            <ProjectStories />
            <Difference />
            <ClientsShowcase />
            <LeadershipTeaser />
            <KnowledgeTeaser />
            <CareersTeaser />
            <ContactBand index="13" />
        </>
    );
}
