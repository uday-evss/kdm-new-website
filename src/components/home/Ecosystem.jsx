import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { disciplines } from '@/content/home';
import { findService } from '@/content/services';
import { company } from '@/content/site';
import { LogoMark } from '@/components/brand/Logo';
import { CornerMarks } from '@/components/engineering';
import { Container, Img, RevealLines, SectionLabel, TextLink, Reveal } from '@/components/site/primitives';

// 03 — What KDM does. An engineering system diagram: KDM at the centre,
// nine disciplines around it. Hovering (or focusing, or tapping) a
// discipline activates its connection, wakes its neighbours, and swaps in
// what it means and where it lives. It cycles on its own until touched.

const R_NODE = 40; // % of the diagram, node orbit
const R_HUB = 16;
const angleOf = (i) => -Math.PI / 2 + (i / disciplines.length) * Math.PI * 2;
const pos = (i, r) => ({ x: 50 + r * Math.cos(angleOf(i)), y: 50 + r * Math.sin(angleOf(i)) });

function Diagram({ active, onSelect, live }) {
    const n = disciplines.length;
    const isNeighbour = (i) => (i - active + n) % n === 1 || (active - i + n) % n === 1;

    return (
        <div className="relative mx-auto aspect-square w-full max-w-[600px]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <circle cx="50" cy="50" r={R_NODE + 6} fill="none" stroke="rgb(var(--kdm-line))" strokeWidth="0.25" />
                <g className={cn('origin-center', live && 'motion-safe:animate-spin-slow')} style={{ transformBox: 'view-box' }}>
                    <circle cx="50" cy="50" r={R_NODE} fill="none" stroke="rgb(var(--kdm-cyan) / 0.45)" strokeWidth="0.25" strokeDasharray="0.6 1.6" />
                    {Array.from({ length: 72 }, (_, k) => {
                        const a = (k / 72) * Math.PI * 2;
                        const r1 = R_NODE + 6;
                        const r2 = r1 - (k % 6 === 0 ? 1.6 : 0.8);
                        return (
                            <line
                                key={k}
                                x1={50 + r1 * Math.cos(a)}
                                y1={50 + r1 * Math.sin(a)}
                                x2={50 + r2 * Math.cos(a)}
                                y2={50 + r2 * Math.sin(a)}
                                stroke="rgb(var(--kdm-ink) / 0.25)"
                                strokeWidth="0.2"
                            />
                        );
                    })}
                </g>
                <circle cx="50" cy="50" r={R_HUB + 3} fill="none" stroke="rgb(var(--kdm-line))" strokeWidth="0.3" />
                {disciplines.map((d, i) => {
                    const a = pos(i, R_HUB + 3);
                    const b = pos(i, R_NODE - 5);
                    const on = i === active;
                    return (
                        <g key={d.id}>
                            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgb(var(--kdm-line))" strokeWidth="0.3" />
                            {on && (
                                <motion.line
                                    x1={a.x}
                                    y1={a.y}
                                    x2={b.x}
                                    y2={b.y}
                                    stroke="rgb(var(--kdm-blue))"
                                    strokeWidth="0.55"
                                    strokeDasharray="1.2 1"
                                    className="motion-safe:animate-dash-flow"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, ease: EASE }}
                                />
                            )}
                            {on && live && (
                                <motion.circle
                                    r="0.9"
                                    fill="rgb(var(--kdm-red))"
                                    initial={{ cx: a.x, cy: a.y }}
                                    animate={{ cx: [a.x, b.x], cy: [a.y, b.y] }}
                                    transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.2 }}
                                    className="motion-reduce:hidden"
                                />
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Hub */}
            <div className="absolute left-1/2 top-1/2 flex h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white text-center shadow-lift ring-1 ring-kdm-line">
                <LogoMark className="h-[42%]" sizes="120px" loading="lazy" />
                <p className="t-label mt-2 text-[10px] text-kdm-ink">{company.shortName}</p>
            </div>

            {/* Discipline nodes */}
            {disciplines.map((d, i) => {
                const p = pos(i, R_NODE);
                const on = i === active;
                return (
                    <button
                        key={d.id}
                        type="button"
                        onMouseEnter={() => onSelect(i)}
                        onFocus={() => onSelect(i)}
                        onClick={() => onSelect(i)}
                        aria-pressed={on}
                        style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        className={cn(
                            'absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-500 ease-kdm',
                            on
                                ? 'scale-110 bg-kdm-blue text-white shadow-lift'
                                : isNeighbour(i)
                                  ? 'bg-white text-kdm-ink ring-1 ring-kdm-cyan/60'
                                  : 'bg-white text-kdm-graphite ring-1 ring-kdm-line hover:text-kdm-ink',
                        )}
                    >
                        <span className={cn('t-num text-[10px]', on ? 'text-kdm-yellow' : 'text-kdm-muted')}>{String(i + 1).padStart(2, '0')}</span>
                        {d.verb}
                    </button>
                );
            })}
        </div>
    );
}

function Detail({ discipline, index, announce }) {
    const service = findService(discipline.service);
    return (
        <div aria-live={announce ? 'polite' : 'off'}>
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={discipline.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="relative"
            >
                <p className="t-label flex items-center gap-3 text-kdm-muted">
                    <span className="t-num text-kdm-red-ink">{String(index + 1).padStart(2, '0')}</span> / {String(disciplines.length).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-display text-5xl font-semibold tracking-tight text-kdm-ink sm:text-6xl">
                    {discipline.verb}
                    <span className="text-kdm-red">.</span>
                </h3>
                <p className="t-lead mt-5 max-w-lg">{discipline.text}</p>
                <div className="relative mt-8">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-card bg-kdm-mist">
                        <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: EASE }} className="h-full w-full">
                            <Img image={service.cover} alt="" sizes="(min-width: 1024px) 40vw, 100vw" className="h-full w-full object-cover" />
                        </motion.div>
                        <span className="t-label absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-kdm-ink">{service.shortTitle}</span>
                    </div>
                    <CornerMarks />
                </div>
                <TextLink to={`/services/${service.slug}`} className="mt-6">
                    Explore {service.shortTitle}
                </TextLink>
            </motion.div>
        </AnimatePresence>
        </div>
    );
}

export default function Ecosystem() {
    const [active, setActive] = useState(5); // starts on Monitor — KDM's signature service
    const [touched, setTouched] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { margin: '-20% 0px -20% 0px' });

    useEffect(() => {
        if (touched || !inView) return undefined;
        const id = setInterval(() => setActive((a) => (a + 1) % disciplines.length), 3600);
        return () => clearInterval(id);
    }, [touched, inView]);

    const select = (i) => {
        setTouched(true);
        setActive(i);
    };

    return (
        <section ref={ref} aria-labelledby="ecosystem-title" className="relative overflow-hidden bg-kdm-paper py-20 sm:py-28 lg:py-32">
            <Container>
                <div className="grid items-end gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <SectionLabel index="03">What KDM does</SectionLabel>
                        <RevealLines lines={['One engineering partner.', 'Multiple disciplines.']} className="t-h2 mt-5" />
                        <span id="ecosystem-title" className="sr-only">What KDM does</span>
                    </div>
                    <Reveal delay={0.1} className="t-lead lg:col-span-5">
                        Consultancy, testing, surveys, monitoring and training — connected, so one team can take a structure from
                        the ground investigation to decades of monitoring.
                    </Reveal>
                </div>

                {/* Mobile: discipline chips */}
                <div className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 md:hidden" role="group" aria-label="Disciplines">
                    {disciplines.map((d, i) => (
                        <button
                            key={d.id}
                            type="button"
                            onClick={() => select(i)}
                            aria-pressed={i === active}
                            className={cn(
                                'shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors',
                                i === active ? 'bg-kdm-blue text-white' : 'bg-white text-kdm-graphite ring-1 ring-kdm-line',
                            )}
                        >
                            {d.verb}
                        </button>
                    ))}
                </div>

                <div className="mt-10 grid items-center gap-14 md:mt-16 lg:grid-cols-12 lg:gap-16">
                    <div className="hidden md:block lg:col-span-7">
                        <Diagram active={active} onSelect={select} live={inView} />
                    </div>
                    <div className="lg:col-span-5">
                        <Detail discipline={disciplines[active]} index={active} announce={touched} />
                    </div>
                </div>
            </Container>
        </section>
    );
}
