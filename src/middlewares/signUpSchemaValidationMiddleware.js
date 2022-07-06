import { signUpSchema } from '../schemas/authSchemas.js';
import sanitizeString from '../utils/sanitizeStrings.js';

async function validateSignUp(req, res, next) {
    const user = {
        name: sanitizeString(req.body.name),
        email: sanitizeString(req.body.email),
        password: sanitizeString(req.body.password),
        repeat_password: sanitizeString(req.body.repeat_password)
    };

    const validation = signUpSchema.validate(user);

    if (validation.error) {
        return res.sendStatus(422);
    };

    next();
};

export default validateSignUp;