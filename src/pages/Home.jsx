// import React from 'react';
// import Navbar from '@/components/kdm/Navbar';
// import HeroSection from '@/components/kdm/HeroSection';
// import AboutSection from '@/components/kdm/AboutSection';
// import ServicesSection from '@/components/kdm/ServicesSection';
// import SHMShowcase from '@/components/kdm/SHMShowcase';
// import ProjectsSection from '@/components/kdm/ProjectsSection';
// import StatsSection from '@/components/kdm/StatsSection';
// import ClientLogos from '@/components/kdm/ClientLogos';
// import ContactSection from '@/components/kdm/ContactSection';
// import Footer from '@/components/kdm/Footer';

// export default function Home() {
//     return (
//         <div className="min-h-screen bg-[#111111]">
//             <Navbar />
//             <main>
//                 <HeroSection />
//                 <div id="about">
//                     <AboutSection />
//                 </div>
//                 <div id="services">
//                     <ServicesSection />
//                 </div>
//                 <div id="technology">
//                     <SHMShowcase />
//                 </div>
//                 <div id="projects">
//                     <ProjectsSection />
//                 </div>
//                 <StatsSection />
//                 <ClientLogos />
//                 <div id="contact">
//                     <ContactSection />
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// }



import React from 'react';
import Navbar from '@/components/kdm/Navbar';
import HeroSection from '@/components/kdm/HeroSection';
import AboutSection from '@/components/kdm/AboutSection';
import ServicesSection from '@/components/kdm/ServicesSection';
import SHMShowcase from '@/components/kdm/SHMShowcase';
import ProjectsSection from '@/components/kdm/ProjectsSection';
import StatsSection from '@/components/kdm/StatsSection';
import ClientLogos from '@/components/kdm/ClientLogos';
import ContactSection from '@/components/kdm/ContactSection';
import Footer from '@/components/kdm/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#111111]">
            <Navbar />
            <main>
                <HeroSection />
                <div id="about">
                    <AboutSection />
                </div>
                <div id="services">
                    <ServicesSection />
                </div>
                <div id="technology">
                    <SHMShowcase />
                </div>
                <div id="projects">
                    <ProjectsSection />
                </div>
                <StatsSection />
                <ClientLogos />
                <div id="contact">
                    <ContactSection />
                </div>
            </main>
            <Footer />
        </div>
    );
}