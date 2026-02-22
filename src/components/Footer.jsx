import React from 'react';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-12 px-6 border-t border-white/5 bg-brand-dark text-center">
            <p>© {new Date().getFullYear()} RAGHU. All rights reserved.</p>

        </footer>
    );
};
export default Footer;
