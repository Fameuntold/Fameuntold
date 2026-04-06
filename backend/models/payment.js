import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userEmail: String,
    amount: Number,
    reference: String,
    status: String,
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);