import React from 'react';
import { Link } from 'react-router-dom';
import { clients } from '@/content/clients';
import { projects } from '@/content/projects';
import { Container, RevealLines, SectionLabel, TextLink, Reveal, Stagger, StaggerItem, SlideArrow } from '@/components/site/primitives';
import { ClientMarquee } from '@/components/site/widgets';

// 09 — Clients. Two slow rows (government & PSU one way, private the
// other) that pause under the cursor, then the client stories our own
// project record tells.
export default function ClientsShowcase() {
    const government = clients.filter((c) => c.sector === 'Government');
    const privateSector = clients.filter((c) => c.sector === 'Private');
    const byClient = Object.entries(
        projects.reduce((acc, p) => {
            (acc[p.client] ??= []).push(p);
            return acc;
        }, {}),
    );

    return (
        <section aria-labelledby="clients-title" className="relative overflow-hidden bg-white py-20 sm:py-28 lg:py-32">
            <Container>
                <div className="grid items-end gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <SectionLabel index="09">Clients</SectionLabel>
                        <RevealLines lines={['Trusted across government', 'and industry.']} className="t-h2 mt-5" />
                        <span id="clients-title" className="sr-only">Clients</span>
                    </div>
                    <Reveal delay={0.1} className="lg:col-span-5">
                        <p className="t-lead">
                            A selection of the {government.length} government and public-sector bodies and {privateSector.length} private
                            infrastructure companies we have worked with.
                        </p>
                        <TextLink to="/clients" className="mt-5">
                            Full clientele
                        </TextLink>
                    </Reveal>
                </div>
            </Container>

            <div className="mt-14 space-y-4">
                <ClientMarquee items={government} duration={70} label="Government and public-sector clients" />
                <ClientMarquee items={privateSector} duration={90} reverse label="Private-sector clients" />
            </div>

            <Container>
                <Stagger className="mt-14 grid gap-4 md:grid-cols-2">
                    {byClient.map(([client, list]) => (
                        <StaggerItem key={client} className="rounded-panel bg-kdm-paper p-6 ring-1 ring-kdm-line sm:p-8">
                            <p className="t-label text-kdm-muted">Client story</p>
                            <h3 className="t-h3 mt-3">{client.replace(', India', '')}</h3>
                            <p className="mt-2 text-kdm-graphite">
                                {list.length} railway bridge {list.length === 1 ? 'project' : 'projects'} — monitoring, testing and assessment.
                            </p>
                            <ul className="mt-5 flex flex-wrap gap-2">
                                {list.map((p) => (
                                    <li key={p.slug}>
                                        <Link
                                            to={`/projects/${p.slug}`}
                                            className="group inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-kdm-ink ring-1 ring-kdm-line transition-colors hover:text-kdm-blue hover:ring-kdm-blue/40"
                                        >
                                            {p.title.replace('Bridge between ', '')}
                                            <SlideArrow className="h-3.5 w-3.5" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </StaggerItem>
                    ))}
                </Stagger>
            </Container>
        </section>
    );
}
