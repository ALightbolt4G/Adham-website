/**
 * Gamification System
 * Tracks user interactions, awards XP, and unlocks badges
 */

(function() {
    'use strict';

    // Gamification State
    const state = {
        xp: parseInt(localStorage.getItem('gamify_xp')) || 0,
        level: parseInt(localStorage.getItem('gamify_level')) || 1,
        badges: JSON.parse(localStorage.getItem('gamify_badges')) || [],
        sectionsViewed: JSON.parse(localStorage.getItem('gamify_sections')) || [],
        projectsViewed: JSON.parse(localStorage.getItem('gamify_projects')) || [],
        linksClicked: JSON.parse(localStorage.getItem('gamify_links')) || [],
        achievements: JSON.parse(localStorage.getItem('gamify_achievements')) || []
    };

    // Badge Definitions
    const badges = {
        explorer: {
            id: 'explorer',
            name: 'Explorer',
            description: 'View all sections of the portfolio',
            icon: 'fa-compass',
            tier: 'bronze',
            condition: () => state.sectionsViewed.length >= 5
        },
        codeNinja: {
            id: 'codeNinja',
            name: 'Code Ninja',
            description: 'View all projects',
            icon: 'fa-code',
            tier: 'silver',
            condition: () => state.projectsViewed.length >= 7
        },
        socialButterfly: {
            id: 'socialButterfly',
            name: 'Social Butterfly',
            description: 'Click on social media links',
            icon: 'fa-share-nodes',
            tier: 'bronze',
            condition: () => state.linksClicked.includes('social')
        },
        nightOwl: {
            id: 'nightOwl',
            name: 'Night Owl',
            description: 'Use dark mode',
            icon: 'fa-moon',
            tier: 'silver',
            condition: () => state.achievements.includes('nightOwl')
        },
        earlyBird: {
            id: 'earlyBird',
            name: 'Early Bird',
            description: 'Use light mode',
            icon: 'fa-sun',
            tier: 'silver',
            condition: () => state.achievements.includes('earlyBird')
        },
        projectMaster: {
            id: 'projectMaster',
            name: 'Project Master',
            description: 'Click on 3+ project links',
            icon: 'fa-folder-open',
            tier: 'gold',
            condition: () => state.linksClicked.filter(l => l === 'project').length >= 3
        },
        skillSeeker: {
            id: 'skillSeeker',
            name: 'Skill Seeker',
            description: 'Spend time viewing skills section',
            icon: 'fa-graduation-cap',
            tier: 'bronze',
            condition: () => state.achievements.includes('skillSeeker')
        },
        contactInitiator: {
            id: 'contactInitiator',
            name: 'Contact Initiator',
            description: 'Click on contact information',
            icon: 'fa-address-card',
            tier: 'bronze',
            condition: () => state.linksClicked.includes('contact')
        },
        scrollMaster: {
            id: 'scrollMaster',
            name: 'Scroll Master',
            description: 'Scroll through entire page',
            icon: 'fa-computer-mouse',
            tier: 'silver',
            condition: () => state.achievements.includes('scrollMaster')
        },
        terminalMaster: {
            id: 'terminalMaster',
            name: 'Terminal Master',
            description: 'Use the interactive terminal',
            icon: 'fa-terminal',
            tier: 'silver',
            condition: () => state.achievements.includes('terminalUsed')
        },
        polyglot: {
            id: 'polyglot',
            name: 'Polyglot',
            description: 'Use the ATE/ETA translator',
            icon: 'fa-language',
            tier: 'bronze',
            condition: () => state.achievements.includes('translatorUsed')
        },
        cmExpert: {
            id: 'cmExpert',
            name: 'CM Expert',
            description: 'Run code in the CM-lang playground',
            icon: 'fa-microchip',
            tier: 'gold',
            condition: () => state.achievements.includes('playgroundUsed')
        }
    };

    // XP Values
    const xpValues = {
        sectionView: 10,
        projectView: 15,
        linkClick: 5,
        socialClick: 8,
        themeSwitch: 5,
        badgeUnlock: 50,
        scrollComplete: 20
    };

    // Level thresholds
    const levelThresholds = [0, 100, 250, 500, 1000, 2000, 3500, 5000];

    // DOM Elements
    const achToggle = document.getElementById('achToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const achievementsSidebar = document.getElementById('achievementsSidebar');
    const xpFill = document.getElementById('xpFill');
    const xpLevel = document.getElementById('xpLevel');
    const xpNeeded = document.getElementById('xpNeeded');
    const badgesContainer = document.getElementById('badgesContainer');
    const achievementToast = document.getElementById('achievementToast');
    const achievementText = document.getElementById('achievementText');

    // Toggle Sidebar
    if (achToggle && achievementsSidebar) {
        achToggle.addEventListener('click', () => {
            achievementsSidebar.classList.add('open');
        });
    }

    if (closeSidebar && achievementsSidebar) {
        closeSidebar.addEventListener('click', () => {
            achievementsSidebar.classList.remove('open');
        });
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (achievementsSidebar && achievementsSidebar.classList.contains('open') && 
            !achievementsSidebar.contains(e.target) && !achToggle.contains(e.target)) {
            achievementsSidebar.classList.remove('open');
        }
    });

    // Save state to localStorage
    function saveState() {
        localStorage.setItem('gamify_xp', state.xp);
        localStorage.setItem('gamify_level', state.level);
        localStorage.setItem('gamify_badges', JSON.stringify(state.badges));
        localStorage.setItem('gamify_sections', JSON.stringify(state.sectionsViewed));
        localStorage.setItem('gamify_projects', JSON.stringify(state.projectsViewed));
        localStorage.setItem('gamify_links', JSON.stringify(state.linksClicked));
        localStorage.setItem('gamify_achievements', JSON.stringify(state.achievements));
    }

    // Add XP
    function addXP(amount, source = '') {
        const oldLevel = state.level;
        state.xp += amount;
        
        // Check for level up
        for (let i = state.level; i < levelThresholds.length; i++) {
            if (state.xp >= levelThresholds[i]) {
                state.level = i;
            }
        }
        
        // Show XP gain animation if source provided
        if (source) {
            showXPGain(amount, source);
        }
        
        // Level up notification
        if (state.level > oldLevel) {
            showAchievement(`Level Up! Level ${state.level}`);
        }
        
        updateXPBar();
        saveState();
    }

    // Show XP gain animation
    function showXPGain(amount, source) {
        const xpElement = document.createElement('div');
        xpElement.className = 'xp-gain animate';
        xpElement.textContent = `+${amount} XP`;
        xpElement.style.left = Math.random() * window.innerWidth + 'px';
        xpElement.style.top = window.innerHeight / 2 + 'px';
        document.body.appendChild(xpElement);
        
        setTimeout(() => xpElement.remove(), 1000);
    }

    // Update XP bar UI
    function updateXPBar() {
        if (!xpFill || !xpLevel) return;
        
        const currentThreshold = levelThresholds[state.level] || 0;
        const nextThreshold = levelThresholds[state.level + 1] || currentThreshold + 1000;
        const diff = nextThreshold - currentThreshold;
        const progress = ((state.xp - currentThreshold) / diff) * 100;
        
        xpFill.style.width = Math.min(progress, 100) + '%';
        xpLevel.textContent = state.level;
        
        if (xpNeeded) {
            const remaining = nextThreshold - state.xp;
            xpNeeded.textContent = state.level < levelThresholds.length - 1 
                ? `Next level: ${remaining} XP` 
                : 'Max Level Reached!';
        }
    }

    // Render All Badges (Initial)
    function renderAllBadges() {
        if (!badgesContainer) return;
        badgesContainer.innerHTML = '';
        
        Object.keys(badges).forEach(badgeId => {
            const badge = badges[badgeId];
            const isUnlocked = state.badges.includes(badgeId);
            
            const card = document.createElement('div');
            card.className = `badge-card ${badge.tier} ${isUnlocked ? 'unlocked' : ''}`;
            card.id = `badge-${badgeId}`;
            card.innerHTML = `
                <i class="fa-solid ${badge.icon}"></i>
                <h4>${badge.name}</h4>
                <p>${badge.description}</p>
            `;
            badgesContainer.appendChild(card);
        });
    }

    // Unlock badge
    function unlockBadge(badgeId) {
        if (state.badges.includes(badgeId)) return;
        
        const badge = badges[badgeId];
        if (!badge) return;
        
        state.badges.push(badgeId);
        addXP(xpValues.badgeUnlock);
        
        // Update UI card
        const card = document.getElementById(`badge-${badgeId}`);
        if (card) {
            card.classList.add('unlocked');
            card.classList.add('new-unlock');
        }
        
        // Show achievement toast
        showAchievement(badge.name);
        saveState();
    }

    // Show achievement toast
    function showAchievement(text) {
        if (!achievementToast || !achievementText) return;
        
        achievementText.textContent = text;
        achievementToast.classList.add('show');
        
        setTimeout(() => {
            achievementToast.classList.remove('show');
        }, 3000);
    }

    // Check all badge conditions
    function checkBadges() {
        Object.keys(badges).forEach(badgeId => {
            const badge = badges[badgeId];
            if (badge.condition()) {
                unlockBadge(badgeId);
            }
        });
    }

    // Track event
    function trackEvent(eventType, data = {}) {
        switch(eventType) {
            case 'sectionView':
                if (!state.sectionsViewed.includes(data.section)) {
                    state.sectionsViewed.push(data.section);
                    addXP(xpValues.sectionView);
                }
                break;
                
            case 'projectView':
                if (!state.projectsViewed.includes(data.project)) {
                    state.projectsViewed.push(data.project);
                    addXP(xpValues.projectView);
                }
                break;
                
            case 'linkClick':
                state.linksClicked.push(data.type);
                addXP(data.type === 'social' ? xpValues.socialClick : xpValues.linkClick);
                break;
                
            case 'themeSwitch':
                if (data.theme === 'dark' && !state.achievements.includes('nightOwl')) {
                    state.achievements.push('nightOwl');
                }
                if (data.theme === 'light' && !state.achievements.includes('earlyBird')) {
                    state.achievements.push('earlyBird');
                }
                addXP(xpValues.themeSwitch);
                break;
                
            case 'scrollComplete':
                if (!state.achievements.includes('scrollMaster')) {
                    state.achievements.push('scrollMaster');
                    addXP(xpValues.scrollComplete);
                }
                break;
                
            case 'terminalUse':
                if (!state.achievements.includes('terminalUsed')) {
                    state.achievements.push('terminalUsed');
                    addXP(20);
                }
                break;
                
            case 'translatorUse':
                if (!state.achievements.includes('translatorUsed')) {
                    state.achievements.push('translatorUsed');
                    addXP(15);
                }
                break;
                
            case 'playgroundUse':
                if (!state.achievements.includes('playgroundUsed')) {
                    state.achievements.push('playgroundUsed');
                    addXP(30);
                }
                break;
        }
        
        checkBadges();
        saveState();
    }


    // Intersection Observer for sections
    function setupSectionObserver() {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    trackEvent('sectionView', { section: entry.target.id });
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.3 });
        
        sections.forEach(section => observer.observe(section));
    }

    // Project links tracking
    function setupProjectTracking() {
        const projectLinks = document.querySelectorAll('.project-links a');
        
        projectLinks.forEach(link => {
            link.addEventListener('click', () => {
                trackEvent('linkClick', { type: 'project' });
            });
        });
    }

    // Social links tracking
    function setupSocialTracking() {
        const socialLinks = document.querySelectorAll('.hero-social a, .footer-social a');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', () => {
                trackEvent('linkClick', { type: 'social' });
            });
        });
    }

    // Contact links tracking
    function setupContactTracking() {
        const contactCards = document.querySelectorAll('.contact-card');
        
        contactCards.forEach(card => {
            card.addEventListener('click', () => {
                trackEvent('linkClick', { type: 'contact' });
            });
        });
    }

    // Scroll tracking
    function setupScrollTracking() {
        let scrolledToBottom = false;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
            
            if (scrollPercent > 0.9 && !scrolledToBottom) {
                scrolledToBottom = true;
                trackEvent('scrollComplete');
            }
        });
    }

    // Initialize gamification
    function init() {
        updateXPBar();
        renderAllBadges();
        setupSectionObserver();
        setupProjectTracking();
        setupSocialTracking();
        setupContactTracking();
        setupScrollTracking();
        
        // Check badges on init
        checkBadges();
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose gamify API
    window.gamify = {
        trackEvent,
        addXP,
        getState: () => ({ ...state }),
        reset: () => {
            localStorage.removeItem('gamify_xp');
            localStorage.removeItem('gamify_level');
            localStorage.removeItem('gamify_badges');
            localStorage.removeItem('gamify_sections');
            localStorage.removeItem('gamify_projects');
            localStorage.removeItem('gamify_links');
            localStorage.removeItem('gamify_achievements');
            location.reload();
        }
    };
})();
