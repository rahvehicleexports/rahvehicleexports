(function() {
    'use strict';

    // PRELOADER
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() { preloader.classList.add('hide'); }, 800);
        });
        setTimeout(function() {
            if (preloader && !preloader.classList.contains('hide')) {
                preloader.classList.add('hide');
            }
        }, 4000);
    }

    // BACK TO TOP
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                const navLinks = document.getElementById('navLinks');
                if (navLinks && navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                }
            }
        });
    });

    // ACTIVE NAV LINK
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

    console.log('RAH Vehicle Exports - Scripts loaded.');
})();