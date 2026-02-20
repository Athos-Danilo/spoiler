// Modelo das Perguntas.
const Question = require("../models/Question");

// ======> Cadastrar Nova Pergunta.
// 1) Extrair os dados da pergunta enviados no corpo da requisição;
// 2) Validar se os campos obrigatórios estão preenchidos;
// 3) Criar a instância da pergunta e guardar no banco de dados;
// 4) Retornar uma mensagem de sucesso (Status 201).
// ------------------------------------------------------------------ //
exports.createQuestion = async (req, res) => {
  try {
    const {
      pergunta,
      alternativas,
      resposta_correta,
      categoria,
      tema,
      dificuldade,
      curiosidade
    } = req.body;

    // Validações de segurança e integridade dos dados.
    if (!pergunta) return res.status(422).json({ msg: "A pergunta é obrigatória!" });
    
    // O jogo precisa de exatamente 4 botões no tela, logo, precisamos de 4 alternativas!
    if (!alternativas || alternativas.length !== 4) {
      return res.status(422).json({ msg: "É necessário fornecer exatamente 4 alternativas!" });
    }
    
    if (!resposta_correta) return res.status(422).json({ msg: "A resposta correta é obrigatória!" });
    if (!categoria) return res.status(422).json({ msg: "A categoria é obrigatória!" });
    if (!tema) return res.status(422).json({ msg: "O tema (franquia) é obrigatório!" });

    // Cria a nova pergunta com os dados.
    const newQuestion = new Question({
      pergunta,
      alternativas,
      resposta_correta,
      categoria,
      tema,
      dificuldade: dificuldade || "Fácil",
      curiosidade: curiosidade || "Sem curiosidades para esta pergunta"
    });

    // Guarda no MongoDB.
    await newQuestion.save();
    res.status(201).json({ msg: "Pergunta cadastrada com sucesso no banco de dados!" });

  } catch (error) {
    console.error("[Erro - createQuestion]:", error);
    res.status(500).json({ msg: "Aconteceu um erro no servidor ao guardar a pergunta!" });
  }
};

// ======> Buscar Todas as Perguntas.
// 1) Consultar o MongoDB;
// 2) Retornar a lista em formato JSON para o frontend processar.
// ----------------------------------------------------------------- //
exports.getAllQuestions = async (req, res) => {
  try {
    // O método .find() sem filtros traz absolutamente tudo da coleção.
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error("[Erro - getAllQuestions]:", error);
    res.status(500).json({ msg: "Erro ao buscar as perguntas no banco de dados!" });
  }
};