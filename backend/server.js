// 1. IMPORTANTE: Carrega as variáveis do .env (senhas)
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Importa a conexão do banco que acabamos de criar
const conn = require('./src/database/conn');

// --- 1. IMPORTAR AS ROTAS ---
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// 2. Configurações para ler JSON e aceitar conexões do Frontend
app.use(cors());
app.use(express.json());

// 3. Conecta ao Banco
conn();

// --- 2. USAR AS ROTAS ---
// Todo caminho que começar com '/auth' vai para o arquivo de rotas
app.use('/auth', authRoutes);

// Rota de Teste (pode manter ou apagar)
app.get('/', (req, res) => {
    res.send('API do Spoiler está Online!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});