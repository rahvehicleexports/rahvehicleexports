/**
 * RAH Vehicle Exports - Main JavaScript
 * Handles core functionality: preloader, back to top, smooth scrolling, active nav
 */

(function() {
    'use strict';

    // ========================================
    // PRELOADER
    // ========================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('hide');
            }, 400);
        });

        // Fallback: hide preloader after 4 seconds
        setTimeout(function() {
            if (preloader && !preloader.classList.contains('hide')) {
                preloader.classList.add('hide');
            }
        }, 4000);
    }

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const backTopBtn = document.getElementById('back-top');
    if (backTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backTopBtn.classList.add('visible');
            } else {
                backTopBtn.classList.remove('visible');
            }
        });

        backTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                if (navLinks && navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                }
            }
        });
    });

    // ========================================
    // ACTIVE NAV LINK ON SCROLL
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPosition = window.scrollY + 120;

            sections.forEach(function(section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(function(link) {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href && href === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ========================================
    // COUNTER ANIMATION
    // ========================================
    function animateCounters() {
        const counters = document.querySelectorAll('.hero-stats h3');
        let animated = false;

        function isInViewport(el) {
            const rect = el.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
        }

        function startCounter(el) {
            const target = parseInt(el.textContent);
            if (isNaN(target)) return;

            let current = 0;
            const increment = Math.ceil(target / 40);
            const duration = 1500;
            const stepTime = Math.floor(duration / 40);

            const timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = current + (target > 10 ? '+' : '');
            }, stepTime);
        }

        function checkCounters() {
            if (animated) return;

            counters.forEach(function(counter) {
                if (isInViewport(counter)) {
                    animated = true;
                    const originalText = counter.textContent;
                    counter.textContent = '0';
                    startCounter(counter);
                }
            });
        }

        window.addEventListener('scroll', checkCounters);
        window.addEventListener('load', function() {
            setTimeout(checkCounters, 500);
        });
    }

    // Initialize counters after AOS is ready
    if (document.querySelector('.hero-stats')) {
        setTimeout(animateCounters, 1000);
    }

    console.log('RAH Vehicle Exports - Scripts loaded successfully.');
})();