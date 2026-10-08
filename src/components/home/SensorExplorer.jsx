import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { sensorGuide } from '@/content/shm';
import { BlueprintGrid, Waveform } from '@/components/engineering';

// An instrumented girder bridge. Each sensor is a real button placed on the
// drawing; choosing one (hover, focus or tap) shows what it measures, why it
// matters, and an illustrative trace of the kind of signal it records.
// Used on the home page and on the SHM page.

const W = 1000;
const H = 330;
const DECK_TOP = 140;
const GIRDER_BOTTOM = 178;
const WATER = 262;
const PIERS = [250, 500, 750];

// Sensor positions on the 1000 × 330 drawing.
const PLACES = {
    accelerometer: [375, GIRDER_BOTTOM],
    tilt: [500, 222],
    strain: [610, 168],
    displacement: [130, GIRDER_BOTTOM + 30],
    'load-cell': [750, GIRDER_BOTTOM + 6],
    temperature: [880, DECK_TOP - 4],
    'water-level': [262, WATER],
    aggregator: [48, 238],
};

function GirderBridge({ activeId, live }) {
    const ink = 'rgb(var(--kdm-navy) / 0.55)';
    const faint = 'rgb(var(--kdm-navy) / 0.2)';
    const [ax, ay] = PLACES[activeId];
    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" fill="none" aria-hidden="true">
            {/* banks */}
            <path d={`M0 ${GIRDER_BOTTOM + 4} L40 ${GIRDER_BOTTOM + 4} L120 ${H} L0 ${H} Z`} fill="rgb(var(--kdm-yellow) / 0.12)" stroke={faint} />
            <path d={`M1000 ${GIRDER_BOTTOM + 4} L960 ${GIRDER_BOTTOM + 4} L880 ${H} L1000 ${H} Z`} fill="rgb(var(--kdm-yellow) / 0.12)" stroke={faint} />
            {/* water */}
            <rect x="40" y={WATER} width="920" height={H - WATER} fill="rgb(var(--kdm-cyan) / 0.08)" />
            {[0, 12, 24].map((o, i) => (
                <path
                    key={o}
                    d={`M60 ${WATER + o} ${Array.from({ length: 18 }, (_, k) => `q 25 ${k % 2 ? 4 : -4} 50 0`).join(' ')}`}
                    stroke={`rgb(var(--kdm-cyan) / ${0.55 - i * 0.15})`}
                    strokeWidth="1.2"
                />
            ))}
            {/* piers */}
            {PIERS.map((x) => (
                <g key={x}>
                    <path d={`M${x - 22} ${GIRDER_BOTTOM + 8} L${x + 22} ${GIRDER_BOTTOM + 8} L${x + 16} ${H - 22} L${x - 16} ${H - 22} Z`} fill="white" stroke={ink} strokeWidth="1.4" />
                    <rect x={x - 30} y={H - 22} width="60" height="12" fill="white" stroke={ink} strokeWidth="1.4" />
                    <rect x={x - 26} y={GIRDER_BOTTOM} width="52" height="8" fill="rgb(var(--kdm-mist))" stroke={ink} strokeWidth="1.2" />
                </g>
            ))}
            {/* girder */}
            <rect x="20" y={DECK_TOP} width="960" height={GIRDER_BOTTOM - DECK_TOP} fill="white" stroke={ink} strokeWidth="1.6" />
            {Array.from({ length: 24 }, (_, k) => (
                <line key={k} x1={40 + k * 40} x2={40 + k * 40} y1={DECK_TOP + 6} y2={GIRDER_BOTTOM - 6} stroke={faint} />
            ))}
            {/* rails */}
            <line x1="20" x2="980" y1={DECK_TOP - 6} y2={DECK_TOP - 6} stroke={ink} strokeWidth="2" />
            {/* a train crossing */}
            {live && (
            <g className="motion-reduce:hidden">
                <motion.g initial={{ x: -320 }} animate={{ x: 1100 }} transition={{ duration: 11, ease: 'linear', repeat: Infinity, repeatDelay: 1.5 }}>
                    {[0, 104, 208].map((o) => (
                        <g key={o} transform={`translate(${o} 0)`}>
                            <rect x="0" y={DECK_TOP - 46} width="96" height="34" rx="5" fill="rgb(var(--kdm-blue) / 0.12)" stroke="rgb(var(--kdm-blue) / 0.6)" strokeWidth="1.2" />
                            <circle cx="20" cy={DECK_TOP - 9} r="4" fill="white" stroke="rgb(var(--kdm-blue) / 0.6)" />
                            <circle cx="76" cy={DECK_TOP - 9} r="4" fill="white" stroke="rgb(var(--kdm-blue) / 0.6)" />
                        </g>
                    ))}
                </motion.g>
            </g>
            )}
            {/* data aggregator + cable */}
            <rect x="30" y="226" width="36" height="26" rx="4" fill="white" stroke={ink} strokeWidth="1.4" />
            <path d={`M48 226 L48 ${GIRDER_BOTTOM + 14} L120 ${GIRDER_BOTTOM + 14}`} stroke="rgb(var(--kdm-cyan) / 0.7)" strokeDasharray="4 4" className="motion-safe:animate-dash-flow" />
            {/* displacement sensor stand */}
            <line x1="130" x2="130" y1={GIRDER_BOTTOM + 30} y2={WATER - 6} stroke={ink} strokeWidth="1.4" />
            {/* the active sensor's measurement ring */}
            <motion.circle
                key={activeId}
                cx={ax}
                cy={ay}
                r="34"
                stroke="rgb(var(--kdm-red) / 0.5)"
                strokeDasharray="3 4"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
        </svg>
    );
}

export default function SensorExplorer({ className }) {
    const [activeId, setActiveId] = useState(sensorGuide[0].id);
    const active = sensorGuide.find((s) => s.id === activeId);
    const drawingRef = useRef(null);
    const live = useInView(drawingRef); // only animate the train while it can be seen

    return (
        <div className={cn('grid gap-6 lg:grid-cols-12', className)}>
            <div className="relative overflow-hidden rounded-panel bg-white p-4 shadow-soft ring-1 ring-kdm-line sm:p-6 lg:col-span-8">
                <BlueprintGrid fade={false} className="opacity-50" />
                <div className="relative flex items-center justify-between">
                    <p className="t-label text-kdm-muted">Instrumented girder bridge · elevation</p>
                    <p className="t-label hidden text-kdm-muted sm:block">{sensorGuide.length} sensing points</p>
                </div>
                <div ref={drawingRef} className="relative mt-4">
                    <GirderBridge activeId={activeId} live={live} />
                    {sensorGuide.map((s) => {
                        const [x, y] = PLACES[s.id];
                        const on = s.id === activeId;
                        return (
                            <button
                                key={s.id}
                                type="button"
                                onMouseEnter={() => setActiveId(s.id)}
                                onFocus={() => setActiveId(s.id)}
                                onClick={() => setActiveId(s.id)}
                                aria-pressed={on}
                                aria-label={s.name}
                                style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
                                className="group absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                            >
                                <span
                                    aria-hidden="true"
                                    className={cn('absolute h-3 w-3 rounded-full motion-safe:animate-ping-ring', on ? 'bg-kdm-red' : 'bg-kdm-blue')}
                                />
                                <span
                                    aria-hidden="true"
                                    className={cn(
                                        'relative rounded-full border-2 bg-white transition-all duration-300',
                                        on ? 'h-5 w-5 border-kdm-red' : 'h-3.5 w-3.5 border-kdm-blue group-hover:h-4 group-hover:w-4',
                                    )}
                                />
                            </button>
                        );
                    })}
                </div>
                <div className="relative mt-4 rounded-card bg-kdm-paper p-4 ring-1 ring-kdm-line">
                    <div className="flex items-center justify-between gap-4">
                        <p className="t-label text-kdm-ink">{active.name}</p>
                        <p className="t-label text-kdm-muted">Illustrative signal</p>
                    </div>
                    <Waveform key={active.signal} type={active.signal} className="mt-2 h-14" color="rgb(var(--kdm-blue))" speed="8s" />
                </div>
            </div>

            <div className="lg:col-span-4">
                <ul className="grid grid-cols-2 gap-2" aria-label="Sensors">
                    {sensorGuide.map((s, i) => (
                        <li key={s.id}>
                            <button
                                type="button"
                                onMouseEnter={() => setActiveId(s.id)}
                                onFocus={() => setActiveId(s.id)}
                                onClick={() => setActiveId(s.id)}
                                aria-pressed={s.id === activeId}
                                className={cn(
                                    'flex h-full w-full items-start gap-2 rounded-card px-3 py-2.5 text-left text-[13px] font-medium leading-snug transition-colors duration-300',
                                    s.id === activeId ? 'bg-kdm-blue text-white' : 'bg-white text-kdm-graphite ring-1 ring-kdm-line hover:text-kdm-ink',
                                )}
                            >
                                <span className={cn('t-num pt-px text-[10px]', s.id === activeId ? 'text-kdm-yellow' : 'text-kdm-muted')}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                {s.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 min-h-[250px] rounded-panel bg-white p-6 ring-1 ring-kdm-line" aria-live="polite">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={active.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.3, ease: EASE }}
                        >
                            <h3 className="t-h3">{active.name}</h3>
                            <dl className="mt-4 space-y-4 text-[15px] leading-relaxed">
                                <div>
                                    <dt className="t-label text-kdm-cyan-ink">Measures</dt>
                                    <dd className="mt-1 text-kdm-graphite">{active.measures}</dd>
                                </div>
                                <div>
                                    <dt className="t-label text-kdm-red-ink">Why it matters</dt>
                                    <dd className="mt-1 text-kdm-graphite">{active.why}</dd>
                                </div>
                            </dl>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
