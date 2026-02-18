// import React, { useState, useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { ArrowLeft, ArrowRight, MapPin, Calendar, Building2 } from 'lucide-react';

// const projects = [
//     {
//         id: 1,
//         title: 'Mumbai Coastal Road Bridge',
//         category: 'Government',
//         location: 'Mumbai, Maharashtra',
//         year: '2024',
//         image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80',
//         description: 'Real-time structural monitoring of 10.58 km coastal bridge with 200+ sensors.'
//     },
//     {
//         id: 2,
//         title: 'Delhi Metro Phase IV',
//         category: 'Railways',
//         location: 'New Delhi',
//         year: '2023',
//         image: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=800&q=80',
//         description: 'Comprehensive SHM system for elevated metro corridor spanning 104 km.'
//     },
//     {
//         id: 3,
//         title: 'Bengaluru-Chennai Expressway',
//         category: 'Highways',
//         location: 'Karnataka-Tamil Nadu',
//         year: '2024',
//         image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&q=80',
//         description: 'Geotechnical investigation and material testing for 262 km expressway.'
//     },
//     {
//         id: 4,
//         title: 'Reliance Data Center',
//         category: 'Private',
//         location: 'Navi Mumbai',
//         year: '2023',
//         image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
//         description: 'Structural audit and foundation analysis for critical infrastructure.'
//     },
//     {
//         id: 5,
//         title: 'Ganga River Bridge',
//         category: 'Government',
//         location: 'Patna, Bihar',
//         year: '2024',
//         image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
//         description: 'Installation of 150 vibration and strain sensors across 5.5 km span.'
//     },
//     {
//         id: 6,
//         title: 'TATA Steel Plant',
//         category: 'Private',
//         location: 'Jamshedpur, Jharkhand',
//         year: '2023',
//         image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
//         description: 'Industrial structural health monitoring for heavy manufacturing facility.'
//     }
// ];

// const categories = ['All', 'Government', 'Railways', 'Highways', 'Private'];

// export default function ProjectsSection() {
//     const [activeCategory, setActiveCategory] = useState('All');
//     const [hoveredProject, setHoveredProject] = useState(null);
//     const scrollRef = useRef(null);
//     const sectionRef = useRef(null);
//     const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

//     const filteredProjects = activeCategory === 'All'
//         ? projects
//         : projects.filter(p => p.category === activeCategory);

//     const scroll = (direction) => {
//         if (scrollRef.current) {
//             const scrollAmount = direction === 'left' ? -400 : 400;
//             scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//         }
//     };

//     return (
//         <section ref={sectionRef} className="relative py-32 bg-[#F5F7FA] overflow-hidden">
//             {/* Background Pattern */}
//             <div className="absolute inset-0 opacity-50">
//                 <div className="absolute inset-0" style={{
//                     backgroundImage: `radial-gradient(circle at 2px 2px, rgba(14, 58, 93, 0.1) 1px, transparent 0)`,
//                     backgroundSize: '32px 32px'
//                 }} />
//             </div>

//             <div className="relative z-10 max-w-7xl mx-auto px-6">
//                 {/* Header */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={isInView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.8 }}
//                     className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
//                 >
//                     <div>
//                         <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0E3A5D]/10 rounded-full mb-6">
//                             <span className="w-2 h-2 bg-[#C4161C] rounded-full" />
//                             <span className="text-sm text-[#0E3A5D] font-medium uppercase tracking-wider">Portfolio</span>
//                         </div>
//                         <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">
//                             Global
//                             <span className="text-[#C4161C]"> Projects</span>
//                         </h2>
//                         <p className="text-gray-600 max-w-lg">
//                             Engineering excellence delivered across government, railways, highways, and private sectors
//                         </p>
//                     </div>

//                     {/* Navigation Arrows */}
//                     <div className="flex items-center gap-4 mt-6 md:mt-0">
//                         <button
//                             onClick={() => scroll('left')}
//                             className="p-3 rounded-full bg-white border border-gray-200 hover:border-[#C4161C] hover:bg-[#C4161C] hover:text-white transition-all duration-300 shadow-sm"
//                         >
//                             <ArrowLeft className="w-5 h-5" />
//                         </button>
//                         <button
//                             onClick={() => scroll('right')}
//                             className="p-3 rounded-full bg-[#C4161C] text-white hover:bg-[#a01218] transition-all duration-300 shadow-sm"
//                         >
//                             <ArrowRight className="w-5 h-5" />
//                         </button>
//                     </div>
//                 </motion.div>

//                 {/* Category Filters */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={isInView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.8, delay: 0.2 }}
//                     className="flex flex-wrap gap-3 mb-10"
//                 >
//                     {categories.map((category) => (
//                         <button
//                             key={category}
//                             onClick={() => setActiveCategory(category)}
//                             className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
//                                 ? 'bg-[#0E3A5D] text-white'
//                                 : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0E3A5D] hover:text-[#0E3A5D]'
//                                 }`}
//                         >
//                             {category}
//                         </button>
//                     ))}
//                 </motion.div>

//                 {/* Projects Carousel */}
//                 <div
//                     ref={scrollRef}
//                     className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
//                     style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//                 >
//                     {filteredProjects.map((project, index) => (
//                         <motion.div
//                             key={project.id}
//                             initial={{ opacity: 0, x: 50 }}
//                             animate={isInView ? { opacity: 1, x: 0 } : {}}
//                             transition={{ duration: 0.5, delay: 0.1 * index }}
//                             onMouseEnter={() => setHoveredProject(project.id)}
//                             onMouseLeave={() => setHoveredProject(null)}
//                             className="flex-shrink-0 w-[350px] md:w-[400px] snap-start"
//                         >
//                             <div className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer">
//                                 {/* Image */}
//                                 <img
//                                     src={project.image}
//                                     alt={project.title}
//                                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                                 />

//                                 {/* Overlay */}
//                                 <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

//                                 {/* Category Badge */}
//                                 <div className="absolute top-6 left-6">
//                                     <span className="px-4 py-2 bg-[#F2B705] text-[#111111] text-xs font-bold uppercase rounded-full">
//                                         {project.category}
//                                     </span>
//                                 </div>

//                                 {/* Content */}
//                                 <div className="absolute bottom-0 left-0 right-0 p-6">
//                                     <motion.div
//                                         initial={false}
//                                         animate={{ y: hoveredProject === project.id ? 0 : 20 }}
//                                         transition={{ duration: 0.3 }}
//                                     >
//                                         <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>

//                                         <div className="flex flex-wrap gap-4 mb-4">
//                                             <div className="flex items-center gap-2 text-sm text-gray-300">
//                                                 <MapPin className="w-4 h-4" />
//                                                 {project.location}
//                                             </div>
//                                             <div className="flex items-center gap-2 text-sm text-gray-300">
//                                                 <Calendar className="w-4 h-4" />
//                                                 {project.year}
//                                             </div>
//                                         </div>

//                                         <motion.p
//                                             initial={{ opacity: 0, height: 0 }}
//                                             animate={{
//                                                 opacity: hoveredProject === project.id ? 1 : 0,
//                                                 height: hoveredProject === project.id ? 'auto' : 0
//                                             }}
//                                             transition={{ duration: 0.3 }}
//                                             className="text-gray-400 text-sm mb-4"
//                                         >
//                                             {project.description}
//                                         </motion.p>

//                                         <motion.button
//                                             initial={{ opacity: 0 }}
//                                             animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
//                                             transition={{ duration: 0.3 }}
//                                             className="flex items-center gap-2 text-[#F2B705] font-semibold text-sm hover:gap-3 transition-all"
//                                         >
//                                             View Case Study
//                                             <ArrowRight className="w-4 h-4" />
//                                         </motion.button>
//                                     </motion.div>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>

//                 {/* View All CTA */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     className="text-center mt-12"
//                 >
//                     <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white font-semibold rounded-full hover:bg-[#0E3A5D] transition-all duration-300">
//                         <Building2 className="w-5 h-5" />
//                         View All Projects
//                         <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     </button>
//                 </motion.div>
//             </div>
//         </section>
//     );
// }




import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Building2 } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: 'Mumbai Coastal Road Bridge',
        category: 'Government',
        location: 'Mumbai, Maharashtra',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80',
        description: 'Real-time structural monitoring of 10.58 km coastal bridge with 200+ sensors.'
    },
    {
        id: 2,
        title: 'Delhi Metro Phase IV',
        category: 'Railways',
        location: 'New Delhi',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=800&q=80',
        description: 'Comprehensive SHM system for elevated metro corridor spanning 104 km.'
    },
    {
        id: 3,
        title: 'Bengaluru-Chennai Expressway',
        category: 'Highways',
        location: 'Karnataka-Tamil Nadu',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&q=80',
        description: 'Geotechnical investigation and material testing for 262 km expressway.'
    },
    {
        id: 4,
        title: 'Reliance Data Center',
        category: 'Private',
        location: 'Navi Mumbai',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        description: 'Structural audit and foundation analysis for critical infrastructure.'
    },
    {
        id: 5,
        title: 'Ganga River Bridge',
        category: 'Government',
        location: 'Patna, Bihar',
        year: '2024',
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
        description: 'Installation of 150 vibration and strain sensors across 5.5 km span.'
    },
    {
        id: 6,
        title: 'TATA Steel Plant',
        category: 'Private',
        location: 'Jamshedpur, Jharkhand',
        year: '2023',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
        description: 'Industrial structural health monitoring for heavy manufacturing facility.'
    }
];

const categories = ['All', 'Government', 'Railways', 'Highways', 'Private'];

export default function ProjectsSection() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [hoveredProject, setHoveredProject] = useState(null);
    const scrollRef = useRef(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section ref={sectionRef} className="relative py-32 bg-[#F5F7FA] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-50">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(14, 58, 93, 0.1) 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0E3A5D]/10 rounded-full mb-6">
                            <span className="w-2 h-2 bg-[#C4161C] rounded-full" />
                            <span className="text-sm text-[#0E3A5D] font-medium uppercase tracking-wider">Portfolio</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">
                            Global
                            <span className="text-[#C4161C]"> Projects</span>
                        </h2>
                        <p className="text-gray-600 max-w-lg">
                            Engineering excellence delivered across government, railways, highways, and private sectors
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-4 mt-6 md:mt-0">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 rounded-full bg-white border border-gray-200 hover:border-[#C4161C] hover:bg-[#C4161C] hover:text-white transition-all duration-300 shadow-sm"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 rounded-full bg-[#C4161C] text-white hover:bg-[#a01218] transition-all duration-300 shadow-sm"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap gap-3 mb-10"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                ? 'bg-[#0E3A5D] text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0E3A5D] hover:text-[#0E3A5D]'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Carousel */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                            className="flex-shrink-0 w-[350px] md:w-[400px] snap-start"
                        >
                            <div className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer">
                                {/* Image */}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                                {/* Category Badge */}
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-2 bg-[#F2B705] text-[#111111] text-xs font-bold uppercase rounded-full">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <motion.div
                                        initial={false}
                                        animate={{ y: hoveredProject === project.id ? 0 : 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>

                                        <div className="flex flex-wrap gap-4 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                                <MapPin className="w-4 h-4" />
                                                {project.location}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                                <Calendar className="w-4 h-4" />
                                                {project.year}
                                            </div>
                                        </div>

                                        <motion.p
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: hoveredProject === project.id ? 1 : 0,
                                                height: hoveredProject === project.id ? 'auto' : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="text-gray-400 text-sm mb-4"
                                        >
                                            {project.description}
                                        </motion.p>

                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex items-center gap-2 text-[#F2B705] font-semibold text-sm hover:gap-3 transition-all"
                                        >
                                            View Case Study
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white font-semibold rounded-full hover:bg-[#0E3A5D] transition-all duration-300">
                        <Building2 className="w-5 h-5" />
                        View All Projects
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}