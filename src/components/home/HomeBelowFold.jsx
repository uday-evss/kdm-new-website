import React from 'react';
import { ContactBand } from '@/components/site/widgets';
import ServiceIndex from './ServiceIndex';
import ShmSignature from './ShmSignature';
import DataPipeline from './DataPipeline';
import MaterialsTestingFeature from './MaterialsTestingFeature';
import GeotechFeature from './GeotechFeature';
import ProjectStories from './ProjectStories';
import Difference from './Difference';
import ClientsShowcase from './ClientsShowcase';
import LeadershipTeaser from './LeadershipTeaser';
import CareersTeaser from './CareersTeaser';

// Everything below the home page's first two screens, loaded as its own
// chunk so the hero can paint and respond sooner. Read top to bottom it is
// one drawing set: services (SHM first), SHM's own feature and technology,
// Materials Testing, Geo-technical Investigations, projects, why KDM,
// trust, the company and its people, careers — then an invitation to talk.
export default function HomeBelowFold() {
    return (
        <>
            <ServiceIndex />
            <ShmSignature />
            <DataPipeline />
            <MaterialsTestingFeature />
            <GeotechFeature />
            <ProjectStories />
            <Difference />
            <ClientsShowcase />
            <LeadershipTeaser />
            <CareersTeaser />
            <ContactBand index="13" />
        </>
    );
}
