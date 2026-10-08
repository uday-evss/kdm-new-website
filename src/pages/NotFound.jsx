import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Container, ButtonLink, usePageMeta } from '@/components/site/primitives';

export default function NotFound() {
    usePageMeta('Page not found');
    return (
        <section className="bg-[#F5F7FA] pt-40 pb-28">
            <Container className="max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4161C]">404</p>
                <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-[#111111]">We couldn't find that page</h1>
                <p className="mt-5 text-lg text-gray-600">It may have moved when we rebuilt our website. Try one of these instead.</p>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                    <ButtonLink to="/">
                        Home <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </ButtonLink>
                    <ButtonLink to="/services" variant="outline">Our Services</ButtonLink>
                    <ButtonLink to="/contact" variant="outline">Contact Us</ButtonLink>
                </div>
            </Container>
        </section>
    );
}
