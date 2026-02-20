const mongoose = require("mongoose");
const { Schema } = mongoose;

// ======> Modelo de Dados das Perguntas (Schema).
// 1) Texto da pergunta e as opções de resposta;
// 2) Armazenar a resposta correta para o backend validar os pontos;
// 3) Categoria e Tema específico;
// 4) Sistema de curiosidades e contagem de votos para as estatísticas.
// ----------------------------------------------------------- //
const questaoSchema = new Schema(
  {
    pergunta: { 
      type: String, 
      required: true 
    },
    alternativas: { 
      type: [String], 
      required: true 
    },
    resposta_correta: { 
      type: String, 
      required: true 
    },
    categoria: { 
      type: String, 
      required: true 
    },
    tema: { 
      type: String, 
      required: true 
    },
    dificuldade: { 
      type: String, 
      default: "Fácil"
    },
    curiosidade: { 
      type: String, 
      default: "Sem curiosidades para esta pergunta" 
    },
    estatisticas_escolhas: { 
      type: [Number], 
      default: [0, 0, 0, 0] 
    }
  },
  { timestamps: true } 
);

const Question = mongoose.model("Question", questaoSchema);

module.exports = Question;