// Modelo do usuário.
const User = require("../models/User");
// Biblioteca para gerar hashes de senha e comparar.
const bcrypt = require("bcryptjs");
// Biblioteca para criar e verificar tokens JWT.
const jwt = require("jsonwebtoken");

// ======> Registrar um Novo Usuário.
// 1) Validar os campos recebidos no corpo da requisição;
// 2) Verificar se o e-mail ou nickname já existem;
// 3) Gerar hash da senha com bcrypt e salvar o usuário.
// ----------------------------------------------------------- //
exports.register = async (req, res) => {
  try {
    const { nickname, email, senha, confirmSenha, avatar } = req.body;

    // Validações básicas de entrada.
    if (!nickname) return res.status(422).json({ msg: "O nickname é obrigatório!" });
    if (!email) return res.status(422).json({ msg: "O e-mail é obrigatório!" });
    if (!senha) return res.status(422).json({ msg: "A senha é obrigatória!" });
    if (senha !== confirmSenha) return res.status(422).json({ msg: "As senhas não conferem!" });

    // Verifica se já existe usuário com o mesmo e-mail.
    const userExists = await User.findOne({ email: email });
    if (userExists) return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });

    // Verifica se já existe usuário com o mesmo nickname.
    const nickExists = await User.findOne({ nickname: nickname });
    if (nickExists) return res.status(422).json({ msg: "Esse nickname já está em uso!" });

    // Gera um salt e cria o hash da senha. O número 12 é a quantidade de rounds (custo).
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(senha, salt);

    // Cria a instância do usuário usando o hash da senha.
    const user = new User({
      nickname,
      email,
      senha: passwordHash,
      // Se não vier avatar, usa imagem padrão 'claquete.png'.
      avatar: avatar || 'claquete.png'
    });

    // Salva o usuário no banco.
    await user.save();
    res.status(201).json({ msg: "Usuário criado com sucesso!" });

  } catch (error) {
    // Log do erro no servidor.
    console.error("[Erro - register]:", error);
    res.status(500).json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!" });
  }
};


// ======> Autenticar Usuário.
// 1) Validar entrada (nickname e senha);
// 2) Buscar usuário pelo nickname;
// 3) Comparar a senha enviada com o hash armazenado;
// 4) Gerar um token JWT contendo o id do usuário.
// ----------------------------------------------------------- //
exports.login = async (req, res) => {
  try {
    const { nickname, senha } = req.body;

    // Validações básicas.
    if (!nickname) return res.status(422).json({ msg: "O nickname é obrigatório!" });
    if (!senha) return res.status(422).json({ msg: "A senha é obrigatória!" });

    // Busca o usuário pelo nickname.
    const user = await User.findOne({ nickname: nickname });
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

    // Compara a senha em texto plano com o hash salvo usando bcrypt.
    const checkPassword = await bcrypt.compare(senha, user.senha);
    if (!checkPassword) return res.status(422).json({ msg: "Senha inválida!" });

    // Gera o token JWT.
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      { id: user._id },
      secret
    );

    // Retorna token e dados públicos do usuário.
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
    console.error("[Erro - login]:", error);
    res.status(500).json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!" });
  }
};