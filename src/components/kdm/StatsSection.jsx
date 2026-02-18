// import React, { useEffect, useState, useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { TrendingUp, Users, Clock, Award, Globe, Shield } from 'lucide-react';

// function AnimatedCounter({ value, suffix = '', duration = 2, delay = 0 }) {
//     const [count, setCount] = useState(0);
//     const ref = useRef(null);
//     const isInView = useInView(ref, { once: true });
//     const numericValue = parseInt(value.replace(/[^0-9]/g, ''));

//     useEffect(() => {
//         if (isInView) {
//             const timeout = setTimeout(() => {
//                 let start = 0;
//                 const end = numericValue;
//                 const incrementTime = (duration * 1000) / end;
//                 const timer = setInterval(() => {
//                     start += Math.ceil(end / 50);
//                     if (start >= end) {
//                         setCount(end);
//                         clearInterval(timer);
//                     } else {
//                         setCount(start);
//                     }
//                 }, incrementTime);
//                 return () => clearInterval(timer);
//             }, delay * 1000);
//             return () => clearTimeout(timeout);
//         }
//     }, [isInView, numericValue, duration, delay]);

//     return <span ref={ref}>{count}{suffix}</span>;
// }

// const stats = [
//     {
//         icon: TrendingUp,
//         value: '500',
//         suffix: '+',
//         label: 'Projects Completed',
//         description: 'Successfully delivered across India',
//         color: '#C4161C'
//     },
//     {
//         icon: Users,
//         value: '100',
//         suffix: '+',
//         label: 'Trusted Clients',
//         description: 'Government & private partnerships',
//         color: '#0E3A5D'
//     },
//     {
//         icon: Clock,
//         value: '10',
//         suffix: '+',
//         label: 'Years Experience',
//         description: 'Industry-leading expertise',
//         color: '#F2B705'
//     },
//     {
//         icon: Shield,
//         value: '24',
//         suffix: '/7',
//         label: 'Monitoring',
//         description: 'Round-the-clock infrastructure watch',
//         color: '#C4161C'
//     },
//     {
//         icon: Globe,
//         value: '20',
//         suffix: '+',
//         label: 'States Covered',
//         description: 'Pan-India presence',
//         color: '#0E3A5D'
//     },
//     {
//         icon: Award,
//         value: '50',
//         suffix: '+',
//         label: 'Awards Won',
//         description: 'Recognition for excellence',
//         color: '#F2B705'
//     }
// ];

// export default function StatsSection() {
//     const ref = useRef(null);
//     const isInView = useInView(ref, { once: true, margin: "-100px" });

//     return (
//         <section ref={ref} className="relative py-32 bg-[#111111] overflow-hidden">
//             {/* Animated Background */}
//             <div className="absolute inset-0">
//                 {/* Particle Effect */}
//                 {[...Array(30)].map((_, i) => (
//                     <motion.div
//                         key={i}
//                         className="absolute w-1 h-1 rounded-full"
//                         style={{
//                             background: ['#C4161C', '#0E3A5D', '#F2B705'][i % 3],
//                             left: `${Math.random() * 100}%`,
//                             top: `${Math.random() * 100}%`,
//                         }}
//                         animate={{
//                             y: [-20, 20],
//                             opacity: [0.2, 0.5, 0.2],
//                         }}
//                         transition={{
//                             duration: 3 + Math.random() * 2,
//                             repeat: Infinity,
//                             ease: "easeInOut",
//                             delay: Math.random() * 2,
//                         }}
//                     />
//                 ))}

//                 {/* Gradient Orbs */}
//                 <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C4161C]/10 rounded-full blur-3xl" />
//                 <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0E3A5D]/10 rounded-full blur-3xl" />
//             </div>

//             <div className="relative z-10 max-w-7xl mx-auto px-6">
//                 {/* Header */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={isInView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.8 }}
//                     className="text-center mb-16"
//                 >
//                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-6">
//                         <span className="w-2 h-2 bg-[#F2B705] rounded-full" />
//                         <span className="text-sm text-gray-400 uppercase tracking-wider">Our Impact</span>
//                     </div>
//                     <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
//                         Why Choose
//                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4161C] to-[#F2B705]"> KDM Engineers</span>
//                     </h2>
//                     <p className="text-lg text-gray-400 max-w-2xl mx-auto">
//                         A decade of engineering excellence with measurable impact across India's infrastructure landscape
//                     </p>
//                 </motion.div>

//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
//                     {stats.map((stat, index) => (
//                         <motion.div
//                             key={index}
//                             initial={{ opacity: 0, y: 30 }}
//                             animate={isInView ? { opacity: 1, y: 0 } : {}}
//                             transition={{ duration: 0.5, delay: 0.1 * index }}
//                             whileHover={{ y: -5, scale: 1.02 }}
//                             className="group relative p-6 md:p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
//                         >
//                             {/* Glow Effect */}
//                             <div
//                                 className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                                 style={{
//                                     background: `radial-gradient(circle at center, ${stat.color}20 0%, transparent 70%)`
//                                 }}
//                             />

//                             {/* Icon */}
//                             <div
//                                 className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
//                                 style={{ backgroundColor: `${stat.color}20` }}
//                             >
//                                 <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
//                             </div>

//                             {/* Value */}
//                             <div className="relative z-10">
//                                 <div className="text-4xl md:text-5xl font-bold text-white mb-2">
//                                     <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={0.2 * index} />
//                                 </div>
//                                 <h3 className="text-lg font-semibold text-white mb-1">{stat.label}</h3>
//                                 <p className="text-sm text-gray-500">{stat.description}</p>
//                             </div>

//                             {/* Corner Decoration */}
//                             <div
//                                 className="absolute top-4 right-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity"
//                                 style={{ color: stat.color }}
//                             >
//                                 <stat.icon className="w-full h-full" />
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>

//                 {/* Trust Indicators */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: 0.5 }}
//                     className="mt-20 flex flex-wrap justify-center items-center gap-8 md:gap-16"
//                 >
//                     {['ISO 9001:2015', 'NABL Certified', 'BIS Approved', 'IRC Member'].map((cert, i) => (
//                         <div key={i} className="flex items-center gap-3 text-gray-400">
//                             <Shield className="w-5 h-5 text-[#F2B705]" />
//                             <span className="text-sm font-medium">{cert}</span>
//                         </div>
//                     ))}
//                 </motion.div>
//             </div>
//         </section>
//     );
// }






import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Clock, Award, Globe, Shield } from 'lucide-react';

function AnimatedCounter({ value, suffix = '', duration = 2, delay = 0 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));

    useEffect(() => {
        if (isInView) {
            const timeout = setTimeout(() => {
                let start = 0;
                const end = numericValue;
                const incrementTime = (duration * 1000) / end;
                const timer = setInterval(() => {
                    start += Math.ceil(end / 50);
                    if (start >= end) {
                        setCount(end);
                        clearInterval(timer);
                    } else {
                        setCount(start);
                    }
                }, incrementTime);
                return () => clearInterval(timer);
            }, delay * 1000);
            return () => clearTimeout(timeout);
        }
    }, [isInView, numericValue, duration, delay]);

    return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
    {
        icon: TrendingUp,
        value: '500',
        suffix: '+',
        label: 'Projects Completed',
        description: 'Successfully delivered across India',
        color: '#C4161C'
    },
    {
        icon: Users,
        value: '100',
        suffix: '+',
        label: 'Trusted Clients',
        description: 'Government & private partnerships',
        color: '#0E3A5D'
    },
    {
        icon: Clock,
        value: '10',
        suffix: '+',
        label: 'Years Experience',
        description: 'Industry-leading expertise',
        color: '#F2B705'
    },
    {
        icon: Shield,
        value: '24',
        suffix: '/7',
        label: 'Monitoring',
        description: 'Round-the-clock infrastructure watch',
        color: '#C4161C'
    },
    {
        icon: Globe,
        value: '20',
        suffix: '+',
        label: 'States Covered',
        description: 'Pan-India presence',
        color: '#0E3A5D'
    },
    {
        icon: Award,
        value: '50',
        suffix: '+',
        label: 'Awards Won',
        description: 'Recognition for excellence',
        color: '#F2B705'
    }
];

export default function StatsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-32 bg-[#F5F7FA] overflow-hidden">
            {/* Subtle Background */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #0E3A5D 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
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
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E6EAF0] rounded-full mb-6">
                        <span className="w-2 h-2 bg-[#C4161C] rounded-full" />
                        <span className="text-sm text-[#0E3A5D] font-medium uppercase tracking-wider">Our Impact</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-6">
                        Why Choose
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4161C] to-[#0E3A5D]"> KDM Engineers</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        A decade of engineering excellence with measurable impact across India's infrastructure landscape
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            whileHover={{ y: -5 }}
                            className="group relative p-6 md:p-8 rounded-2xl bg-white border-2 border-[#E6EAF0] hover:border-[#C4161C]/30 hover:shadow-md transition-all duration-300"
                        >
                            {/* Icon */}
                            <div
                                className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                                style={{ backgroundColor: `${stat.color}15` }}
                            >
                                <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                            </div>

                            {/* Value */}
                            <div className="relative z-10">
                                <div className="text-4xl md:text-5xl font-bold text-[#C4161C] mb-2">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} delay={0.2 * index} />
                                </div>
                                <div className="w-12 h-1 bg-[#0E3A5D] rounded-full mb-3" />
                                <h3 className="text-lg font-semibold text-[#111111] mb-1">{stat.label}</h3>
                                <p className="text-sm text-gray-600">{stat.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 flex flex-wrap justify-center items-center gap-8 md:gap-16"
                >
                    {['ISO 9001:2015', 'NABL Certified', 'BIS Approved', 'IRC Member'].map((cert, i) => (
                        <div key={i} className="flex items-center gap-3 text-gray-600">
                            <Shield className="w-5 h-5 text-[#C4161C]" />
                            <span className="text-sm font-semibold">{cert}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}