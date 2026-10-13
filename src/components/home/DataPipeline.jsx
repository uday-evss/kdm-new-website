import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Wrench, BatteryCharging, Radar, Database, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { shm, analysisSoftware } from '@/content/shm';
import { Container, RevealLines, SectionLabel, Reveal, Stagger, StaggerItem } from '@/components/site/primitives';

// 06 — Technology. The five processing phases of a KDM monitoring system as
// one flowing pipeline — data travels left to right through it — with the
// sensing technologies and analysis software beneath.

const ICONS = [Wrench, BatteryCharging, Radar, Database, LineChart];

export function Pipeline({ className }) {
    const steps = shm.phases.steps;
    const ref = useRef(null);
    const live = useInView(ref);
    return (
        <div ref={ref} className={cn('relative', className)}>
            {/* the flow line (desktop: horizontal, mobile: vertical) */}
            <div aria-hidden="true" className="absolute left-[27px] top-6 bottom-6 w-px bg-kdm-line lg:left-[10%] lg:right-[10%] lg:top-[27px] lg:bottom-auto lg:h-px lg:w-auto">
                <motion.div
                    className="absolute inset-0 origin-top bg-gradient-to-b from-kdm-cyan to-kdm-blue lg:origin-left lg:bg-gradient-to-r"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: EASE }}
                />
                {live && (
                    <motion.div
                        className="absolute inset-0 hidden motion-reduce:hidden lg:block"
                        initial={{ x: '0%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 }}
                    >
                        <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-kdm-red shadow-[0_0_0_4px_rgb(226_50_31/0.15)]" />
                    </motion.div>
                )}
            </div>
            <Stagger as="ol" gap={0.12} className="relative grid gap-6 lg:grid-cols-5 lg:gap-5">
                {steps.map((step, i) => {
                    const Icon = ICONS[i];
                    return (
                        <StaggerItem as="li" key={step.title} className="flex gap-5 lg:block">
                            <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-kdm-blue shadow-soft ring-1 ring-kdm-line lg:mx-auto">
                                <Icon className="h-6 w-6" aria-hidden="true" />
                                <span className="t-num absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-kdm-yellow text-[10px] font-semibold text-kdm-ink">
                                    {i + 1}
                                </span>
                            </span>
                            <div className="rounded-card bg-white p-5 ring-1 ring-kdm-line lg:mt-6 lg:min-h-[190px]">
                                <h3 className="font-display text-lg font-semibold text-kdm-ink">{step.title}</h3>
                                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-kdm-graphite">
                                    {step.points.slice(0, 2).map((p) => (
                                        <li key={p}>{p}</li>
                                    ))}
                                </ul>
                            </div>
                        </StaggerItem>
                    );
                })}
            </Stagger>
        </div>
    );
}

export function TagGroup({ title, items, tone = 'cyan' }) {
    return (
        <div>
            <h3 className="t-label text-kdm-muted">{title}</h3>
            <Stagger as="ul" gap={0.03} className="mt-4 flex flex-wrap gap-2">
                {items.map((t) => (
                    <StaggerItem
                        as="li"
                        key={t}
                        className={cn(
                            'rounded-tag px-3.5 py-2 text-sm font-medium ring-1 ring-inset',
                            tone === 'cyan' ? 'bg-white text-kdm-ink ring-kdm-line' : 'bg-kdm-blue text-white ring-kdm-blue',
                        )}
                    >
                        {t}
                    </StaggerItem>
                ))}
            </Stagger>
        </div>
    );
}

export default function DataPipeline() {
    return (
        <section aria-labelledby="tech-title" className="relative overflow-hidden bg-kdm-paper py-20 sm:py-28 lg:py-32">
            <Container>
                <div className="grid items-end gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-6">
                        <SectionLabel index="05">Technology</SectionLabel>
                        <RevealLines lines={['Engineering', 'meets data.']} className="t-h2 mt-5" />
                        <span id="tech-title" className="sr-only">Technology</span>
                    </div>
                    <Reveal delay={0.1} className="t-lead lg:col-span-6">
                        {shm.infrastructure.text}
                    </Reveal>
                </div>

                <Pipeline className="mt-16" />

                <div className="mt-16 grid gap-10 border-t border-kdm-line pt-10 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <TagGroup title="Sensing & measurement" items={shm.infrastructure.sensors} />
                    </div>
                    <div className="lg:col-span-5">
                        <TagGroup title="Analysis & modelling software" items={analysisSoftware} tone="blue" />
                        <h3 className="t-label mt-10 text-kdm-muted">Deployment</h3>
                        <ul className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                            {shm.installationTypes.map((t) => (
                                <li key={t.title} className="rounded-card bg-white p-4 text-sm ring-1 ring-kdm-line">
                                    <p className="font-semibold text-kdm-ink">{t.title.split(' – ')[0]}</p>
                                    <p className="mt-1 text-kdm-muted">{t.points[1]}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>
        </section>
    );
}
