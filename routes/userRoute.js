import express from "express";
import {userProfile, getAllUsers, UpdateUser, changePassword, deleteAccount} from "../controllers/userController.js";
import {authMiddleware} from "../middlewares/authMiddleare.js";
import upload from "../middlewares/uploadMiddleware.js"

const router = express.Router();

router.get("/profile", authMiddleware, userProfile);
router.get("/get-users", authMiddleware, getAllUsers);
router.put("/profile", authMiddleware, upload.single("profileImage"), UpdateUser);
router.put("/change-password", authMiddleware, changePassword);
router.delete("/delete-account", authMiddleware, deleteAccount);

export default router;