// Biblioteca responsável por interagir com o MongoDB.
const mongoose = require("mongoose");
const { Schema } = mongoose;

// ======> Modelo de Dados do Usuário (Schema).
// 1) Campos obrigatórios e únicos (nickname, e-mail e senha);
// 2) Valor padrão para avatar e estatísticas iniciais;
// 3) Criar a relação (ref) com a tabela de Questões para o histórico;
// 4) Ativar timestamps para registrar automaticamente quando a conta foi criada/atualizada.
// -------------------------------------------------------------------------------------------- //
const usuario = new Schema(
  {
    nickname: {
      type: String,
      required: true, 
      unique: true,   
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    senha: {
      type: String,
      required: true, 
    },
    avatar: {
      type: String,
      default: "claquete.png", 
    },
    resetSenhaToken: {
      type: String,
      default: null, 
    },
    resetSenhaTempo: {
      type: Date, 
      default: null,
    },
    estatisticas: {
      total_pontos: {
        type: Number,
        default: 0,
      },
      quantidade_jogos: {
        type: Number,
        default: 0,
      },
    },
    historico: {
      perguntas_respondidas: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Questoes", 
        },
      ],
    },
  },
  { timestamps: true } 
);

// Compila o Schema em um Model funcional e o exporta.
const User = mongoose.model("User", usuario);

module.exports = User;