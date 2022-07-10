import joi from 'joi';

const shippingAdressSchema = joi.object({
    name: joi
        .string()
        .max(40)
        .required(),
    country: joi
        .valid("Brasil")
        .required(),
    state: joi
        .string()
        .max(19)
        .required(),
    zipCode: joi
        .string()
        .max(9)
        .required(),
    street: joi
        .string()
        .max(40)
        .required(),
    numberAndExtraInfo: joi
        .string()
        .max(20)
        .required()
});

const paymentInfoSchema = joi.object({
    creditCardNumber: joi
        .string()
        .length(16)
        .required(),
    cpf: joi
        .string()
        .length(14)
        .required(),
    validThru: joi
        .string()
        .length(5)
        .required(),
    cvvCode: joi
        .string()
        .length(3)
        .required()
});

const productSchema = joi.object({
    name: joi
        .string()
        .required(),
    image: joi
        .string()
        .required(),
    qty: joi
        .number()
        .min(1)
        .required(),
    value: joi
        .number()
        .min(1)
        .required()
});

const orderSummarySchema = joi.array().min(1).items(productSchema);

const totalOrderValueSchema = joi.number().min(1).required();

export { shippingAdressSchema, paymentInfoSchema, orderSummarySchema, totalOrderValueSchema };