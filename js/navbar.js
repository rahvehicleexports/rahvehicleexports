/**
 * RAH Vehicle Exports - Navbar Module
 * Handles sticky navbar, hamburger menu, and scroll effects
 */

(function() {
    'use strict';

    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // ========================================
    // STICKY NAVBAR WITH GLASSMORPHISM
    // ========================================
    let lastScrollY = 0;

    function handleNavbarScroll() {
        if (!navbar) return;

        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = scrollY;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // Initial check
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // ========================================
    // HAMBURGER MENU TOGGLE
    // ========================================
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('open') &&
                !navLinks.contains(e.target) &&
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });
    }

    // ========================================
    // CLOSE MOBILE MENU ON LINK CLICK
    // ========================================
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

    // ========================================
    // ACTIVE NAV LINK BASED ON CURRENT PAGE
    // ========================================
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

    console.log('RAH Vehicle Exports - Navbar module loaded.');
})();