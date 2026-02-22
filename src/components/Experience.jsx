import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

const Experience = () => {
    const experienceData = [
        {
            title: 'Full Stack Intern',
            place: 'Altruistry Internship',
            time: '2 Months (Hybrid)',
            description: 'Worked on building and optimizing full-stack applications, collaborating with teams to deliver high-quality software.'
        }
    ];

    return (
        <section id="experience" className="section-padding">
            <div className="container mx-auto mb-16">
                <h2 className="heading-secondary">Experience</h2>
            </div>

            <div className="container mx-auto max-w-4xl relative">
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-brand-red/20 -translate-x-1/2 hidden md:block"></div>

                {experienceData.map((item, idx) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-center gap-12 mb-16 relative md:flex-row-reverse"
                    >
                        {/* Circle on Timeline */}
                        <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-red shadow-[0_0_10px_0_rgba(139,0,0,0.8)] z-10 hidden md:block"></div>

                        <div className="w-full md:w-1/2 md:pl-12">
                            <div className="bg-brand-gray/50 p-8 rounded-3xl border border-white/5 hover:border-brand-red/30 transition-all text-left">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-brand-red/20 p-2 rounded-lg">
                                        <Briefcase className="text-brand-red" />
                                    </div>
                                    <span className="text-brand-red font-bold text-sm tracking-widest">{item.time}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-brand-red font-medium mb-4">{item.place}</p>
                                <p className="text-gray-500">{item.description}</p>
                            </div>
                        </div>
                        <div className="hidden md:block md:w-1/2"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
