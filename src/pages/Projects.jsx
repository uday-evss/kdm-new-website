import React from 'react';
import { projects } from '@/content/projects';
import { Container, PageHero, Section, SectionHeading, usePageMeta } from '@/components/site/primitives';
import { ContactBand } from '@/components/site/widgets';
import { StoryCard } from '@/components/home/ProjectStories';
import ProjectMap from '@/components/projects/ProjectMap';

export default function Projects() {
    usePageMeta(
        'Projects — Bridge Monitoring & Assessment',
        `Completed structural health monitoring, rail–structure interaction, vibration analysis and condition assessment projects on ${projects.length} railway bridges for South Central and East Coast Railway.`,
    );
    const rajahmundry = projects.find((p) => p.slug === 'rajamundry-bridge');

    return (
        <>
            <PageHero
                index="01"
                eyebrow="Projects"
                title={['Railway bridges,', 'measured and understood.']}
                image={rajahmundry.cover}
                imageAlt="The Rajahmundry bowstring arch bridge"
                caption={`Fig. 01 — ${rajahmundry.subject}`}
                crumbs={[{ label: 'Projects' }]}
            >
                Rail–structure interaction validation, structural health monitoring, vibration analysis and condition
                assessment — for South Central Railway and East Coast Railway.
            </PageHero>

            <Section tone="white">
                <Container>
                    <SectionHeading index="02" label="Where we've worked" title={['Field map.']}>
                        Select a project on the map or in the list.
                    </SectionHeading>
                    <div className="mt-12">
                        <ProjectMap />
                    </div>
                </Container>
            </Section>

            <Section tone="paper">
                <Container>
                    <SectionHeading index="03" label="Completed projects" title={`${projects.length} bridges.`} />
                    <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {projects.map((p, i) => (
                            <StoryCard key={p.slug} project={p} index={i} grid />
                        ))}
                    </div>
                </Container>
            </Section>

            <ContactBand title={['Have a structure', 'that needs answers?']} />
        </>
    );
}
