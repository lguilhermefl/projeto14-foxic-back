import db from '../db.js';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
dotenv.config();

async function saveOrder(req, res) {
    const { user, order } = req.session;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: user.email,
        from: 'luizguilherme77@gmail.com',
        subject: 'Pedido Realizado!',
        text: `Agradecemos sua compra ${user.name}. Seu pedido foi realizado com sucesso!`,
        html: `<strong>Parabéns pela compra na Foxic ${user.name}. Você receberá seu pedido em breve!</strong>`
    };

    try {
        await db.collection("orders").insertOne({ userId: user._id, ...order });
        sgMail
            .send(msg)
            .then(() => { }, error => {
                console.error(error);

                if (error.response) {
                    console.error(error.response.body);
                };
            });
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
};

export default saveOrder;