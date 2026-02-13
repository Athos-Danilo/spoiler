const User = require("../models/User");
const bcrypt = require("bcryptjs"); // O triturador de senhas
const jwt = require("jsonwebtoken"); // O gerador de crachás (tokens)

// ------> Função de Cadastro do Usuário.
exports.register = async (req, res) => {
  const { nickname, email, senha, confirmSenha } = req.body;

  if (!nickname) return res.status(422).json({ msg: "O nickname é obrigatório!" });
  if (!email) return res.status(422).json({ msg: "O e-mail é obrigatório!" });
  if (!senha) return res.status(422).json({ msg: "A senha é obrigatória!" });
  
  if (senha !== confirmSenha) {
    return res.status(422).json({ msg: "As senhas não conferem!" });
  }

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
  }

  const nickExists = await User.findOne({ nickname: nickname });
  if (nickExists) {
    return res.status(422).json({ msg: "Esse nickname já está em uso!" });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(senha, salt);

  const user = new User({
    nickname,
    email,
    senha: passwordHash, 
  });

  try {
    await user.save(); // Salva no MongoDB
    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!" });
  }
};


// ------> Função de Login do Usuário.
exports.login = async (req, res) => {
  const { nickname, senha } = req.body;

  if (!nickname) return res.status(422).json({ msg: "O e-mail é obrigatório!" });
  if (!senha) return res.status(422).json({ msg: "A senha é obrigatória!" });


  const user = await User.findOne({ nickname: nickname });
  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  const checkPassword = await bcrypt.compare(senha, user.senha);
  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida!" });
  }

  try {
    const secret = process.env.JWT_SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

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