const mongoose = require("mongoose");

const { Schema } = mongoose;

const usuario = new Schema(
  {
    nickname: {
      type: String,
      required: true, // É obrigatório
      unique: true,   // Não podem existir dois iguais
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    senha: {
      type: String,
      required: true, // Aqui vai o Hash (senha criptografada)
    },
    avatar: {
      type: String,
      default: "default-avatar.png", // Se o usuário não escolher, vai esse
    },
    // Estatísticas do Jogador (Ranking)
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
    // Histórico para evitar repetição de perguntas (RN07)
    historico: {
      perguntas_respondidas: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Questoes", // Referência para quando criarmos a tabela de Perguntas
        },
      ],
    },
  },
  { timestamps: true } // Cria automaticamente: createdAt e updatedAt
);

const User = mongoose.model("User", usuario);

module.exports = User;