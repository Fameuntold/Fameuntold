// routes/eventRoutes.js
import express from "express";
import { getEvents, createEvent, updateEvent, deleteEvent } from "../controller/eventController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/", upload.single("image"), createEvent);
router.put("/:id", upload.single("image"), updateEvent);
router.delete("/:id", deleteEvent);

export default router;