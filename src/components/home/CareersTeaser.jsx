import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { careerTracks } from '@/content/home';
import { media } from '@/content/media';
import { CornerMarks } from '@/components/engineering';
import { ButtonLink, Container, MaskedImage, RevealLines, SectionLabel, Reveal, Stagger, StaggerItem } from '@/components/site/primitives';
import { fetchOpenings, OPENINGS_QUERY_KEY } from '@/components/careers/careersCommon';

// 12 — Careers. People first: engineers on site, the fields they can grow
// into, and — live from the KDM ERP — how many roles are open right now.
export default function CareersTeaser() {
    const { data: openings } = useQuery({ queryKey: OPENINGS_QUERY_KEY, queryFn: fetchOpenings, staleTime: 60000 });
    const count = openings?.length ?? 0;

    return (
        <section aria-labelledby="careers-title" className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-32">
            <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
                <div className="relative order-2 lg:order-1 lg:col-span-6">
                    <MaskedImage
                        image={media.hero[0]}
                        alt="Two KDM engineers in hard hats and safety vests reviewing a site"
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="aspect-[4/3] rounded-panel lg:aspect-[5/6]"
                        imgClassName="object-[20%_50%]"
                    />
                    <CornerMarks />
                    <div className="absolute -bottom-6 right-4 rounded-card bg-white p-5 shadow-lift ring-1 ring-kdm-line sm:right-8">
                        {count > 0 ? (
                            <>
                                <p className="t-num t-stat text-kdm-blue">{String(count).padStart(2, '0')}</p>
                                <p className="mt-1 text-sm text-kdm-graphite">{count === 1 ? 'role' : 'roles'} open right now</p>
                            </>
                        ) : (
                            <>
                                <p className="t-label text-kdm-red-ink">Openings</p>
                                <p className="mt-1 max-w-[12rem] text-sm text-kdm-graphite">New roles are posted on our careers page first.</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="order-1 lg:order-2 lg:col-span-6">
                    <SectionLabel index="12">Careers</SectionLabel>
                    <RevealLines lines={['Build the infrastructure', 'of tomorrow.']} className="t-h2 mt-5" />
                    <span id="careers-title" className="sr-only">Careers at KDM</span>
                    <Reveal delay={0.1} className="t-lead mt-6 max-w-xl">
                        Work in the field, in the laboratory and at the desk — on bridges, highways and buildings — alongside
                        engineers who have been doing it since 2012.
                    </Reveal>
                    <Stagger as="ul" gap={0.04} className="mt-8 flex flex-wrap gap-2">
                        {careerTracks.map((t) => (
                            <StaggerItem as="li" key={t} className="rounded-tag bg-kdm-paper px-3.5 py-2 text-sm font-medium text-kdm-ink ring-1 ring-inset ring-kdm-line">
                                {t}
                            </StaggerItem>
                        ))}
                    </Stagger>
                    <ButtonLink to="/careers" className="mt-10">
                        View opportunities
                    </ButtonLink>
                </div>
            </Container>
        </section>
    );
}
