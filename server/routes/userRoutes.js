import { Router } from "express";
import { register, login, logout, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", protect, logout);
router.get("/getuser", protect, getMe);

export default router;
