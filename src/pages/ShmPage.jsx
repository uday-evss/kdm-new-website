import React from 'react';
import { FileDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { findService } from '@/content/services';
import { shm, analysisSoftware } from '@/content/shm';
import { projects } from '@/content/projects';
import { company } from '@/content/site';
import { CornerMarks, Figure, Waveform } from '@/components/engineering';
import {
    ButtonLink,
    CheckList,
    Container,
    Img,
    MaskedImage,
    PageHero,
    Reveal,
    Section,
    SectionHeading,
    Stagger,
    StaggerItem,
    usePageMeta,
} from '@/components/site/primitives';
import { ContactBand } from '@/components/site/widgets';
import { useIntroDone } from '@/components/brand/IntroLoader';
import SensorExplorer from '@/components/home/SensorExplorer';
import { Pipeline, TagGroup } from '@/components/home/DataPipeline';
import { StoryCard } from '@/components/home/ProjectStories';

// Structural Health Monitoring, Assessment & Rehabilitation — KDM's flagship
// service: everything from the old SHM page, plus the interactive sensor
// guide, the data pipeline and the completed projects.

function HeroReadout() {
    const ready = useIntroDone();
    return (
        <div className="relative">
            <MaskedImage image={shm.introImages[0]} alt="SHM sensors and a data aggregator on site" priority animate={ready} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] rounded-panel" />
            <CornerMarks />
            <div className="absolute inset-x-4 bottom-4 rounded-card bg-white/90 p-4 shadow-soft">
                <div className="flex items-center justify-between">
                    <p className="t-label text-kdm-ink">Dynamic response</p>
                    <p className="t-label text-kdm-muted">Illustrative</p>
                </div>
                <Waveform type="vibration" className="mt-2 h-10" />
            </div>
        </div>
    );
}

export default function ShmPage() {
    const service = findService('structural-health-monitoring');
    usePageMeta('Structural Health Monitoring of Bridges & Structures', shm.intro, { image: service.cover.src });
    const brochure = company.brochures.find((b) => b.title.includes('SHM'));

    return (
        <>
            <PageHero
                index="06"
                eyebrow="Structural Health Monitoring"
                title={['We listen to', 'structures.']}
                crumbs={[{ label: 'Our Services', to: '/services' }, { label: service.shortTitle }]}
                aside={<HeroReadout />}
            >
                {shm.intro}
            </PageHero>

            {/* Services */}
            <Section tone="white">
                <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <SectionHeading index="01" label="What we do" title={['Monitoring, assessment', '& rehabilitation.']} />
                        <div className="mt-10 grid grid-cols-2 gap-4">
                            <Figure caption="Fig. 01 — Mancherial Godavari Bridge" className="col-span-2">
                                <MaskedImage image={shm.introImages[1]} alt="Mancherial Godavari Bridge" sizes="(min-width: 1024px) 35vw, 100vw" className="aspect-[16/10] rounded-panel" />
                            </Figure>
                        </div>
                        {brochure && (
                            <ButtonLink href={brochure.href} target="_blank" rel="noopener noreferrer" variant="secondary" className="mt-10">
                                <span className="inline-flex items-center gap-2">
                                    <FileDown className="h-4 w-4" aria-hidden="true" /> {brochure.title} (PDF)
                                </span>
                            </ButtonLink>
                        )}
                    </div>
                    <div className="lg:col-span-7">
                        <CheckList items={shm.services} numbered columns={2} />
                    </div>
                </Container>
            </Section>

            {/* Sensors */}
            <Section tone="surface" className="overflow-hidden">
                <Container className="relative">
                    <SectionHeading index="02" label="Instrumentation" title={['Every sensor', 'has a question to answer.']}>
                        Choose a sensor on the drawing to see what it measures and why it matters.
                    </SectionHeading>
                    <SensorExplorer className="mt-14" />
                </Container>
            </Section>

            {/* What is / why */}
            <Section tone="white">
                <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-6">
                        <SectionHeading index="03" label="The basics" title="What is SHM?">
                            {shm.whatIs.text}
                        </SectionHeading>
                        <Reveal className="mt-10 rounded-panel border-l-4 border-kdm-red bg-kdm-paper p-7">
                            <p className="t-label text-kdm-red-ink">Why SHM?</p>
                            <p className="mt-3 text-lg leading-relaxed text-kdm-ink">{shm.why}</p>
                        </Reveal>
                    </div>
                    <div className="space-y-4 lg:col-span-6">
                        <Figure caption="Fig. 02 — Finite element model of a bridge girder">
                            <Img image={shm.whatIs.images[0]} alt="Finite element model of a bridge girder" sizes="(min-width: 1024px) 45vw, 100vw" className="w-full rounded-panel bg-white object-contain ring-1 ring-kdm-line" />
                        </Figure>
                    </div>
                </Container>
            </Section>

            {/* Pipeline */}
            <Section tone="paper">
                <Container>
                    <SectionHeading index="04" label="How we work" title={['Processing phases', 'of SHM.']}>
                        {shm.infrastructure.text}
                    </SectionHeading>
                    <Pipeline className="mt-16" />
                    <div className="mt-16 grid gap-10 border-t border-kdm-line pt-10 lg:grid-cols-2">
                        <TagGroup title="Sensing & measurement" items={shm.infrastructure.sensors} />
                        <TagGroup title="Analysis & modelling software" items={analysisSoftware} tone="blue" />
                    </div>
                </Container>
            </Section>

            {/* Applications + involves */}
            <Section tone="white">
                <Container className="grid gap-14 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <SectionHeading index="05" label="Where it's used" title="Applications.">
                            {shm.applications.lead}
                        </SectionHeading>
                        <Stagger as="ul" gap={0.04} className="mt-8 flex flex-wrap gap-2">
                            {shm.applications.items.map((a) => (
                                <StaggerItem as="li" key={a} className="rounded-tag bg-kdm-paper px-4 py-2 text-sm font-medium text-kdm-ink ring-1 ring-inset ring-kdm-line">
                                    {a}
                                </StaggerItem>
                            ))}
                        </Stagger>
                        <Figure caption="Fig. 03 — From sensors to alerts" className="mt-10">
                            <Img image={shm.applications.image} alt="Structural health monitoring data flow from sensors to alerts" sizes="(min-width: 1024px) 45vw, 100vw" className="w-full rounded-panel ring-1 ring-kdm-line" />
                        </Figure>
                    </div>
                    <div>
                        <SectionHeading index="06" label="The scope" title="SHM involves." />
                        <CheckList items={shm.involves} numbered className="mt-10" />
                    </div>
                </Container>
            </Section>

            {/* Instrumentation detail */}
            <Section tone="paper">
                <Container>
                    <SectionHeading index="07" label="Equipment" title={['Advanced instrumentation', '& data aggregation.']} />
                    <Stagger className="mt-14 grid border-t border-kdm-ink/20 md:grid-cols-2 md:gap-x-12">
                        {shm.instrumentation.map((item) => (
                            <StaggerItem key={item.title} className="flex flex-col gap-6 border-b border-kdm-line py-8 sm:flex-row">
                                <div className="relative shrink-0">
                                    <Img image={item.image} alt={item.title} sizes="160px" className="h-36 w-36 rounded-card bg-white object-contain p-2 ring-1 ring-kdm-line" />
                                    <CornerMarks size="h-2 w-2" />
                                </div>
                                <div>
                                    <h3 className="t-h3">{item.title}</h3>
                                    <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-kdm-graphite">
                                        {item.text.map((t) => (
                                            <p key={t}>{t}</p>
                                        ))}
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </Container>
            </Section>

            {/* Installation types */}
            <Section tone="white">
                <Container>
                    <SectionHeading index="08" label="Deployment" title="Types of installation." />
                    <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
                        {shm.installationTypes.map((t, i) => (
                            <StaggerItem key={t.title} className={cn('overflow-hidden rounded-panel bg-kdm-paper ring-1 ring-kdm-line border-t-4', ['border-kdm-blue', 'border-kdm-cyan', 'border-kdm-red'][i])}>
                                <Img image={t.image} alt={t.title} sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-[4/3] w-full bg-white object-contain" />
                                <div className="p-6">
                                    <h3 className="t-h3">{t.title}</h3>
                                    <CheckList items={t.points} className="mt-4 text-sm" />
                                </div>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </Container>
            </Section>

            {/* Completed projects */}
            <Section id="projects" tone="paper" className="overflow-hidden">
                <Container>
                    <SectionHeading index="09" label="Track record" title="Completed projects.">
                        Rail–structure interaction validation, structural health monitoring, vibration analysis and condition
                        assessment of railway bridges.
                    </SectionHeading>
                    <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {projects.map((p, i) => (
                            <StoryCard key={p.slug} project={p} index={i} grid />
                        ))}
                    </div>
                </Container>
            </Section>

            <ContactBand title={['Need a structure', 'monitored?']} text="Talk to our SHM team about instrumentation, load testing, RSI studies or long-term monitoring." />
        </>
    );
}
