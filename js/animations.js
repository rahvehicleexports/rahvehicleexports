(function() {
    'use strict';

    // AOS INITIALIZATION
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
            delay: 0,
            disable: window.innerWidth < 480 ? 'mobile' : false,
        });
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() { AOS.refresh(); }, 250);
        });
        console.log('AOS initialized.');
    }

    // FAQ ACCORDION
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                faqItems.forEach(function(other) {
                    if (other !== item) other.classList.remove('active');
                });
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
                setTimeout(function() {
                    const rect = item.getBoundingClientRect();
                    if (rect.top < 0 || rect.bottom > window.innerHeight) {
                        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 400);
            });
        }
    });

    // STATS COUNTER
    const statNumbers = document.querySelectorAll('.hero-stats h3');
    let statsAnimated = false;

    function isElementInViewport(el, offset) {
        offset = offset || 100;
        const rect = el.getBoundingClientRect();
        return rect.top < (window.innerHeight - offset) && rect.bottom > offset;
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
        if (anyVisible) statsAnimated = true;
    }

    if (statNumbers.length) {
        window.addEventListener('load', function() { setTimeout(animateStats, 600); });
        window.addEventListener('scroll', animateStats, { passive: true });
    }

    console.log('RAH Vehicle Exports - Animations loaded.');
})();