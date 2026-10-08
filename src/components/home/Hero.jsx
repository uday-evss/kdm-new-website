import React, { useRef } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useSpring, useTransform } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { company } from '@/content/site';
import { findProject } from '@/content/projects';
import { useFinePointer } from '@/hooks/useMediaQuery';
import { useIntroDone } from '@/components/brand/IntroLoader';
import { BlueprintGrid, CornerMarks, Waveform } from '@/components/engineering';
import { ButtonLink, MaskedImage, RevealLines } from '@/components/site/primitives';
import BridgeElevation from './BridgeElevation';

// 01 — Hero. A drawing sheet that comes alive: the headline sits on a
// blueprint grid over an elevation of an instrumented arch bridge, beside a
// field photograph of the real one. On desktop the grid, drawing and photo
// drift with the cursor at different depths, a crosshair tracks it, and the
// sensor nearest the cursor lights up.

const HEADLINE = ['From ground', 'to structure.', 'From data', 'to decisions.'];

export default function Hero() {
    const ready = useIntroDone();
    const fine = useFinePointer();
    const sectionRef = useRef(null);
    const coordRef = useRef(null);
    const rajahmundry = findProject('rajamundry-bridge');

    // Pointer: normalised (-0.5…0.5) for parallax, client px for the crosshair.
    const nx = useMotionValue(0);
    const ny = useMotionValue(0);
    const cx = useMotionValue(-1e4);
    const cy = useMotionValue(-1e4);
    const sx = useSpring(nx, { stiffness: 60, damping: 18 });
    const sy = useSpring(ny, { stiffness: 60, damping: 18 });
    const gridX = useTransform(sx, (v) => v * -28);
    const gridY = useTransform(sy, (v) => v * -18);
    const drawX = useTransform(sx, (v) => v * 16);
    const cardX = useTransform(sx, (v) => v * -10);
    const cardY = useTransform(sy, (v) => v * -8);
    const lineX = useSpring(cx, { stiffness: 500, damping: 40 });
    const lineY = useSpring(cy, { stiffness: 500, damping: 40 });

    useMotionValueEvent(cx, 'change', () => {
        if (!coordRef.current || !sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.round(cx.get() - rect.left));
        const y = Math.max(0, Math.round(cy.get() - rect.top));
        coordRef.current.textContent = `X ${String(x).padStart(4, '0')} · Y ${String(y).padStart(4, '0')}`;
    });

    const onPointerMove = (e) => {
        if (!fine) return;
        const rect = sectionRef.current.getBoundingClientRect();
        nx.set((e.clientX - rect.left) / rect.width - 0.5);
        ny.set((e.clientY - rect.top) / rect.height - 0.5);
        cx.set(e.clientX);
        cy.set(e.clientY);
    };
    const onPointerLeave = () => {
        nx.set(0);
        ny.set(0);
        cx.set(-1e4);
        cy.set(-1e4);
    };

    const enter = (delay) => ({
        initial: { opacity: 0, y: 18 },
        animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
        transition: { duration: 0.9, ease: EASE, delay },
    });

    return (
        <section
            ref={sectionRef}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            aria-label="Introduction"
            className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-kdm-paper pt-28 sm:pt-32 lg:pt-36"
        >
            {/* Sheet: grid + colour blooms from the logo palette */}
            <BlueprintGrid style={{ x: gridX, y: gridY }} className="-inset-10" />
            <div aria-hidden="true" className="absolute -right-32 -top-24 -z-10 h-[560px] w-[560px] rounded-full bg-kdm-cyan/[0.13] blur-3xl" />
            <div aria-hidden="true" className="absolute -left-40 bottom-10 -z-10 h-[420px] w-[420px] rounded-full bg-kdm-yellow/[0.16] blur-3xl" />

            {/* Crosshair that follows the cursor (desktop only) */}
            {fine && (
                <>
                    <motion.div aria-hidden="true" style={{ x: lineX }} className="pointer-events-none fixed inset-y-0 left-0 z-0 w-px bg-kdm-blue/15" />
                    <motion.div aria-hidden="true" style={{ y: lineY }} className="pointer-events-none fixed inset-x-0 top-0 z-0 h-px bg-kdm-blue/15" />
                </>
            )}

            <div className="container-kdm relative z-10 grid flex-1 gap-12 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-7">
                    <motion.p {...enter(0)} className="t-label flex items-center gap-3 text-kdm-muted">
                        <span className="h-2 w-2 rounded-full bg-kdm-red" aria-hidden="true" />
                        {company.name} · Since {company.foundedYear}
                    </motion.p>

                    <RevealLines
                        as="h1"
                        lines={HEADLINE.map((line, i) =>
                            i < 2 ? (
                                line
                            ) : (
                                <span className="bg-gradient-to-r from-kdm-blue via-kdm-blue to-kdm-cyan bg-clip-text text-transparent">{line}</span>
                            ),
                        )}
                        animate={ready}
                        delay={0.1}
                        className="t-display mt-6"
                    />

                    <motion.p {...enter(0.55)} className="t-lead mt-8 max-w-xl">
                        Complete civil engineering solutions — from investigation and testing to monitoring, assessment and
                        rehabilitation. Consultancy, testing and training under one roof.
                    </motion.p>

                    <motion.div {...enter(0.7)} className="mt-10 flex flex-wrap items-center gap-3">
                        <ButtonLink href="#capabilities">Explore our capabilities</ButtonLink>
                        <ButtonLink to="/contact" variant="secondary">
                            Start a conversation
                        </ButtonLink>
                    </motion.div>
                </div>

                {/* Field record: the real bridge the drawing describes */}
                <motion.div style={{ x: cardX, y: cardY }} className="relative lg:col-span-5 lg:pt-4">
                    <motion.div {...enter(0.35)} className="relative mx-auto max-w-md lg:ml-auto lg:mr-0">
                        <div className="relative">
                            <MaskedImage
                                image={rajahmundry.cover}
                                alt="KDM engineers on the Rajahmundry bowstring arch bridge (Bridge No. 248) during structural health monitoring"
                                priority
                                animate={ready}
                                sizes="(min-width: 1024px) 420px, 90vw"
                                className="aspect-[4/3] rounded-panel shadow-lift lg:aspect-[5/6]"
                                imgClassName="object-[30%_50%]"
                            />
                            <CornerMarks />
                            <span className="t-label absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-kdm-ink backdrop-blur">
                                <span className="h-1.5 w-1.5 rounded-full bg-kdm-red" aria-hidden="true" /> Field record
                            </span>

                            <div className="absolute inset-x-3 bottom-3 rounded-card bg-white/90 p-4 shadow-soft backdrop-blur-md sm:inset-x-4 sm:bottom-4">
                                <div className="flex items-baseline justify-between gap-3">
                                    <p className="t-label text-kdm-ink">Ambient vibration test</p>
                                    <p className="t-label text-kdm-muted">Tri-axial</p>
                                </div>
                                <Waveform type="vibration" className="mt-2 h-10" speed="6s" />
                                <p className="mt-2 text-xs text-kdm-muted">
                                    {rajahmundry.subject} · {rajahmundry.client.replace(', India', '')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* The drawing sheet's bridge, across the full width */}
            <motion.div style={{ x: drawX }} className="relative z-0 -mt-4 sm:-mt-8 lg:-mt-14">
                <BridgeElevation
                    ready={ready}
                    pointerX={fine ? cx : undefined}
                    pointerY={fine ? cy : undefined}
                    className="block h-[200px] w-full sm:h-[260px] lg:aspect-[4/1] lg:h-auto"
                />
            </motion.div>

            {/* Base strip: scroll cue + cursor coordinates */}
            <div className="container-kdm relative z-10 flex items-center justify-between pb-6 pt-2">
                <a href="#proof" className="group t-label flex items-center gap-3 text-kdm-muted hover:text-kdm-ink">
                    <span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-kdm-ink/15">
                        <span className="absolute inset-0 bg-kdm-red motion-safe:animate-scroll-cue" />
                    </span>
                    Scroll to explore
                </a>
                <span ref={coordRef} aria-hidden="true" className="t-label t-num hidden text-kdm-muted lg:block">
                    {company.logoWords.join(' · ')}
                </span>
            </div>
        </section>
    );
}
