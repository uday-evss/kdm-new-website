import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { media } from '@/content/media';
import { clients } from '@/content/clients';
import { Container, PageHero, Reveal, usePageMeta } from '@/components/site/primitives';
import { ContactBand } from '@/components/site/widgets';

const SECTORS = ['All', 'Government', 'Private'];

export default function Clients() {
    usePageMeta('Our Clients', `Our clientele: ${clients.length} government departments, public sector undertakings and infrastructure companies including NHAI, MoRTH, RVNL, POWERGRID, L&T and Tata Projects.`);
    const [sector, setSector] = useState('All');
    const banner = media.banners.find((b) => b.src.includes('/our-clients.webp'));
    const visible = sector === 'All' ? clients : clients.filter((c) => c.sector === sector);

    return (
        <>
            <PageHero title="Our Clientele" eyebrow="Our Clients" image={banner} crumbs={[{ label: 'Our Clients' }]}>
                Government departments, public sector undertakings and leading private infrastructure companies we have worked with.
            </PageHero>

            <section className="bg-[#F5F7FA] py-16 sm:py-24">
                <Container>
                    <div role="tablist" aria-label="Filter clients" className="flex flex-wrap justify-center gap-2">
                        {SECTORS.map((s) => {
                            const count = s === 'All' ? clients.length : clients.filter((c) => c.sector === s).length;
                            return (
                                <button
                                    key={s}
                                    type="button"
                                    role="tab"
                                    aria-selected={sector === s}
                                    onClick={() => setSector(s)}
                                    className={cn(
                                        'rounded-full px-5 py-2.5 text-sm font-semibold transition-colors',
                                        sector === s ? 'bg-[#C4161C] text-white' : 'bg-white text-gray-600 ring-1 ring-[#E6EAF0] hover:text-[#C4161C]',
                                    )}
                                >
                                    {s} <span className={cn('ml-1 text-xs', sector === s ? 'text-white/70' : 'text-gray-400')}>{count}</span>
                                </button>
                            );
                        })}
                    </div>

                    <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                        {visible.map((c, i) => (
                            <Reveal as="li" key={c.name} delay={Math.min(i, 10) * 0.03}>
                                <figure className="group flex h-full flex-col items-center rounded-2xl bg-white p-5 ring-1 ring-[#E6EAF0] transition-shadow hover:shadow-lg">
                                    <div className="flex h-24 w-full items-center justify-center">
                                        <img src={c.logo} alt={c.name} loading="lazy" decoding="async" className="max-h-20 max-w-[85%] object-contain transition-transform group-hover:scale-105" />
                                    </div>
                                    <figcaption className="mt-4 text-center text-xs font-medium leading-snug text-gray-500">{c.name}</figcaption>
                                </figure>
                            </Reveal>
                        ))}
                    </ul>
                </Container>
            </section>

            <ContactBand />
        </>
    );
}
