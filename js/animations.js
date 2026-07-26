/**
 * RAH Vehicle Exports - Animations Module
 * Handles AOS initialization, scroll animations, and interactive effects
 */

(function() {
    'use strict';

    // ========================================
    // AOS (Animate On Scroll) INITIALIZATION
    // ========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            delay: 0,
            disable: window.innerWidth < 480 ? 'mobile' : false,
        });

        // Refresh AOS on window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                AOS.refresh();
            }, 250);
        });

        console.log('AOS initialized successfully.');
    } else {
        console.warn('AOS library not loaded.');
    }

    // ========================================
    // SCROLL-TRIGGERED ANIMATIONS
    // ========================================
    function isElementInViewport(el, offset) {
        offset = offset || 100;
        const rect = el.getBoundingClientRect();
        return (
            rect.top < (window.innerHeight - offset) &&
            rect.bottom > offset
        );
    }

    // Animate elements with .animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    function checkScrollAnimations() {
        animateElements.forEach(function(el) {
            if (isElementInViewport(el, 80) && !el.classList.contains('animated')) {
                el.classList.add('animated');
                const animationClass = el.dataset.animation || 'fade-up';
                el.classList.add('aos-animate');
                // Trigger any custom animation
                el.style.animation = animationClass + ' 0.8s ease forwards';
            }
        });
    }

    // Run on load and scroll
    if (animateElements.length) {
        window.addEventListener('load', function() {
            setTimeout(checkScrollAnimations, 300);
        });
        window.addEventListener('scroll', checkScrollAnimations, { passive: true });
    }

    // ========================================
    // FAQ ACCORDION ANIMATION
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(function(other) {
                    if (other !== item) {
                        other.classList.remove('active');
                    }
                });

                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }

                // Scroll to question if it's off screen
                setTimeout(function() {
                    const rect = item.getBoundingClientRect();
                    if (rect.top < 0 || rect.bottom > window.innerHeight) {
                        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 400);
            });
        }
    });

    // ========================================
    // STATS COUNTER ANIMATION (enhanced)
    // ========================================
    const statNumbers = document.querySelectorAll('.hero-stats h3, .stat-number');

    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        let anyVisible = false;
        statNumbers.forEach(function(stat) {
            if (isElementInViewport(stat, 100)) {
                anyVisible = true;
                const target = parseInt(stat.textContent);
                if (!isNaN(target) && target > 0) {
                    stat.textContent = '0';
                    animateNumber(stat, target);
                }
            }
        });

        if (anyVisible) {
            statsAnimated = true;
        }
    }

    function animateNumber(el, target) {
        let current = 0;
        const duration = 1500;
        const steps = 40;
        const increment = target / steps;
        const stepTime = duration / steps;

        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current) + (target > 10 ? '+' : '');
        }, stepTime);
    }

    // Initialize stats animation
    if (statNumbers.length) {
        window.addEventListener('load', function() {
            setTimeout(animateStats, 600);
        });
        window.addEventListener('scroll', animateStats, { passive: true });
    }

    // ========================================
    // HEADER COLOR CHANGE ON SCROLL (additional)
    // ========================================
    const heroSection = document.querySelector('.hero');
    const navbarElement = document.getElementById('navbar');

    if (heroSection && navbarElement) {
        window.addEventListener('scroll', function() {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const scrollY = window.scrollY;

            if (scrollY > heroBottom - 100) {
                navbarElement.style.background = 'var(--glass)';
                navbarElement.style.backdropFilter = 'blur(24px)';
            } else {
                navbarElement.style.background = 'transparent';
                navbarElement.style.backdropFilter = 'blur(0px)';
            }
        }, { passive: true });
    }

    // ========================================
    // PARALLAX EFFECT ON HERO
    // ========================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const heroContent = hero.querySelector('.hero-content');
            const heroImage = hero.querySelector('.hero-image');

            if (heroContent && scrolled < hero.offsetHeight) {
                const offset = scrolled * 0.15;
                heroContent.style.transform = 'translateY(' + offset + 'px)';
                heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.3;
            }

            if (heroImage && scrolled < hero.offsetHeight) {
                const offset = scrolled * 0.05;
                heroImage.style.transform = 'translateY(' + offset + 'px)';
            }
        }, { passive: true });
    }

    // ========================================
    // LAZY LOADING FOR IMAGES (native)
    // ========================================
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
            img.src = img.dataset.src || img.src;
        });
    }

    console.log('RAH Vehicle Exports - Animations module loaded.');
})();