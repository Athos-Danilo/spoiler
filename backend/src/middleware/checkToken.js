// Biblioteca necessária para abrir e validar o Token "crachá" do usuário.
const jwt = require("jsonwebtoken");

// ======> Middleware de Autenticação.
// 1) Capturar o cabeçalho de 'authorization' que o frontend enviou;
// 2) Extrair apenas o código do token;
// 3) Verifica se o token realmente existe (se não, barra na porta);
// 4) Tentar abrir o token usando a chave secreta JWT_SECRET;
// 5) Se for válido, chama a função next() para deixar o usuário passar.
// ------------------------------------------------------------------------ //
function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  
  // Divide o texto pelo espaço e pega só a parte do código (Ex: "Bearer eyJhbGciOi..." posição 1)
  const token = authHeader && authHeader.split(" ")[1];

  // Se chegou sem crachá, recebe um 401 (Não Autorizado).
  if (!token) {
    return res.status(401).json({ msg: "Acesso negado! Crachá não fornecido." });
  }

  try {
    const secret = process.env.JWT_SECRET;
    
    // O jwt.verify tenta abrir o crachá com a senha secreta do .env.
    jwt.verify(token, secret);
    
    // Se não der erro na linha de cima, o token é verdadeiro! Pode entrar.
    next();
    
  } catch (error) {
    // Se o token for falso, inventado ou estiver vencido, cai aqui.
    console.error("[Erro - Token]:", error.message);
    res.status(400).json({ msg: "O Token fornecido é inválido ou expirou!" });
  }
}

// Exporta o segurança para usarmos nas rotas.
module.exports = checkToken;