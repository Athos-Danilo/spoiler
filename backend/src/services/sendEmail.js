const nodemailer = require('nodemailer');

// ======> Serviço de E-mail: Recuperar Conta.
// 1) Configurar o transportador com as credenciais do WEB APP;
// 2) Monta a estrutura da mensagem;
// 3) Enviar o e-mail e trata possíveis erros de rede.
// --------------------------------------------------------------- //

const enviarEmailRecuperacao = async (emailDestino, tokenRecuperacao, nicknameUsuario) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS  
            }
        });

        // Montando o E-mail.
        const mailOptions = {
            from: `"Equipe Spoiler" <${process.env.EMAIL_USER}>`, 
            to: emailDestino, 
            subject: 'Recuperação de Conta - Spoiler',
            text: `Eaí, ${nicknameUsuario}!\n\nRecebemos um pedido para recuperar a sua conta. Não se preocupe, estamos aqui para ajudar.\n\nSeu código de segurança de 6 dígitos é: ${tokenRecuperacao}\n\nEste código é válido por 15 minutos. Se você não solicitou a recuperação, ignore este e-mail tranquilamente.\n\nBom jogo,\nEquipe Spoiler`,
            html: `
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');
                    
                    /* Força os clientes de e-mail a não mudarem o tamanho da fonte sozinhos */
                    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
                    
                    /* O Segredo da Escala no Celular */
                    @media screen and (max-width: 600px) {
                        .container-card {
                            width: 100% !important;
                            padding: 30px 20px !important; /* Menos espaço nas laterais no celular */
                        }
                        .titulo { font-size: 46px !important; }
                        .saudacao { font-size: 22px !important; }
                        .nome-destaque { font-size: 26px !important; }
                        .texto-padrao { font-size: 15px !important; }
                        .caixa-codigo {
                            font-size: 32px !important;
                            letter-spacing: 5px !important;
                            padding: 15px !important;
                            width: 100% !important;
                            box-sizing: border-box !important;
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
                                            Eaí, <span class="nome-destaque" style="color: #347CD4; font-size: 28px; font-weight: 700;">${nicknameUsuario}</span>!
                                        </h2>
                                        
                                        <p class="texto-padrao" style="color: #D9D9D9; line-height: 1.5; margin: 0 0 10px 0; font-size: 16px;">Recebemos um pedido para recuperar a sua conta. Não se preocupe, estamos aqui para ajudar.</p>
                                        <p class="texto-padrao" style="color: #D9D9D9; margin: 0 0 25px 0; font-size: 16px;">Seu código de segurança de 6 dígitos é:</p>
                                        
                                        <div class="caixa-codigo" style="background-color: #1E3256; padding: 20px 30px; border-radius: 8px; font-size: 38px; font-weight: 700; letter-spacing: 6px; border: 2px solid #347CD4; color: #FFFFFF; display: inline-block;">
                                            ${tokenRecuperacao}
                                        </div>
                                        
                                        <p class="texto-padrao" style="color: #B0B8C8; line-height: 1.5; margin: 30px 0 0 0; font-size: 14px;">Este código é válido por <strong style="color: #FFFFFF;">15 minutos</strong>. Se você não solicitou a recuperação, ignore este e-mail tranquilamente.</p>
                                        
                                        <hr style="border: none; border-top: 1px solid #274273; margin: 35px 0 20px 0; width: 100%;">
                                        
                                        <p style="font-size: 13px; color: #888888; line-height: 1.5; margin: 0;">Bom jogo,<br><strong style="color: #B0B8C8;">Equipe Spoiler</strong></p>
                                        
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

        // Envia o e-mail.
        await transporter.sendMail(mailOptions);
        console.log(`[Sucesso - Nodemailer]: E-mail enviado para ${emailDestino}`);

    } catch (error) {
        console.error("[Erro - Nodemailer]: Falha ao enviar o e-mail.", error);
        throw new Error("Não foi possível enviar o e-mail de recuperação.");
    }
};

module.exports = enviarEmailRecuperacao;