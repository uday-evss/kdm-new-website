// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function HeroSection() {
//     const [currentWord, setCurrentWord] = useState(0);
//     const [currentImage, setCurrentImage] = useState(0);
//     const [direction, setDirection] = useState(1);

//     const words = ["Tomorrow's", "Smarter", "Safer", "Resilient"];

//     const services = [
//         "Structural Health Monitoring",
//         "Geotechnical Investigation",
//         "Material Testing",
//         "Infrastructure Consulting",
//     ];

//     const images = [
//         "https://res.cloudinary.com/drhrf0b4h/image/upload/v1771395957/samples/coffee.jpg",
//         "https://res.cloudinary.com/drhrf0b4h/image/upload/v1692444134/cld-sample-2.jpg",
//         "https://res.cloudinary.com/drhrf0b4h/image/upload/v1692444135/cld-sample-3.jpg",
//         "https://res.cloudinary.com/drhrf0b4h/image/upload/v1692444130/samples/balloons.jpg",
//     ];

//     /* ---------------- WORD ROTATION ---------------- */

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentWord((prev) => (prev + 1) % words.length);
//         }, 3000);
//         return () => clearInterval(interval);
//     }, []);

//     /* ---------------- IMAGE AUTO ROTATION ---------------- */

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setDirection(1);
//             setCurrentImage((prev) => (prev + 1) % images.length);
//         }, 5000);

//         return () => clearInterval(interval);
//     }, []);

//     const changeImage = (index) => {
//         setDirection(index > currentImage ? 1 : -1);
//         setCurrentImage(index);
//     };

//     const slideVariants = {
//         enter: (direction) => ({
//             x: direction > 0 ? "100%" : "-100%",
//         }),
//         center: { x: 0 },
//         exit: (direction) => ({
//             x: direction > 0 ? "-100%" : "100%",
//         }),
//     };

//     return (
//         <section className="relative min-h-screen flex items-center overflow-hidden bg-white">

//             {/* Background Blurs */}
//             <div className="absolute inset-0 -z-10">
//                 <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-[#C4161C]/10 rounded-full blur-[120px]" />
//                 <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#0E3A5D]/10 rounded-full blur-[120px]" />
//             </div>

//             <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

//                 <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-16 lg:pt-24 pb-10 lg:pb-16">

//                     {/* LEFT SIDE */}
//                     <div className="text-center lg:text-left">

//                         {/* Badge */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8 }}
//                             className="inline-flex items-center gap-2 px-5 py-2.5 bg-white shadow-md border border-[#E6EAF0] rounded-full mb-6 mt-6 sm:mt-0"
//                         >
//                             <span className="w-2 h-2 bg-[#C4161C] rounded-full animate-pulse" />
//                             <span className="text-xs sm:text-sm text-[#0E3A5D] font-medium tracking-wider uppercase">
//                                 Global Infrastructure Intelligence
//                             </span>
//                         </motion.div>

//                         {/* Headline */}
//                         <motion.h1
//                             initial={{ opacity: 0, y: 40 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.9 }}
//                             className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#111111] leading-[1.15] mb-6"
//                         >
//                             Engineering Intelligence
//                             <br />
//                             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4161C] via-[#F2B705] to-[#0E3A5D]">
//                                 for{" "}
//                                 <motion.span
//                                     key={currentWord}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ duration: 0.4 }}
//                                     className="inline-block"
//                                 >
//                                     {words[currentWord]}
//                                 </motion.span>
//                             </span>
//                             <br />
//                             Infrastructure
//                         </motion.h1>

//                         {/* Services Highlight */}
//                         <div className="text-base sm:text-lg text-gray-500 mb-8 flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2">
//                             {services.map((service, index) => {
//                                 const active = currentImage === index;
//                                 return (
//                                     <motion.span
//                                         key={service}
//                                         animate={{
//                                             color: active ? "#111111" : "#6B7280",
//                                             fontWeight: active ? 600 : 400,
//                                         }}
//                                         transition={{ duration: 0.3 }}
//                                     >
//                                         {service}
//                                     </motion.span>
//                                 );
//                             })}
//                         </div>

//                         {/* Buttons */}
//                         <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">

//                             <Button
//                                 size="lg"
//                                 className="group bg-[#C4161C] text-white border-2 border-[#C4161C] px-6 py-5 rounded-full transition-all duration-300 hover:bg-white hover:text-[#C4161C] hover:scale-105"
//                             >
//                                 Explore Our Expertise
//                                 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                             </Button>

//                             <Button
//                                 size="lg"
//                                 className="group bg-white text-[#C4161C] border-2 border-[#C4161C] px-6 py-5 rounded-full transition-all duration-300 hover:bg-[#C4161C] hover:text-white hover:scale-105"
//                             >
//                                 Download Brochure
//                                 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                             </Button>

//                         </div>
//                     </div>

//                     {/* RIGHT IMAGE SECTION */}
//                     <div className="relative w-full">

//                         <div className="relative h-[260px] sm:h-[380px] lg:h-[600px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_-20px_rgba(0,0,0,0.25)]">

//                             <AnimatePresence initial={false} custom={direction}>
//                                 <motion.img
//                                     key={currentImage}
//                                     src={images[currentImage]}
//                                     custom={direction}
//                                     variants={slideVariants}
//                                     initial="enter"
//                                     animate="center"
//                                     exit="exit"
//                                     transition={{
//                                         duration: 0.8,
//                                         ease: [0.76, 0, 0.24, 1],
//                                     }}
//                                     className="absolute inset-0 w-full h-full object-cover"
//                                 />
//                             </AnimatePresence>

//                             <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
//                         </div>

//                         {/* Slider Dots */}
//                         <div className="flex justify-center gap-2 mt-4">
//                             {images.map((_, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => changeImage(index)}
//                                     className={`h-2 rounded-full transition-all duration-300 ${currentImage === index
//                                         ? "w-6 bg-[#C4161C]"
//                                         : "w-2 bg-gray-300"
//                                         }`}
//                                 />
//                             ))}
//                         </div>

//                     </div>
//                 </div>


//                 {/* Stats Preview */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.8 }}
//                     className="mb-7 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
//                 >
//                     {[
//                         { value: '500+', label: 'Projects' },
//                         { value: '100+', label: 'Clients' },
//                         { value: '10+', label: 'Years' },
//                         { value: '24/7', label: 'Monitoring' },
//                     ].map((stat, i) => (
//                         <motion.div
//                             key={i}
//                             whileHover={{ y: -5 }}
//                             className="text-center p-6 rounded-2xl bg-white border border-[#E6EAF0] shadow-sm hover:shadow-md transition-all"
//                         >
//                             <div className="text-3xl md:text-4xl font-bold text-[#C4161C] mb-1">{stat.value}</div>
//                             <div className="text-sm text-gray-600 uppercase tracking-wider">{stat.label}</div>
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             </div>
//         </section>
//     );
// }








import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
    const [currentWord, setCurrentWord] = useState(0);
    const [currentImage, setCurrentImage] = useState(0);
    const [direction, setDirection] = useState(1);

    const words = ["Tomorrow's", "Smarter", "Safer", "Resilient"];

    const services = [
        "Structural Health Monitoring",
        "Geotechnical Investigation",
        "Material Testing",
        "Infrastructure Consulting",
    ];

    // const images = [
    //     'https://res.cloudinary.com/drhrf0b4h/image/upload/v1771414419/Jagdalpur-6-scaled_bguynz.jpg',
    //     'https://res.cloudinary.com/drhrf0b4h/image/upload/v1771414308/Pile-Load-Test-2-scaled_hwudrg.jpg',
    //     'https://res.cloudinary.com/drhrf0b4h/image/upload/v1771414897/Material-Testing-Lab-4-scaled_ifrrsf.jpg',
    //     'https://res.cloudinary.com/drhrf0b4h/image/upload/v1771415011/HomePage-2-scaled_u4zans.jpg',
    // ];


    const images = [
        'https://res.cloudinary.com/drhrf0b4h/image/upload/v1771485079/Gemini_Generated_Image_rxd0ifrxd0ifrxd0_advbjy.png',

        'https://res.cloudinary.com/drhrf0b4h/image/upload/v1771484822/Gemini_Generated_Image_16pcqr16pcqr16pc_bbvl2n.png',
        'https://res.cloudinary.com/drhrf0b4h/image/upload/v1771484822/Gemini_Generated_Image_gnqvurgnqvurgnqv_h5hpw3.png',
        'https://res.cloudinary.com/drhrf0b4h/image/upload/v1771484822/Gemini_Generated_Image_3aqanp3aqanp3aqa_tzpqrz.png'
    ];

    /* ---------------- WORD ROTATION ---------------- */

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    /* ---------------- IMAGE AUTO ROTATION ---------------- */

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const changeImage = (index) => {
        setDirection(index > currentImage ? 1 : -1);
        setCurrentImage(index);
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: { x: 0, opacity: 1 },
        exit: (direction) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0,
        }),
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#f9fbff] via-white to-[#f2f6fa] lg:pt-10">

            {/* Engineering Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

            {/* Soft Brand Glow */}
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#C4161C]/10 rounded-full blur-[120px]" />
            <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#0E3A5D]/10 rounded-full blur-[120px]" />

            {/* Background Logo Watermark */}
            <img
                src="/original logo.jpeg"
                alt="KDM Logo"
                className="absolute right-[-100px] top-1/2 -translate-y-1/2 w-[600px] opacity-[0.03] pointer-events-none"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

                <div className="grid lg:grid-cols-2 gap-16 items-center pt-24 pb-16">

                    {/* LEFT SIDE */}
                    <div className="text-center lg:text-left">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-md border border-white/40 shadow-lg rounded-full mb-8"
                        >
                            <span className="w-2 h-2 bg-[#C4161C] rounded-full animate-pulse" />
                            <span className="text-xs lg:text-sm text-[#0E3A5D] font-medium tracking-wider uppercase">

                                Global Infrastructure Intelligence
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#111111] leading-[1.1] mb-8 tracking-tight"
                        >
                            Engineering Intelligence
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4161C] via-[#F2B705] to-[#0E3A5D]">
                                for{" "}
                                <motion.span
                                    key={currentWord}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {words[currentWord]}
                                </motion.span>
                            </span>
                            <br />
                            Infrastructure
                        </motion.h1>

                        {/* Services */}
                        <div className="text-lg text-gray-500 mb-10 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3">
                            {services.map((service, index) => {
                                const active = currentImage === index;
                                return (
                                    <motion.span
                                        key={service}
                                        animate={{
                                            color: active ? "#111111" : "#6B7280",
                                            scale: active ? 1.05 : 1,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {service}
                                    </motion.span>
                                );
                            })}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">

                            <Button
                                size="lg"
                                className="group bg-[#C4161C] text-white px-8 py-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                            >
                                Explore Our Expertise
                                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                            </Button>

                            <Button
                                size="lg"
                                className="group bg-white border border-[#C4161C] text-[#C4161C] px-8 py-6 rounded-full shadow-md hover:bg-[#C4161C] hover:text-white transition-all duration-500 hover:-translate-y-1"
                            >
                                Download Brochure
                                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                            </Button>

                        </div>
                    </div>

                    {/* RIGHT IMAGE SECTION */}
                    <div className="relative w-full">

                        {/* Floating Ring Accent */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                            className="absolute -inset-10 rounded-full border border-[#C4161C]/20"
                        />

                        <div className="relative h-[350px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)]">

                            <AnimatePresence initial={false} custom={direction}>
                                <motion.img
                                    key={currentImage}
                                    src={images[currentImage]}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>

                        {/* Slider Dots */}
                        <div className="flex justify-center gap-3 mt-6">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => changeImage(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${currentImage === index
                                        ? "w-8 bg-[#C4161C]"
                                        : "w-3 bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Glass Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-7"
                >
                    {[
                        { value: "500+", label: "Projects" },
                        { value: "100+", label: "Clients" },
                        { value: "10+", label: "Years" },
                        { value: "24/7", label: "Monitoring" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -8 }}
                            className="text-center p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white/40 shadow-lg hover:shadow-2xl transition-all"
                        >
                            <div className="text-4xl font-bold text-[#C4161C] mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-600 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
