import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { projects } from '@/content/projects';
import { useDesktop } from '@/hooks/useMediaQuery';
import { Container, Img, RevealLines, SectionLabel, SlideArrow, TextLink } from '@/components/site/primitives';

// 06 — Projects. Full-bleed project stories. On desktop the section pins and
// scrolling moves the stories sideways, with the project counter and a
// progress rule keeping place; on touch screens it is a native swipe row.

const pad = (n) => String(n).padStart(2, '0');

export function StoryCard({ project, index, wide = false, grid = false }) {
    return (
        <article
            className={cn(
                'group relative flex shrink-0 overflow-hidden rounded-panel bg-white ring-1 ring-kdm-line',
                wide
                    ? 'h-[min(64vh,620px)] w-[min(68vw,1040px)] flex-row'
                    : grid
                      ? 'w-full flex-col'
                      : 'w-[84vw] snap-start flex-col sm:w-[62vw]',
            )}
        >
            <div className={cn('relative overflow-hidden bg-kdm-mist', wide ? 'w-[58%]' : 'aspect-[4/3]')}>
                <Img
                    image={project.cover}
                    alt={`${project.title} — KDM field work`}
                    sizes={wide ? '40vw' : grid ? '(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw' : '84vw'}
                    className="h-full w-full object-cover transition-transform [transition-duration:1400ms] ease-kdm group-hover:scale-105"
                />
                <span className="t-label absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-kdm-ink backdrop-blur">
                    Fig. {pad(index + 1)} — {project.place}
                </span>
            </div>
            <div className={cn('flex flex-col', wide ? 'w-[42%] p-8 xl:p-10' : 'p-6')}>
                <div className="flex items-start justify-between gap-4">
                    <span aria-hidden="true" className="t-num font-display text-5xl font-semibold leading-none text-kdm-muted/80 xl:text-6xl">{pad(index + 1)}</span>
                    <span className="t-label rounded-full bg-kdm-surface px-3 py-1.5 text-right text-kdm-cyan-ink">{project.workType.replace(' (RSI)', '')}</span>
                </div>
                <h3 className={cn('font-display font-semibold tracking-tight text-kdm-ink', wide ? 'mt-8 text-3xl xl:text-[40px] xl:leading-[1.05]' : 'mt-5 text-2xl')}>
                    {project.title}
                </h3>
                <p className="mt-2 text-sm text-kdm-muted">
                    {project.subject} · {project.client.replace(', India', '')}
                </p>
                <ul className={cn('space-y-2.5', wide ? 'mt-8' : 'mt-5')}>
                    {project.facts.map((f) => (
                        <li key={f} className="flex items-center gap-3 border-t border-kdm-line pt-2.5 text-[15px] text-kdm-graphite">
                            <span aria-hidden="true" className="h-1.5 w-1.5 bg-kdm-red" /> {f}
                        </li>
                    ))}
                </ul>
                <div className={cn('flex flex-wrap gap-1.5', wide ? 'mt-6' : 'mt-4')}>
                    {project.methods.slice(0, 3).map((m) => (
                        <span key={m} className="rounded-full bg-kdm-paper px-2.5 py-1 text-xs text-kdm-graphite ring-1 ring-inset ring-kdm-line">
                            {m}
                        </span>
                    ))}
                </div>
                <Link to={`/projects/${project.slug}`} className="mt-auto inline-flex items-center gap-2 pt-8 text-[15px] font-semibold text-kdm-blue after:absolute after:inset-0">
                    <span className="link-draw">Project details</span>
                    <SlideArrow />
                </Link>
            </div>
        </article>
    );
}

function Intro({ className }) {
    return (
        <div className={className}>
            <SectionLabel index="06">Projects</SectionLabel>
            <RevealLines lines={['Railway bridges,', 'instrumented', 'and understood.']} className="t-h2 mt-5" />
            <p className="t-lead mt-6 max-w-md">
                Rail–structure interaction, vibration analysis, condition assessment and long-term monitoring for South
                Central and East Coast Railway.
            </p>
            <TextLink to="/projects" className="mt-6">
                All projects &amp; map
            </TextLink>
        </div>
    );
}

function PinnedStories() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const [shift, setShift] = useState(0);
    const [current, setCurrent] = useState(0);
    // Vertical scroll budget per pixel of sideways travel (<1 = the row moves
    // faster than the page would, keeping the pinned stretch short).
    const SCROLL_RATIO = 0.6;

    useLayoutEffect(() => {
        const measure = () => {
            if (trackRef.current) setShift(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(trackRef.current);
        window.addEventListener('resize', measure);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, []);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
    const raw = useTransform(scrollYProgress, [0, 1], [0, -shift]);
    const x = useSpring(raw, { stiffness: 140, damping: 30, mass: 0.4 });
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        const i = Math.min(projects.length - 1, Math.max(0, Math.round(v * projects.length - 0.35)));
        setCurrent((c) => (c === i ? c : i));
    });

    return (
        <section ref={sectionRef} aria-label="Projects" style={{ height: `calc(100vh + ${Math.round(shift * SCROLL_RATIO)}px)` }} className="relative bg-kdm-paper">
            <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
                <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-6 pl-[max(40px,calc((100vw-1320px)/2+40px))] pr-[12vw]">
                    <Intro className="w-[min(36vw,520px)] shrink-0 pr-8" />
                    {projects.map((p, i) => (
                        <StoryCard key={p.slug} project={p} index={i} wide />
                    ))}
                </motion.div>

                <div className="container-kdm mt-10 flex items-center gap-6">
                    <p className="t-label t-num w-20 text-kdm-ink" aria-live="off">
                        {pad(current + 1)} <span className="text-kdm-muted">/ {pad(projects.length)}</span>
                    </p>
                    <div className="relative h-3 flex-1">
                        <div className="absolute inset-x-0 top-1/2 h-px bg-kdm-line" />
                        {projects.map((p, i) => (
                            <span
                                key={p.slug}
                                aria-hidden="true"
                                style={{ left: `${(i / (projects.length - 1)) * 100}%` }}
                                className={cn('absolute top-0 h-3 w-px transition-colors', i <= current ? 'bg-kdm-ink' : 'bg-kdm-line')}
                            />
                        ))}
                        <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 origin-left bg-kdm-red" />
                    </div>
                    <p className="t-label hidden w-56 truncate text-right text-kdm-muted xl:block">{projects[current].title}</p>
                </div>
            </div>
        </section>
    );
}

function SwipeStories() {
    return (
        <section aria-label="Projects" className="relative bg-kdm-paper py-20 sm:py-28">
            <Container>
                <Intro />
            </Container>
            <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 sm:scroll-px-6 sm:px-6">
                {projects.map((p, i) => (
                    <StoryCard key={p.slug} project={p} index={i} />
                ))}
                <span aria-hidden="true" className="w-1 shrink-0" />
            </div>
        </section>
    );
}

export default function ProjectStories() {
    const desktop = useDesktop();
    const reduce = useReducedMotion();
    return desktop && !reduce ? <PinnedStories /> : <SwipeStories />;
}

