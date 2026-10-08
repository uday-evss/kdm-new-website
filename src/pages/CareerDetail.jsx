import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    ArrowLeft, Briefcase, Building2, MapPin, Clock, Users, CalendarDays, FileDown, CheckCircle2,
} from 'lucide-react';
import { ERP_API_URL, JdContent, LIVE_QUERY_OPTIONS, formatDateOnly } from '@/components/careers/careersCommon';
import { usePageMeta } from '@/components/site/primitives';

// One open role on the website: its full JD with the application form
// alongside. The posting is read from the ERP and the application goes
// straight into the ERP's recruitment pipeline (POST /careers/:slug/apply),
// exactly as from the ERP's own apply page.

const EMPTY_FORM = {
    name: '', email: '', phone: '', currentCtc: '', expectedCtc: '', noticePeriodDays: '', currentLocation: '',
};

async function fetchPosting(slug) {
    const response = await fetch(`${ERP_API_URL}/careers/${encodeURIComponent(slug)}`);
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || 'This job posting is not available');
    return data.posting;
}

function PageShell({ children }) {
    return (
        <div className="bg-[#F5F7FA]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-16 sm:pb-20">{children}</div>
        </div>
    );
}

export default function CareerDetail() {
    const { slug } = useParams();
    const { data: posting, isLoading, error } = useQuery({
        queryKey: ['careers-posting', slug],
        queryFn: () => fetchPosting(slug),
        retry: false,
        ...LIVE_QUERY_OPTIONS,
    });
    usePageMeta(posting ? `${posting.title} — Careers` : 'Careers', posting?.description || undefined);

    const [form, setForm] = useState(EMPTY_FORM);
    const [resume, setResume] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const backLink = (
        <Link to="/careers" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#C4161C] mb-5">
            <ArrowLeft className="w-4 h-4" /> All open positions
        </Link>
    );

    if (isLoading) {
        return (
            <PageShell>
                {backLink}
                <div className="h-96 bg-white rounded-2xl border border-[#E6EAF0] animate-pulse" />
            </PageShell>
        );
    }

    // A failed re-check keeps showing the role (and whatever the candidate has
    // typed) — if it was closed meanwhile, submitting says so.
    if (!posting) {
        return (
            <PageShell>
                {backLink}
                <div className="bg-white rounded-2xl border border-[#E6EAF0] shadow-xl p-10 text-center">
                    <p className="text-gray-700 font-medium">{error?.message || 'This job posting is not available'}</p>
                    <p className="mt-2 text-sm text-gray-500">It may have been filled or closed.</p>
                </div>
            </PageShell>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError(null);
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });
        if (resume) formData.append('resume', resume);
        try {
            const response = await fetch(`${ERP_API_URL}/careers/${encodeURIComponent(slug)}/apply`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(data.message || 'Could not submit your application');
            setSubmitted(true);
        } catch (err) {
            setSubmitError(err.message || 'Could not submit your application');
        } finally {
            setSubmitting(false);
        }
    };

    const facts = [
        posting.department && { icon: Building2, text: posting.department },
        posting.location && { icon: MapPin, text: posting.location },
        posting.employmentType && { icon: Briefcase, text: posting.employmentType },
        posting.experience && { icon: Clock, text: `Experience: ${posting.experience}` },
        posting.positions > 1 && { icon: Users, text: `${posting.positions} positions` },
    ].filter(Boolean);
    const hasJd = Boolean(posting.description || posting.jdSections?.length);
    const inputClass =
        'w-full rounded-xl border border-[#E6EAF0] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4161C]';

    return (
        <PageShell>
            {backLink}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                {/* Job description */}
                <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E6EAF0] shadow-xl p-6 sm:p-8">
                    <div className="flex items-center gap-2 text-[#C4161C] mb-1">
                        <Briefcase className="w-5 h-5" />
                        <span className="text-xs font-semibold uppercase tracking-wide">KDM Engineers · Careers</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#111111]">{posting.title}</h1>
                    {facts.length > 0 && (
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-sm text-gray-500">
                            {facts.map(({ icon: Icon, text }) => (
                                <span key={text} className="inline-flex items-center gap-1">
                                    <Icon className="w-3.5 h-3.5" /> {text}
                                </span>
                            ))}
                        </div>
                    )}
                    {posting.closesOn && (
                        <p className="mt-2 text-xs text-gray-500 inline-flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5" /> Apply by {formatDateOnly(posting.closesOn)}
                        </p>
                    )}
                    <div>
                        <a
                            href="#apply"
                            className="lg:hidden mt-4 inline-flex items-center rounded-full bg-[#C4161C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#A31217]"
                        >
                            Apply now
                        </a>
                    </div>

                    <div className="mt-6 pt-6 border-t border-[#E6EAF0]">
                        <h2 className="font-semibold text-[#111111] mb-3">Job Description</h2>
                        {hasJd ? (
                            <JdContent summary={posting.description} sections={posting.jdSections || []} />
                        ) : (
                            <p className="text-sm text-gray-400">Details for this role will be shared during the process.</p>
                        )}
                        {posting.jdDownloadPath && (
                            <a
                                href={`${ERP_API_URL}${posting.jdDownloadPath}`}
                                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C4161C]/30 bg-[#C4161C]/5 px-4 py-2 text-sm font-medium text-[#C4161C] hover:bg-[#C4161C]/10"
                            >
                                <FileDown className="w-4 h-4" /> Download full JD{posting.jdFileName ? ` (${posting.jdFileName})` : ''}
                            </a>
                        )}
                    </div>
                </div>

                {/* Application form */}
                <div id="apply" className="lg:col-span-2 lg:sticky lg:top-28 bg-white rounded-2xl border border-[#E6EAF0] shadow-xl p-6 sm:p-8 scroll-mt-28">
                    {submitted ? (
                        <div className="text-center py-6">
                            <CheckCircle2 className="mx-auto text-emerald-500 mb-3 w-10 h-10" />
                            <h2 className="text-xl font-bold text-[#111111]">Application Submitted</h2>
                            <p className="text-gray-500 text-sm mt-2">
                                Thank you for applying to {posting.title}. Our team will review your application and reach
                                out if there's a match.
                            </p>
                            <Link to="/careers" className="mt-5 inline-block text-sm font-semibold text-[#C4161C] hover:text-[#A31217]">
                                See other open positions
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h2 className="font-semibold text-[#111111]">Apply for this role</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`col-span-2 ${inputClass}`} />
                                <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`col-span-2 ${inputClass}`} />
                                <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={`col-span-2 ${inputClass}`} />
                                <input type="number" placeholder="Current CTC (₹/yr)" value={form.currentCtc} onChange={(e) => setForm({ ...form, currentCtc: e.target.value })} className={inputClass} />
                                <input type="number" placeholder="Expected CTC (₹/yr)" value={form.expectedCtc} onChange={(e) => setForm({ ...form, expectedCtc: e.target.value })} className={inputClass} />
                                <input type="number" placeholder="Notice period (days)" value={form.noticePeriodDays} onChange={(e) => setForm({ ...form, noticePeriodDays: e.target.value })} className={inputClass} />
                                <input placeholder="Current location" value={form.currentLocation} onChange={(e) => setForm({ ...form, currentLocation: e.target.value })} className={inputClass} />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">Resume</label>
                                <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResume(e.target.files?.[0] ?? null)} className="w-full text-sm" />
                            </div>
                            {submitError && <p className="text-sm text-red-600">{submitError}</p>}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full rounded-full bg-[#C4161C] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#A31217] disabled:opacity-50"
                            >
                                {submitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </PageShell>
    );
}
