import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Radar, ShieldCheck, Cpu, MapPin } from 'lucide-react';
import { findService } from '@/content/services';
import { shm } from '@/content/shm';
import { projects } from '@/content/projects';
import { company } from '@/content/site';
import { Container, PageHero, Reveal, SectionHeading, CheckList, Img, ButtonLink, usePageMeta } from '@/components/site/primitives';
import { ContactBand } from '@/components/site/widgets';

// Structural Health Monitoring, Assessment & Rehabilitation — KDM's flagship
// service, with everything from the old SHM page plus its completed projects.
export default function ShmPage() {
    const service = findService('structural-health-monitoring');
    usePageMeta(service.title, shm.intro);
    const shmBrochure = company.brochures.find((b) => b.title.includes('SHM'));

    return (
        <>
            <PageHero title={service.title} eyebrow="Our Services" image={service.cover} crumbs={[{ label: 'Our Services', to: '/services' }, { label: service.shortTitle }]}>
                {shm.intro}
            </PageHero>

            {/* Field photos + services */}
            <section className="bg-white py-16 sm:py-24">
                <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-start">
                    <Reveal>
                        <div className="grid grid-cols-2 gap-4">
                            <Img image={shm.introImages[0]} alt="SHM sensors and data acquisition on site" sizes="(min-width: 1024px) 50vw, 100vw" className="col-span-2 aspect-[16/10] w-full rounded-3xl object-cover" />
                            <Img image={shm.introImages[1]} alt="Mancherial Godavari Bridge" sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/3] w-full rounded-2xl object-cover" />
                            <Img image={shm.introImages[2]} alt="Instrumentation on the Mancherial Godavari Bridge" sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/3] w-full rounded-2xl object-cover" />
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <SectionHeading eyebrow="What we do" title="Our SHM Services" />
                        <CheckList items={shm.services} className="mt-10" />
                        {shmBrochure && (
                            <div className="mt-10">
                                <ButtonLink href={shmBrochure.href} target="_blank" rel="noopener noreferrer">
                                    Download {shmBrochure.title}
                                </ButtonLink>
                            </div>
                        )}
                    </Reveal>
                </Container>
            </section>

            {/* What is / why SHM */}
            <section className="bg-[#F5F7FA] py-16 sm:py-24">
                <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-center">
                    <Reveal>
                        <SectionHeading eyebrow="The basics" title="What is SHM?">
                            {shm.whatIs.text}
                        </SectionHeading>
                        <div className="mt-10 rounded-3xl bg-[#111111] p-8 text-white">
                            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#F2B705]">
                                <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Why SHM?
                            </p>
                            <p className="mt-3 text-lg leading-relaxed text-gray-200">{shm.why}</p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1} className="space-y-4">
                        <Img image={shm.whatIs.images[0]} alt="Finite element model of a bridge girder" sizes="(min-width: 1024px) 50vw, 100vw" className="w-full rounded-3xl bg-white object-contain ring-1 ring-[#E6EAF0]" />
                        <Img image={shm.whatIs.images[1]} alt="Illustration of a monitored city infrastructure" sizes="(min-width: 1024px) 50vw, 100vw" className="w-full rounded-3xl object-cover" />
                    </Reveal>
                </Container>
            </section>

            {/* Infrastructure */}
            <section className="bg-[#0E3A5D] py-16 sm:py-24">
                <Container>
                    <SectionHeading eyebrow="In our laboratory" title="Our Infrastructure" tone="dark">
                        {shm.infrastructure.text}
                    </SectionHeading>
                    <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        {shm.infrastructure.sensors.map((s, i) => (
                            <Reveal as="li" key={s} delay={Math.min(i, 9) * 0.03} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-white">
                                <Cpu className="h-4 w-4 shrink-0 text-[#F2B705]" aria-hidden="true" />
                                {s}
                            </Reveal>
                        ))}
                    </ul>
                </Container>
            </section>

            {/* Applications + involves */}
            <section className="bg-white py-16 sm:py-24">
                <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
                    <Reveal>
                        <SectionHeading eyebrow="Where it's used" title="Applications of SHM">
                            {shm.applications.lead}
                        </SectionHeading>
                        <ul className="mt-8 flex flex-wrap gap-2">
                            {shm.applications.items.map((a) => (
                                <li key={a} className="rounded-full bg-[#F5F7FA] px-4 py-2 text-sm font-medium text-[#111111] ring-1 ring-[#E6EAF0]">
                                    {a}
                                </li>
                            ))}
                        </ul>
                        <Img image={shm.applications.image} alt="Structural health monitoring data flow from sensors to alerts" sizes="(min-width: 1024px) 50vw, 100vw" className="mt-10 w-full rounded-3xl ring-1 ring-[#E6EAF0]" />
                    </Reveal>
                    <Reveal delay={0.1}>
                        <SectionHeading eyebrow="The scope" title="SHM Involves" />
                        <CheckList items={shm.involves} className="mt-10" />
                    </Reveal>
                </Container>
            </section>

            {/* Processing phases */}
            <section className="bg-[#F5F7FA] py-16 sm:py-24">
                <Container>
                    <SectionHeading eyebrow="How we work" title="Processing Phases of SHM" align="center" />
                    <Img image={shm.phases.image} alt="SHM processing: sensor types, data fusion, data management, analysis, reporting and alarming" sizes="(min-width: 1024px) 60vw, 100vw" className="mx-auto mt-12 w-full max-w-3xl rounded-3xl bg-white p-4 ring-1 ring-[#E6EAF0]" />
                    <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                        {shm.phases.steps.map((step, i) => (
                            <Reveal as="li" key={step.title} delay={i * 0.06} className="relative rounded-3xl bg-white p-6 ring-1 ring-[#E6EAF0]">
                                <span className="text-4xl font-bold text-[#C4161C]/20">{String(i + 1).padStart(2, '0')}</span>
                                <h3 className="mt-2 text-lg font-bold text-[#111111]">{step.title}</h3>
                                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-gray-600">
                                    {step.points.map((p) => (
                                        <li key={p} className="flex gap-2">
                                            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C4161C]" />
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        ))}
                    </ol>
                </Container>
            </section>

            {/* Instrumentation */}
            <section className="bg-white py-16 sm:py-24">
                <Container>
                    <SectionHeading eyebrow="Equipment" title="Advanced SHM Instrumentation & Data Aggregation" />
                    <ul className="mt-12 grid gap-6 md:grid-cols-2">
                        {shm.instrumentation.map((item, i) => (
                            <Reveal as="li" key={item.title} delay={(i % 2) * 0.08} className="flex flex-col sm:flex-row gap-6 rounded-3xl bg-[#F5F7FA] p-6 ring-1 ring-[#E6EAF0]">
                                <Img image={item.image} alt={item.title} sizes="200px" className="h-40 w-40 shrink-0 rounded-2xl bg-white object-contain p-2 ring-1 ring-[#E6EAF0]" />
                                <div>
                                    <h3 className="flex items-center gap-2 text-lg font-bold text-[#111111]">
                                        <Radar className="h-5 w-5 text-[#C4161C]" aria-hidden="true" /> {item.title}
                                    </h3>
                                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-600">
                                        {item.text.map((t) => (
                                            <p key={t}>{t}</p>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </ul>
                </Container>
            </section>

            {/* Installation types */}
            <section className="bg-[#111111] py-16 sm:py-24">
                <Container>
                    <SectionHeading eyebrow="Deployment" title="Types of Installation" tone="dark" />
                    <ul className="mt-12 grid gap-6 lg:grid-cols-3">
                        {shm.installationTypes.map((t, i) => (
                            <Reveal as="li" key={t.title} delay={i * 0.08} className="overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
                                <Img image={t.image} alt={t.title} sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-[4/3] w-full bg-white object-contain" />
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-white">{t.title}</h3>
                                    <ul className="mt-4 space-y-2 text-sm text-gray-300">
                                        {t.points.map((p) => (
                                            <li key={p} className="flex gap-2">
                                                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F2B705]" />
                                                {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        ))}
                    </ul>
                </Container>
            </section>

            {/* Completed projects */}
            <section id="projects" className="scroll-mt-28 bg-[#F5F7FA] py-16 sm:py-24">
                <Container>
                    <SectionHeading eyebrow="Track record" title="Completed Projects">
                        Rail Structure Interaction validation, structural health monitoring, vibration analysis and condition assessment of railway bridges.
                    </SectionHeading>
                    <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((p, i) => (
                            <Reveal as="li" key={p.slug} delay={(i % 3) * 0.06}>
                                <Link to={`/projects/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-[#E6EAF0] transition-shadow hover:shadow-xl">
                                    <div className="overflow-hidden">
                                        <Img image={p.images[0]} alt="" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#C4161C]">{p.workType}</p>
                                        <h3 className="mt-2 text-lg font-bold text-[#111111]">{p.title}</h3>
                                        <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                                            <MapPin className="h-4 w-4" aria-hidden="true" /> {p.client}
                                        </p>
                                        <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C4161C]">
                                            Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                        </span>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </ul>
                </Container>
            </section>

            <ContactBand title="Need a structure monitored?" text="Talk to our SHM team about instrumentation, load testing, RSI studies or long-term monitoring." />
        </>
    );
}
