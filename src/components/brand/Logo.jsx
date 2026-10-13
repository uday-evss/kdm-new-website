import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

// The KDM logo (the original emblem, optimised) beside a typeset wordmark.
export const LOGO = {
    src: '/media/brand/kdm-logo-192.webp',
    srcSet: '/media/brand/kdm-logo-96.webp 96w, /media/brand/kdm-logo-192.webp 192w, /media/brand/kdm-logo-384.webp 384w',
    w: 1158,
    h: 856,
};

export function LogoMark({ className, sizes = '96px', ...rest }) {
    return (
        <img
            src={LOGO.src}
            srcSet={LOGO.srcSet}
            sizes={sizes}
            width={LOGO.w}
            height={LOGO.h}
            alt=""
            decoding="async"
            className={cn('h-auto w-auto', className)}
            {...rest}
        />
    );
}

export default function Logo({ compact = false, tone = 'dark', className }) {
    return (
        <Link to="/" aria-label="KDM Engineers (India) Pvt. Ltd. — home" className={cn('group flex shrink-0 items-center gap-3', className)}>
            <LogoMark
                className={cn('transition-[height] duration-500 ease-kdm', compact ? 'h-9' : 'h-11 sm:h-12')}
                sizes={compact ? '52px' : '68px'}
            />
            <span className="leading-none">
                <span className={cn('block font-display text-[22px] font-bold tracking-tight', tone === 'light' ? 'text-white' : 'text-kdm-ink')}>
                    KDM<span className="text-kdm-red">.</span>
                </span>
                <span className={cn('t-label mt-1 block !text-[9.5px] !tracking-[0.24em]', tone === 'light' ? 'text-white/70' : 'text-kdm-muted')}>
                    Engineers India
                </span>
            </span>
        </Link>
    );
}
