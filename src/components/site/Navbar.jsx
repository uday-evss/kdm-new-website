import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { services } from '@/content/services';
import { contact, formatPhone, telHref } from '@/content/site';
import { serviceIcons } from './serviceIcons';

// Mirrors the live site's menu: About Us and Our Services open sub-menus.
export const NAV = [
    { label: 'Home', to: '/' },
    {
        label: 'About Us',
        to: '/about',
        children: [
            { label: 'About the Company', to: '/about' },
            { label: 'Wings of KDM', to: '/about#wings' },
            { label: "MD's Message", to: '/about#md-message' },
            { label: 'Our Team', to: '/about#team' },
        ],
    },
    { label: 'Our Clients', to: '/clients' },
    {
        label: 'Our Services',
        to: '/services',
        children: services.map((s) => ({ label: s.title, to: `/services/${s.slug}`, icon: serviceIcons[s.slug] })),
    },
    { label: 'Careers', to: '/careers' },
];

const hq = contact.branches[0];

function DesktopDropdown({ item, active }) {
    const [open, setOpen] = useState(false);
    const closeTimer = useRef();
    const wide = item.children.length > 5;

    const show = () => {
        clearTimeout(closeTimer.current);
        setOpen(true);
    };
    const hide = () => {
        closeTimer.current = setTimeout(() => setOpen(false), 120);
    };

    return (
        <li
            className="relative"
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        >
            <button
                type="button"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpen((o) => !o)}
                className={cn(
                    'flex items-center gap-1 py-2 text-[15px] font-medium transition-colors',
                    active ? 'text-[#C4161C]' : 'text-gray-700 hover:text-[#C4161C]',
                )}
            >
                {item.label}
                <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.16 }}
                        className={cn(
                            'absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 rounded-2xl border border-[#E6EAF0] bg-white p-2 shadow-2xl',
                            wide ? 'w-[640px]' : 'w-64',
                        )}
                    >
                        <ul className={cn(wide && 'grid grid-cols-2 gap-1')}>
                            {item.children.map((child) => {
                                const Icon = child.icon;
                                return (
                                    <li key={child.to}>
                                        <Link
                                            to={child.to}
                                            onClick={() => setOpen(false)}
                                            className="flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 hover:bg-[#F5F7FA] hover:text-[#C4161C] transition-colors"
                                        >
                                            {Icon && <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#C4161C]" aria-hidden="true" />}
                                            <span>{child.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    );
}

export default function Navbar() {
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close the mobile menu on navigation and lock page scroll while it's open.
    useEffect(() => setMobileOpen(false), [pathname]);
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    const isActive = (item) =>
        item.to === '/' ? pathname === '/' : pathname === item.to || pathname.startsWith(`${item.to}/`);

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            {/* Utility bar */}
            <div
                className={cn(
                    'hidden md:block bg-[#111111] text-gray-300 text-xs transition-all duration-300 overflow-hidden',
                    scrolled ? 'max-h-0' : 'max-h-10',
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-9 items-center justify-between">
                    <span>{hq.address}</span>
                    <div className="flex items-center gap-5">
                        <a href={`mailto:${hq.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
                            <Mail className="h-3.5 w-3.5" aria-hidden="true" /> {hq.email}
                        </a>
                        <a href={telHref(hq.phone)} className="inline-flex items-center gap-1.5 hover:text-white">
                            <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {formatPhone(hq.phone)}
                        </a>
                    </div>
                </div>
            </div>

            <nav
                aria-label="Main"
                className={cn(
                    'border-b transition-all duration-300',
                    scrolled
                        ? 'bg-white/95 backdrop-blur-xl border-[#E6EAF0] shadow-[0_8px_30px_rgba(17,17,17,0.06)]'
                        : 'bg-white border-transparent',
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-[72px] items-center justify-between gap-6">
                    <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="KDM Engineers Group — home">
                        <img src="/images/logo.png" alt="" width="56" height="56" className="h-12 w-auto sm:h-14" />
                        <span className="leading-none">
                            <span className="block text-2xl sm:text-[28px] font-extrabold tracking-tight text-[#C4161C]">KDM</span>
                            <span className="mt-1 block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#111111]">
                                Engineers Group
                            </span>
                        </span>
                    </Link>

                    <ul className="hidden lg:flex items-center gap-7">
                        {NAV.map((item) =>
                            item.children ? (
                                <DesktopDropdown key={item.label} item={item} active={isActive(item)} />
                            ) : (
                                <li key={item.label}>
                                    <NavLink
                                        to={item.to}
                                        end={item.to === '/'}
                                        className={({ isActive: active }) =>
                                            cn(
                                                'py-2 text-[15px] font-medium transition-colors',
                                                active ? 'text-[#C4161C]' : 'text-gray-700 hover:text-[#C4161C]',
                                            )
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ),
                        )}
                    </ul>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/contact"
                            className="hidden sm:inline-flex items-center rounded-full bg-[#C4161C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#A31217] transition-colors"
                        >
                            Contact Us
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileOpen((o) => !o)}
                            aria-expanded={mobileOpen}
                            aria-controls="mobile-menu"
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            className="lg:hidden rounded-full p-2 text-[#111111] hover:bg-[#F5F7FA]"
                        >
                            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto bg-white border-t border-[#E6EAF0]"
                    >
                        <ul className="px-4 py-4">
                            {NAV.map((item) => (
                                <li key={item.label} className="border-b border-[#E6EAF0]">
                                    {item.children ? (
                                        <>
                                            <button
                                                type="button"
                                                aria-expanded={expanded === item.label}
                                                onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                                                className="flex w-full items-center justify-between py-4 text-lg font-medium text-[#111111]"
                                            >
                                                {item.label}
                                                <ChevronDown className={cn('h-5 w-5 transition-transform', expanded === item.label && 'rotate-180')} />
                                            </button>
                                            {expanded === item.label && (
                                                <ul className="pb-3">
                                                    {item.children.map((child) => (
                                                        <li key={child.to}>
                                                            <Link to={child.to} className="block rounded-lg px-3 py-2.5 text-[15px] text-gray-600 hover:bg-[#F5F7FA] hover:text-[#C4161C]">
                                                                {child.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    ) : (
                                        <Link to={item.to} className="block py-4 text-lg font-medium text-[#111111]">
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="px-4 pb-10 space-y-3">
                            <Link to="/contact" className="flex w-full items-center justify-center rounded-full bg-[#C4161C] px-5 py-3 font-semibold text-white">
                                Contact Us
                            </Link>
                            <a href={telHref(hq.phone)} className="flex items-center justify-center gap-2 py-2 text-gray-700">
                                <Phone className="h-4 w-4" /> {formatPhone(hq.phone)}
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
