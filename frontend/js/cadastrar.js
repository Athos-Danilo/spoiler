// ======> Variáveis e Mapeamento do HTML.
// Telas:
const telaPasso1 = document.getElementById('telaDados');
const telaPasso2 = document.getElementById('telaAvatar');

// Formulário:
const formCadastro = document.getElementById('formularioCadastro');

// Botões:
const btnContinuar = document.getElementById('btnContinuar');
const btnFinalizar = document.getElementById('btnFinalizar');

// Inputs:
const nickname = document.getElementById('nickname');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmarSenha');

// Avatar Padrão ou diferente se o usuário alterar.
let avatarEscolhido = '../img/avatares/claquete.png';


// ======> Carrossel das Imagens e Bolinhas.
const slides = document.querySelectorAll('.slide');
const bolinhas = document.querySelectorAll('.bola');
let slideAtual = 0;

function trocarImagemBolinha() {
    slides[slideAtual].classList.remove('ativo');
    bolinhas[slideAtual].classList.remove('ativo');
    slideAtual++;

    if (slideAtual >= slides.length) {
        slideAtual = 0;
    }

    slides[slideAtual].classList.add('ativo');
    bolinhas[slideAtual].classList.add('ativo');

}
setInterval(trocarImagemBolinha, 5000);


// ======> Mostrar/Esconder a Senha.
const iconeOlho = document.getElementById('olhoSenha');
const iconeOlhoConfirmar = document.getElementById('olhoConfirmar');

function mostrarSenha(iconeOlho, campoInput) {
    iconeOlho.addEventListener('click', () => {
        if (campoInput.type === 'password') {
            campoInput.type = 'text';
            iconeOlho.src = '../img/icone-olho-aberto.png';
    } else {
            campoInput.type = 'password';
            iconeOlho.src = '../img/icone-olho-fechado.png';
        }
    });
}

mostrarSenha(iconeOlho, senha);
mostrarSenha(iconeOlhoConfirmar, confirmarSenha);


// ======> Transição das Telas.
btnContinuar.addEventListener('click', () => {
    // 1. Validações
    if (!nickname.value || !email.value || !senha.value || !confirmarSenha.value) {
        mostrarToast('Por favor, preencha todos os campos.', 'aviso');
        return;
    }

    if (senha.value !== confirmarSenha.value) {
        mostrarToast('As senhas não coincidem.', 'erro');
        return;
    }

    // 2. Toca um som neutro de "avanço de tela" se quiser! (Opcional)
    // tocarSom('aviso'); 

    // 3. Aplica a classe que faz a Tela 1 deslizar para a esquerda e sumir
    telaPasso1.classList.add('deslizar-sair-esquerda');

    // 4. O Truque: Esperamos 500ms (meio segundo) que é o tempo exato da animação do CSS terminar
    setTimeout(() => {
        // Agora sim a gente esconde o esqueleto da Tela 1 de vez
        telaPasso1.style.display = 'none';
        
        // E mostramos a Tela 2
        telaPasso2.style.display = 'flex';
        
        // Só que ela entra engatando a animação de vir da direita!
        telaPasso2.classList.add('deslizar-entrar-direita');
    }, 500); 
});


// ======> Seleção do Avatar.
const avatares = document.querySelectorAll('.avatar');

avatares.forEach(divAvatar => {
    divAvatar.addEventListener('click', () => {
        avatares.forEach(a => a.classList.remove('selecionado'));

        divAvatar.classList.add('selecionado');

        const imgDentro = divAvatar.querySelector('img');
        avatarEscolhido = imgDentro.id + '.png';

        console.log("Avatar selecionado:", avatarEscolhido);
    });
});


// ======> Envio dos Dados para O BACKEND.
formCadastro.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const dadosNovoUsuario = {
        nickname: nickname.value,
        email: email.value,
        senha: senha.value,
        confirmSenha: confirmarSenha.value,
        avatar: avatarEscolhido
    };
    try {
        const btnFinalizar = document.getElementById('btnFinalizar');
        btnFinalizar.innerText = 'Criando Conta ...';
        btnFinalizar.disabled = true;

        const resposta = await fetch('http://localhost:3000/auth/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosNovoUsuario)
        });

        const data = await resposta.json(); 

        if (resposta.status === 201) {
            mostrarToast("Conta criada com sucesso! Bem-vindo(a) ao Spoiler");
            
            setTimeout(() => {
                window.location.href = 'entrar.html';
            }, 2000);

        } else {
            mostrarToast("Erro: " + data.msg, 'erro');
            btnFinalizar.innerText = 'Pronto Para Jogar';
            btnFinalizar.disabled = false;
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        mostrarToast("Erro ao conectar com o servidor. Verifique se o Backend está rodando!");
        
        const btnFinalizar = document.getElementById('btnFinalizar');
        btnFinalizar.innerText = 'Pronto Para Jogar';
        btnFinalizar.disabled = false;
    }
});

    