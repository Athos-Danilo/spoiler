// Rotas de Autenticação do Usuário.

const router = require("express").Router();
const authController = require("../controllers/authController");

// Rota de Cadastro (POST): http://localhost:3000/auth/registro
router.post("/registro", authController.register);


// Rota de Login (POST): http://localhost:3000/auth/login
router.post("/login", authController.login);

module.exports = router;