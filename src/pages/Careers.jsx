import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Briefcase, Clock, Users, Building2, ArrowRight, CalendarDays, FileDown } from 'lucide-react';
import { PageHero, SectionLabel, usePageMeta } from '@/components/site/primitives';
import { media } from '@/content/media';
import { careerTracks } from '@/content/home';
import {
    ERP_API_URL,
    LIST_REFRESH_MS,
    LIVE_QUERY_OPTIONS,
    OPENINGS_QUERY_KEY,
    fetchOpenings,
    formatDateOnly,
} from '@/components/careers/careersCommon';

// Open positions come live from the KDM ERP: HR publishes a job opening
// there and it shows up here; closing or deleting it there removes it.
// "View & Apply" opens the role's page on this site (/careers/:slug) with
// its full JD and the application form.

const postedAgo = (iso) => {
    if (!iso) return null;
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
    if (days <= 0) return 'Posted today';
    if (days === 1) return 'Posted yesterday';
    if (days < 30) return `Posted ${days} days ago`;
    const months = Math.floor(days / 30);
    return `Posted ${months} month${months > 1 ? 's' : ''} ago`;
};

function JobCard({ job, index }) {
    const facts = [
        job.department && { icon: Building2, text: job.department },
        job.location && { icon: MapPin, text: job.location },
        job.employmentType && { icon: Briefcase, text: job.employmentType },
        job.experience && { icon: Clock, text: job.experience },
        job.positions > 1 && { icon: Users, text: `${job.positions} positions` },
    ].filter(Boolean);
    // The summary, or the start of the full JD if there's no summary.
    const teaser = job.description || job.jdSections?.[0]?.body;

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.06 }}
            className="group bg-white rounded-panel border border-kdm-line shadow-soft p-6 sm:p-8 hover:border-kdm-blue/30 transition-colors"
        >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="min-w-0 flex-1">
                    <Link to={`/careers/${job.slug}`}>
                        <h3 className="t-h3 group-hover:text-kdm-blue transition-colors">
                            {job.title}
                        </h3>
                    </Link>

                    {facts.length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                            {facts.map(({ icon: Icon, text }) => (
                                <li key={text} className="flex items-center gap-1 text-sm text-kdm-muted">
                                    <Icon className="w-3.5 h-3.5" />
                                    {text}
                                </li>
                            ))}
                        </ul>
                    )}

                    {teaser && (
                        <p className="mt-4 text-kdm-graphite leading-relaxed whitespace-pre-line line-clamp-3">{teaser}</p>
                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-kdm-muted">
                        {postedAgo(job.publishedAt) && <span>{postedAgo(job.publishedAt)}</span>}
                        {job.jdDownloadPath && (
                            <a
                                href={`${ERP_API_URL}${job.jdDownloadPath}`}
                                className="flex items-center gap-1 font-medium text-kdm-blue hover:text-kdm-navy"
                            >
                                <FileDown className="w-3.5 h-3.5" />
                                Download JD
                            </a>
                        )}
                        {job.closesOn && (
                            <span className="flex items-center gap-1">
                                <CalendarDays className="w-3.5 h-3.5" />
                                Apply by {formatDateOnly(job.closesOn)}
                            </span>
                        )}
                    </div>
                </div>

                <Link
                    to={`/careers/${job.slug}`}
                    className="inline-flex items-center justify-center gap-2 shrink-0 self-start rounded-full bg-kdm-blue hover:bg-kdm-navy text-white text-sm font-semibold px-5 py-2.5 transition-colors"
                >
                    View &amp; Apply
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.article>
    );
}

export default function Careers() {
    usePageMeta('Careers', 'Open positions at KDM Engineers Group — structural health monitoring, materials testing, geotechnical investigations and infrastructure consulting across India.');
    const { data: openings, isLoading, isError, refetch } = useQuery({
        queryKey: OPENINGS_QUERY_KEY,
        queryFn: fetchOpenings,
        ...LIVE_QUERY_OPTIONS,
        refetchInterval: LIST_REFRESH_MS,
    });

    return (
        <>
            <PageHero
                index="01"
                eyebrow="Careers"
                title={['Build the infrastructure', 'of tomorrow.']}
                image={media.hero[0]}
                imageAlt="Two KDM engineers in hard hats reviewing a site"
                caption="Fig. 01 — On site"
                crumbs={[{ label: 'Careers' }]}
            >
                Join our engineers working on structural health monitoring, materials testing, geotechnical investigations
                and infrastructure consulting across India.
                <ul className="mt-6 flex flex-wrap gap-2">
                    {careerTracks.map((t) => (
                        <li key={t} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-kdm-ink ring-1 ring-inset ring-kdm-line">
                            {t}
                        </li>
                    ))}
                </ul>
            </PageHero>

            <section className="bg-white">
            <div className="container-kdm py-20 sm:py-28">
                <div className="mb-10">
                    <SectionLabel index="02">Open positions</SectionLabel>
                    <h2 className="t-h2 mt-5">Current openings.</h2>
                    {openings && openings.length > 0 && (
                        <p className="mt-3 text-sm font-medium text-kdm-graphite">
                            {openings.length} {openings.length === 1 ? 'role' : 'roles'} open right now
                        </p>
                    )}
                </div>

                {isLoading && (
                    <div className="space-y-4">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="h-40 bg-white rounded-panel border border-kdm-line animate-pulse" />
                        ))}
                    </div>
                )}

                {isError && (
                    <div className="bg-white rounded-panel border border-kdm-line shadow-soft p-10 text-center">
                        <p className="text-kdm-graphite font-medium">We couldn't load the open positions right now.</p>
                        <button onClick={() => refetch()} className="mt-4 text-sm font-semibold text-kdm-blue hover:text-kdm-navy">
                            Try again
                        </button>
                    </div>
                )}

                {openings && openings.length === 0 && (
                    <div className="bg-white rounded-panel border border-kdm-line shadow-soft p-10 sm:p-14 text-center">
                        <Briefcase className="w-10 h-10 text-kdm-blue mx-auto" />
                        <p className="mt-4 text-xl font-semibold text-kdm-ink">No open positions right now</p>
                        <p className="mt-2 text-kdm-muted">
                            New opportunities are posted here as soon as they open — please check back soon.
                        </p>
                    </div>
                )}

                {openings && openings.length > 0 && (
                    <div className="space-y-5">
                        {openings.map((job, i) => (
                            <JobCard key={job.id} job={job} index={i} />
                        ))}
                    </div>
                )}
            </div>
            </section>
        </>
    );
}
