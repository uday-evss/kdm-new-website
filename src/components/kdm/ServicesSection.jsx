// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//     Activity,
//     Layers,
//     TestTube2,
//     Shield,
//     Map,
//     FileText,
//     ArrowRight,
//     Zap
// } from 'lucide-react';

// const services = [
//     {
//         id: 'shm',
//         icon: Activity,
//         title: 'Structural Health Monitoring',
//         shortDesc: 'Real-time infrastructure intelligence',
//         fullDesc: 'Advanced sensor networks and AI-powered analytics for continuous structural monitoring. Our SHM solutions provide 24/7 surveillance of bridges, buildings, and critical infrastructure.',
//         features: ['Real-time Data', 'Predictive Analytics', 'Remote Monitoring'],
//         color: '#C4161C',
//         flagship: true
//     },
//     {
//         id: 'geo',
//         icon: Layers,
//         title: 'Geotechnical Investigation',
//         shortDesc: 'Foundation intelligence solutions',
//         fullDesc: 'Comprehensive soil and rock analysis for construction projects. Our geotechnical services ensure your foundation is built on solid understanding.',
//         features: ['Soil Testing', 'Foundation Design', 'Site Assessment'],
//         color: '#0E3A5D'
//     },
//     {
//         id: 'material',
//         icon: TestTube2,
//         title: 'Material Testing',
//         shortDesc: 'Quality assurance at molecular level',
//         fullDesc: 'State-of-the-art laboratory testing for construction materials. We verify concrete, steel, and composite materials meet the highest standards.',
//         features: ['Concrete Testing', 'Steel Analysis', 'Certification'],
//         color: '#0E3A5D'
//     },
//     {
//         id: 'audit',
//         icon: Shield,
//         title: 'Structural Audit',
//         shortDesc: 'Comprehensive safety assessment',
//         fullDesc: 'Thorough structural evaluations for existing buildings and infrastructure. Our audits identify potential issues before they become problems.',
//         features: ['Safety Assessment', 'Compliance Check', 'Rehabilitation Plans'],
//         color: '#0E3A5D'
//     },
//     {
//         id: 'topo',
//         icon: Map,
//         title: 'Topographical Survey',
//         shortDesc: 'Precision terrain mapping',
//         fullDesc: 'High-accuracy land surveying using advanced GPS and drone technology. Perfect for project planning and site development.',
//         features: ['Drone Mapping', 'GPS Survey', '3D Modeling'],
//         color: '#0E3A5D'
//     },
//     {
//         id: 'dpr',
//         icon: FileText,
//         title: 'DPR & Consulting',
//         shortDesc: 'Expert project documentation',
//         fullDesc: 'Detailed Project Reports and consulting services for infrastructure projects. We guide projects from conception to completion.',
//         features: ['Feasibility Studies', 'Cost Estimation', 'Project Management'],
//         color: '#0E3A5D'
//     }
// ];

// export default function ServicesSection() {
//     const [activeService, setActiveService] = useState(null);
//     const [hoveredService, setHoveredService] = useState(null);

//     return (
//         <section className="relative py-24 md:py-32 bg-[#111111] overflow-hidden">
//             {/* Background Elements */}
//             <div className="absolute inset-0">
//                 <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C4161C]/5 rounded-full blur-3xl" />
//                 <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0E3A5D]/10 rounded-full blur-3xl" />
//             </div>

//             <div className="max-w-7xl mx-auto px-6 relative z-10">
//                 {/* Header */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     className="text-center mb-16"
//                 >
//                     <span className="inline-block text-[#F2B705] font-semibold tracking-wider uppercase text-sm mb-4">
//                         Our Expertise
//                     </span>
//                     <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//                         Engineering Services
//                     </h2>
//                     <p className="text-lg text-white/60 max-w-2xl mx-auto">
//                         Comprehensive civil engineering solutions powered by cutting-edge technology and decades of expertise
//                     </p>
//                 </motion.div>

//                 {/* Services Grid */}
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {services.map((service, index) => (
//                         <motion.div
//                             key={service.id}
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             viewport={{ once: true }}
//                             transition={{ delay: index * 0.1 }}
//                             onMouseEnter={() => setHoveredService(service.id)}
//                             onMouseLeave={() => setHoveredService(null)}
//                             onClick={() => setActiveService(activeService === service.id ? null : service.id)}
//                             className={`
//                 relative group cursor-pointer rounded-2xl p-6 
//                 border border-white/10 
//                 ${service.flagship ? 'bg-gradient-to-br from-[#C4161C]/20 to-[#C4161C]/5 border-[#C4161C]/30' : 'bg-white/5 hover:bg-white/10'}
//                 transition-all duration-500
//               `}
//                         >
//                             {/* Flagship Badge */}
//                             {service.flagship && (
//                                 <div className="absolute -top-3 right-6 px-3 py-1 bg-[#C4161C] rounded-full">
//                                     <span className="text-xs font-semibold text-white flex items-center gap-1">
//                                         <Zap className="w-3 h-3" /> Flagship
//                                     </span>
//                                 </div>
//                             )}

//                             {/* Icon */}
//                             <motion.div
//                                 animate={{
//                                     rotate: hoveredService === service.id ? 360 : 0,
//                                     scale: hoveredService === service.id ? 1.1 : 1
//                                 }}
//                                 transition={{ duration: 0.5 }}
//                                 className={`
//                   w-14 h-14 rounded-xl flex items-center justify-center mb-4
//                   ${service.flagship ? 'bg-[#C4161C]' : 'bg-[#0E3A5D]'}
//                 `}
//                             >
//                                 <service.icon className="w-7 h-7 text-white" />
//                             </motion.div>

//                             {/* Content */}
//                             <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F2B705] transition-colors">
//                                 {service.title}
//                             </h3>
//                             <p className="text-white/60 text-sm mb-4">{service.shortDesc}</p>

//                             {/* Expanded Content */}
//                             <AnimatePresence>
//                                 {activeService === service.id && (
//                                     <motion.div
//                                         initial={{ opacity: 0, height: 0 }}
//                                         animate={{ opacity: 1, height: 'auto' }}
//                                         exit={{ opacity: 0, height: 0 }}
//                                         transition={{ duration: 0.3 }}
//                                         className="overflow-hidden"
//                                     >
//                                         <p className="text-white/70 text-sm mb-4 leading-relaxed">
//                                             {service.fullDesc}
//                                         </p>
//                                         <div className="flex flex-wrap gap-2">
//                                             {service.features.map((feature) => (
//                                                 <span
//                                                     key={feature}
//                                                     className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80"
//                                                 >
//                                                     {feature}
//                                                 </span>
//                                             ))}
//                                         </div>
//                                     </motion.div>
//                                 )}
//                             </AnimatePresence>

//                             {/* Arrow Indicator */}
//                             <motion.div
//                                 className="absolute bottom-6 right-6"
//                                 animate={{ x: hoveredService === service.id ? 5 : 0 }}
//                             >
//                                 <ArrowRight className={`w-5 h-5 ${service.flagship ? 'text-[#F2B705]' : 'text-white/40 group-hover:text-[#F2B705]'} transition-colors`} />
//                             </motion.div>

//                             {/* Hover Glow Effect */}
//                             <div className={`
//                 absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
//                 bg-gradient-to-br ${service.flagship ? 'from-[#C4161C]/10 to-[#F2B705]/5' : 'from-[#0E3A5D]/10 to-transparent'}
//                 pointer-events-none
//               `} />
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }





import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    Activity,
    Mountain,
    FlaskConical,
    ClipboardCheck,
    MapPin,
    FileText,
    ArrowRight,
    Zap
} from 'lucide-react';

const services = [
    {
        icon: Activity,
        title: 'Structural Health Monitoring',
        shortDesc: 'Real-time infrastructure intelligence',
        fullDesc: 'Advanced sensor networks and AI-powered analytics for continuous structural assessment. Monitor bridges, buildings, and critical infrastructure 24/7 with predictive maintenance capabilities.',
        color: '#C4161C',
        highlight: true
    },
    {
        icon: Mountain,
        title: 'Geotechnical Investigation',
        shortDesc: 'Foundation & soil analysis',
        fullDesc: 'Comprehensive subsurface exploration and analysis for safe foundation design. We utilize advanced testing methods to understand soil behavior and ground conditions.',
        color: '#0E3A5D',
        highlight: false
    },
    {
        icon: FlaskConical,
        title: 'Material Testing',
        shortDesc: 'Quality assurance testing',
        fullDesc: 'State-of-the-art laboratory testing for construction materials including concrete, steel, aggregates, and soil. Ensuring compliance with international standards.',
        color: '#0E3A5D',
        highlight: false
    },
    {
        icon: ClipboardCheck,
        title: 'Structural Audit',
        shortDesc: 'Comprehensive assessment',
        fullDesc: 'Detailed evaluation of existing structures for safety, compliance, and performance. Identify defects, assess remaining life, and recommend remedial measures.',
        color: '#0E3A5D',
        highlight: false
    },
    {
        icon: MapPin,
        title: 'Topographical Survey',
        shortDesc: 'Precision land mapping',
        fullDesc: 'High-precision surveying services using modern equipment including GPS, total stations, and drone mapping for accurate site planning and design.',
        color: '#0E3A5D',
        highlight: false
    },
    {
        icon: FileText,
        title: 'DPR & Consulting',
        shortDesc: 'Project documentation',
        fullDesc: 'Detailed Project Reports, feasibility studies, and expert consulting services. From concept to completion, we guide your infrastructure projects.',
        color: '#0E3A5D',
        highlight: false
    }
];

function ServiceCard({ service, index, isActive, onHover }) {
    const isHighlighted = service.highlight;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => onHover(index)}
            onMouseLeave={() => onHover(null)}
            className={`relative group cursor-pointer ${isHighlighted ? 'md:col-span-2' : ''}`}
        >
            <div className={`
        relative h-full p-6 md:p-8 rounded-2xl border-2 transition-all duration-500 overflow-hidden
        ${isHighlighted
                    ? 'bg-gradient-to-br from-[#C4161C] to-[#a01218] text-white border-transparent shadow-lg'
                    : 'bg-white border-[#E6EAF0] hover:border-[#C4161C]/30 hover:shadow-md'
                }
      `}>

                {/* Icon */}
                <div className={`
          relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300
          ${isHighlighted
                        ? 'bg-white/20'
                        : 'bg-[#F5F7FA] group-hover:bg-[#0E3A5D] group-hover:scale-110'
                    }
        `}>
                    <service.icon className={`w-7 h-7 ${isHighlighted ? 'text-white' : 'text-[#0E3A5D] group-hover:text-white'} transition-colors`} />
                </div>

                {/* Flagship Ribbon */}
                {isHighlighted && (
                    <div className="absolute top-0 right-6">
                        <div className="relative">
                            <div className="px-4 py-1.5 bg-[#F2B705] text-[#111111] text-xs font-bold rounded-b-lg shadow-sm flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                FLAGSHIP
                            </div>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10">
                    <h3 className={`text-xl md:text-2xl font-bold mb-2 ${isHighlighted ? 'text-white' : 'text-[#111111]'}`}>
                        {service.title}
                    </h3>
                    <p className={`text-sm mb-4 ${isHighlighted ? 'text-white/80' : 'text-gray-500'}`}>
                        {service.shortDesc}
                    </p>

                    <AnimatePresence mode="wait">
                        {(isActive || isHighlighted) && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className={`text-sm leading-relaxed mb-4 ${isHighlighted ? 'text-white/90' : 'text-gray-600'}`}>
                                    {service.fullDesc}
                                </p>
                                <button className={`
                  flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/btn
                  ${isHighlighted ? 'text-[#F2B705] hover:gap-3' : 'text-[#C4161C] hover:gap-3'}
                `}>
                                    Learn More
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Decorative Corner */}
                <div className={`
          absolute bottom-0 right-0 w-32 h-32 transition-transform duration-500
          ${isHighlighted ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'}
        `}>
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="100" cy="100" r="80" fill={isHighlighted ? '#F2B705' : '#0E3A5D'} />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
}

export default function ServicesSection() {
    const [activeCard, setActiveCard] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-32 bg-white overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #0E3A5D 1px, transparent 0)`,
                    backgroundSize: '48px 48px'
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F5F7FA] border border-[#E6EAF0] rounded-full mb-6">
                        <span className="w-2 h-2 bg-[#C4161C] rounded-full" />
                        <span className="text-sm text-[#0E3A5D] font-medium uppercase tracking-wider">Our Expertise</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-6">
                        Comprehensive
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4161C] to-[#0E3A5D]"> Engineering Solutions</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        From monitoring to consulting, we deliver end-to-end infrastructure intelligence services
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            service={service}
                            index={index}
                            isActive={activeCard === index}
                            onHover={setActiveCard}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-600 mb-6 text-lg">Need a custom solution for your project?</p>
                    <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#C4161C] hover:bg-white hover:text-[#C4161C] text-white border-2 border-[#C4161C] font-semibold rounded-full transition-all duration-300 shadow-sm">
                        Discuss Your Project
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}