/** @type {import('tailwindcss').Config} */

// KDM design tokens. The palette is drawn from the KDM logo (deep ring blue,
// cyan field, red ring and sun, yellow base) and lives as RGB channels in
// src/index.css so every colour supports Tailwind's /opacity modifiers.
const token = (name) => `rgb(var(--kdm-${name}) / <alpha-value>)`;

module.exports = {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            screens: {
                xs: '420px',
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
                display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            colors: {
                kdm: {
                    ink: token('ink'),
                    graphite: token('graphite'),
                    muted: token('muted'),
                    line: token('line'),
                    paper: token('paper'),
                    surface: token('surface'),
                    mist: token('mist'),
                    blue: token('blue'),
                    navy: token('navy'),
                    cyan: token('cyan'),
                    'cyan-ink': token('cyan-ink'),
                    red: token('red'),
                    'red-ink': token('red-ink'),
                    yellow: token('yellow'),
                },
            },
            borderRadius: {
                card: '14px',
                panel: '20px',
            },
            boxShadow: {
                soft: '0 1px 2px rgb(15 27 45 / 0.04), 0 10px 30px -14px rgb(15 27 45 / 0.14)',
                lift: '0 2px 4px rgb(15 27 45 / 0.04), 0 24px 48px -20px rgb(21 59 143 / 0.28)',
                ring: '0 0 0 1px rgb(var(--kdm-line))',
            },
            transitionTimingFunction: {
                kdm: 'cubic-bezier(0.22, 1, 0.36, 1)',
            },
            maxWidth: {
                site: '1320px',
            },
            keyframes: {
                marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
                'marquee-reverse': { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
                'ping-ring': {
                    '0%': { transform: 'scale(1)', opacity: '0.55' },
                    '80%, 100%': { transform: 'scale(3.2)', opacity: '0' },
                },
                'dash-flow': { to: { strokeDashoffset: '-48' } },
                'wave-scroll': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
                'spin-slow': { to: { transform: 'rotate(360deg)' } },
                'scroll-cue': {
                    '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
                    '45%': { transform: 'scaleY(1)', transformOrigin: 'top' },
                    '55%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
                    '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
                },
            },
            animation: {
                marquee: 'marquee var(--marquee-duration, 60s) linear infinite',
                'marquee-reverse': 'marquee-reverse var(--marquee-duration, 60s) linear infinite',
                'ping-ring': 'ping-ring 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite',
                'dash-flow': 'dash-flow 1.6s linear infinite',
                'wave-scroll': 'wave-scroll 6s linear infinite',
                'spin-slow': 'spin-slow 80s linear infinite',
                'scroll-cue': 'scroll-cue 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
