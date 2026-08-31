/**
 * Bongshai Group - Executive Corporate Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Drawer
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
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

        // Close when clicking any nav item
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Navbar Scroll Elevation
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // 3. Metric Counter Animation
    const metricElements = document.querySelectorAll('.metric-number');
    if (metricElements.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'), 10);
                    if (!isNaN(target)) {
                        let current = 0;
                        const duration = 1500;
                        const step = Math.max(1, Math.floor(target / (duration / 25)));
                        const suffix = target === 15 ? '15+' : (target === 500 ? '500+' : (target === 100 ? '100%' : target));
                        
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= target) {
                                el.textContent = suffix;
                                clearInterval(timer);
                            } else {
                                el.textContent = current;
                            }
                        }, 25);
                    }
                    obs.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        metricElements.forEach(el => observer.observe(el));
    }

    // 4. Corporate RFP / Contact Form Handling (WebMCP Bound)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Transmitting RFP...';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-circle-check"></i> Inquiry Successfully Dispatched';
                submitBtn.style.backgroundColor = '#10b981';
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 4000);
            }, 1200);
        });
    }
});
