import express from "express";
import {userSignup, userLogin, refreshAccessToken, logout, forgetPassword, resetPassword} from "../controllers/authController.js"
import {authMiddleware} from "../middlewares/authMiddleare.js"

const router = express.Router();

router.post("/signup",userSignup);
router.post("/signin",userLogin);
router.post("/refresh-token",refreshAccessToken);
router.post("/logout", authMiddleware, logout);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:resetToken", resetPassword);

export default router;