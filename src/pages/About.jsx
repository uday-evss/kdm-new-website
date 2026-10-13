import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { media } from '@/content/media';
import { company } from '@/content/site';
import { LogoMark } from '@/components/brand/Logo';
import { CornerMarks, Figure, MeasureRule } from '@/components/engineering';
import {
    Container,
    Img,
    MaskedImage,
    PageHero,
    Reveal,
    RevealLines,
    Section,
    SectionHeading,
    SectionLabel,
    Stagger,
    StaggerItem,
    TextLink,
    usePageMeta,
} from '@/components/site/primitives';
import { ClientMarquee, ContactBand } from '@/components/site/widgets';

const initials = (name) =>
    name
        .replace(/^(Er|Mr|Mrs|Ms|Dr)\.\s*/i, '')
        .split(/[\s.]+/)
        .filter(Boolean)
        .slice(-2)
        .map((w) => w[0])
        .join('');

const PILLAR_STYLE = ['bg-kdm-blue', 'bg-kdm-cyan', 'bg-kdm-red'];
const CURRENT_YEAR = new Date().getFullYear();

// The three words around the gear in the KDM logo — the name's meaning.
function KdmMeaning() {
    return (
        <div className="relative rounded-panel bg-white p-8 shadow-soft ring-1 ring-kdm-line">
            <CornerMarks />
            <div className="flex items-center gap-5">
                <LogoMark className="h-20" sizes="120px" />
                <p className="t-label text-kdm-muted">What the letters stand for</p>
            </div>
            <ul className="mt-8 space-y-3">
                {company.logoWords.map((w, i) => (
                    <motion.li
                        key={w}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.4 + i * 0.12 }}
                        className="flex items-baseline gap-4 border-t border-kdm-line pt-3"
                    >
                        <span className="w-10 font-display text-4xl font-semibold text-kdm-red">{w[0]}</span>
                        <span className="font-display text-3xl font-semibold tracking-tight text-kdm-ink">{w}</span>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
}

function Milestones() {
    return (
        <div className="relative mt-16">
            <div aria-hidden="true" className="absolute left-0 right-0 top-[11px] hidden h-px bg-kdm-line md:block">
                <motion.div
                    className="h-full origin-left bg-gradient-to-r from-kdm-blue via-kdm-cyan to-kdm-red"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: EASE }}
                />
            </div>
            <Stagger as="ol" gap={0.12} className="relative grid gap-8 md:grid-cols-4 md:gap-6">
                {company.milestones.map((m) => {
                    const target = !m.done && Number(m.year) >= CURRENT_YEAR;
                    return (
                        <StaggerItem as="li" key={m.year} className="flex gap-5 md:block">
                            <span
                                aria-hidden="true"
                                className={cn(
                                    'mt-1 block h-[22px] w-[22px] shrink-0 rounded-full ring-4 ring-kdm-paper md:mt-0',
                                    m.done ? 'bg-kdm-blue' : 'border-2 border-dashed border-kdm-red bg-white',
                                )}
                            />
                            <div className="md:mt-6">
                                <p className="t-num font-display text-4xl font-semibold text-kdm-ink">{m.year}</p>
                                <p className="mt-2 leading-relaxed text-kdm-graphite">{m.text}</p>
                                {(target || !m.done) && <p className="t-label mt-2 text-kdm-red-ink">{target ? 'Target' : 'Goal'}</p>}
                            </div>
                        </StaggerItem>
                    );
                })}
            </Stagger>
        </div>
    );
}

export default function About() {
    usePageMeta('About Us', company.foreword[0]);
    const md = company.directors[0];
    const accreditation = company.accreditations[0];
    const [lead, ...rest] = company.mdMessage;
    const pull = company.mdMessage[1];

    return (
        <>
            <PageHero
                index="01"
                eyebrow="About KDM"
                title={['Engineering credibility,', `built since ${company.foundedYear}.`]}
                crumbs={[{ label: 'About Us' }]}
                aside={<KdmMeaning />}
            >
                {company.foreword[0]}
            </PageHero>

            {/* Story */}
            <Section id="company" tone="white">
                <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-6">
                        <SectionHeading index="02" label="Our story" title={['Structural health,', 'materials, ground —', 'understood.']} />
                        <div className="mt-8 space-y-5 text-lg leading-relaxed text-kdm-graphite">
                            {company.intro.map((p) => (
                                <Reveal key={p}>
                                    <p>{p}</p>
                                </Reveal>
                            ))}
                            <Reveal>
                                <p className="text-base text-kdm-muted">
                                    KDM Engineers (India) Pvt. Ltd. was established in {company.foundedYear} as a standalone
                                    engineering company within the wider KDM group of companies.
                                </p>
                            </Reveal>
                        </div>
                        <div className="mt-10">
                            <p className="t-label text-kdm-muted">Our values</p>
                            <ul className="mt-4 flex flex-wrap gap-2">
                                {company.values.map((v, i) => (
                                    <li key={v} className="flex items-center gap-2 rounded-tag bg-kdm-paper px-4 py-2 font-semibold text-kdm-ink ring-1 ring-kdm-line">
                                        <span aria-hidden="true" className={cn('h-2 w-2 rounded-full', ['bg-kdm-blue', 'bg-kdm-yellow', 'bg-kdm-red'][i])} />
                                        {v}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="lg:col-span-6">
                        <Figure caption={`Fig. 01 — ${company.name}`}>
                            <MaskedImage image={media.banners[0]} alt="Inside the KDM Engineers office" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] rounded-panel" />
                        </Figure>
                    </div>
                </Container>
            </Section>

            {/* Vision / Mission / Strength */}
            <Section tone="paper">
                <Container className="relative">
                    <SectionHeading index="03" label="We believe in our" title={['Vision, mission', '& strength.']} />
                    <Stagger className="mt-14 grid border-t border-kdm-ink/20 md:grid-cols-3">
                        {company.pillars.map((p, i) => (
                            <StaggerItem
                                key={p.title}
                                className="border-b border-kdm-line py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                            >
                                <span aria-hidden="true" className={cn('mb-6 block h-[3px] w-12', PILLAR_STYLE[i])} />
                                <p className="t-num t-label text-kdm-muted">{String(i + 1).padStart(2, '0')}</p>
                                <h3 className="t-h3 mt-4">{p.title}</h3>
                                <p className="mt-4 leading-relaxed text-kdm-graphite">{p.text}</p>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </Container>
            </Section>

            {/* MD's message */}
            <Section id="md-message" tone="surface" className="overflow-hidden">
                <Container className="relative grid gap-14 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-4">
                        <SectionLabel index="04">Message from the MD&apos;s desk</SectionLabel>
                        <div className="relative mt-8 max-w-[240px] sm:max-w-sm">
                            {company.mdPortrait ? (
                                <Img image={company.mdPortrait} alt={`${md.name}, ${md.role}`} sizes="(min-width: 640px) 384px, 240px" className="aspect-[4/5] w-full rounded-panel object-cover object-[40%_30%]" />
                            ) : (
                                <div className="flex aspect-[4/5] w-full items-center justify-center rounded-panel bg-white ring-1 ring-kdm-line">
                                    <span className="font-display text-8xl font-semibold tracking-tight text-kdm-blue/90">{initials(md.name)}</span>
                                </div>
                            )}
                            <CornerMarks />
                        </div>
                        <p className="mt-6 font-display text-xl font-semibold text-kdm-ink">{md.name}</p>
                        <p className="text-kdm-muted">{md.role}</p>
                    </div>
                    <div className="lg:col-span-8">
                        <RevealLines as="blockquote" lines={[`“${pull}”`]} className="t-h2 !leading-[1.12] lg:mt-10" />
                        <MeasureRule className="my-12" at="20%" />
                        <div className="grid gap-6 text-lg leading-relaxed text-kdm-graphite md:grid-cols-2">
                            <Reveal>
                                <p>{lead}</p>
                            </Reveal>
                            <Reveal delay={0.1}>
                                {rest
                                    .filter((p) => p !== pull)
                                    .map((p) => (
                                        <p key={p}>{p}</p>
                                    ))}
                                <p className="mt-6 font-display font-semibold text-kdm-ink">— {md.name}, {md.role}</p>
                            </Reveal>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Leadership */}
            <Section id="team" tone="white">
                <Container>
                    <SectionHeading index="05" label="Board of directors" title="Leadership." />
                    <Stagger className="mt-14 grid border-t border-kdm-ink/20 sm:grid-cols-3">
                        {company.directors.map((d, i) => (
                            <StaggerItem key={d.name} className="group relative border-b border-kdm-line py-8 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0">
                                <span className="t-num t-label text-kdm-muted">{String(i + 1).padStart(2, '0')}</span>
                                {i === 0 && company.mdPortrait ? (
                                    <Img image={company.mdPortrait} alt="" sizes="80px" className="mt-6 h-20 w-20 rounded-full object-cover object-[40%_25%] ring-1 ring-kdm-line" />
                                ) : (
                                    <span
                                        aria-hidden="true"
                                        className="mt-6 flex h-20 w-20 items-center justify-center rounded-full border border-kdm-ink/20 font-display text-2xl font-semibold text-kdm-blue"
                                    >
                                        {initials(d.name)}
                                    </span>
                                )}
                                <h3 className="t-h3 mt-6">{d.name}</h3>
                                <p className="mt-1 font-medium text-kdm-red-ink">{d.role}</p>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </Container>
            </Section>

            {/* Milestones */}
            <Section id="milestones" tone="paper">
                <Container>
                    <SectionHeading index="06" label="KDM milestones" title={['Building toward', 'a national name.']} />
                    <Milestones />
                </Container>
            </Section>

            {/* Accreditation */}
            <Section tone="white">
                <Container className="grid items-center gap-14 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <SectionLabel index="07">Accreditation</SectionLabel>
                        <h2 className="t-h2 mt-5">{accreditation.title}</h2>
                        <p className="t-lead mt-6">{accreditation.text}</p>
                        <p className="mt-6 inline-flex items-center gap-2 rounded-tag bg-kdm-surface px-4 py-2 text-sm font-semibold text-kdm-blue">
                            <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Certificate No. {accreditation.certificateNo}
                        </p>
                    </div>
                    <div className="lg:col-span-5">
                        <a
                            href={accreditation.image.src}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View the NABL accreditation certificate"
                            className="group relative mx-auto block max-w-xs"
                        >
                            <Img image={accreditation.image} alt="NABL accreditation certificate" sizes="320px" className="w-full rounded-card shadow-lift ring-1 ring-kdm-line transition-transform duration-500 group-hover:-translate-y-1" />
                        </a>
                    </div>
                </Container>
            </Section>

            {/* Clients */}
            <Section tone="paper" className="overflow-hidden">
                <Container className="flex flex-wrap items-end justify-between gap-6">
                    <SectionHeading index="08" label="Trusted by" title="Our clients." />
                    <TextLink to="/clients">Full clientele</TextLink>
                </Container>
                <div className="mt-12">
                    <ClientMarquee />
                </div>
            </Section>

            <ContactBand />
        </>
    );
}
