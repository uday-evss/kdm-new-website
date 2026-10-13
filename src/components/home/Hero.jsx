import React from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { company } from '@/content/site';
import { servicesNav } from '@/content/servicesNav';
import { findProject } from '@/content/projects';
import { useFinePointer } from '@/hooks/useMediaQuery';
import { useIntroDone } from '@/components/brand/IntroLoader';
import { Annotation, BlueprintGrid, CoordinateMarker, CornerMarks, SheetZones, TitleBlock, Waveform } from '@/components/engineering';
import { ButtonLink, MaskedImage, RevealLines } from '@/components/site/primitives';
import BridgeElevation from './BridgeElevation';

// 01 — Hero, set as the first sheet of a drawing set: zone markers frame the
// page, the headline sits on a faint drafting grid beside a field photograph
// of a bridge KDM has monitored, and an elevation of that bridge type draws
// itself across the foot of the sheet. A title block records the sheet's
// (real) particulars. On desktop the sensor nearest the cursor lights up.

const HEADLINE = ['Understand the', 'structure.', 'Monitor its', 'health.'];

export default function Hero() {
    const ready = useIntroDone();
    const fine = useFinePointer();
    const rajahmundry = findProject('rajamundry-bridge');
    const clients = company.stats.find((s) => s.label === 'Clients');

    // Client-space pointer, used only to light the nearest sensor.
    const cx = useMotionValue(-1e4);
    const cy = useMotionValue(-1e4);
    const onPointerMove = (e) => {
        if (!fine) return;
        cx.set(e.clientX);
        cy.set(e.clientY);
    };
    const onPointerLeave = () => {
        cx.set(-1e4);
        cy.set(-1e4);
    };

    const enter = (delay) => ({
        initial: { opacity: 0, y: 16 },
        animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
        transition: { duration: 0.8, ease: EASE, delay },
    });

    return (
        <section
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            aria-label="Introduction"
            className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-kdm-paper pt-28 sm:pt-32 lg:pt-36"
        >
            <BlueprintGrid className="opacity-90" />
            <SheetZones />

            <div className="container-kdm relative z-10 grid flex-1 gap-12 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-6">
                    <motion.p {...enter(0)} className="t-label flex items-center gap-3 text-kdm-graphite">
                        <CoordinateMarker />
                        {company.name} · Est. {company.foundedYear}
                    </motion.p>

                    <RevealLines
                        as="h1"
                        lines={HEADLINE.map((line, i) => (i < 2 ? line : <span className="text-kdm-blue">{line}</span>))}
                        animate={ready}
                        delay={0.05}
                        className="t-display mt-7"
                    />

                    <motion.p {...enter(0.45)} className="t-lead mt-8 max-w-xl">
                        {company.name} delivers specialised engineering services across Structural Health Monitoring,
                        Materials Testing and Geo-technical Investigations.
                    </motion.p>

                    <motion.div {...enter(0.6)} className="mt-10 flex flex-wrap items-center gap-3">
                        <ButtonLink to="/services/structural-health-monitoring">Explore structural health monitoring</ButtonLink>
                        <ButtonLink to="/contact" variant="secondary">
                            Start a conversation
                        </ButtonLink>
                    </motion.div>

                </div>

                {/* Field record: a real bridge KDM has instrumented */}
                {/* No opacity fade here: the photo is the first screen's largest
                    element, so it paints at once and only its mask wipe animates. */}
                <motion.figure
                    initial={{ y: 16 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="relative lg:col-span-6 xl:col-span-5 xl:col-start-8"
                >
                    <div className="relative">
                        <MaskedImage
                            image={rajahmundry.cover}
                            alt="KDM engineers on the Rajahmundry bowstring arch bridge (Bridge No. 248) during structural health monitoring"
                            priority
                            animate={ready}
                            sizes="(min-width: 1280px) 520px, (min-width: 1024px) 45vw, 92vw"
                            className="aspect-[4/3] rounded-card lg:aspect-square"
                            imgClassName="object-[30%_50%]"
                        />
                        <CornerMarks />
                        <span className="t-label absolute left-3 top-3 bg-kdm-paper px-2 py-1 text-kdm-ink">Fig. 01 · Field record</span>
                        <div className="absolute inset-x-3 bottom-3 border border-kdm-ink/15 bg-kdm-paper/95 p-3 sm:inset-x-4 sm:bottom-4 sm:p-4">
                            <div className="flex items-baseline justify-between gap-3">
                                <p className="t-label text-kdm-ink">Ambient vibration test</p>
                                <p className="t-label text-kdm-muted">Illustrative trace</p>
                            </div>
                            <Waveform type="vibration" className="mt-2 h-9" speed="6s" color="rgb(var(--kdm-blue))" />
                        </div>
                    </div>
                    <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <Annotation>{rajahmundry.subject}</Annotation>
                        <span className="t-label text-kdm-muted">{rajahmundry.client.replace(', India', '')}</span>
                    </figcaption>
                    <motion.div {...enter(0.75)} className="mt-6 hidden sm:block">
                        <TitleBlock
                            rows={[
                                ['Drawing', company.tagline],
                                ['Disciplines', String(servicesNav.length).padStart(2, '0')],
                                ['Clients', `${clients.value}${clients.suffix}`],
                                ['Since', String(company.foundedYear)],
                            ]}
                        />
                    </motion.div>
                </motion.figure>
            </div>

            {/* The elevation drawing across the foot of the sheet */}
            <div className="relative z-0 mt-6 lg:-mt-6">
                <BridgeElevation
                    ready={ready}
                    pointerX={fine ? cx : undefined}
                    pointerY={fine ? cy : undefined}
                    className="block h-[200px] w-full sm:h-[260px] lg:aspect-[4/1] lg:h-auto"
                />
            </div>

            <div className="container-kdm relative z-10 flex items-center justify-between pb-6 pt-2">
                <a href="#intro" className="group t-label flex items-center gap-3 text-kdm-muted hover:text-kdm-ink">
                    <span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-kdm-ink/15">
                        <span className="absolute inset-0 bg-kdm-red motion-safe:animate-scroll-cue" />
                    </span>
                    Scroll to explore
                </a>
                <span aria-hidden="true" className="t-label hidden text-kdm-muted lg:block">
                    {servicesNav.map((s) => s.shortTitle).join(' · ')}
                </span>
            </div>
        </section>
    );
}
