(function() {
    'use strict';

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // STICKY NAVBAR
    function handleNavbarScroll() {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // HAMBURGER MENU
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
        });
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('open') &&
                !navLinks.contains(e.target) &&
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });
    }

    // CLOSE MENU ON LINK CLICK
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    if (hamburger) {
                        hamburger.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
    }

    // ACTIVE NAV LINK
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    setActiveNavLink();

    console.log('RAH Vehicle Exports - Navbar loaded.');
})();