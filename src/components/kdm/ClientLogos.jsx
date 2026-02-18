// import React from "react";
// import { motion } from "framer-motion";

// const clients = [
//     { name: "NHAI", color: "#0E3A5D" },
//     { name: "Indian Railways", color: "#C4161C" },
//     { name: "L&T", color: "#0E3A5D" },
//     { name: "TATA Projects", color: "#111111" },
//     { name: "PWD Maharashtra", color: "#C4161C" },
//     { name: "Reliance Infra", color: "#0E3A5D" },
//     { name: "Adani Group", color: "#111111" },
//     { name: "Delhi Metro", color: "#C4161C" },
//     { name: "GMR Group", color: "#0E3A5D" },
//     { name: "MSRDC", color: "#C4161C" },
//     { name: "Shapoorji", color: "#111111" },
//     { name: "JSW Infra", color: "#0E3A5D" },
// ];

// /**
//  * Logo Card Component
//  */
// function LogoCard(props) {
//     const { name, color } = props;

//     return (
//         <div className="flex-shrink-0 w-48 h-24 mx-4 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
//             <span
//                 className="text-lg font-bold opacity-50 group-hover:opacity-100 transition-opacity"
//                 style={{ color }}
//             >
//                 {name}
//             </span>
//         </div>
//     );
// }

// export default function ClientLogos() {
//     const duplicatedClients = [...clients, ...clients];
//     const reversedClients = [...clients].reverse(); // SAFE reverse

//     return (
//         <section className="relative py-24 bg-[#F5F7FA] overflow-hidden">
//             {/* Header */}
//             <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                 >
//                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0E3A5D]/10 rounded-full mb-4">
//                         <span className="w-2 h-2 bg-[#F2B705] rounded-full" />
//                         <span className="text-sm text-[#0E3A5D] font-medium uppercase tracking-wider">
//                             Trusted Partners
//                         </span>
//                     </div>

//                     <h2 className="text-3xl md:text-4xl font-bold text-[#111111]">
//                         Powering India's Leading
//                         <span className="text-[#C4161C]">
//                             {" "}
//                             Infrastructure Giants
//                         </span>
//                     </h2>
//                 </motion.div>
//             </div>

//             {/* Row 1 */}
//             <div className="relative mb-6 overflow-hidden">
//                 <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F5F7FA] to-transparent z-10" />
//                 <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F5F7FA] to-transparent z-10" />

//                 <motion.div
//                     className="flex"
//                     animate={{ x: ["0%", "-50%"] }}
//                     transition={{
//                         duration: 25,
//                         repeat: Infinity,
//                         ease: "linear",
//                     }}
//                 >
//                     {duplicatedClients.map((client, i) => (
//                         <LogoCard key={`row1-${i}`} {...client} />
//                     ))}
//                 </motion.div>
//             </div>

//             {/* Row 2 (Reverse Scroll) */}
//             <div className="relative overflow-hidden">
//                 <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F5F7FA] to-transparent z-10" />
//                 <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F5F7FA] to-transparent z-10" />

//                 <motion.div
//                     className="flex"
//                     animate={{ x: ["-50%", "0%"] }}
//                     transition={{
//                         duration: 25,
//                         repeat: Infinity,
//                         ease: "linear",
//                     }}
//                 >
//                     {[...reversedClients, ...reversedClients].map((client, i) => (
//                         <LogoCard key={`row2-${i}`} {...client} />
//                     ))}
//                 </motion.div>
//             </div>

//             {/* Bottom Stats */}
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 className="max-w-4xl mx-auto px-6 mt-16 grid grid-cols-3 gap-8 text-center"
//             >
//                 {[
//                     { value: "100+", label: "Corporate Clients" },
//                     { value: "50+", label: "Government Bodies" },
//                     { value: "98%", label: "Client Retention" },
//                 ].map((stat, i) => (
//                     <div key={i}>
//                         <div className="text-3xl md:text-4xl font-bold text-[#0E3A5D]">
//                             {stat.value}
//                         </div>
//                         <div className="text-sm text-gray-500 mt-1">
//                             {stat.label}
//                         </div>
//                     </div>
//                 ))}
//             </motion.div>
//         </section>
//     );
// }



import React from 'react';
import { motion } from 'framer-motion';

const clients = [
    { name: 'NHAI', color: '#0E3A5D' },
    { name: 'Indian Railways', color: '#C4161C' },
    { name: 'L&T', color: '#0E3A5D' },
    { name: 'TATA Projects', color: '#111111' },
    { name: 'PWD Maharashtra', color: '#C4161C' },
    { name: 'Reliance Infra', color: '#0E3A5D' },
    { name: 'Adani Group', color: '#111111' },
    { name: 'Delhi Metro', color: '#C4161C' },
    { name: 'GMR Group', color: '#0E3A5D' },
    { name: 'MSRDC', color: '#C4161C' },
    { name: 'Shapoorji', color: '#111111' },
    { name: 'JSW Infra', color: '#0E3A5D' },
];

function LogoCard({ name, color }) {
    return (
        <div className="flex-shrink-0 w-48 h-24 mx-4 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
            <span
                className="text-lg font-bold opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ color }}
            >
                {name}
            </span>
        </div>
    );
}

export default function ClientLogos() {
    return (
        <section className="relative py-24 bg-[#F5F7FA] overflow-hidden">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0E3A5D]/10 rounded-full mb-4">
                        <span className="w-2 h-2 bg-[#F2B705] rounded-full" />
                        <span className="text-sm text-[#0E3A5D] font-medium uppercase tracking-wider">Trusted Partners</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#111111]">
                        Powering India's Leading
                        <span className="text-[#C4161C]"> Infrastructure Giants</span>
                    </h2>
                </motion.div>
            </div>

            {/* Scrolling Logos - Row 1 */}
            <div className="relative mb-6">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F5F7FA] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F5F7FA] to-transparent z-10" />

                <motion.div
                    className="flex"
                    animate={{ x: [0, -1200] }}
                    transition={{
                        x: { duration: 30, repeat: Infinity, ease: "linear" }
                    }}
                >
                    {[...clients, ...clients].map((client, i) => (
                        <LogoCard key={i} name={client.name} color={client.color} />
                    ))}
                </motion.div>
            </div>

            {/* Scrolling Logos - Row 2 (Reverse) */}
            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F5F7FA] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F5F7FA] to-transparent z-10" />

                <motion.div
                    className="flex"
                    initial={{ x: -1200 }}
                    animate={{ x: [null, 0] }}
                    transition={{
                        x: { duration: 30, repeat: Infinity, ease: "linear" }
                    }}
                >
                    {[...clients.reverse(), ...clients].map((client, i) => (
                        <LogoCard key={i} name={client.name} color={client.color} />
                    ))}
                </motion.div>
            </div>

            {/* Bottom Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto px-6 mt-16 grid grid-cols-3 gap-8 text-center"
            >
                {[
                    { value: '100+', label: 'Corporate Clients' },
                    { value: '50+', label: 'Government Bodies' },
                    { value: '98%', label: 'Client Retention' },
                ].map((stat, i) => (
                    <div key={i}>
                        <div className="text-3xl md:text-4xl font-bold text-[#0E3A5D]">{stat.value}</div>
                        <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}