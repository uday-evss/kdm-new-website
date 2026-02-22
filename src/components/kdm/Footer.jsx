// import React from 'react';
// import { motion } from 'framer-motion';
// import {
//     Linkedin,
//     Twitter,
//     Youtube,
//     Instagram,
//     ArrowUp,
//     Mail,
//     Phone,
//     MapPin
// } from 'lucide-react';

// export default function Footer() {
//     const scrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     return (
//         <footer className="relative bg-[#050a10] text-white overflow-hidden">
//             {/* Top Wave */}
//             <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4161C]/50 to-transparent" />

//             {/* Main Footer */}
//             <div className="max-w-7xl mx-auto px-6 py-20">
//                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
//                     {/* Brand Column */}
//                     <div className="lg:col-span-1">
//                         <div className="mb-6">
//                             <span className="text-3xl font-bold">
//                                 <span className="text-[#C4161C]">KDM</span>
//                                 <span className="text-white"> Engineers</span>
//                             </span>
//                         </div>
//                         <p className="text-gray-400 text-sm leading-relaxed mb-6">
//                             Pioneering structural health monitoring and infrastructure intelligence solutions.
//                             Making every structure smarter, safer, and more resilient.
//                         </p>
//                         <div className="flex items-center gap-4">
//                             {[Linkedin, Twitter, Youtube, Instagram].map((Icon, i) => (
//                                 <motion.a
//                                     key={i}
//                                     href="#"
//                                     whileHover={{ y: -3 }}
//                                     className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#C4161C] flex items-center justify-center transition-colors duration-300"
//                                 >
//                                     <Icon className="w-4 h-4" />
//                                 </motion.a>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Services Column */}
//                     <div>
//                         <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
//                         <ul className="space-y-3">
//                             {[
//                                 'Structural Health Monitoring',
//                                 'Geotechnical Investigation',
//                                 'Material Testing',
//                                 'Structural Audit',
//                                 'Topographical Survey',
//                                 'DPR & Consulting'
//                             ].map((service, i) => (
//                                 <li key={i}>
//                                     <a href="#" className="text-gray-400 hover:text-[#F2B705] text-sm transition-colors">
//                                         {service}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Quick Links Column */}
//                     <div>
//                         <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
//                         <ul className="space-y-3">
//                             {[
//                                 'About Us',
//                                 'Our Projects',
//                                 'Case Studies',
//                                 'Careers',
//                                 'News & Media',
//                                 'Contact'
//                             ].map((link, i) => (
//                                 <li key={i}>
//                                     <a href="#" className="text-gray-400 hover:text-[#F2B705] text-sm transition-colors">
//                                         {link}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Contact Column */}
//                     <div>
//                         <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
//                         <div className="space-y-4">
//                             <div className="flex items-start gap-3">
//                                 <MapPin className="w-5 h-5 text-[#C4161C] flex-shrink-0 mt-0.5" />
//                                 <p className="text-gray-400 text-sm">
//                                     Corporate Office, Mumbai,<br />
//                                     Maharashtra 400001, India
//                                 </p>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <Phone className="w-5 h-5 text-[#C4161C]" />
//                                 <a href="tel:+912212345678" className="text-gray-400 hover:text-white text-sm transition-colors">
//                                     +91 22 XXXX XXXX
//                                 </a>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <Mail className="w-5 h-5 text-[#C4161C]" />
//                                 <a href="mailto:info@kdmengineers.com" className="text-gray-400 hover:text-white text-sm transition-colors">
//                                     info@kdmengineers.com
//                                 </a>
//                             </div>
//                         </div>

//                         {/* Newsletter */}
//                         <div className="mt-8">
//                             <h5 className="text-sm font-semibold mb-3">Subscribe to Newsletter</h5>
//                             <div className="flex">
//                                 <input
//                                     type="email"
//                                     placeholder="Your email"
//                                     className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-l-lg text-sm focus:outline-none focus:border-[#C4161C]"
//                                 />
//                                 <button className="px-4 py-2 bg-[#C4161C] hover:bg-[#a01218] rounded-r-lg transition-colors">
//                                     <Mail className="w-4 h-4" />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Bottom Bar */}
//             <div className="border-t border-white/10">
//                 <div className="max-w-7xl mx-auto px-6 py-6">
//                     <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//                         <div className="text-sm text-gray-500">
//                             © 2024 KDM Engineers Group. All rights reserved.
//                         </div>
//                         <div className="flex items-center gap-6 text-sm text-gray-500">
//                             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
//                             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
//                             <a href="#" className="hover:text-white transition-colors">Sitemap</a>
//                         </div>
//                         <motion.button
//                             onClick={scrollToTop}
//                             whileHover={{ y: -3 }}
//                             className="w-10 h-10 rounded-full bg-[#C4161C] hover:bg-[#a01218] flex items-center justify-center transition-colors"
//                         >
//                             <ArrowUp className="w-5 h-5" />
//                         </motion.button>
//                     </div>
//                 </div>
//             </div>

//             {/* Decorative Gradient */}
//             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#0E3A5D]/50 to-transparent" />
//         </footer>
//     );
// }




import React from 'react';
import { motion } from 'framer-motion';
import {
    Linkedin,
    Twitter,
    Youtube,
    Instagram,
    ArrowUp,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-[#111111] text-white overflow-hidden">
            {/* Top Wave */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4161C] to-transparent" />

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <span className="text-3xl font-bold">
                                <span className="text-[#C4161C]">KDM</span>
                                <span className="text-white"> Engineers</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Pioneering structural health monitoring and infrastructure intelligence solutions.
                            Making every structure smarter, safer, and more resilient.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Linkedin, Twitter, Youtube, Instagram].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -3 }}
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#C4161C] flex items-center justify-center transition-colors duration-300"
                                >
                                    <Icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
                        <ul className="space-y-3">
                            {[
                                'Structural Health Monitoring',
                                'Geotechnical Investigation',
                                'Material Testing',
                                'Structural Audit',
                                'Topographical Survey',
                                'DPR & Consulting'
                            ].map((service, i) => (
                                <li key={i}>
                                    <a href="#" className="text-gray-400 hover:text-[#F2B705] text-sm transition-colors">
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
                        <ul className="space-y-3">
                            {[
                                'About Us',
                                'Our Projects',
                                'Case Studies',
                                'Careers',
                                'News & Media',
                                'Contact'
                            ].map((link, i) => (
                                <li key={i}>
                                    <a href="#" className="text-gray-400 hover:text-[#F2B705] text-sm transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#C4161C] flex-shrink-0 mt-0.5" />
                                <p className="text-gray-400 text-sm">
                                    Corporate Office, Mumbai,<br />
                                    Maharashtra 400001, India
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-[#C4161C]" />
                                <a href="tel:+912212345678" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    +91 22 1234 5678
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-[#C4161C]" />
                                <a href="mailto:info@kdmengineers.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                                    info@kdmengineers.com
                                </a>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="mt-8">
                            <h5 className="text-sm font-semibold mb-3">Subscribe to Newsletter</h5>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-l-lg text-sm focus:outline-none focus:border-[#C4161C]"
                                />
                                <button className="px-4 py-2 bg-[#C4161C] hover:bg-[#a01218] rounded-r-lg transition-colors">
                                    <Mail className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-500">
                            © 2024 KDM Engineers Group. All rights reserved.
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                        </div>
                        <motion.button
                            onClick={scrollToTop}
                            whileHover={{ y: -3 }}
                            className="w-10 h-10 rounded-full bg-[#C4161C] hover:bg-[#a01218] flex items-center justify-center transition-colors"
                        >
                            <ArrowUp className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Decorative Gradient */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#0E3A5D]/50 to-transparent" />
        </footer>
    );
}