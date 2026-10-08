import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X, Phone, Mail, FileDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { services, serviceSummary } from '@/content/services';
import { company, contact, formatPhone, telHref } from '@/content/site';
import Logo from '@/components/brand/Logo';
import { BlueprintGrid, CornerMarks } from '@/components/engineering';
import { ButtonLink, Img, TextLink } from './primitives';
import { serviceIcons } from './serviceIcons';

const SHM = '/services/structural-health-monitoring';
const KSC = '/services/kdm-knowledge-share-center';

export const NAV = [
    { label: 'About', to: '/about', menu: 'about', match: (p) => p === '/about' || p === '/clients' },
    {
        label: 'Services',
        to: '/services',
        menu: 'services',
        match: (p) => p.startsWith('/services') && p !== SHM && p !== KSC,
    },
    { label: 'Monitoring', to: SHM, match: (p) => p === SHM },
    { label: 'Projects', to: '/projects', match: (p) => p.startsWith('/projects') },
    { label: 'Knowledge Center', to: KSC, match: (p) => p === KSC },
    { label: 'Careers', to: '/careers', match: (p) => p.startsWith('/careers') },
];

export const ABOUT_LINKS = [
    { label: 'About the Company', to: '/about', note: 'Foreword, vision, mission and values' },
    { label: 'Wings of KDM', to: '/about#wings', note: 'The two companies of the group' },
    { label: "MD's Message", to: '/about#md-message', note: 'From the Managing Director' },
    { label: 'Leadership', to: '/about#team', note: 'Board of directors' },
    { label: 'Milestones', to: '/about#milestones', note: `Our journey since ${company.foundedYear}` },
    { label: 'Our Clients', to: '/clients', note: 'Government, PSU and private clients' },
];

const hq = contact.branches[0];

// ---------------------------------------------------------------------------
// Desktop panels
// ---------------------------------------------------------------------------

function PanelShell({ id, children, onEnter, onLeave }) {
    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: EASE }}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="absolute inset-x-0 top-full hidden border-b border-kdm-line bg-white shadow-lift lg:block"
        >
            {children}
        </motion.div>
    );
}

function ServicesPanel({ onNavigate, ...shell }) {
    const [active, setActive] = useState(services.find((s) => s.featured) ?? services[0]);
    const Icon = serviceIcons[active.slug];

    return (
        <PanelShell id="menu-services" {...shell}>
            <div className="container-kdm grid grid-cols-12 gap-10 py-10">
                <div className="col-span-7">
                    <p className="t-label flex items-center gap-3 text-kdm-muted">
                        <span className="t-num text-kdm-red-ink">{String(services.length).padStart(2, '0')}</span>
                        <span aria-hidden="true" className="h-px w-8 bg-kdm-ink/30" />
                        Disciplines under one roof
                    </p>
                    <ul className="mt-6 grid grid-cols-2 gap-x-6">
                        {services.map((s, i) => {
                            const ItemIcon = serviceIcons[s.slug];
                            const isActive = s.slug === active.slug;
                            return (
                                <li key={s.slug}>
                                    <Link
                                        to={`/services/${s.slug}`}
                                        onClick={onNavigate}
                                        onMouseEnter={() => setActive(s)}
                                        onFocus={() => setActive(s)}
                                        className={cn(
                                            'group flex items-center gap-4 border-t border-kdm-line py-3.5 transition-colors',
                                            isActive ? 'text-kdm-blue' : 'text-kdm-ink',
                                        )}
                                    >
                                        <span className="t-num w-6 text-xs text-kdm-muted">{String(i + 1).padStart(2, '0')}</span>
                                        <ItemIcon
                                            className={cn('h-[18px] w-[18px] shrink-0 transition-colors', isActive ? 'text-kdm-red' : 'text-kdm-muted')}
                                            aria-hidden="true"
                                        />
                                        <span className="text-[15px] font-medium">{s.shortTitle}</span>
                                        <span
                                            aria-hidden="true"
                                            className={cn(
                                                'ml-auto h-1.5 w-1.5 rounded-full bg-kdm-red transition-all duration-300',
                                                isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
                                            )}
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-6 flex items-center gap-6 border-t border-kdm-line pt-6">
                        <TextLink to="/services" onClick={onNavigate}>All services</TextLink>
                        <a
                            href={company.brochures[0].href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-kdm-graphite hover:text-kdm-blue"
                        >
                            <FileDown className="h-4 w-4" aria-hidden="true" /> {company.brochures[0].title} (PDF)
                        </a>
                    </div>
                </div>

                <div className="col-span-5">
                    <div className="relative overflow-hidden rounded-panel bg-kdm-paper p-5 ring-1 ring-kdm-line">
                        <BlueprintGrid fade={false} className="opacity-60" />
                        <div className="relative">
                            <div className="relative aspect-[16/9] overflow-hidden rounded-card bg-kdm-mist">
                                <AnimatePresence initial={false}>
                                    <motion.div
                                        key={active.slug}
                                        initial={{ opacity: 0, scale: 1.06 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: EASE }}
                                        className="absolute inset-0"
                                    >
                                        <Img image={active.cover} alt="" sizes="480px" className="h-full w-full object-cover" />
                                    </motion.div>
                                </AnimatePresence>
                                <span className="t-label absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-kdm-ink">
                                    Fig. {String(services.indexOf(active) + 1).padStart(2, '0')}
                                </span>
                            </div>
                            <motion.div key={`${active.slug}-text`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }} className="mt-5">
                                <p className="flex items-center gap-2 font-display text-lg font-semibold text-kdm-ink">
                                    <Icon className="h-5 w-5 text-kdm-red" aria-hidden="true" />
                                    {active.shortTitle}
                                </p>
                                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-kdm-graphite">{serviceSummary(active)}</p>
                                <TextLink to={`/services/${active.slug}`} onClick={onNavigate} className="mt-4 text-sm">
                                    Explore service
                                </TextLink>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </PanelShell>
    );
}

function AboutPanel({ onNavigate, ...shell }) {
    return (
        <PanelShell id="menu-about" {...shell}>
            <div className="container-kdm grid grid-cols-12 gap-10 py-10">
                <ul className="col-span-8 grid grid-cols-2 gap-x-8">
                    {ABOUT_LINKS.map((l) => (
                        <li key={l.to}>
                            <Link to={l.to} onClick={onNavigate} className="group block border-t border-kdm-line py-4">
                                <span className="flex items-center justify-between text-[15px] font-medium text-kdm-ink group-hover:text-kdm-blue">
                                    {l.label}
                                    <span aria-hidden="true" className="text-kdm-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-kdm-red">→</span>
                                </span>
                                <span className="mt-1 block text-sm text-kdm-muted">{l.note}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="relative col-span-4 rounded-panel bg-kdm-paper p-6 ring-1 ring-kdm-line">
                    <CornerMarks />
                    <p className="t-label text-kdm-muted">Est. {company.foundedYear}</p>
                    <p className="mt-3 font-display text-2xl font-semibold leading-tight text-kdm-ink">
                        {company.logoWords.map((w) => (
                            <span key={w} className="block">
                                <span className="text-kdm-red">{w[0]}</span>
                                {w.slice(1)}
                            </span>
                        ))}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-kdm-graphite">
                        {company.values.join(' · ')} — the values behind {company.wings.length} companies and one group.
                    </p>
                </div>
            </div>
        </PanelShell>
    );
}

// ---------------------------------------------------------------------------
// Mobile menu
// ---------------------------------------------------------------------------

function MobileMenu({ onClose }) {
    const [servicesOpen, setServicesOpen] = useState(false);
    const item = {
        hidden: { opacity: 0, y: 18 },
        show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: 0.05 + i * 0.05 } }),
    };
    return (
        <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-kdm-paper pt-20 lg:hidden"
        >
            <BlueprintGrid fade={false} className="opacity-50" />
            <nav aria-label="Mobile" className="container-kdm relative pb-12">
                <ul className="border-b border-kdm-line">
                    {NAV.map((n, i) => (
                        <motion.li key={n.label} custom={i} variants={item} initial="hidden" animate="show" className="border-t border-kdm-line">
                            {n.menu === 'services' ? (
                                <>
                                    <button
                                        type="button"
                                        aria-expanded={servicesOpen}
                                        onClick={() => setServicesOpen((o) => !o)}
                                        className="flex w-full items-center justify-between py-4 font-display text-[26px] font-semibold text-kdm-ink"
                                    >
                                        <span className="flex items-baseline gap-3">
                                            <span className="t-num text-xs text-kdm-red-ink">{String(i + 1).padStart(2, '0')}</span>
                                            {n.label}
                                        </span>
                                        <ChevronDown className={cn('h-6 w-6 transition-transform duration-300', servicesOpen && 'rotate-180')} aria-hidden="true" />
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {servicesOpen && (
                                            <motion.ul
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.35, ease: EASE }}
                                                className="overflow-hidden"
                                            >
                                                {services.map((s) => {
                                                    const Icon = serviceIcons[s.slug];
                                                    return (
                                                        <li key={s.slug}>
                                                            <Link to={`/services/${s.slug}`} onClick={onClose} className="flex items-center gap-3 py-2.5 pl-7 text-[15px] text-kdm-graphite">
                                                                <Icon className="h-4 w-4 text-kdm-red" aria-hidden="true" /> {s.shortTitle}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                                <li>
                                                    <Link to="/services" onClick={onClose} className="block py-3 pl-7 text-[15px] font-semibold text-kdm-blue">
                                                        All services →
                                                    </Link>
                                                </li>
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </>
                            ) : (
                                <Link to={n.to} onClick={onClose} className="flex items-baseline gap-3 py-4 font-display text-[26px] font-semibold text-kdm-ink">
                                    <span className="t-num text-xs text-kdm-red-ink">{String(i + 1).padStart(2, '0')}</span>
                                    {n.label}
                                </Link>
                            )}
                        </motion.li>
                    ))}
                </ul>
                <motion.div custom={NAV.length} variants={item} initial="hidden" animate="show" className="mt-8 space-y-5">
                    <ButtonLink to="/contact" onClick={onClose} className="w-full justify-between">
                        Let&apos;s talk
                    </ButtonLink>
                    <div className="grid gap-3 text-sm text-kdm-graphite">
                        <a href={telHref(hq.phone)} className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-kdm-red" aria-hidden="true" /> {formatPhone(hq.phone)}
                        </a>
                        <a href={`mailto:${hq.email}`} className="flex items-center gap-3 break-all">
                            <Mail className="h-4 w-4 shrink-0 text-kdm-red" aria-hidden="true" /> {hq.email}
                        </a>
                    </div>
                </motion.div>
            </nav>
        </motion.div>
    );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

export default function Navbar() {
    const { pathname, hash } = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [menu, setMenu] = useState(null); // 'services' | 'about' | null
    const [hovered, setHovered] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const closeTimer = useRef();
    const triggerRefs = useRef({});

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close everything on navigation.
    useEffect(() => {
        setMenu(null);
        setMobileOpen(false);
    }, [pathname, hash]);

    useEffect(() => {
        if (!mobileOpen) return undefined;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e) => e.key === 'Escape' && setMobileOpen(false);
        document.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = previous;
            document.removeEventListener('keydown', onKey);
        };
    }, [mobileOpen]);

    useEffect(() => {
        if (!menu) return undefined;
        const onKey = (e) => {
            if (e.key !== 'Escape') return;
            triggerRefs.current[menu]?.focus();
            setMenu(null);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [menu]);

    useEffect(() => () => clearTimeout(closeTimer.current), []);

    const openMenu = (name) => {
        clearTimeout(closeTimer.current);
        setMenu(name);
    };
    const scheduleClose = () => {
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setMenu(null), 140);
    };
    const keepOpen = () => clearTimeout(closeTimer.current);

    const solid = scrolled || menu || mobileOpen;
    const activeIndex = NAV.findIndex((n) => n.match(pathname));
    const pillIndex = hovered ?? (menu ? NAV.findIndex((n) => n.menu === menu) : activeIndex);

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <div
                className={cn(
                    'relative z-50 transition-[background-color,box-shadow,border-color] duration-500 ease-kdm',
                    solid ? 'border-b border-kdm-line bg-white/85 shadow-soft backdrop-blur-xl' : 'border-b border-transparent bg-transparent',
                )}
            >
                <div className={cn('container-kdm flex items-center justify-between gap-6 transition-[height] duration-500 ease-kdm', scrolled ? 'h-16' : 'h-20')}>
                    <Logo compact={scrolled} />

                    <nav aria-label="Main" className="hidden lg:block">
                        <ul className="flex items-center" onMouseLeave={() => setHovered(null)}>
                            {NAV.map((n, i) => {
                                const isActive = i === activeIndex;
                                const pill = i === pillIndex && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        aria-hidden="true"
                                        className="absolute inset-0 -z-10 rounded-full bg-kdm-ink/[0.05]"
                                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                                    />
                                );
                                const cls = cn(
                                    'relative z-0 flex items-center gap-1 rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors xl:px-4',
                                    isActive ? 'text-kdm-blue' : 'text-kdm-graphite hover:text-kdm-ink',
                                );
                                const dot = isActive && (
                                    <span aria-hidden="true" className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-kdm-red" />
                                );
                                return (
                                    <li
                                        key={n.label}
                                        onMouseEnter={() => {
                                            setHovered(i);
                                            if (n.menu) openMenu(n.menu);
                                            else scheduleClose();
                                        }}
                                        onMouseLeave={() => n.menu && scheduleClose()}
                                    >
                                        {n.menu ? (
                                            <>
                                            <button
                                                type="button"
                                                ref={(el) => {
                                                    triggerRefs.current[n.menu] = el;
                                                }}
                                                aria-expanded={menu === n.menu}
                                                aria-controls={`menu-${n.menu}`}
                                                onClick={() => setMenu((m) => (m === n.menu ? null : n.menu))}
                                                onFocus={() => setMenu((m) => (m && m !== n.menu ? null : m))}
                                                className={cls}
                                            >
                                                {pill}
                                                {n.label}
                                                <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-300', menu === n.menu && 'rotate-180')} aria-hidden="true" />
                                                {dot}
                                            </button>
                                            {/* Rendered inside the item so Tab moves straight into the panel. */}
                                            <AnimatePresence>
                                                {menu === n.menu && (
                                                    n.menu === 'services' ? (
                                                        <ServicesPanel onNavigate={() => setMenu(null)} onEnter={keepOpen} onLeave={scheduleClose} />
                                                    ) : (
                                                        <AboutPanel onNavigate={() => setMenu(null)} onEnter={keepOpen} onLeave={scheduleClose} />
                                                    )
                                                )}
                                            </AnimatePresence>
                                            </>
                                        ) : (
                                            <Link to={n.to} className={cls} aria-current={isActive ? 'page' : undefined} onFocus={() => setMenu(null)}>
                                                {pill}
                                                {n.label}
                                                {dot}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-2">
                        <ButtonLink to="/contact" size="sm" className="hidden sm:inline-flex">
                            Let&apos;s talk
                        </ButtonLink>
                        <button
                            type="button"
                            onClick={() => setMobileOpen((o) => !o)}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            className="flex h-11 w-11 items-center justify-center rounded-full text-kdm-ink ring-1 ring-inset ring-kdm-line hover:bg-white lg:hidden"
                        >
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>{mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}</AnimatePresence>
        </header>
    );
}
