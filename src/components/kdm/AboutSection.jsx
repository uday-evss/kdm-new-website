import React, { useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { Target, Eye, Lightbulb, ShieldCheck } from "lucide-react";

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const loadValue = useMotionValue(0);
    const roundedLoad = useTransform(loadValue, (latest) =>
        latest.toFixed(1)
    );

    useEffect(() => {
        if (isInView) {
            animate(loadValue, 45.2, {
                duration: 2.5,
                delay: 2,
                ease: "easeOut",
            });
        }
    }, [isInView]);


    return (
        <section ref={ref} className="relative py-20 sm:py-24 lg:py-32 bg-[#F5F7FA] overflow-hidden">
            {/* Blueprint Background */}
            <div className="absolute inset-0 opacity-30">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(14, 58, 93, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14, 58, 93, 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* ================= LEFT VISUAL ================= */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl lg:shadow-2xl border border-gray-100">
                            <svg viewBox="0 0 520 380" className="w-full h-auto max-h-[500px]">

                                {/* ---- SVG CONTENT UNCHANGED ---- */}
                                <line x1="260" y1="0" x2="260" y2="380" stroke="#E5E7EB" strokeWidth="2" />
                                <line x1="0" y1="190" x2="520" y2="190" stroke="#E5E7EB" strokeWidth="2" />

                                <text x="20" y="30" fontSize="12" fontWeight="bold" fill="#0E3A5D">
                                    STRUCTURAL HEALTH MONITORING
                                </text>

                                <motion.path
                                    d="M 40 140 Q 120 90 200 140 T 240 140"
                                    fill="none"
                                    stroke="#0E3A5D"
                                    strokeWidth="3"
                                    initial={{ pathLength: 0 }}
                                    animate={isInView ? { pathLength: 1 } : {}}
                                    transition={{ duration: 1.2 }}
                                />

                                {[80, 140, 200].map((x, i) => (
                                    <motion.line
                                        key={`pier-${i}`}
                                        x1={x}
                                        y1="140"
                                        x2={x}
                                        y2="170"
                                        stroke="#0E3A5D"
                                        strokeWidth="3"
                                        initial={{ pathLength: 0 }}
                                        animate={isInView ? { pathLength: 1 } : {}}
                                        transition={{ delay: 1.2 + i * 0.2, duration: 0.5 }}
                                    />
                                ))}

                                {[90, 150, 210].map((x, i) => (
                                    <motion.circle
                                        key={`sensor-${i}`}
                                        cx={x}
                                        cy="115"
                                        r="5"
                                        fill="#F2B705"
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : {}}
                                        transition={{ delay: 1.8 + i * 0.4, type: "spring", stiffness: 200 }}
                                    />
                                ))}

                                <motion.circle
                                    cx="150"
                                    cy="80"
                                    r="6"
                                    fill="#C4161C"
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: 1 } : {}}
                                    transition={{ delay: 3 }}
                                />

                                {[90, 150, 210].map((x, i) => (
                                    <motion.line
                                        key={`data-${i}`}
                                        x1={x}
                                        y1="115"
                                        x2="150"
                                        y2="80"
                                        stroke="#F2B705"
                                        strokeWidth="1.5"
                                        strokeDasharray="4 4"
                                        initial={{ pathLength: 0 }}
                                        animate={isInView ? { pathLength: 1 } : {}}
                                        transition={{ delay: 3.3 + i * 0.2, duration: 0.6 }}
                                    />
                                ))}

                                {[90, 150, 210].map((x, i) => (
                                    <motion.circle
                                        key={`pulse-${i}`}
                                        cx={x}
                                        cy="115"
                                        r="3"
                                        fill="#F2B705"
                                        animate={
                                            isInView
                                                ? {
                                                    cx: [x, 150],
                                                    cy: [115, 80],
                                                    opacity: [1, 1, 0],
                                                }
                                                : {}
                                        }
                                        transition={{
                                            delay: 4 + i * 0.5,
                                            duration: 1,
                                            repeat: Infinity,
                                            repeatDelay: 2,
                                        }}
                                    />
                                ))}

                                <motion.path
                                    d="M 60 65 Q 80 55 100 65 T 140 65 T 180 65 T 220 65"
                                    fill="none"
                                    stroke="#C4161C"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={isInView ? { pathLength: 1 } : {}}
                                    transition={{ delay: 4.5, duration: 1 }}
                                />

                                <motion.circle
                                    cx="150"
                                    cy="80"
                                    r="15"
                                    fill="#C4161C"
                                    opacity="0.1"
                                    animate={
                                        isInView
                                            ? {
                                                scale: [1, 1.4, 1],
                                                opacity: [0.1, 0.2, 0.1],
                                            }
                                            : {}
                                    }
                                    transition={{ duration: 3, repeat: Infinity }}
                                />

                                {/* ================= LAB PANEL ================= */}
                                <text x="280" y="30" fontSize="12" fontWeight="bold" fill="#0E3A5D">
                                    LABORATORY TESTING
                                </text>

                                {/* Machine Frame (Reduced Height) */}
                                <rect
                                    x="325"
                                    y="55"
                                    width="90"
                                    height="100"   // reduced from 120
                                    fill="none"
                                    stroke="#0E3A5D"
                                    strokeWidth="3"
                                />

                                {/* Load Gauge Dial */}
                                <circle
                                    cx="370"
                                    cy="50"
                                    r="18"
                                    fill="white"
                                    stroke="#0E3A5D"
                                    strokeWidth="2"
                                />

                                <motion.line
                                    x1="370"
                                    y1="50"
                                    x2="370"
                                    y2="35"
                                    stroke="#C4161C"
                                    strokeWidth="2"
                                    style={{
                                        rotate: roundedLoad,
                                        transformOrigin: "370px 50px",
                                    }}
                                />

                                {/* Hydraulic Ram (Slightly Reduced Travel) */}
                                <motion.rect
                                    x="340"
                                    y="60"
                                    width="60"
                                    height="12"
                                    fill="#0E3A5D"
                                    initial={{ y: 60 }}
                                    animate={isInView ? { y: 88 } : {}}   // was 95
                                    transition={{ delay: 1.2, duration: 1 }}
                                />

                                {/* Concrete Cube (Moved Up Slightly) */}
                                <motion.rect
                                    x="350"
                                    y="95"
                                    width="40"
                                    height="40"
                                    fill="#D1D5DB"
                                    stroke="#111"
                                    initial={{ scaleY: 1 }}
                                    animate={isInView ? { scaleY: 0.82 } : {}}
                                    transition={{ delay: 2, duration: 0.8 }}
                                />

                                {/* Vibration Effect */}
                                <motion.rect
                                    x="350"
                                    y="95"
                                    width="40"
                                    height="40"
                                    fill="transparent"
                                    stroke="#C4161C"
                                    strokeWidth="1"
                                    animate={
                                        isInView
                                            ? { x: [350, 351, 349, 350] }
                                            : {}
                                    }
                                    transition={{
                                        delay: 2.8,
                                        duration: 0.3,
                                        repeat: 6,
                                    }}
                                />

                                {/* Crack Propagation */}
                                <motion.path
                                    d="M355 105 L385 130"
                                    stroke="#C4161C"
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={isInView ? { pathLength: 1 } : {}}
                                    transition={{ delay: 2.5, duration: 0.6 }}
                                />

                                <motion.path
                                    d="M385 105 L355 135"
                                    stroke="#C4161C"
                                    strokeWidth="2"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={isInView ? { pathLength: 1 } : {}}
                                    transition={{ delay: 2.7, duration: 0.6 }}
                                />

                                {/* Live Load Reading (Moved Up) */}
                                <motion.text
                                    x="340"
                                    y="175"   // was 190
                                    fontSize="14"
                                    fill="#C4161C"
                                    fontWeight="bold"
                                >
                                    <motion.tspan>{roundedLoad}</motion.tspan> MPa
                                </motion.text>

                                {/* Test Complete Indicator (Moved Up) */}
                                <motion.text
                                    x="330"
                                    y="188"   // was 205
                                    fontSize="10"
                                    fill="#0E3A5D"
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ delay: 4 }}
                                >
                                    TEST COMPLETE
                                </motion.text>

                                {/* Idle Machine Pulse (Height Adjusted) */}
                                <motion.rect
                                    x="325"
                                    y="55"
                                    width="90"
                                    height="100"
                                    fill="transparent"
                                    stroke="#0E3A5D"
                                    strokeWidth="1"
                                    animate={
                                        isInView
                                            ? { opacity: [0.3, 0.6, 0.3] }
                                            : {}
                                    }
                                    transition={{ duration: 3, repeat: Infinity }}
                                />




                                {/* ================= GEOTECH PANEL ================= */}
                                <text x="20" y="220" fontSize="12" fontWeight="bold" fill="#0E3A5D">
                                    GEOTECHNICAL INVESTIGATION
                                </text>

                                {/* Borehole */}
                                <line x1="120" y1="240" x2="120" y2="350"
                                    stroke="#111" strokeWidth="4" />

                                {/* Soil Layers */}
                                <rect x="60" y="280" width="120" height="20" fill="#C2B280" />
                                <rect x="60" y="300" width="120" height="20" fill="#A67B5B" />
                                <rect x="60" y="320" width="120" height="20" fill="#8B5A2B" />

                                {/* Depth Markers */}
                                <text x="140" y="295" fontSize="10">3m</text>
                                <text x="140" y="315" fontSize="10">6m</text>
                                <text x="140" y="335" fontSize="10">9m</text>

                                {/* ================= NDT PANEL ================= */}
                                <text x="280" y="220" fontSize="12" fontWeight="bold" fill="#0E3A5D">
                                    NON-DESTRUCTIVE TESTING
                                </text>

                                {/* Test Block */}
                                <rect x="330" y="260" width="120" height="70"
                                    fill="#E5E7EB" stroke="#0E3A5D" strokeWidth="2" />

                                {/* Ultrasonic Probe */}
                                <circle cx="390" cy="250" r="8" fill="#C4161C" />

                                {/* Scan Wave */}
                                <motion.line
                                    x1="330"
                                    y1="295"
                                    x2="450"
                                    y2="295"
                                    stroke="#F2B705"
                                    strokeWidth="2"
                                    animate={{ x1: [330, 350, 330], x2: [450, 470, 450] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />

                            </svg>

                            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-2 sm:px-3 py-1 bg-[#C4161C] text-white text-[10px] sm:text-xs rounded-full text-center">
                                COMPLETE INFRASTRUCTURE SOLUTIONS
                            </div>
                        </div>
                    </motion.div>

                    {/* ================= RIGHT CONTENT ================= */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="order-1 lg:order-2"
                    >
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#0E3A5D]/10 rounded-full mb-4 sm:mb-6">
                            <span className="w-2 h-2 bg-[#C4161C] rounded-full" />
                            <span className="text-xs sm:text-sm text-[#0E3A5D] font-medium uppercase tracking-wider">
                                About KDM Engineers
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] mb-4 sm:mb-6 leading-tight">
                            Complete Infrastructure
                            <span className="text-[#C4161C]"> Engineering Intelligence</span>
                        </h2>

                        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                            KDM Engineers Group delivers Structural Health Monitoring,
                            NABL-grade laboratory testing, geotechnical investigation,
                            and advanced Non-Destructive Testing services. We combine
                            engineering precision with modern technology to ensure
                            safer, smarter, and more resilient infrastructure systems.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
                            {[
                                {
                                    icon: Target,
                                    title: "Our Mission",
                                    desc: "Deliver reliable infrastructure monitoring solutions",
                                },
                                {
                                    icon: Eye,
                                    title: "Our Vision",
                                    desc: "Lead India's infrastructure intelligence revolution",
                                },
                                {
                                    icon: Lightbulb,
                                    title: "Innovation",
                                    desc: "Advanced SHM & sensor-based monitoring systems",
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Reliability",
                                    desc: "Precision audits & structural safety assurance",
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="group p-4 bg-white rounded-xl border border-gray-100 hover:border-[#C4161C]/30 hover:shadow-md sm:hover:shadow-lg transition-all"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-[#0E3A5D]/10 rounded-lg group-hover:bg-[#C4161C]/10 transition-colors">
                                            <item.icon className="w-5 h-5 text-[#0E3A5D] group-hover:text-[#C4161C] transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-[#111111] text-sm sm:text-base">
                                                {item.title}
                                            </h4>
                                            <p className="text-xs sm:text-sm text-gray-500">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.8 }}
                            className="group flex items-center gap-2 text-[#C4161C] font-semibold hover:gap-4 transition-all text-sm sm:text-base"
                        >
                            Explore Our Services
                            <span className="w-8 h-8 rounded-full bg-[#C4161C]/10 flex items-center justify-center group-hover:bg-[#C4161C] transition-colors">
                                <svg
                                    className="w-4 h-4 group-hover:text-white transition-colors"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
