import React from 'react';
import { company } from '@/content/site';
import { clients } from '@/content/clients';
import { MeasureRule } from '@/components/engineering';
import { Container, RevealLines, SectionLabel, Stagger, StaggerItem, Reveal } from '@/components/site/primitives';
import { StatCounter } from '@/components/site/widgets';

// 02 — Proof. The company's own numbers (from the live site) plus the age of
// the firm, set on a measuring rule, and a line of recognisable clients.

const PROOF_CLIENTS = ['NHAI', 'MoRTH', 'South Central Railway', 'RVNL', 'DRDO', 'BARC', 'CPWD', 'POWERGRID'];
const SHORT_NAMES = {
    'National Highways Authority of India': 'NHAI',
    'Ministry of Road Transport & Highways': 'MoRTH',
    'Rail Vikas Nigam Limited': 'RVNL',
    'Bhabha Atomic Research Centre': 'BARC',
    'Central Public Works Department': 'CPWD',
};

export default function ProofStrip() {
    const years = new Date().getFullYear() - company.foundedYear;
    const stats = [...company.stats, { value: years, suffix: '+', label: `Years since ${company.foundedYear}` }];
    const logos = clients.filter((c) => PROOF_CLIENTS.includes(SHORT_NAMES[c.name] ?? c.name));

    return (
        <section id="proof" aria-labelledby="proof-title" className="relative scroll-mt-20 bg-white py-20 sm:py-28">
            <Container>
                <div className="grid items-end gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <SectionLabel index="02">Proof</SectionLabel>
                        <RevealLines lines={['Trusted where', 'it matters.']} className="t-h2 mt-5" />
                        <span id="proof-title" className="sr-only">KDM in numbers</span>
                        <Reveal delay={0.15} className="t-lead mt-6 max-w-md">
                            Government departments, public sector undertakings and leading infrastructure companies have relied
                            on KDM since {company.foundedYear}.
                        </Reveal>
                    </div>

                    <Stagger as="dl" className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 lg:col-span-7">
                        {stats.map((s) => (
                            <StaggerItem key={s.label} className="flex flex-col-reverse border-l border-kdm-line pl-5">
                                <dt className="t-label mt-3 text-kdm-muted">{s.label}</dt>
                                <dd className="t-stat lg:leading-none">
                                    <StatCounter value={s.value} suffix={s.suffix} />
                                </dd>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>

                <MeasureRule className="mt-16" at="38%" />

                <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
                    <p className="t-label shrink-0 text-kdm-muted">Selected clients</p>
                    <Stagger as="ul" gap={0.05} className="grid grid-cols-4 items-center gap-x-6 gap-y-6 sm:grid-cols-8 lg:flex-1">
                        {logos.map((c) => (
                            <StaggerItem as="li" key={c.name} className="flex h-12 items-center justify-center">
                                <img
                                    src={c.logoSm}
                                    srcSet={`${c.logoSm} 1x, ${c.logo} 2x`}
                                    alt={c.name}
                                    title={c.name}
                                    loading="lazy"
                                    decoding="async"
                                    className="max-h-12 max-w-full object-contain transition-transform duration-500 hover:scale-110"
                                />
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </Container>
        </section>
    );
}
