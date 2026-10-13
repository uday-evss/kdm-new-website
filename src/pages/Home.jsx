import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageMeta } from '@/components/site/primitives';
import Hero from '@/components/home/Hero';
import ProofStrip from '@/components/home/ProofStrip';

const loadBelowFold = () => import('@/components/home/HomeBelowFold');
const HomeBelowFold = lazy(loadBelowFold);

// The rest of the page mounts as the visitor approaches it (or straight away
// when a link targets a section on it), and its code is fetched at the first
// interaction — so the first screen paints and responds quickly.
function useBelowFold(sentinelRef) {
    const { hash } = useLocation();
    const [mount, setMount] = useState(false);

    useEffect(() => {
        if (hash) setMount(true);
    }, [hash]);

    useEffect(() => {
        if (mount || !sentinelRef.current) return undefined;
        const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setMount(true), { rootMargin: '600px 0px' });
        io.observe(sentinelRef.current);
        return () => io.disconnect();
    }, [mount, sentinelRef]);

    // Fetch the rest of the page's code at the visitor's first sign of
    // intent (scroll, touch, key, pointer) rather than competing with the
    // first paint for the main thread.
    useEffect(() => {
        const events = ['scroll', 'pointerdown', 'pointermove', 'keydown', 'touchstart'];
        const prefetch = () => {
            events.forEach((e) => window.removeEventListener(e, prefetch));
            loadBelowFold();
        };
        events.forEach((e) => window.addEventListener(e, prefetch, { passive: true, once: true }));
        return () => events.forEach((e) => window.removeEventListener(e, prefetch));
    }, []);

    return mount;
}

// The home page as one narrative: what KDM is, what it does, how it measures
// structures, where it has worked, why it is trusted — then people, and a
// conversation.
export default function Home() {
    usePageMeta(
        null,
        'KDM Engineers (India) Pvt. Ltd. — structural health monitoring, NABL-accredited materials testing and geotechnical investigation for bridges and infrastructure, since 2012.',
    );
    const sentinelRef = useRef(null);
    const mount = useBelowFold(sentinelRef);
    const placeholder = <div className="min-h-screen bg-kdm-paper" aria-busy="true" />;

    return (
        <>
            <Hero />
            <ProofStrip />
            <div ref={sentinelRef}>
                {mount ? <Suspense fallback={placeholder}>
                    <HomeBelowFold />
                </Suspense> : placeholder}
            </div>
        </>
    );
}
