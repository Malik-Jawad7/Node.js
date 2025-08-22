import express from "express";
import product from "./products.mjs";
import payment from "./payment.mjs";

const router = express.Router();

router.use('/products', product);
router.use('/payment',payment)

export default router;