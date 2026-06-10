import express from "express";
import {userProfile, getAllUsers} from "../controllers/userController.js";
import {authMiddleware} from "../middlewares/authMiddleare.js";

const router = express.Router();

router.get("/get-Profile", authMiddleware, userProfile);
router.get("/get-all-users", authMiddleware, getAllUsers);


export default router;