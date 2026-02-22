import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import investorMatchImg from '../public/preview-investorMatch.png';

const Projects = () => {
    const projects = [
        {
            title: 'Investor Match',
            description: 'InvestMatch is a full-stack web platform that connects early-stage startups with the right investors using AI-driven matching.',
            tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind','Ollama API'],
            image: investorMatchImg,
            live: 'https://investormatch-8iqdyoqet-raghu0805s-projects.vercel.app/',
            github: 'https://github.com/raghu0805',
            featured: true
        }
    ];
    return (
        <section id="projects" className="section-padding bg-brand-gray/30">
            <div className="container mx-auto mb-16">
                <h2 className="heading-secondary">Featured Projects</h2>
            </div>

            <div className="container mx-auto grid md:grid-cols-1 gap-12">
                {projects.map((project) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group relative bg-brand-gray rounded-[2rem] overflow-hidden flex flex-col md:flex-row border border-white/5 hover:border-brand-red/20 transition-all"
                    >
                        {/* Project Image Placeholder */}
                        <div className="md:w-1/2 aspect-video md:aspect-auto bg-brand-accent overflow-hidden relative">
                            <div className="absolute inset-0 bg-brand-red/10 group-hover:bg-brand-red/0 transition-colors duration-500 z-10"></div>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Project Info */}
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-2 text-brand-red text-sm font-bold tracking-widest uppercase mb-4">
                                <span className="w-8 h-px bg-brand-red"></span>
                                Featured Project
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white group-hover:text-brand-red transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-3 mb-10">
                                {project.tech.map(t => (
                                    <span key={t} className="px-4 py-1 bg-brand-dark rounded-full text-xs font-medium text-gray-500 uppercase tracking-tighter">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-6">
                                <a
                                    href={project.live}
                                    target="_blank"
                                    className="flex items-center gap-2 text-white hover:text-brand-red transition-colors font-semibold"
                                >
                                    Live Demo <ExternalLink size={20} />
                                </a>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
                                >
                                    <Github size={20} /> Source Code
                                </a>
                            </div>
                        </div>

                        {/* <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"> */}
                        {/* <ArrowUpRight className="text-brand-red" size={32} /> */}
                        {/* </div> */}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;