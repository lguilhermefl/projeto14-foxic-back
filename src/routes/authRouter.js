import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js'
import validateSignUp from '../middlewares/signUpSchemaValidationMiddleware.js';
import validateSignIn from '../middlewares/signInSchemaValidationMiddleware.js';

const authRouter = Router();

authRouter.post("/sign-up", validateSignUp, signUp);
authRouter.post("/sign-in", validateSignIn, signIn);

export default authRouter;