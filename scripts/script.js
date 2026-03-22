// ── Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }, 2000);
});

// ── Header scroll & Progress
const header = document.getElementById('header');
const scrollBar = document.getElementById('scrollBar');

window.addEventListener('scroll', () => {
    // Header class
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Progress bar
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / scrollMax) * 100;
    if (scrollBar) scrollBar.style.width = scrollPercent + '%';
});

// ── Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Animate skill bars
            if (entry.target.classList.contains('bar-fill')) {
                entry.target.classList.add('animated');
            }
        }
    });
}, { threshold: 0.15 });

// Staggered Entrance
document.querySelectorAll('section').forEach(section => {
    const elements = section.querySelectorAll('.service-item, .skill-group, .project-row, .contact-card, .lab-card, .radar-container');
    elements.forEach((el, index) => {
        el.classList.add('fade-up');
        el.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(el);
    });
});

document.querySelectorAll('.bar-fill').forEach(bar => observer.observe(bar));

// ── Payment alert
const paymentLink = document.getElementById('payment-link');
const customAlert = document.getElementById('customAlert');
const closeAlert = document.getElementById('closeAlert');
const closeAlertBtn = document.getElementById('closeAlertBtn');

if (paymentLink) {
    paymentLink.addEventListener('click', (e) => {
        e.preventDefault();
        customAlert.classList.add('active');
    });
}

const closeModal = () => {
    if (customAlert) customAlert.classList.remove('active');
};

if (closeAlert) closeAlert.addEventListener('click', closeModal);
if (closeAlertBtn) closeAlertBtn.addEventListener('click', closeModal);
if (customAlert) {
    customAlert.addEventListener('click', (e) => { if (e.target === customAlert) closeModal(); });
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
