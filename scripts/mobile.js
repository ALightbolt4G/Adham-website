/**
 * ADHAM HOSSAM — Mobile/Interactivity Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // ── Mobile menu toggle ──
    const menuToggle = document.getElementById('menuToggle');
    const navigation = document.querySelector('.navigation');

    if (menuToggle && navigation) {
        menuToggle.addEventListener('click', () => {
            navigation.classList.toggle('open');
            menuToggle.classList.toggle('active'); // Added for potential cross animation
        });

        // Close mobile menu on link click
        navigation.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navigation.classList.remove('open');
                menuToggle.classList.remove('active');
            });
        });

        // Close menu if clicking outside
        document.addEventListener('click', (e) => {
            if (!navigation.contains(e.target) && !menuToggle.contains(e.target)) {
                navigation.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        });
    }
});
