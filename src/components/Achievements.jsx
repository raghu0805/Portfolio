import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Target } from 'lucide-react';

const Achievements = () => {
    const achievements = [
        // {
        //     title: 'Full Stack Development Certification',
        //     issuer: 'Online Learning Platform',
        //     icon: <Award className="text-brand-red" />
        // },
        // {
        //     title: 'Hackathon Finalist',
        //     issuer: 'College Level',
        //     icon: <Trophy className="text-brand-red" />
        // },
        // {
        //     title: 'Google Cloud Practitioner',
        //     issuer: 'Google',
        //     icon: <Target className="text-brand-red" />
        // }
    ];

    return (
        <section id="achievements" className="section-padding bg-brand-dark">
            <div className="container mx-auto mb-16">
                <h2 className="heading-secondary">Achievements & Certifications</h2>
            </div>

            <div className="container mx-auto grid md:grid-cols-3 gap-8">
                {achievements.map((item, idx) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-8 bg-brand-gray/50 rounded-2xl border border-white/5 hover:border-brand-red/20 transition-all flex flex-col items-center text-center group"
                    >
                        <div className="w-16 h-16 bg-brand-dark rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform shadow-lg">
                            {item.icon}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-brand-red font-medium text-sm">{item.issuer}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Achievements;
