import React, { useState } from 'react';
import { MapPin, Phone, Mail, User, Send, Building } from 'lucide-react';
import { media } from '@/content/media';
import { contact, formatPhone, telHref } from '@/content/site';
import { services } from '@/content/services';
import { Container, PageHero, Reveal, SectionHeading, usePageMeta } from '@/components/site/primitives';

const EMPTY = { name: '', email: '', phone: '', service: '', message: '' };

// The site has no mail server of its own, so the enquiry form composes an
// email to the head office in the visitor's own mail app (and says so) —
// nothing is silently "sent" anywhere.
function EnquiryForm() {
    const [form, setForm] = useState(EMPTY);
    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
    const input =
        'w-full rounded-xl border border-[#E6EAF0] bg-white px-4 py-3 text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C4161C]';

    const submit = (e) => {
        e.preventDefault();
        const subject = `Enquiry${form.service ? `: ${form.service}` : ''} — ${form.name}`;
        const body = [
            form.message,
            '',
            `Name: ${form.name}`,
            `Email: ${form.email}`,
            form.phone && `Phone: ${form.phone}`,
            form.service && `Service: ${form.service}`,
        ]
            .filter((line) => line !== false && line !== undefined)
            .join('\n');
        window.location.href = `mailto:${contact.headOffice.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <form onSubmit={submit} className="rounded-3xl bg-white p-6 sm:p-10 shadow-xl ring-1 ring-[#E6EAF0]">
            <h2 className="text-2xl font-bold text-[#111111]">Have Questions?</h2>
            <p className="mt-2 text-sm text-gray-500">Send us your enquiry — this opens a pre-filled email in your mail app.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                    <span className="sr-only">Your name</span>
                    <input required value={form.name} onChange={set('name')} placeholder="Your name" autoComplete="name" className={input} />
                </label>
                <label>
                    <span className="sr-only">Email</span>
                    <input required type="email" value={form.email} onChange={set('email')} placeholder="Email" autoComplete="email" className={input} />
                </label>
                <label>
                    <span className="sr-only">Phone</span>
                    <input type="tel" value={form.phone} onChange={set('phone')} placeholder="Phone (optional)" autoComplete="tel" className={input} />
                </label>
                <label className="sm:col-span-2">
                    <span className="sr-only">Service</span>
                    <select value={form.service} onChange={set('service')} className={input}>
                        <option value="">Which service? (optional)</option>
                        {services.map((s) => (
                            <option key={s.slug} value={s.title}>
                                {s.title}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="sm:col-span-2">
                    <span className="sr-only">Message</span>
                    <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="How can we help?" className={input} />
                </label>
            </div>
            <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C4161C] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#A31217] transition-colors">
                <Send className="h-4 w-4" aria-hidden="true" /> Send Enquiry
            </button>
        </form>
    );
}

export default function Contact() {
    usePageMeta('Contact Us', `${contact.headOffice.company}, ${contact.headOffice.address}. Branches in Hyderabad and Visakhapatnam.`);
    const banner = media.banners.find((b) => b.src.includes('/about-us.webp'));
    const hq = contact.headOffice;

    return (
        <>
            <PageHero title="Contact Us" eyebrow="Get in Touch" image={banner} crumbs={[{ label: 'Contact Us' }]}>
                Reach our head office in Hyderabad or our branch in Visakhapatnam.
            </PageHero>

            <section className="bg-[#F5F7FA] py-16 sm:py-24">
                <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <Reveal className="lg:col-span-5 space-y-8">
                        <div>
                            <SectionHeading eyebrow={hq.label} title={hq.company} />
                            <p className="mt-6 flex gap-3 text-gray-600">
                                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#C4161C]" aria-hidden="true" /> {hq.address}
                            </p>
                            <p className="mt-3 flex gap-3 text-gray-600">
                                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#C4161C]" aria-hidden="true" />
                                <a href={`mailto:${hq.email}`} className="break-all hover:text-[#C4161C]">{hq.email}</a>
                            </p>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4161C]">Our Branches</h2>
                            <ul className="mt-5 grid gap-4">
                                {contact.branches.map((b) => (
                                    <li key={b.city} className="rounded-2xl bg-white p-6 ring-1 ring-[#E6EAF0]">
                                        <h3 className="flex items-center gap-2 text-lg font-bold text-[#111111]">
                                            <Building className="h-5 w-5 text-[#C4161C]" aria-hidden="true" /> {b.city}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-gray-600">{b.address}</p>
                                        <div className="mt-4 grid gap-2 text-sm">
                                            <p className="flex items-center gap-2 text-gray-700">
                                                <User className="h-4 w-4 text-gray-400" aria-hidden="true" /> {b.person}
                                            </p>
                                            <a href={telHref(b.phone)} className="flex items-center gap-2 font-medium text-[#111111] hover:text-[#C4161C]">
                                                <Phone className="h-4 w-4 text-gray-400" aria-hidden="true" /> {formatPhone(b.phone)}
                                            </a>
                                            <a href={`mailto:${b.email}`} className="flex items-center gap-2 break-all text-gray-700 hover:text-[#C4161C]">
                                                <Mail className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" /> {b.email}
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1} className="lg:col-span-7">
                        <EnquiryForm />
                    </Reveal>
                </Container>
            </section>

            <section aria-label="Map" className="bg-white">
                <iframe
                    title={`Map: ${hq.address}`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(hq.mapQuery)}&t=m&z=15&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-[420px] w-full border-0 grayscale-[30%]"
                />
            </section>
        </>
    );
}
