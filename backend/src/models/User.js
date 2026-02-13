const mongoose = require("mongoose");

const { Schema } = mongoose;

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
      default: "default-avatar.png", 
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

const User = mongoose.model("User", usuario);

module.exports = User;