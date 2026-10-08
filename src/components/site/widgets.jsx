import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FileDown, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { clients } from '@/content/clients';
import { company, contact, formatPhone, telHref } from '@/content/site';
import { BlueprintGrid, MeasureRule } from '@/components/engineering';
import { Container, ButtonLink, RevealLines, SectionLabel, SlideArrow } from './primitives';

// Counts up to `value` the first time it scrolls into view, sharpening from
// a blur as it lands.
export function StatCounter({ value, suffix = '', duration = 1800, className }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
    const reduce = useReducedMotion();
    const [shown, setShown] = useState(reduce ? value : 0);

    useEffect(() => {
        if (!inView || reduce) return undefined;
        let frame;
        const start = performance.now();
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            setShown(Math.round(value * (1 - (1 - t) ** 4)));
            if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, reduce, value, duration]);

    return (
        <motion.span
            ref={ref}
            className={cn('t-num inline-block', className)}
            initial={{ filter: 'blur(10px)', opacity: 0.3 }}
            animate={inView ? { filter: 'blur(0px)', opacity: 1 } : undefined}
            transition={{ duration: duration / 1000, ease: EASE }}
        >
            {shown.toLocaleString('en-IN')}
            {suffix}
        </motion.span>
    );
}

// An endless row of client logos (the row is rendered twice and each logo
// carries its own right margin, so sliding by exactly half loops seamlessly) that pauses under the cursor; each logo
// lifts slightly on hover. A static wrapped row for people
// who prefer reduced motion.
export function ClientMarquee({ items = clients.filter((c) => c.featured), reverse = false, duration = 60, label = 'Some of our clients' }) {
    const reduce = useReducedMotion();
    const row = reduce ? items : [...items, ...items];
    return (
        <div className={cn('group/marquee relative', !reduce && 'mask-fade-x overflow-hidden')}>
            <ul
                aria-label={label}
                style={{ '--marquee-duration': `${duration}s` }}
                className={
                    reduce
                        ? 'flex flex-wrap justify-center gap-4'
                        : cn('flex w-max group-hover/marquee:[animation-play-state:paused] [&>li]:mr-4', reverse ? 'animate-marquee-reverse' : 'animate-marquee')
                }
            >
                {row.map((c, i) => (
                    <li
                        key={`${c.name}-${i}`}
                        aria-hidden={i >= items.length ? 'true' : undefined}
                        title={c.name}
                        className="group/logo relative flex h-24 w-44 shrink-0 items-center justify-center rounded-card bg-white px-6 ring-1 ring-kdm-line transition-shadow duration-300 hover:shadow-soft"
                    >
                        <img
                            src={c.logoSm}
                            srcSet={`${c.logoSm} 1x, ${c.logo} 2x`}
                            alt={c.name}
                            loading="lazy"
                            decoding="async"
                            className="max-h-14 max-w-full object-contain transition-transform duration-500 group-hover/logo:scale-105"
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

// The two company brochures from the old home page.
export function BrochureLinks({ className }) {
    return (
        <ul className={cn('grid gap-3 sm:grid-cols-2', className)}>
            {company.brochures.map((b, i) => (
                <li key={b.title}>
                    <a
                        href={b.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-full items-center gap-4 rounded-card bg-white p-4 ring-1 ring-kdm-line transition-shadow duration-300 hover:shadow-soft"
                    >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-kdm-surface text-kdm-blue transition-colors duration-300 group-hover:bg-kdm-blue group-hover:text-white">
                            <FileDown className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                            <span className="t-label block text-kdm-muted">Resource {String(i + 1).padStart(2, '0')} · PDF</span>
                            <span className="mt-1 block font-semibold text-kdm-ink">{b.title}</span>
                        </span>
                        <SlideArrow className="ml-auto shrink-0 text-kdm-blue" />
                    </a>
                </li>
            ))}
        </ul>
    );
}

// The closing call to action on most pages: light, measured, direct.
export function ContactBand({
    title = ["Let's build something", 'that lasts.'],
    text = 'Talk to our team about consultancy, testing, surveys or structural health monitoring for your project.',
}) {
    const hq = contact.branches[0];
    return (
        <section className="relative isolate overflow-hidden bg-kdm-surface py-20 sm:py-28">
            <BlueprintGrid />
            <div aria-hidden="true" className="absolute -bottom-40 -left-20 -z-10 h-96 w-96 rounded-full bg-kdm-yellow/20 blur-3xl" />
            <div aria-hidden="true" className="absolute -right-20 -top-32 -z-10 h-96 w-96 rounded-full bg-kdm-cyan/15 blur-3xl" />
            <Container className="relative">
                <MeasureRule className="mb-14" at="78%" />
                <div className="grid items-end gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <SectionLabel>Start a conversation</SectionLabel>
                        <RevealLines lines={Array.isArray(title) ? title : [title]} className="t-h1 mt-5" />
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                            className="t-lead mt-6 max-w-2xl"
                        >
                            {text}
                        </motion.p>
                    </div>
                    <div className="flex flex-col gap-5 lg:col-span-4 lg:items-end">
                        <ButtonLink to="/contact">Start a conversation</ButtonLink>
                        <div className="flex flex-col gap-2 text-sm text-kdm-graphite lg:items-end">
                            <a href={telHref(hq.phone)} className="inline-flex items-center gap-2 hover:text-kdm-blue">
                                <Phone className="h-4 w-4 text-kdm-red" aria-hidden="true" /> {formatPhone(hq.phone)}
                            </a>
                            <a href={`mailto:${hq.email}`} className="inline-flex items-center gap-2 break-all hover:text-kdm-blue">
                                <Mail className="h-4 w-4 shrink-0 text-kdm-red" aria-hidden="true" /> {hq.email}
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
