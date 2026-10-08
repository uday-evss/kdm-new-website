import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Phone, Mail, FileDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { services, findService, serviceSummary } from '@/content/services';
import { knowledgeTracks } from '@/content/home';
import { company, contact, formatPhone, telHref } from '@/content/site';
import { Container, PageHero, Section, SectionHeading, CheckList, SlideArrow, Stagger, StaggerItem, usePageMeta } from '@/components/site/primitives';
import Gallery from '@/components/site/Gallery';
import { ContactBand } from '@/components/site/widgets';
import { serviceIcons } from '@/components/site/serviceIcons';

// One service: what we do, the other services and a direct line to the
// team, and the photo gallery from the service's page on the old site.
export default function ServiceDetail() {
    const { slug } = useParams();
    const service = findService(slug);
    usePageMeta(service?.title, service ? serviceSummary(service) : undefined, { image: service?.cover?.src });
    if (!service) return <Navigate to="/services" replace />;

    const hq = contact.branches[0];
    const index = services.indexOf(service);
    const Icon = serviceIcons[service.slug];
    const isKsc = service.slug === 'kdm-knowledge-share-center';

    return (
        <>
            <PageHero
                index={String(index + 1).padStart(2, '0')}
                eyebrow={service.shortTitle}
                title={service.title}
                image={service.cover}
                caption={`Fig. ${String(index + 1).padStart(2, '0')} — ${service.shortTitle}`}
                crumbs={[{ label: 'Our Services', to: '/services' }, { label: service.shortTitle }]}
            >
                {service.intro ?? serviceSummary(service)}
            </PageHero>

            <Section tone="white">
                <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-4">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-kdm-surface text-kdm-blue">
                                <Icon className="h-6 w-6" aria-hidden="true" />
                            </span>
                            <p className="t-label text-kdm-muted">{isKsc ? 'Programmes' : 'What we do'}</p>
                        </div>
                        <h2 className="t-h2 mt-6">{isKsc ? 'What we teach.' : 'What we do.'}</h2>
                        {isKsc ? (
                            <Stagger className="mt-10 grid gap-x-10 sm:grid-cols-2">
                                {knowledgeTracks.map((t, i) => (
                                    <StaggerItem key={t.title} className="border-t-2 border-kdm-ink pb-8 pt-4">
                                        <p className="t-label text-kdm-muted">Track {String(i + 1).padStart(2, '0')}</p>
                                        <h3 className="t-h3 mt-3">{t.title}</h3>
                                        <CheckList items={t.items} className="mt-4" />
                                    </StaggerItem>
                                ))}
                            </Stagger>
                        ) : (
                            <CheckList
                                items={service.capabilities}
                                numbered
                                columns={service.capabilities.every((c) => c.length < 60) ? 2 : 1}
                                className="mt-10"
                            />
                        )}
                    </div>

                    <aside className="space-y-6 lg:col-span-4">
                        <div className="lg:sticky lg:top-24 space-y-6">
                            <div className="rounded-panel bg-kdm-blue p-7 text-white shadow-lift">
                                <p className="t-label text-kdm-yellow">Talk to our team</p>
                                <p className="mt-3 font-display text-xl font-semibold">{hq.person}</p>
                                <p className="text-sm text-white/70">{hq.city} head office</p>
                                <a href={telHref(hq.phone)} className="mt-6 flex items-center gap-3 text-sm hover:text-kdm-yellow">
                                    <Phone className="h-4 w-4" aria-hidden="true" /> {formatPhone(hq.phone)}
                                </a>
                                <a href={`mailto:${hq.email}`} className="mt-3 flex items-center gap-3 break-all text-sm hover:text-kdm-yellow">
                                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" /> {hq.email}
                                </a>
                                <a
                                    href={company.brochures[0].href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 flex items-center gap-3 rounded-card bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15"
                                >
                                    <FileDown className="h-4 w-4 text-kdm-yellow" aria-hidden="true" /> {company.brochures[0].title} (PDF)
                                </a>
                            </div>

                            <nav aria-label="Our services" className="rounded-panel bg-kdm-paper p-4 ring-1 ring-kdm-line">
                                <p className="t-label px-3 pb-2 pt-2 text-kdm-muted">All services</p>
                                <ul>
                                    {services.map((s, i) => (
                                        <li key={s.slug}>
                                            <Link
                                                to={`/services/${s.slug}`}
                                                aria-current={s.slug === service.slug ? 'page' : undefined}
                                                className={cn(
                                                    'group flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm transition-colors',
                                                    s.slug === service.slug ? 'bg-white font-semibold text-kdm-blue shadow-soft' : 'text-kdm-graphite hover:bg-white hover:text-kdm-ink',
                                                )}
                                            >
                                                <span className="t-num w-5 text-xs text-kdm-muted">{String(i + 1).padStart(2, '0')}</span>
                                                {s.shortTitle}
                                                <SlideArrow className="ml-auto h-3.5 w-3.5 shrink-0 opacity-60" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </aside>
                </Container>
            </Section>

            {service.gallery?.length > 0 && (
                <Section tone="paper">
                    <Container>
                        <SectionHeading label="From our sites" title="Gallery." />
                        <div className="mt-10">
                            <Gallery images={service.gallery} label={service.shortTitle} />
                        </div>
                    </Container>
                </Section>
            )}

            <ContactBand />
        </>
    );
}
