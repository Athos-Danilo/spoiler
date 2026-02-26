const nodemailer = require('nodemailer');

// ======> Envio de E-mail.
// 1) Configurar o transportador com as credenciais do WEB APP;
// 2) Monta a estrutura da mensagem;
// 3) Enviar o e-mail e trata possíveis erros de rede.
// ---------------------------------------------------------- //

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
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #182641; color: #FFFFFF; padding: 40px; border-radius: 10px; max-width: 500px; margin: 0 auto; border: 4px solid #274273;">
                    <h1 style="color: #FFFFFF; text-align: center; font-style: italic; font-size: 38px; margin-bottom: 5px;">Spoiler</h1>
                    <h3 style="color: #FFFFFF; text-align: center; font-weight: normal; margin-top: 0; margin-bottom: 30px;">Quiz de Filmes & Séries</h3>
                    
                    <h2 style="text-align: center; color: #FFFFFF;">E aí, ${nicknameUsuario}!</h2>
                    <p style="font-size: 16px; text-align: center; color: #D9D9D9;">Recebemos um pedido para recuperar a sua conta. Não se preocupe, estamos aqui para ajudar.</p>
                    <p style="font-size: 16px; text-align: center; color: #D9D9D9;">Seu código de segurança de 6 dígitos é:</p>
                    
                    <div style="background-color: #1E3256; padding: 20px; text-align: center; border-radius: 8px; font-size: 36px; font-weight: bold; letter-spacing: 8px; margin: 30px 0; border: 2px solid #347CD4;">
                        ${tokenRecuperacao}
                    </div>
                    
                    <p style="font-size: 14px; color: #B0B8C8; text-align: center;">Este código é válido por <strong>15 minutos</strong>. Se você não solicitou a recuperação, ignore este e-mail tranquilamente.</p>
                    <hr style="border: 1px solid #274273; margin-top: 40px; margin-bottom: 20px;">
                    <p style="font-size: 12px; text-align: center; color: #888888;">Bom jogo,<br>Equipe Spoiler</p>
                </div>
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