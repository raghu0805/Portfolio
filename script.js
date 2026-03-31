document.addEventListener('DOMContentLoaded', () => {
    // 1. Boot Loader
    const loader = document.getElementById('loader');
    const bootProgress = document.getElementById('boot-progress');
    const bootText = document.getElementById('boot-text');
    
    let progress = 0;
    const bootSteps = [
        "Initializing system...",
        "Establishing backend context...",
        "Establishing secure connection...",
        "Parsing repository data...",
        "Modules online.",
        "Welcome, User."
    ];
    let stepIndex = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        bootProgress.style.width = `${progress}%`;
        
        if (progress > (stepIndex + 1) * (100 / bootSteps.length)) {
            stepIndex++;
            if (stepIndex < bootSteps.length) {
                bootText.textContent = bootSteps[stepIndex];
            }
        }

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    initAnimations();
                }, 500);
            }, 500);
        }
    }, 150);

    // 2. Typing Animation
    function initAnimations() {
        const textElement = document.getElementById('typing-intro');
        const textToType = "I build resilient software ecosystems.";
        let charIndex = 0;

        function type() {
            if (charIndex < textToType.length) {
                textElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 80);
            }
        }
        type();
    }

    // 3. Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    function revealOnScroll() {
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // 4. Parallax Effect for Cyber Photo Frame
    const cyberFrame = document.querySelector('.cyber-frame');
    if (cyberFrame) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 40;
            const y = (window.innerHeight / 2 - e.pageY) / 40;
            cyberFrame.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
        });
    }
    // 5. Mobile Menu Toggle (Basic)
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '5rem';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 12, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.borderBottom = '1px solid var(--glass-border)';
        });
    }
    // 6. Smooth Scrolling for Nav Links (Standard enhancement)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    // 9. LeetCode Stats Fetching
    async function fetchLeetCodeStats() {
        const username = 'Raghu249';
        try {
            const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
            const data = await response.json();
            if (data.status === 'success') {
                document.getElementById('lc-total').textContent = data.totalSolved;
                document.getElementById('lc-acceptance').textContent = `${data.acceptanceRate}%`;
                document.getElementById('lc-ranking').textContent = data.ranking.toLocaleString();
                // Easy
                document.getElementById('lc-easy-count').textContent = `${data.easySolved}/${data.totalEasy}`;
                document.getElementById('lc-easy-bar').style.width = `${(data.easySolved / data.totalEasy) * 100}%`;
                // Medium
                document.getElementById('lc-medium-count').textContent = `${data.mediumSolved}/${data.totalMedium}`;
                document.getElementById('lc-medium-bar').style.width = `${(data.mediumSolved / data.totalMedium) * 100}%`;           
                // Hard
                document.getElementById('lc-hard-count').textContent = `${data.hardSolved}/${data.totalHard}`;
                document.getElementById('lc-hard-bar').style.width = `${(data.hardSolved / data.totalHard) * 100}%`;
            }
        } catch (error) {
            console.error('Error fetching LeetCode stats:', error);
        }
    }
    fetchLeetCodeStats();
    // 7. Dynamic Project Interaction (Optional Hover Effects)
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-graphic').style.transform = 'scale(1.1) rotate(2deg)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-graphic').style.transform = 'scale(1) rotate(0)';
        });
    });
    // 8. Contact Form Integration (n8n Webhook)
    // 8. Contact Form Integration (Hidden Iframe to bypass CORS)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            // No preventDefault() here to allow browser form submission
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = "ENCRYPTING & SENDING...";
            btn.disabled = true;

            // Wait a moment for the form to POST to the hidden iframe
            setTimeout(() => {
                btn.textContent = "TRANSMISSION SUCCESSFUL";
                btn.style.background = "linear-gradient(90deg, #27c93f, #27c93f)";
                btn.style.color = "#fff";
                contactForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = "";
                    btn.style.color = "";
                    btn.disabled = false;
                }, 3000);
            }, 1500); 
        });
    }
});