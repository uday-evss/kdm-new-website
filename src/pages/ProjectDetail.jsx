import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { projects, findProject } from '@/content/projects';
import { Container, PageHero, Reveal, Section, SectionHeading, SectionLabel, SlideArrow, usePageMeta } from '@/components/site/primitives';
import { CornerMarks } from '@/components/engineering';
import Gallery from '@/components/site/Gallery';
import { ContactBand } from '@/components/site/widgets';

// A completed SHM project (the old site's project posts) with a spec sheet.
export default function ProjectDetail() {
    const { slug } = useParams();
    const project = findProject(slug);
    usePageMeta(
        project?.title,
        project ? `${project.workType} for ${project.subject} (${project.client}). ${project.sections[0]?.paragraphs[0] ?? ''}` : undefined,
        { image: project?.cover?.src },
    );
    if (!project) return <Navigate to="/projects" replace />;

    const index = projects.findIndex((p) => p.slug === project.slug);
    const next = projects[(index + 1) % projects.length];
    const spec = [
        { label: 'Work', value: project.workType },
        { label: 'Structure', value: project.subject },
        { label: 'Client', value: project.client },
        { label: 'Key figures', value: project.facts.join(' · ') },
        { label: 'Methods', value: project.methods.join(' · ') },
    ];

    return (
        <>
            <PageHero
                index={String(index + 1).padStart(2, '0')}
                eyebrow={project.workType}
                title={project.title}
                image={project.cover}
                imageAlt={`${project.title} — KDM field work`}
                caption={`Fig. ${String(index + 1).padStart(2, '0')} — ${project.place}`}
                crumbs={[{ label: 'Projects', to: '/projects' }, { label: project.title }]}
            >
                {project.subject} · {project.client}
            </PageHero>

            <Section tone="white">
                <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                    <aside className="lg:order-2 lg:col-span-4">
                        <div className="relative rounded-panel bg-kdm-paper p-7 ring-1 ring-kdm-line lg:sticky lg:top-24">
                            <CornerMarks />
                            <p className="t-label text-kdm-muted">Spec sheet</p>
                            <dl className="mt-4">
                                {spec.map((s) => (
                                    <div key={s.label} className="border-t border-kdm-line py-3.5">
                                        <dt className="t-label text-kdm-red-ink">{s.label}</dt>
                                        <dd className="mt-1 font-medium leading-snug text-kdm-ink">{s.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </aside>
                    <div className="space-y-14 lg:order-1 lg:col-span-8">
                        {project.sections.map((s, i) => (
                            <Reveal key={s.heading}>
                                <SectionLabel index={String(i + 1).padStart(2, '0')}>{s.heading}</SectionLabel>
                                <div className="mt-5 space-y-4 text-lg leading-relaxed text-kdm-graphite">
                                    {s.paragraphs.map((p) => (
                                        <p key={p}>{p}</p>
                                    ))}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </Section>

            <Section tone="paper">
                <Container>
                    <SectionHeading label="On site" title="Project photos." />
                    <div className="mt-10">
                        <Gallery images={project.images} label={project.title} />
                    </div>
                    <div className="mt-16 flex flex-col items-stretch justify-between gap-6 border-t border-kdm-line pt-8 sm:flex-row sm:items-center">
                        <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-kdm-graphite hover:text-kdm-blue">
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All projects
                        </Link>
                        <Link to={`/projects/${next.slug}`} className="group inline-flex items-center justify-end gap-4 text-right">
                            <span>
                                <span className="t-label block text-kdm-muted">Next project</span>
                                <span className="font-display text-xl font-semibold text-kdm-ink group-hover:text-kdm-blue">{next.title}</span>
                            </span>
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-kdm-blue text-white">
                                <SlideArrow />
                            </span>
                        </Link>
                    </div>
                </Container>
            </Section>

            <ContactBand />
        </>
    );
}
