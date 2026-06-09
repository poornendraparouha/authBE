import express from "express";
import {userSignup, userLogin} from "../controllers/userController.js"

const router = express.Router();

router.post("/signup", userSignup);
router.get("/signin",userLogin);

export default router;