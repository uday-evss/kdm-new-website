import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    ArrowLeft, Briefcase, Building2, MapPin, Clock, Users, CalendarDays, FileDown, CheckCircle2,
} from 'lucide-react';
import { ERP_API_URL, JdContent, LIVE_QUERY_OPTIONS, formatDateOnly } from '@/components/careers/careersCommon';
import { Container, PageHero, Reveal, Section, usePageMeta } from '@/components/site/primitives';
import { cn } from '@/lib/utils';

// One open role on the website: its full JD with the application form
// alongside. The posting is read from the ERP and the application goes
// straight into the ERP's recruitment pipeline (POST /careers/:slug/apply),
// exactly as from the ERP's own apply page.

const EMPTY_FORM = {
    name: '', email: '', phone: '', currentCtc: '', expectedCtc: '', noticePeriodDays: '', currentLocation: '',
};

function Field({ label, children, className }) {
    return (
        <label className={cn('block', className)}>
            <span className="t-label text-kdm-graphite">{label}</span>
            {children}
        </label>
    );
}

async function fetchPosting(slug) {
    const response = await fetch(`${ERP_API_URL}/careers/${encodeURIComponent(slug)}`);
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || 'This job posting is not available');
    return data.posting;
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
        <Link to="/careers" className="mb-8 inline-flex items-center gap-1.5 text-sm text-kdm-muted hover:text-kdm-blue">
            <ArrowLeft className="w-4 h-4" /> All open positions
        </Link>
    );

    if (isLoading) {
        return (
            <>
                <PageHero index="02" eyebrow="Careers" title="Loading this role…" crumbs={[{ label: 'Careers', to: '/careers' }]} />
                <Section tone="white">
                    <Container>
                        {backLink}
                        <div className="h-96 bg-white rounded-panel border border-kdm-line animate-pulse" />
                    </Container>
                </Section>
            </>
        );
    }

    // A failed re-check keeps showing the role (and whatever the candidate has
    // typed) — if it was closed meanwhile, submitting says so.
    if (!posting) {
        return (
            <>
                <PageHero index="02" eyebrow="Careers" title="This role isn't available" crumbs={[{ label: 'Careers', to: '/careers' }]} />
                <Section tone="white">
                    <Container>
                        {backLink}
                        <div className="bg-white rounded-panel border border-kdm-line shadow-soft p-10 text-center">
                            <p className="text-kdm-graphite font-medium">{error?.message || 'This job posting is not available'}</p>
                            <p className="mt-2 text-sm text-kdm-muted">It may have been filled or closed.</p>
                        </div>
                    </Container>
                </Section>
            </>
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
        'mt-1.5 w-full rounded-card border border-kdm-line px-3 py-2 text-sm transition-colors focus:border-kdm-blue focus:outline-none focus:ring-2 focus:ring-kdm-blue';

    return (
        <>
            <PageHero
                index="02"
                eyebrow="Careers"
                title={posting.title}
                crumbs={[{ label: 'Careers', to: '/careers' }, { label: posting.title }]}
            >
                {facts.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                        {facts.map(({ icon: Icon, text }) => (
                            <li
                                key={text}
                                className="inline-flex items-center gap-1.5 rounded-tag bg-white px-3 py-1.5 text-sm font-medium text-kdm-ink ring-1 ring-inset ring-kdm-line"
                            >
                                <Icon className="w-3.5 h-3.5" /> {text}
                            </li>
                        ))}
                    </ul>
                )}
                {posting.closesOn && (
                    <p className="mt-3 inline-flex items-center gap-1 text-xs text-kdm-muted">
                        <CalendarDays className="w-3.5 h-3.5" /> Apply by {formatDateOnly(posting.closesOn)}
                    </p>
                )}
            </PageHero>

            <Section tone="white" className="!pt-10 sm:!pt-14">
                <Container>
                    {backLink}
                    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-start">
                        {/* Job description */}
                        <Reveal className="lg:col-span-7 bg-white rounded-panel border border-kdm-line shadow-soft p-6 sm:p-8">
                            <div>
                                <a
                                    href="#apply"
                                    className="lg:hidden mt-4 mb-6 inline-flex items-center rounded-tag bg-kdm-red px-4 py-2 text-sm font-semibold text-white hover:bg-kdm-red-ink"
                                >
                                    Apply now
                                </a>
                            </div>

                            <h2 className="t-h3 mb-3">Job Description</h2>
                            {hasJd ? (
                                <JdContent summary={posting.description} sections={posting.jdSections || []} />
                            ) : (
                                <p className="text-sm text-kdm-muted">Details for this role will be shared during the process.</p>
                            )}
                            {posting.jdDownloadPath && (
                                <a
                                    href={`${ERP_API_URL}${posting.jdDownloadPath}`}
                                    className="mt-6 inline-flex items-center gap-2 rounded-tag border border-kdm-blue/30 bg-kdm-blue/5 px-4 py-2 text-sm font-medium text-kdm-blue hover:bg-kdm-blue/10"
                                >
                                    <FileDown className="w-4 h-4" /> Download full JD{posting.jdFileName ? ` (${posting.jdFileName})` : ''}
                                </a>
                            )}
                        </Reveal>

                        {/* Application form */}
                        <Reveal
                            delay={0.1}
                            id="apply"
                            className="lg:col-span-5 lg:sticky lg:top-28 bg-white rounded-panel border border-kdm-line shadow-soft p-6 sm:p-8 scroll-mt-28"
                        >
                            {submitted ? (
                                <div className="text-center py-6">
                                    <CheckCircle2 className="mx-auto text-emerald-500 mb-3 w-10 h-10" />
                                    <h2 className="t-h3">Application Submitted</h2>
                                    <p className="text-kdm-muted text-sm mt-2">
                                        Thank you for applying to {posting.title}. Our team will review your application and reach
                                        out if there's a match.
                                    </p>
                                    <Link to="/careers" className="mt-5 inline-block text-sm font-semibold text-kdm-blue hover:text-kdm-navy">
                                        See other open positions
                                    </Link>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <h2 className="t-h3">Apply for this role</h2>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <Field label="Full name" className="sm:col-span-2">
                                            <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                                        </Field>
                                        <Field label="Email" className="sm:col-span-2">
                                            <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                                        </Field>
                                        <Field label="Phone" className="sm:col-span-2">
                                            <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                                        </Field>
                                        <Field label="Current CTC (₹/yr)">
                                            <input type="number" placeholder="Current CTC" value={form.currentCtc} onChange={(e) => setForm({ ...form, currentCtc: e.target.value })} className={inputClass} />
                                        </Field>
                                        <Field label="Expected CTC (₹/yr)">
                                            <input type="number" placeholder="Expected CTC" value={form.expectedCtc} onChange={(e) => setForm({ ...form, expectedCtc: e.target.value })} className={inputClass} />
                                        </Field>
                                        <Field label="Notice period (days)">
                                            <input type="number" placeholder="Notice period" value={form.noticePeriodDays} onChange={(e) => setForm({ ...form, noticePeriodDays: e.target.value })} className={inputClass} />
                                        </Field>
                                        <Field label="Current location">
                                            <input placeholder="Current location" value={form.currentLocation} onChange={(e) => setForm({ ...form, currentLocation: e.target.value })} className={inputClass} />
                                        </Field>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-kdm-graphite">Resume</label>
                                        <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResume(e.target.files?.[0] ?? null)} className="w-full text-sm" />
                                    </div>
                                    {submitError && <p className="text-sm text-red-600">{submitError}</p>}
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full rounded-tag bg-kdm-red px-4 py-3 text-sm font-semibold text-white transition-colors active:scale-[0.98] hover:bg-kdm-red-ink disabled:opacity-50"
                                    >
                                        {submitting ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </form>
                            )}
                        </Reveal>
                    </div>
                </Container>
            </Section>
        </>
    );
}
