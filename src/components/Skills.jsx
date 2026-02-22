import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Layout, Settings } from 'lucide-react';

const Skills = () => {
    const skillCategories = [
        {
            title: 'Frontend',
            icon: <Layout className="text-brand-red" />,
            skills: ['React', 'JavaScript', 'Tailwind CSS', 'HTML5/CSS3']
        },
        {
            title: 'Backend',
            icon: <Database className="text-brand-red" />,
            skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Firebase', 'SQL', 'FastAPI']
        },
        {
            title: 'Tools',
            icon: <Settings className="text-brand-red" />,
            skills: ['Version Control', 'Postman', 'Vite', 'Docker','N8n']
        }
    ];

    return (
        <section id="skills" className="section-padding">
            <div className="container mx-auto text-center mb-16">
                <h2 className="heading-secondary inline-block mx-auto border-l-0 text-center">My Skills</h2>
                <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                    Here are some of the technologies I've been working with recently. I'm always learning and expanding my toolkit.
                </p>
            </div>

            <div className="container mx-auto grid md:grid-cols-3 gap-8">
                {skillCategories.map((category, idx) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-8 bg-brand-gray border border-white/5 rounded-2xl hover:border-brand-red/30 transition-all group"
                    >
                        <div className="bg-brand-dark w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            {category.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-6 text-white">{category.title}</h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 bg-brand-dark/50 border border-white/10 rounded text-sm text-gray-400 hover:text-white hover:border-brand-red/50 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
