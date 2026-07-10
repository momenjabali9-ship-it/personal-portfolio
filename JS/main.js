document.addEventListener('DOMContentLoaded', () => {

    /* ============ MOBILE MENU ============ */
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const body = document.body;

    function openMenu() {
        mobileMenu.classList.remove('translate-x-full');
        mobileOverlay.classList.remove('hidden');
        body.classList.add('overflow-hidden');
    }
    function closeMenu() {
        mobileMenu.classList.add('translate-x-full');
        mobileOverlay.classList.add('hidden');
        body.classList.remove('overflow-hidden');
    }
    menuBtn?.addEventListener('click', openMenu);
    closeMenuBtn?.addEventListener('click', closeMenu);
    mobileOverlay?.addEventListener('click', closeMenu);
    mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));


    /* ============ HEADER SCROLL STATE + PROGRESS BAR + BACK TO TOP ============ */
    const header = document.getElementById('siteHeader');
    const progressBar = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');

    function onScroll() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) progressBar.style.width = pct + '%';

        if (header) header.classList.toggle('scrolled', scrollTop > 20);

        if (backToTop) {
            if (scrollTop > 500) {
                backToTop.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                backToTop.classList.add('opacity-0', 'pointer-events-none');
            }
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


    /* ============ ACTIVE NAV LINK ON SCROLL ============ */
    const navLinks = document.querySelectorAll('[data-nav]');
    const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(sec => navObserver.observe(sec));


    /* ============ SCROLL REVEAL ============ */
    const revealEls = document.querySelectorAll('.reveal-up');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));


    /* ============ COUNTERS ============ */
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10) || 0;
            const duration = 1400;
            const start = performance.now();
            function tick(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target) + (progress >= 1 ? '+' : '');
                if (progress < 1) requestAnimationFrame(tick);
                else el.textContent = target + '+';
            }
            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));


    /* ============ SKILL BARS ============ */
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.dataset.width + '%';
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.4 });
    skillBars.forEach(b => skillObserver.observe(b));


    /* ============ PORTFOLIO FILTER ============ */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                card.style.display = match ? '' : 'none';
            });
        });
    });


    /* ============ PROJECT DETAILS MODAL ============ */
    const projectData = {
        taskflow: {
            title: 'TaskFlow — Task Manager',
            tags: ['HTML', 'CSS', 'JavaScript'],
            icon: 'fa-solid fa-list-check',
            gradient: 'from-cyan-500/20 to-blue-600/20',
            desc: 'A drag-and-drop kanban board for organizing daily tasks. Built with vanilla JavaScript, it covers DOM manipulation, event delegation and dynamic state rendering without any framework — a common project assigned near the end of the JavaScript course.',
            role: 'Design & Development',
            time: '2 weeks'
        },
        bakery: {
            title: 'Bakery Landing Page',
            tags: ['HTML', 'Tailwind'],
            icon: 'fa-solid fa-cookie-bite',
            gradient: 'from-orange-500/20 to-pink-500/20',
            desc: 'A warm, conversion-focused landing page for a local bakery, featuring a menu grid, photo gallery and an order call-to-action. Used in the Tailwind CSS course to teach spacing systems and responsive image grids.',
            role: 'Front-End Development',
            time: '1 week'
        },
        weather: {
            title: 'Weather Now',
            tags: ['JavaScript', 'API'],
            icon: 'fa-solid fa-cloud-sun',
            gradient: 'from-sky-500/20 to-cyan-400/20',
            desc: 'A weather lookup app that fetches live data from a public API and renders an animated forecast card. Covers fetch requests, async/await, error handling and loading states.',
            role: 'Development',
            time: '10 days'
        },
        educourse: {
            title: 'EduCourse Dashboard UI',
            tags: ['Tailwind', 'UI Kit'],
            icon: 'fa-solid fa-table-columns',
            gradient: 'from-violet-500/20 to-blue-500/20',
            desc: 'A reusable dashboard component kit for online course platforms, including progress cards, lesson modals and sidebar navigation — the same design language used to power this site\'s own Courses section.',
            role: 'UI Design & Build',
            time: '3 weeks'
        },
        templates: {
            title: 'Student Template Pack',
            tags: ['HTML', 'CSS', 'Tailwind'],
            icon: 'fa-solid fa-layer-group',
            gradient: 'from-emerald-500/20 to-cyan-500/20',
            desc: 'Three reusable portfolio templates handed to students as a starting point for building their own personal sites — each demonstrating a different layout approach and skill level.',
            role: 'Template Design',
            time: 'Ongoing',
        },
        shop: {
            title: 'Product Page & Cart UI',
            tags: ['JavaScript', 'Tailwind'],
            icon: 'fa-solid fa-bag-shopping',
            gradient: 'from-rose-500/20 to-orange-400/20',
            desc: 'A responsive e-commerce product page with an interactive cart drawer, quantity controls and animated totals — built to teach state handling without a framework.',
            role: 'Development',
            time: '2 weeks'
        }
    };

    const projectModal = document.getElementById('projectModal');
    const projectModalTitle = document.getElementById('projectModalTitle');
    const projectModalDesc = document.getElementById('projectModalDesc');
    const projectModalTags = document.getElementById('projectModalTags');
    const projectModalPreview = document.getElementById('projectModalPreview');
    const projectModalRole = document.getElementById('projectModalRole');
    const projectModalTime = document.getElementById('projectModalTime');
    const closeProjectModal = document.getElementById('closeProjectModal');

    document.querySelectorAll('.project-view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const data = projectData[btn.dataset.project];
            if (!data || !projectModal) return;

            projectModalTitle.textContent = data.title;
            projectModalDesc.textContent = data.desc;
            projectModalRole.textContent = data.role;
            projectModalTime.textContent = data.time;
            projectModalTags.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');
            projectModalPreview.innerHTML = `<i class="${data.icon}"></i>`;
            projectModalPreview.className = `project-preview !h-56 sm:!h-64 !rounded-none bg-gradient-to-br ${data.gradient}`;

            projectModal.classList.remove('hidden');
            projectModal.classList.add('flex');
            body.classList.add('overflow-hidden');
        });
    });

    function closeProjModal() {
        projectModal?.classList.add('hidden');
        projectModal?.classList.remove('flex');
        body.classList.remove('overflow-hidden');
    }
    closeProjectModal?.addEventListener('click', closeProjModal);
    projectModal?.addEventListener('click', (e) => { if (e.target === projectModal) closeProjModal(); });
    projectModal?.querySelector('.modal-close-link')?.addEventListener('click', closeProjModal);


    /* ============ COURSE MODAL + LESSON PROGRESS ============ */
    const courseModal = document.getElementById('courseModal');
    const closeCourseBtn = document.getElementById('closeCourse');
    const courseTitle = document.getElementById('courseTitle');
    const modalBar = document.getElementById('modalBar');
    const modalPercent = document.getElementById('modalPercent');
    const lessonContainer = document.getElementById('lessonContainer');

    const courseNames = { html: 'HTML Master Course', css: 'CSS Master Course', javascript: 'JavaScript Course', tailwind: 'Tailwind CSS' };
    const courseProgress = { html: 0, css: 0, javascript: 0, tailwind: 0 };
    const totalLessons = 5;

    function updateCardProgress(course) {
        const pct = Math.round((courseProgress[course] / totalLessons) * 100);
        const bar = document.getElementById(course + 'Progress');
        const text = document.getElementById(course + 'ProgressText');
        if (bar) bar.style.width = pct + '%';
        if (text) text.textContent = pct + '%';
    }

    function openCourseModal(course) {
        if (!courseModal) return;
        courseTitle.textContent = courseNames[course] || 'Course';

        document.querySelectorAll('.courseLessons').forEach(el => el.classList.add('hidden'));
        const activeCourseEl = document.querySelector(`.courseLessons[data-course="${course}"]`);
        activeCourseEl?.classList.remove('hidden');

        renderCourseState(course);

        courseModal.classList.remove('hidden');
        courseModal.classList.add('flex');
        body.classList.add('overflow-hidden');
        courseModal.dataset.activeCourse = course;
    }

    function renderCourseState(course) {
        const activeCourseEl = document.querySelector(`.courseLessons[data-course="${course}"]`);
        if (!activeCourseEl) return;
        const completed = courseProgress[course];
        const pct = Math.round((completed / totalLessons) * 100);
        modalBar.style.width = pct + '%';
        modalPercent.textContent = pct + '%';

        const lessons = activeCourseEl.querySelectorAll('.lesson');
        const finishedPanel = activeCourseEl.querySelector('.courseFinished');

        lessons.forEach(lesson => lesson.classList.add('hidden'));
        finishedPanel?.classList.add('hidden');

        if (completed >= totalLessons) {
            finishedPanel?.classList.remove('hidden');
        } else {
            const next = activeCourseEl.querySelector(`.lesson[data-lesson="${completed + 1}"]`);
            next?.classList.remove('hidden');
        }
    }

    document.querySelectorAll('.openCourse').forEach(btn => {
        btn.addEventListener('click', () => openCourseModal(btn.dataset.course));
    });

    document.querySelectorAll('.completeBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            const course = courseModal.dataset.activeCourse;
            if (!course) return;
            if (courseProgress[course] < totalLessons) courseProgress[course]++;
            updateCardProgress(course);
            renderCourseState(course);
        });
    });

    function closeCourseModal() {
        courseModal?.classList.add('hidden');
        courseModal?.classList.remove('flex');
        body.classList.remove('overflow-hidden');
    }
    closeCourseBtn?.addEventListener('click', closeCourseModal);
    courseModal?.addEventListener('click', (e) => { if (e.target === courseModal) closeCourseModal(); });


    /* ============ ESC KEY CLOSES ANY MODAL ============ */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjModal();
            closeCourseModal();
            closeMenu();
        }
    });


    /* ============ TESTIMONIAL CAROUSEL ============ */
    const track = document.getElementById('testimonialSlides');
    const slides = track ? Array.from(track.children) : [];
    const dotsWrap = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    let current = 0;
    let autoTimer;

    if (track && slides.length) {
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(dot);
        });

        function goTo(index) {
            current = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${current * 100}%)`;
            dotsWrap.querySelectorAll('button').forEach((d, i) => d.classList.toggle('active', i === current));
        }

        function startAuto() {
            clearInterval(autoTimer);
            autoTimer = setInterval(() => goTo(current + 1), 5500);
        }

        prevBtn?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
        nextBtn?.addEventListener('click', () => { goTo(current + 1); startAuto(); });

        goTo(0);
        startAuto();
    }


    /* ============ CONTACT FORM VALIDATION ============ */
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    function setError(input, message) {
        const errorEl = form.querySelector(`[data-error-for="${input.id}"]`);
        if (errorEl) errorEl.textContent = message || '';
        input.classList.toggle('invalid', !!message);
    }

    function validateField(input) {
        if (input.validity.valueMissing) {
            setError(input, 'This field is required.');
            return false;
        }
        if (input.type === 'email' && input.validity.typeMismatch) {
            setError(input, 'Please enter a valid email address.');
            return false;
        }
        setError(input, '');
        return true;
    }

    form?.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => { if (input.classList.contains('invalid')) validateField(input); });
    });

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = form.querySelectorAll('.form-input');
        let valid = true;
        inputs.forEach(input => { if (!validateField(input)) valid = false; });

        if (!valid) {
            formSuccess?.classList.add('hidden');
            return;
        }

        formSuccess?.classList.remove('hidden');
        form.reset();
        setTimeout(() => formSuccess?.classList.add('hidden'), 6000);
    });

});
