import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { company } from '@/content/site';
import { services, serviceSummary } from '@/content/services';
import { useFinePointer } from '@/hooks/useMediaQuery';
import { Container, Img, PageHero, Section, SectionHeading, SlideArrow, CheckList, usePageMeta, Reveal } from '@/components/site/primitives';
import { ContactBand } from '@/components/site/widgets';
import { serviceIcons } from '@/components/site/serviceIcons';

// The services index as an engineering register: numbered rows, and on
// desktop a photograph of the hovered service follows the cursor.
function ServiceIndex() {
    const fine = useFinePointer();
    const listRef = useRef(null);
    const [hovered, setHovered] = useState(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 300, damping: 32 });
    const sy = useSpring(y, { stiffness: 300, damping: 32 });

    const onMove = (e) => {
        const rect = listRef.current.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
    };

    return (
        <div ref={listRef} className="relative" onPointerMove={fine ? onMove : undefined} onPointerLeave={() => setHovered(null)}>
            <ol className="border-b border-kdm-line">
                {services.map((s, i) => {
                    const Icon = serviceIcons[s.slug];
                    return (
                        <li key={s.slug} onPointerEnter={() => setHovered(s)} className="border-t border-kdm-line">
                            <Link to={`/services/${s.slug}`} className="group grid grid-cols-12 items-center gap-4 py-7 sm:py-9">
                                <span className="t-num col-span-2 font-display text-sm text-kdm-muted sm:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                                <span className="col-span-10 flex items-center gap-4 sm:col-span-6">
                                    <Icon className="hidden h-6 w-6 shrink-0 text-kdm-red sm:block" aria-hidden="true" />
                                    <span className="font-display text-2xl font-semibold tracking-tight text-kdm-ink transition-[color,transform] duration-500 ease-kdm group-hover:translate-x-2 group-hover:text-kdm-blue sm:text-[34px] sm:leading-tight">
                                        {s.shortTitle}
                                    </span>
                                </span>
                                <span className="col-span-10 col-start-3 text-[15px] leading-relaxed text-kdm-graphite sm:col-span-4 sm:col-start-auto">
                                    {serviceSummary(s)}
                                </span>
                                <span className="hidden justify-end sm:col-span-1 sm:flex">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-full text-kdm-blue ring-1 ring-kdm-line transition-colors duration-300 group-hover:bg-kdm-blue group-hover:text-white">
                                        <SlideArrow />
                                    </span>
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ol>

            {fine && (
                <motion.div aria-hidden="true" style={{ x: sx, y: sy }} className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block">
                    <div className="absolute -translate-y-1/2 translate-x-10">
                        <AnimatePresence>
                            {hovered && (
                                <motion.div
                                    key={hovered.slug}
                                    initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.35, ease: EASE }}
                                    className="absolute left-0 top-[-96px] overflow-hidden rounded-card shadow-lift ring-4 ring-white"
                                >
                                    <Img image={hovered.cover} alt="" sizes="320px" className="h-48 w-72 object-cover" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default function Services() {
    usePageMeta('Our Services', `Civil engineering consultancy, testing services and training: ${services.map((s) => s.shortTitle).join(', ')}.`);
    const banner = services.find((s) => s.slug === 'highways-bridges-buildings-irrigation').cover;

    return (
        <>
            <PageHero
                index="01"
                eyebrow="Our services"
                title={['Nine disciplines.', 'One engineering partner.']}
                image={banner}
                caption="Fig. 01 — Bridge works"
                crumbs={[{ label: 'Our Services' }]}
            >
                Civil engineering consultancy, testing services and training — all under one roof.
            </PageHero>

            <Section tone="white">
                <Container>
                    <ServiceIndex />
                </Container>
            </Section>

            <Section tone="paper">
                <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <SectionHeading index="02" label="What sets us apart" title="Our forte." />
                        <Reveal delay={0.15} className="t-lead mt-6">
                            {company.intro[1]}
                        </Reveal>
                    </div>
                    <div className="lg:col-span-7">
                        <CheckList items={company.forte} columns={2} numbered />
                    </div>
                </Container>
            </Section>

            <ContactBand />
        </>
    );
}
