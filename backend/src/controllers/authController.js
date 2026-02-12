const User = require("../models/User");
const bcrypt = require("bcryptjs"); // O triturador de senhas
const jwt = require("jsonwebtoken"); // O gerador de crachás (tokens)

// =======================================================
// 1. REGISTRO DE USUÁRIO (CADASTRAR)
// =======================================================
exports.register = async (req, res) => {
  const { nickname, email, senha, confirmSenha } = req.body;

  // --- Validações (Segurança básica) ---
  if (!nickname) return res.status(422).json({ msg: "O nickname é obrigatório!" });
  if (!email) return res.status(422).json({ msg: "O e-mail é obrigatório!" });
  if (!senha) return res.status(422).json({ msg: "A senha é obrigatória!" });
  
  if (senha !== confirmSenha) {
    return res.status(422).json({ msg: "As senhas não conferem!" });
  }

  // --- Checar se usuário já existe ---
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
  }

  // --- Criptografia da Senha (HASH) ---
  // O 'salt' é uma string aleatória misturada na senha para dificultar hackers
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(senha, salt);

  // --- Criar o Usuário ---
  const user = new User({
    nickname,
    email,
    senha: passwordHash, // Salvamos a hash, não a senha pura!
  });

  try {
    await user.save(); // Salva no MongoDB
    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!" });
  }
};

// =======================================================
// 2. LOGIN (ENTRAR)
// =======================================================
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  // --- Validação ---
  if (!email) return res.status(422).json({ msg: "O e-mail é obrigatório!" });
  if (!senha) return res.status(422).json({ msg: "A senha é obrigatória!" });

  // --- Checar se o usuário existe ---
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // --- Checar se a senha bate (Comparar a senha digitada com a Hash do banco) ---
  const checkPassword = await bcrypt.compare(senha, user.senha);
  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida!" });
  }

  // --- Login deu certo! Vamos dar o Token (Crachá) ---
  try {
    const secret = process.env.JWT_SECRET;

    // Criamos o token com o ID do usuário dentro
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    // Mandamos de volta para o Frontend: Mensagem, Token e Dados do User
    res.status(200).json({ 
        msg: "Autenticação realizada com sucesso!", 
        token, 
        user: {
            id: user._id,
            nickname: user.nickname,
            avatar: user.avatar
        } 
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!" });
  }
};