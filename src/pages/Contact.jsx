import React, { useState } from 'react';
import { MapPin, Phone, Mail, User, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { contact, formatPhone, telHref } from '@/content/site';
import { CornerMarks } from '@/components/engineering';
import { Container, PageHero, Reveal, Section, SectionLabel, usePageMeta } from '@/components/site/primitives';

const TOPICS = ['Structural Health Monitoring', 'Materials Testing', 'Geo-technical Investigations', 'General Enquiry'];
const EMPTY = { name: '', company: '', email: '', phone: '', topic: '', message: '' };

function Field({ label, optional, children, className }) {
    return (
        <label className={cn('block', className)}>
            <span className="t-label flex items-center justify-between text-kdm-graphite">
                {label}
                {optional && <span className="normal-case tracking-normal text-kdm-muted">Optional</span>}
            </span>
            {children}
        </label>
    );
}

const input =
    'mt-2 w-full border-0 border-b border-kdm-line bg-transparent px-0 py-3 text-[17px] text-kdm-ink placeholder:text-kdm-muted/70 transition-colors focus:border-kdm-blue focus:outline-none focus:ring-0';

// The site has no mail server of its own, so the enquiry composes an email
// to the head office in the visitor's own mail app (and says so) — nothing
// is silently "sent" anywhere.
function EnquiryForm() {
    const [form, setForm] = useState(EMPTY);
    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const submit = (e) => {
        e.preventDefault();
        const subject = `Enquiry${form.topic ? `: ${form.topic}` : ''} — ${form.name}${form.company ? ` (${form.company})` : ''}`;
        const body = [
            form.message,
            '',
            `Name: ${form.name}`,
            form.company && `Company: ${form.company}`,
            `Email: ${form.email}`,
            form.phone && `Phone: ${form.phone}`,
            form.topic && `Regarding: ${form.topic}`,
        ]
            .filter((line) => line !== false && line !== undefined && line !== '')
            .join('\n');
        window.location.href = `mailto:${contact.headOffice.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <form onSubmit={submit} className="relative rounded-panel bg-white p-6 shadow-soft ring-1 ring-kdm-line sm:p-10">
            <CornerMarks />
            <fieldset>
                <legend className="t-label text-kdm-graphite">What can we help with?</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                    {TOPICS.map((t) => (
                        <label key={t} className="cursor-pointer">
                            <input type="radio" name="topic" value={t} checked={form.topic === t} onChange={set('topic')} className="peer sr-only" />
                            <span className="inline-block rounded-tag px-4 py-2 text-sm font-medium text-kdm-graphite ring-1 ring-inset ring-kdm-line transition-colors peer-checked:bg-kdm-blue peer-checked:text-white peer-checked:ring-kdm-blue peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-kdm-blue hover:text-kdm-ink">
                                {t}
                            </span>
                        </label>
                    ))}
                </div>
            </fieldset>

            <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                <Field label="Name">
                    <input required value={form.name} onChange={set('name')} placeholder="Your name" autoComplete="name" className={input} />
                </Field>
                <Field label="Company" optional>
                    <input value={form.company} onChange={set('company')} placeholder="Organisation" autoComplete="organization" className={input} />
                </Field>
                <Field label="Email">
                    <input required type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" autoComplete="email" className={input} />
                </Field>
                <Field label="Phone" optional>
                    <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+91" autoComplete="tel" className={input} />
                </Field>
                <Field label="Message" className="sm:col-span-2">
                    <textarea required rows={4} value={form.message} onChange={set('message')} placeholder="Tell us about the structure, site or project" className={cn(input, 'resize-none')} />
                </Field>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-xs leading-relaxed text-kdm-muted">Sending opens a pre-filled email to our head office in your mail app.</p>
                <button
                    type="submit"
                    className="group inline-flex min-h-[48px] items-stretch justify-center rounded-tag bg-kdm-red text-[15px] font-semibold text-white transition-colors hover:bg-kdm-red-ink active:scale-[0.98]"
                >
                    <span className="flex items-center px-5">Send enquiry</span>
                    <span className="flex w-12 items-center justify-center border-l border-white/30">
                        <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                </button>
            </div>
        </form>
    );
}

export default function Contact() {
    usePageMeta('Contact Us', `${contact.headOffice.company}, ${contact.headOffice.address}. Offices in Hyderabad and Visakhapatnam.`);
    const hq = contact.headOffice;

    return (
        <>
            <PageHero
                index="01"
                eyebrow="Contact"
                title={["Let's build something", 'that lasts.']}
                crumbs={[{ label: 'Contact Us' }]}
                aside={
                    <dl className="border border-kdm-ink/15 bg-white">
                        {contact.branches.map((b, i) => (
                            <div key={b.city} className={cn('grid grid-cols-[7rem_1fr] gap-4 p-5', i > 0 && 'border-t border-kdm-ink/15')}>
                                <dt className="t-label pt-1 text-kdm-muted">{i === 0 ? 'Head office' : 'Branch'}</dt>
                                <dd>
                                    <p className="font-display text-xl font-semibold text-kdm-ink">{b.city}</p>
                                    <a href={telHref(b.phone)} className="t-num mt-1 block text-[15px] text-kdm-blue hover:underline">
                                        {formatPhone(b.phone)}
                                    </a>
                                </dd>
                            </div>
                        ))}
                    </dl>
                }
            >
                Tell us about your structure, site or project — our engineers in Hyderabad and Visakhapatnam will get back to you.
            </PageHero>

            <Section tone="white" className="!pt-10 sm:!pt-16">
                <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <Reveal className="lg:col-span-7">
                        <EnquiryForm />
                    </Reveal>

                    <Reveal delay={0.1} className="space-y-6 lg:col-span-5">
                        <div>
                            <SectionLabel index="02">{hq.label}</SectionLabel>
                            <p className="t-h3 mt-4">{hq.company}</p>
                        </div>
                        {contact.branches.map((b, i) => (
                            <div key={b.city} className={cn('rounded-panel p-6 ring-1', i === 0 ? 'bg-kdm-blue text-white ring-kdm-blue' : 'bg-kdm-paper text-kdm-ink ring-kdm-line')}>
                                <p className={cn('t-label', i === 0 ? 'text-kdm-yellow' : 'text-kdm-red-ink')}>{i === 0 ? 'Head office' : 'Branch & laboratory'}</p>
                                <h2 className="t-h3 mt-2">{b.city}</h2>
                                <p className={cn('mt-4 flex gap-3 text-sm leading-relaxed', i === 0 ? 'text-white/80' : 'text-kdm-graphite')}>
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> {b.address}
                                </p>
                                <div className="mt-5 grid gap-2.5 text-sm">
                                    <p className="flex items-center gap-3">
                                        <User className="h-4 w-4 opacity-60" aria-hidden="true" /> {b.person}
                                    </p>
                                    <a href={telHref(b.phone)} className="flex items-center gap-3 font-display text-lg font-semibold hover:underline">
                                        <Phone className="h-4 w-4 opacity-60" aria-hidden="true" /> {formatPhone(b.phone)}
                                    </a>
                                    <a href={`mailto:${b.email}`} className="flex items-center gap-3 break-all hover:underline">
                                        <Mail className="h-4 w-4 shrink-0 opacity-60" aria-hidden="true" /> {b.email}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </Reveal>
                </Container>
            </Section>

            <section aria-label="Map" className="relative bg-kdm-paper">
                <Container className="relative py-12">
                    <div className="relative overflow-hidden rounded-panel ring-1 ring-kdm-line">
                        <iframe
                            title={`Map: ${hq.address}`}
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(hq.mapQuery)}&t=m&z=15&output=embed`}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="block h-[420px] w-full border-0 saturate-[0.85]"
                        />
                    </div>
                </Container>
            </section>
        </>
    );
}
