document.addEventListener('DOMContentLoaded', () => {

    // ==================== LOAD ADMIN DATA ====================
    function loadPortfolioData() {
        try {
            const raw = localStorage.getItem('portfolio_admin_data');
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }

    function applyAdminData() {
        const data = loadPortfolioData();
        if (!data) return;

        // --- Hero Section ---
        if (data.hero) {
            const heroTag = document.querySelector('.hero-tag');
            if (heroTag && data.hero.tag) heroTag.textContent = data.hero.tag;

            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                const line2 = data.hero.titleLine2 || 'Resilient';
                const line1 = data.hero.titleLine1 || 'Building';
                const line3 = data.hero.titleLine3 || 'Architectures.';
                heroTitle.innerHTML = `${line1} <span>${line2}</span> ${line3}`;
            }

            const heroDesc = document.querySelector('.hero-desc');
            if (heroDesc && data.hero.description) heroDesc.innerHTML = data.hero.description;

            const btns = document.querySelectorAll('.hero-actions .btn');
            if (btns[0] && data.hero.btn1Text) {
                btns[0].textContent = data.hero.btn1Text;
                if (data.hero.btn1Link) btns[0].setAttribute('href', data.hero.btn1Link);
            }
            if (btns[1] && data.hero.btn2Text) {
                btns[1].textContent = data.hero.btn2Text;
                if (data.hero.btn2Link) btns[1].setAttribute('href', data.hero.btn2Link);
            }

            const tag1 = document.querySelector('.tech-tag.tag-1 span:last-child');
            const tag2 = document.querySelector('.tech-tag.tag-2 span:last-child');
            if (tag1 && data.hero.photoTag1) tag1.textContent = data.hero.photoTag1;
            if (tag2 && data.hero.photoTag2) tag2.textContent = data.hero.photoTag2;
        }

        // --- About (page title & meta) ---
        if (data.about) {
            if (data.about.name && data.about.title) {
                document.title = `${data.about.name} | ${data.about.title}`;
            }
        }

        // --- Skills Matrix ---
        if (data.skills && data.skills.length > 0) {
            const skillsGrid = document.querySelector('.skills-grid-main');
            if (skillsGrid) {
                skillsGrid.innerHTML = '';
                data.skills.forEach(skill => {
                    const module = document.createElement('div');
                    module.className = 'skill-module';
                    module.innerHTML = `
                        <div class="module-header">
                            <span class="module-id">ID: ${skill.id}</span>
                            <h4>${skill.name}</h4>
                        </div>
                        <div class="skill-tags">
                            ${(skill.tags || []).map(t => `<span class="tag-tech">${t}</span>`).join('')}
                        </div>
                    `;
                    skillsGrid.appendChild(module);
                });
            }
        }

        // --- Projects ---
        if (data.projects && data.projects.length > 0) {
            const projectsGrid = document.querySelector('.projects-grid');
            if (projectsGrid) {
                projectsGrid.innerHTML = '';
                data.projects.forEach(proj => {
                    const card = document.createElement('div');
                    card.className = 'project-glass';
                    card.setAttribute('style', 'background: var(--bg-card); border: 1px solid var(--glass-border); padding: 3rem; position: relative;');
                    card.innerHTML = `
                        <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-pink); margin-bottom: 1rem; display: block;">${proj.code}</span>
                        <h3 style="font-size: 1.8rem; margin-bottom: 1.5rem; letter-spacing: -1px;">${proj.title}</h3>
                        <p style="color: var(--text-muted); margin-bottom: 2rem; line-height: 1.8;">${proj.description}</p>
                        <a href="${proj.link}" target="_blank" style="color: #fff; text-decoration: none; font-weight: 700; border-bottom: 1px solid var(--accent-pink); padding-bottom: 4px;">${proj.linkText}</a>
                    `;
                    projectsGrid.appendChild(card);
                });
            }
        }

        // --- Achievements ---
        if (data.achievements && data.achievements.length > 0) {
            const achContainer = document.querySelector('.achievement-system-log');
            if (achContainer) {
                const ach = data.achievements[0];
                const logValue = achContainer.querySelector('.log-value');
                const logDesc = achContainer.querySelector('.log-desc');
                if (logValue && ach.rank) logValue.textContent = ach.rank;
                if (logDesc && ach.description) logDesc.innerHTML = ach.description;

                const metaVals = achContainer.querySelectorAll('.meta-val');
                if (metaVals[0] && ach.domain) metaVals[0].textContent = ach.domain;
                if (metaVals[1] && ach.duration) metaVals[1].textContent = ach.duration;
                if (metaVals[2] && ach.venue) metaVals[2].textContent = ach.venue;
            }
        }

        // --- Experience / Timeline ---
        if (data.experience && data.experience.length > 0) {
            const timelineContainer = document.querySelector('#experience .main-container > div');
            if (timelineContainer) {
                timelineContainer.innerHTML = '';
                data.experience.forEach(exp => {
                    const entry = document.createElement('div');
                    entry.className = 'timeline-log';
                    entry.setAttribute('style', 'position: relative; margin-bottom: 4rem;');
                    entry.innerHTML = `
                        <div style="position: absolute; left: -3.4rem; top: 0rem; width: 12px; height: 12px; background: var(--accent-pink); box-shadow: 0 0 10px var(--accent-glow);"></div>
                        <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-pink);">${exp.period}</span>
                        <h3 style="font-size: 2rem; margin: 0.5rem 0;">${exp.title}</h3>
                        <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 700px;">${exp.description}</p>
                    `;
                    timelineContainer.appendChild(entry);
                });
            }
        }

        // --- Contact & Socials ---
        if (data.contact) {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const contactTitle = contactSection.querySelector('.section-title');
                if (contactTitle && data.contact.heading) {
                    const parts = data.contact.heading.split(' ');
                    if (parts.length >= 2) {
                        contactTitle.innerHTML = `${parts[0]} <span>${parts.slice(1).join(' ')}</span>`;
                    }
                }

                const contactDesc = contactSection.querySelector('p');
                if (contactDesc && data.contact.description) contactDesc.textContent = data.contact.description;

                const emailBtn = contactSection.querySelector('.btn-primary');
                if (emailBtn && data.contact.email) {
                    emailBtn.setAttribute('href', `mailto:${data.contact.email}`);
                    emailBtn.textContent = `Transmit: ${data.contact.email}`;
                }
            }

            // All possible socials with their display config
            const allSocials = [
                { key: 'linkedin', label: 'LINKEDIN_', icon: 'fab fa-linkedin', footerLabel: 'LINKEDIN_' },
                { key: 'github', label: 'GITHUB_', icon: 'fab fa-github', footerLabel: 'GITHUB_' },
                { key: 'leetcode', label: 'LEETCODE_', icon: 'fas fa-terminal', footerLabel: 'LEETCODE_' },
                { key: 'hackerrank', label: 'HACKERRANK_', icon: 'fab fa-hackerrank', footerLabel: 'HACKERRANK_' },
                { key: 'gfg', label: 'GFG_', icon: 'fas fa-code', footerLabel: 'GFG_' },
                { key: 'twitter', label: 'TWITTER_', icon: 'fab fa-x-twitter', footerLabel: 'TWITTER_' }
            ];

            // --- Update HERO social links ---
            const heroSocialsContainer = document.querySelector('.social-links-hero');
            if (heroSocialsContainer) {
                // Update existing links
                const heroLinks = heroSocialsContainer.querySelectorAll('.social-item');
                const existingHeroKeys = new Set();

                heroLinks.forEach(link => {
                    const text = link.textContent.trim().toLowerCase();
                    allSocials.forEach(s => {
                        if (text.includes(s.key) || text.includes(s.label.toLowerCase().replace('_', ''))) {
                            existingHeroKeys.add(s.key);
                            if (data.contact[s.key]) {
                                link.href = data.contact[s.key];
                            } else {
                                link.remove();
                            }
                        }
                    });
                });

                // Add new links that don't exist yet
                allSocials.forEach(s => {
                    if (!existingHeroKeys.has(s.key) && data.contact[s.key]) {
                        const newLink = document.createElement('a');
                        newLink.href = data.contact[s.key];
                        newLink.target = '_blank';
                        newLink.className = 'social-item';
                        newLink.innerHTML = `<i class="${s.icon}"></i> ${s.label}`;
                        heroSocialsContainer.appendChild(newLink);
                    }
                });
            }

            // --- Update FOOTER social links ---
            const footerSocialsContainer = document.querySelector('.social-footer');
            if (footerSocialsContainer) {
                const footerLinks = footerSocialsContainer.querySelectorAll('a');
                const existingFooterKeys = new Set();

                footerLinks.forEach(link => {
                    const text = link.textContent.trim().toLowerCase();
                    allSocials.forEach(s => {
                        if (text.includes(s.key) || text.includes(s.footerLabel.toLowerCase().replace('_', ''))) {
                            existingFooterKeys.add(s.key);
                            if (data.contact[s.key]) {
                                link.href = data.contact[s.key];
                            } else {
                                link.remove();
                            }
                        }
                    });
                });

                // Add new footer links
                allSocials.forEach(s => {
                    if (!existingFooterKeys.has(s.key) && data.contact[s.key]) {
                        const newLink = document.createElement('a');
                        newLink.href = data.contact[s.key];
                        newLink.target = '_blank';
                        newLink.setAttribute('style', 'color: var(--text-muted); text-decoration: none; font-family: var(--font-mono); font-size: 0.8rem;');
                        newLink.textContent = s.footerLabel;
                        footerSocialsContainer.appendChild(newLink);
                    }
                });
            }
        }
    }

    // Apply admin data immediately
    applyAdminData();

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