import { Router } from "express";
import { handlePaymentRequest } from "../controllers/StripeController";

const router = Router();

router.post("/create-payment-intent", handlePaymentRequest);

export default router;
