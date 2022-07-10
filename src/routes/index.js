import { Router } from "express";
import authRouter from "./authRouter.js";
import productsRouter from './productsRouter.js';
import cartRouter from './cartRouter.js';
import ckeckoutRouter from './checkoutRouter.js';

const router = Router();
router.use(authRouter);
router.use('/products', productsRouter);
router.use('/cart', cartRouter);
router.use(ckeckoutRouter);

export default router;