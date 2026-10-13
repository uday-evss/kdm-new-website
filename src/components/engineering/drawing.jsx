import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE, VIEWPORT } from '@/lib/motion';

// Drawing-sheet conventions used across the site: section callouts, title
// blocks, sheet zone markers, coordinate crosses and dimension lines. All
// are decorative (aria-hidden) unless they carry real content passed in by
// the caller — they never invent measurements.

// The architectural section callout: a circle split by a line, with the
// section number above and the sheet code below.
export function SectionBubble({ index, sheet = 'KDM', tone = 'dark', className }) {
    const light = tone === 'light';
    return (
        <span
            aria-hidden="true"
            className={cn(
                'relative inline-flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-full border font-mono leading-none',
                light ? 'border-white/50 text-white' : 'border-kdm-ink/40 text-kdm-ink',
                className,
            )}
        >
            <span className="text-[10px] font-medium">{index}</span>
            <span className={cn('my-[3px] h-px w-full', light ? 'bg-white/50' : 'bg-kdm-ink/40')} />
            <span className={cn('text-[7px] tracking-wider', light ? 'text-white/70' : 'text-kdm-muted')}>{sheet}</span>
        </span>
    );
}

// A small registration cross with an optional grid reference.
export function CoordinateMarker({ label, className, tone = 'dark' }) {
    const light = tone === 'light';
    return (
        <span aria-hidden="true" className={cn('pointer-events-none inline-flex items-center gap-2', className)}>
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                <circle cx="8" cy="8" r="4" stroke={light ? 'rgb(255 255 255 / 0.6)' : 'rgb(var(--kdm-blue) / 0.6)'} />
                <path d="M8 0v16M0 8h16" stroke={light ? 'rgb(255 255 255 / 0.6)' : 'rgb(var(--kdm-blue) / 0.6)'} />
            </svg>
            {label && <span className={cn('t-label', light ? 'text-white/60' : 'text-kdm-muted')}>{label}</span>}
        </span>
    );
}

// A dimension line that draws itself: end ticks, arrowheads and a centred
// label. Use it to name an extent ("Services", "Since 2012") — not to state
// fake measurements.
export function DimensionLine({ label, className, tone = 'dark', play }) {
    const stroke = tone === 'light' ? 'rgb(255 255 255 / 0.6)' : 'rgb(var(--kdm-blue) / 0.55)';
    const trigger = play === undefined ? { whileInView: 'show', viewport: VIEWPORT } : { animate: play ? 'show' : 'hidden' };
    return (
        <motion.div aria-hidden="true" initial="hidden" {...trigger} className={cn('relative flex h-5 items-center', className)}>
            <span className="absolute left-0 top-0 h-full w-px" style={{ background: stroke }} />
            <span className="absolute right-0 top-0 h-full w-px" style={{ background: stroke }} />
            <motion.span
                className="absolute inset-x-0 top-1/2 h-px origin-left"
                style={{ background: stroke }}
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: EASE } } }}
            />
            <svg viewBox="0 0 8 8" className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2" style={{ fill: stroke }}>
                <path d="M0 4 8 0v8z" />
            </svg>
            <svg viewBox="0 0 8 8" className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2" style={{ fill: stroke }}>
                <path d="M8 4 0 0v8z" />
            </svg>
            {label && (
                <motion.span
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.6, duration: 0.4 } } }}
                    className={cn(
                        't-label relative mx-auto px-2',
                        tone === 'light' ? 'bg-kdm-navy text-white/70' : 'bg-[var(--dim-bg,rgb(var(--kdm-paper)))] text-kdm-muted',
                    )}
                >
                    {label}
                </motion.span>
            )}
        </motion.div>
    );
}

// The title block in the corner of a drawing sheet: a bordered grid of
// label/value pairs. Pass only true values.
export function TitleBlock({ rows, className, tone = 'dark' }) {
    const light = tone === 'light';
    return (
        <dl
            className={cn(
                'grid grid-cols-2 border text-left',
                light ? 'border-white/30 bg-white/5' : 'border-kdm-ink/25 bg-white/80',
                className,
            )}
        >
            {rows.map(([label, value], i) => (
                <div
                    key={label}
                    className={cn(
                        'px-3 py-2',
                        light ? 'border-white/30' : 'border-kdm-ink/15',
                        i % 2 === 0 && 'border-r',
                        i >= 2 && 'border-t',
                        rows.length % 2 === 1 && i === rows.length - 1 && 'col-span-2 border-r-0',
                    )}
                >
                    <dt className={cn('t-label !text-[9px]', light ? 'text-white/60' : 'text-kdm-muted')}>{label}</dt>
                    <dd className={cn('mt-0.5 font-mono text-[12px] font-medium', light ? 'text-white' : 'text-kdm-ink')}>{value}</dd>
                </div>
            ))}
        </dl>
    );
}

// Sheet zone markers (A B C … across, 1 2 3 … down) framing a section, as on
// a printed engineering drawing. Hidden on small screens.
export function SheetZones({ cols = 6, rows = 4, className }) {
    const letters = 'ABCDEFGHJK'.slice(0, cols).split('');
    return (
        <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 hidden md:block', className)}>
            <div className="absolute inset-x-6 top-[72px] flex border-t border-kdm-ink/15 lg:top-20">
                {letters.map((l) => (
                    <span key={l} className="t-num flex-1 border-l border-kdm-ink/15 pl-1.5 pt-1 text-[10px] text-kdm-muted first:border-l-0">
                        {l}
                    </span>
                ))}
            </div>
            <div className="absolute bottom-6 left-2 top-[72px] flex flex-col lg:top-20">
                {Array.from({ length: rows }, (_, i) => (
                    <span key={i} className="t-num flex flex-1 items-center text-[10px] text-kdm-muted">
                        {i + 1}
                    </span>
                ))}
            </div>
        </div>
    );
}

// A one-line technical note with a short leader line.
export function Annotation({ children, className, tone = 'dark' }) {
    return (
        <span className={cn('t-label inline-flex items-center gap-2', tone === 'light' ? 'text-white/70' : 'text-kdm-muted', className)}>
            <span aria-hidden="true" className={cn('h-px w-5', tone === 'light' ? 'bg-white/50' : 'bg-kdm-blue/50')} />
            {children}
        </span>
    );
}
