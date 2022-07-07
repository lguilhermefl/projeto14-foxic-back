import { signInSchema } from '../schemas/authSchemas.js';
import sanitizeString from '../utils/sanitizeStrings.js';

async function validateSignIn(req, res, next) {
    const user = {
        email: sanitizeString(req.body.email),
        password: sanitizeString(req.body.password)
    };

    const validation = signInSchema.validate(user);

    if (validation.error) {
        return res.sendStatus(422);
    };

    next();
};

export default validateSignIn;