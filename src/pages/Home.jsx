import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Award, ShieldCheck } from 'lucide-react';
import HomeHero from '@/components/home/HomeHero';
import { Container, SectionHeading, Reveal, Img, ButtonLink, CheckList, usePageMeta } from '@/components/site/primitives';
import { StatCounter, ClientMarquee, BrochureLinks, ContactBand, ImageCard } from '@/components/site/widgets';
import { serviceIcons } from '@/components/site/serviceIcons';
import { company } from '@/content/site';
import { services, findService } from '@/content/services';
import { projects } from '@/content/projects';
import { clients } from '@/content/clients';

export default function Home() {
    usePageMeta(null, company.intro[0]);
    const shm = findService('structural-health-monitoring');
    const accreditation = company.accreditations[0];

    return (
        <>
            <HomeHero />

            {/* Welcome + Our Forte */}
            <section className="bg-white py-20 sm:py-28">
                <Container className="grid gap-14 lg:grid-cols-12 lg:gap-20">
                    <Reveal className="lg:col-span-7">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4161C]">Welcome to</p>
                        <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-[#111111]">{company.name}</h2>
                        <p className="mt-4 text-lg font-semibold text-[#0E3A5D]">{company.tagline}</p>
                        <span aria-hidden="true" className="mt-6 block h-1 w-16 rounded-full bg-[#C4161C]" />
                        <div className="mt-8 space-y-5 text-lg leading-relaxed text-gray-600">
                            {company.intro.map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                        </div>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <ButtonLink to="/about">
                                About the Company <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </ButtonLink>
                            <ButtonLink to="/clients" variant="outline">
                                Our Clients
                            </ButtonLink>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1} className="lg:col-span-5">
                        <div className="rounded-3xl bg-[#F5F7FA] p-8 sm:p-10 ring-1 ring-[#E6EAF0]">
                            <h2 className="text-2xl font-bold text-[#111111]">Our Forte</h2>
                            <span aria-hidden="true" className="mt-4 block h-1 w-12 rounded-full bg-[#C4161C]" />
                            <CheckList items={company.forte} className="mt-8" />
                        </div>
                    </Reveal>
                </Container>
            </section>

            {/* Numbers */}
            <section className="bg-[#111111] py-16" aria-label="KDM in numbers">
                <Container>
                    <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
                        {[...company.stats, { value: new Date().getFullYear() - company.foundedYear, suffix: '+', label: `Years since ${company.foundedYear}` }].map((s, i) => (
                            <div key={s.label} className={`text-center ${i > 0 ? 'lg:border-l lg:border-white/10' : ''}`}>
                                <dd className="text-4xl sm:text-5xl font-bold text-white">
                                    <StatCounter value={s.value} suffix={s.suffix} />
                                </dd>
                                <dt className="mt-2 text-sm font-medium uppercase tracking-wider text-gray-400">{s.label}</dt>
                            </div>
                        ))}
                    </dl>
                </Container>
            </section>

            {/* Services */}
            <section className="bg-[#F5F7FA] py-20 sm:py-28">
                <Container>
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <SectionHeading eyebrow="What we do" title="Our Services" />
                        <ButtonLink to="/services" variant="outline">
                            All Services <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </ButtonLink>
                    </div>
                    <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((s, i) => (
                            <Reveal as="li" key={s.slug} delay={(i % 3) * 0.06}>
                                <ImageCard to={`/services/${s.slug}`} image={s.cover} title={s.title} icon={serviceIcons[s.slug]} />
                            </Reveal>
                        ))}
                    </ul>
                </Container>
            </section>

            {/* SHM spotlight */}
            <section className="relative overflow-hidden bg-[#0E3A5D] py-20 sm:py-28">
                <Container className="grid items-center gap-14 lg:grid-cols-2">
                    <Reveal>
                        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#F2B705]">
                            <Activity className="h-4 w-4" aria-hidden="true" /> Structural Health Monitoring
                        </p>
                        <h2 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight text-white">{shm.title}</h2>
                        <p className="mt-6 text-lg leading-relaxed text-blue-100/80">
                            Health monitoring and assessment of civil structures through instrumentation at strategic locations —
                            measuring acceleration, modal frequencies, displacements, stresses, strains and forces under dynamic
                            loading.
                        </p>
                        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                            {projects.slice(0, 6).map((p) => (
                                <li key={p.slug}>
                                    <Link to={`/projects/${p.slug}`} className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10">
                                        <span>
                                            <span className="block font-semibold">{p.title}</span>
                                            <span className="text-xs text-blue-100/70">{p.workType}</span>
                                        </span>
                                        <ArrowRight className="h-4 w-4 shrink-0 text-[#F2B705] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-10">
                            <ButtonLink to={`/services/${shm.slug}`} variant="light">
                                Explore SHM <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </ButtonLink>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="relative">
                            <Img image={shm.cover} alt="KDM engineers installing structural health monitoring sensors" sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl" />
                            <div className="absolute -bottom-6 -left-4 sm:-left-8 rounded-2xl bg-white p-5 shadow-xl">
                                <p className="text-3xl font-bold text-[#C4161C]">{projects.length}</p>
                                <p className="text-sm font-medium text-gray-600">completed railway bridge
                                    <br />monitoring projects</p>
                            </div>
                        </div>
                    </Reveal>
                </Container>
            </section>

            {/* Clients */}
            <section className="bg-white py-20 sm:py-28">
                <Container>
                    <SectionHeading eyebrow="Trusted by" title="Our Clients" align="center">
                        Government departments, public sector undertakings and leading infrastructure companies across India.
                    </SectionHeading>
                    <div className="mt-14">
                        <ClientMarquee />
                    </div>
                    <div className="mt-12 text-center">
                        <ButtonLink to="/clients">
                            Full Clientele ({clients.length}) <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </ButtonLink>
                    </div>
                </Container>
            </section>

            {/* Brochures + accreditation */}
            <section className="bg-[#F5F7FA] py-20 sm:py-28">
                <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-center">
                    <Reveal>
                        <SectionHeading eyebrow="Know us better" title="Download Our Brochures">
                            Our company profile and our Structural Health Monitoring profile.
                        </SectionHeading>
                        <div className="mt-10">
                            <BrochureLinks />
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="flex flex-col sm:flex-row items-center gap-8 rounded-3xl bg-white p-8 ring-1 ring-[#E6EAF0]">
                            <a href={accreditation.image.src} target="_blank" rel="noopener noreferrer" className="shrink-0" aria-label="View the NABL accreditation certificate">
                                <Img image={accreditation.image} alt="NABL accreditation certificate" sizes="200px" className="w-44 rounded-lg shadow-lg ring-1 ring-[#E6EAF0]" />
                            </a>
                            <div>
                                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C4161C]">
                                    <Award className="h-4 w-4" aria-hidden="true" /> Our Accreditations
                                </p>
                                <h3 className="mt-3 text-xl font-bold text-[#111111]">{accreditation.title}</h3>
                                <p className="mt-3 text-gray-600 leading-relaxed">{accreditation.text}</p>
                                <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#0E3A5D]">
                                    <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Certificate No. {accreditation.certificateNo}
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </Container>
            </section>

            <ContactBand />
        </>
    );
}
