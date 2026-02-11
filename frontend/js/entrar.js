// ---> Selecionando os Elementos.
const imagens = document.querySelectorAll('.slide');
const nomeUsuario = document.getElementById('nomeUsuario');
const senha = document.getElementById('senha');
const iconeOlho = document.querySelector('.icone-ver-senha');
const formulario = document.querySelector('.login-formulario');
const bolinhas = document.querySelectorAll('.bola');

// ---> Carrosel das Imagens e Bolinhas.
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