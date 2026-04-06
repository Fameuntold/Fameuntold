import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true },
        password: String,
        role: { type: String, default: "user" },
        profileImage: {
            type: String,
        },

        phone: String,
        location: String,
        message: String,
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);