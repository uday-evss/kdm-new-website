import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Briefcase, Clock, Users, Building2, ArrowRight, CalendarDays, FileDown } from 'lucide-react';
import { PageHero, usePageMeta } from '@/components/site/primitives';
import { media } from '@/content/media';
import { ERP_API_URL, LIST_REFRESH_MS, LIVE_QUERY_OPTIONS, formatDateOnly } from '@/components/careers/careersCommon';

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

async function fetchOpenings() {
    const response = await fetch(`${ERP_API_URL}/careers`);
    if (!response.ok) throw new Error(`Openings request failed (${response.status})`);
    const data = await response.json();
    return data.postings ?? [];
}

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
            className="group bg-white rounded-2xl border border-[#E6EAF0] shadow-xl p-6 sm:p-8 hover:border-[#C4161C]/30 transition-colors"
        >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="min-w-0 flex-1">
                    <Link to={`/careers/${job.slug}`}>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#111111] group-hover:text-[#C4161C] transition-colors">
                            {job.title}
                        </h3>
                    </Link>

                    {facts.length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                            {facts.map(({ icon: Icon, text }) => (
                                <li key={text} className="flex items-center gap-1 text-sm text-gray-500">
                                    <Icon className="w-3.5 h-3.5" />
                                    {text}
                                </li>
                            ))}
                        </ul>
                    )}

                    {teaser && (
                        <p className="mt-4 text-gray-600 leading-relaxed whitespace-pre-line line-clamp-3">{teaser}</p>
                    )}

                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                        {postedAgo(job.publishedAt) && <span>{postedAgo(job.publishedAt)}</span>}
                        {job.jdDownloadPath && (
                            <a
                                href={`${ERP_API_URL}${job.jdDownloadPath}`}
                                className="flex items-center gap-1 font-medium text-[#C4161C] hover:text-[#A31217]"
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
                    className="inline-flex items-center justify-center gap-2 shrink-0 self-start rounded-full bg-[#C4161C] hover:bg-[#A31217] text-white text-sm font-semibold px-5 py-2.5 transition-colors"
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
        queryKey: ['careers-openings'],
        queryFn: fetchOpenings,
        ...LIVE_QUERY_OPTIONS,
        refetchInterval: LIST_REFRESH_MS,
    });

    return (
        <>
            <PageHero
                title="Careers at KDM Engineers"
                eyebrow="Join our team"
                image={media.banners.find((b) => b.src.includes('/kdmksc-2-1.webp'))}
                crumbs={[{ label: 'Careers' }]}
            >
                Join our engineers working on structural health monitoring, materials testing, geotechnical investigations
                and infrastructure consulting across India.
            </PageHero>

            <section className="bg-[#F5F7FA]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#111111]">Open Positions</h2>
                    {openings && openings.length > 0 && (
                        <p className="mt-3 text-sm font-medium text-gray-700">
                            {openings.length} {openings.length === 1 ? 'role' : 'roles'} open right now
                        </p>
                    )}
                </div>

                {isLoading && (
                    <div className="space-y-4">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="h-40 bg-white rounded-2xl border border-[#E6EAF0] animate-pulse" />
                        ))}
                    </div>
                )}

                {isError && (
                    <div className="bg-white rounded-2xl border border-[#E6EAF0] shadow-xl p-10 text-center">
                        <p className="text-gray-700 font-medium">We couldn't load the open positions right now.</p>
                        <button onClick={() => refetch()} className="mt-4 text-sm font-semibold text-[#C4161C] hover:text-[#A31217]">
                            Try again
                        </button>
                    </div>
                )}

                {openings && openings.length === 0 && (
                    <div className="bg-white rounded-2xl border border-[#E6EAF0] shadow-xl p-10 sm:p-14 text-center">
                        <Briefcase className="w-10 h-10 text-[#C4161C] mx-auto" />
                        <p className="mt-4 text-xl font-semibold text-[#111111]">No open positions right now</p>
                        <p className="mt-2 text-gray-500">
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
