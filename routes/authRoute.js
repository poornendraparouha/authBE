import express from "express";
import {userSignup, userLogin, refreshAccessToken, logout} from "../controllers/authController.js"
import {authMiddleware} from "../middlewares/authMiddleare.js"

const router = express.Router();

router.post("/signup",userSignup);
router.get("/signin",userLogin);
router.post("/refresh-token",refreshAccessToken);
router.post("/logout", authMiddleware, logout);


export default router;