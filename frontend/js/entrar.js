// ---> Selecionando os Elementos.
const imagens = document.querySelectorAll('.slide');
const nomeUsuario = document.getElementById('nomeUsuario');
const senha = document.getElementById('senha');
const iconeOlho = document.querySelector('.icone-ver-senha');
const formulario = document.querySelector('.login-formulario');
const bolinhas = document.querySelectorAll('.bola');

// ---> Carrossel das Imagens e Bolinhas.
let indiceAtual = 0;

function trocarImagemBolinha() {
    imagens[indiceAtual].classList.remove('ativo');
    bolinhas[indiceAtual].classList.remove('ativo');
    indiceAtual++;

    if (indiceAtual >= imagens.length) {
        indiceAtual = 0;
    }

    imagens[indiceAtual].classList.add('ativo');
    bolinhas[indiceAtual].classList.add('ativo');

}
setInterval(trocarImagemBolinha, 5000);

// ---> Ver Senha.
iconeOlho.addEventListener('click', function() {
    if (senha.type === 'password') {
        senha.type = 'text';
        senha.placeholder = 'Senha Visível';
        iconeOlho.src = '../img/icone-olho-aberto.png';
    }
    else {
        senha.type = 'password';
        senha.placeholder = 'Senha';
        iconeOlho.src = '../img/icone-olho-fechado.png'
    }
});

// ---> Login.
formulario.addEventListener('submit', async function(event) {
    // 1. Impede que a página recarregue
    event.preventDefault();

    // 2. Prepara os dados para enviar
    // NOTA: O backend espera "email", mas seu input chama "nomeUsuario".
    // Vamos assumir que o usuário digita o E-MAIL no campo de login.
    const dadosLogin = {
        nickname: nomeUsuario.value, 
        senha: senha.value
    };

    try {
        // 3. A Requisição (O Carteiro)
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST', // Estamos enviando dados
            headers: {
                'Content-Type': 'application/json' // Avisa que é JSON
            },
            body: JSON.stringify(dadosLogin) // Transforma o objeto JS em texto JSON
        });

        // 4. Recebe a resposta do Backend
        const data = await response.json();

        // 5. Verifica se deu certo
        if (response.ok) {
            // SUCESSO! 
            
            // Salva o Token e o Usuário no navegador (memória local)
            localStorage.setItem('spoilerToken', data.token);
            localStorage.setItem('spoilerUser', JSON.stringify(data.user));

            console.log("Login feito! Token salvo:", data.token);
            
            // Feedback visual e Redirecionamento
            mostrarToast("Login realizado com sucesso! Bem-vindo(a), " + data.user.nickname);
            
            // Redireciona para a página do jogo (vamos criar ela a seguir)
            window.location.href = 'game.html'; 

        } else {
            // ERRO (Senha errada ou usuário não existe) 
            mostrarToast("Erro: " + data.msg); // Mostra a mensagem que veio do Backend
        }

    } catch (error) {
        // Erro de conexão (ex: Servidor desligado)
        console.error("Erro na requisição:", error);
        mostrarToast("Erro ao conectar com o servidor. Verifique se o Backend está rodando!");
    }
});