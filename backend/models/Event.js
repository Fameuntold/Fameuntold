// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);