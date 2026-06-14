import express from "express";
import {userSignup, userLogin, refreshAccessToken, logout, forgetPassword, resetPassword, googleLogin} from "../controllers/auth/authController.js"
import {authMiddleware} from "../middlewares/authMiddleare.js"

const router = express.Router();

router.post("/signup",userSignup);
router.post("/signin",userLogin);
router.post("/google-login", googleLogin);
router.post("/refresh-token",refreshAccessToken);
router.post("/logout", authMiddleware, logout);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:resetToken", resetPassword);

export default router;