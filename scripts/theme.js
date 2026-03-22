/**
 * Theme Toggle Module
 * Handles dark/light mode switching with localStorage persistence
 */

(function() {
    'use strict';

    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme on load
    function applyTheme(theme) {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            html.removeAttribute('data-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
    
    // Initialize theme
    applyTheme(savedTheme);
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Trigger gamification event
        if (window.gamify) {
            window.gamify.trackEvent('themeSwitch', { theme: newTheme });
        }
    }
    
    // Event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Check system preference if no saved theme
    if (!localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    // Expose to global for other scripts
    window.themeManager = {
        toggle: toggleTheme,
        getCurrentTheme: () => html.getAttribute('data-theme') || 'light',
        applyTheme: applyTheme
    };
})();
