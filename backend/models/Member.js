import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    role: String,
    phone: String,
    location: String,
    message: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);