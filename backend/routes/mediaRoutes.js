// routes/mediaRoutes.js
import express from "express";
import { getMedia, createMedia, updateMedia, deleteMedia } from "../controller/mediaController.js";
import upload from "../middleware/upload.js";


const router = express.Router();

router.get("/", getMedia);
router.post("/", upload.single("image"), createMedia);
router.put("/:id", upload.single("image"), updateMedia);
router.delete("/:id", deleteMedia);

export default router;