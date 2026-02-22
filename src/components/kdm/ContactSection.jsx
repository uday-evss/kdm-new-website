// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import {
//     MapPin,
//     Phone,
//     Mail,
//     Clock,
//     Send,
//     Building2,
//     Globe,
//     ArrowRight,
//     CheckCircle
// } from 'lucide-react';

// export default function ContactSection() {
//     const [formState, setFormState] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         company: '',
//         service: '',
//         message: ''
//     });
//     const [isSubmitted, setIsSubmitted] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setIsSubmitted(true);
//         setTimeout(() => setIsSubmitted(false), 3000);
//     };

//     return (
//         <section className="relative py-32 bg-[#111111] overflow-hidden">
//             {/* Background Effects */}
//             <div className="absolute inset-0">
//                 <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#C4161C]/10 rounded-full blur-3xl" />
//                 <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0E3A5D]/10 rounded-full blur-3xl" />

//                 {/* Grid Pattern */}
//                 <div className="absolute inset-0 opacity-10" style={{
//                     backgroundImage: `
//             linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
//           `,
//                     backgroundSize: '50px 50px'
//                 }} />
//             </div>

//             <div className="relative z-10 max-w-7xl mx-auto px-6">
//                 {/* Header */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     className="text-center mb-16"
//                 >
//                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-6">
//                         <span className="w-2 h-2 bg-[#F2B705] rounded-full" />
//                         <span className="text-sm text-gray-400 uppercase tracking-wider">Get in Touch</span>
//                     </div>
//                     <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
//                         Let's Build
//                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4161C] to-[#F2B705]"> Together</span>
//                     </h2>
//                     <p className="text-lg text-gray-400 max-w-2xl mx-auto">
//                         Ready to transform your infrastructure monitoring? Connect with our experts today.
//                     </p>
//                 </motion.div>

//                 <div className="grid lg:grid-cols-2 gap-12">
//                     {/* Left - Contact Info */}
//                     <motion.div
//                         initial={{ opacity: 0, x: -50 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.8 }}
//                         className="space-y-8"
//                     >
//                         {/* Global Statement */}
//                         <div className="p-8 rounded-3xl bg-gradient-to-br from-[#C4161C] to-[#8a0f14]">
//                             <Globe className="w-10 h-10 text-[#F2B705] mb-4" />
//                             <h3 className="text-2xl font-bold text-white mb-3">
//                                 Pan-India Presence, Global Standards
//                             </h3>
//                             <p className="text-white/80 leading-relaxed">
//                                 From metros to remote infrastructure projects, KDM Engineers delivers world-class
//                                 structural health monitoring solutions across India and beyond.
//                             </p>
//                         </div>

//                         {/* Contact Cards */}
//                         <div className="grid sm:grid-cols-2 gap-4">
//                             {[
//                                 { icon: MapPin, label: 'Head Office', value: 'Mumbai, Maharashtra', sub: '400001' },
//                                 { icon: Phone, label: 'Call Us', value: '+91 22 XXXX XXXX', sub: 'Toll Free: 1800-XXX-XXX' },
//                                 { icon: Mail, label: 'Email Us', value: 'info@kdmengineers.com', sub: 'projects@kdmengineers.com' },
//                                 { icon: Clock, label: 'Working Hours', value: 'Mon - Sat: 9AM - 7PM', sub: 'Emergency: 24/7' },
//                             ].map((item, i) => (
//                                 <motion.div
//                                     key={i}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     whileInView={{ opacity: 1, y: 0 }}
//                                     viewport={{ once: true }}
//                                     transition={{ delay: 0.1 * i }}
//                                     className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C4161C]/30 transition-colors group"
//                                 >
//                                     <div className="flex items-start gap-4">
//                                         <div className="p-2 rounded-xl bg-[#0E3A5D]/50 group-hover:bg-[#C4161C]/50 transition-colors">
//                                             <item.icon className="w-5 h-5 text-[#F2B705]" />
//                                         </div>
//                                         <div>
//                                             <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.label}</p>
//                                             <p className="text-white font-medium">{item.value}</p>
//                                             <p className="text-sm text-gray-500">{item.sub}</p>
//                                         </div>
//                                     </div>
//                                 </motion.div>
//                             ))}
//                         </div>

//                         {/* Office Locations */}
//                         <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
//                             <div className="flex items-center gap-3 mb-4">
//                                 <Building2 className="w-5 h-5 text-[#F2B705]" />
//                                 <h4 className="text-white font-semibold">Regional Offices</h4>
//                             </div>
//                             <div className="grid grid-cols-2 gap-3">
//                                 {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata'].map((city, i) => (
//                                     <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
//                                         <span className="w-1.5 h-1.5 bg-[#C4161C] rounded-full" />
//                                         {city}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </motion.div>

//                     {/* Right - Contact Form */}
//                     <motion.div
//                         initial={{ opacity: 0, x: 50 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.8 }}
//                     >
//                         <div className="relative p-8 md:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
//                             {/* Glassmorphism Effect */}
//                             <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

//                             <div className="relative z-10">
//                                 <h3 className="text-2xl font-bold text-white mb-2">Request a Consultation</h3>
//                                 <p className="text-gray-400 mb-8">Fill out the form and our team will get back within 24 hours.</p>

//                                 <form onSubmit={handleSubmit} className="space-y-5">
//                                     <div className="grid sm:grid-cols-2 gap-5">
//                                         <div>
//                                             <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
//                                             <Input
//                                                 value={formState.name}
//                                                 onChange={(e) => setFormState({ ...formState, name: e.target.value })}
//                                                 placeholder="John Doe"
//                                                 className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#C4161C] h-12"
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm text-gray-400 mb-2">Email *</label>
//                                             <Input
//                                                 type="email"
//                                                 value={formState.email}
//                                                 onChange={(e) => setFormState({ ...formState, email: e.target.value })}
//                                                 placeholder="john@company.com"
//                                                 className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#C4161C] h-12"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div className="grid sm:grid-cols-2 gap-5">
//                                         <div>
//                                             <label className="block text-sm text-gray-400 mb-2">Phone</label>
//                                             <Input
//                                                 value={formState.phone}
//                                                 onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
//                                                 placeholder="+91 XXXXX XXXXX"
//                                                 className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#C4161C] h-12"
//                                             />
//                                         </div>
//                                         <div>
//                                             <label className="block text-sm text-gray-400 mb-2">Company</label>
//                                             <Input
//                                                 value={formState.company}
//                                                 onChange={(e) => setFormState({ ...formState, company: e.target.value })}
//                                                 placeholder="Company Name"
//                                                 className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#C4161C] h-12"
//                                             />
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Service Interest</label>
//                                         <select
//                                             value={formState.service}
//                                             onChange={(e) => setFormState({ ...formState, service: e.target.value })}
//                                             className="w-full h-12 px-4 rounded-md bg-white/5 border border-white/10 text-white focus:border-[#C4161C] focus:outline-none"
//                                         >
//                                             <option value="" className="bg-[#111111]">Select a service</option>
//                                             <option value="shm" className="bg-[#111111]">Structural Health Monitoring</option>
//                                             <option value="geo" className="bg-[#111111]">Geotechnical Investigation</option>
//                                             <option value="material" className="bg-[#111111]">Material Testing</option>
//                                             <option value="audit" className="bg-[#111111]">Structural Audit</option>
//                                             <option value="survey" className="bg-[#111111]">Topographical Survey</option>
//                                             <option value="dpr" className="bg-[#111111]">DPR & Consulting</option>
//                                         </select>
//                                     </div>

//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Project Details</label>
//                                         <Textarea
//                                             value={formState.message}
//                                             onChange={(e) => setFormState({ ...formState, message: e.target.value })}
//                                             placeholder="Tell us about your project requirements..."
//                                             rows={4}
//                                             className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#C4161C] resize-none"
//                                         />
//                                     </div>

//                                     <Button
//                                         type="submit"
//                                         className={`w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300 ${isSubmitted
//                                             ? 'bg-green-500 hover:bg-green-600'
//                                             : 'bg-[#C4161C] hover:bg-[#a01218]'
//                                             }`}
//                                     >
//                                         {isSubmitted ? (
//                                             <span className="flex items-center gap-2">
//                                                 <CheckCircle className="w-5 h-5" />
//                                                 Message Sent!
//                                             </span>
//                                         ) : (
//                                             <span className="flex items-center gap-2">
//                                                 Send Message
//                                                 <Send className="w-5 h-5" />
//                                             </span>
//                                         )}
//                                     </Button>
//                                 </form>

//                                 <p className="text-xs text-gray-500 text-center mt-6">
//                                     By submitting this form, you agree to our privacy policy and terms of service.
//                                 </p>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </div>
//             </div>
//         </section>
//     );
// }





import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    Building2,
    Globe,
    ArrowRight,
    CheckCircle
} from 'lucide-react';

export default function ContactSection() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <section className="relative py-32 bg-white overflow-hidden">
            {/* Subtle Background */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
            linear-gradient(#E6EAF0 1px, transparent 1px),
            linear-gradient(90deg, #E6EAF0 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F5F7FA] border border-[#E6EAF0] rounded-full mb-6">
                        <span className="w-2 h-2 bg-[#C4161C] rounded-full" />
                        <span className="text-sm text-[#0E3A5D] font-medium uppercase tracking-wider">Get in Touch</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-6">
                        Let's Build
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4161C] to-[#0E3A5D]"> Together</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Ready to transform your infrastructure monitoring? Connect with our experts today.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left - Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Global Statement */}
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-[#C4161C] to-[#a01218] shadow-sm">
                            <Globe className="w-10 h-10 text-white mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-3">
                                Pan-India Presence, Global Standards
                            </h3>
                            <p className="text-white/90 leading-relaxed">
                                From metros to remote infrastructure projects, KDM Engineers delivers world-class
                                structural health monitoring solutions across India and beyond.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { icon: MapPin, label: 'Head Office', value: 'Mumbai, Maharashtra', sub: '400001' },
                                { icon: Phone, label: 'Call Us', value: '+91 22 1234 5678', sub: 'Toll Free: 1800-XXX-XXX' },
                                { icon: Mail, label: 'Email Us', value: 'info@kdmengineers.com', sub: 'projects@kdmengineers.com' },
                                { icon: Clock, label: 'Working Hours', value: 'Mon - Sat: 9AM - 7PM', sub: 'Emergency: 24/7' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i }}
                                    className="p-5 rounded-2xl bg-white border-2 border-[#E6EAF0] hover:border-[#C4161C]/30 transition-colors group shadow-sm"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 rounded-xl bg-[#F5F7FA] group-hover:bg-[#C4161C]/10 transition-colors">
                                            <item.icon className="w-5 h-5 text-[#0E3A5D] group-hover:text-[#C4161C] transition-colors" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1 font-medium">{item.label}</p>
                                            <p className="text-[#111111] font-semibold">{item.value}</p>
                                            <p className="text-sm text-gray-600">{item.sub}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Office Locations */}
                        <div className="p-6 rounded-2xl bg-white border-2 border-[#E6EAF0] shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <Building2 className="w-5 h-5 text-[#0E3A5D]" />
                                <h4 className="text-[#111111] font-semibold">Regional Offices</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata'].map((city, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                        <span className="w-1.5 h-1.5 bg-[#C4161C] rounded-full" />
                                        {city}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative p-8 md:p-10 rounded-2xl bg-white border-2 border-[#E6EAF0] shadow-md">

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-[#111111] mb-2">Request a Consultation</h3>
                                <p className="text-gray-600 mb-8">Fill out the form and our team will get back within 24 hours.</p>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium mb-2">Full Name *</label>
                                            <Input
                                                value={formState.name}
                                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                placeholder="John Doe"
                                                className="bg-[#F5F7FA] border-[#E6EAF0] text-[#111111] placeholder:text-gray-500 focus:border-[#C4161C] focus:bg-white h-12"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium mb-2">Email *</label>
                                            <Input
                                                type="email"
                                                value={formState.email}
                                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                placeholder="john@company.com"
                                                className="bg-[#F5F7FA] border-[#E6EAF0] text-[#111111] placeholder:text-gray-500 focus:border-[#C4161C] focus:bg-white h-12"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium mb-2">Phone</label>
                                            <Input
                                                value={formState.phone}
                                                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                                placeholder="+91 XXXXX XXXXX"
                                                className="bg-[#F5F7FA] border-[#E6EAF0] text-[#111111] placeholder:text-gray-500 focus:border-[#C4161C] focus:bg-white h-12"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-700 font-medium mb-2">Company</label>
                                            <Input
                                                value={formState.company}
                                                onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                                                placeholder="Company Name"
                                                className="bg-[#F5F7FA] border-[#E6EAF0] text-[#111111] placeholder:text-gray-500 focus:border-[#C4161C] focus:bg-white h-12"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-700 font-medium mb-2">Service Interest</label>
                                        <select
                                            value={formState.service}
                                            onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                                            className="w-full h-12 px-4 rounded-md bg-[#F5F7FA] border border-[#E6EAF0] text-[#111111] focus:border-[#C4161C] focus:bg-white focus:outline-none"
                                        >
                                            <option value="">Select a service</option>
                                            <option value="shm">Structural Health Monitoring</option>
                                            <option value="geo">Geotechnical Investigation</option>
                                            <option value="material">Material Testing</option>
                                            <option value="audit">Structural Audit</option>
                                            <option value="survey">Topographical Survey</option>
                                            <option value="dpr">DPR & Consulting</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-700 font-medium mb-2">Project Details</label>
                                        <Textarea
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            placeholder="Tell us about your project requirements..."
                                            rows={4}
                                            className="bg-[#F5F7FA] border-[#E6EAF0] text-[#111111] placeholder:text-gray-500 focus:border-[#C4161C] focus:bg-white resize-none"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className={`w-full h-14 text-lg font-semibold rounded-full transition-all duration-300 shadow-sm ${isSubmitted
                                            ? 'bg-green-500 hover:bg-green-600 text-white'
                                            : 'bg-[#C4161C] hover:bg-white hover:text-[#C4161C] border-2 border-[#C4161C] text-white'
                                            }`}
                                    >
                                        {isSubmitted ? (
                                            <span className="flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5" />
                                                Message Sent!
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Send Message
                                                <Send className="w-5 h-5" />
                                            </span>
                                        )}
                                    </Button>
                                </form>

                                <p className="text-xs text-gray-600 text-center mt-6">
                                    By submitting this form, you agree to our privacy policy and terms of service.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}