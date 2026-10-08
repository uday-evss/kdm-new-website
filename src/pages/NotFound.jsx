import React from 'react';
import { ButtonLink, Container, usePageMeta } from '@/components/site/primitives';
import { BlueprintGrid, MeasureRule } from '@/components/engineering';

export default function NotFound() {
    usePageMeta('Page not found');
    return (
        <section className="relative isolate overflow-hidden bg-kdm-paper pb-28 pt-40">
            <BlueprintGrid />
            <Container className="relative max-w-3xl text-center">
                <p className="t-label text-kdm-red-ink">Error 404 · Reading out of range</p>
                <h1 className="t-h1 mt-6">We couldn&apos;t find that page.</h1>
                <p className="t-lead mx-auto mt-6 max-w-xl">It may have moved when we rebuilt our website. Try one of these instead.</p>
                <MeasureRule className="mx-auto mt-12 max-w-md" at="90%" />
                <div className="mt-12 flex flex-wrap justify-center gap-3">
                    <ButtonLink to="/">Home</ButtonLink>
                    <ButtonLink to="/services" variant="secondary">Our services</ButtonLink>
                    <ButtonLink to="/contact" variant="secondary">Contact us</ButtonLink>
                </div>
            </Container>
        </section>
    );
}
