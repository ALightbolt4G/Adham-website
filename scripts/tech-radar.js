/* ============================================
   TECH RADAR COMPONENT - Adham Portfolio
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const radarContainer = document.getElementById('techRadar');
    if (!radarContainer) return;

    const data = [
        { name: 'React', level: 'adopt', angle: 45, dist: 0.3 },
        { name: 'Node.js', level: 'adopt', angle: 135, dist: 0.25 },
        { name: 'Express', level: 'adopt', angle: 225, dist: 0.35 },
        { name: 'PostgreSQL', level: 'adopt', angle: 315, dist: 0.4 },
        { name: 'Supabase', level: 'trial', angle: 10, dist: 0.6 },
        { name: 'TypeScript', level: 'trial', angle: 100, dist: 0.55 },
        { name: 'Docker', level: 'trial', angle: 190, dist: 0.65 },
        { name: 'Next.js', level: 'trial', angle: 280, dist: 0.7 },
        { name: 'LangDesign', level: 'assess', angle: 60, dist: 0.85 },
        { name: 'WebSockets', level: 'assess', angle: 150, dist: 0.8 },
        { name: 'Rust', level: 'assess', angle: 240, dist: 0.9 },
        { name: 'AI/ML', level: 'assess', angle: 330, dist: 0.88 },
    ];

    const size = 500;
    const center = size / 2;
    const radius = size / 2 - 20;

    let svg = `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" class="radar-svg">`;

    // Draw rings
    svg += `<circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />`;
    svg += `<circle cx="${center}" cy="${center}" r="${radius * 0.66}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />`;
    svg += `<circle cx="${center}" cy="${center}" r="${radius * 0.33}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" />`;

    // Draw axis
    svg += `<line x1="${center}" y1="0" x2="${center}" y2="${size}" stroke="rgba(255,255,255,0.03)" />`;
    svg += `<line x1="0" y1="${center}" x2="${size}" y2="${center}" stroke="rgba(255,255,255,0.03)" />`;

    // Draw dots
    data.forEach(item => {
        const rad = (item.angle * Math.PI) / 180;
        const dist = item.dist * radius;
        const x = center + dist * Math.cos(rad);
        const y = center + dist * Math.sin(rad);

        const color = item.level === 'adopt' ? '#43e8b0' : (item.level === 'trial' ? '#6c63ff' : '#ff6584');

        svg += `<g class="radar-point" style="cursor: pointer">
            <circle cx="${x}" cy="${y}" r="6" fill="${color}" filter="drop-shadow(0 0 5px ${color})" />
            <text x="${x}" y="${y - 12}" fill="rgba(255,255,255,0.7)" font-size="10" text-anchor="middle" font-family="Syne">${item.name}</text>
        </g>`;
    });

    svg += '</svg>';
    radarContainer.innerHTML = svg;
});
