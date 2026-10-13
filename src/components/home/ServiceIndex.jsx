import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { servicesNav } from '@/content/servicesNav';
import { CornerMarks, DimensionLine, ServiceDiagram } from '@/components/engineering';
import { serviceIcons } from '@/components/site/serviceIcons';
import { Container, Img, RevealLines, SectionLabel, SlideArrow, TextLink, Reveal } from '@/components/site/primitives';

// 03 — Services as a technical index: every discipline as a numbered entry.
// Pointing at (or focusing) an entry rules a dimension line beneath it and
// swaps the drawing sheet beside the list — the service's photograph and an
// illustrative line drawing of its subject. On phones each entry is a plain,
// thumb-sized link with its photograph.

const pad = (n) => String(n).padStart(2, '0');

function Preview({ service, index }) {
    const Icon = serviceIcons[service.slug];
    return (
        <div className="relative border border-kdm-ink/15 bg-white p-5">
            <CornerMarks />
            <div className="flex items-center justify-between">
                <p className="t-label text-kdm-muted">Sheet 03.{pad(index + 1)}</p>
                <p className="t-label text-kdm-muted">Illustrative</p>
            </div>
            <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-card bg-kdm-mist">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={service.slug}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="absolute inset-0"
                    >
                        <Img image={service.cover} alt="" sizes="36vw" className="h-full w-full object-cover" />
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="mt-5 grid grid-cols-5 items-end gap-5">
                <div className="col-span-3 border-t border-kdm-line pt-4">
                    <ServiceDiagram key={service.slug} slug={service.slug} play />
                </div>
                <div className="col-span-2">
                    <Icon className="h-5 w-5 text-kdm-red" aria-hidden="true" />
                    <p className="mt-3 font-display text-lg font-semibold leading-snug text-kdm-ink">{service.shortTitle}</p>
                    <TextLink to={`/services/${service.slug}`} className="mt-3 text-sm">
                        Explore
                    </TextLink>
                </div>
            </div>
        </div>
    );
}

export default function ServiceIndex() {
    const [active, setActive] = useState(0);

    return (
        <section id="services" aria-labelledby="services-title" className="relative scroll-mt-16 border-t border-kdm-line bg-kdm-paper py-20 sm:py-28 lg:py-32">
            <Container>
                <div className="grid items-end gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <SectionLabel index="03">Services</SectionLabel>
                        <RevealLines lines={['A technical index of', `${servicesNav.length} disciplines.`]} className="t-h2 mt-6" />
                        <span id="services-title" className="sr-only">Our services</span>
                    </div>
                    <Reveal delay={0.1} className="lg:col-span-5">
                        <p className="t-lead">Consultancy, testing, surveys, monitoring and training — each delivered by its own specialist team.</p>
                        <TextLink to="/services" className="mt-5">
                            All services
                        </TextLink>
                    </Reveal>
                </div>

                <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-12">
                    <ol className="border-b border-kdm-ink/15 lg:col-span-7">
                        {servicesNav.map((s, i) => {
                            const on = i === active;
                            return (
                                <li key={s.slug} className="border-t border-kdm-ink/15">
                                    <Link
                                        to={`/services/${s.slug}`}
                                        onMouseEnter={() => setActive(i)}
                                        onFocus={() => setActive(i)}
                                        className={cn(
                                            'group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 transition-colors duration-300 sm:grid-cols-[3rem_1fr_auto] sm:py-6 lg:px-4',
                                            on ? 'lg:bg-white' : '',
                                        )}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={cn('absolute left-0 top-0 hidden h-full w-[2px] bg-kdm-red transition-transform duration-500 ease-kdm lg:block', on ? 'scale-y-100' : 'scale-y-0')}
                                            style={{ transformOrigin: 'top' }}
                                        />
                                        <span className={cn('t-num text-sm text-kdm-muted', on && 'lg:text-kdm-red-ink')}>{pad(i + 1)}</span>
                                        <span className="min-w-0">
                                            <span className="flex items-center gap-3">
                                                <Img
                                                    image={s.cover}
                                                    alt=""
                                                    sizes="56px"
                                                    className="h-11 w-14 shrink-0 rounded-tag object-cover lg:hidden"
                                                />
                                                <span
                                                    className={cn(
                                                        'font-display text-xl font-semibold tracking-tight transition-colors duration-300 sm:text-2xl',
                                                        on ? 'text-kdm-ink lg:text-kdm-blue' : 'text-kdm-ink',
                                                    )}
                                                >
                                                    {s.shortTitle}
                                                </span>
                                            </span>
                                            <span className="mt-1.5 hidden text-[15px] leading-relaxed text-kdm-graphite sm:line-clamp-1">{s.summary}</span>
                                            {on && <DimensionLine play className="mt-3 hidden max-w-sm lg:flex [--dim-bg:#fff]" label={s.featured ? 'Flagship service' : 'Discipline'} />}
                                        </span>
                                        <span
                                            className={cn(
                                                'flex h-10 w-10 items-center justify-center rounded-tag border transition-colors duration-300',
                                                on ? 'border-kdm-ink/20 text-kdm-blue lg:border-kdm-red lg:bg-kdm-red lg:text-white' : 'border-kdm-ink/20 text-kdm-blue',
                                            )}
                                        >
                                            <SlideArrow />
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ol>

                    <div className="hidden lg:col-span-5 lg:block">
                        <div className="sticky top-24">
                            <Preview service={servicesNav[active]} index={active} />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
