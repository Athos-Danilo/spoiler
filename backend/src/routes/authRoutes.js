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
// Função: Cadastrar um novo jogador no banco de dados.
router.post("/registro", authController.register);

// URL de Acesso: POST http://localhost:3000/auth/login
// Função: Autenticar um jogador e gerar o token JWT.
router.post("/login", authController.login);

// URL de Acesso: POST http://localhost:3000/auth/recuperar-conta
// Função: Gerar o código de 6 dígitos e enviar por e-mail.
router.post('/recuperar-conta', authController.recuperarConta);

// URL de Acesso: POST http://localhost:3000/auth/validar-token
// Função: Conferir se o código digitado está correto e no prazo.
router.post('/validar-token', authController.validarToken);

// URL de Acesso: POST http://localhost:3000/auth/resetar-senha
// Função: Salvar a nova senha criptografada e apagar o token de recuperação.
router.post('/resetar-senha', authController.resetarSenha);

// Exporta o roteador configurado para ser plugado no arquivo principal (server.js).
module.exports = router;