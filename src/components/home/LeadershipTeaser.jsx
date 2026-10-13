import React from 'react';
import { cn } from '@/lib/utils';
import { company } from '@/content/site';
import { Figure } from '@/components/engineering';
import { Container, Img, RevealLines, SectionLabel, Reveal, Stagger, StaggerItem, TextLink } from '@/components/site/primitives';

// 10 — Company story and leadership: the Managing Director's own words, the
// group's two wings and the milestones it has reached (targets are left to
// the About page's full timeline).
export default function LeadershipTeaser() {
    const md = company.directors[0];
    const quote = company.mdMessage[1];
    const reached = company.milestones.filter((m) => m.done);

    return (
        <section aria-labelledby="leadership-title" className="relative overflow-hidden border-t border-kdm-line bg-kdm-surface py-20 sm:py-28 lg:py-32">
            <Container className="relative grid gap-14 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                    {company.mdPortrait && (
                        <Figure caption={`${md.name} — ${md.role}`} className="max-w-[300px] sm:max-w-sm">
                            <Img
                                image={company.mdPortrait}
                                alt={`${md.name}, ${md.role}`}
                                sizes="(min-width: 1024px) 30vw, 300px"
                                className="aspect-[4/5] w-full rounded-card object-cover object-[40%_30%]"
                            />
                        </Figure>
                    )}
                </div>

                <div className="lg:col-span-8">
                    <SectionLabel index="10">Company &amp; leadership</SectionLabel>
                    <span id="leadership-title" className="sr-only">Company story and leadership</span>
                    <RevealLines as="blockquote" lines={[`“${quote}”`]} className="t-h2 mt-8 !leading-[1.12]" />
                    <Reveal delay={0.1} className="mt-6 text-kdm-graphite">
                        — {md.name}, {md.role}
                    </Reveal>

                    <div className="mt-14 grid gap-10 md:grid-cols-2">
                        <div>
                            <p className="t-label text-kdm-muted">Wings of the group</p>
                            <ul className="mt-4 border-t border-kdm-ink/20">
                                {company.wings.map((w) => (
                                    <li key={w.abbr} className="flex items-baseline justify-between gap-4 border-b border-kdm-line py-3">
                                        <span className="font-medium text-kdm-ink">{w.name}</span>
                                        <span className="t-label text-kdm-muted">{w.abbr}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="t-label text-kdm-muted">Milestones</p>
                            <Stagger as="ol" className="mt-4 border-t border-kdm-ink/20">
                                {reached.map((m, i) => (
                                    <StaggerItem as="li" key={m.year} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-kdm-line py-3">
                                        <span className={cn('t-num text-sm font-medium', i === reached.length - 1 ? 'text-kdm-red-ink' : 'text-kdm-blue')}>{m.year}</span>
                                        <span className="text-[15px] text-kdm-graphite">{m.text}</span>
                                    </StaggerItem>
                                ))}
                            </Stagger>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                        <TextLink to="/about#md-message">Read the MD&apos;s message</TextLink>
                        <TextLink to="/about">Our story, vision &amp; values</TextLink>
                    </div>
                </div>
            </Container>
        </section>
    );
}
