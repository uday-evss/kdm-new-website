import React from 'react';
import { Layers } from 'lucide-react';
import { findService } from '@/content/services';
import { Figure } from '@/components/engineering';
import { ButtonLink, CheckList, Container, MaskedImage, RevealLines, SectionLabel, Reveal } from '@/components/site/primitives';

// 07 — Geo-technical Investigations, the third of KDM's three approved
// departments. Mirrors MaterialsTestingFeature's layout with the image on
// the opposite side, for rhythm.
export default function GeotechFeature() {
    const service = findService('geotechnical-investigations');

    return (
        <section aria-labelledby="geotech-title" className="relative overflow-hidden bg-kdm-paper py-20 sm:py-28 lg:py-32">
            <Container>
                <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
                    <div className="order-2 lg:order-1 lg:col-span-7">
                        <div className="flex items-center gap-4">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-kdm-blue ring-1 ring-kdm-line">
                                <Layers className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <p className="t-label text-kdm-muted">Site investigation to foundation design</p>
                        </div>
                        <div className="relative mt-6">
                            <Figure caption={`Fig. 07 — ${service.shortTitle}`}>
                                <MaskedImage
                                    image={service.cover}
                                    alt="Pile load testing during a KDM geo-technical site investigation"
                                    sizes="(min-width: 1024px) 55vw, 100vw"
                                    className="aspect-[16/10] rounded-panel"
                                />
                            </Figure>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 lg:col-span-5">
                        <SectionLabel index="07">Geo-technical Investigations</SectionLabel>
                        <RevealLines lines={['Know the ground', 'before you build.']} className="t-h2 mt-5" />
                        <span id="geotech-title" className="sr-only">Geo-technical Investigations</span>
                        <Reveal delay={0.1} className="t-lead mt-6">
                            {service.summary}
                        </Reveal>
                        <Reveal delay={0.15} className="mt-8">
                            <CheckList items={service.capabilities} numbered className="max-w-md" />
                        </Reveal>
                        <Reveal delay={0.2} className="mt-8">
                            <ButtonLink to={`/services/${service.slug}`}>Explore geo-technical investigations</ButtonLink>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    );
}
