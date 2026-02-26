// ======> Variáveis e Mapeamento do HTML.

// As caixinhas do Token.
const caixasToken = document.querySelectorAll('.caixa-token');





caixasToken.forEach((caixa, index) => {
    
    caixa.addEventListener('input', () => {
        // Se a caixa atual tem 1 número e não é a última caixa da fila ele pula o foco para a próxima caixa.
        if (caixa.value.length === 1 && index < caixasToken.length - 1) {
            caixasToken[index + 1].focus();
        }
    });

    caixa.addEventListener('keydown', (e) => {
        // Se ele apertou Backspace, o número é apagado, e se não for a primeira caixa ele volta para a caixa anterior.
        if (e.key === 'Backspace' && caixa.value === '' && index > 0) {
            caixasToken[index - 1].focus();
        }
    });
});