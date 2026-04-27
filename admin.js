/* ============================================
   ADMIN PANEL - JavaScript
   Portfolio Management System
   ============================================ */

(function () {
    'use strict';

    const ADMIN_PASSWORD = 'Raghu@852005';
    const STORAGE_KEY = 'portfolio_admin_data';

    // ==================== DEFAULT DATA ====================
    const DEFAULT_DATA = {
        hero: {
            tag: 'STATUS: CORE_SYSTEM_ACTIVE',
            titleLine1: 'Building',
            titleLine2: 'Resilient',
            titleLine3: 'Architectures.',
            description: '3rd-year B.Tech CSBS student at <strong>Panimalar Engineering College</strong>. Architecting secure software ecosystems and bridging complex backend logic with seamless user experiences.',
            btn1Text: 'Decrypt Works',
            btn1Link: '#projects',
            btn2Text: 'Fetch Resume',
            btn2Link: '249_Raghu_R_Resume_ATS.docx',
            photoTag1: 'MERN DEVELOPER',
            photoTag2: 'ADMIN_RAGHU_0805'
        },
        about: {
            name: 'Raghu R',
            title: 'System Architect & Full Stack Developer',
            college: 'Panimalar Engineering College',
            year: '3rd-year B.Tech CSBS student',
            email: 'sde.raghu.r@gmail.com'
        },
        skills: [
            { id: '01_CORE', name: 'PROGRAMMING_LANG', tags: ['Python', 'JavaScript (JS)', 'Java'] },
            { id: '02_FRONT', name: 'FRONTEND_ENGINE', tags: ['HTML5', 'CSS3', 'Tailwind CSS', 'React.js'] },
            { id: '03_BACK', name: 'BACKEND_LOGIC', tags: ['Node.js', 'Express.js', 'FastAPI'] },
            { id: '04_DATA', name: 'DATABASE_SYSTEMS', tags: ['MongoDB', 'PostgreSQL', 'Firebase Firestore'] },
            { id: '05_OPS', name: 'DEVOPS_VCS', tags: ['Git', 'GitHub', 'Docker', 'n8n'] },
            { id: '06_SUBJ', name: 'CORE_THEORY', tags: ['DSA', 'OOP', 'Networks', 'DBMS'] }
        ],
        projects: [
            {
                code: '/M01_SECURITY',
                title: 'Supply Chain Trust Analyzer',
                description: 'Security suite for detecting typosquatting & vulnerabilities in deep dependency trees.',
                link: 'https://github.com/sailesh-konimetee/dependence_checker',
                linkText: 'Initialize Debug →'
            },
            {
                code: '/M02_AI_ENGINE',
                title: 'Investor Match App',
                description: 'Full-stack semantic search platform connecting startups with strategic investor networks.',
                link: 'https://github.com/raghu0805/investormatch',
                linkText: 'Initialize Engine →'
            }
        ],
        achievements: [
            {
                rank: 'IST PLACE_WINNER',
                description: 'Secured first place at <strong>SA Engineering College, Chennai Hackathon</strong> (36 Hours). Specialized in the Cybersecurity & Digital Trust domain with a focus on threat analysis and resilient security architecture.',
                domain: 'CYBER_SECURITY',
                duration: '36:00_HRS',
                venue: 'CHENNAI_IND'
            }
        ],
        experience: [
            {
                period: '2022 - PRESENT',
                title: 'B.Tech in CSBS',
                description: 'Pursuing undergraduate degree at <strong>Panimalar Engineering College</strong>. Focusing on the intersection of deep technical architecture and business optimization.'
            }
        ],
        contact: {
            email: 'sde.raghu.r@gmail.com',
            heading: 'Start Connection_',
            description: 'Establishing a high-bandwidth connection for impactful engineering and innovative systems.',
            linkedin: 'https://www.linkedin.com/in/raghu0805',
            leetcode: 'https://leetcode.com/u/Raghu249/',
            hackerrank: 'https://www.hackerrank.com/profile/imraghu0805',
            gfg: 'https://www.geeksforgeeks.org/profile/imraghhnwv',
            github: '',
            twitter: ''
        }
    };

    // ==================== DATA LAYER ====================
    function loadData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                return { ...DEFAULT_DATA, ...parsed };
            }
        } catch (e) {
            console.error('Error loading data:', e);
        }
        return { ...DEFAULT_DATA };
    }

    function saveData(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    // ==================== AUTH ====================
    const loginScreen = document.getElementById('login-screen');
    const dashboard = document.getElementById('admin-dashboard');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const passwordInput = document.getElementById('admin-password');

    // Check if already authenticated this session
    if (sessionStorage.getItem('admin_authenticated') === 'true') {
        loginScreen.style.display = 'none';
        dashboard.style.display = 'block';
        initDashboard();
    }

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const pwd = passwordInput.value;
        if (pwd === ADMIN_PASSWORD) {
            sessionStorage.setItem('admin_authenticated', 'true');
            loginScreen.style.opacity = '0';
            loginScreen.style.transition = 'opacity 0.4s ease';
            setTimeout(() => {
                loginScreen.style.display = 'none';
                dashboard.style.display = 'block';
                dashboard.style.opacity = '0';
                dashboard.style.transition = 'opacity 0.4s ease';
                setTimeout(() => { dashboard.style.opacity = '1'; }, 50);
                initDashboard();
            }, 400);
        } else {
            loginError.style.display = 'flex';
            loginError.style.alignItems = 'center';
            loginError.style.gap = '0.5rem';
            passwordInput.value = '';
            passwordInput.focus();
            // Re-trigger shake animation
            loginError.style.animation = 'none';
            loginError.offsetHeight; // trigger reflow
            loginError.style.animation = 'shake 0.5s ease';
        }
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', function () {
        sessionStorage.removeItem('admin_authenticated');
        location.reload();
    });

    // ==================== DASHBOARD INIT ====================
    function initDashboard() {
        const data = loadData();
        setupSidebar();
        populateHero(data);
        populateAbout(data);
        populateSkills(data);
        populateProjects(data);
        populateAchievements(data);
        populateExperience(data);
        populateContact(data);
        setupFormHandlers();
        setupResetButton();
    }

    // ==================== SIDEBAR NAV ====================
    function setupSidebar() {
        const links = document.querySelectorAll('.sidebar-link');
        links.forEach(link => {
            link.addEventListener('click', function () {
                links.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
                const targetId = this.getAttribute('data-section');
                const target = document.getElementById(targetId);
                if (target) {
                    target.classList.add('active');
                }
            });
        });
    }

    // ==================== TOAST ====================
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toast-message');
        toastMsg.textContent = message || 'Saved successfully!';
        toast.style.display = 'flex';
        toast.style.animation = 'none';
        toast.offsetHeight;
        toast.style.animation = 'slideInRight 0.4s ease';
        setTimeout(() => { toast.style.display = 'none'; }, 2500);
    }

    // ==================== POPULATE FORMS ====================
    function populateHero(data) {
        if (!data.hero) return;
        setValue('hero-tag', data.hero.tag);
        setValue('hero-title-1', data.hero.titleLine1);
        setValue('hero-title-2', data.hero.titleLine2);
        setValue('hero-title-3', data.hero.titleLine3);
        setValue('hero-desc', data.hero.description);
        setValue('hero-btn1-text', data.hero.btn1Text);
        setValue('hero-btn1-link', data.hero.btn1Link);
        setValue('hero-btn2-text', data.hero.btn2Text);
        setValue('hero-btn2-link', data.hero.btn2Link);
        setValue('hero-photo-tag1', data.hero.photoTag1);
        setValue('hero-photo-tag2', data.hero.photoTag2);
    }

    function populateAbout(data) {
        if (!data.about) return;
        setValue('about-name', data.about.name);
        setValue('about-title', data.about.title);
        setValue('about-college', data.about.college);
        setValue('about-year', data.about.year);
        setValue('about-email', data.about.email);
    }

    function populateContact(data) {
        if (!data.contact) return;
        setValue('contact-email', data.contact.email);
        setValue('contact-heading', data.contact.heading);
        setValue('contact-desc', data.contact.description);
        setValue('social-linkedin', data.contact.linkedin);
        setValue('social-leetcode', data.contact.leetcode);
        setValue('social-hackerrank', data.contact.hackerrank);
        setValue('social-gfg', data.contact.gfg);
        setValue('social-github', data.contact.github);
        setValue('social-twitter', data.contact.twitter);
    }

    // ==================== DYNAMIC LISTS ====================

    // --- Skills ---
    function populateSkills(data) {
        const container = document.getElementById('skills-list');
        container.innerHTML = '';
        (data.skills || []).forEach((skill, i) => {
            container.appendChild(createSkillItem(skill, i));
        });
    }

    function createSkillItem(skill, index) {
        const item = document.createElement('div');
        item.className = 'dynamic-item';
        item.innerHTML = `
            <div class="dynamic-item-header">
                <h4>SKILL_CATEGORY_${String(index + 1).padStart(2, '0')}</h4>
                <button type="button" class="remove-item-btn" data-index="${index}"><i class="fas fa-times"></i> REMOVE</button>
            </div>
            <div class="form-row two-col">
                <div class="input-group">
                    <label>Category ID</label>
                    <input type="text" class="skill-id" value="${escapeHtml(skill.id || '')}" placeholder="e.g. 01_CORE">
                </div>
                <div class="input-group">
                    <label>Category Name</label>
                    <input type="text" class="skill-name" value="${escapeHtml(skill.name || '')}" placeholder="e.g. PROGRAMMING_LANG">
                </div>
            </div>
            <div class="input-group">
                <label>Tags (comma separated)</label>
                <input type="text" class="skill-tags" value="${escapeHtml((skill.tags || []).join(', '))}" placeholder="e.g. Python, JavaScript, Java">
            </div>
        `;
        item.querySelector('.remove-item-btn').addEventListener('click', function () {
            item.remove();
        });
        return item;
    }

    // --- Projects ---
    function populateProjects(data) {
        const container = document.getElementById('projects-list');
        container.innerHTML = '';
        (data.projects || []).forEach((proj, i) => {
            container.appendChild(createProjectItem(proj, i));
        });
    }

    function createProjectItem(proj, index) {
        const item = document.createElement('div');
        item.className = 'dynamic-item';
        item.innerHTML = `
            <div class="dynamic-item-header">
                <h4>PROJECT_${String(index + 1).padStart(2, '0')}</h4>
                <button type="button" class="remove-item-btn"><i class="fas fa-times"></i> REMOVE</button>
            </div>
            <div class="form-row two-col">
                <div class="input-group">
                    <label>Module Code</label>
                    <input type="text" class="proj-code" value="${escapeHtml(proj.code || '')}" placeholder="e.g. /M01_SECURITY">
                </div>
                <div class="input-group">
                    <label>Project Title</label>
                    <input type="text" class="proj-title" value="${escapeHtml(proj.title || '')}" placeholder="e.g. My Project">
                </div>
            </div>
            <div class="input-group">
                <label>Description</label>
                <textarea class="proj-desc" rows="2" placeholder="Short project description...">${escapeHtml(proj.description || '')}</textarea>
            </div>
            <div class="form-row two-col">
                <div class="input-group">
                    <label>Link URL</label>
                    <input type="url" class="proj-link" value="${escapeHtml(proj.link || '')}" placeholder="https://github.com/...">
                </div>
                <div class="input-group">
                    <label>Link Text</label>
                    <input type="text" class="proj-link-text" value="${escapeHtml(proj.linkText || '')}" placeholder="e.g. View Project →">
                </div>
            </div>
        `;
        item.querySelector('.remove-item-btn').addEventListener('click', function () {
            item.remove();
        });
        return item;
    }

    // --- Achievements ---
    function populateAchievements(data) {
        const container = document.getElementById('achievements-list');
        container.innerHTML = '';
        (data.achievements || []).forEach((ach, i) => {
            container.appendChild(createAchievementItem(ach, i));
        });
    }

    function createAchievementItem(ach, index) {
        const item = document.createElement('div');
        item.className = 'dynamic-item';
        item.innerHTML = `
            <div class="dynamic-item-header">
                <h4>ACHIEVEMENT_${String(index + 1).padStart(2, '0')}</h4>
                <button type="button" class="remove-item-btn"><i class="fas fa-times"></i> REMOVE</button>
            </div>
            <div class="input-group">
                <label>Rank / Title</label>
                <input type="text" class="ach-rank" value="${escapeHtml(ach.rank || '')}" placeholder="e.g. 1ST PLACE_WINNER">
            </div>
            <div class="input-group">
                <label>Description (HTML allowed)</label>
                <textarea class="ach-desc" rows="3" placeholder="Achievement description...">${escapeHtml(ach.description || '')}</textarea>
            </div>
            <div class="form-row two-col">
                <div class="input-group">
                    <label>Domain</label>
                    <input type="text" class="ach-domain" value="${escapeHtml(ach.domain || '')}" placeholder="e.g. CYBER_SECURITY">
                </div>
                <div class="input-group">
                    <label>Duration</label>
                    <input type="text" class="ach-duration" value="${escapeHtml(ach.duration || '')}" placeholder="e.g. 36:00_HRS">
                </div>
            </div>
            <div class="input-group">
                <label>Venue</label>
                <input type="text" class="ach-venue" value="${escapeHtml(ach.venue || '')}" placeholder="e.g. CHENNAI_IND">
            </div>
        `;
        item.querySelector('.remove-item-btn').addEventListener('click', function () {
            item.remove();
        });
        return item;
    }

    // --- Experience ---
    function populateExperience(data) {
        const container = document.getElementById('experience-list');
        container.innerHTML = '';
        (data.experience || []).forEach((exp, i) => {
            container.appendChild(createExperienceItem(exp, i));
        });
    }

    function createExperienceItem(exp, index) {
        const item = document.createElement('div');
        item.className = 'dynamic-item';
        item.innerHTML = `
            <div class="dynamic-item-header">
                <h4>TIMELINE_${String(index + 1).padStart(2, '0')}</h4>
                <button type="button" class="remove-item-btn"><i class="fas fa-times"></i> REMOVE</button>
            </div>
            <div class="form-row two-col">
                <div class="input-group">
                    <label>Time Period</label>
                    <input type="text" class="exp-period" value="${escapeHtml(exp.period || '')}" placeholder="e.g. 2022 - PRESENT">
                </div>
                <div class="input-group">
                    <label>Title</label>
                    <input type="text" class="exp-title" value="${escapeHtml(exp.title || '')}" placeholder="e.g. B.Tech in CSBS">
                </div>
            </div>
            <div class="input-group">
                <label>Description (HTML allowed)</label>
                <textarea class="exp-desc" rows="3" placeholder="Experience description...">${escapeHtml(exp.description || '')}</textarea>
            </div>
        `;
        item.querySelector('.remove-item-btn').addEventListener('click', function () {
            item.remove();
        });
        return item;
    }

    // ==================== ADD BUTTONS ====================
    document.getElementById('add-skill-btn').addEventListener('click', function () {
        const container = document.getElementById('skills-list');
        const idx = container.children.length;
        container.appendChild(createSkillItem({ id: '', name: '', tags: [] }, idx));
    });

    document.getElementById('add-project-btn').addEventListener('click', function () {
        const container = document.getElementById('projects-list');
        const idx = container.children.length;
        container.appendChild(createProjectItem({ code: '', title: '', description: '', link: '', linkText: '' }, idx));
    });

    document.getElementById('add-achievement-btn').addEventListener('click', function () {
        const container = document.getElementById('achievements-list');
        const idx = container.children.length;
        container.appendChild(createAchievementItem({ rank: '', description: '', domain: '', duration: '', venue: '' }, idx));
    });

    document.getElementById('add-experience-btn').addEventListener('click', function () {
        const container = document.getElementById('experience-list');
        const idx = container.children.length;
        container.appendChild(createExperienceItem({ period: '', title: '', description: '' }, idx));
    });

    // ==================== FORM HANDLERS ====================
    function setupFormHandlers() {
        // Hero
        document.getElementById('hero-form').addEventListener('submit', function (e) {
            e.preventDefault();
            const data = loadData();
            data.hero = {
                tag: getValue('hero-tag'),
                titleLine1: getValue('hero-title-1'),
                titleLine2: getValue('hero-title-2'),
                titleLine3: getValue('hero-title-3'),
                description: getValue('hero-desc'),
                btn1Text: getValue('hero-btn1-text'),
                btn1Link: getValue('hero-btn1-link'),
                btn2Text: getValue('hero-btn2-text'),
                btn2Link: getValue('hero-btn2-link'),
                photoTag1: getValue('hero-photo-tag1'),
                photoTag2: getValue('hero-photo-tag2')
            };
            saveData(data);
            showToast('Hero section saved!');
        });

        // About
        document.getElementById('about-form').addEventListener('submit', function (e) {
            e.preventDefault();
            const data = loadData();
            data.about = {
                name: getValue('about-name'),
                title: getValue('about-title'),
                college: getValue('about-college'),
                year: getValue('about-year'),
                email: getValue('about-email')
            };
            saveData(data);
            showToast('About section saved!');
        });

        // Contact
        document.getElementById('contact-form-admin').addEventListener('submit', function (e) {
            e.preventDefault();
            const data = loadData();
            data.contact = {
                email: getValue('contact-email'),
                heading: getValue('contact-heading'),
                description: getValue('contact-desc'),
                linkedin: getValue('social-linkedin'),
                leetcode: getValue('social-leetcode'),
                hackerrank: getValue('social-hackerrank'),
                gfg: getValue('social-gfg'),
                github: getValue('social-github'),
                twitter: getValue('social-twitter')
            };
            saveData(data);
            showToast('Contact section saved!');
        });

        // Skills
        document.getElementById('save-skills-btn').addEventListener('click', function () {
            const data = loadData();
            data.skills = collectSkills();
            saveData(data);
            showToast('Skills matrix saved!');
        });

        // Projects
        document.getElementById('save-projects-btn').addEventListener('click', function () {
            const data = loadData();
            data.projects = collectProjects();
            saveData(data);
            showToast('Projects saved!');
        });

        // Achievements
        document.getElementById('save-achievements-btn').addEventListener('click', function () {
            const data = loadData();
            data.achievements = collectAchievements();
            saveData(data);
            showToast('Achievements saved!');
        });

        // Experience
        document.getElementById('save-experience-btn').addEventListener('click', function () {
            const data = loadData();
            data.experience = collectExperience();
            saveData(data);
            showToast('Experience saved!');
        });
    }

    // ==================== COLLECT DATA FROM DYNAMIC LISTS ====================
    function collectSkills() {
        const items = document.querySelectorAll('#skills-list .dynamic-item');
        return Array.from(items).map(item => ({
            id: item.querySelector('.skill-id').value.trim(),
            name: item.querySelector('.skill-name').value.trim(),
            tags: item.querySelector('.skill-tags').value.split(',').map(t => t.trim()).filter(t => t)
        }));
    }

    function collectProjects() {
        const items = document.querySelectorAll('#projects-list .dynamic-item');
        return Array.from(items).map(item => ({
            code: item.querySelector('.proj-code').value.trim(),
            title: item.querySelector('.proj-title').value.trim(),
            description: item.querySelector('.proj-desc').value.trim(),
            link: item.querySelector('.proj-link').value.trim(),
            linkText: item.querySelector('.proj-link-text').value.trim()
        }));
    }

    function collectAchievements() {
        const items = document.querySelectorAll('#achievements-list .dynamic-item');
        return Array.from(items).map(item => ({
            rank: item.querySelector('.ach-rank').value.trim(),
            description: item.querySelector('.ach-desc').value.trim(),
            domain: item.querySelector('.ach-domain').value.trim(),
            duration: item.querySelector('.ach-duration').value.trim(),
            venue: item.querySelector('.ach-venue').value.trim()
        }));
    }

    function collectExperience() {
        const items = document.querySelectorAll('#experience-list .dynamic-item');
        return Array.from(items).map(item => ({
            period: item.querySelector('.exp-period').value.trim(),
            title: item.querySelector('.exp-title').value.trim(),
            description: item.querySelector('.exp-desc').value.trim()
        }));
    }

    // ==================== RESET ALL ====================
    function setupResetButton() {
        document.getElementById('reset-all-btn').addEventListener('click', function () {
            showConfirmModal(
                'Reset All Data?',
                'This will erase all custom data and restore factory defaults. This action cannot be undone.',
                function () {
                    localStorage.removeItem(STORAGE_KEY);
                    showToast('All data reset to defaults!');
                    setTimeout(() => location.reload(), 800);
                }
            );
        });
    }

    // ==================== CONFIRM MODAL ====================
    function showConfirmModal(title, message, onConfirm) {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal-box">
                <h3><i class="fas fa-exclamation-triangle"></i> ${title}</h3>
                <p>${message}</p>
                <div class="modal-actions">
                    <button class="btn btn-outline btn-sm modal-cancel">CANCEL</button>
                    <button class="btn btn-danger btn-sm modal-confirm"><i class="fas fa-trash-alt"></i> CONFIRM RESET</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        overlay.querySelector('.modal-cancel').addEventListener('click', () => overlay.remove());
        overlay.querySelector('.modal-confirm').addEventListener('click', () => {
            overlay.remove();
            onConfirm();
        });
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) overlay.remove();
        });
    }

    // ==================== HELPERS ====================
    function getValue(id) {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
    }

    function setValue(id, value) {
        const el = document.getElementById(id);
        if (el) el.value = value || '';
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

})();
