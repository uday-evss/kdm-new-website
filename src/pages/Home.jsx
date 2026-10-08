import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageMeta } from '@/components/site/primitives';
import Hero from '@/components/home/Hero';
import ProofStrip from '@/components/home/ProofStrip';

const loadBelowFold = () => import('@/components/home/HomeBelowFold');
const HomeBelowFold = lazy(loadBelowFold);

// The rest of the page mounts as the visitor approaches it (or straight away
// when a link targets a section on it), and its code is fetched while the
// browser is idle — so the first screen paints and responds quickly.
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

    useEffect(() => {
        const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 2000));
        const cancel = window.cancelIdleCallback ?? clearTimeout;
        const id = idle(() => loadBelowFold());
        return () => cancel(id);
    }, []);

    return mount;
}

// The home page as one narrative: what KDM is, what it does, how it measures
// structures, where it has worked, why it is trusted — then people, and a
// conversation.
export default function Home() {
    usePageMeta(
        null,
        'KDM Engineers Group — civil engineering consultancy, NABL-accredited materials testing, geotechnical investigation, pavement engineering, structural assessment and structural health monitoring of bridges, since 2012.',
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
