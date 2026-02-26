// ======> Variáveis e Mapeamento do HTML.
// 1) Caixinhas e Containers.
const caixasToken = document.querySelectorAll('.caixa-token');
const containerVerificar = document.querySelector('.container-verificar');
const containerSenha = document.querySelector('.container-senha');

// 2) Formulários e Botões.
const formVerificar = document.getElementById('formVerificar');
const btnVerificar = document.getElementById('verificarCodigo');
const formNovaSenha = document.querySelector('.criar-nova-senha');
const btnSalvarSenha = document.getElementById('salvarSenha');

// 3) Inputs de Senha e Ícones.
const inputSenha = document.getElementById('senha');
const inputConfirmar = document.getElementById('confirmarSenha');
const olhoSenha = document.getElementById('olhoSenha');
const olhoConfirmar = document.getElementById('olhoConfirmar');


// ======> Lógica das Caixinhas do Token.

caixasToken.forEach((caixa, index) => {
    caixa.addEventListener('input', () => {
        // Se a caixa atual tem 1 número e não é a última caixa da fila, pula o foco para a próxima.
        if (caixa.value.length === 1 && index < caixasToken.length - 1) {
            caixasToken[index + 1].focus();
        }
    });

    caixa.addEventListener('keydown', (e) => {
        // Se apertar Backspace, a caixa estiver vazia, e não for a primeira, volta para a anterior.
        if (e.key === 'Backspace' && caixa.value === '' && index > 0) {
            caixasToken[index - 1].focus();
        }
    });
});


// ======> Verificar o Código de 6 Dígitos.
// 1) Impedir recarregamento da página;
// 2) Juntar os 6 números em uma única string "Token";
// 3) Simular o envio para a API para validar o Token;
// 4) Se sucesso: Esconder Parte 1 e Mostrar Parte 2.
// --------------------------------------------------------------------- //

formVerificar.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Junta o valor de todas as 6 caixinhas em um texto só.
    let tokenDigitado = '';
    caixasToken.forEach(caixa => {
        tokenDigitado += caixa.value;
    });

    // Validação básica do Front
    if (tokenDigitado.length < 6) {
        mostrarToast("Por favor, preencha os 6 dígitos do código."); 
        return;
    }

    // Feedback visual de carregamento.
    const textoOriginal = btnVerificar.innerText;
    btnVerificar.innerText = 'Verificando...';
    btnVerificar.disabled = true;

    try {
        // Resgata o e-mail que salvamos na tela anterior!
        const emailSalvo = sessionStorage.getItem('emailRecuperacao');

        // =========================================================
        // 🚀 AQUI VAI O FETCH PARA A SUA API NO FUTURO
        // Ex: fetch('/api/auth/validar-token', { body: JSON.stringify({ email: emailSalvo, token: tokenDigitado }) })
        // =========================================================

        // 🧪 SIMULAÇÃO DE CARREGAMENTO (Remova depois)
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // 🎇 A MÁGICA DA TROCA DE TELAS ACONTECE AQUI!
        // Some com a tela de código...
        containerVerificar.style.display = 'none';
        
        // ...E faz a tela de nova senha aparecer suavemente! (Usamos 'flex' porque seu container é flexbox)
        containerSenha.style.display = 'flex';
        
        mostrarToast("Código validado! Crie sua nova senha."); 

    } catch (error) {
        console.error("[Erro - Verificar Token]:", error);
        mostrarToast("Código inválido ou expirado."); 
    } finally {
        btnVerificar.innerText = textoOriginal;
        btnVerificar.disabled = false;
    }
});


// ======> 2. Mostrar/Esconder Senha.
// 1) Função para trocar o type do input (password <-> text);
// 2) Mudar a ícone.
// ---------------------------------------------------------------- //
function alternarVisibilidade(input, icone) {
    if (input.type === 'password') {
        input.type = 'text';
        icone.src = '../img/icone-olho-aberto.png'; 
    } else {
        input.type = 'password';
        icone.src = '../img/icone-olho-fechado.png';
    }
}

olhoSenha.addEventListener('click', () => {
    alternarVisibilidade(inputSenha, olhoSenha);
});

olhoConfirmar.addEventListener('click', () => {
    alternarVisibilidade(inputConfirmar, olhoConfirmar);
});


// ======> 3. Salvar a Nova Senha
// 1) Valida se tem no mínimo 6 caracteres;
// 2) Valida se a "Nova Senha" é igual a "Confirmar Senha";
// 3) Envia para a API atualizar no banco de dados;
// 4) Limpar a memória do navegador e manda o usuário pro Login.
// ---------------------------------------------------------------- //
formNovaSenha.addEventListener('submit', async (event) => {
    event.preventDefault();

    const novaSenha = inputSenha.value;
    const confirmacao = inputConfirmar.value;

    if (novaSenha.length < 6) {
        mostrarToast("A senha deve ter pelo menos 6 caracteres."); 
        return;
    }

    if (novaSenha !== confirmacao) {
        mostrarToast("As senhas não conferem. Digite novamente."); 
        return;
    }

    const textoOriginal = btnSalvarSenha.innerText;
    btnSalvarSenha.innerText = 'Salvando...';
    btnSalvarSenha.disabled = true;

    try {
        const emailSalvo = sessionStorage.getItem('emailRecuperacao');

        // =========================================================
        // 🚀 AQUI VAI O FETCH PARA A SUA API NO FUTURO
        // Ex: fetch('/api/auth/resetar-senha', { body: JSON.stringify({ email: emailSalvo, novaSenha }) })
        // =========================================================

        // 🧪 SIMULAÇÃO DE CARREGAMENTO (Remova depois)
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        // Limpa a mochila do navegador (segurança)
        sessionStorage.removeItem('emailRecuperacao');

        mostrarToast("Senha alterada com sucesso! Faça login para jogar."); 

        // Redireciona o jogador de volta para a tela de login
        window.location.href = 'entrar.html'; 

    } catch (error) {
        console.error("[Erro - Salvar Nova Senha]:", error);
        mostrarToast("Erro ao salvar a senha. Tente novamente."); // Toast de erro
    } finally {
        btnSalvarSenha.innerText = textoOriginal;
        btnSalvarSenha.disabled = false;
    }
});