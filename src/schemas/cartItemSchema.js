import joi from 'joi';

const CartItemSchema = joi.object({
    image: joi.string().required(),
    name: joi.string().required(),
    qty: joi.number().required(),
    value: joi.number().required()
});

export default CartItemSchema;