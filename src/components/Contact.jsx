import React from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="section-padding bg-brand-gray/30">
            <div className="container mx-auto mb-16">
                <h2 className="heading-secondary">Get In Touch</h2>
            </div>

            <div className="container mx-auto grid md:grid-cols-2 gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold text-white mb-6">Let's talk about your project</h3>
                    <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                        I'm currently looking for new opportunities and collaborations.
                        Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-6">
                            <div className="bg-brand-gray w-12 h-12 rounded-xl flex items-center justify-center text-brand-red">
                                <Mail size={24} />
                            </div>
                            <div>
                                <span className="text-gray-500 text-sm block">Email</span>
                                <span className="text-white font-medium">imraghu0805@gmail.com</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="bg-brand-gray w-12 h-12 rounded-xl flex items-center justify-center text-brand-red">
                                <Phone size={24} />
                            </div>
                            <div>
                                <span className="text-gray-500 text-sm block">Location</span>
                                <span className="text-white font-medium">Chennai, India</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* <motion.form
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="grid grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full bg-brand-dark border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-brand-red transition-colors text-white"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-brand-dark border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-brand-red transition-colors text-white"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Subject"
                        className="w-full bg-brand-dark border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-brand-red transition-colors text-white"
                    />
                    <textarea
                        rows="5"
                        placeholder="Message"
                        className="w-full bg-brand-dark border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-brand-red transition-colors text-white resize-none"
                    ></textarea>

                    <button className="btn-primary w-full flex items-center justify-center gap-2">
                        Send Message <Send size={20} />
                    </button>
                </motion.form> */}
            </div>
        </section>
    );
};

export default Contact;
