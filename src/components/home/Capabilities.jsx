import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { capabilityPanels } from '@/content/home';
import { findService, serviceSummary } from '@/content/services';
import { serviceIcons } from '@/components/site/serviceIcons';
import { ButtonLink, Container, Img, RevealLines, SectionLabel, TextLink, Reveal } from '@/components/site/primitives';

// 04 — Capabilities. Six large editorial panels; the one under the cursor
// (or keyboard focus) opens out, its photograph settles, a measured overlay
// draws in and the call to action appears. On phones it becomes an accordion.

const panels = capabilityPanels.map((p) => ({ ...p, service: findService(p.service) }));

// The drawing overlay on an open panel: a crosshair and a dimensioned edge.
function PanelOverlay() {
    return (
        <motion.svg
            aria-hidden="true"
            viewBox="0 0 200 120"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } } }}
        >
            {[
                'M150 22 L190 22 M170 4 L170 40',
                'M8 112 L192 112 M8 108 L8 116 M192 108 L192 116',
                'M8 8 L22 8 M8 8 L8 22',
            ].map((d) => (
                <motion.path
                    key={d}
                    d={d}
                    stroke="white"
                    strokeOpacity="0.7"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    fill="none"
                    variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.9, ease: EASE } } }}
                />
            ))}
            <motion.circle
                cx="170"
                cy="22"
                r="7"
                stroke="rgb(var(--kdm-yellow))"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
                fill="none"
                variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.9, ease: EASE } } }}
            />
        </motion.svg>
    );
}

function DesktopPanels() {
    const [active, setActive] = useState(panels.length - 1);
    return (
        <div className="mt-16 hidden h-[620px] gap-3 lg:flex">
            {panels.map((p, i) => {
                const on = i === active;
                const Icon = serviceIcons[p.service.slug];
                return (
                    <article
                        key={p.service.slug}
                        onMouseEnter={() => setActive(i)}
                        style={{ flexGrow: on ? 5.2 : 1 }}
                        className="group relative min-w-0 basis-0 overflow-hidden rounded-panel bg-kdm-navy transition-[flex-grow] duration-700 ease-kdm"
                    >
                        <Img
                            image={p.service.cover}
                            alt=""
                            sizes="(min-width: 1024px) 60vw, 100vw"
                            className={cn(
                                'absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-1000 ease-kdm',
                                on ? 'scale-100 opacity-100' : 'scale-110 opacity-60',
                            )}
                        />
                        <div
                            aria-hidden="true"
                            className={cn(
                                'absolute inset-0 bg-gradient-to-t from-kdm-navy via-kdm-navy/60 to-kdm-navy/10 transition-opacity duration-700',
                                on ? 'opacity-95' : 'opacity-80',
                            )}
                        />
                        {on && <PanelOverlay />}

                        {/* Header: number + (closed) vertical title */}
                        <button
                            type="button"
                            onFocus={() => setActive(i)}
                            onClick={() => setActive(i)}
                            aria-expanded={on}
                            aria-controls={`cap-${i}`}
                            className="absolute inset-0 z-10 flex flex-col items-start p-6 text-left focus-visible:outline-offset-[-4px]"
                        >
                            <span className="t-num t-label text-kdm-yellow">{String(i + 1).padStart(2, '0')}</span>
                            <span
                                className={cn(
                                    'mt-auto font-display text-xl font-semibold text-white transition-opacity duration-300 [writing-mode:vertical-rl] rotate-180',
                                    on ? 'opacity-0' : 'opacity-100',
                                )}
                            >
                                {p.title}
                            </span>
                        </button>

                        {/* Open content */}
                        <AnimatePresence>
                            {on && (
                                <motion.div
                                    id={`cap-${i}`}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.25 } }}
                                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                    className="absolute inset-x-0 bottom-0 z-20 w-[min(100%,560px)] p-8"
                                >
                                    <Icon className="h-7 w-7 text-kdm-yellow" aria-hidden="true" />
                                    <h3 className="mt-4 font-display text-[34px] font-semibold leading-[1.05] tracking-tight text-white">{p.title}</h3>
                                    <p className="mt-4 text-[15px] leading-relaxed text-white/80">{serviceSummary(p.service)}</p>
                                    {p.service.capabilities && (
                                        <ul className="mt-5 flex flex-wrap gap-2">
                                            {p.service.capabilities.slice(0, 3).map((c) => (
                                                <li key={c} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/90 ring-1 ring-inset ring-white/20 backdrop-blur">
                                                    {c.length > 42 ? `${c.slice(0, 40).trim()}…` : c}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <ButtonLink to={`/services/${p.service.slug}`} variant="light" size="sm" className="mt-7">
                                        Explore {p.title}
                                    </ButtonLink>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </article>
                );
            })}
        </div>
    );
}

function MobileAccordion() {
    const [open, setOpen] = useState(panels.length - 1);
    return (
        <ul className="mt-12 border-b border-kdm-line lg:hidden">
            {panels.map((p, i) => {
                const on = open === i;
                return (
                    <li key={p.service.slug} className="border-t border-kdm-line">
                        <button
                            type="button"
                            onClick={() => setOpen(on ? null : i)}
                            aria-expanded={on}
                            className="flex w-full items-center gap-4 py-5 text-left"
                        >
                            <span className="t-num w-7 text-xs text-kdm-red-ink">{String(i + 1).padStart(2, '0')}</span>
                            <span className="font-display text-xl font-semibold text-kdm-ink">{p.title}</span>
                            <ChevronDown className={cn('ml-auto h-5 w-5 shrink-0 text-kdm-muted transition-transform duration-300', on && 'rotate-180')} aria-hidden="true" />
                        </button>
                        <AnimatePresence initial={false}>
                            {on && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.45, ease: EASE }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-7">
                                        <div className="aspect-[16/10] overflow-hidden rounded-card bg-kdm-mist">
                                            <Img image={p.service.cover} alt="" sizes="100vw" className="h-full w-full object-cover" />
                                        </div>
                                        <p className="mt-5 leading-relaxed text-kdm-graphite">{serviceSummary(p.service)}</p>
                                        <TextLink to={`/services/${p.service.slug}`} className="mt-4">
                                            Explore {p.title}
                                        </TextLink>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                );
            })}
        </ul>
    );
}

export default function Capabilities() {
    return (
        <section id="capabilities" aria-labelledby="capabilities-title" className="relative scroll-mt-16 bg-white py-20 sm:py-28 lg:py-32">
            <Container>
                <div className="grid items-end gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <SectionLabel index="04">Capabilities</SectionLabel>
                        <RevealLines lines={['Engineered', 'end to end.']} className="t-h2 mt-5" />
                        <span id="capabilities-title" className="sr-only">Capabilities</span>
                    </div>
                    <Reveal delay={0.1} className="lg:col-span-5">
                        <p className="t-lead">From the laboratory bench to the bridge deck — six disciplines our clients call on most.</p>
                        <TextLink to="/services" className="mt-5">
                            All nine services
                        </TextLink>
                    </Reveal>
                </div>
                <DesktopPanels />
                <MobileAccordion />
            </Container>
        </section>
    );
}
