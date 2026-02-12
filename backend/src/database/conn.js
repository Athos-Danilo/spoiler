const mongoose = require("mongoose");

async function main() {
    try {
        // Define que o Mongoose vai usar a query estrita (boa prática)
        mongoose.set("strictQuery", true);

        // Pega a senha do arquivo .env e conecta
        await mongoose.connect(process.env.DB_URI);

        console.log("Conectado ao Banco de Dados com sucesso!");
    } catch (error) {
        console.log(`Erro ao conectar no banco: ${error}`);
    }
}

module.exports = main;