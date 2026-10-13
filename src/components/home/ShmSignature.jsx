import React from 'react';
import { FileDown } from 'lucide-react';
import { shm } from '@/content/shm';
import { projects } from '@/content/projects';
import { company } from '@/content/site';
import { ButtonLink, Container, RevealLines, SectionLabel, Reveal, Stagger, StaggerItem } from '@/components/site/primitives';
import { StatCounter } from '@/components/site/widgets';
import SensorExplorer from './SensorExplorer';

// 05 — Structural Health Monitoring: KDM's signature capability, told
// through the sensors themselves.
export default function ShmSignature() {
    const brochure = company.brochures.find((b) => b.title.includes('SHM'));
    const figures = [
        { value: projects.length, label: 'Completed railway bridge projects' },
        { value: shm.services.length, label: 'SHM services offered' },
        { value: shm.infrastructure.sensors.length, label: 'Sensing technologies in use' },
        { value: shm.installationTypes.length, label: 'Installation types' },
    ];

    return (
        <section aria-labelledby="shm-title" className="relative isolate overflow-hidden bg-kdm-navy py-20 sm:py-28 lg:py-32">
            <Container className="relative">
                <div className="grid items-end gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <SectionLabel index="05" tone="light">Structural Health Monitoring</SectionLabel>
                        <RevealLines lines={["We don't just inspect", 'structures.', 'We listen to them.']} className="t-h1 mt-5 text-white" />
                        <span id="shm-title" className="sr-only">Structural Health Monitoring</span>
                    </div>
                    <Reveal delay={0.1} className="t-lead lg:col-span-5 text-white/75">
                        {shm.intro}
                    </Reveal>
                </div>

                <Reveal className="mt-14">
                    <div className="rounded-panel bg-white p-5 shadow-lift sm:p-8">
                        <SensorExplorer />
                    </div>
                </Reveal>

                <Stagger as="dl" className="mt-14 grid grid-cols-2 gap-6 border-t border-white/15 pt-10 lg:grid-cols-4">
                    {figures.map((f) => (
                        <StaggerItem key={f.label} className="flex flex-col-reverse">
                            <dt className="mt-2 text-sm leading-snug text-white/70">{f.label}</dt>
                            <dd className="t-stat text-white">
                                <StatCounter value={f.value} duration={1200} />
                            </dd>
                        </StaggerItem>
                    ))}
                </Stagger>

                <div className="mt-12 flex flex-wrap items-center gap-4">
                    <ButtonLink to="/services/structural-health-monitoring" variant="light">Explore structural health monitoring</ButtonLink>
                    {brochure && (
                        <a
                            href={brochure.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-2 text-sm font-semibold text-white/80 hover:text-white"
                        >
                            <FileDown className="h-4 w-4" aria-hidden="true" /> {brochure.title} (PDF)
                        </a>
                    )}
                </div>
            </Container>
        </section>
    );
}
