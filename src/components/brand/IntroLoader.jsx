import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/motion';
import { company } from '@/content/site';
import { gearArcPath, scaleTicks } from '@/components/engineering';
import { LogoMark } from './Logo';

// The KDM intro: the logo's measuring line, gear and scale construct
// themselves on a blueprint sheet, resolve into the real emblem, and lift
// away — about two seconds, once per visit. Skipped entirely for people who
// prefer reduced motion; click or press any key to skip it.

const SESSION_KEY = 'kdm-intro-seen';
const HOLD_MS = 1700;

const IntroContext = createContext(true);

// True once the intro is leaving (or was never shown), so first-screen
// entrance animations can wait for it instead of playing underneath.
export const useIntroDone = () => useContext(IntroContext);

function shouldShowIntro() {
    try {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
        return !sessionStorage.getItem(SESSION_KEY);
    } catch {
        return false;
    }
}

const CX = 200;
const CY = 196;
const GEAR = gearArcPath(CX, CY, 118, 136, 9);
const TICKS = scaleTicks(CX, CY, 104, 37, 6);
const RAYS = Array.from({ length: 11 }, (_, i) => {
    const a = Math.PI + ((i + 1) / 12) * Math.PI;
    return { x1: CX + 52 * Math.cos(a), y1: CY + 52 * Math.sin(a), x2: CX + 80 * Math.cos(a), y2: CY + 80 * Math.sin(a) };
});

function Counter({ duration }) {
    const ref = useRef(null);
    useEffect(() => {
        let frame;
        const start = performance.now();
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            if (ref.current) ref.current.textContent = String(Math.round(100 * (1 - (1 - t) ** 2))).padStart(3, '0');
            if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [duration]);
    return <span ref={ref}>000</span>;
}

function IntroOverlay({ onSkip }) {
    const draw = (delay, duration = 0.7) => ({
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { pathLength: { duration, ease: EASE, delay }, opacity: { duration: 0.01, delay } },
    });

    return (
        <motion.div
            aria-hidden="true"
            onClick={onSkip}
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-kdm-paper"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="absolute inset-0 bg-blueprint mask-fade-radial"
            />

            <div className="relative h-[220px] w-[340px] sm:h-[260px] sm:w-[400px]">
                {/* The line work */}
                <motion.svg
                    viewBox="0 0 400 260"
                    className="absolute inset-0 h-full w-full"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.35, delay: 1.1 }}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <motion.path d={`M20 ${CY} L380 ${CY}`} stroke="rgb(var(--kdm-ink))" strokeWidth="1.5" {...draw(0, 0.5)} />
                    <motion.path d={GEAR} stroke="rgb(var(--kdm-red))" strokeWidth="2" {...draw(0.3, 0.8)} />
                    {TICKS.map((t, i) => (
                        <line
                            key={i}
                            x1={t.x1}
                            y1={t.y1}
                            x2={t.x2}
                            y2={t.y2}
                            stroke="rgb(var(--kdm-cyan))"
                            strokeWidth={t.major ? 1.8 : 1}
                            className="anim-fade"
                            style={{ animationDelay: `${0.45 + i * 0.012}s`, animationDuration: '0.2s' }}
                        />
                    ))}
                    {RAYS.map((r, i) => (
                        <motion.line
                            key={i}
                            x1={r.x1}
                            y1={r.y1}
                            x2={r.x2}
                            y2={r.y2}
                            stroke="rgb(var(--kdm-red))"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3, ease: EASE, delay: 0.75 + i * 0.02 }}
                        />
                    ))}
                    <motion.path
                        d={`M${CX - 44} ${CY} A44 44 0 0 1 ${CX + 44} ${CY} Z`}
                        fill="rgb(var(--kdm-red))"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
                        transition={{ duration: 0.45, ease: EASE, delay: 0.7 }}
                    />
                    <motion.rect
                        x="186"
                        y={CY - 7}
                        width="10"
                        height="7"
                        fill="rgb(var(--kdm-yellow))"
                        initial={{ x: -170 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                    />
                </motion.svg>

                {/* …which resolves into the real emblem */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 1.05 }}
                >
                    <LogoMark className="h-[180px] sm:h-[220px]" sizes="300px" fetchpriority="high" />
                </motion.div>
            </div>

            <motion.p
                className="t-label relative mt-8 text-kdm-ink"
                initial={{ opacity: 0, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, letterSpacing: '0.24em' }}
                transition={{ duration: 0.8, ease: EASE, delay: 1.15 }}
            >
                {company.tagline}
            </motion.p>

            <div className="t-label absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4 text-kdm-muted sm:left-10 sm:translate-x-0">
                <span className="t-num text-kdm-ink">
                    <Counter duration={HOLD_MS - 200} />
                </span>
                <span className="h-px w-24 overflow-hidden bg-kdm-line">
                    <motion.span
                        className="block h-full origin-left bg-kdm-red"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: (HOLD_MS - 200) / 1000, ease: [0.5, 0, 0.2, 1] }}
                    />
                </span>
                <span>Since {company.foundedYear}</span>
            </div>
        </motion.div>
    );
}

export function IntroProvider({ children }) {
    const reduce = useReducedMotion();
    const [show, setShow] = useState(() => shouldShowIntro());

    useEffect(() => {
        if (!show) return undefined;
        try {
            sessionStorage.setItem(SESSION_KEY, '1');
        } catch {
            /* storage unavailable — the intro just shows again next time */
        }
        const root = document.documentElement;
        const previous = root.style.overflow;
        root.style.overflow = 'hidden';
        const timer = setTimeout(() => setShow(false), HOLD_MS);
        const skip = () => setShow(false);
        window.addEventListener('keydown', skip, { once: true });
        return () => {
            clearTimeout(timer);
            window.removeEventListener('keydown', skip);
            root.style.overflow = previous;
        };
    }, [show]);

    // If reduced motion turns on mid-intro, end it immediately.
    useEffect(() => {
        if (reduce && show) setShow(false);
    }, [reduce, show]);

    return (
        // The page starts its entrance as the curtain lifts.
        <IntroContext.Provider value={!show}>
            {children}
            <AnimatePresence>
                {show && <IntroOverlay key="intro" onSkip={() => setShow(false)} />}
            </AnimatePresence>
        </IntroContext.Provider>
    );
}
