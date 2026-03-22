/* ============================================
   TERMINAL COMPONENT - Adham Portfolio
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');

    function getWelcomeMessage() {
        const lang = localStorage.getItem('portfolio_lang') || 'en';
        return lang === 'ar' ? 'مرحباً بك في تيرمينال أدهم التفاعلي.' : 'Welcome to Adham\'s interactive terminal.';
    }

    function getHelpMessage() {
        const lang = localStorage.getItem('portfolio_lang') || 'en';
        return lang === 'ar' ? 'اكتب <span class="cmd">help</span> لرؤية الأوامر المتاحة.' : 'Type <span class="cmd">help</span> to see available commands.';
    }

    const BOLT_LOGO = `
    ██████╗  ██████╗ ██╗     ████████╗
    ██╔══██╗██╔═══██╗██║     ╚══██╔══╝
    ██████╔╝██║   ██║██║        ██║   
    ██╔══██╗██║   ██║██║        ██║   
    ██████╔╝╚██████╔╝███████╗   ██║   
    ╚══════╝  ╚═════╝ ╚══════╝   ╚═╝   
    `;

    const commands = {
        help: () => `Available commands: <span class="cmd">about</span>, <span class="cmd">projects</span>, <span class="cmd">skills</span>, <span class="cmd">socials</span>, <span class="cmd">clear</span>, <span class="cmd">bolt</span>`,
        about: () => `Adham Hossam — Full Stack Developer & UI/UX enthusiast. Building the future of the web, one pixel at a time.`,
        projects: () => `Recent work: SN Pharmacy, Statistics Dashboard, Raslan Koshary, CM-lang. Type <span class="cmd">work</span> for details.`,
        skills: () => `Stack: React, Node.js, Express, PostgreSQL, Supabase, and custom language design.`,
        socials: () => `GitHub: ALightbolt4G | LinkedIn: Adham Hossam | YouTube: ALightbolt4G`,
        clear: () => {
            terminalOutput.innerHTML = '';
            return null;
        },
        bolt: () => `<pre class="success">${BOLT_LOGO}</pre><br>The lightning strikes! You've found the secret of the Bolt.`,
        whoami: () => `guest@portfolio`,
        ls: () => `projects.md  skills.json  about_me.txt  secret_bolt.exe`,
    };

    function addLine(text, isInput = false) {
        if (text === null) return;
        const line = document.createElement('div');
        line.className = 'line';
        if (isInput) {
            line.innerHTML = `<span class="prompt">guest@portfolio:~$</span> ${text}`;
        } else {
            line.innerHTML = text;
        }
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = terminalInput.value.trim().toLowerCase();
            addLine(terminalInput.value, true);
            terminalInput.value = '';

            if (input === '') return;

            if (commands[input]) {
                if (window.gamify) window.gamify.trackEvent('terminalUse');
                const result = commands[input]();
                if (result) addLine(result);
            } else {
                addLine(`<span class="error">Command not found: ${input}. Type 'help' for available commands.</span>`);
            }
        }
    });

    // Handle clicks on terminal to focus input
    document.querySelector('.terminal-card').addEventListener('click', () => {
        terminalInput.focus();
    });

    document.addEventListener('languageChanged', () => {
        terminalOutput.innerHTML = '';
        addLine(getWelcomeMessage());
        addLine(getHelpMessage());
    });

    // Initial message
    addLine(getWelcomeMessage());
    addLine(getHelpMessage());
});
