**Nome do Projeto:** Spoiler

**Slogan:** "Você sabe tanto que é um Spoiler ambulante."

**Versão:** 1.2 

**Status:** Desenvolvimento

**Data de Atualização:** 20/02/2026

**1\. Visão Geral do Produto**

O **Spoiler** é um Web App de Quiz estilo "Arcade" focado no universo de Filmes e Séries. Diferente de quizes estáticos, o projeto foca na gamificação, pressão de tempo e gestão de recursos (pontos), oferecendo uma experiência competitiva e dinâmica. O sistema não apenas testa o conhecimento, mas a estratégia do usuário. Através de um sistema de "Ajudas Pagas", o jogador deve decidir entre arriscar uma resposta rápida para maximizar pontos ou gastar seu saldo para garantir o acerto.

**2\. Decisões Técnicas e Justificativas**

Abaixo, detalhamos as escolhas arquiteturais e o "porquê" de cada decisão.

**2.1. Stack Tecnológica**

* **Frontend:** HTML5, CSS3 (com Animações) e JavaScript (Vanilla).

  * *Justificativa:* Evitar a complexidade de frameworks (React/Vue) neste momento permite focar na lógica pura do JavaScript e no entendimento profundo do ciclo de vida do DOM e requisições HTTP.

* **Backend:** Node.js com Express.

  * *Justificativa:* Permite usar JavaScript em ambas as pontas (Front e Back), unificando a linguagem do projeto.

* **Banco de Dados:** MongoDB (NoSQL) com Mongoose.

  * *Justificativa:*

    * **Flexibilidade:** Documentos JSON permitem que a estrutura das perguntas evolua (ex: adicionar campos de imagem futuramente) sem quebrar o banco.

    * **Performance:** A leitura de dados é extremamente rápida, ideal para o fluxo de "clique e resposta" de um quiz. Evita a complexidade de *JOINs* do SQL.

      

**2.2. Design de Jogabilidade (Gameplay)**

* **Modo Arcade (10 Perguntas Fixas):**

  * *Justificativa:* Para aumentar a retenção do usuário.

* **Mobile First:**

  * *Justificativa:* A natureza casual do jogo sugere uso em momentos de pausa (celular). A interface será projetada para telas pequenas e expandida para desktops.

**3\. Requisitos Funcionais (RF)**

*O que o sistema deve fazer (Funcionalidades visíveis ao usuário).*

**Gestão de Conta:**

* **RF01 \- Autenticação Completa:** O sistema deve permitir Cadastro (Email, Senha, Nickname, Avatar) e Login.

* **RF02 \- Gestão de Perfil:** O usuário poderá alterar seu avatar e nickname.

* **RF03 \- Exclusão de Conta:** O usuário deve ter a opção de excluir sua conta e dados permanentemente.

* **RF04 \- Recuperação de Senha:** Implementação de fluxo de "Esqueci minha senha" (envio de link/token via e-mail).

* **RF05 \- Sessão sem Cadastro:** Permitir que o jogo possa ser jogado sem cadastrar uma conta.

**Execução do Jogo:**

* **RF06 \- Configuração da Partida:** O usuário seleciona a Categoria (Filmes ou Séries) e o Nível de Dificuldade (Fácil, Médio, Difícil).

* **RF07 \- Mecânica de Quiz:** O sistema apresenta 10 perguntas sequenciais. Cada pergunta possui um enunciado e 4 alternativas (A, B, C, D).

* **RF08 \- Temporizador Regressivo:** Cada pergunta possui um tempo limite baseado na dificuldade. Se o tempo esgotar, conta-se como erro.

* **RF09 \- Feedback Audiovisual:** O sistema deve emitir sons e alteração de cores imediatas ao selecionar uma resposta (Verde/Acerto ou Vermelho/Erro).

* **RF10 \- Tutorial/Regras:** Tela informativa explicando como a pontuação é calculada e o funcionamento das ajudas.

* **RF11 \- Estatísticas de Escolha dos Jogadores:** O sistema deve registrar cada alternativa selecionada pelos usuários em uma pergunta e, se a resposta do jogador atual for incorreta, o sistema deve exibir a porcentagem de vezes que cada alternativa foi escolhida pela comunidade.

* **RF12 \- Sistema de Curiosidades:** O sistema deve suportar o envio de uma curiosidade sobre o tema da pergunta após ela ser respondida. O frontend deve validar o conteúdo e exibir a curiosidade apenas se houver um texto personalizado cadastrado, ocultando a interface caso receba o valor padrão do sistema.

* **RF13 \- Sistema de Report (Denúncia de Erro):** O sistema deve permitir que o jogador reporte uma pergunta imediatamente após respondê-la (sinalizando erro de gabarito, digitação ou ofensa). Esse report será encaminhado silenciosamente para a fila de revisão do painel administrativo.

**Sistema de Ajudas:**

* **RF14 \- Menu de Ajudas:** Durante a partida, o usuário terá acesso a 3 botões de ajuda.

* **RF15 \- Validação de Compra:** O sistema deve bloquear (desabilitar) o botão de ajuda caso o usuário não tenha saldo de pontos suficiente na partida atual.

* **RF16 \- Simulação de "Universitários":** O sistema deve gerar gráficos de votação fictícios, onde a precisão da "plateia virtual" varia conforme a dificuldade da pergunta.

**Social e Dados:**

* **RF17 \- Ranking Global:** Exibição de um Leaderboard com os **Top 50** melhores pontuadores (com paginação ou scroll infinito).

* **RF18 \- Histórico de Partidas:** O usuário pode visualizar um log de suas últimas partidas e pontuações.

* **RF19 \- Aviso:** O sistema deve exibir uma tela de aviso para usuários que não estiverem logados, informando que o progresso do jogo não será salvo caso não realizem o cadastro.

* **RF20 \- Compartinhar:** O usuário pode compartilhar sua pontuação e quiz favorito.

* **RF21 \- Classificação Temática:** O sistema deve permitir a classificação das perguntas não apenas por categoria geral (ex: Filmes ou Séries), mas também por temas ou franquias específicas (ex: Marvel, Harry Potter, Friends), permitindo futura filtragem e criação de salas temáticas.

* **RF22 \- Sistema de Notificações:** O sistema deve possuir uma central de notificações ou alertas para o jogador, onde ele receberá mensagens de retorno da administração (ex: um aviso de resolução e agradecimento por um erro reportado validado pela equipe).

**Módulo Administrativo:**

* **RF23 \- Interface Otimizada para Desktop:** A interface do painel administrativo deve ser desenvolvida com abordagem Desktop First, garantindo melhor visualização de tabelas de dados e gráficos de estatísticas, não sendo obrigatória a responsividade para dispositivos móveis.

* **RF24 \- Controle de Acesso:** O sistema deve diferenciar contas de "Jogadores" e contas de "Administradores". O acesso ao painel e às rotas de criação/edição de perguntas deve ser bloqueado para usuários comuns através de validação de token (Middleware).

* **RF25 \- Dashboard de Estatísticas Globais:** O painel deve exibir um resumo analítico em tempo real contendo: quantidade total de usuários cadastrados, total de perguntas no banco de dados e volume total de perguntas já respondidas pela comunidade.

* **RF26 \- Gestão de Conteúdo:** O administrador deve conseguir criar novas perguntas, visualizar a lista completa do banco de dados, editar perguntas existentes (corrigir erros de digitação ou alterar gabaritos) e inativar perguntas para que deixem de aparecer no jogo.

* **RF27 \- Monitoramento de Desempenho do Quiz:** O sistema deve fornecer relatórios sobre o engajamento das perguntas, destacando estatísticas como as taxas de acerto e erro, permitindo identificar as perguntas "mais fáceis" e as "mais difíceis" da base.

* **RF28 \- Caixa de Entrada de Reports:** O painel deve possuir uma área dedicada para listar as denúncias feitas pelos jogadores, permitindo ao administrador avaliar a queixa, corrigir a pergunta diretamente e marcar o report como "Resolvido".

**4\. Regras de Negócio (RN)**

*As leis e lógicas matemáticas que governam o comportamento do sistema.*

**Tempo e Dificuldade:**

* **RN01 \- Definição de Tempos:** O tempo limite para resposta varia conforme a dificuldade escolhida:

  * **Fácil:** 20 segundos.

  * **Médio:** 15 segundos.

  * **Difícil:** 12 segundos.

* **RN02 \- Sistema de Pontuação:** A pontuação premia a agilidade.

  * *Fórmula:* Pontos \= (Base da Dificuldade) \+ (Segundos Restantes \* 10\)

  * *Bases:* Fácil (100pts), Médio (200pts), Difícil (300pts).

**Mecânica das Ajudas:**

* **RN03 \- Custo de Oportunidade:** O uso de ajudas consome pontos do saldo atual da partida.

  * **Cartas (Sorte):** Custo **\-25 pts**.

  * **50/50 (Eliminação):** Custo **\-50 pts**.

  * **Universitários (Probabilidade):** Custo **\-75 pts**.

* **RN04 \- Bônus Tático de Tempo:** Ao ativar uma ajuda, o sistema deve adicionar segundos extras ao cronômetro para compensar o tempo de leitura da dica:

  * *Fácil:* \+8 seg | *Médio:* \+6 seg | *Difícil:* \+4 seg.

* **RN05 \- Limites:**

  * Cada tipo de ajuda só pode ser usada **uma vez** por partida.

  * O uso é bloqueado se Pontuação Atual \< Custo da Ajuda.

  * O uso de ajuda não pode resultar em pontuação negativa.

**Ciclo de Vida do Conteúdo (Algoritmo de Não-Repetição)**

* **RN06 \- Randomização:** Perguntas e ordem das alternativas devem ser embaralhadas via algoritmo (ex: Fisher-Yates Shuffle) a cada nova renderização.

* **RN07 \- Prioridade de Inéditas:** O sistema deve consultar o histórico do usuário e buscar, prioritariamente, IDs de perguntas que não constam na lista seen\_questions.

* **RN08 \- O "Reset" de Histórico:** Caso o sistema detecte que todas as perguntas disponíveis para aquele Tema/Dificuldade já foram respondidas pelo usuário (Esgotamento do Banco), o histórico de visualização daquele tema específico é limpo, permitindo que as perguntas apareçam novamente.

  * *Meta de Variedade:* O objetivo para a versão estável é ter **30 perguntas por nível** (Total 90 por tema) para garantir variedade antes do reset.

* **RN09 \- Formato:** As perguntas serão exclusivamente textuais (sem imagens no enunciado nesta versão v1.0).

**5\. Requisitos Não-Funcionais (RNF)**

*Critérios de qualidade técnica.*

* **RNF01 \- Responsividade (Mobile First):** A interface deve ser projetada prioritariamente para telas verticais (celulares), adaptando-se via Media Queries para Tablets e Desktops.

* **RNF02 \- UX/UI Animations:** Uso obrigatório de CSS Transitions para feedbacks de acerto/erro e transição suave entre perguntas, evitando cortes bruscos.

* **RNF03 \- Segurança de Dados:** Senhas de usuários devem ser criptografadas (Hash) antes de serem salvas no banco. Recomenda-se uso de bibliotecas como bcrypt.

**6\. Lógica dos Algoritmos de Ajuda**

Especificação técnica de como programar as ajudas no Frontend/Backend:

1. **50/50:**

   * *Lógica:* Identificar a correctOptionId. Listar as 3 opções erradas. Selecionar randomicamente 2 das erradas e aplicar estilo CSS display: none ou visibility: hidden.

2. **Universitários (Simulação):**

   * *Lógica:* Baseada em probabilidade.

   * *Se Pergunta Fácil:* Gerar array onde a opção correta tem 80% de chance de ser a mais votada.

   * *Se Pergunta Difícil:* Distribuir porcentagens de forma mais homogênea (ex: Correta 40%, Errada A 30%, Errada B 20%...), aumentando o risco.

3. **Cartas (Sorteio):**

   * *Lógica:* O usuário clica em uma carta virada (1 a 4). O sistema sorteia um efeito:

     * Reis: Elimina todas as erradas.

     * Ás: Elimina 1 errada.

     * 2: Nenhum efeito (perde pontos).

     * 3: *Skip* (Pula pergunta ganhando pontos).

**7\. Arquitetura do Sistema (MVC)**

**Estrutura de Pastas Sugerida**

**Backend (Node.js/Express)**
/backend
  /src
    /controllers   (Regras de negócio: QuizController.js, AuthController.js)
    /models        (Schemas Mongoose: Question.js, User.js)
    /routes        (Rotas da API: quizRoutes.js, authRoutes.js)
    /database      (Conexão MongoDB)
    /middleware    (Autenticação JWT, Validações)
  app.js           (Config. do App)
  server.js        (Entry Point)

**Frontend**
/frontend
  /assets
    /css           (global.css, game.css, animations.css)
    /js            (api.js, gameLogic.js, uiController.js)
    /img           (avatars, ui-elements)
    /audio         (sfx-correct, sfx-wrong, bg-music)
  index.html       (Login/Home)
  game.html        (A partida)
  ranking.html     (Leaderboard)
  profile.html     (Edição/Exclusão de conta)


**8\. Modelagem de Dados (MongoDB Schema)**

**Collection: users**
{
  "_id": "ObjectId(...)",
  "nickname": "String (Unique)",
  "email": "String (Unique)",
  "password": "String (Hashed)",
  "avatar": "String (URL ou ID do asset)",
  "stats": {
    "total_score": "Number",
    "games_played": "Number"
  },
  "history": {
    "seen_questions": ["Array of ObjectIds"] 
    // IDs das perguntas já respondidas para controle de repetição
  },
  "createdAt": "Date"
}

**Collection: questions**
{
  "_id": "ObjectId(...)",
  "pergunta": "String",
  "alternativas": ["Array de 4 Strings"],
  "resposta_correta": "String",
  "categoria": "String (Série/Filme)",
  "tema": "String (Franquia específica)",
  "dificuldade": "String",
  "curiosidade": "String",
  "estatisticas_escolhas": ["Array de 4 Numbers"]
}

**Data:** 30/01/2026

