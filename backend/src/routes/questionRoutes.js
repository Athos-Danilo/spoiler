// Biblioteca Express utilizada para criar o roteador.
const router = require("express").Router();

// Importa o controlador.
const questionController = require("../controllers/questionController");

// ======> Configuração das Rotas de Perguntas.
// 1) Inicializar o roteador do Express;
// 2) Conectar a Rota de Criação (POST) à função 'createQuestion';
// 3) Conectar a Rota de Busca (GET) à função 'getAllQuestions';
// 4) Exportar as rotas prontas para o servidor principal.
// ---------------------------------------------------------------- //

// Rota responsável por receber os dados do Thunder Client e salvar a pergunta.
// URL de Acesso: POST http://localhost:3000/questoes/nova
router.post("/nova", questionController.createQuestion);

// URL de Acesso: GET http://localhost:3000/questoes/todas
router.get("/todas", questionController.getAllQuestions);

// Exporta o roteador configurado para ser plugado no arquivo principal (server.js).
module.exports = router;