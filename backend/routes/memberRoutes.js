import express from "express";
import { createMember, deleteMember, getMembers, updateMember } from "../controller/memberController.js";

const router = express.Router();

router.post("/add", createMember);
router.get("/", getMembers);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

export default router;