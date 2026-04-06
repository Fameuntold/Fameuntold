// routes/newsRoutes.js
import express from "express";
import { getNews, createNews, updateNews, deleteNews } from "../controller/newsController.js";
import upload from "../middleware/upload.js";


const router = express.Router();

router.get("/", getNews);
router.post("/", upload.single("image"), createNews);
router.put("/:id", upload.single("image"), updateNews);
router.delete("/:id", deleteNews);

export default router;