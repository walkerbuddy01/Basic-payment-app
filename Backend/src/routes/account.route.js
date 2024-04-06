import { Router } from "express";
import JWTVerify from "../middlewares/auth.middleware.js";
import { transferMoney, userBalance } from "../controllers/account.controller.js";

const router = Router();
router.route("/a/balance").get(JWTVerify, userBalance

)
router.route("/a/transcation").post(JWTVerify, transferMoney);

export default router 