import { Router } from "express";
import {
  handleGetHoodies,
  handleGetHoodiesById,
  handleGetTees,
  handleGetTeesById,
  handleLogin,
  handleSignup,
  handleGetTop,
  handleComputePayment,
} from "../controllers/UnAuthController";
const router = Router();

router.post("/login", handleLogin);
router.post("/signup", handleSignup);
router.post("/computepayment", handleComputePayment);
router.get("/tees", handleGetTees);
router.get("/tees/:id", handleGetTeesById);
router.get("/hoodies", handleGetHoodies);
router.get("/hoodies/:id", handleGetHoodiesById);
router.get("/top", handleGetTop);
export default router;
