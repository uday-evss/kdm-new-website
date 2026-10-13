import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE, VIEWPORT } from '@/lib/motion';

// One small, clearly illustrative line drawing per service — the subject of
// the discipline drawn the way an engineer would sketch it (a cube under
// load, soil strata with a bore hole, a pavement section…). Labels name
// parts, never values. Lines draw themselves when shown.

const INK = 'rgb(var(--kdm-blue))';
const SOFT = 'rgb(var(--kdm-blue) / 0.35)';
const RED = 'rgb(var(--kdm-red))';
const CYAN = 'rgb(var(--kdm-cyan))';
const YELLOW = 'rgb(var(--kdm-yellow))';

const draw = (i = 0) => ({
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 1.1, ease: EASE, delay: 0.08 * i }, opacity: { duration: 0.01, delay: 0.08 * i } } },
});
const fade = (i = 0) => ({ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5, delay: 0.4 + 0.08 * i } } });

function P({ d, i = 0, stroke = INK, w = 1.4, dash, fill = 'none' }) {
    return <motion.path d={d} stroke={stroke} strokeWidth={w} strokeDasharray={dash} fill={fill} variants={draw(i)} vectorEffect="non-scaling-stroke" />;
}

function L({ x, y, children, anchor = 'start', i = 0, color = 'rgb(var(--kdm-muted))' }) {
    return (
        <motion.text x={x} y={y} textAnchor={anchor} fontSize="9" letterSpacing="0.8" className="font-mono uppercase" fill={color} variants={fade(i)}>
            {children}
        </motion.text>
    );
}

const hatch = (x0, y0, x1, y1, step = 8) =>
    Array.from({ length: Math.ceil((x1 - x0 + (y1 - y0)) / step) }, (_, k) => {
        const s = x0 + k * step;
        return `M${Math.max(x0, s - (y1 - y0))} ${Math.min(y1, y0 + (s - x0))} L${Math.min(s, x1)} ${y0 + Math.max(0, s - x1)}`;
    }).join(' ');

const DIAGRAMS = {
    'materials-testing': () => (
        <>
            <P d="M110 40 H210 V52 H110 Z" i={0} />
            <P d="M110 160 H210 V172 H110 Z" i={1} />
            <P d="M120 64 H200 V148 H120 Z" i={2} w={1.8} />
            <P d={hatch(120, 64, 200, 148, 10)} i={3} stroke={SOFT} w={1} />
            <P d="M160 10 V36 M154 28 L160 36 L166 28" i={4} stroke={RED} />
            <P d="M160 200 V176 M154 184 L160 176 L166 184" i={4} stroke={RED} />
            <P d="M230 64 H270 M230 148 H270 M250 64 V148" i={5} stroke={SOFT} w={1} />
            <L x={172} y={22} i={1}>Load</L>
            <L x={256} y={110} i={2}>Specimen</L>
            <L x={40} y={50} i={3}>Platen</L>
            <P d="M80 47 H108" i={6} stroke={SOFT} w={1} dash="2 3" />
        </>
    ),
    'topo-surveys': () => (
        <>
            {[0, 1, 2, 3, 4].map((k) => (
                <P
                    key={k}
                    i={k}
                    stroke={k === 4 ? INK : SOFT}
                    d={`M${160 - 120 + k * 18} 100 C ${160 - 110 + k * 16} ${30 + k * 12}, ${160 + 90 - k * 14} ${24 + k * 12}, ${160 + 125 - k * 20} ${92 + k * 2} S ${160 + 40 - k * 6} ${178 - k * 12}, ${160 - 120 + k * 18} 100 Z`}
                />
            ))}
            <P d="M60 170 L70 152 L80 170 Z" i={5} stroke={RED} />
            <P d="M70 152 L238 92" i={6} stroke={RED} dash="4 4" />
            <P d="M238 70 V120" i={7} w={2} />
            <L x={60} y={186} i={2}>Station</L>
            <L x={244} y={68} i={3}>Staff</L>
            <L x={196} y={150} i={4}>Contour</L>
        </>
    ),
    'geotechnical-investigations': () => (
        <>
            <P d="M20 50 H300" i={0} w={1.8} />
            <P d="M20 95 C 90 88, 200 102, 300 92" i={1} stroke={SOFT} />
            <P d="M20 140 C 100 150, 220 132, 300 142" i={2} stroke={SOFT} />
            <P d={hatch(20, 150, 300, 196, 12)} i={3} stroke={SOFT} w={1} />
            <P d="M150 30 V190 M170 30 V190" i={4} w={1.6} />
            <P d="M140 30 H180" i={5} stroke={RED} w={2} />
            <P d="M150 120 H170 M150 160 H170" i={6} stroke={RED} />
            <P d="M230 74 L238 84 L246 74 Z M224 70 H252" i={6} stroke={CYAN} />
            <L x={30} y={74} i={1}>Fill</L>
            <L x={30} y={122} i={2}>Clay</L>
            <L x={30} y={186} i={3}>Rock</L>
            <L x={178} y={124} i={4}>Sample</L>
            <L x={258} y={74} i={5}>GWL</L>
            <L x={186} y={40} i={6}>Bore hole</L>
        </>
    ),
    'traffic-surveys': () => (
        <>
            <P d="M10 60 H310 M10 160 H310" i={0} w={1.8} />
            <P d="M10 110 H310" i={1} stroke={YELLOW} w={2} dash="14 10" />
            <P d="M60 76 h44 v22 h-44 Z M190 76 h30 v20 h-30 Z" i={2} />
            <P d="M120 124 h56 v26 h-56 Z M250 128 h34 v20 h-34 Z" i={3} />
            <P d="M150 60 V160" i={4} stroke={RED} dash="3 3" />
            <P d="M140 34 h20 v18 h-20 Z" i={5} stroke={RED} />
            <P d="M240 87 H272 M266 82 L272 87 L266 92" i={6} stroke={CYAN} />
            <P d="M110 137 H78 M84 132 L78 137 L84 142" i={6} stroke={CYAN} />
            <L x={166} y={46} i={2}>Counter</L>
            <L x={156} y={176} i={3}>Detection line</L>
        </>
    ),
    'highways-bridges-buildings-irrigation': () => (
        <>
            <P d="M10 120 H310" i={0} w={1.8} />
            <P d="M40 120 V170 M120 120 V170 M200 120 V170 M280 120 V170" i={1} />
            <P d="M10 112 H310" i={2} stroke={SOFT} />
            <P d="M10 175 C 60 168, 110 182, 160 175 S 260 168, 310 175" i={3} stroke={CYAN} />
            <P d="M230 112 V40 H280 V112 M240 56 h10 v10 h-10 Z M260 56 h10 v10 h-10 Z M240 78 h10 v10 h-10 Z M260 78 h10 v10 h-10 Z" i={4} stroke={SOFT} />
            <P d="M20 70 L80 70 M20 70 L30 64 M80 70 L70 64" i={5} stroke={RED} />
            <L x={22} y={60} i={1}>Highway</L>
            <L x={130} y={102} i={2}>Bridge deck</L>
            <L x={130} y={194} i={3}>Canal</L>
            <L x={226} y={34} i={4}>Building</L>
        </>
    ),
    'pavement-investigation-design': () => (
        <>
            <P d="M20 70 H300" i={0} w={2} />
            <P d="M20 88 H300" i={1} stroke={SOFT} />
            <P d="M20 116 H300" i={2} stroke={SOFT} />
            <P d="M20 150 H300" i={3} stroke={SOFT} />
            <P d={hatch(20, 150, 300, 192, 12)} i={4} stroke={SOFT} w={1} />
            <P d="M146 30 h28 v12 h-28 Z M160 42 V66" i={5} stroke={RED} />
            <P d="M60 70 C 120 70, 135 92, 160 92 S 200 70, 260 70" i={6} stroke={CYAN} dash="3 3" />
            <L x={24} y={64} i={1}>Surface</L>
            <L x={24} y={106} i={2}>Base</L>
            <L x={24} y={140} i={3}>Sub-base</L>
            <L x={24} y={176} i={4}>Subgrade</L>
            <L x={182} y={40} i={5}>FWD load</L>
            <L x={226} y={100} i={6}>Deflection</L>
        </>
    ),
    'structural-condition-assessment': () => (
        <>
            <P d="M60 40 V190 M160 40 V190 M260 40 V190" i={0} w={1.8} />
            <P d="M50 50 H270 M50 120 H270" i={1} w={1.8} />
            <P d="M88 128 l6 10 -5 8 7 12 M196 58 l-4 9 6 7 -3 10" i={2} stroke={RED} />
            <P d="M150 130 h20 v60 h-20 Z" i={3} stroke={CYAN} dash="4 3" />
            <P d="M200 160 L232 146 M232 146 h18 v-10 h-18 Z" i={4} />
            <L x={96} y={176} i={2}>Crack</L>
            <L x={178} y={204} i={3}>Jacket</L>
            <L x={226} y={132} i={4}>NDT</L>
        </>
    ),
    'kdm-knowledge-share-center': () => (
        <>
            <P d="M60 30 H260 V120 H60 Z" i={0} w={1.8} />
            <P d="M90 92 H230 M110 92 V70 M210 92 V70 M110 70 H210" i={1} stroke={SOFT} />
            <P d="M160 70 V48 M152 56 L160 48 L168 56" i={2} stroke={RED} />
            <P d="M160 120 V140" i={3} />
            {[70, 110, 150, 190, 230].map((x, k) => (
                <P key={x} d={`M${x - 10} 186 a10 10 0 0 1 20 0 M${x} 168 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0`} i={4 + k * 0.4} stroke={SOFT} />
            ))}
            <L x={172} y={52} i={2}>Load</L>
            <L x={66} y={24} i={1}>Lecture</L>
        </>
    ),
    'structural-health-monitoring': () => (
        <>
            <P d="M20 90 H300 M20 110 H300" i={0} w={1.8} />
            <P d="M90 110 L84 180 H112 L106 110 M210 110 L204 180 H232 L226 110" i={1} />
            <P d="M20 170 C 70 164, 120 176, 170 170 S 260 164, 300 170" i={2} stroke={CYAN} />
            {[
                [60, 110],
                [150, 110],
                [218, 140],
                [260, 90],
            ].map(([x, y], k) => (
                <motion.circle key={k} cx={x} cy={y} r="5" fill="white" stroke={RED} strokeWidth="1.6" variants={fade(k)} />
            ))}
            <P d="M60 115 V136 H32 V60 H150 V105 M260 85 V60 H150" i={3} stroke={RED} dash="3 3" w={1} />
            <P d="M18 44 h28 v16 h-28 Z" i={4} />
            <L x={52} y={40} i={3}>Aggregator</L>
            <L x={226} y={156} i={4}>Tilt</L>
            <L x={266} y={80} i={5}>Accel.</L>
        </>
    ),
};

export default function ServiceDiagram({ slug, className, play }) {
    const render = DIAGRAMS[slug];
    if (!render) return null;
    const trigger = play === undefined ? { whileInView: 'show', viewport: VIEWPORT } : { animate: play ? 'show' : 'hidden' };
    return (
        <motion.svg
            viewBox="0 0 320 210"
            fill="none"
            role="img"
            aria-label="Illustrative line drawing"
            initial="hidden"
            {...trigger}
            className={cn('block h-auto w-full', className)}
        >
            {render()}
        </motion.svg>
    );
}

export const hasDiagram = (slug) => Boolean(DIAGRAMS[slug]);
