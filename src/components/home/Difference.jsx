import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { strengths } from '@/content/home';
import { Container, SectionLabel } from '@/components/site/primitives';

// 07 — Why KDM? Three words carry the argument. As each strength scrolls
// through the middle of the screen, the word it belongs to lights up.

const THEMES = ['Experience', 'Technology', 'People'];
const THEME_COLOUR = { Experience: 'text-kdm-blue', Technology: 'text-kdm-cyan-ink', People: 'text-kdm-red' };
const THEME_BAR = { Experience: 'bg-kdm-blue', Technology: 'bg-kdm-cyan', People: 'bg-kdm-red' };

function Strength({ item, index, onActive }) {
    const ref = useRef(null);
    const inCentre = useInView(ref, { margin: '-45% 0px -45% 0px' });
    useEffect(() => {
        if (inCentre) onActive(item.theme);
    }, [inCentre, item.theme, onActive]);

    return (
        <motion.li
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative border-t border-kdm-line py-8 sm:py-10"
        >
            <span aria-hidden="true" className={cn('absolute -top-px left-0 h-[2px] w-16', THEME_BAR[item.theme])} />
            <div className="flex items-baseline gap-5">
                <span className="t-num t-label text-kdm-muted">{String(index + 1).padStart(2, '0')}</span>
                <div>
                    <p className={cn('t-label', THEME_COLOUR[item.theme])}>{item.theme}</p>
                    <h3 className="t-h3 mt-2">{item.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-kdm-graphite">{item.text}</p>
                </div>
            </div>
        </motion.li>
    );
}

export default function Difference() {
    const [theme, setTheme] = useState(THEMES[0]);

    return (
        <section aria-labelledby="why-title" className="relative bg-white py-20 sm:py-28 lg:py-32">
            <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-6">
                    <div className="lg:sticky lg:top-32">
                        <SectionLabel index="07">Why KDM?</SectionLabel>
                        <h2 id="why-title" className="mt-6 font-display text-[clamp(2.8rem,1rem+6vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
                            {THEMES.map((t) => (
                                <span
                                    key={t}
                                    className={cn(
                                        'block transition-colors duration-700 ease-kdm',
                                        t === theme ? THEME_COLOUR[t] : 'text-kdm-ink/50',
                                    )}
                                >
                                    {t}.
                                </span>
                            ))}
                        </h2>
                        <p className="t-lead mt-8 max-w-md">
                            A well-structured quality system, the right instruments, and engineers who know what the readings
                            mean.
                        </p>
                    </div>
                </div>
                <ol className="lg:col-span-6 lg:pt-6">
                    {strengths.map((s, i) => (
                        <Strength key={s.title} item={s} index={i} onActive={setTheme} />
                    ))}
                </ol>
            </Container>
        </section>
    );
}
