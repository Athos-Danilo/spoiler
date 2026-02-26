// ======> Variáveis e Mapeamento do HTML.
// 1) Caixinhas e Containers.
const caixasToken = document.querySelectorAll('.caixa-token');
const containerVerificar = document.querySelector('.container-verificar');
const containerSenha = document.querySelector('.container-senha');

// 2) Formulários e Botões.
const formVerificar = document.getElementById('formVerificar');
const btnVerificar = document.getElementById('verificarCodigo');
const btnReenviar = document.getElementById('reenviarCodigo'); 
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


// ======> 1. Verificar o Código de 6 Dígitos.
// 1) Impedir recarregamento da página;
// 2) Juntar os 6 números em uma única string "Token";
// 3) Enviar para a API para validar o Token;
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
        mostrarToast("error", "Por favor, preencha os 6 dígitos do código."); 
        return;
    }

    // Feedback visual de carregamento.
    const textoOriginal = btnVerificar.innerText;
    btnVerificar.innerText = 'Verificando...';
    btnVerificar.disabled = true;

    try {
        // Resgata o e-mail que salvamos na tela anterior.
        const emailSalvo = sessionStorage.getItem('emailRecuperacao');

        const response = await fetch('http://localhost:3000/auth/validar-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailSalvo, token: tokenDigitado })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || 'Código inválido ou expirado.');
        }

        // Troca de Telas. 
        containerVerificar.style.display = 'none';
        containerSenha.style.display = 'flex';
        
        mostrarToast('success', "Código validado! Crie sua nova senha.");

    } catch (error) {
        console.error("[Erro - Verificar Token]:", error);
        mostrarToast('error', error.message);
    } finally {
        btnVerificar.innerText = textoOriginal;
        btnVerificar.disabled = false;
    }
});


// ======> 2. Reenviar o Código de Segurança.
// 1) Captura o clique no botão de reenviar;
// 2) Resgata o e-mail do sessionStorage;
// 3) Chama a rota de recuperação para gerar um novo código;
// 4) Bloqueia o botão por 60 segundos.
// ---------------------------------------------------------------- //

btnReenviar.addEventListener('click', async (event) => {
    event.preventDefault(); 

    const emailSalvo = sessionStorage.getItem('emailRecuperacao');

    if (!emailSalvo) {
        mostrarToast('error', 'E-mail não encontrado. Por favor, volte ao início.');
        return;
    }

    // Feedback visual de carregamento no botão
    const textoOriginal = btnReenviar.innerText;
    btnReenviar.innerText = 'Enviando...';
    btnReenviar.style.pointerEvents = 'none'; 
    btnReenviar.style.opacity = '0.5';

    try {
        const response = await fetch('http://localhost:3000/auth/recuperar-conta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailSalvo })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || 'Erro ao tentar reenviar o e-mail.');
        }

        mostrarToast('success', 'Novo código enviado! Verifique sua caixa de entrada.');

        let tempoRestante = 60;
        btnReenviar.innerText = `Aguarde ${tempoRestante}s`;
        
        const temporizador = setInterval(() => {
            tempoRestante--;
            btnReenviar.innerText = `Aguarde ${tempoRestante}s`;
            
            if (tempoRestante <= 0) {
                clearInterval(temporizador);
                btnReenviar.innerText = textoOriginal;
                btnReenviar.style.pointerEvents = 'auto';
                btnReenviar.style.opacity = '1';
            }
        }, 1000);

    } catch (error) {
        console.error("[Erro - Reenviar Código]:", error);
        mostrarToast('error', error.message);
        
        // Se der erro, libera o botão imediatamente para ele tentar de novo.
        btnReenviar.innerText = textoOriginal;
        btnReenviar.style.pointerEvents = 'auto';
        btnReenviar.style.opacity = '1';
    }
});


// ======> 3. Mostrar/Esconder Senha.
// 1) Função para trocar o type do input (password <-> text);
// 2) Mudar o ícone.
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


// ======> 4. Salvar a Nova Senha
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
        mostrarToast("error", "A senha deve ter pelo menos 6 caracteres."); 
        return;
    }

    if (novaSenha !== confirmacao) {
        mostrarToast("error", "As senhas não conferem. Digite novamente."); 
        return;
    }

    const textoOriginal = btnSalvarSenha.innerText;
    btnSalvarSenha.innerText = 'Salvando...';
    btnSalvarSenha.disabled = true;

    try {
        const emailSalvo = sessionStorage.getItem('emailRecuperacao');

        const response = await fetch('http://localhost:3000/auth/resetar-senha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailSalvo, novaSenha: novaSenha })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || 'Erro ao tentar salvar a senha.');
        }

        sessionStorage.removeItem('emailRecuperacao');

        mostrarToast('success', "Senha alterada com sucesso! Faça login para jogar."); 

        // Aguarda o Toast aparecer antes de jogar pro Login.
        setTimeout(() => {
            window.location.href = 'entrar.html'; 
        }, 2000);

    } catch (error) {
        console.error("[Erro - Salvar Nova Senha]:", error);
        mostrarToast("error", "Erro ao salvar a senha. Tente novamente.");
    } finally {
        btnSalvarSenha.innerText = textoOriginal;
        btnSalvarSenha.disabled = false;
    }
});