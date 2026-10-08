import React from 'react';

// Shared by the Careers list and the job detail/apply page, which use the
// website's own look (KDM red/dark palette, normal site title and logo).

// Open positions, JDs and applications all come live from the KDM ERP.
export const ERP_API_URL = (import.meta.env.VITE_ERP_API_URL || 'https://erp.kdmengineers.com/api').replace(/\/$/, '');

// HR changes openings in the ERP at any time, so these pages re-check
// whenever the visitor comes back to the tab (the site's default is not to)
// and, for the list, every 30 seconds while it's open.
export const LIVE_QUERY_OPTIONS = { refetchOnWindowFocus: 'always', staleTime: 0 };
export const LIST_REFRESH_MS = 30000;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// closesOn is a plain "YYYY-MM-DD" date — read it as-is rather than through
// Date(), which would shift it across timezones.
export const formatDateOnly = (value) => {
    const [y, m, d] = value.split('-').map(Number);
    return `${d} ${MONTHS[m - 1]} ${y}`;
};

// Lines starting with "-", "•" or "*" are bullet points in a JD section.
const BULLET = /^\s*[-•*]\s+/;

const renderBody = (body) => {
    const blocks = [];
    let bullets = [];
    let paragraph = [];
    const flushBullets = () => {
        if (!bullets.length) return;
        blocks.push(
            <ul key={blocks.length} className="list-disc pl-5 space-y-1">
                {bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>,
        );
        bullets = [];
    };
    const flushParagraph = () => {
        if (!paragraph.length) return;
        blocks.push(<p key={blocks.length} className="whitespace-pre-line">{paragraph.join('\n')}</p>);
        paragraph = [];
    };
    for (const line of body.split('\n')) {
        if (BULLET.test(line)) {
            flushParagraph();
            bullets.push(line.replace(BULLET, ''));
        } else if (!line.trim()) {
            flushBullets();
            flushParagraph();
        } else {
            flushBullets();
            paragraph.push(line);
        }
    }
    flushBullets();
    flushParagraph();
    return blocks;
};

// The JD exactly as the ERP renders it: summary, then each section.
export function JdContent({ summary, sections }) {
    return (
        <div className="space-y-5 text-[15px] text-gray-600 leading-relaxed">
            {summary && <p className="whitespace-pre-line">{summary}</p>}
            {sections.map((s, i) => (
                <section key={i}>
                    <h3 className="font-semibold text-[#111111] mb-1.5">{s.heading}</h3>
                    <div className="space-y-2">{renderBody(s.body)}</div>
                </section>
            ))}
        </div>
    );
}
