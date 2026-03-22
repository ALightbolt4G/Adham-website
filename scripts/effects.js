/* ============================================
   UI EFFECTS - Adham Portfolio
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ── Mouse State ──
    const mouse = { x: 0, y: 0 };
    const cursorSmall = { x: 0, y: 0 };
    const cursorBig = { x: 0, y: 0 };
    
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // ── Custom Cursor with Lerp ──
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');

    function animate() {
        // Linear interpolation for smoothness
        cursorSmall.x += (mouse.x - cursorSmall.x) * 0.2;
        cursorSmall.y += (mouse.y - cursorSmall.y) * 0.2;
        
        cursorBig.x += (mouse.x - cursorBig.x) * 0.1;
        cursorBig.y += (mouse.y - cursorBig.y) * 0.1;

        if (cursor) {
            cursor.style.left = `${cursorBig.x}px`;
            cursor.style.top = `${cursorBig.y}px`;
        }
        if (cursorDot) {
            cursorDot.style.left = `${cursorSmall.x}px`;
            cursorDot.style.top = `${cursorSmall.y}px`;
        }

        requestAnimationFrame(animate);
    }
    animate();

    // ── Cursor Hover States ──
    const interactables = document.querySelectorAll('a, button, .service-item, .lab-card, .project-row, .contact-card');
    
    interactables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (cursor) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.backgroundColor = 'rgba(108, 99, 255, 0.1)';
                cursor.style.borderColor = 'var(--accent)';
            }
        });
        item.addEventListener('mouseleave', () => {
            if (cursor) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.borderColor = 'var(--accent)';
            }
        });
    });


    // ── Scroll Reveal ──
    // (Already handled in script.js, but keeping basic classes here just in case)
});
