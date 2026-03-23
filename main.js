/* ============================================
   NEFERUSEBASTIAN.COM — MAIN JS
   Sticky nav, scroll-spy, FAQ accordion,
   reveal on scroll, progress rail, mobile menu
   ============================================ */

(function () {
    'use strict';

    // --- DOM REFERENCES ---
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav__link');
    const progressDots = document.querySelectorAll('.progress-rail__dot');
    const faqItems = document.querySelectorAll('.faq__item');
    const reveals = document.querySelectorAll('.reveal');

    // Section IDs for scroll-spy (in scroll order)
    const sectionIds = [
        'hero', 'problem', 'method', 'services',
        'results', 'portfolio', 'process', 'about', 'faq', 'cta'
    ];


    // --- SCROLL: NAV STYLE + SCROLL-SPY + PROGRESS RAIL ---
    let ticking = false;

    function onScroll() {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(function () {
            const scrollY = window.scrollY;

            // Nav border on scroll
            if (scrollY > 40) {
                nav.classList.add('nav--scrolled');
            } else {
                nav.classList.remove('nav--scrolled');
            }

            // Scroll-spy: find current section
            let currentSection = sectionIds[0];
            const offset = window.innerHeight * 0.35;

            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const el = document.getElementById(sectionIds[i]);
                if (el && el.getBoundingClientRect().top <= offset) {
                    currentSection = sectionIds[i];
                    break;
                }
            }

            // Update nav links
            navLinks.forEach(function (link) {
                if (link.dataset.section === currentSection) {
                    link.classList.add('nav__link--active');
                } else {
                    link.classList.remove('nav__link--active');
                }
            });

            // Update progress rail dots
            const currentIndex = sectionIds.indexOf(currentSection);
            progressDots.forEach(function (dot, i) {
                if (i === currentIndex) {
                    dot.classList.add('progress-rail__dot--active');
                } else {
                    dot.classList.remove('progress-rail__dot--active');
                }
            });

            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Initial call


    // --- PROGRESS RAIL CLICK ---
    progressDots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            const target = dot.dataset.target;
            const el = document.getElementById(target);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // --- MOBILE MENU TOGGLE ---
    navToggle.addEventListener('click', function () {
        const isOpen = navMenu.classList.toggle('nav__menu--open');
        navToggle.classList.toggle('nav__hamburger--open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on link click
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navMenu.classList.remove('nav__menu--open');
            navToggle.classList.remove('nav__hamburger--open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });


    // --- FAQ ACCORDION ---
    faqItems.forEach(function (item) {
        var btn = item.querySelector('.faq__question');
        btn.addEventListener('click', function () {
            var isOpen = item.classList.contains('faq__item--open');

            // Close all
            faqItems.forEach(function (other) {
                other.classList.remove('faq__item--open');
                other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
            });

            // Toggle current
            if (!isOpen) {
                item.classList.add('faq__item--open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });


    // --- STACK ACCORDION (Services section) ---
    var stackItems = document.querySelectorAll('.stack__item');
    stackItems.forEach(function (item) {
        var trigger = item.querySelector('.stack__trigger');
        trigger.addEventListener('click', function () {
            var isOpen = item.classList.contains('stack__item--open');

            // Close all
            stackItems.forEach(function (other) {
                other.classList.remove('stack__item--open');
                other.querySelector('.stack__trigger').setAttribute('aria-expanded', 'false');
            });

            // Toggle current
            if (!isOpen) {
                item.classList.add('stack__item--open');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });


    // --- REVEAL ON SCROLL (Intersection Observer) ---
    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        reveals.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: show all immediately
        reveals.forEach(function (el) {
            el.classList.add('revealed');
        });
    }


    // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href').substring(1);
            var target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

})();
