import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Building, Briefcase, Landmark } from 'lucide-react';
import { projects, findProject } from '@/content/projects';
import { Container, PageHero, Reveal, SectionHeading, usePageMeta } from '@/components/site/primitives';
import Gallery from '@/components/site/Gallery';
import { ContactBand } from '@/components/site/widgets';

// A completed SHM project (the old site's project posts).
export default function ProjectDetail() {
    const { slug } = useParams();
    const project = findProject(slug);
    usePageMeta(project?.title, project ? `${project.workType} for ${project.subject} (${project.client}). ${project.sections[0]?.paragraphs[0] ?? ''}` : undefined);
    if (!project) return <Navigate to="/services/structural-health-monitoring#projects" replace />;

    const index = projects.findIndex((p) => p.slug === project.slug);
    const next = projects[(index + 1) % projects.length];
    const facts = [
        { icon: Briefcase, label: 'Work', value: project.workType },
        { icon: Landmark, label: 'Structure', value: project.subject },
        { icon: Building, label: 'Client', value: project.client },
    ];

    return (
        <>
            <PageHero
                title={project.title}
                eyebrow="Completed Project"
                image={project.images[0]}
                crumbs={[
                    { label: 'Structural Health Monitoring', to: '/services/structural-health-monitoring' },
                    { label: project.title },
                ]}
            />

            <section className="bg-white py-16 sm:py-24">
                <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <aside className="lg:col-span-4 lg:order-2">
                        <dl className="rounded-3xl bg-[#F5F7FA] p-7 ring-1 ring-[#E6EAF0] space-y-6 lg:sticky lg:top-32">
                            {facts.map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex gap-4">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C4161C] text-white">
                                        <Icon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    <div>
                                        <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</dt>
                                        <dd className="mt-1 font-semibold text-[#111111]">{value}</dd>
                                    </div>
                                </div>
                            ))}
                        </dl>
                    </aside>
                    <div className="lg:col-span-8 lg:order-1 space-y-12">
                        {project.sections.map((s, i) => (
                            <Reveal key={s.heading} delay={i * 0.04}>
                                <h2 className="text-2xl font-bold tracking-tight text-[#111111]">{s.heading}</h2>
                                <span aria-hidden="true" className="mt-4 block h-1 w-12 rounded-full bg-[#C4161C]" />
                                <div className="mt-6 space-y-4 text-lg leading-relaxed text-gray-600">
                                    {s.paragraphs.map((p) => (
                                        <p key={p}>{p}</p>
                                    ))}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>

            <section className="bg-[#F5F7FA] py-16 sm:py-24">
                <Container>
                    <SectionHeading eyebrow="On site" title="Project Photos" />
                    <div className="mt-10">
                        <Gallery images={project.images} label={project.title} />
                    </div>
                    <div className="mt-14 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#E6EAF0] pt-8">
                        <Link to="/services/structural-health-monitoring#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#C4161C]">
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All completed projects
                        </Link>
                        <Link to={`/projects/${next.slug}`} className="group inline-flex items-center justify-end gap-3 text-right">
                            <span>
                                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Next project</span>
                                <span className="font-semibold text-[#111111] group-hover:text-[#C4161C]">{next.title}</span>
                            </span>
                            <ArrowRight className="h-5 w-5 text-[#C4161C]" aria-hidden="true" />
                        </Link>
                    </div>
                </Container>
            </section>

            <ContactBand />
        </>
    );
}
