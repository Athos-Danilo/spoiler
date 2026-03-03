document.addEventListener('DOMContentLoaded', () => {
    
    // --- ESTADO DO JOGO ---
    let perguntasDaAPI = []; // Agora começa vazio, esperando o MongoDB!
    let indiceAtual = 0;
    let pontos = 0;

    // --- ELEMENTOS DA TELA ---
    const textoPergunta = document.getElementById('textoPergunta');
    const areaAlternativas = document.getElementById('areaAlternativas');
    const contadorPergunta = document.getElementById('contadorPergunta');
    const displayPontuacao = document.getElementById('pontuacao');
    const btnProxima = document.getElementById('btnProxima');

    // =======================================================
    // 1. CHAMA O BACKEND (Node.js + MongoDB)
    // =======================================================
    async function buscarPerguntasDoBanco() {
        try {
            textoPergunta.innerText = "Buscando o roteiro no banco de dados...";
            
            // 1. LER A URL QUE VEIO DA TELA ANTERIOR
            const parametros = new URLSearchParams(window.location.search);
            const tema = parametros.get('tema') || 'friends'; // Se não vier nada, assume friends
            const dificuldade = parametros.get('dificuldade') || 'facil'; // Se não vier, assume facil

            // 2. MONTAR A URL DA API DINAMICAMENTE
            const urlApi = `http://localhost:3000/questoes/todas?tema=${tema}&dificuldade=${dificuldade}`;
            
            const resposta = await fetch(urlApi);
            
            if (!resposta.ok) {
                throw new Error("Corte! Falha na rede.");
            }
            
            perguntasDaAPI = await resposta.json();
            
            if (perguntasDaAPI.length > 0) {
                carregarPergunta(); // Ação! Começa o jogo
            } else {
                textoPergunta.innerText = "Nenhuma pergunta encontrada para este tema!";
            }
            
        } catch (erro) {
            console.error("Erro no set de gravação:", erro);
            textoPergunta.innerText = "Erro ao conectar com a API. O servidor Node está rodando?";
        }
    }

    // =======================================================
    // 2. MONTA A PERGUNTA NA TELA
    // =======================================================
    function carregarPergunta() {
        btnProxima.classList.add('btn-oculto');
        areaAlternativas.innerHTML = '';
        
        const perguntaAtual = perguntasDaAPI[indiceAtual];
        
        // Atualiza textos do cabeçalho
        textoPergunta.innerText = perguntaAtual.pergunta;
        contadorPergunta.innerText = `Pergunta ${indiceAtual + 1}/${perguntasDaAPI.length}`;

        // Cria os botões de alternativa
        perguntaAtual.alternativas.forEach((texto, index) => {
            const botao = document.createElement('button');
            botao.classList.add('btn-alternativa');
            botao.innerText = texto; // Ex: "Hugsy"
            
            // Lógica de clique (Passamos a String correta agora!)
            botao.addEventListener('click', () => {
                verificarResposta(botao, texto, perguntaAtual.resposta_correta, perguntaAtual.alternativas);
            });
            
            areaAlternativas.appendChild(botao);
        });
    }

    // =======================================================
    // 3. VALIDA O ACERTO COM BASE NO TEXTO (STRING)
    // =======================================================
    function verificarResposta(botaoClicado, textoClicado, textoCorreto, arrayAlternativas) {
        const todosBotoes = document.querySelectorAll('.btn-alternativa');
        todosBotoes.forEach(btn => btn.disabled = true); // Trava os cliques

        // Verifica se a String clicada é igual à String correta do Banco
        if (textoClicado === textoCorreto) {
            botaoClicado.classList.add('correta');
            pontos += 10;
            displayPontuacao.innerText = pontos;
        } else {
            botaoClicado.classList.add('errada');
            
            // Como sabemos qual era o botão certo para pintar de verde?
            // Achamos o índice da String correta dentro do array do banco!
            const indiceCorreto = arrayAlternativas.indexOf(textoCorreto);
            if (indiceCorreto !== -1) {
                todosBotoes[indiceCorreto].classList.add('correta');
            }
        }

        btnProxima.classList.remove('btn-oculto');
    }

    // O resto do seu código (btnProxima, finalizarJogo) continua exatamente igual aqui pra baixo...
    
    // Inicia a busca assim que a tela abre!
    buscarPerguntasDoBanco();

    // =======================================================
    // Ação do Botão Próxima Pergunta
    // =======================================================
    btnProxima.addEventListener('click', () => {
        indiceAtual++;
        
        // Verifica se o quiz acabou usando a NOVA lista do Banco de Dados!
        if (indiceAtual < perguntasDaAPI.length) {
            carregarPergunta();
        } else {
            finalizarJogo(); 
        }
    });

    // =======================================================
    // Finalizando o Jogo e Mostrando o Placar
    // =======================================================
    function finalizarJogo() {
        const telaQuiz = document.querySelector('.tela-jogo');
        const telaResultado = document.getElementById('telaResultado');
        const pontuacaoFinal = document.getElementById('pontuacaoFinal');
        const mensagemResultado = document.getElementById('mensagemResultado');

        // Esconde o Quiz e Mostra o Resultado
        telaQuiz.classList.add('btn-oculto');
        telaResultado.classList.remove('tela-oculta');

        // Atualiza a Pontuação Final
        pontuacaoFinal.innerText = pontos;

        // Calcula o máximo de pontos baseando na NOVA lista do Banco de Dados!
        const totalPontosPossiveis = perguntasDaAPI.length * 10;
        
        // Evita erro se o banco não trouxer nada
        if (totalPontosPossiveis === 0) {
            mensagemResultado.innerText = "Nenhuma pergunta foi encontrada para pontuar.";
            return;
        }

        // Feedback Personalizado
        if (pontos === totalPontosPossiveis) {
            mensagemResultado.innerText = "Impecável! Você poderia ser o diretor desse filme!";
        } else if (pontos >= (totalPontosPossiveis / 2)) {
            mensagemResultado.innerText = "Mandou muito bem! Você definitivamente prestou atenção nas maratonas.";
        } else {
            mensagemResultado.innerText = "Foi por pouco! Acho que tá na hora de fazer uma nova maratona, hein?";
        }
    }

    // Ação do botão "Jogar Novamente"
    const btnJogarNovamente = document.getElementById('btnJogarNovamente');
    if(btnJogarNovamente) {
        btnJogarNovamente.addEventListener('click', () => {
            indiceAtual = 0;
            pontos = 0;
            displayPontuacao.innerText = pontos;

            document.getElementById('telaResultado').classList.add('tela-oculta');
            document.querySelector('.tela-jogo').classList.remove('btn-oculto');

            carregarPergunta();
        });
    }
});