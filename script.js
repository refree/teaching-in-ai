// ========================================
// Teaching in AI - Terminal Style Scripts
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initScrollAnimations();
    initNavScroll();
    initMobileMenu();
    initCountUp();
    initDegreeBars();
});

// ========== Typing Effect ==========
function initTypingEffect() {
    const typedEl = document.getElementById('heroTyped');
    const cursorEl = document.getElementById('heroCursor');
    const outputEl = document.getElementById('heroOutput');
    const text = 'cat ./teaching_in_ai.info';
    let i = 0;

    function type() {
        if (i < text.length) {
            typedEl.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50 + Math.random() * 50);
        } else {
            setTimeout(() => {
                cursorEl.style.display = 'none';
                outputEl.classList.add('visible');
            }, 300);
        }
    }

    setTimeout(type, 800);
}

// ========== Scroll Animations ==========
function initScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation
                    const delay = index * 100;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ========== Nav Scroll Effect ==========
function initNavScroll() {
    const nav = document.getElementById('nav');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ========== Mobile Menu ==========
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');

    toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
        toggle.classList.toggle('active');
    });

    // Close menu on link click
    menu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            toggle.classList.remove('active');
        });
    });
}

// ========== Count Up Animation ==========
function initCountUp() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'));
                    if (isNaN(target)) return;

                    animateCount(el, 0, target, 1500);
                    observer.unobserve(el);
                }
            });
        },
        { threshold: 0.5 }
    );

    document.querySelectorAll('[data-count]').forEach(el => {
        observer.observe(el);
    });
}

function animateCount(el, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * eased);

        el.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ========== Degree Bars Animation ==========
function initDegreeBars() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.degree-bar');
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.width = bar.getAttribute('data-width');
                            bar.classList.add('animated');
                        }, index * 200);
                    });
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    const degreeGrid = document.querySelector('.degree-grid');
    if (degreeGrid) {
        observer.observe(degreeGrid);
    }
}

// ========== Smooth scroll for nav links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
