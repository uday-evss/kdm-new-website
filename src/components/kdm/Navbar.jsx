import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../../../public/images/logo.png";

const navLinks = [
    { label: "About", href: "#about" },
    {
        label: "Services",
        href: "#services",
        submenu: [
            "Structural Health Monitoring",
            "Geotechnical Investigation",
            "Material Testing",
            "Structural Audit",
            "Topographical Survey",
            "DPR & Consulting",
        ],
    },
    { label: "Projects", href: "#projects" },
    { label: "Technology", href: "#technology" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);

    // 🔥 Scroll progress hook
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* 🔥 Scroll Progress Bar */}
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="fixed top-0 left-0 right-0 h-[3px] 
           bg-[#D62828] 
           origin-left z-[60]"




            />

            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-[#E6EAF0] py-3"
                    : "bg-white/80 backdrop-blur-sm py-0"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">

                        {/* Logo + Name */}
                        <a href="#" className="flex items-center gap-4">
                            <motion.img
                                src={logo}
                                alt="KDM Engineers Logo"
                                initial={false}
                                animate={{ height: 72 }}
                                transition={{ duration: 0.3 }}
                                className="w-auto object-contain"
                            />

                            <div className="leading-tight">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#C4161C] tracking-tight">
                                        KDM
                                    </span>
                                </div>

                                <div className="text-[11px] sm:text-xs md:text-sm font-semibold text-[#111111] tracking-[0.25em] uppercase">
                                    Engineers Group
                                </div>
                            </div>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link, i) => (
                                <div
                                    key={i}
                                    className="relative group"
                                    onMouseEnter={() =>
                                        link.submenu && setActiveSubmenu(i)
                                    }
                                    onMouseLeave={() =>
                                        setActiveSubmenu(null)
                                    }
                                >
                                    <a
                                        href={link.href}
                                        className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[#C4161C] transition-colors py-2"
                                    >
                                        {link.label}
                                        {link.submenu && (
                                            <ChevronDown className="w-4 h-4" />
                                        )}
                                    </a>

                                    {link.submenu && (
                                        <AnimatePresence>
                                            {activeSubmenu === i && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl border border-[#E6EAF0] shadow-xl overflow-hidden"
                                                >
                                                    {link.submenu.map((item, j) => (
                                                        <a
                                                            key={j}
                                                            href="#"
                                                            className="block px-4 py-3 text-sm text-gray-700 hover:text-[#C4161C] hover:bg-[#F5F7FA] transition-colors"
                                                        >
                                                            {item}
                                                        </a>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-6">
                            <a
                                href="tel:+911234567890"
                                className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#C4161C] transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                <span>+91 22 1234 5678</span>
                            </a>

                            <Button className="bg-[#C4161C] hover:bg-white hover:text-[#C4161C] border-2 border-[#C4161C] text-white rounded-full px-6 transition-all duration-300">
                                Get Quote
                            </Button>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="lg:hidden p-2 text-[#111111]"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        <motion.div className="absolute right-0 top-0 bottom-0 w-[85%] sm:w-80 bg-white shadow-2xl overflow-y-auto">
                            <div className="p-6 pt-24 space-y-4">
                                {navLinks.map((link, i) => (
                                    <div key={i}>
                                        <a
                                            href={link.href}
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                            className="block py-3 text-lg font-medium text-[#111111] border-b border-[#E6EAF0]"
                                        >
                                            {link.label}
                                        </a>

                                        {link.submenu && (
                                            <div className="ml-4 mt-2 space-y-2">
                                                {link.submenu.map((item, j) => (
                                                    <a
                                                        key={j}
                                                        href="#"
                                                        className="block py-2 text-sm text-gray-600 hover:text-[#C4161C]"
                                                    >
                                                        {item}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <div className="mt-8 space-y-4">
                                    <a
                                        href="tel:+911234567890"
                                        className="flex items-center gap-2 text-gray-700"
                                    >
                                        <Phone className="w-5 h-5" />
                                        +91 22 XXXX XXXX
                                    </a>

                                    <Button className="w-full bg-[#C4161C] hover:bg-white hover:text-[#C4161C] border-2 border-[#C4161C] text-white rounded-full">
                                        Get Quote
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
