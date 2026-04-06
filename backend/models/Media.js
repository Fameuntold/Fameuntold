// models/Media.js
import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
    title: String,
    link: String,
    image: String,
});

export default mongoose.model("Media", mediaSchema);