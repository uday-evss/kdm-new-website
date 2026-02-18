// import React, { useState, useEffect } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { useRef } from 'react';
// import {
//     Activity,
//     Waves,
//     Thermometer,
//     Wind,
//     AlertTriangle,
//     CheckCircle,
//     Radio,
//     Database,
//     LineChart,
//     Shield
// } from 'lucide-react';

// function AnimatedGraph({ data, color, delay }) {
//     return (
//         <svg viewBox="0 0 200 60" className="w-full h-16">
//             <defs>
//                 <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
//                     <stop offset="0%" stopColor={color} stopOpacity="0.3" />
//                     <stop offset="100%" stopColor={color} stopOpacity="0" />
//                 </linearGradient>
//             </defs>
//             <motion.path
//                 d={`M 0 50 ${data.map((v, i) => `L ${(i + 1) * 25} ${50 - v * 4}`).join(' ')} L 200 50`}
//                 fill={`url(#grad-${color})`}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay, duration: 0.5 }}
//             />
//             <motion.path
//                 d={`M 0 50 ${data.map((v, i) => `L ${(i + 1) * 25} ${50 - v * 4}`).join(' ')}`}
//                 fill="none"
//                 stroke={color}
//                 strokeWidth="2"
//                 initial={{ pathLength: 0 }}
//                 animate={{ pathLength: 1 }}
//                 transition={{ delay, duration: 1.5, ease: "easeOut" }}
//             />
//             {data.map((v, i) => (
//                 <motion.circle
//                     key={i}
//                     cx={(i + 1) * 25}
//                     cy={50 - v * 4}
//                     r="3"
//                     fill={color}
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: delay + 0.1 * i, duration: 0.3 }}
//                 />
//             ))}
//         </svg>
//     );
// }

// function SensorCard({ icon: Icon, label, value, unit, status, delay }) {
//     return (
//         <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay, duration: 0.5 }}
//             className="bg-[#0a1a2e] rounded-xl p-4 border border-[#1a3a5e]"
//         >
//             <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center gap-2">
//                     <div className="p-2 bg-[#0E3A5D]/50 rounded-lg">
//                         <Icon className="w-4 h-4 text-[#F2B705]" />
//                     </div>
//                     <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
//                 </div>
//                 <motion.div
//                     animate={{ scale: [1, 1.2, 1] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className={`w-2 h-2 rounded-full ${status === 'normal' ? 'bg-green-500' : 'bg-[#F2B705]'}`}
//                 />
//             </div>
//             <div className="flex items-baseline gap-1">
//                 <span className="text-2xl font-bold text-white">{value}</span>
//                 <span className="text-sm text-gray-500">{unit}</span>
//             </div>
//         </motion.div>
//     );
// }

// export default function SHMShowcase() {
//     const ref = useRef(null);
//     const isInView = useInView(ref, { once: true, margin: "-100px" });
//     const [activeAlerts, setActiveAlerts] = useState(2);
//     const [sensorValues, setSensorValues] = useState({
//         vibration: 2.4,
//         strain: 0.82,
//         temperature: 28.5,
//         wind: 12.3
//     });

//     // Simulate live data updates
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setSensorValues({
//                 vibration: (2 + Math.random() * 0.8).toFixed(2),
//                 strain: (0.75 + Math.random() * 0.15).toFixed(2),
//                 temperature: (27 + Math.random() * 3).toFixed(1),
//                 wind: (10 + Math.random() * 5).toFixed(1)
//             });
//         }, 3000);
//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <section ref={ref} className="relative py-32 bg-gradient-to-b from-[#050d17] via-[#0a1628] to-[#111111] overflow-hidden">
//             {/* Animated Grid Background */}
//             <div className="absolute inset-0">
//                 <div className="absolute inset-0" style={{
//                     backgroundImage: `
//             radial-gradient(circle at 1px 1px, rgba(14, 58, 93, 0.3) 1px, transparent 0)
//           `,
//                     backgroundSize: '40px 40px'
//                 }} />
//             </div>

//             {/* Glowing Orbs */}
//             <motion.div
//                 animate={{
//                     x: [0, 100, 0],
//                     y: [0, -50, 0]
//                 }}
//                 transition={{ duration: 10, repeat: Infinity }}
//                 className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0E3A5D]/20 rounded-full blur-3xl"
//             />
//             <motion.div
//                 animate={{
//                     x: [0, -100, 0],
//                     y: [0, 50, 0]
//                 }}
//                 transition={{ duration: 12, repeat: Infinity }}
//                 className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C4161C]/10 rounded-full blur-3xl"
//             />

//             <div className="relative z-10 max-w-7xl mx-auto px-6">
//                 {/* Header */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={isInView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.8 }}
//                     className="text-center mb-16"
//                 >
//                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C4161C]/20 border border-[#C4161C]/30 rounded-full mb-6">
//                         <motion.span
//                             animate={{ scale: [1, 1.2, 1] }}
//                             transition={{ duration: 2, repeat: Infinity }}
//                             className="w-2 h-2 bg-[#C4161C] rounded-full"
//                         />
//                         <span className="text-sm text-[#C4161C] font-medium uppercase tracking-wider">Live Technology Demo</span>
//                     </div>
//                     <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
//                         Real-Time
//                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2B705] to-[#C4161C]"> Structural Intelligence</span>
//                     </h2>
//                     <p className="text-lg text-gray-400 max-w-2xl mx-auto">
//                         Advanced sensor networks and AI-powered analytics for continuous infrastructure monitoring
//                     </p>
//                 </motion.div>

//                 {/* Dashboard UI */}
//                 <div className="grid lg:grid-cols-3 gap-6">
//                     {/* Main Monitor */}
//                     <motion.div
//                         initial={{ opacity: 0, x: -50 }}
//                         animate={isInView ? { opacity: 1, x: 0 } : {}}
//                         transition={{ duration: 0.8, delay: 0.2 }}
//                         className="lg:col-span-2 bg-[#0a1628]/80 backdrop-blur-xl rounded-3xl border border-[#1a3a5e] p-6 md:p-8"
//                     >
//                         {/* Header */}
//                         <div className="flex items-center justify-between mb-6">
//                             <div className="flex items-center gap-3">
//                                 <div className="p-2 bg-[#0E3A5D] rounded-xl">
//                                     <Activity className="w-5 h-5 text-[#F2B705]" />
//                                 </div>
//                                 <div>
//                                     <h3 className="text-lg font-semibold text-white">Bridge #KDM-2847</h3>
//                                     <p className="text-xs text-gray-500">Mumbai-Pune Expressway Sector 12</p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full">
//                                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                                 <span className="text-xs text-green-400 font-medium">HEALTHY</span>
//                             </div>
//                         </div>

//                         {/* Sensor Grid */}
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//                             <SensorCard icon={Waves} label="Vibration" value={sensorValues.vibration} unit="Hz" status="normal" delay={0.3} />
//                             <SensorCard icon={Activity} label="Strain" value={sensorValues.strain} unit="με" status="normal" delay={0.4} />
//                             <SensorCard icon={Thermometer} label="Temp" value={sensorValues.temperature} unit="°C" status="normal" delay={0.5} />
//                             <SensorCard icon={Wind} label="Wind" value={sensorValues.wind} unit="m/s" status="warning" delay={0.6} />
//                         </div>

//                         {/* Graph Area */}
//                         <div className="bg-[#050d17] rounded-2xl p-4 mb-6">
//                             <div className="flex items-center justify-between mb-4">
//                                 <span className="text-sm text-gray-400">Structural Response (24h)</span>
//                                 <div className="flex items-center gap-4">
//                                     <div className="flex items-center gap-2">
//                                         <span className="w-3 h-1 bg-[#F2B705] rounded-full" />
//                                         <span className="text-xs text-gray-500">Displacement</span>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <span className="w-3 h-1 bg-[#0E3A5D] rounded-full" />
//                                         <span className="text-xs text-gray-500">Acceleration</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <AnimatedGraph data={[5, 7, 4, 8, 6, 9, 5, 7]} color="#F2B705" delay={0.7} />
//                             <AnimatedGraph data={[3, 5, 6, 4, 7, 5, 8, 6]} color="#0E3A5D" delay={0.9} />
//                         </div>

//                         {/* Alert Bar */}
//                         <div className="flex items-center justify-between p-4 bg-[#F2B705]/10 border border-[#F2B705]/30 rounded-xl">
//                             <div className="flex items-center gap-3">
//                                 <AlertTriangle className="w-5 h-5 text-[#F2B705]" />
//                                 <div>
//                                     <p className="text-sm text-white font-medium">Minor wind speed alert detected</p>
//                                     <p className="text-xs text-gray-400">Sensor WS-04 • 2 minutes ago</p>
//                                 </div>
//                             </div>
//                             <button className="px-4 py-2 bg-[#F2B705]/20 hover:bg-[#F2B705]/30 text-[#F2B705] text-sm font-medium rounded-lg transition-colors">
//                                 View Details
//                             </button>
//                         </div>
//                     </motion.div>

//                     {/* Side Panel */}
//                     <motion.div
//                         initial={{ opacity: 0, x: 50 }}
//                         animate={isInView ? { opacity: 1, x: 0 } : {}}
//                         transition={{ duration: 0.8, delay: 0.4 }}
//                         className="space-y-6"
//                     >
//                         {/* System Status */}
//                         <div className="bg-[#0a1628]/80 backdrop-blur-xl rounded-3xl border border-[#1a3a5e] p-6">
//                             <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-4">System Status</h4>
//                             <div className="space-y-3">
//                                 {[
//                                     { icon: Radio, label: 'Sensors Online', value: '47/48', status: 'good' },
//                                     { icon: Database, label: 'Data Storage', value: '2.4 TB', status: 'good' },
//                                     { icon: LineChart, label: 'Analytics', value: 'Active', status: 'good' },
//                                     { icon: Shield, label: 'Security', value: 'Protected', status: 'good' },
//                                 ].map((item, i) => (
//                                     <div key={i} className="flex items-center justify-between p-3 bg-[#050d17] rounded-xl">
//                                         <div className="flex items-center gap-3">
//                                             <item.icon className="w-4 h-4 text-gray-400" />
//                                             <span className="text-sm text-gray-300">{item.label}</span>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <span className="text-sm text-white font-medium">{item.value}</span>
//                                             <CheckCircle className="w-4 h-4 text-green-500" />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Quick Actions */}
//                         <div className="bg-gradient-to-br from-[#C4161C] to-[#8a0f14] rounded-3xl p-6">
//                             <h4 className="text-sm text-white/80 uppercase tracking-wider mb-4">Quick Actions</h4>
//                             <div className="space-y-3">
//                                 <button className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-sm font-medium transition-colors text-left">
//                                     Generate Report
//                                 </button>
//                                 <button className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-sm font-medium transition-colors text-left">
//                                     Export Data
//                                 </button>
//                                 <button className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-sm font-medium transition-colors text-left">
//                                     Schedule Inspection
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Live Feed */}
//                         <div className="bg-[#0a1628]/80 backdrop-blur-xl rounded-3xl border border-[#1a3a5e] p-6">
//                             <div className="flex items-center gap-2 mb-4">
//                                 <motion.span
//                                     animate={{ opacity: [1, 0.5, 1] }}
//                                     transition={{ duration: 1, repeat: Infinity }}
//                                     className="w-2 h-2 bg-red-500 rounded-full"
//                                 />
//                                 <h4 className="text-sm text-gray-400 uppercase tracking-wider">Live Feed</h4>
//                             </div>
//                             <div className="space-y-2 text-xs text-gray-400">
//                                 <div className="flex justify-between">
//                                     <span>Vibration check</span>
//                                     <span className="text-green-400">✓ Normal</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Temp calibration</span>
//                                     <span className="text-green-400">✓ Complete</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span>Data sync</span>
//                                     <span className="text-[#F2B705]">In progress...</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </div>

//                 {/* Features */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: 0.5 }}
//                     className="mt-16 grid md:grid-cols-4 gap-6"
//                 >
//                     {[
//                         { value: '1M+', label: 'Data Points/Day' },
//                         { value: '<100ms', label: 'Response Time' },
//                         { value: '99.9%', label: 'Uptime' },
//                         { value: 'AI', label: 'Powered Analytics' },
//                     ].map((stat, i) => (
//                         <div key={i} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
//                             <div className="text-3xl font-bold text-[#F2B705] mb-2">{stat.value}</div>
//                             <div className="text-sm text-gray-400">{stat.label}</div>
//                         </div>
//                     ))}
//                 </motion.div>
//             </div>
//         </section>
//     );
// }






import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    Activity,
    Waves,
    Thermometer,
    Wind,
    AlertTriangle,
    CheckCircle,
    Radio,
    Database,
    LineChart,
    Shield
} from 'lucide-react';

function AnimatedGraph({ data, color, delay }) {
    return (
        <svg viewBox="0 0 200 60" className="w-full h-16">
            <defs>
                <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <motion.path
                d={`M 0 50 ${data.map((v, i) => `L ${(i + 1) * 25} ${50 - v * 4}`).join(' ')} L 200 50`}
                fill={`url(#grad-${color})`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay, duration: 0.5 }}
            />
            <motion.path
                d={`M 0 50 ${data.map((v, i) => `L ${(i + 1) * 25} ${50 - v * 4}`).join(' ')}`}
                fill="none"
                stroke={color}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay, duration: 1.5, ease: "easeOut" }}
            />
            {data.map((v, i) => (
                <motion.circle
                    key={i}
                    cx={(i + 1) * 25}
                    cy={50 - v * 4}
                    r="3"
                    fill={color}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: delay + 0.1 * i, duration: 0.3 }}
                />
            ))}
        </svg>
    );
}

function SensorCard({ icon: Icon, label, value, unit, status, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="bg-[#F5F7FA] rounded-xl p-4 border border-[#E6EAF0]"
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-white rounded-lg">
                        <Icon className="w-4 h-4 text-[#0E3A5D]" />
                    </div>
                    <span className="text-xs text-gray-600 uppercase tracking-wider font-medium">{label}</span>
                </div>
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-2 h-2 rounded-full ${status === 'normal' ? 'bg-green-500' : 'bg-[#F2B705]'}`}
                />
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-[#111111]">{value}</span>
                <span className="text-sm text-gray-600">{unit}</span>
            </div>
        </motion.div>
    );
}

export default function SHMShowcase() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeAlerts, setActiveAlerts] = useState(2);
    const [sensorValues, setSensorValues] = useState({
        vibration: 2.4,
        strain: 0.82,
        temperature: 28.5,
        wind: 12.3
    });

    // Simulate live data updates
    useEffect(() => {
        const interval = setInterval(() => {
            setSensorValues({
                vibration: (2 + Math.random() * 0.8).toFixed(2),
                strain: (0.75 + Math.random() * 0.15).toFixed(2),
                temperature: (27 + Math.random() * 3).toFixed(1),
                wind: (10 + Math.random() * 5).toFixed(1)
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={ref} className="relative py-32 bg-gradient-to-b from-white via-[#FAFAFB] to-[#F5F7FA] overflow-hidden">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
            radial-gradient(circle at 1px 1px, #0E3A5D 1px, transparent 0)
          `,
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
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#C4161C] rounded-full mb-6">
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 bg-[#C4161C] rounded-full"
                        />
                        <span className="text-sm text-[#C4161C] font-bold uppercase tracking-wider">Live Technology</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-6">
                        Real-Time
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4161C] to-[#0E3A5D]"> Structural Intelligence</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Advanced sensor networks and AI-powered analytics for continuous infrastructure monitoring
                    </p>
                </motion.div>

                {/* Dashboard UI */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Monitor */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-2 bg-white rounded-2xl border-2 border-[#E6EAF0] p-6 md:p-8 shadow-sm"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#0E3A5D] rounded-xl">
                                    <Activity className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-[#111111]">Bridge #KDM-2847</h3>
                                    <p className="text-xs text-gray-600">Mumbai-Pune Expressway Sector 12</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-xs text-green-700 font-semibold">HEALTHY</span>
                            </div>
                        </div>

                        {/* Sensor Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <SensorCard icon={Waves} label="Vibration" value={sensorValues.vibration} unit="Hz" status="normal" delay={0.3} />
                            <SensorCard icon={Activity} label="Strain" value={sensorValues.strain} unit="με" status="normal" delay={0.4} />
                            <SensorCard icon={Thermometer} label="Temp" value={sensorValues.temperature} unit="°C" status="normal" delay={0.5} />
                            <SensorCard icon={Wind} label="Wind" value={sensorValues.wind} unit="m/s" status="warning" delay={0.6} />
                        </div>

                        {/* Graph Area */}
                        <div className="bg-[#FAFAFB] rounded-2xl p-4 mb-6 border border-[#E6EAF0]">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-gray-600 font-medium">Structural Response (24h)</span>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-1 bg-[#F2B705] rounded-full" />
                                        <span className="text-xs text-gray-500">Displacement</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-1 bg-[#0E3A5D] rounded-full" />
                                        <span className="text-xs text-gray-500">Acceleration</span>
                                    </div>
                                </div>
                            </div>
                            <AnimatedGraph data={[5, 7, 4, 8, 6, 9, 5, 7]} color="#F2B705" delay={0.7} />
                            <AnimatedGraph data={[3, 5, 6, 4, 7, 5, 8, 6]} color="#0E3A5D" delay={0.9} />
                        </div>

                        {/* Alert Bar */}
                        <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-xl">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-600" />
                                <div>
                                    <p className="text-sm text-[#111111] font-medium">Minor wind speed alert detected</p>
                                    <p className="text-xs text-gray-600">Sensor WS-04 • 2 minutes ago</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 text-sm font-medium rounded-lg transition-colors">
                                View Details
                            </button>
                        </div>
                    </motion.div>

                    {/* Side Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        {/* System Status */}
                        <div className="bg-white rounded-2xl border-2 border-[#E6EAF0] p-6 shadow-sm">
                            <h4 className="text-sm text-gray-600 font-semibold uppercase tracking-wider mb-4">System Status</h4>
                            <div className="space-y-3">
                                {[
                                    { icon: Radio, label: 'Sensors Online', value: '47/48', status: 'good' },
                                    { icon: Database, label: 'Data Storage', value: '2.4 TB', status: 'good' },
                                    { icon: LineChart, label: 'Analytics', value: 'Active', status: 'good' },
                                    { icon: Shield, label: 'Security', value: 'Protected', status: 'good' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-xl border border-[#E6EAF0]">
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-4 h-4 text-gray-600" />
                                            <span className="text-sm text-gray-700">{item.label}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-[#111111] font-semibold">{item.value}</span>
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-gradient-to-br from-[#C4161C] to-[#a01218] rounded-2xl p-6 shadow-sm">
                            <h4 className="text-sm text-white font-semibold uppercase tracking-wider mb-4">Quick Actions</h4>
                            <div className="space-y-3">
                                <button className="w-full p-3 bg-white/20 hover:bg-white/30 rounded-xl text-white text-sm font-medium transition-colors text-left">
                                    Generate Report
                                </button>
                                <button className="w-full p-3 bg-white/20 hover:bg-white/30 rounded-xl text-white text-sm font-medium transition-colors text-left">
                                    Export Data
                                </button>
                                <button className="w-full p-3 bg-white/20 hover:bg-white/30 rounded-xl text-white text-sm font-medium transition-colors text-left">
                                    Schedule Inspection
                                </button>
                            </div>
                        </div>

                        {/* Live Feed */}
                        <div className="bg-white rounded-2xl border-2 border-[#E6EAF0] p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <motion.span
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="w-2 h-2 bg-red-500 rounded-full"
                                />
                                <h4 className="text-sm text-gray-600 font-semibold uppercase tracking-wider">Live Feed</h4>
                            </div>
                            <div className="space-y-2 text-xs text-gray-700">
                                <div className="flex justify-between">
                                    <span>Vibration check</span>
                                    <span className="text-green-600 font-medium">✓ Normal</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Temp calibration</span>
                                    <span className="text-green-600 font-medium">✓ Complete</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Data sync</span>
                                    <span className="text-amber-600 font-medium">In progress...</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 grid md:grid-cols-4 gap-6"
                >
                    {[
                        { value: '1M+', label: 'Data Points/Day' },
                        { value: '<100ms', label: 'Response Time' },
                        { value: '99.9%', label: 'Uptime' },
                        { value: 'AI', label: 'Powered Analytics' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center p-6 bg-white rounded-2xl border-2 border-[#E6EAF0] shadow-sm">
                            <div className="text-3xl font-bold text-[#C4161C] mb-2">{stat.value}</div>
                            <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}