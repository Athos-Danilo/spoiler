document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTOS DAS TELAS ---
    const blocoCategoria = document.getElementById('blocoCategoria');
    const blocoListas = document.getElementById('blocoListas');
    const blocoBriefing = document.getElementById('blocoBriefing');

    // --- BOTÕES DE AÇÃO ---
    const cardSeries = document.getElementById('cardSeries');
    const btnQuizFriends = document.getElementById('btnQuizFriends');
    
    const btnVoltarCategorias = document.getElementById('btnVoltarCategorias'); // Volta pro Bloco 1
    const btnVoltarLista = document.getElementById('btnVoltarLista'); // Volta pro Bloco 2
    
    const btnIniciarPartida = document.getElementById('btnIniciarPartida'); // O botão final

    // --- LÓGICA DE DIFICULDADE ---
    const botoesNivel = document.querySelectorAll('.btn-nivel');
    let nivelEscolhido = 'facil'; // Guarda a escolha do jogador

    // Função para gerenciar a seleção de dificuldade
    botoesNivel.forEach(botao => {
        botao.addEventListener('click', () => {
            // Remove a classe 'selecionado' de todos
            botoesNivel.forEach(b => b.classList.remove('selecionado'));
            // Adiciona no que foi clicado
            botao.classList.add('selecionado');
            // Salva a escolha
            nivelEscolhido = botao.getAttribute('data-nivel');
        });
    });

    // --- FLUXO DE NAVEGAÇÃO ---

    // 1. Clicou em SÉRIES -> Vai para a Lista
    cardSeries.addEventListener('click', () => {
        blocoCategoria.classList.add('tela-oculta'); 
        blocoListas.classList.remove('tela-oculta'); 
        blocoListas.classList.add('tela-Categoria'); // Reusa o layout flex
    });

    // 2. Clicou no FRIENDS -> Vai para a Sala de Briefing
    btnQuizFriends.addEventListener('click', () => {
        blocoListas.classList.add('tela-oculta');
        blocoListas.classList.remove('tela-Categoria');
        blocoBriefing.classList.remove('tela-oculta');
        blocoBriefing.classList.add('tela-Categoria'); // Reusa o layout flex
    });

    // 3. Voltar da Lista para Categorias
    btnVoltarCategorias.addEventListener('click', () => {
        blocoListas.classList.add('tela-oculta');
        blocoListas.classList.remove('tela-Categoria');
        blocoCategoria.classList.remove('tela-oculta'); 
    });

    // 4. Voltar do Briefing para a Lista
    btnVoltarLista.addEventListener('click', () => {
        blocoBriefing.classList.add('tela-oculta');
        blocoBriefing.classList.remove('tela-Categoria');
        blocoListas.classList.remove('tela-oculta');
        blocoListas.classList.add('tela-Categoria');
    });

    // 5. Clicou em INICIAR PARTIDA -> Foguete pra tela de jogo!
    btnIniciarPartida.addEventListener('click', () => {
        // Como estamos testando o MVP com o Friends, o tema fica fixo por enquanto.
        // Quando deixarmos o Bloco 2 dinâmico, pegaremos esse valor do card clicado!
        const temaEscolhido = 'friends'; 
        
        // Redireciona para a página do jogo passando o tema e o nível na URL
        window.location.href = `jogo.html?tema=${temaEscolhido}&dificuldade=${nivelEscolhido}`;
    });

});