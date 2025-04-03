import { Router } from "express";
import { handleOrders, handleProfile } from "../controllers/AuthController";
import { authenticateToken } from "../auth/authMiddleware";
const router = Router();

router.get("/profile", authenticateToken, handleProfile);
router.get("/orders", handleOrders);
export default router;
