// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    image: {
      type: String, // thumbnail
    },

    type: {
      type: String,
      enum: ["video", "audio"], 
      default: "video",
    },

    src: {
      type: String, 
      required: true,
    },

    category: {
      type: String,
      enum: ["Worship", "Teachings", "Mentorship", "Prayer", "Sermons"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);