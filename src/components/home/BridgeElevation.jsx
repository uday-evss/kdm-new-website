import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { SensorNode } from '@/components/engineering';

// The hero's line drawing: an elevation of a bowstring-arch railway bridge —
// the structure type of KDM's Rajahmundry (Bridge No. 248) monitoring
// project, whose spans measure 97.552 m — instrumented with sensors, with a
// signal running along the deck. Drawn on a 1440 × 360 sheet.

const DECK = 270;
const CROWN = 110;
const SPAN = 400;
const PIERS = [-280, 120, 520, 920, 1320, 1720];
const CONTROL_Y = 2 * CROWN - DECK; // quadratic control point for that crown

const archY = (t) => DECK - 4 * (DECK - CROWN) * t * (1 - t);

const SENSORS = [
    { id: 'acc', label: 'Accelerometer', x: 720, y: CROWN, lx: 760, ly: 70 },
    { id: 'strain', label: 'Strain', x: 1200, y: (archY(0.7) + DECK) / 2, lx: 1250, ly: 160 },
    { id: 'temp', label: 'Temperature', x: 330, y: DECK, lx: 360, ly: 225 },
    { id: 'tilt', label: 'Tilt', x: 920, y: 312, lx: 950, ly: 330 },
    { id: 'disp', label: 'Displacement', x: 1040, y: DECK, lx: 1010, ly: 225, flip: true },
    { id: 'water', label: 'Water level', x: 470, y: 318, lx: 400, ly: 345, flip: true },
];

const spans = PIERS.slice(0, -1).map((x0) => ({ x0, x1: x0 + SPAN, xm: x0 + SPAN / 2 }));

export default function BridgeElevation({ ready = true, pointerX, pointerY, className }) {
    const svgRef = useRef(null);
    const [active, setActive] = useState(null);
    const idleX = useMotionValue(-1e4);
    const idleY = useMotionValue(-1e4);
    const visible = useInView(svgRef);
    const px = pointerX ?? idleX;
    const py = pointerY ?? idleY;

    // Light up whichever sensor the cursor is near (state only changes when
    // the nearest sensor changes, not on every mouse move).
    const track = () => {
        const svg = svgRef.current;
        if (!svg) return;
        const ctm = svg.getScreenCTM();
        if (!ctm) return;
        const point = new DOMPoint(px.get(), py.get()).matrixTransform(ctm.inverse());
        let nearest = null;
        let best = 110;
        for (const s of SENSORS) {
            const d = Math.hypot(s.x - point.x, s.y - point.y);
            if (d < best) {
                best = d;
                nearest = s.id;
            }
        }
        setActive((current) => (current === nearest ? current : nearest));
    };
    useMotionValueEvent(px, 'change', track);
    useMotionValueEvent(py, 'change', track);

    const [cycle, setCycle] = useState(0);
    useEffect(() => {
        if (active || !visible) return undefined;
        const id = setInterval(() => setCycle((c) => (c + 1) % SENSORS.length), 2600);
        return () => clearInterval(id);
    }, [active, visible]);
    const highlighted = active ?? (ready ? SENSORS[cycle].id : null);

    const draw = (delay, duration = 1.6) => ({
        initial: { pathLength: 0 },
        animate: ready ? { pathLength: 1 } : { pathLength: 0 },
        transition: { duration, ease: EASE, delay },
    });

    const ink = 'rgb(var(--kdm-navy) / 0.42)';
    const faint = 'rgb(var(--kdm-navy) / 0.18)';

    return (
        <svg
            ref={svgRef}
            viewBox="0 0 1440 360"
            preserveAspectRatio="xMidYMax slice"
            className={className}
            fill="none"
            aria-hidden="true"
        >
            {/* Water and river bed contours */}
            {[318, 332, 346].map((y, i) => (
                <motion.path
                    key={y}
                    d={`M-20 ${y} ${Array.from({ length: 30 }, (_, k) => `Q ${k * 50 + 25} ${y + (k % 2 ? 4 : -4)} ${k * 50 + 50} ${y}`).join(' ')}`}
                    stroke={i === 0 ? 'rgb(var(--kdm-cyan) / 0.55)' : 'rgb(var(--kdm-cyan) / 0.22)'}
                    strokeWidth="1.2"
                    {...draw(0.1 + i * 0.1, 2)}
                />
            ))}

            {/* Piers */}
            {PIERS.map((x, i) => (
                <motion.g
                    key={x}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: ready ? 1 : 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.06 }}
                >
                    <rect x={x - 26} y={DECK + 8} width="52" height="10" stroke={ink} strokeWidth="1.4" fill="rgb(var(--kdm-paper))" />
                    <rect x={x - 14} y={DECK + 18} width="28" height="80" stroke={ink} strokeWidth="1.4" fill="rgb(var(--kdm-paper))" />
                </motion.g>
            ))}

            {/* Tie girder (deck) */}
            <motion.path d={`M-20 ${DECK - 8} L1460 ${DECK - 8}`} stroke={ink} strokeWidth="1.6" {...draw(0, 1.4)} />
            <motion.path d={`M-20 ${DECK + 8} L1460 ${DECK + 8}`} stroke={ink} strokeWidth="1.6" {...draw(0.08, 1.4)} />

            {/* Arches and hangers */}
            {spans.map(({ x0, x1, xm }, si) => (
                <g key={x0}>
                    <motion.path d={`M${x0} ${DECK - 8} Q${xm} ${CONTROL_Y} ${x1} ${DECK - 8}`} stroke={ink} strokeWidth="2.2" {...draw(0.35 + si * 0.08, 1.5)} />
                    <motion.path d={`M${x0 + 6} ${DECK - 8} Q${xm} ${CONTROL_Y + 14} ${x1 - 6} ${DECK - 8}`} stroke={faint} strokeWidth="1" {...draw(0.45 + si * 0.08, 1.5)} />
                    {Array.from({ length: 11 }, (_, k) => {
                        const t = (k + 1) / 12;
                        const x = x0 + t * SPAN;
                        return (
                            <line
                                key={k}
                                x1={x}
                                x2={x}
                                y1={archY(t) + 2}
                                y2={DECK - 8}
                                stroke={faint}
                                strokeWidth="1"
                                className={ready ? 'anim-fade' : 'opacity-0'}
                                style={{ animationDelay: `${1.1 + si * 0.08 + k * 0.025}s` }}
                            />
                        );
                    })}
                </g>
            ))}

            {/* Dimension line over one span */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 0.6, delay: 1.5 }}>
                <line x1="520" x2="520" y1="34" y2="58" stroke={ink} strokeWidth="1" />
                <line x1="920" x2="920" y1="34" y2="58" stroke={ink} strokeWidth="1" />
                <motion.path d="M520 46 L920 46" stroke="rgb(var(--kdm-red))" strokeWidth="1.2" {...draw(1.5, 0.9)} />
                <path d="M520 46 l9 -4 v8 z M920 46 l-9 -4 v8 z" fill="rgb(var(--kdm-red))" />
                <rect x="660" y="36" width="120" height="20" fill="rgb(var(--kdm-paper))" />
                <text x="720" y="50" textAnchor="middle" className="fill-kdm-ink font-display" fontSize="13" fontWeight="600" letterSpacing="1.5">
                    SPAN 97.552 m
                </text>
            </motion.g>

            {/* A pulse running along the deck */}
            {ready && visible && (
                <motion.g
                    className="motion-reduce:hidden"
                    initial={{ x: -40 }}
                    animate={{ x: 1480 }}
                    transition={{ duration: 7, ease: 'linear', repeat: Infinity, delay: 2 }}
                >
                    <rect x="-90" y={DECK - 1.5} width="90" height="3" fill="url(#deck-pulse)" />
                    <circle cx="0" cy={DECK} r="3.5" fill="rgb(var(--kdm-cyan))" />
                </motion.g>
            )}
            <defs>
                <linearGradient id="deck-pulse" x1="0" x2="1">
                    <stop offset="0" stopColor="rgb(var(--kdm-cyan))" stopOpacity="0" />
                    <stop offset="1" stopColor="rgb(var(--kdm-cyan))" stopOpacity="0.9" />
                </linearGradient>
            </defs>

            {/* Sensors with leader lines and callouts */}
            {SENSORS.map((s, i) => {
                const on = highlighted === s.id;
                return (
                    <motion.g
                        key={s.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: ready ? 1 : 0 }}
                        transition={{ duration: 0.5, delay: 1.7 + i * 0.12 }}
                    >
                        <path
                            d={`M${s.x} ${s.y} L${s.lx} ${s.ly}`}
                            stroke={on ? 'rgb(var(--kdm-red))' : 'rgb(var(--kdm-navy) / 0.35)'}
                            strokeWidth="1"
                            strokeDasharray="3 3"
                            style={{ transition: 'stroke 0.3s' }}
                        />
                        <text
                            x={s.lx + (s.flip ? -6 : 6)}
                            y={s.ly + 4}
                            textAnchor={s.flip ? 'end' : 'start'}
                            fontSize="12"
                            fontWeight="500"
                            letterSpacing="1.6"
                            className="font-display uppercase"
                            style={{ fill: on ? 'rgb(var(--kdm-red-ink))' : 'rgb(var(--kdm-navy) / 0.65)', transition: 'fill 0.3s' }}
                        >
                            {s.label}
                        </text>
                        <SensorNode x={s.x} y={s.y} active={on} color={on ? 'rgb(var(--kdm-red))' : 'rgb(var(--kdm-blue))'} />
                    </motion.g>
                );
            })}
        </svg>
    );
}
