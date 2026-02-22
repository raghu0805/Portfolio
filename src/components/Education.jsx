import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Education = () => {
    const educationData = [
        {
            title: 'B.Tech Computer Science and Business Systems',
            place: 'Panimalar Engineering College',
            time: '2023 - 2027',
            description: 'Currently pursuing my engineering degree with a focus on web technologies and software engineering principles.'
        }
    ];

    return (
        <section id="education" className="section-padding">
            <div className="container mx-auto mb-16">
                <h2 className="heading-secondary">Education</h2>
            </div>

            <div className="container mx-auto max-w-4xl relative">
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-brand-red/20 -translate-x-1/2 hidden md:block"></div>

                {educationData.map((item, idx) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-center gap-12 mb-16 relative"
                    >
                        {/* Circle on Timeline */}
                        <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-red shadow-[0_0_10px_0_rgba(139,0,0,0.8)] z-10 hidden md:block"></div>

                        <div className="w-full md:w-1/2 md:pr-12 md:text-right">
                            <div className="bg-brand-gray/50 p-8 rounded-3xl border border-white/5 hover:border-brand-red/30 transition-all text-left md:text-right">
                                <div className="flex items-center gap-4 mb-4 md:flex-row-reverse">
                                    <div className="bg-brand-red/20 p-2 rounded-lg">
                                        <GraduationCap className="text-brand-red" />
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

export default Education;
