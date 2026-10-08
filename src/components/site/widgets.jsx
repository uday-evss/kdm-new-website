import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileDown, Phone, Mail } from 'lucide-react';
import { clients } from '@/content/clients';
import { company, contact, formatPhone, telHref } from '@/content/site';
import { Container, ButtonLink, Img } from './primitives';

// Counts up to `value` the first time it scrolls into view.
export function StatCounter({ value, suffix = '', duration = 1600 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const reduce = useReducedMotion();
    const [shown, setShown] = useState(reduce ? value : 0);

    useEffect(() => {
        if (!inView || reduce) return undefined;
        let frame;
        const start = performance.now();
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            setShown(Math.round(value * (1 - (1 - t) ** 3)));
            if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, reduce, value, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {shown.toLocaleString('en-IN')}
            {suffix}
        </span>
    );
}

// An endless, slowly scrolling row of client logos (static grid-free row for
// people who prefer reduced motion). Hovering pauses it.
export function ClientMarquee({ items = clients.filter((c) => c.featured) }) {
    const reduce = useReducedMotion();
    const row = reduce ? items : [...items, ...items];
    return (
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <ul
                className={reduce ? 'flex flex-wrap justify-center gap-6' : 'flex w-max gap-6 animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused]'}
                aria-label="Some of our clients"
            >
                {row.map((c, i) => (
                    <li
                        key={`${c.name}-${i}`}
                        aria-hidden={i >= items.length ? 'true' : undefined}
                        className="flex h-24 w-40 shrink-0 items-center justify-center rounded-2xl border border-[#E6EAF0] bg-white px-5"
                    >
                        <img src={c.logo} alt={c.name} loading="lazy" decoding="async" className="max-h-16 max-w-full object-contain" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

// The two company brochures from the old home page.
export function BrochureLinks({ tone = 'light' }) {
    return (
        <ul className="grid gap-4 sm:grid-cols-2">
            {company.brochures.map((b) => (
                <li key={b.title}>
                    <a
                        href={b.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                            tone === 'dark'
                                ? 'group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors'
                                : 'group flex items-center gap-4 rounded-2xl border border-[#E6EAF0] bg-white p-5 hover:border-[#C4161C]/40 hover:shadow-lg transition-all'
                        }
                    >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C4161C] text-white">
                            <FileDown className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <span>
                            <span className={`block font-semibold ${tone === 'dark' ? 'text-white' : 'text-[#111111]'}`}>{b.title}</span>
                            <span className={`text-sm ${tone === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Download brochure (PDF)</span>
                        </span>
                        <ArrowRight className="ml-auto h-5 w-5 text-[#C4161C] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </a>
                </li>
            ))}
        </ul>
    );
}

// The closing call to action on most pages.
export function ContactBand({ title = 'Have a project in mind?', text = 'Talk to our team about consultancy, testing, surveys or structural health monitoring for your project.' }) {
    const hq = contact.branches[0];
    return (
        <section className="relative overflow-hidden bg-[#0E3A5D]">
            <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C4161C]/30 blur-3xl" />
            <Container className="relative py-16 sm:py-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
                <div className="max-w-2xl">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{title}</h2>
                    <p className="mt-4 text-lg text-blue-100/80">{text}</p>
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-100">
                        <a href={telHref(hq.phone)} className="inline-flex items-center gap-2 hover:text-white">
                            <Phone className="h-4 w-4" aria-hidden="true" /> {formatPhone(hq.phone)}
                        </a>
                        <a href={`mailto:${hq.email}`} className="inline-flex items-center gap-2 break-all hover:text-white">
                            <Mail className="h-4 w-4" aria-hidden="true" /> {hq.email}
                        </a>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <ButtonLink to="/contact" variant="light">
                        Contact Us <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </ButtonLink>
                    <ButtonLink to="/services" variant="ghost-light">
                        Our Services
                    </ButtonLink>
                </div>
            </Container>
        </section>
    );
}

// A photo card linking somewhere (services, projects).
export function ImageCard({ to, image, title, eyebrow, icon: Icon, sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' }) {
    return (
        <Link
            to={to}
            className="group relative flex aspect-[4/3] overflow-hidden rounded-2xl bg-[#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4161C]"
        >
            <Img image={image} alt="" sizes={sizes} className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-transparent" />
            <span className="relative mt-auto flex w-full items-end justify-between gap-4 p-6">
                <span>
                    {Icon && (
                        <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#C4161C] text-white">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                    )}
                    {eyebrow && <span className="block text-xs font-semibold uppercase tracking-wider text-[#F2B705]">{eyebrow}</span>}
                    <span className="mt-1 block text-lg font-semibold leading-snug text-white">{title}</span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors group-hover:bg-[#C4161C]">
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </span>
            </span>
        </Link>
    );
}
