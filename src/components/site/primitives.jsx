import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EASE, VIEWPORT, fadeUp, lineRise, stagger } from '@/lib/motion';
import { SITE_URL } from '@/content/site';
import { BlueprintGrid, Figure, MeasureRule } from '@/components/engineering';
import { useIntroDone } from '@/components/brand/IntroLoader';

// Shared building blocks used by every page: page metadata, responsive
// images, reveals, layout, headings, buttons and the inner-page hero.

const SITE_NAME = 'KDM Engineers Group';
const DEFAULT_TITLE = `${SITE_NAME} — Complete Civil Engineering Solutions`;

function setMeta(attr, key, content) {
    let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
}

// Sets the tab title, description, canonical URL and share-preview tags.
export function usePageMeta(title, description, { image } = {}) {
    useEffect(() => {
        const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
        const url = `${SITE_URL}${window.location.pathname === '/' ? '/' : window.location.pathname.replace(/\/$/, '')}`;
        document.title = fullTitle;
        setMeta('property', 'og:title', fullTitle);
        setMeta('name', 'twitter:title', fullTitle);
        setMeta('property', 'og:url', url);
        if (description) {
            setMeta('name', 'description', description);
            setMeta('property', 'og:description', description);
            setMeta('name', 'twitter:description', description);
        }
        const imageUrl = image ? `${SITE_URL}${image}` : `${SITE_URL}/og-image.jpg`;
        setMeta('property', 'og:image', imageUrl);
        setMeta('name', 'twitter:image', imageUrl);
        let canonical = document.head.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', url);
    }, [title, description, image]);
}

// A media-registry image ({ src, sm, w, h }): the browser picks the small or
// full-size file for the space it gets, and the intrinsic size is reserved
// up front so nothing jumps while it loads.
export function Img({ image, alt, sizes = '100vw', className, priority = false, ...rest }) {
    if (!image) return null;
    const srcSet = image.sm && image.sm !== image.src ? `${image.sm} 720w, ${image.src} ${image.w}w` : undefined;
    return (
        <img
            src={image.src}
            srcSet={srcSet}
            sizes={srcSet ? sizes : undefined}
            width={image.w}
            height={image.h}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            // eslint-disable-next-line react/no-unknown-property -- React 18 passes the lowercase attribute through
            fetchpriority={priority ? 'high' : undefined}
            decoding="async"
            className={className}
            {...rest}
        />
    );
}

// An image uncovered by a wipe (like a drawing sheet being revealed), with a
// slow settle in scale. Pass `animate` to control it instead of the viewport.
export function MaskedImage({ image, alt = '', className, imgClassName, sizes, priority, animate }) {
    const trigger = animate === undefined ? { whileInView: 'show', viewport: VIEWPORT } : { animate: animate ? 'show' : 'hidden' };
    return (
        <motion.div
            initial="hidden"
            {...trigger}
            variants={{ hidden: { clipPath: 'inset(0% 0% 100% 0%)' }, show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.1, ease: EASE } } }}
            className={cn('relative overflow-hidden bg-kdm-mist', className)}
        >
            <motion.div
                variants={{ hidden: { scale: 1.12 }, show: { scale: 1, transition: { duration: 1.6, ease: EASE } } }}
                className="h-full w-full"
            >
                <Img image={image} alt={alt} sizes={sizes} priority={priority} className={cn('h-full w-full object-cover', imgClassName)} />
            </motion.div>
        </motion.div>
    );
}

// Fades content up as it scrolls into view. Motion is reduced automatically
// for people who prefer it (MotionConfig in App).
export function Reveal({ children, delay = 0, className, as = 'div', ...rest }) {
    const Component = motion[as];
    return (
        <Component
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={{ hidden: fadeUp.hidden, show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay } } }}
            className={className}
            {...rest}
        >
            {children}
        </Component>
    );
}

// Children that reveal one after another (each child should be a
// <motion.x variants={fadeUp}> or use <StaggerItem>).
export function Stagger({ children, className, as = 'div', gap = 0.07, delay = 0, ...rest }) {
    const Component = motion[as];
    return (
        <Component initial="hidden" whileInView="show" viewport={VIEWPORT} variants={stagger(gap, delay)} className={className} {...rest}>
            {children}
        </Component>
    );
}

export function StaggerItem({ children, className, as = 'div', ...rest }) {
    const Component = motion[as];
    return (
        <Component variants={fadeUp} className={className} {...rest}>
            {children}
        </Component>
    );
}

// Headline lines rising out of their own masks, one after another.
// Pass `animate` (true/false) to control it directly, e.g. to wait for the
// intro; otherwise it plays when it scrolls into view.
export function RevealLines({ lines, as = 'h2', className, lineClassName, delay = 0, animate }) {
    const Component = motion[as];
    const trigger = animate === undefined ? { whileInView: 'show', viewport: VIEWPORT } : { animate: animate ? 'show' : 'hidden' };
    return (
        <Component initial="hidden" {...trigger} variants={stagger(0.09, delay)} className={className}>
            {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                    <motion.span variants={lineRise} className={cn('block', lineClassName)}>
                        {line}
                    </motion.span>
                </span>
            ))}
        </Component>
    );
}

export function Container({ className, children }) {
    return <div className={cn('container-kdm', className)}>{children}</div>;
}

const TONES = {
    white: 'bg-white',
    paper: 'bg-kdm-paper',
    surface: 'bg-kdm-surface',
    mist: 'bg-kdm-mist',
};

export function Section({ id, tone = 'white', className, children, ...rest }) {
    return (
        <section id={id} className={cn('relative scroll-mt-20 py-20 sm:py-28 lg:py-32', TONES[tone], className)} {...rest}>
            {children}
        </section>
    );
}

// "03 —— What KDM does": the numbered label that opens every section.
export function SectionLabel({ index, children, className, tone = 'dark' }) {
    return (
        <p className={cn('t-label flex items-center gap-3', tone === 'light' ? 'text-white/70' : 'text-kdm-muted', className)}>
            {index && <span className={cn('t-num', tone === 'light' ? 'text-kdm-yellow' : 'text-kdm-red-ink')}>{index}</span>}
            <span aria-hidden="true" className={cn('h-px w-8', tone === 'light' ? 'bg-white/40' : 'bg-kdm-ink/30')} />
            <span>{children}</span>
        </p>
    );
}

// Label + title (+ lead paragraph). Pass `title` as an array to have each
// line rise in on its own.
export function SectionHeading({ index, label, title, children, align = 'left', tone = 'dark', className, titleClassName, as = 'h2' }) {
    const centered = align === 'center';
    const lines = Array.isArray(title) ? title : [title];
    return (
        <div className={cn(centered && 'mx-auto text-center', 'max-w-3xl', className)}>
            {label && <SectionLabel index={index} tone={tone} className={cn(centered && 'justify-center')}>{label}</SectionLabel>}
            <RevealLines
                as={as}
                lines={lines}
                className={cn('t-h2 mt-5', tone === 'light' && 'text-white', titleClassName)}
            />
            {children && (
                <Reveal delay={0.15} className={cn('t-lead mt-6', tone === 'light' && 'text-white/75', centered && 'mx-auto')}>
                    {children}
                </Reveal>
            )}
        </div>
    );
}

// Arrow that slides out to the right while a twin slides in from the left.
export function SlideArrow({ className }) {
    return (
        <span aria-hidden="true" className={cn('relative inline-flex h-4 w-4 overflow-hidden', className)}>
            <ArrowRight className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-kdm group-hover:translate-x-[130%] group-focus-visible:translate-x-[130%]" />
            <ArrowRight className="absolute inset-0 h-4 w-4 -translate-x-[130%] transition-transform duration-500 ease-kdm group-hover:translate-x-0 group-focus-visible:translate-x-0" />
        </span>
    );
}

const BUTTON = {
    primary: 'bg-kdm-blue text-white hover:bg-kdm-navy shadow-[0_10px_24px_-12px_rgb(21_59_143/0.7)]',
    red: 'bg-kdm-red text-white hover:bg-kdm-red-ink shadow-[0_10px_24px_-12px_rgb(226_50_31/0.7)]',
    secondary: 'bg-white text-kdm-ink ring-1 ring-inset ring-kdm-line hover:ring-kdm-ink/30',
    light: 'bg-white text-kdm-ink hover:bg-kdm-paper',
    'ghost-light': 'text-white ring-1 ring-inset ring-white/40 hover:bg-white/10',
};

const CHIP = {
    primary: 'bg-white/15 group-hover:bg-kdm-red',
    red: 'bg-white/15 group-hover:bg-white/25',
    secondary: 'bg-kdm-surface text-kdm-blue group-hover:bg-kdm-blue group-hover:text-white',
    light: 'bg-kdm-surface text-kdm-blue group-hover:bg-kdm-red group-hover:text-white',
    'ghost-light': 'bg-white/15 group-hover:bg-kdm-red',
};

// The KDM button: a pill with a round "arrow cell" that changes colour and
// slides its arrow on hover, and settles slightly when pressed.
export function ButtonLink({ to, href, variant = 'primary', size = 'md', arrow = true, className, children, ...rest }) {
    const classes = cn(
        'group relative inline-flex select-none items-center justify-center gap-3 rounded-full font-semibold transition-[background-color,box-shadow,color,transform] duration-300 ease-kdm active:scale-[0.97]',
        size === 'md' ? 'min-h-[48px] text-[15px]' : 'min-h-[40px] text-sm',
        arrow ? (size === 'md' ? 'py-1.5 pl-6 pr-1.5' : 'py-1 pl-4 pr-1') : 'px-6 py-3',
        BUTTON[variant],
        className,
    );
    const content = (
        <>
            <span>{children}</span>
            {arrow && (
                <span className={cn('flex shrink-0 items-center justify-center rounded-full transition-colors duration-300', size === 'md' ? 'h-9 w-9' : 'h-8 w-8', CHIP[variant])}>
                    <SlideArrow />
                </span>
            )}
        </>
    );
    if (href) {
        return (
            <a href={href} className={classes} {...rest}>
                {content}
            </a>
        );
    }
    if (to) {
        return (
            <Link to={to} className={classes} {...rest}>
                {content}
            </Link>
        );
    }
    return (
        <button type="button" className={classes} {...rest}>
            {content}
        </button>
    );
}

// "Explore service →" — a quiet text link with a drawn underline.
export function TextLink({ to, href, children, className, tone = 'blue', ...rest }) {
    const classes = cn(
        'group inline-flex items-center gap-2 text-[15px] font-semibold',
        tone === 'light' ? 'text-white' : tone === 'red' ? 'text-kdm-red-ink' : 'text-kdm-blue',
        className,
    );
    const content = (
        <>
            <span className="link-draw pb-0.5">{children}</span>
            <SlideArrow />
        </>
    );
    return href ? (
        <a href={href} className={classes} {...rest}>
            {content}
        </a>
    ) : (
        <Link to={to} className={classes} {...rest}>
            {content}
        </Link>
    );
}

// A measured list: each item sits on a hairline with a small square marker.
export function CheckList({ items, columns = 1, className, numbered = false }) {
    return (
        <ul className={cn('grid gap-x-10', columns === 2 && 'sm:grid-cols-2', className)}>
            {items.map((item, i) => (
                <li key={item} className="flex gap-4 border-t border-kdm-line py-3.5 leading-relaxed text-kdm-graphite">
                    {numbered ? (
                        <span className="t-num w-6 shrink-0 pt-0.5 text-xs font-medium text-kdm-red-ink">{String(i + 1).padStart(2, '0')}</span>
                    ) : (
                        <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-kdm-cyan" />
                    )}
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

export function Breadcrumbs({ crumbs }) {
    return (
        <nav aria-label="Breadcrumb">
            <ol className="t-label flex flex-wrap items-center gap-1.5 text-kdm-muted">
                <li>
                    <Link to="/" className="hover:text-kdm-blue">Home</Link>
                </li>
                {crumbs.map((c) => (
                    <li key={c.label} className="flex items-center gap-1.5">
                        <ChevronRight className="h-3 w-3" aria-hidden="true" />
                        {c.to ? (
                            <Link to={c.to} className="hover:text-kdm-blue">{c.label}</Link>
                        ) : (
                            <span className="text-kdm-ink" aria-current="page">{c.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

// The light, drawing-sheet hero at the top of inner pages: breadcrumb,
// label, title and lead on a blueprint grid, with an optional framed image.
export function PageHero({ title, eyebrow, image, imageAlt = '', caption, crumbs = [], children, aside, index = '00' }) {
    const lines = Array.isArray(title) ? title : [title];
    const hasSide = Boolean(image || aside);
    const ready = useIntroDone();
    const enter = ready ? 'show' : 'hidden';
    return (
        <section className="relative isolate overflow-hidden bg-kdm-paper pb-14 pt-28 sm:pb-20 sm:pt-36">
            <BlueprintGrid />
            <div aria-hidden="true" className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-kdm-cyan/10 blur-3xl" />
            <Container>
                <Breadcrumbs crumbs={crumbs} />
                <div className={cn('mt-10 grid items-end gap-12', hasSide && 'lg:grid-cols-12 lg:gap-16')}>
                    <div className={cn(hasSide && 'lg:col-span-7')}>
                        {eyebrow && <SectionLabel index={index}>{eyebrow}</SectionLabel>}
                        <RevealLines as="h1" lines={lines} animate={ready} className="t-h1 mt-5" />
                        {children && (
                            <motion.div
                                initial="hidden"
                                animate={enter}
                                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.3 } } }}
                                className="t-lead mt-7 max-w-2xl"
                            >
                                {children}
                            </motion.div>
                        )}
                    </div>
                    {hasSide && (
                        <motion.div
                            initial="hidden"
                            animate={enter}
                            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: 0.15 } } }}
                            className="lg:col-span-5"
                        >
                            {aside ?? (
                                <Figure caption={caption}>
                                    <MaskedImage
                                        image={image}
                                        alt={imageAlt}
                                        priority
                                        animate={ready}
                                        sizes="(min-width: 1024px) 40vw, 100vw"
                                        className="aspect-[4/3] rounded-card"
                                    />
                                </Figure>
                            )}
                        </motion.div>
                    )}
                </div>
            </Container>
            <Container className="mt-14 sm:mt-20">
                <MeasureRule />
            </Container>
        </section>
    );
}
