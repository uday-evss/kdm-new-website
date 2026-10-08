import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, Phone, Mail, FileDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { services, findService, serviceSummary } from '@/content/services';
import { company, contact, formatPhone, telHref } from '@/content/site';
import { Container, PageHero, Reveal, SectionHeading, CheckList, usePageMeta } from '@/components/site/primitives';
import Gallery from '@/components/site/Gallery';
import { ContactBand } from '@/components/site/widgets';
import { serviceIcons } from '@/components/site/serviceIcons';

// One service: what we do, a sidebar to the other services and to contact,
// and the photo gallery from the service's page on the old site.
export default function ServiceDetail() {
    const { slug } = useParams();
    const service = findService(slug);
    usePageMeta(service?.title, service ? serviceSummary(service) : undefined);
    if (!service) return <Navigate to="/services" replace />;

    const hq = contact.branches[0];
    const Icon = serviceIcons[service.slug];

    return (
        <>
            <PageHero title={service.title} eyebrow="Our Services" image={service.cover} crumbs={[{ label: 'Our Services', to: '/services' }, { label: service.shortTitle }]}>
                {service.intro}
            </PageHero>

            <section className="bg-white py-16 sm:py-24">
                <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <Reveal className="lg:col-span-8">
                        <div className="flex items-center gap-4">
                            {Icon && (
                                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C4161C] text-white">
                                    <Icon className="h-6 w-6" aria-hidden="true" />
                                </span>
                            )}
                            <h2 className="text-3xl font-bold tracking-tight text-[#111111]">What We Do?</h2>
                        </div>
                        <span aria-hidden="true" className="mt-5 block h-1 w-16 rounded-full bg-[#C4161C]" />
                        <CheckList items={service.capabilities} columns={service.capabilities.every((c) => c.length < 60) ? 2 : 1} className="mt-10" />
                    </Reveal>

                    <aside className="lg:col-span-4 space-y-6">
                        <nav aria-label="Our services" className="rounded-3xl bg-[#F5F7FA] p-6 ring-1 ring-[#E6EAF0]">
                            <h2 className="px-2 text-sm font-semibold uppercase tracking-wider text-gray-500">Our Services</h2>
                            <ul className="mt-3 space-y-1">
                                {services.map((s) => (
                                    <li key={s.slug}>
                                        <Link
                                            to={`/services/${s.slug}`}
                                            aria-current={s.slug === service.slug ? 'page' : undefined}
                                            className={cn(
                                                'flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
                                                s.slug === service.slug ? 'bg-[#C4161C] font-semibold text-white' : 'text-gray-700 hover:bg-white hover:text-[#C4161C]',
                                            )}
                                        >
                                            {s.shortTitle}
                                            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="rounded-3xl bg-[#111111] p-7 text-white">
                            <h2 className="text-lg font-bold">Talk to our team</h2>
                            <p className="mt-2 text-sm text-gray-400">{hq.person}, {hq.city}</p>
                            <a href={telHref(hq.phone)} className="mt-5 flex items-center gap-3 text-sm hover:text-[#F2B705]">
                                <Phone className="h-4 w-4 text-[#C4161C]" aria-hidden="true" /> {formatPhone(hq.phone)}
                            </a>
                            <a href={`mailto:${hq.email}`} className="mt-3 flex items-center gap-3 break-all text-sm hover:text-[#F2B705]">
                                <Mail className="h-4 w-4 shrink-0 text-[#C4161C]" aria-hidden="true" /> {hq.email}
                            </a>
                            <a href={company.brochures[0].href} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15">
                                <FileDown className="h-4 w-4 text-[#F2B705]" aria-hidden="true" /> {company.brochures[0].title}
                            </a>
                        </div>
                    </aside>
                </Container>
            </section>

            {service.gallery?.length > 0 && (
                <section className="bg-[#F5F7FA] py-16 sm:py-24">
                    <Container>
                        <SectionHeading eyebrow="From our sites" title="Gallery" />
                        <div className="mt-10">
                            <Gallery images={service.gallery} label={service.shortTitle} />
                        </div>
                    </Container>
                </section>
            )}

            <ContactBand />
        </>
    );
}
