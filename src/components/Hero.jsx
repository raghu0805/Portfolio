import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, Github, Linkedin, Mail, Code2 } from 'lucide-react';


const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-brand-red/5 blur-[150px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 -z-10 w-[300px] h-[300px] bg-red-900/10 blur-[100px] rounded-full"></div>

            <div className="container mx-auto px-6 flex flex-col items-center text-center max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-brand-red font-semibold tracking-widest uppercase text-sm mb-4 block">
                        Welcome to my universe
                    </span>
                    <h1 className="heading-primary leading-tight">
                        Design. Build. <br />
                        <span className="text-brand-red">Innovate.</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed mx-auto max-w-2xl">
                        I'm a passionate Full Stack Developer specializing in building modern web applications
                        with a focus on clean code and exceptional user experiences.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="projects" smooth={true} className="btn-primary flex items-center gap-2 cursor-pointer">
                            View Projects <ArrowRight size={20} />
                        </Link>
                        <Link to="contact" smooth={true} className="btn-secondary cursor-pointer">
                            Contact Me
                        </Link>
                    </div>

                    <div className="flex gap-6 mt-10 text-gray-400 justify-center">
                        <a href="https://github.com/raghu0805" target="_blank" className="hover:text-brand-red transition-colors">
                            <Github size={24} />
                        </a>
                        <a href="http://linkedin.com/in/raghu0805/" target="_blank" className="hover:text-brand-red transition-colors">
                            <Linkedin size={24} />
                        </a>
                        <a href="https://leetcode.com/u/Raghu249/" target="_blank" className="hover:text-brand-red transition-colors">
                            <Code2 size={24} />
                        </a>
                        <a href="mailto:imraghu0805@gmail.com" className="hover:text-brand-red transition-colors">
                            <Mail size={24} />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
