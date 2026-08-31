document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. Navbar Scroll Effect is now handled by unified scroll listener

    // 3. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        let delay = 0;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                delay += 150;
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
    
    // 4. Form Submission Handling (WebMCP Simulation)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            
            // Simulate network request
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent';
                btn.classList.replace('btn-primary', 'btn-success');
                if(!btn.classList.contains('btn-success')) {
                    btn.style.background = '#22c55e';
                }
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    // Custom Cursor removed for performance

    // 6. Unified Scroll Optimization
    const progressBar = document.querySelector('.scroll-progress');
    const navbar = document.querySelector('.navbar');
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = height > 0 ? (winScroll / height) : 0;
                
                // Navbar
                if (navbar) {
                    if (winScroll > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                }
                
                // Progress Bar
                if (progressBar) {
                    progressBar.style.transform = `scaleX(${scrolled})`;
                }
                
                isScrolling = false;
            });
        }
    }, { passive: true });

    // Vanilla Tilt removed for performance

    // Vanta removed for performance


});

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => { preloader.style.display = 'none'; }, 800);
        }, 500);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Flashlight Effect
    const flashlightBg = document.querySelector('.flashlight-bg');
    const flashlightSection = document.querySelector('.flashlight-section');
    let flashlightTicking = false;
    if (flashlightBg && flashlightSection) {
        flashlightSection.addEventListener('mousemove', (e) => {
            if (!flashlightTicking) {
                requestAnimationFrame(() => {
                    const rect = flashlightSection.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    flashlightBg.style.webkitMaskImage = `radial-gradient(circle 250px at ${x}px ${y}px, black 0%, transparent 100%)`;
                    flashlightBg.style.maskImage = `radial-gradient(circle 250px at ${x}px ${y}px, black 0%, transparent 100%)`;
                    flashlightTicking = false;
                });
                flashlightTicking = true;
            }
        });
    }

    // Magnetic Buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        let rect;
        btn.addEventListener('mouseenter', () => {
            rect = btn.getBoundingClientRect();
        });
        btn.addEventListener('mousemove', (e) => {
            if (!rect) rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate3d(0px, 0px, 0)';
            rect = null;
        });
    });

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.from(".hero-title", { opacity: 0, y: 50, duration: 1.5, ease: "power4.out", delay: 1 });
        gsap.from(".hero-subtitle", { opacity: 0, y: 30, duration: 1.5, ease: "power4.out", delay: 1.2 });
        gsap.from(".hero-actions", { opacity: 0, y: 20, duration: 1.5, ease: "power4.out", delay: 1.4 });
        
        gsap.utils.toArray('.gsap-reveal').forEach(elem => {
            gsap.fromTo(elem, 
                { autoAlpha: 0, y: 100 }, 
                { 
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 80%",
                        end: "bottom 40%",
                        scrub: 1
                    },
                    autoAlpha: 1, 
                    y: 0 
                }
            );
        });
    }

    // Cursor morphing removed for performance

    // Cursor click ripple removed for performance

    // Lenis smooth scrolling removed in favor of native scrolling for performance

});
