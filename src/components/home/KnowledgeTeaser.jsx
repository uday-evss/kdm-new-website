import React from 'react';
import { findService } from '@/content/services';
import { knowledgeTracks } from '@/content/home';
import { media } from '@/content/media';
import { CornerMarks } from '@/components/engineering';
import { ButtonLink, Container, MaskedImage, RevealLines, SectionLabel, Reveal, Stagger, StaggerItem } from '@/components/site/primitives';
import { BrochureLinks } from '@/components/site/widgets';

// 10 — Knowledge. The KDM Knowledge Share Center set like the contents page
// of an engineering journal: numbered tracks, with the company's own
// publications as resources.
export default function KnowledgeTeaser() {
    const ksc = findService('kdm-knowledge-share-center');
    return (
        <section aria-labelledby="knowledge-title" className="relative bg-kdm-paper py-20 sm:py-28 lg:py-32">
            <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                    <SectionLabel index="10">Knowledge Share Center</SectionLabel>
                    <RevealLines lines={['Knowledge,', 'shared.']} className="t-h2 mt-5" />
                    <span id="knowledge-title" className="sr-only">KDM Knowledge Share Center</span>
                    <Reveal delay={0.1} className="mt-6 leading-relaxed text-kdm-graphite">
                        {ksc.intro}
                    </Reveal>
                    <div className="relative mt-10">
                        <MaskedImage image={media.kdmksc[2]} alt="A training session at the KDM Knowledge Share Center" sizes="(min-width: 1024px) 36vw, 100vw" className="aspect-[4/3] rounded-panel" />
                        <CornerMarks />
                    </div>
                    <ButtonLink to={`/services/${ksc.slug}`} className="mt-10">
                        Explore the Knowledge Share Center
                    </ButtonLink>
                </div>

                <div className="lg:col-span-7">
                    <Stagger className="grid gap-x-10 sm:grid-cols-2">
                        {knowledgeTracks.map((track, i) => (
                            <StaggerItem key={track.title} className="border-t-2 border-kdm-ink pb-10 pt-5">
                                <p className="t-label flex items-center justify-between text-kdm-muted">
                                    <span>Track {String(i + 1).padStart(2, '0')}</span>
                                    <span className="t-num">{String(track.items.length).padStart(2, '0')} programmes</span>
                                </p>
                                <h3 className="t-h3 mt-4">{track.title}</h3>
                                <ul className="mt-5 space-y-0">
                                    {track.items.map((item) => (
                                        <li key={item} className="border-t border-kdm-line py-2.5 text-[15px] text-kdm-graphite">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </StaggerItem>
                        ))}
                    </Stagger>
                    <div className="mt-4 border-t-2 border-kdm-ink pt-5">
                        <p className="t-label text-kdm-muted">Resources</p>
                        <BrochureLinks className="mt-5" />
                    </div>
                </div>
            </Container>
        </section>
    );
}
