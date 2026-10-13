import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FileDown, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { clients } from '@/content/clients';
import { company, contact, formatPhone, telHref } from '@/content/site';
import { MeasureRule } from '@/components/engineering';
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

// The closing call to action on most pages: a framed sheet with a red
// datum rule, a portal frame drawn in construction lines, and direct lines
// to the head office.
function PortalFrame() {
    const draw = (i) => ({
        hidden: { pathLength: 0 },
        show: { pathLength: 1, transition: { duration: 1.3, ease: EASE, delay: 0.12 * i } },
    });
    return (
        <motion.svg
            aria-hidden="true"
            viewBox="0 0 260 180"
            fill="none"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="h-auto w-full max-w-[300px]"
        >
            <motion.path d="M10 170 H250" stroke="rgb(var(--kdm-ink) / 0.5)" strokeWidth="1.4" variants={draw(0)} />
            <motion.path d="M40 170 V60 L130 20 L220 60 V170" stroke="rgb(var(--kdm-blue))" strokeWidth="1.8" variants={draw(1)} />
            <motion.path d="M40 60 H220 M130 20 V170" stroke="rgb(var(--kdm-blue) / 0.35)" strokeWidth="1" strokeDasharray="4 4" variants={draw(2)} />
            <motion.path d="M40 60 L130 170 L220 60" stroke="rgb(var(--kdm-cyan) / 0.6)" strokeWidth="1" variants={draw(3)} />
            <motion.path d="M24 178 l16 -8 16 8 M204 178 l16 -8 16 8" stroke="rgb(var(--kdm-ink) / 0.5)" strokeWidth="1.2" variants={draw(4)} />
            <motion.circle cx="130" cy="20" r="4" fill="rgb(var(--kdm-red))" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 1.2 } } }} />
        </motion.svg>
    );
}

export function ContactBand({
    title = ["Let's build something", 'that lasts.'],
    text = 'Talk to our team about structural health monitoring, materials testing or geo-technical investigation for your project.',
    index,
}) {
    const hq = contact.branches[0];
    return (
        <section className="relative isolate overflow-hidden border-t border-kdm-line bg-kdm-paper py-20 sm:py-28">
            <Container className="relative">
                <div className="relative grid items-end gap-12 border border-kdm-ink/15 bg-white/70 p-6 sm:p-10 lg:grid-cols-12 lg:p-14">
                    <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-kdm-red" />
                    <div className="lg:col-span-8">
                        <SectionLabel index={index}>Start a conversation</SectionLabel>
                        <RevealLines lines={Array.isArray(title) ? title : [title]} className="t-h1 mt-6" />
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                            className="t-lead mt-6 max-w-2xl"
                        >
                            {text}
                        </motion.p>
                        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                            <ButtonLink to="/contact">Send an enquiry</ButtonLink>
                            <div className="flex flex-col gap-1.5 text-sm text-kdm-graphite">
                                <a href={telHref(hq.phone)} className="t-num inline-flex items-center gap-2 hover:text-kdm-blue">
                                    <Phone className="h-4 w-4 text-kdm-red" aria-hidden="true" /> {formatPhone(hq.phone)}
                                </a>
                                <a href={`mailto:${hq.email}`} className="inline-flex items-center gap-2 break-all hover:text-kdm-blue">
                                    <Mail className="h-4 w-4 shrink-0 text-kdm-red" aria-hidden="true" /> {hq.email}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden justify-end lg:col-span-4 lg:flex">
                        <PortalFrame />
                    </div>
                </div>
                <MeasureRule className="mt-10" at="78%" />
            </Container>
        </section>
    );
}
