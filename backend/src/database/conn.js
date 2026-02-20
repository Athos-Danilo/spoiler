// Biblioteca responsável pela modelagem de dados e conexão com o MongoDB.
const mongoose = require("mongoose");

// ======> Estabelecer Conexão com o Banco de Dados.
// 1) Configurar o modo estrito para as consultas;
// 2) Tentar estabelecer a conexão usando a URI do arquivo .env;
// 3) Exibir mensagem de sucesso no terminal ou capturar e detalhar o erro.
// --------------------------------------------------------------------------- //
async function main() {
  try {
    // Define que o Mongoose vai usar a query estrita. 
    // Isso evita que campos que não existem no Model sejam salvos acidentalmente.
    mongoose.set("strictQuery", true);

    // Conecta ao banco usando a variável de ambiente secreta.
    await mongoose.connect(process.env.DB_URI);

    // Log de sucesso.
    console.log("Conectado ao MongoDB com sucesso!");

  } catch (error) {
    // Log de erro.
    console.error("[Erro - Banco de Dados]: Falha ao tentar conectar.", error);
  }
}

// Exporta a função para que ela possa ser executada lá no server.js.
module.exports = main;