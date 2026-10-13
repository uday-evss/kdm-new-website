import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { clients } from '@/content/clients';
import { Container, PageHero, Section, usePageMeta } from '@/components/site/primitives';
import { ContactBand } from '@/components/site/widgets';
import { CornerMarks } from '@/components/engineering';

const SECTORS = ['All', 'Government', 'Private'];

export default function Clients() {
    usePageMeta(
        'Our Clients',
        `Our clientele: ${clients.length} government departments, public sector undertakings and infrastructure companies including NHAI, MoRTH, RVNL, POWERGRID, L&T and Tata Projects.`,
    );
    const [sector, setSector] = useState('All');
    const visible = sector === 'All' ? clients : clients.filter((c) => c.sector === sector);
    const count = (s) => (s === 'All' ? clients.length : clients.filter((c) => c.sector === s).length);

    return (
        <>
            <PageHero
                index="01"
                eyebrow="Our clients"
                title={['Trusted across government', 'and industry.']}
                crumbs={[{ label: 'Our Clients' }]}
                aside={
                    <div className="relative">
                        <ul className="grid grid-cols-3 border-l border-t border-kdm-ink/15 bg-white" aria-label="Some of our clients">
                            {clients.filter((c) => c.featured).slice(0, 9).map((c) => (
                                <li key={c.name} className="flex aspect-[4/3] items-center justify-center border-b border-r border-kdm-ink/15 p-4">
                                    <img src={c.logoSm} srcSet={`${c.logoSm} 1x, ${c.logo} 2x`} alt={c.name} className="max-h-12 max-w-full object-contain" />
                                </li>
                            ))}
                        </ul>
                        <CornerMarks />
                    </div>
                }
            >
                Government departments, public sector undertakings and leading private infrastructure companies we have worked
                with.
            </PageHero>

            <Section tone="white">
                <Container>
                    <div role="tablist" aria-label="Filter clients" className="inline-flex rounded-card bg-kdm-paper p-1 ring-1 ring-kdm-line">
                        {SECTORS.map((s) => (
                            <button
                                key={s}
                                type="button"
                                role="tab"
                                aria-selected={sector === s}
                                onClick={() => setSector(s)}
                                className={cn('relative rounded-tag px-5 py-2.5 text-sm font-semibold transition-colors', sector === s ? 'text-white' : 'text-kdm-graphite hover:text-kdm-ink')}
                            >
                                {sector === s && (
                                    <motion.span layoutId="client-tab" className="absolute inset-0 rounded-tag bg-kdm-blue" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />
                                )}
                                <span className="relative">
                                    {s} <span className={cn('t-num ml-1 text-xs', sector === s ? 'text-white/70' : 'text-kdm-muted')}>{count(s)}</span>
                                </span>
                            </button>
                        ))}
                    </div>

                    <motion.ul layout className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        <AnimatePresence initial={false}>
                            {visible.map((c) => (
                                <motion.li
                                    layout
                                    key={c.name}
                                    initial={{ opacity: 0, scale: 0.94 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.94 }}
                                    transition={{ duration: 0.35, ease: EASE }}
                                >
                                    <figure className="group flex h-full flex-col items-center rounded-card bg-white p-5 ring-1 ring-kdm-line transition-shadow duration-300 hover:shadow-soft">
                                        <div className="flex h-24 w-full items-center justify-center">
                                            <img src={c.logoSm} srcSet={`${c.logoSm} 1x, ${c.logo} 2x`} alt="" loading="lazy" decoding="async" className="max-h-20 max-w-[85%] object-contain transition-transform duration-500 group-hover:scale-105" />
                                        </div>
                                        <figcaption className="mt-4 text-center text-xs font-medium leading-snug text-kdm-graphite">{c.name}</figcaption>
                                        <span className={cn('t-label mt-2 text-[10px]', c.sector === 'Government' ? 'text-kdm-blue' : 'text-kdm-cyan-ink')}>{c.sector}</span>
                                    </figure>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </motion.ul>
                </Container>
            </Section>

            <ContactBand />
        </>
    );
}
