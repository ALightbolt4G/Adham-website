/* ============================================
   TRANSLATOR COMPONENT - Adham Portfolio
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const transInput = document.getElementById('transInput');
    const transOutput = document.getElementById('transOutput');
    const btnETA = document.getElementById('btnETA');
    const btnATE = document.getElementById('btnATE');

    let mode = 'ETA'; // English to Arabic

    const dictionary = {
        'hello': 'مرحباً',
        'world': 'العالم',
        'developer': 'مطور',
        'code': 'كود',
        'software': 'برمجيات',
        'website': 'موقع إلكتروني',
        'project': 'مشروع',
        'experience': 'خبرة',
        'about': 'حول',
        'contact': 'اتصل',
        'services': 'خدمات',
        'skills': 'مهارات',
        'full stack': 'فول ستاك',
        'adham': 'أدهم',
        'hossam': 'حسام',
        'portfolio': 'معرض أعمال',
        'interactive': 'تفاعلي',
        'terminal': 'تيرمينال',
        'programming': 'برمجة',
        'language': 'لغة',
        'compiler': 'كومبايلر',
        'success': 'نجاح',
        'error': 'خطأ',
    };

    // Reverse dictionary for ATE
    const revDictionary = {};
    for (const [en, ar] of Object.entries(dictionary)) {
        revDictionary[ar] = en;
    }

    function translate() {
        const text = transInput.value.toLowerCase().trim();
        if (text === '') {
            transOutput.textContent = 'Translation will appear here...';
            return;
        }

        const words = text.split(/\s+/);
        const dict = (mode === 'ETA') ? dictionary : revDictionary;

        const results = words.map(word => {
            return dict[word] || `<span style="opacity:0.6">[${word}]</span>`;
        });

        if (window.gamify) window.gamify.trackEvent('translatorUse');
        transOutput.innerHTML = results.join(' ');
    }

    btnETA.addEventListener('click', () => {
        mode = 'ETA';
        btnETA.classList.add('active');
        btnATE.classList.remove('active');
        transInput.placeholder = 'Enter English text...';
        translate();
    });

    btnATE.addEventListener('click', () => {
        mode = 'ATE';
        btnATE.classList.add('active');
        btnETA.classList.remove('active');
        transInput.placeholder = 'أدخل النص العربي...';
        translate();
    });

    transInput.addEventListener('input', translate);
});
