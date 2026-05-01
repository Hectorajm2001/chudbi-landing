// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // navbar height
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
    
    lastScroll = currentScroll;
});

// --- GSAP Premium Corporate Animations ---
gsap.registerPlugin(ScrollTrigger);

// 1. Hero Section Animation (Carga inicial)
gsap.fromTo(".hero-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2, clearProps: "all" });
gsap.fromTo(".hero-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4, clearProps: "all" });
gsap.fromTo(".hero-buttons", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6, clearProps: "all" });
gsap.fromTo(".hero-stats .stat", 
    { opacity: 0, y: 20 },
    { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power2.out", 
        delay: 0.8,
        clearProps: "all"
    }
);

// 2. Sections Titles (Aparecen al hacer scroll)
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.fromTo(title, 
        { opacity: 0, y: 20 },
        {
            scrollTrigger: {
                trigger: title,
                start: "top 90%", // Inicia animación cuando el título toca el 90%
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all"
        }
    );
});

// 3. Grids Staggered Animation (Características, Módulos, Tech Stack)
const grids = ['.features-grid', '.modules-grid', '.tech-grid', '.testimonials-grid'];

grids.forEach(gridClass => {
    const grid = document.querySelector(gridClass);
    if (!grid) return;

    // Seleccionamos los hijos directos del grid (las tarjetas)
    const elements = Array.from(grid.children);
    
    gsap.fromTo(elements, 
        {
            opacity: 0,
            y: 30
        },
        {
            scrollTrigger: {
                trigger: grid,
                start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1, // Espera 0.1s entre cada elemento para dar efecto escalera
            ease: "power3.out",
            clearProps: "all"
        }
    );
});

// 4. Parallax Sutil para elementos del Hero (Opcional extra premium)
gsap.to(".hero-image", {
    yPercent: 15,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top", 
        end: "bottom top",
        scrub: true
    }
});

// Chat simulation (for demo)
const chatMessages = document.querySelector('.chat-messages');
if (chatMessages) {
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add typing indicator animation
    setInterval(() => {
        const lastMessage = chatMessages.querySelector('.chat-message.bot:last-child');
        if (lastMessage) {
            lastMessage.style.animation = 'none';
            setTimeout(() => {
                lastMessage.style.animation = '';
            }, 10);
        }
    }, 3000);
}

// Add animation for stats counting
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        const isNumber = !isNaN(parseInt(target));
        
        if (isNumber) {
            const value = parseInt(target);
            let current = 0;
            const increment = value / 50;
            
            const updateCount = () => {
                current += increment;
                if (current < value) {
                    stat.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCount();
        }
    });
};

// Trigger stats animation when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}


// Add mobile menu styles dynamically
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            gap: 1rem;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('💼 CHUDBI Landing Page - Sistema Contable con IA Local');

// Contact form -> Google Sheets (Apps Script Web App)
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');
const scriptURL = 'https://script.google.com/macros/s/AKfycbyzjzAcTr8SfbzOALlnPn3p7x2eiQ_uO9qxKeDT8rqZNPyHaU145nzWJPehN4AubWM/exec';

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!scriptURL || scriptURL.includes('PASTE_APPS_SCRIPT_URL_HERE')) {
            if (formStatus) {
                formStatus.textContent = 'Falta configurar el enlace de Google Apps Script.';
                formStatus.classList.remove('success');
                formStatus.classList.add('error');
            }
            return;
        }

        if (formStatus) {
            formStatus.textContent = 'Enviando...';
            formStatus.classList.remove('success', 'error');
        }

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            contactForm.reset();
            if (formStatus) {
                formStatus.textContent = 'Gracias. Tu mensaje fue enviado.';
                formStatus.classList.remove('error');
                formStatus.classList.add('success');
            }
        } catch (error) {
            if (formStatus) {
                formStatus.textContent = 'No se pudo enviar. Intenta de nuevo.';
                formStatus.classList.remove('success');
                formStatus.classList.add('error');
            }
        }
    });
}
