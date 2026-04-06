import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import User from "../models/user.js";
import Payment from "../models/payment.js";
import { deleteUser } from "../controller/adminController.js";

const router = express.Router();

// Get all users (ADMIN ONLY)
router.get("/users", protect, adminOnly, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//  Get all payments (ADMIN ONLY)
router.get("/payments", protect, adminOnly, async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
});

router.delete("/users/:id",protect, adminOnly, deleteUser);

export default router;