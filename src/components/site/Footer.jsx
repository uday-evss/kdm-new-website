import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react';
import { company, contact, socials, formatPhone, telHref } from '@/content/site';
import { servicesNav as services } from '@/content/servicesNav';
import { EASE } from '@/lib/motion';
import { LogoMark } from '@/components/brand/Logo';
import { BlueprintGrid } from '@/components/engineering';
import { ABOUT_LINKS } from './Navbar';

const SOCIAL_ICONS = { LinkedIn: Linkedin, Facebook, Instagram, YouTube: Youtube };

const EXPLORE = [
    { label: 'Structural Health Monitoring', to: '/services/structural-health-monitoring' },
    { label: 'Projects', to: '/projects' },
    { label: 'Knowledge Share Center', to: '/services/kdm-knowledge-share-center' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact', to: '/contact' },
];

// The logo's four colours as a measuring strip.
function ColourRule() {
    const segments = ['bg-kdm-blue', 'bg-kdm-cyan', 'bg-kdm-yellow', 'bg-kdm-red'];
    return (
        <div aria-hidden="true" className="flex h-1.5">
            {segments.map((c, i) => (
                <motion.span
                    key={c}
                    className={`${c} h-full flex-1 origin-left`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
                />
            ))}
        </div>
    );
}

function FooterColumn({ title, children }) {
    return (
        <div>
            <h2 className="t-label text-kdm-muted">{title}</h2>
            <ul className="mt-5 space-y-2.5 text-[15px]">{children}</ul>
        </div>
    );
}

function FooterLink({ to, children }) {
    return (
        <li>
            <Link to={to} className="link-draw text-kdm-graphite hover:text-kdm-blue">
                {children}
            </Link>
        </li>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-white">
            <ColourRule />
            <BlueprintGrid className="opacity-70" />

            <div className="container-kdm relative pt-20">
                {/* Statement + logo */}
                <div className="grid gap-12 border-b border-kdm-line pb-16 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <LogoMark className="h-20 sm:h-24" sizes="140px" loading="lazy" />
                        <p className="t-h2 mt-8 max-w-xl">
                            {company.tagline}
                            <span className="text-kdm-red">.</span>
                        </p>
                        <p className="mt-5 max-w-xl text-kdm-graphite">
                            Consultancy, testing services and training under one roof — since {company.foundedYear}.
                        </p>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5">
                        {contact.branches.map((b) => (
                            <address key={b.city} className="not-italic">
                                <p className="t-label text-kdm-red-ink">{b.city}</p>
                                <p className="mt-3 text-sm leading-relaxed text-kdm-graphite">{b.address}</p>
                                <a href={telHref(b.phone)} className="mt-3 block font-display text-lg font-semibold text-kdm-ink hover:text-kdm-blue">
                                    {formatPhone(b.phone)}
                                </a>
                                <a href={`mailto:${b.email}`} className="mt-1 block break-all text-sm text-kdm-graphite hover:text-kdm-blue">
                                    {b.email}
                                </a>
                            </address>
                        ))}
                    </div>
                </div>

                {/* Link columns */}
                <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
                    <FooterColumn title="Services">
                        {services.slice(0, 8).map((s) => (
                            <FooterLink key={s.slug} to={`/services/${s.slug}`}>
                                {s.shortTitle}
                            </FooterLink>
                        ))}
                    </FooterColumn>
                    <FooterColumn title="Company">
                        {ABOUT_LINKS.map((l) => (
                            <FooterLink key={l.to} to={l.to}>
                                {l.label}
                            </FooterLink>
                        ))}
                    </FooterColumn>
                    <FooterColumn title="Explore">
                        {EXPLORE.map((l) => (
                            <FooterLink key={l.to} to={l.to}>
                                {l.label}
                            </FooterLink>
                        ))}
                    </FooterColumn>
                    <div>
                        <h2 className="t-label text-kdm-muted">Resources</h2>
                        <ul className="mt-5 space-y-2.5 text-[15px]">
                            {company.brochures.map((b) => (
                                <li key={b.href}>
                                    <a href={b.href} target="_blank" rel="noopener noreferrer" className="link-draw text-kdm-graphite hover:text-kdm-blue">
                                        {b.title} (PDF)
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <h2 className="t-label mt-10 text-kdm-muted">Follow</h2>
                        <ul className="mt-4 flex gap-2" aria-label="KDM Engineers on social media">
                            {socials.map((s) => {
                                const Icon = SOCIAL_ICONS[s.name];
                                return (
                                    <li key={s.name}>
                                        <a
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={s.name}
                                            className="flex h-11 w-11 items-center justify-center rounded-full text-kdm-graphite ring-1 ring-inset ring-kdm-line transition-colors hover:bg-kdm-blue hover:text-white hover:ring-kdm-blue"
                                        >
                                            <Icon className="h-4 w-4" aria-hidden="true" />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Base line */}
            <div className="relative border-t border-kdm-line">
                <div className="container-kdm flex flex-col items-start justify-between gap-4 py-6 text-xs text-kdm-muted sm:flex-row sm:items-center">
                    <p>
                        © {year} {company.legalName}. All rights reserved.
                    </p>
                    <p className="t-label hidden text-kdm-muted md:block">
                        {company.logoWords.join(' · ')}
                    </p>
                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group inline-flex items-center gap-2 font-medium text-kdm-graphite hover:text-kdm-blue"
                    >
                        Back to top
                        <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
