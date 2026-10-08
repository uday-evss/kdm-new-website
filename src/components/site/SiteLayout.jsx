import React, { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// Scrolls to the top on every new page, or to the #section a link points at
// (e.g. /about#md-message) once that page has rendered. Sections offset the
// fixed header with scroll-margin (scroll-mt-*).
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

export default function SiteLayout() {
    return (
        <>
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-lg"
            >
                Skip to content
            </a>
            <ScrollManager />
            <Navbar />
            <main id="main">
                {/* Lazy pages: hold the space with a quiet placeholder while they load. */}
                <Suspense fallback={<div className="min-h-[70vh] bg-[#F5F7FA]" aria-busy="true" />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}
