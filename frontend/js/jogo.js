document.addEventListener('DOMContentLoaded', () => {
    
    // Nosso Banco de Dados Provisório (Nível Fácil do Friends)
    const perguntasFriends = [
        {
            pergunta: "Quantas vezes o Ross se divorciou durante a série?",
            alternativas: ["Nenhuma", "Uma", "Duas", "Três"],
            correta: 3 // O índice da resposta certa (0, 1, 2, 3) -> 3 = "Três"
        },
        {
            pergunta: "Qual é o nome do pinguim de pelúcia do Joey?",
            alternativas: ["Hugsy", "Waddle", "Snowball", "Flippers"],
            correta: 0 
        },
        {
            pergunta: "Qual personagem fala a famosa frase 'We were on a break!'?",
            alternativas: ["Chandler", "Monica", "Ross", "Rachel"],
            correta: 2
        }
    ];

    // Variáveis de Controle
    let indiceAtual = 0;
    let pontos = 0;

    // Elementos da Tela
    const textoPergunta = document.getElementById('textoPergunta');
    const areaAlternativas = document.getElementById('areaAlternativas');
    const contadorPergunta = document.getElementById('contadorPergunta');
    const displayPontuacao = document.getElementById('pontuacao');
    const btnProxima = document.getElementById('btnProxima');

    // Inicia o Jogo
    carregarPergunta();

    function carregarPergunta() {
        // Reseta a tela
        btnProxima.classList.add('btn-oculto');
        areaAlternativas.innerHTML = '';
        
        const perguntaAtual = perguntasFriends[indiceAtual];
        
        // Atualiza textos do cabeçalho
        textoPergunta.innerText = perguntaAtual.pergunta;
        contadorPergunta.innerText = `Pergunta ${indiceAtual + 1}/${perguntasFriends.length}`;

        // Cria os botões de alternativa
        perguntaAtual.alternativas.forEach((texto, index) => {
            const botao = document.createElement('button');
            botao.classList.add('btn-alternativa');
            botao.innerText = texto;
            
            // Lógica de clique na resposta
            botao.addEventListener('click', () => {
                verificarResposta(botao, index, perguntaAtual.correta);
            });
            
            areaAlternativas.appendChild(botao);
        });
    }

    function verificarResposta(botaoClicado, indiceClicado, indiceCorreto) {
        const todosBotoes = document.querySelectorAll('.btn-alternativa');
        
        // Trava todos os botões para o usuário não clicar duas vezes
        todosBotoes.forEach(btn => btn.disabled = true);

        // Verifica se acertou
        if (indiceClicado === indiceCorreto) {
            botaoClicado.classList.add('correta');
            pontos += 10; // Ganha 10 pontos por acerto
            displayPontuacao.innerText = pontos;
        } else {
            botaoClicado.classList.add('errada');
            // Mostra qual era a certa pintando ela de verde
            todosBotoes[indiceCorreto].classList.add('correta');
        }

        // Mostra o botão de ir para a próxima
        btnProxima.classList.remove('btn-oculto');
    }

    // Ação do Botão Próxima Pergunta
    // Ação do Botão Próxima Pergunta
    btnProxima.addEventListener('click', () => {
        indiceAtual++;
        
        // Verifica se o quiz acabou
        if (indiceAtual < perguntasFriends.length) {
            carregarPergunta();
        } else {
            finalizarJogo(); // Chama a nova função!
        }
    });

    function finalizarJogo() {
        // Pega os elementos das duas telas
        const telaQuiz = document.querySelector('.tela-jogo');
        const telaResultado = document.getElementById('telaResultado');
        const pontuacaoFinal = document.getElementById('pontuacaoFinal');
        const mensagemResultado = document.getElementById('mensagemResultado');

        // Esconde o Quiz e Mostra o Resultado
        telaQuiz.classList.add('btn-oculto');
        telaResultado.classList.remove('tela-oculta');

        // Atualiza a Pontuação Final na Tela
        pontuacaoFinal.innerText = pontos;

        // Feedback Personalizado
        const totalPontosPossiveis = perguntasFriends.length * 10;
        
        if (pontos === totalPontosPossiveis) {
            mensagemResultado.innerText = "Impecável! Você poderia tomar um café no Central Perk com o elenco!";
        } else if (pontos >= 20) {
            mensagemResultado.innerText = "Mandou muito bem! Você definitivamente prestou atenção nas maratonas.";
        } else {
            mensagemResultado.innerText = "Foi por pouco! Acho que tá na hora de fazer uma nova maratona, hein?";
        }
    }

    // Ação do botão "Jogar Novamente"
    const btnJogarNovamente = document.getElementById('btnJogarNovamente');
    btnJogarNovamente.addEventListener('click', () => {
        // Reseta as variáveis
        indiceAtual = 0;
        pontos = 0;
        displayPontuacao.innerText = pontos;

        // Esconde o resultado e mostra o quiz
        document.getElementById('telaResultado').classList.add('tela-oculta');
        document.querySelector('.tela-jogo').classList.remove('btn-oculto');

        // Começa de novo
        carregarPergunta();
    });

});