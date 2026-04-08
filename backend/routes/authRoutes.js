import express from "express";
import { registerUser, loginUser, uploadProfileImage, updateProfile } from "../controller/authController.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();



router.post("/register", upload.single("image"), registerUser);
router.post("/upload-profile", protect, upload.single("profileImage"), uploadProfileImage);
router.post("/login", loginUser);
router.put("/update-profile", protect, updateProfile);


export default router;