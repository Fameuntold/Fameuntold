import express from "express";
import { initializePayment } from "../controller/paymentController.js";

const router = express.Router();

router.post("/pay", initializePayment);

export default router;