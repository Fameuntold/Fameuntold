import express from "express";
import { getSubscribers, subscribe } from "../controller/subscriberController.js";

const router = express.Router();

// POST /api/newsletter/subscribe
router.post("/subscribe", subscribe);

router.get("/all", getSubscribers);

export default router;