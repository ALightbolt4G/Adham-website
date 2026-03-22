/* ============================================
   CM-LANG PLAYGROUND - Adham Portfolio
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const runBtn = document.getElementById('runCmCode');
    const cmCodeInput = document.getElementById('cmCodeInput');
    const cmOutput = document.getElementById('cmOutput');

    if (!runBtn || !cmCodeInput || !cmOutput) return;

    function simulateCompilation(code) {
        cmOutput.innerHTML = '<div class="compiling">Initializing CM-lang compiler...</div>';

        setTimeout(() => {
            cmOutput.innerHTML += '<div class="compiling">Lexing tokens...</div>';
            setTimeout(() => {
                cmOutput.innerHTML += '<div class="compiling">Parsing AST...</div>';
                setTimeout(() => {
                    cmOutput.innerHTML += '<div class="compiling">Generating bytecode...</div>';
                    setTimeout(() => {
                        cmOutput.innerHTML += '<hr style="opacity:0.1; margin: 10px 0">';
                        executeCode(code);
                    }, 600);
                }, 500);
            }, 400);
        }, 300);
    }

    function executeCode(code) {
    const lines = code.split('\n');
    let output = '';
    let vars = {};
    let inLoop = false;

    lines.forEach(line => {
        let trimmedLine = line.trim();

        // 1. تعريف المتغيرات
        const letMatch = trimmedLine.match(/let\s+(\w+)\s*=\s*["']([^"']*)["']/);
        if (letMatch) vars[letMatch[1]] = letMatch[2];

        // 2. كشف بداية ونهاية الـ Loop
        if (trimmedLine.includes('for')) inLoop = true;
        
        // 3. معالجة الطباعة (فقط لو مش جوه Loop عشان ميتكررش)
        const printMatch = trimmedLine.match(/(println|printin|print)\s*\((.*)\)/);
        if (printMatch && !inLoop) {
            let rawContent = printMatch[2].trim();
            let finalContent = vars[rawContent] || rawContent.replace(/["']/g, '').split(/[+,]/)[0].trim();
            output += `<div class="cm-line">> ${finalContent}</div>`;
        }

        // 4. تنفيذ الـ Loop مرة واحدة بـ 5 سطور
        if (trimmedLine.includes('0..5') || trimmedLine.includes('i < 5')) {
            for (let i = 0; i < 5; i++) {
                output += `<div class="cm-line cm-loop">> Iteration: ${i}</div>`;
            }
        }

        if (trimmedLine.includes('}')) inLoop = false;
    });

    if (!output) output = '<div class="error-msg">No output detected.</div>';
    output += '<div class="success-msg">🚀 CM-lang Execution Finished (Exit Code: 0)</div>';
    
    cmOutput.innerHTML = output;
}

    runBtn.addEventListener('click', () => {
        const code = cmCodeInput.value;
        simulateCompilation(code);
    });
});
