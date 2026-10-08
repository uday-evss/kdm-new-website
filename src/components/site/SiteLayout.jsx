import React, { Suspense, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { EASE } from '@/lib/motion';
import Navbar from './Navbar';
import Footer from './Footer';

// Scrolls to the top on every new page, or to the #section a link points at
// (e.g. /about#md-message) once that page has rendered. Sections offset the
// fixed header with scroll-margin.
function ScrollManager() {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        if (hash) {
            const id = decodeURIComponent(hash.slice(1));
            // The page may still be loading (pages load on demand), so keep
            // looking for the section for a moment before giving up.
            const deadline = performance.now() + 3000;
            let frame;
            const find = () => {
                const target = document.getElementById(id);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                else if (performance.now() < deadline) frame = requestAnimationFrame(find);
            };
            frame = requestAnimationFrame(find);
            return () => cancelAnimationFrame(frame);
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        return undefined;
    }, [pathname, hash]);
    return null;
}

// A hairline across the top of the window that follows the reading position.
function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
    return (
        <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-kdm-cyan via-kdm-blue to-kdm-red"
        />
    );
}

export default function SiteLayout() {
    const { pathname } = useLocation();
    const outlet = useOutlet();

    return (
        <>
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-lift"
            >
                Skip to content
            </a>
            <ScrollManager />
            <ScrollProgress />
            <Navbar />
            <main id="main" tabIndex={-1} className="outline-none">
                {/* Lazy pages: hold more than a screen of space while they load, so the footer never flashes into view and jumps. */}
                <Suspense fallback={<div className="min-h-[120vh] bg-kdm-paper" aria-busy="true" />}>
                    {/* A short settle on every page change — quick enough never to slow navigation. */}
                    <motion.div key={pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
                        {outlet}
                    </motion.div>
                </Suspense>
            </main>
            <Footer />
        </>
    );
}
