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

// ======> Buscar Perguntas (Com Filtro Dinâmico).
// 1) Ler os parâmetros enviados na URL (tema, dificuldade, etc);
// 2) Montar um filtro dinâmico;
// 3) Consultar o MongoDB usando esse filtro;
// 4) Retornar a lista filtrada em formato JSON.
// ----------------------------------------------------------------- //
exports.getAllQuestions = async (req, res) => {
  try {
    // Extrai o que o front-end mandou na URL (Query Params)
    const { tema, dificuldade, categoria } = req.query;

    // Monta o objeto de filtro vazio
    const filtro = {};

    // Se a URL enviou um tema, adiciona ao filtro (ignora maiúsculas/minúsculas se quiser, mas vamos manter exato por agora)
    if (tema) {
      filtro.tema = tema;
    }
    
    // Se a URL enviou uma dificuldade, adiciona ao filtro
    if (dificuldade) {
      // Como no seu Schema o padrão é "Fácil" (com acento e maiúscula), 
      // podemos precisar garantir que a string bata exatamente com o banco.
      // Uma dica de ouro é padronizar no banco tudo minúsculo e sem acento no futuro!
      filtro.dificuldade = dificuldade; 
    }

    if (categoria) {
      filtro.categoria = categoria;
    }

    // O método .find(filtro) agora traz APENAS as perguntas que batem com o critério!
    const questions = await Question.find(filtro);
    
    res.status(200).json(questions);
    
  } catch (error) {
    console.error("[Erro - getAllQuestions]:", error);
    res.status(500).json({ msg: "Erro ao buscar as perguntas no banco de dados!" });
  }
};