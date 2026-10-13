import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';

// The KDM engineering motion language: GRID · LINE · NODE · MEASURE · SIGNAL.
// Small, reusable drawing elements that every section builds on, so the
// whole site reads as one engineered system rather than a set of pages.

// GRID — the blueprint sheet behind hero areas. Pass motion values to let it
// drift with the cursor.
export function BlueprintGrid({ className, style, fade = true }) {
    return (
        <motion.div
            aria-hidden="true"
            style={style}
            className={cn('pointer-events-none absolute inset-0 bg-blueprint', fade && 'mask-fade-radial', className)}
        />
    );
}

// MEASURE — a ruler that draws itself across the page as a section enters,
// with the yellow marker of the logo's gauge travelling to `at`.
export function MeasureRule({ className, at = '62%', label, tone = 'ink' }) {
    return (
        <div aria-hidden="true" className={cn('relative h-4', className)}>
            <motion.div
                className={cn('absolute inset-x-0 top-1 h-3 bg-ruler', tone === 'light' ? 'opacity-40 invert' : 'opacity-50')}
                initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 1.6, ease: EASE }}
            />
            <motion.span
                className="absolute -top-1 -ml-[5px] h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-kdm-red"
                initial={{ left: '0%', opacity: 0 }}
                whileInView={{ left: at, opacity: 1 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
            />
            {label && (
                <span className={cn('t-label absolute right-0 top-5', tone === 'light' ? 'text-white/60' : 'text-kdm-muted')}>
                    {label}
                </span>
            )}
        </div>
    );
}

// Registration corners, like the crop marks on a drawing sheet.
export function CornerMarks({ className, color = 'border-kdm-ink/40', size = 'h-3 w-3' }) {
    const base = cn('pointer-events-none absolute', size, color);
    return (
        <span aria-hidden="true" className={className}>
            <span className={cn(base, '-left-2 -top-2 border-l border-t')} />
            <span className={cn(base, '-right-2 -top-2 border-r border-t')} />
            <span className={cn(base, '-bottom-2 -left-2 border-b border-l')} />
            <span className={cn(base, '-bottom-2 -right-2 border-b border-r')} />
        </span>
    );
}

// A framed image or diagram with crop marks and an optional figure caption.
export function Figure({ children, caption, className, frameClassName }) {
    return (
        <figure className={cn('relative', className)}>
            <div className={cn('relative', frameClassName)}>
                {children}
                <CornerMarks />
            </div>
            {caption && <figcaption className="t-label mt-4 text-kdm-muted">{caption}</figcaption>}
        </figure>
    );
}

// NODE — a sensor point with a slow ping, for SVG drawings.
export function SensorNode({ x, y, active = false, color = 'rgb(var(--kdm-red))', r = 5 }) {
    return (
        <g transform={`translate(${x} ${y})`}>
            <circle
                r={r}
                fill={color}
                className="motion-safe:animate-ping-ring"
                style={{ transformBox: 'fill-box', transformOrigin: 'center', animationDelay: `${((x * 7 + y * 3) % 2000) / 1000}s` }}
            />
            <circle r={active ? r + 3 : r} fill="white" stroke={color} strokeWidth={2} style={{ transition: 'r 0.3s' }} />
            <circle r={active ? r : r - 2.5} fill={color} style={{ transition: 'r 0.3s' }} />
        </g>
    );
}

// SIGNAL — an endlessly scrolling trace. Every component of the curve has a
// whole number of cycles across the width, so two copies join seamlessly.
const SIGNALS = {
    vibration: [[3, 0.18], [11, 0.32], [23, 0.22], [37, 0.14], [53, 0.08]],
    drift: [[1, 0.55], [4, 0.08], [9, 0.04]],
    cyclic: [[2, 0.12], [6, 0.5], [12, 0.12]],
    diurnal: [[1, 0.7], [3, 0.06]],
};

function signalY(type, t) {
    if (type === 'step') {
        // Load steps: hold, ramp, hold.
        const phase = (t * 4) % 1;
        const level = Math.floor(t * 4) % 2 === 0 ? -0.45 : 0.45;
        const ramp = phase < 0.15 ? phase / 0.15 : 1;
        const prev = -level;
        return prev + (level - prev) * ramp + 0.04 * Math.sin(2 * Math.PI * 40 * t);
    }
    if (type === 'packets') {
        // Bursts of data arriving at the aggregator.
        const phase = (t * 6) % 1;
        return phase > 0.1 && phase < 0.32 ? 0.55 * Math.sin(2 * Math.PI * 60 * t) : 0.02 * Math.sin(2 * Math.PI * 30 * t);
    }
    return (SIGNALS[type] ?? SIGNALS.vibration).reduce((sum, [k, a]) => sum + a * Math.sin(2 * Math.PI * k * t + k), 0);
}

function buildSignalPath(type, width, height, samples = 360) {
    const mid = height / 2;
    const amp = height * 0.42;
    let d = '';
    for (let i = 0; i <= samples; i += 1) {
        const t = i / samples;
        const y = mid - signalY(type, t) * amp;
        d += `${i === 0 ? 'M' : 'L'}${(t * width).toFixed(1)} ${y.toFixed(1)}`;
    }
    return d;
}

export function Waveform({ type = 'vibration', className, color = 'rgb(var(--kdm-cyan))', speed = '7s', strokeWidth = 1.6 }) {
    const W = 600;
    const H = 80;
    const d = useMemo(() => buildSignalPath(type, W, H), [type]);
    return (
        <div aria-hidden="true" className={cn('relative overflow-hidden', className)}>
            <svg
                viewBox={`0 0 ${W * 2} ${H}`}
                preserveAspectRatio="none"
                className="block h-full w-[200%] motion-safe:animate-wave-scroll"
                style={{ animationDuration: speed }}
            >
                <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
                <path d={d} transform={`translate(${W} 0)`} fill="none" stroke={color} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
            </svg>
        </div>
    );
}

// The half gear with its measuring scale and rising sun — the KDM logo's
// central motif, rebuilt as line work.
export function gearArcPath(cx, cy, inner, outer, teeth = 9) {
    const step = Math.PI / teeth;
    let d = '';
    for (let i = 0; i < teeth; i += 1) {
        const a0 = Math.PI + i * step;
        const a1 = a0 + step * 0.22;
        const a2 = a0 + step * 0.78;
        const a3 = a0 + step;
        const p = (r, a) => `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
        d += `${i === 0 ? 'M' : 'L'}${p(inner, a0)} L${p(outer, a1)} L${p(outer, a2)} L${p(inner, a3)} `;
    }
    return d.trim();
}

export function scaleTicks(cx, cy, r, count = 37, major = 6) {
    return Array.from({ length: count }, (_, i) => {
        const a = Math.PI + (i / (count - 1)) * Math.PI;
        const len = i % major === 0 ? 10 : 5;
        return {
            x1: cx + r * Math.cos(a),
            y1: cy + r * Math.sin(a),
            x2: cx + (r - len) * Math.cos(a),
            y2: cy + (r - len) * Math.sin(a),
            major: i % major === 0,
        };
    });
}

export { SectionBubble, CoordinateMarker, DimensionLine, TitleBlock, SheetZones, Annotation } from './drawing';
export { default as ServiceDiagram } from './ServiceDiagram';
