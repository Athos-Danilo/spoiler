document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTOS DAS TELAS ---
    const blocoCategoria = document.getElementById('blocoCategoria');
    const blocoListas = document.getElementById('blocoListas');
    const blocoBriefing = document.getElementById('blocoBriefing');

    // --- ELEMENTOS DE CONTROLE ---
    const cardFilmes = document.getElementById('cardFilmes');
    const cardSeries = document.getElementById('cardSeries');
    const listaFilmes = document.getElementById('listaFilmes');
    const listaSeries = document.getElementById('listaSeries');
    const tituloLista = document.getElementById('tituloLista');
    
    const btnVoltarCategorias = document.getElementById('btnVoltarCategorias');
    const btnVoltarLista = document.getElementById('btnVoltarLista');
    const btnIniciarPartida = document.getElementById('btnIniciarPartida');

    // --- ELEMENTOS DO BRIEFING PARA MUDAR DINAMICAMENTE ---
    const imgBriefing = document.querySelector('.banner-quiz img');
    const tituloBriefing = document.querySelector('.titulo-briefing');
    const sinopseBriefing = document.querySelector('.sinopse-quiz');

    // --- VARIÁVEIS DE JOGO ---
    let nivelEscolhido = 'facil';
    let temaEscolhido = ''; 

    // --- DADOS TEMPORÁRIOS DO BRIEFING (No futuro virá do banco) ---
    const dadosBriefing = {
        'friends': {
            imagem: '../img/friends.jpg',
            titulo: 'Friends',
            sinopse: '"Aquele em que você testa seus conhecimentos". Relembre os melhores momentos no Central Perk e prove que você é o 7º membro do grupo!'
        },
        'exterminador': {
            imagem: '../img/exterminador.jpg', // A foto que você salvou!
            titulo: 'O Exterminador',
            sinopse: '"I\'ll be back". Teste seus conhecimentos sobre a Skynet, viagens no tempo e a rebelião das máquinas. Você é a resistência!'
        }
    };

    // --- LÓGICA DE DIFICULDADE ---
    const botoesNivel = document.querySelectorAll('.btn-nivel');
    botoesNivel.forEach(botao => {
        botao.addEventListener('click', () => {
            botoesNivel.forEach(b => b.classList.remove('selecionado'));
            botao.classList.add('selecionado');
            nivelEscolhido = botao.getAttribute('data-nivel');
        });
    });

    // --- FLUXO DE NAVEGAÇÃO ---

    // 1. Clicou em FILMES
    cardFilmes.addEventListener('click', () => {
        abrirLista('Filmes', listaFilmes, listaSeries);
    });

    // 2. Clicou em SÉRIES
    cardSeries.addEventListener('click', () => {
        abrirLista('Séries', listaSeries, listaFilmes);
    });

    function abrirLista(nomeCategoria, listaMostrar, listaEsconder) {
        tituloLista.innerText = `Quizzes de ${nomeCategoria}`;
        listaMostrar.classList.remove('tela-oculta');
        listaEsconder.classList.add('tela-oculta');
        
        blocoCategoria.classList.add('tela-oculta'); 
        blocoListas.classList.remove('tela-oculta'); 
        blocoListas.classList.add('tela-Categoria'); 
    }

    // 3. Clicou em ALGUM JOGO (Filme ou Série)
    const botoesJogos = document.querySelectorAll('.btn-abrir-briefing');
    botoesJogos.forEach(botao => {
        botao.addEventListener('click', () => {
            temaEscolhido = botao.getAttribute('data-tema'); // Pega 'friends' ou 'exterminador'
            
            // Injeta os dados na Sala de Briefing
            imgBriefing.src = dadosBriefing[temaEscolhido].imagem;
            tituloBriefing.innerText = dadosBriefing[temaEscolhido].titulo;
            sinopseBriefing.innerText = dadosBriefing[temaEscolhido].sinopse;

            // Troca a tela
            blocoListas.classList.add('tela-oculta');
            blocoListas.classList.remove('tela-Categoria');
            blocoBriefing.classList.remove('tela-oculta');
            blocoBriefing.classList.add('tela-Categoria');
        });
    });

    // 4. Botões de Voltar
    btnVoltarCategorias.addEventListener('click', () => {
        blocoListas.classList.add('tela-oculta');
        blocoListas.classList.remove('tela-Categoria');
        blocoCategoria.classList.remove('tela-oculta'); 
    });

    btnVoltarLista.addEventListener('click', () => {
        blocoBriefing.classList.add('tela-oculta');
        blocoBriefing.classList.remove('tela-Categoria');
        blocoListas.classList.remove('tela-oculta');
        blocoListas.classList.add('tela-Categoria');
    });

    // 5. Clicou em INICIAR PARTIDA
    btnIniciarPartida.addEventListener('click', () => {
        // Agora o 'temaEscolhido' é dinâmico, baseado no botão que ele clicou!
        window.location.href = `jogo.html?tema=${temaEscolhido}&dificuldade=${nivelEscolhido}`;
    });

});