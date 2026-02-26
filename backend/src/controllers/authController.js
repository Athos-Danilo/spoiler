// Modelo do usuário.
const User = require("../models/User");
// Biblioteca para gerar hashes de senha e comparar.
const bcrypt = require("bcryptjs");
// Biblioteca para criar e verificar tokens JWT.
const jwt = require("jsonwebtoken");

// Biblioteca para enviar E-mail.
const enviarEmailRecuperacao = require("../services/sendEmail"); 


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


// ======> Recuperar Conta (Eviar o Email com o Token).
// 1) Recebe o e-mail do front-end;
// 2) Verifica se o usuário existe no banco de dados;
// 3) Gera um código de 6 dígitos numéricos aleatórios;
// 4) Salvar o código e a data de validade (15 min) no banco;
// 5) Disparar o e-mail usando o Nodemailer.
// ----------------------------------------------------------- //
exports.recuperarConta = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(422).json({ msg: "O e-mail é obrigatório!" });
    }

    // Busca o usuário pelo e-mail.
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: "E-mail não encontrado no sistema." });
    }

    // Math.random gera um número quebrado, a gente multiplica e arredonda para ter 6 casas decimais.
    const codigoRecuperacao = Math.floor(100000 + Math.random() * 900000).toString();

    // Cria a data de validade (Agora + 15 minutos).
    const tempoValidade = new Date();
    tempoValidade.setMinutes(tempoValidade.getMinutes() + 15);

    // Salva as informações no banco de dados.
    user.resetSenhaToken = codigoRecuperacao;
    user.resetSenhaTempo = tempoValidade;
    await user.save();

    // Chama o nosso carteiro para entregar a mensagem. Passamos o email, o código gerado, e o Nickname.
    await enviarEmailRecuperacao(user.email, codigoRecuperacao, user.nickname);

    // Se tudo deu certo, avisa o Front-end!
    res.status(200).json({ msg: "Código de recuperação enviado com sucesso!" });

  } catch (error) {
    console.error("[Erro - recuperarConta]:", error);
    res.status(500).json({ msg: "Erro interno ao tentar processar a recuperação." });
  }
};


// ======> Recuperar Conta (Validar o Token).
// 1) Recebe o e-mail e o token do front-end;
// 2) Busca o usuário que tenha esse e-mail E esse token exato;
// 3) Verifica se a data atual é menor que o tempo de expiração do código;
// 4) Se tudo bater, liberar o passe para ele criar a nova senha.
// ------------------------------------------------------------------------- //
exports.validarToken = async (req, res) => {
  try {
    const { email, token } = req.body;

    if (!email) return res.status(422).json({ msg: "O e-mail é obrigatório!" });
    if (!token) return res.status(422).json({ msg: "O código é obrigatório!" });

    // Busca o usuário com 3 condições ao mesmo tempo.
    const user = await User.findOne({
      email: email,
      resetSenhaToken: token,
      resetSenhaTempo: { $gt: Date.now() } 
    });

    // Se não achou ninguém, é porque o e-mail está errado, o código está errado, ou já passaram 15 minutos.
    if (!user) {
      return res.status(400).json({ msg: "Código inválido ou expirado. Tente gerar um novo." });
    }

    // Se achou o usuário, e se o código está correto e no prazo.
    res.status(200).json({ msg: "Código validado com sucesso!" });

  } catch (error) {
    console.error("[Erro - validarToken]:", error);
    res.status(500).json({ msg: "Erro interno ao validar o código." });
  }
};


// ======> Recuperar Conta (Resetar Senha).
// 1) Recebe o e-mail e a nova senha do front-end;
// 2) Busca o usuário para garantir que o tempo de 15 minutos ainda não acabou;
// 3) Criptografa a nova senha com bcrypt;
// 4) Atualiza a senha no banco e apaga o token de recuperação;
// 5) Retorna sucesso para o Front-end redirecionar pro Login.
// ------------------------------------------------------------------------------ //
exports.resetarSenha = async (req, res) => {
  try {
    const { email, novaSenha } = req.body;

    if (!email) return res.status(422).json({ msg: "O e-mail é obrigatório!" });
    if (!novaSenha) return res.status(422).json({ msg: "A nova senha é obrigatória!" });

    // Busca o usuário e garante que o prazo de 15 minutos ainda está valendo.
    const user = await User.findOne({
      email: email,
      resetSenhaTempo: { $gt: Date.now() } 
    });

    if (!user) {
      return res.status(400).json({ msg: "Tempo expirado! Você demorou muito para criar a senha. Solicite um novo código." });
    }

    // Criptografa a nova senha.
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(novaSenha, salt);

    // Salva a nova senha segura.
    user.senha = passwordHash;

    // Limpa o token e o tempo.
    user.resetSenhaToken = null;
    user.resetSenhaTempo = null;

    await user.save();

    res.status(200).json({ msg: "Senha alterada com sucesso! Você já pode fazer login no Spoiler." });

  } catch (error) {
    console.error("[Erro - resetarSenha]:", error);
    res.status(500).json({ msg: "Erro interno ao tentar salvar a nova senha." });
  }
};