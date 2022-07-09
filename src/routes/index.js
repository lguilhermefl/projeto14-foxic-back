import { Router } from "express";
import authRouter from "./authRouter.js";
import productsRouter from './productsRouter.js';
import cartRouter from './cartRouter.js';

const router = Router();
router.use(authRouter);
router.use('/products', productsRouter);
router.use('/cart', cartRouter);

export default router;