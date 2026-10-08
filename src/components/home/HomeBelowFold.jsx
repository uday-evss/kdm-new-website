import React from 'react';
import { ContactBand } from '@/components/site/widgets';
import Ecosystem from './Ecosystem';
import Capabilities from './Capabilities';
import ShmSignature from './ShmSignature';
import ProjectStories from './ProjectStories';
import Difference from './Difference';
import DataPipeline from './DataPipeline';
import ClientsShowcase from './ClientsShowcase';
import KnowledgeTeaser from './KnowledgeTeaser';
import CareersTeaser from './CareersTeaser';

// Everything below the home page's first two screens, loaded as its own
// chunk so the hero can paint and respond sooner.
export default function HomeBelowFold() {
    return (
        <>
            <Ecosystem />
            <Capabilities />
            <ShmSignature />
            <ProjectStories />
            <Difference />
            <DataPipeline />
            <ClientsShowcase />
            <KnowledgeTeaser />
            <CareersTeaser />
            <ContactBand />
        </>
    );
}
