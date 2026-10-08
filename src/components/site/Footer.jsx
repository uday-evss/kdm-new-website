import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';
import { company, contact, socials, formatPhone, telHref } from '@/content/site';
import { services } from '@/content/services';

const SOCIAL_ICONS = { LinkedIn: Linkedin, Facebook, Instagram, YouTube: Youtube };

const COMPANY_LINKS = [
    { label: 'About the Company', to: '/about' },
    { label: 'Wings of KDM', to: '/about#wings' },
    { label: "MD's Message", to: '/about#md-message' },
    { label: 'Our Team', to: '/about#team' },
    { label: 'Our Clients', to: '/clients' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact Us', to: '/contact' },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative bg-[#111111] text-gray-400">
            <div aria-hidden="true" className="h-1 bg-gradient-to-r from-[#C4161C] via-[#F2B705] to-[#0E3A5D]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <Link to="/" className="inline-flex items-center gap-3" aria-label="KDM Engineers Group — home">
                        <img src="/images/logo.png" alt="" width="48" height="48" className="h-12 w-auto" />
                        <span className="leading-none">
                            <span className="block text-2xl font-extrabold text-[#C4161C]">KDM</span>
                            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.28em] text-white">Engineers Group</span>
                        </span>
                    </Link>
                    <p className="mt-6 text-sm leading-relaxed">{company.intro[0]}</p>
                    <ul className="mt-6 flex gap-3" aria-label="KDM Engineers on social media">
                        {socials.map((s) => {
                            const Icon = SOCIAL_ICONS[s.name];
                            return (
                                <li key={s.name}>
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.name}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-300 hover:bg-[#C4161C] hover:text-white transition-colors"
                                    >
                                        <Icon className="h-4 w-4" aria-hidden="true" />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="lg:col-span-3">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Our Services</h2>
                    <ul className="mt-5 space-y-2.5 text-sm">
                        {services.map((s) => (
                            <li key={s.slug}>
                                <Link to={`/services/${s.slug}`} className="hover:text-[#F2B705] transition-colors">
                                    {s.shortTitle}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-2">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h2>
                    <ul className="mt-5 space-y-2.5 text-sm">
                        {COMPANY_LINKS.map((l) => (
                            <li key={l.label}>
                                <Link to={l.to} className="hover:text-[#F2B705] transition-colors">
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-3">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Get in Touch</h2>
                    <address className="mt-5 not-italic space-y-5 text-sm">
                        {contact.branches.map((b) => (
                            <div key={b.city}>
                                <p className="font-semibold text-gray-200">{b.city}</p>
                                <p className="mt-1.5 flex gap-2.5">
                                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C4161C]" aria-hidden="true" />
                                    {b.address}
                                </p>
                                <p className="mt-1.5 flex gap-2.5">
                                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#C4161C]" aria-hidden="true" />
                                    <a href={telHref(b.phone)} className="hover:text-white">{formatPhone(b.phone)}</a>
                                </p>
                                <p className="mt-1.5 flex gap-2.5">
                                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#C4161C]" aria-hidden="true" />
                                    <a href={`mailto:${b.email}`} className="break-all hover:text-white">{b.email}</a>
                                </p>
                            </div>
                        ))}
                    </address>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <p>Copyright © {year} {company.legalName}. All rights reserved.</p>
                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="inline-flex items-center gap-1.5 hover:text-white"
                    >
                        Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
