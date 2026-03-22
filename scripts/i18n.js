/* ============================================
   I18N LANGUAGE SYSTEM - Adham Portfolio
   ============================================ */

const translations = {
    'en': {
        'nav-services': 'Services',
        'nav-skills': 'Skills',
        'nav-projects': 'Projects',
        'nav-hire': 'Hire Me',
        'hero-i-build': 'I build',
        'hero-exp': 'digital<br>experiences.',
        'hero-sub': 'Full Stack Developer crafting modern web applications — from pixel-perfect UIs to powerful backends that scale.',
        'view-projects': 'View Projects',
        'lets-talk': 'Let\'s Talk',
        'section-01': 'What I Do',
        'section-02': 'Interactive Lab',
        'section-03': 'Technical Stack',
        'section-04': 'Selected Work',
        'section-05': 'Get In Touch',
        'term-welcome': 'Welcome to Adham\'s interactive terminal.',
        'term-help': 'Type help to see available commands.',
        'trans-title': 'ATE / ETA Translator',
        'play-title': 'CM-lang Playground',
        'radar-title': 'Innovation Radar',
        'serv-front': 'Frontend Development',
        'serv-front-p': 'Pixel-perfect, responsive interfaces with React.js. Fast, accessible and visually stunning.',
        'serv-back': 'Backend Development',
        'serv-back-p': 'Robust server-side APIs and architecture built with Node.js, Express, and modern databases.',
        'serv-db': 'Database Design',
        'serv-db-p': 'Structured, efficient database schemas with PostgreSQL and Supabase for scalable applications.',
        'serv-vid': 'Video Editing',
        'serv-vid-p': 'High-quality video production and editing with Adobe Premiere Pro and After Effects.',
        'serv-cli': 'Command Line Interface',
        'serv-cli-p': 'Building powerful CLI tools and interactive terminal experiences for developers.',
        'footer-rights': '&copy; 2024 Adham Hossam. All rights reserved.',
        'footer-made': 'Designed & Built by <span>Adham Hossam</span> © 2026',
        'alert-title': 'University Project',
        'alert-msg': 'This is a university project not yet live. It can be showcased during an interview.',
        'alert-btn': 'Got it',
    },
    'ar': {
        'nav-services': 'الخدمات',
        'nav-skills': 'المهارات',
        'nav-projects': 'المشاريع',
        'nav-hire': 'وظفني',
        'hero-i-build': 'أنا أبني',
        'hero-exp': 'تجارب<br>رقمية.',
        'hero-sub': 'مطور فول ستاك يقوم ببناء تطبيقات ويب حديثة - من واجهات بكسل مثالية إلى خلفيات قوية قابلة للتطوير.',
        'view-projects': 'عرض المشاريع',
        'lets-talk': 'دعنا نتحدث',
        'section-01': 'ماذا أفعل',
        'section-02': 'المختبر التفاعلي',
        'section-03': 'المكدس التقني',
        'section-04': 'أعمال مختارة',
        'section-05': 'تواصل معي',
        'term-welcome': 'مرحباً بك في تيرمينال أدهم التفاعلي.',
        'term-help': 'اكتب help لرؤية الأوامر المتاحة.',
        'trans-title': 'مترجم ATE / ETA',
        'play-title': 'ملعب CM-lang',
        'radar-title': 'رادار الابتكار',
        'serv-front': 'تطوير الواجهات الأمامية',
        'serv-front-p': 'واجهات بكسل مثالية وسريعة الاستجابة باستخدام React.js. سريعة وسهلة الوصول ومذهلة بصرياً.',
        'serv-back': 'تطوير الواجهات الخلفية',
        'serv-back-p': 'واجهات برمجة تطبيقات (APIs) قوية وهندسة معمارية مبنية باستخدام Node.js و Express وقواعد بيانات حديثة.',
        'serv-db': 'تصميم قواعد البيانات',
        'serv-db-p': 'مخططات قواعد بيانات منظمة وفعالة مع PostgreSQL و Supabase للتطبيقات القابلة للتطوير.',
        'serv-vid': 'مونتاج الفيديو',
        'serv-vid-p': 'إنتاج وتحرير فيديو عالي الجودة باستخدام Adobe Premiere Pro و After Effects.',
        'serv-cli': 'واجهة سطر الأوامر',
        'serv-cli-p': 'بناء أدوات CLI قوية وتجارب تيرمينال تفاعلية للمطورين.',
        'footer-rights': '&copy; 2024 أدهم حسام. جميع الحقوق محفوظة.',
        'footer-made': 'صمم وبني بواسطة <span>أدهم حسام</span> © 2026',
        'alert-title': 'مشروع جامعي',
        'alert-msg': 'هذا مشروع جامعي لم يتم نشره على الإنترنت بعد. يمكن عرضه خلال مقابلة.',
        'alert-btn': 'حسناً',
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langEN = document.getElementById('langEN');
    const langAR = document.getElementById('langAR');
    let currentLang = localStorage.getItem('portfolio_lang') || 'en';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('portfolio_lang', lang);
        
        document.documentElement.dir = (lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.lang = lang;

        // Toggle button classes
        if (lang === 'en') {
            langEN.classList.add('active');
            langAR.classList.remove('active');
        } else {
            langAR.classList.add('active');
            langEN.classList.remove('active');
        }

        // Translate elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        // Trigger custom event for other scripts
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    langEN.addEventListener('click', () => setLanguage('en'));
    langAR.addEventListener('click', () => setLanguage('ar'));

    // Init
    setLanguage(currentLang);
});
