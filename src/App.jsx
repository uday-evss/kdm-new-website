import React, { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { MotionConfig } from 'framer-motion';
import { queryClientInstance } from '@/lib/query-client';
import { IntroProvider } from '@/components/brand/IntroLoader';
import SiteLayout from '@/components/site/SiteLayout';
import Home from '@/pages/Home';
import { services } from '@/content/services';
import { projects } from '@/content/projects';

// The home page ships in the main bundle (it's where most visits start);
// every other page loads on demand.
const About = lazy(() => import('@/pages/About'));
const Clients = lazy(() => import('@/pages/Clients'));
const Services = lazy(() => import('@/pages/Services'));
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'));
const ShmPage = lazy(() => import('@/pages/ShmPage'));
const Projects = lazy(() => import('@/pages/Projects'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const Careers = lazy(() => import('@/pages/Careers'));
const CareerDetail = lazy(() => import('@/pages/CareerDetail'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Old WordPress URLs → their pages on this site, so bookmarks, shared links
// and search results keep working after the switch-over. Paths are matched
// with or without the trailing slash WordPress used.
const LEGACY_REDIRECTS = {
    '/home': '/',
    '/about-us': '/about',
    '/our-clients': '/clients',
    '/contact-us': '/contact',
    '/careers-at-kdm-engineers': '/careers',
    '/shm': '/services/structural-health-monitoring',
    ...Object.fromEntries(services.map((s) => [s.legacyPath, `/services/${s.slug}`])),
    ...Object.fromEntries(projects.map((p) => [`/${p.slug}`, `/projects/${p.slug}`])),
    // Six disciplines the wider KDM Engineers Group site used to carry are
    // outside this entity's approved three-department portfolio (see
    // content/services.js) and no longer have pages here — their old
    // WordPress URLs redirect to the services index rather than 404ing.
    // (Visiting their new-style /services/:slug URL already redirects the
    // same way, via ServiceDetail's own "service not found" fallback.)
    '/topo-surveys': '/services',
    '/traffic-survey': '/services',
    '/highways-bridges-buildings-and-irrigation-our-services': '/services',
    '/pavement-investigation-and-pavement-design': '/services',
    '/structural-condition-assessment-rehabilitation': '/services',
    '/kdm-knowledge-share-center-kdmksc': '/services',
};

function LegacyRedirect({ to }) {
    // Keep #anchors (e.g. /about-us/#md-msg) where the new page has them.
    const { hash } = useLocation();
    const anchors = { '#md-msg': '#md-message', '#wings-of-kdm': '#wings', '#our-team': '#team' };
    return <Navigate to={`${to}${anchors[hash] ?? ''}`} replace />;
}

export default function App() {
    return (
        <QueryClientProvider client={queryClientInstance}>
            {/* Transform animations are dropped for people who prefer reduced motion. */}
            <MotionConfig reducedMotion="user">
                <IntroProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route element={<SiteLayout />}>
                                <Route index element={<Home />} />
                                <Route path="about" element={<About />} />
                                <Route path="clients" element={<Clients />} />
                                <Route path="services" element={<Services />} />
                                <Route path="services/structural-health-monitoring" element={<ShmPage />} />
                                <Route path="services/:slug" element={<ServiceDetail />} />
                                <Route path="projects" element={<Projects />} />
                                <Route path="projects/:slug" element={<ProjectDetail />} />
                                <Route path="careers" element={<Careers />} />
                                <Route path="careers/:slug" element={<CareerDetail />} />
                                <Route path="contact" element={<Contact />} />
                                {Object.entries(LEGACY_REDIRECTS).flatMap(([from, to]) => [
                                    <Route key={from} path={from} element={<LegacyRedirect to={to} />} />,
                                    <Route key={`${from}/`} path={`${from}/`} element={<LegacyRedirect to={to} />} />,
                                ])}
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </IntroProvider>
            </MotionConfig>
        </QueryClientProvider>
    );
}
