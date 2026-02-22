import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import profileImg from '../public/Raghu.jpeg';
import resumePDF from '../public/finalized resume.pdf';

const About = () => {
    return (
        <section id="about" className="section-padding bg-brand-gray/30">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:w-1/3"
                    >
                        <div className="relative">
                            <div className="w-full aspect-square bg-brand-accent rounded-2xl overflow-hidden border border-brand-red/10">
                                <img
                                    src={profileImg}
                                    alt="About Raghu"
                                    className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-700"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-red/10 -z-10 rounded-full blur-2xl"></div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:w-2/3"
                    >
                        <h2 className="heading-secondary">About Me</h2>
                        <p className="text-gray-400 mb-6 leading-relaxed text-lg">
                            I am a driven Full Stack Developer with a strong foundation in modern web technologies.
                            My journey in tech is fueled by curiosity and a desire to build solutions that solve real-world problems.
                            I specialize in creating high-performance, accessible, and beautiful web applications.
                        </p>
                        <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                            Currently pursuing my engineering degree, I've spent my time mastering the MERN stack
                            and exploring the intersection of AI and web development. My goal is to build software
                            that not only works perfectly but also provides a delightful user experience.
                        </p>

                        <div className="flex flex-wrap gap-8 mb-10">
                            <div>
                                <span className="text-3xl font-bold text-brand-red block">2+</span>
                                <span className="text-gray-500 text-sm uppercase tracking-wide">Months Interning</span>
                            </div>
                            <div>
                                <span className="text-3xl font-bold text-brand-red block">2+</span>
                                <span className="text-gray-500 text-sm uppercase tracking-wide">Projects Done</span>
                            </div>
                            {/* <div>
                                <span className="text-3xl font-bold text-brand-red block">5+</span>
                                <span className="text-gray-500 text-sm uppercase tracking-wide">Certifications</span>
                            </div> */}
                        </div>

                        <a
                            href={resumePDF}
                            download="finalized resume.pdf"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <Download size={20} /> Download Resume
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
