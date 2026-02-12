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
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const usuarioDigitado = nomeUsuario.value;
    const senhaDigitada = senha.value;

    if (usuarioDigitado === "" || senhaDigitada === "") {
        alert("Preencha todos os campos!");
        return;
    }

    console.log("Tentativa de Login");
    console.log("Usuário:", usuarioDigitado);
    console.log("Senha:", senhaDigitada);

    alert("Login realizado com sucesso! Bem-vindo(a), " + usuarioDigitado + "!");
});