import Subscriber from "../models/Subscriber.js";
import validator from "validator";

// Subscribe controller
export const subscribe = async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Already subscribed" });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    return res.status(201).json({ message: "Subscription successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};



// Get all subscribers
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 }); // newest first
    res.status(200).json(subscribers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch subscribers" });
  }
};