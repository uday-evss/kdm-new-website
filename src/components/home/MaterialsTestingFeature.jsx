import React from 'react';
import { FlaskConical } from 'lucide-react';
import { findService } from '@/content/services';
import { Figure } from '@/components/engineering';
import { ButtonLink, CheckList, Container, MaskedImage, RevealLines, SectionLabel, Reveal } from '@/components/site/primitives';

// 06 — Materials Testing, one of KDM's three approved departments. A
// dedicated section (not just a shared index entry) so the discipline gets
// its own story, image and capability list — per the company's real,
// NABL-accredited laboratory service list.
export default function MaterialsTestingFeature() {
    const service = findService('materials-testing');

    return (
        <section aria-labelledby="materials-title" className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-32">
            <Container>
                <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <SectionLabel index="06">Materials Testing</SectionLabel>
                        <RevealLines lines={['Precision in', 'every sample.']} className="t-h2 mt-5" />
                        <span id="materials-title" className="sr-only">Materials Testing</span>
                        <Reveal delay={0.1} className="t-lead mt-6">
                            {service.summary}
                        </Reveal>
                        <Reveal delay={0.15} className="mt-8">
                            <CheckList items={service.capabilities.slice(0, 8)} numbered className="max-w-md" />
                        </Reveal>
                        <Reveal delay={0.2} className="mt-8">
                            <ButtonLink to={`/services/${service.slug}`}>Explore materials testing</ButtonLink>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-4">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-kdm-surface text-kdm-blue">
                                <FlaskConical className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <p className="t-label text-kdm-muted">NABL-accredited laboratory · ISO/IEC 17025:2017</p>
                        </div>
                        <div className="relative mt-6">
                            <Figure caption={`Fig. 06 — ${service.shortTitle}`}>
                                <MaskedImage
                                    image={service.cover}
                                    alt="KDM engineers at work in the materials testing laboratory"
                                    sizes="(min-width: 1024px) 55vw, 100vw"
                                    className="aspect-[16/10] rounded-panel"
                                />
                            </Figure>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
