import { Router } from 'express';
import saveOrder from '../controllers/checkoutController.js';
import validateCheckout from '../middlewares/checkoutSchemaValidation.js';
import parseUser from '../middlewares/parseUser.js';

const ckeckoutRouter = Router();

ckeckoutRouter.post("/orders", parseUser, validateCheckout, saveOrder);

export default ckeckoutRouter;