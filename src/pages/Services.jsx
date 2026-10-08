import React from 'react';
import { media } from '@/content/media';
import { company } from '@/content/site';
import { services } from '@/content/services';
import { Container, PageHero, Reveal, SectionHeading, CheckList, usePageMeta } from '@/components/site/primitives';
import { ImageCard, ContactBand } from '@/components/site/widgets';
import { serviceIcons } from '@/components/site/serviceIcons';

export default function Services() {
    usePageMeta('Our Services', `Civil engineering consultancy, testing services and training: ${services.map((s) => s.shortTitle).join(', ')}.`);
    const banner = media.banners.find((b) => b.src.includes('/ssr-bridges-1.webp'));

    return (
        <>
            <PageHero title="Our Services" eyebrow={company.tagline} image={banner} crumbs={[{ label: 'Our Services' }]}>
                Civil Engineering Consultancy, Testing Services and Training — all under one roof.
            </PageHero>

            <section className="bg-[#F5F7FA] py-16 sm:py-24">
                <Container>
                    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((s, i) => (
                            <Reveal as="li" key={s.slug} delay={(i % 3) * 0.06}>
                                <ImageCard to={`/services/${s.slug}`} image={s.cover} title={s.title} icon={serviceIcons[s.slug]} />
                            </Reveal>
                        ))}
                    </ul>
                </Container>
            </section>

            <section className="bg-white py-16 sm:py-24">
                <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                    <SectionHeading eyebrow="What sets us apart" title="Our Forte">
                        {company.intro[1]}
                    </SectionHeading>
                    <CheckList items={company.forte} columns={2} />
                </Container>
            </section>

            <ContactBand />
        </>
    );
}
