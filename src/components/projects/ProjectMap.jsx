import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { projects } from '@/content/projects';
import { CornerMarks } from '@/components/engineering';

// A technical field map of where KDM's completed bridge projects are, on a
// latitude / longitude graticule of the region they span. Positions are
// approximate (from the place named in each project) and no boundaries are
// drawn — this is a sketch of reach, not a survey.

const LON = [74, 86];
const LAT = [14, 23];
const W = 960;
const H = (W / (LON[1] - LON[0])) * (LAT[1] - LAT[0]); // equal degrees both ways
const toX = (lon) => ((lon - LON[0]) / (LON[1] - LON[0])) * W;
const toY = (lat) => ((LAT[1] - lat) / (LAT[1] - LAT[0])) * H;

// The offices, for reference (approximate city positions).
const OFFICES = [
    { name: 'Hyderabad', note: 'Head office', at: [17.45, 78.39] },
    { name: 'Visakhapatnam', note: 'Branch & NABL laboratory', at: [17.69, 83.22] },
];

export default function ProjectMap() {
    const [active, setActive] = useState(projects[0].slug);
    const current = projects.find((p) => p.slug === active);

    return (
        <div className="grid gap-6 lg:grid-cols-12">
            <div className="relative overflow-hidden rounded-panel bg-white p-3 shadow-soft ring-1 ring-kdm-line sm:p-5 lg:col-span-8">
                <div className="flex items-center justify-between px-2 pb-3">
                    <p className="t-label text-kdm-muted">Field map · {LAT[0]}°–{LAT[1]}° N, {LON[0]}°–{LON[1]}° E</p>
                    <p className="t-label hidden text-kdm-muted sm:block">Approximate locations</p>
                </div>
                <div className="relative">
                    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full rounded-card bg-kdm-paper" aria-hidden="true">
                        {/* graticule */}
                        {Array.from({ length: LON[1] - LON[0] + 1 }, (_, i) => LON[0] + i).map((lon) => (
                            <g key={`lon${lon}`}>
                                <line x1={toX(lon)} x2={toX(lon)} y1="0" y2={H} stroke="rgb(var(--kdm-cyan) / 0.18)" strokeWidth={lon % 2 ? 0.6 : 1} />
                                {lon % 2 === 0 && lon < LON[1] && (
                                    <text x={toX(lon) + 6} y={H - 10} fontSize="26" className="fill-kdm-muted font-display" letterSpacing="1">
                                        {lon}°E
                                    </text>
                                )}
                            </g>
                        ))}
                        {Array.from({ length: LAT[1] - LAT[0] + 1 }, (_, i) => LAT[0] + i).map((lat) => (
                            <g key={`lat${lat}`}>
                                <line x1="0" x2={W} y1={toY(lat)} y2={toY(lat)} stroke="rgb(var(--kdm-cyan) / 0.18)" strokeWidth={lat % 2 ? 0.6 : 1} />
                                {lat % 2 === 0 && lat > LAT[0] && (
                                    <text x="8" y={toY(lat) - 6} fontSize="26" className="fill-kdm-muted font-display" letterSpacing="1">
                                        {lat}°N
                                    </text>
                                )}
                            </g>
                        ))}
                        {/* decorative contours */}
                        {[120, 190, 260, 330].map((r, i) => (
                            <ellipse
                                key={r}
                                cx={toX(80.5)}
                                cy={toY(18.6)}
                                rx={r * 1.3}
                                ry={r}
                                fill="none"
                                stroke="rgb(var(--kdm-navy) / 0.07)"
                                strokeDasharray={i % 2 ? '4 6' : undefined}
                            />
                        ))}
                        {/* links from head office to each project */}
                        {projects.map((p) => (
                            <motion.line
                                key={p.slug}
                                x1={toX(OFFICES[0].at[1])}
                                y1={toY(OFFICES[0].at[0])}
                                x2={toX(p.approx[1])}
                                y2={toY(p.approx[0])}
                                stroke={p.slug === active ? 'rgb(var(--kdm-red))' : 'rgb(var(--kdm-blue) / 0.18)'}
                                strokeWidth={p.slug === active ? 1.6 : 1}
                                strokeDasharray="4 5"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: EASE }}
                            />
                        ))}
                        {OFFICES.map((o) => (
                            <g key={o.name} transform={`translate(${toX(o.at[1])} ${toY(o.at[0])})`}>
                                <rect x="-7" y="-7" width="14" height="14" fill="rgb(var(--kdm-blue))" />
                                <text x="12" y="5" fontSize="30" fontWeight="600" className="fill-kdm-blue font-display">
                                    {o.name}
                                </text>
                            </g>
                        ))}
                    </svg>

                    {/* project nodes (real buttons) */}
                    {projects.map((p, i) => {
                        const on = p.slug === active;
                        return (
                            <button
                                key={p.slug}
                                type="button"
                                onMouseEnter={() => setActive(p.slug)}
                                onFocus={() => setActive(p.slug)}
                                onClick={() => setActive(p.slug)}
                                aria-pressed={on}
                                aria-label={`${p.title} — ${p.place}`}
                                style={{ left: `${(toX(p.approx[1]) / W) * 100}%`, top: `${(toY(p.approx[0]) / H) * 100}%` }}
                                className="group absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                            >
                                <span aria-hidden="true" className={cn('absolute h-3 w-3 rounded-full motion-safe:animate-ping-ring', on ? 'bg-kdm-red' : 'bg-kdm-cyan')} style={{ animationDelay: `${i * 0.3}s` }} />
                                <span
                                    aria-hidden="true"
                                    className={cn('relative rounded-full border-2 border-white shadow transition-all duration-300', on ? 'h-5 w-5 bg-kdm-red' : 'h-3.5 w-3.5 bg-kdm-cyan group-hover:h-4 group-hover:w-4')}
                                />
                                <span className="t-num pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-semibold text-kdm-ink">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </button>
                        );
                    })}
                </div>
                <p className="mt-3 px-2 text-xs text-kdm-muted">
                    Positions are approximate, from the place named in each project. Squares mark KDM offices.
                </p>
            </div>

            <div className="lg:col-span-4">
                <div className="relative rounded-panel bg-kdm-blue p-7 text-white shadow-lift" aria-live="polite">
                    <CornerMarks color="border-white/40" />
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div key={current.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
                            <p className="t-label text-kdm-yellow">
                                {String(projects.indexOf(current) + 1).padStart(2, '0')} · {current.place}
                            </p>
                            <h3 className="t-h3 mt-3">{current.title}</h3>
                            <p className="mt-2 text-sm text-white/75">{current.workType}</p>
                            <p className="mt-1 text-sm text-white/75">{current.client}</p>
                            <ul className="mt-5 space-y-1.5 text-sm text-white/90">
                                {current.facts.map((f) => (
                                    <li key={f}>— {f}</li>
                                ))}
                            </ul>
                            <Link to={`/projects/${current.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-kdm-yellow">
                                Project details →
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <ol className="mt-4 rounded-panel bg-white p-2 ring-1 ring-kdm-line">
                    {projects.map((p, i) => (
                        <li key={p.slug}>
                            <button
                                type="button"
                                onMouseEnter={() => setActive(p.slug)}
                                onFocus={() => setActive(p.slug)}
                                onClick={() => setActive(p.slug)}
                                className={cn(
                                    'flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-sm transition-colors',
                                    p.slug === active ? 'bg-kdm-surface font-semibold text-kdm-blue' : 'text-kdm-graphite hover:bg-kdm-paper',
                                )}
                            >
                                <span className="t-num w-5 text-xs text-kdm-muted">{String(i + 1).padStart(2, '0')}</span>
                                {p.title}
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
