// ======> Enviar E-mail para Recuperação de Conta.
// 1) Captura o formulário e impede o recarregamento da página;
// 2) Valida o e-mail digitado;
// 3) Mudar o estado do botão;
// 4) Enviar a requisição POST para o backend;
// 5) Salvar o e-mail na sessão (sessionStorage) para usar na Tela 2;
// 6) Mostrar notificação e redirecionar para "nova-senha.html".
// --------------------------------------------------------------------- //

// Selecionando os elementos do DOM.
const formRecuperacao = document.querySelector('.formulario');
const inputEmail = document.getElementById('email');
const btnEnviar = document.getElementById('enviarCodigo');

// Escutando o evento de envio do formulário.
formRecuperacao.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Pega o valor digitado e remove espaços em branco.
    const emailValue = inputEmail.value.trim();

    if (!emailValue) {
        mostrarToast('error', 'Por favor, digite um e-mail válido!');
        return;
    }

    // Altera o estado do botão para dar feedback visual, e evita duplo clique.
    const textoOriginalBotao = btnEnviar.innerText;
    btnEnviar.innerText = 'Enviando...';
    btnEnviar.disabled = true;
    btnEnviar.style.opacity = '0.7';

    try {
        // =========================================================
        // 🚀 CÓDIGO DA FUTURA API (Descomente quando o backend estiver pronto)
        // =========================================================
        /*
        const response = await fetch('http://localhost:3000/api/auth/recuperar-conta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailValue })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || 'Erro ao tentar enviar o e-mail.');
        }
        */

        // =========================================================
        // 🧪 SIMULAÇÃO PARA TESTE VISUAL (Remova depois)
        // =========================================================
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simula 1.5s de carregamento

        // Salva o e-mail no sessionStorage. 
        // Isso é crucial para a próxima tela saber qual e-mail estamos verificando!
        sessionStorage.setItem('emailRecuperacao', emailValue);


        mostrarToast('success', 'Código enviado! Verifique sua caixa de entrada.');
        
        // Redireciona o usuário para a tela da Parte 2
        window.location.href = 'nova-senha.html';

    } catch (error) {
        // Log do erro no console para debug.
        console.error("[Erro - Envio de E-mail Recuperação]:", error);
        
        mostrarToast('error', error.message);

    } finally {
        // Restaura o botão ao estado original, independente de ter dado certo ou errado.
        btnEnviar.innerText = textoOriginalBotao;
        btnEnviar.disabled = false;
        btnEnviar.style.opacity = '1';
    }
});