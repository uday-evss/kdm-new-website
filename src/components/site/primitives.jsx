import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Small, shared building blocks used by every page: responsive images,
// scroll-in reveals, section headings, the page banner, and page metadata.

const SITE_NAME = 'KDM Engineers Group';

// Sets the tab title and meta description for a page.
export function usePageMeta(title, description) {
    useEffect(() => {
        document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Complete Civil Engineering Solutions`;
        if (description) {
            let tag = document.querySelector('meta[name="description"]');
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('name', 'description');
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', description);
        }
    }, [title, description]);
}

// A media-registry image ({ src, sm, w, h }): the browser picks the small or
// full-size file for the space it gets, and the intrinsic size is reserved
// up front so nothing jumps while it loads.
export function Img({ image, alt, sizes = '100vw', className, priority = false, ...rest }) {
    if (!image) return null;
    const srcSet = image.sm ? `${image.sm} 720w, ${image.src} ${image.w}w` : undefined;
    return (
        <img
            src={image.src}
            srcSet={srcSet}
            sizes={srcSet ? sizes : undefined}
            width={image.w}
            height={image.h}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className={className}
            {...rest}
        />
    );
}

// Fades content up as it scrolls into view (instantly visible for people who
// prefer reduced motion).
export function Reveal({ children, delay = 0, className, as = 'div' }) {
    const reduce = useReducedMotion();
    const Component = motion[as];
    if (reduce) return React.createElement(as, { className }, children);
    return (
        <Component
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </Component>
    );
}

export function Container({ className, children }) {
    return <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

// Eyebrow + title + the short red rule the brand uses under headings.
export function SectionHeading({ eyebrow, title, children, align = 'left', tone = 'light', className }) {
    const centered = align === 'center';
    return (
        <div className={cn(centered && 'text-center mx-auto', 'max-w-3xl', className)}>
            {eyebrow && (
                <p className={cn('text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]', tone === 'dark' ? 'text-[#F2B705]' : 'text-[#C4161C]')}>
                    {eyebrow}
                </p>
            )}
            <h2 className={cn('mt-3 text-3xl sm:text-4xl font-bold tracking-tight', tone === 'dark' ? 'text-white' : 'text-[#111111]')}>
                {title}
            </h2>
            <span aria-hidden="true" className={cn('mt-5 block h-1 w-16 rounded-full bg-[#C4161C]', centered && 'mx-auto')} />
            {children && (
                <div className={cn('mt-6 text-base sm:text-lg leading-relaxed', tone === 'dark' ? 'text-gray-300' : 'text-gray-600')}>
                    {children}
                </div>
            )}
        </div>
    );
}

// The banner at the top of inner pages: photo, title and breadcrumb.
export function PageHero({ title, eyebrow, image, crumbs = [], children }) {
    return (
        <section className="relative isolate overflow-hidden bg-[#111111] pt-32 pb-16 sm:pt-40 sm:pb-24">
            {image && (
                <Img image={image} alt="" sizes="100vw" priority className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" />
            )}
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#111111] via-[#111111]/85 to-[#111111]/30" />
            <Container>
                <nav aria-label="Breadcrumb" className="mb-6">
                    <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-400">
                        <li>
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        </li>
                        {crumbs.map((c) => (
                            <li key={c.label} className="flex items-center gap-1.5">
                                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                                {c.to ? (
                                    <Link to={c.to} className="hover:text-white transition-colors">{c.label}</Link>
                                ) : (
                                    <span className="text-gray-200" aria-current="page">{c.label}</span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
                {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F2B705]">{eyebrow}</p>}
                <h1 className="mt-3 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-white">{title}</h1>
                <span aria-hidden="true" className="mt-6 block h-1 w-20 rounded-full bg-[#C4161C]" />
                {children && <div className="mt-6 max-w-2xl text-lg text-gray-300 leading-relaxed">{children}</div>}
            </Container>
        </section>
    );
}

// A check-marked list, optionally in two columns.
export function CheckList({ items, columns = 1, className }) {
    return (
        <ul className={cn('grid gap-x-8 gap-y-3', columns === 2 && 'sm:grid-cols-2', className)}>
            {items.map((item) => (
                <li key={item} className="flex gap-3 text-gray-700 leading-relaxed">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C4161C]/10">
                        <Check className="h-3.5 w-3.5 text-[#C4161C]" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

// Primary / secondary call-to-action links in the site's rounded style.
export function ButtonLink({ to, href, variant = 'primary', className, children, ...rest }) {
    const classes = cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4161C]',
        variant === 'primary' && 'bg-[#C4161C] text-white hover:bg-[#A31217]',
        variant === 'outline' && 'border-2 border-[#C4161C] text-[#C4161C] hover:bg-[#C4161C] hover:text-white',
        variant === 'light' && 'bg-white text-[#111111] hover:bg-gray-100',
        variant === 'ghost-light' && 'border border-white/30 text-white hover:bg-white/10',
        className,
    );
    if (href) {
        return (
            <a href={href} className={classes} {...rest}>
                {children}
            </a>
        );
    }
    return (
        <Link to={to} className={classes} {...rest}>
            {children}
        </Link>
    );
}
