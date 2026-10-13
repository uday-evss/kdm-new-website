import React from 'react';
import { company } from '@/content/site';
import { clients } from '@/content/clients';
import { media } from '@/content/media';
import { DimensionLine, Figure } from '@/components/engineering';
import { Container, MaskedImage, RevealLines, SectionLabel, Stagger, StaggerItem, Reveal, TextLink } from '@/components/site/primitives';
import { StatCounter } from '@/components/site/widgets';

// 02 — Introduction. Who KDM is, in the company's own words, beside field
// photography; what the three letters stand for (from the logo); the
// company's published figures set on a measured rule; and recognisable
// clients.

const PROOF_CLIENTS = ['NHAI', 'MoRTH', 'South Central Railway', 'RVNL', 'DRDO', 'BARC', 'CPWD', 'POWERGRID'];
const SHORT_NAMES = {
    'National Highways Authority of India': 'NHAI',
    'Ministry of Road Transport & Highways': 'MoRTH',
    'Rail Vikas Nigam Limited': 'RVNL',
    'Bhabha Atomic Research Centre': 'BARC',
    'Central Public Works Department': 'CPWD',
};

const LETTER_COLOUR = ['text-kdm-red', 'text-kdm-cyan-ink', 'text-kdm-blue'];

export default function ProofStrip() {
    const years = new Date().getFullYear() - company.foundedYear;
    const stats = [...company.stats, { value: years, suffix: '+', label: `Years since ${company.foundedYear}` }];
    const logos = clients.filter((c) => PROOF_CLIENTS.includes(SHORT_NAMES[c.name] ?? c.name));

    return (
        <section id="intro" aria-labelledby="intro-title" className="relative scroll-mt-16 border-t border-kdm-line bg-white py-20 sm:py-28 lg:py-32">
            <Container>
                <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <SectionLabel index="02">Introduction</SectionLabel>
                        <RevealLines lines={['One partner for the', 'whole life of a structure.']} className="t-h2 mt-6" />
                        <span id="intro-title" className="sr-only">About KDM Engineers Group</span>
                        <Reveal delay={0.1} className="mt-8 space-y-5 text-[17px] leading-relaxed text-kdm-graphite">
                            {company.intro.map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                        </Reveal>
                        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Our values">
                            {company.values.map((v, i) => (
                                <li key={v} className="flex items-center gap-2 rounded-tag border border-kdm-line px-3 py-1.5 text-sm font-medium text-kdm-ink">
                                    <span aria-hidden="true" className={`h-1.5 w-1.5 ${['bg-kdm-red', 'bg-kdm-cyan', 'bg-kdm-blue'][i]}`} />
                                    {v}
                                </li>
                            ))}
                        </ul>
                        <TextLink to="/about" className="mt-8">
                            About the company
                        </TextLink>
                    </div>

                    <div className="lg:col-span-7">
                        <Figure caption="Fig. 02 — Geotechnical investigation on site">
                            <MaskedImage
                                image={media.hero[1]}
                                alt="KDM engineers drilling a bore hole during a geotechnical investigation"
                                sizes="(min-width: 1024px) 55vw, 100vw"
                                className="aspect-[16/10] rounded-card"
                            />
                        </Figure>
                        <div className="mt-10">
                            <p className="t-label text-kdm-muted">The name, from the logo</p>
                            <Stagger as="ol" className="mt-4 grid grid-cols-3 border-t border-kdm-ink/20">
                                {company.logoWords.map((w, i) => (
                                    <StaggerItem as="li" key={w} className="border-r border-kdm-line pr-3 pt-4 last:border-r-0 sm:pr-6 [&:not(:first-child)]:pl-3 sm:[&:not(:first-child)]:pl-6">
                                        <span className={`block font-display text-5xl font-semibold leading-none sm:text-6xl ${LETTER_COLOUR[i]}`}>{w[0]}</span>
                                        <span className="mt-2 block text-sm font-medium text-kdm-ink sm:text-base">{w}</span>
                                    </StaggerItem>
                                ))}
                            </Stagger>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <DimensionLine label="Published figures" className="[--dim-bg:#fff]" />
                    <Stagger as="dl" className="mt-8 grid grid-cols-2 gap-y-10 sm:grid-cols-4">
                        {stats.map((s) => (
                            <StaggerItem key={s.label} className="flex flex-col-reverse border-l border-kdm-line pl-5">
                                <dt className="t-label mt-3 text-kdm-muted">{s.label}</dt>
                                <dd className="t-stat">
                                    <StatCounter value={s.value} suffix={s.suffix} />
                                </dd>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>

                <div className="mt-16 flex flex-col gap-6 border-t border-kdm-line pt-8 lg:flex-row lg:items-center lg:gap-12">
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
                                    className="max-h-12 max-w-full object-contain"
                                />
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </Container>
        </section>
    );
}
