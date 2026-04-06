import express from "express";
import Payment from "../models/payment.js";

const router = express.Router();

router.post("/paystack", async (req, res) => {
  const event = req.body;

  if (event.event === "charge.success") {
    const data = event.data;

    await Payment.create({
      userEmail: data.customer.email,
      amount: data.amount / 100,
      reference: data.reference,
      status: "success",
    });
  }

  res.sendStatus(200);
});

export default router;