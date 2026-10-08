import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { media } from '@/content/media';
import { company } from '@/content/site';
import { ButtonLink, Container } from '@/components/site/primitives';

const SLIDE_MS = 6000;

// Full-bleed slideshow of the company's own site photos (the old home page's
// background slideshow), with the company values as the headline.
export default function HomeHero() {
    const slides = media.hero;
    const reduce = useReducedMotion();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (reduce) return undefined;
        const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
        return () => clearInterval(id);
    }, [reduce, slides.length]);

    return (
        <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[#111111] pb-20 pt-40 sm:items-center sm:pb-28">
            <AnimatePresence initial={false}>
                <motion.img
                    key={slides[index].src}
                    src={slides[index].src}
                    srcSet={`${slides[index].sm} 720w, ${slides[index].src} ${slides[index].w}w`}
                    sizes="100vw"
                    alt=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    style={reduce ? undefined : { animation: `kenburns ${SLIDE_MS + 1500}ms ease-out forwards` }}
                    className="absolute inset-0 -z-20 h-full w-full object-cover"
                />
            </AnimatePresence>
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#111111]/95 via-[#111111]/80 to-[#111111]/60 sm:via-[#111111]/70 sm:to-[#111111]/20" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#111111]/80 to-transparent" />

            <Container className="w-full">
                <div className="max-w-3xl">
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#F2B705]"
                    >
                        <span aria-hidden="true" className="h-0.5 w-10 bg-[#C4161C]" />
                        Our Values
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mt-6 text-[2.6rem] sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white"
                    >
                        {company.values.map((v, i) => (
                            <span key={v} className="block">
                                {v}
                                {i < company.values.length - 1 ? ', ' : '.'}
                            </span>
                        ))}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="mt-8 max-w-xl text-lg sm:text-xl text-gray-300 leading-relaxed"
                    >
                        {company.name} — {company.tagline}. Consultancy, testing services and training, all under one roof
                        since {company.foundedYear}.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="mt-10 flex flex-wrap gap-4"
                    >
                        <ButtonLink to="/services">
                            Explore Our Services <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </ButtonLink>
                        <ButtonLink to="/contact" variant="ghost-light">
                            Contact Us
                        </ButtonLink>
                    </motion.div>
                </div>

                {slides.length > 1 && (
                    <div className="mt-16 flex gap-2" role="tablist" aria-label="Background photos">
                        {slides.map((s, i) => (
                            <button
                                key={s.src}
                                type="button"
                                role="tab"
                                aria-selected={i === index}
                                aria-label={`Show photo ${i + 1}`}
                                onClick={() => setIndex(i)}
                                className="group py-2"
                            >
                                <span className={`block h-1 rounded-full transition-all duration-500 ${i === index ? 'w-12 bg-[#C4161C]' : 'w-6 bg-white/40 group-hover:bg-white/70'}`} />
                            </button>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
}
