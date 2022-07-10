import { shippingAdressSchema, paymentInfoSchema, orderSummarySchema, totalOrderValueSchema } from '../schemas/checkoutSchema.js';
import sanitizeString from '../utils/sanitizeStrings.js';

async function validateCheckout(req, res, next) {
    let { shippingAdress, paymentInfo, orderSummary, totalValue } = req.body;

    const validationShippingAdress = shippingAdressSchema.validate(shippingAdress);
    const validationPaymentInfo = paymentInfoSchema.validate(paymentInfo);
    const validationOderSummary = orderSummarySchema.validate(orderSummary);
    const validationTotalValue = totalOrderValueSchema.validate(totalValue);

    const isNotValid = validationShippingAdress.error || validationPaymentInfo.error || validationOderSummary.error || validationTotalValue.error;

    if (isNotValid) {
        console.log(orderSummary);
        console.log(isNotValid);
        return res.sendStatus(422);
    };

    shippingAdress = {
        name: sanitizeString(shippingAdress.name),
        country: sanitizeString(shippingAdress.country),
        state: sanitizeString(shippingAdress.state),
        zipCode: sanitizeString(shippingAdress.zipCode),
        street: sanitizeString(shippingAdress.street),
        numberAndExtraInfo: sanitizeString(shippingAdress.numberAndExtraInfo)
    };

    paymentInfo = {
        creditCardNumber: sanitizeString(paymentInfo.creditCardNumber),
        cpf: sanitizeString(paymentInfo.cpf),
        validThru: sanitizeString(paymentInfo.validThru),
        cvvCode: sanitizeString(paymentInfo.cvvCode)
    };

    orderSummary = orderSummary.map(item => {
        item.name = sanitizeString(item.name);
        item.image = sanitizeString(item.image);
        item.qty = Number(sanitizeString(item.qty));
        item.value = Number(sanitizeString(item.value));
        return item;
    });

    totalValue = Number(sanitizeString(totalValue));

    req.session.order = { shippingAdress, paymentInfo, orderSummary, totalValue };
    next();
};

export default validateCheckout;