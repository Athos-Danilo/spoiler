// ======> Configurações Iniciais e Variáveis de Ambiente.
// Carrega as variáveis de segurança do arquivo .env.
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const conn = require('./src/database/conn');
const authRoutes = require('./src/routes/authRoutes');

// Inicializa o aplicativo Express.
const app = express();

// ======> Middlewares Globais (Os Porteiros do Servidor).
// 1) cors(): Permite que o frontend converse com o backend;
// 2) express.json(): Ensina o servidor a ler os pacotes de dados no formato JSON;
// 3) morgan('dev'): Cria logs visuais no terminal para cada requisição recebida.
// -------------------------------------------------------------------------------- //
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); 

// ======> Conexão com o Banco de Dados.
// Chama a função main() exportada lá do arquivo conn.js.
// ----------------------------------------------------------- //
conn();

// ======> Mapeamento de Rotas.
// 1) Rota de teste na raiz '/' para verificar se a API está de pé;
// 2) Direcionar todas as rotas que começam com '/auth' para o authRoutes.
// -------------------------------------------------------------------------- //
app.get('/', (req, res) => {
    res.send('API do Spoiler está Online e Roteando!');
});

app.use('/auth', authRoutes);

// ======> Inicialização do Servidor.
// 1) Define a porta usando o .env;
// 2) Coloca o servidor para escutar requisições de forma contínua;
// 3) Emite um log de sucesso no terminal.
// ------------------------------------------------------------------ //
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando de boa na porta: ${PORT}`);
});