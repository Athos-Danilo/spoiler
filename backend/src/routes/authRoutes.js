// Biblioteca Express utilizada para criar o roteador.
const router = require("express").Router();
// Importa a lógica das rotas do Controller.
const authController = require("../controllers/authController");

// ======> Configuração das Rotas de Autenticação.
// 1) Inicializar o roteador do Express;
// 2) Conectar a Rota de Cadastro (POST) à função 'register' do Controller;
// 3) Conectar a Rota de Login (POST) à função 'login' do Controller;
// 4) Exportar as rotas prontas para o server.js.
// -------------------------------------------------------------------------- //

// URL de Acesso: POST http://localhost:3000/auth/registro
router.post("/registro", authController.register);

// URL de Acesso: POST http://localhost:3000/auth/login
router.post("/login", authController.login);

// Exporta o roteador configurado para ser plugado no arquivo principal (server.js).
module.exports = router;