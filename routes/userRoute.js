import express from "express";
import {userProfile} from "../controllers/userController.js";
import {authMiddleware} from "../middlewares/authMiddleare.js"

const router = express.Router();

router.get("/get-Profile", authMiddleware, userProfile)

export default router;