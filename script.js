// ── Custom Cursor
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// ── Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ── Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navigation = document.querySelector('.navigation');
menuToggle.addEventListener('click', () => {
    navigation.classList.toggle('open');
});

// Close mobile menu on link click
navigation.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navigation.classList.remove('open'));
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

document.querySelectorAll('.service-item, .skill-group, .project-row, .contact-card').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
});

document.querySelectorAll('.bar-fill').forEach(bar => observer.observe(bar));

// ── Payment alert
const paymentLink = document.getElementById('payment-link');
const customAlert = document.getElementById('customAlert');
const closeAlert = document.getElementById('closeAlert');
const closeAlertBtn = document.getElementById('closeAlertBtn');

paymentLink.addEventListener('click', (e) => {
    e.preventDefault();
    customAlert.classList.add('active');
});

const closeModal = () => customAlert.classList.remove('active');
closeAlert.addEventListener('click', closeModal);
closeAlertBtn.addEventListener('click', closeModal);
customAlert.addEventListener('click', (e) => { if (e.target === customAlert) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
