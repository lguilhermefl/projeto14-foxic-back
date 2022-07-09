import { Router } from 'express';
import parseUser from '../middlewares/parseUser.js';
import CartItemSchema from '../schemas/cartItemSchema.js';
import db from './../db.js';

const router = Router();

router.get('/', parseUser, async (req, res, next)=>{

    const { token, user } = req.session;

    if(token && user._id){

        const savedCart = await db.collection('carts').findOne({ userId: user._id });
        if(savedCart) return res.send(savedCart.cart);
        res.send([]);

    } else {
        res.send([]);
    }

});

router.post('/', parseUser, async (req, res, next)=>{

    const { cart } = req.body;

    if(!cart || !Array.isArray(cart)) return res.status(400).send('O carrinho precisa ser um array de itens.');

    for(const item of cart){

        const { error } = CartItemSchema.validate(item);
        if(error) return res.status(422).send('Os itens do carrinho estão mal formatados.');

    }

    const { token, user } = req.session;

    // usuário logado
    if(token && user._id) {

        const cartsCollection = db.collection('carts');
        const savedCart = await cartsCollection.findOne({ userId: user._id });

        if(savedCart){

            await cartsCollection.updateOne(
                {
                    _id: savedCart._id
                },
                {
                    $set: {
                        userId: user._id,
                        cart
                    }
                }
            );

        } else {

            await cartsCollection.insertOne({
                userId: user._id,
                cart
            });

        }

        res.sendStatus(201);

    } else {
        // usuário não tá logado, então não vamos guardar o carrinho em lugar nenhum.
        res.sendStatus(200);
    }

});

export default router;