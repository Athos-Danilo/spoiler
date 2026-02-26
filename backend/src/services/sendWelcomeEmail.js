const nodemailer = require('nodemailer');

// ======> Serviço de E-mail: Boas-Vindas Usuário.


const enviarEmailBoasVindas = async (emailDestino, nicknameUsuario) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS  
            }
        });

        const linkDoJogo = "http://localhost:3000/index.html"; 

        const mailOptions = {
            from: `"Equipe Spoiler" <${process.env.EMAIL_USER}>`,
            to: emailDestino,
            subject: `Bem-vindo ao Spoiler, ${nicknameUsuario}!`, 
            text: `Bem-vindo ao Spoiler, ${nicknameUsuario}! Sua conta foi criada com sucesso. Acesse o nosso site para começar a jogar.`,
            html: `
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');
                    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
                    
                    @media screen and (max-width: 600px) {
                        .container-card { width: 100% !important; padding: 30px 20px !important; }
                        .titulo { font-size: 46px !important; }
                        .saudacao { font-size: 24px !important; }
                        .nome-destaque { font-size: 26px !important; }
                        .texto-padrao { font-size: 16px !important; }
                        .botao-jogar {
                            font-size: 20px !important;
                            padding: 18px 30px !important;
                            width: 100% !important;
                            box-sizing: border-box !important;
                            display: block !important;
                        }
                    }
                </style>
            </head>
            <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Josefin Sans', Arial, sans-serif;">
                
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 20px 10px;">
                    <tr>
                        <td align="center">
                            
                            <table class="container-card" width="500" border="0" cellspacing="0" cellpadding="0" style="background-color: #182641; border-radius: 12px; border: 4px solid #274273; max-width: 500px; padding: 40px; box-sizing: border-box;">
                                <tr>
                                    <td align="center">
                                        
                                        <h1 class="titulo" style="color: #FFFFFF; font-style: italic; font-size: 52px; margin: 0 0 5px 0; font-weight: 700;">Spoiler</h1>
                                        <h3 style="color: #FFFFFF; font-weight: 400; font-size: 18px; margin: 0 0 35px 0; letter-spacing: 1px;">Quiz de Filmes & Séries</h3>
                                        
                                        <h2 class="saudacao" style="color: #FFFFFF; font-size: 24px; font-weight: 400; margin: 0 0 20px 0;">
                                            Está na hora de mostrar o quanto você é fã, <br><span class="nome-destaque" style="color: #347CD4; font-size: 30px; font-weight: 700;">${nicknameUsuario}</span>!
                                        </h2>
                                        
                                        <p class="texto-padrao" style="color: #D9D9D9; line-height: 1.6; margin: 0 0 10px 0; font-size: 16px;">Sua conta foi criada com sucesso.</p>
                                        <p class="texto-padrao" style="color: #D9D9D9; line-height: 1.6; margin: 0 0 35px 0; font-size: 16px;">Prepare-se para testar seus conhecimentos, enfrentar perguntas desafiadoras sobre seus filmes e séries favoritos e provar para todo mundo que você é um verdadeiro cinéfilo de carteirinha!</p>
                                        
                                        <div style="text-align: center;">
                                            <a href="${linkDoJogo}" class="botao-jogar" style="background-color: #347CD4; color: #FFFFFF; text-decoration: none; padding: 18px 40px; border-radius: 8px; font-size: 22px; font-weight: 700; border: none; display: inline-block; box-shadow: 0 5px 15px rgba(52, 124, 212, 0.4);">
                                                Começar a jogar
                                            </a>
                                        </div>
                                        
                                        <p class="texto-padrao" style="color: #B0B8C8; line-height: 1.5; margin: 35px 0 0 0; font-size: 14px;"><strong>Dica de ouro:</strong> Fique atento às pegadinhas e, o mais importante, não dê spoilers para os amigos!</p>
                                        
                                        <hr style="border: none; border-top: 1px solid #274273; margin: 35px 0 20px 0; width: 100%;">
                                        
                                        <p style="font-size: 13px; color: #888888; line-height: 1.5; margin: 0;">Nos vemos no jogo,<br><strong style="color: #B0B8C8;">Equipe Spoiler</strong></p>
                                        
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                </table>

            </body>
            </html>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`[Sucesso - Nodemailer]: E-mail de boas-vindas enviado para ${emailDestino}`);

    } catch (error) {
        console.error("[Erro - Nodemailer]: Falha ao enviar o e-mail de boas-vindas.", error);
    }
};

module.exports = enviarEmailBoasVindas;