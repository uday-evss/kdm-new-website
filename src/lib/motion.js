// The KDM motion system. One easing curve and a few durations keep every
// movement on the site feeling like part of the same machine: quick to
// respond, smooth to settle, never bouncy.

export const EASE = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

export const DURATION = {
    fast: 0.2,
    base: 0.45,
    slow: 0.8,
    draw: 1.4,
};

export const SPRING = {
    snappy: { type: 'spring', stiffness: 420, damping: 38, mass: 0.8 },
    soft: { type: 'spring', stiffness: 160, damping: 26, mass: 1 },
    panel: { type: 'spring', stiffness: 220, damping: 32, mass: 1 },
};

export const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' };

export const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE } },
};

export const fade = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: DURATION.slow, ease: EASE } },
};

export const stagger = (gap = 0.07, delay = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

// A line of text rising out of a mask.
export const lineRise = {
    hidden: { y: '105%' },
    show: { y: '0%', transition: { duration: 0.9, ease: EASE } },
};

// Images revealed through a wipe, the way a drawing sheet is uncovered.
export const maskReveal = {
    hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
    show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.1, ease: EASE } },
};
