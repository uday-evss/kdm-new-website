import React from 'react';
import { Eye, Target, Gem, HeartHandshake, Quote, Users, ArrowRight } from 'lucide-react';
import { media } from '@/content/media';
import { company } from '@/content/site';
import { Container, PageHero, SectionHeading, Reveal, ButtonLink, usePageMeta } from '@/components/site/primitives';
import { ClientMarquee, ContactBand } from '@/components/site/widgets';

const PILLAR_ICONS = { Vision: Eye, Mission: Target, Strength: Gem };

const initials = (name) =>
    name
        .replace(/^(Er|Mr|Mrs|Ms|Dr)\.\s*/i, '')
        .split(/[\s.]+/)
        .filter(Boolean)
        .slice(-2)
        .map((w) => w[0])
        .join('');

const CURRENT_YEAR = new Date().getFullYear();

export default function About() {
    usePageMeta('About Us', company.foreword[0]);
    const banner = media.banners.find((b) => b.src.includes('/about-us.webp'));
    const md = company.directors[0];

    return (
        <>
            <PageHero title="About Us" eyebrow={company.tagline} image={banner} crumbs={[{ label: 'About Us' }]} />

            {/* Foreword + milestones */}
            <section id="company" className="scroll-mt-28 bg-white py-20 sm:py-28">
                <Container className="grid gap-16 lg:grid-cols-2 lg:gap-20">
                    <Reveal>
                        <SectionHeading eyebrow="About the Company" title="Foreword" />
                        <div className="mt-8 space-y-5 text-lg leading-relaxed text-gray-600">
                            {company.foreword.map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                        </div>
                        <div className="mt-10 rounded-2xl bg-[#F5F7FA] p-6 ring-1 ring-[#E6EAF0]">
                            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#C4161C]">
                                <HeartHandshake className="h-4 w-4" aria-hidden="true" /> Our Values
                            </p>
                            <ul className="mt-4 flex flex-wrap gap-3">
                                {company.values.map((v) => (
                                    <li key={v} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#111111] ring-1 ring-[#E6EAF0]">
                                        {v}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4161C]">KDM Milestones</h3>
                        <ol className="relative mt-8 border-l-2 border-[#E6EAF0] pl-8">
                            {company.milestones.map((m) => (
                                <li key={m.year} className="relative pb-10 last:pb-0">
                                    <span
                                        aria-hidden="true"
                                        className={`absolute -left-[41px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-white ${m.done ? 'bg-[#C4161C]' : 'border-2 border-[#C4161C] bg-white'}`}
                                    />
                                    <p className="text-2xl font-bold text-[#111111]">{m.year}</p>
                                    <p className="mt-1 text-gray-600">{m.text}</p>
                                    {!m.done && Number(m.year) >= CURRENT_YEAR && (
                                        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#0E3A5D]">Target</p>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </Reveal>
                </Container>
            </section>

            {/* Vision / Mission / Strength */}
            <section className="bg-[#F5F7FA] py-20 sm:py-28">
                <Container>
                    <SectionHeading eyebrow="We believe in our" title="Vision, Mission & Strength" align="center" />
                    <ul className="mt-14 grid gap-6 md:grid-cols-3">
                        {company.pillars.map((p, i) => {
                            const Icon = PILLAR_ICONS[p.title];
                            return (
                                <Reveal as="li" key={p.title} delay={i * 0.08} className="rounded-3xl bg-white p-8 ring-1 ring-[#E6EAF0] shadow-sm">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C4161C] text-white">
                                        <Icon className="h-6 w-6" aria-hidden="true" />
                                    </span>
                                    <h3 className="mt-6 text-xl font-bold text-[#111111]">{p.title}</h3>
                                    <p className="mt-3 leading-relaxed text-gray-600">{p.text}</p>
                                </Reveal>
                            );
                        })}
                    </ul>
                </Container>
            </section>

            {/* Wings of KDM */}
            <section id="wings" className="scroll-mt-28 bg-white py-20 sm:py-28">
                <Container>
                    <SectionHeading eyebrow="Our structure" title="Wings of KDM Group" align="center">
                        Two companies under one group, providing optimum engineering solutions in all aspects.
                    </SectionHeading>
                    <Reveal className="mx-auto mt-14 max-w-4xl">
                        <div className="flex flex-col items-center">
                            <div className="rounded-2xl bg-[#111111] px-8 py-5 text-center shadow-xl">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F2B705]">The Group</p>
                                <p className="mt-1 text-xl font-bold text-white">{company.name}</p>
                            </div>
                            <span aria-hidden="true" className="h-10 w-0.5 bg-[#E6EAF0]" />
                            <span aria-hidden="true" className="hidden sm:block h-0.5 w-1/2 bg-[#E6EAF0]" />
                            <div className="grid w-full gap-6 sm:grid-cols-2">
                                {company.wings.map((w) => (
                                    <div key={w.abbr} className="relative flex flex-col items-center">
                                        <span aria-hidden="true" className="hidden sm:block h-8 w-0.5 bg-[#E6EAF0]" />
                                        <div className="w-full rounded-2xl border-t-4 border-[#C4161C] bg-[#F5F7FA] p-6 text-center ring-1 ring-[#E6EAF0]">
                                            <p className="text-lg font-bold text-[#111111]">{w.name}</p>
                                            <p className="mt-1 text-sm font-semibold text-[#C4161C]">{w.abbr}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </Container>
            </section>

            {/* MD's message */}
            <section id="md-message" className="scroll-mt-28 bg-[#111111] py-20 sm:py-28">
                <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <Reveal className="lg:col-span-4">
                        <SectionHeading eyebrow="Leadership" title="Message from MD's Desk" tone="dark" />
                        <div className="mt-10 flex items-center gap-4">
                            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C4161C] text-xl font-bold text-white" aria-hidden="true">
                                {initials(md.name)}
                            </span>
                            <span>
                                <span className="block text-lg font-semibold text-white">{md.name}</span>
                                <span className="text-sm text-gray-400">{md.role}</span>
                            </span>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1} className="lg:col-span-8">
                        <figure className="relative rounded-3xl bg-white/5 p-8 sm:p-12 ring-1 ring-white/10">
                            <Quote className="absolute -top-5 left-8 h-10 w-10 rounded-full bg-[#C4161C] p-2 text-white" aria-hidden="true" />
                            <blockquote className="space-y-5 text-lg leading-relaxed text-gray-300">
                                {company.mdMessage.map((p) => (
                                    <p key={p}>{p}</p>
                                ))}
                            </blockquote>
                            <figcaption className="mt-8 text-sm font-semibold text-[#F2B705]">
                                — {md.name}, {md.role}
                            </figcaption>
                        </figure>
                    </Reveal>
                </Container>
            </section>

            {/* Core team */}
            <section id="team" className="scroll-mt-28 bg-white py-20 sm:py-28">
                <Container>
                    <SectionHeading eyebrow="Board of Directors" title="Meet our Core Team" align="center" />
                    <ul className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
                        {company.directors.map((d, i) => (
                            <Reveal as="li" key={d.name} delay={i * 0.08} className="rounded-3xl bg-[#F5F7FA] p-8 text-center ring-1 ring-[#E6EAF0]">
                                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-bold text-[#C4161C] ring-4 ring-[#C4161C]/15" aria-hidden="true">
                                    {initials(d.name)}
                                </span>
                                <h3 className="mt-6 text-lg font-bold text-[#111111]">{d.name}</h3>
                                <p className="mt-1 text-sm font-medium text-[#C4161C]">{d.role}</p>
                            </Reveal>
                        ))}
                    </ul>
                </Container>
            </section>

            {/* Clients */}
            <section className="bg-[#F5F7FA] py-20">
                <Container>
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <SectionHeading eyebrow="Trusted by" title="Our Clients" />
                        <ButtonLink to="/clients" variant="outline">
                            <Users className="h-4 w-4" aria-hidden="true" /> Full Clientele <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </ButtonLink>
                    </div>
                    <div className="mt-12">
                        <ClientMarquee />
                    </div>
                </Container>
            </section>

            <ContactBand />
        </>
    );
}
