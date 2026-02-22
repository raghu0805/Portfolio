import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    return (
        <div className="bg-brand-dark min-h-screen text-brand-light font-sans selection:bg-brand-red selection:text-white">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Education />
                <Experience />
                {/* <Achievements /> */}
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
