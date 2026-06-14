import express from "express";
import {userProfile, getAllUsers, UpdateUser, changePassword, deleteAccount} from "../controllers/user/userController.js";
import {authMiddleware} from "../middlewares/authMiddleare.js";
import upload from "../middlewares/uploadMiddleware.js"
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.get("/profile", authMiddleware, userProfile);
router.get("/get-users", authMiddleware, authorize("admin"), getAllUsers);
router.put("/profile", authMiddleware, upload.single("profileImage"), UpdateUser);
router.put("/change-password", authMiddleware, changePassword);
router.delete("/delete-account", authMiddleware, deleteAccount);

export default router;