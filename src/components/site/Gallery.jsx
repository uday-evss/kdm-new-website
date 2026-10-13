import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { Img } from './primitives';

// Full-screen image viewer: arrow keys / buttons to move, Escape or the
// backdrop to close; focus returns to the thumbnail that opened it.
export function Lightbox({ images, index, onClose, onIndex, label }) {
    const closeRef = useRef(null);
    const image = images[index];
    const go = useCallback((delta) => onIndex((index + delta + images.length) % images.length), [index, images.length, onIndex]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
        };
        document.addEventListener('keydown', onKey);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [go, onClose]);

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label={`${label} — photo ${index + 1} of ${images.length}`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-kdm-ink/95 p-4 sm:p-10"
            onClick={onClose}
        >
            <motion.div
                key={image.src}
                drag="x"
                dragElastic={0.2}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                    if (offset.x < -80 || velocity.x < -500) go(1);
                    else if (offset.x > 80 || velocity.x > 500) go(-1);
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="max-h-full max-w-full cursor-grab touch-none active:cursor-grabbing"
                onClick={(e) => e.stopPropagation()}
            >
                <Img
                    image={image}
                    alt={`${label} — photo ${index + 1}`}
                    sizes="100vw"
                    priority
                    className="h-auto max-h-full w-auto max-w-full rounded-card object-contain shadow-lift"
                    style={{ maxWidth: `min(100%, ${image.w}px)`, maxHeight: `min(90vh, ${image.h}px)` }}
                />
            </motion.div>
            <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-tag bg-white/10 p-2.5 text-white hover:bg-white/20"
            >
                <X className="h-6 w-6" />
            </button>
            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            go(-1);
                        }}
                        aria-label="Previous photo"
                        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 rounded-tag bg-white/10 p-3 text-white hover:bg-white/20"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            go(1);
                        }}
                        aria-label="Next photo"
                        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 rounded-tag bg-white/10 p-3 text-white hover:bg-white/20"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                    <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-tag bg-white/10 px-3 py-1 text-sm text-white">
                        {index + 1} / {images.length}
                    </p>
                </>
            )}
        </div>,
        document.body,
    );
}

// A photo gallery in natural aspect ratios (CSS columns), with the category
// filter the old site had (All / Pile Load Test / …) when images carry one.
export default function Gallery({ images, label }) {
    const categories = useMemo(() => [...new Set(images.map((i) => i.category).filter(Boolean))], [images]);
    const [category, setCategory] = useState('All');
    const [open, setOpen] = useState(null);
    const visible = category === 'All' ? images : images.filter((i) => i.category === category);

    return (
        <div>
            {categories.length > 1 && (
                <div role="tablist" aria-label="Filter photos" className="mb-8 flex flex-wrap gap-2">
                    {['All', ...categories].map((c) => (
                        <button
                            key={c}
                            type="button"
                            role="tab"
                            aria-selected={category === c}
                            onClick={() => setCategory(c)}
                            className={cn(
                                'rounded-tag px-4 py-2 text-sm font-medium transition-colors',
                                category === c
                                    ? 'bg-kdm-blue text-white'
                                    : 'bg-white text-kdm-graphite ring-1 ring-inset ring-kdm-line hover:text-kdm-ink',
                            )}
                        >
                            {c}
                            <span className={cn('ml-1.5 text-xs', category === c ? 'text-white/70' : 'text-kdm-muted')}>
                                {c === 'All' ? images.length : images.filter((i) => i.category === c).length}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            <ul className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>li]:mb-4">
                {visible.map((image, i) => (
                    <li key={image.src} className="break-inside-avoid">
                        <button
                            type="button"
                            onClick={() => setOpen(i)}
                            aria-label={`Open ${label} photo ${i + 1}${image.category ? ` (${image.category})` : ''}`}
                            className="group relative block w-full overflow-hidden rounded-card bg-kdm-mist"
                        >
                            <Img
                                image={image}
                                alt=""
                                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04] duration-700 ease-kdm"
                            />
                            <span className="absolute inset-0 flex items-center justify-center bg-kdm-navy/0 group-hover:bg-kdm-navy/30 transition-colors">
                                <Maximize2 className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                            </span>
                        </button>
                    </li>
                ))}
            </ul>

            {open !== null && <Lightbox images={visible} index={open} onIndex={setOpen} onClose={() => setOpen(null)} label={label} />}
        </div>
    );
}
