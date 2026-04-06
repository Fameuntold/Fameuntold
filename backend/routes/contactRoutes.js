import express from "express";
import { contact, getContacts } from "../controller/contactController.js";
const router = express.Router();

// POST /api/contact
router.post("/contact", contact);
router.get("/get-contact", getContacts);

export default router;