import Member from "../models/Member.js";

//  CREATE
export const createMember = async (req, res) => {
    try {
        const member = new Member(req.body);
        await member.save();
        res.status(201).json(member);
    } catch (err) {
        res.status(500).json({ message: "Error creating member" });
    }
};

//  GET ALL
export const getMembers = async (req, res) => {
    try {
        const members = await Member.find().sort({ createdAt: -1 });
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: "Error fetching members" });
    }
};

// UPDATE MEMBER
export const updateMember = async (req, res) => {
    try {
        const updatedMember = await Member.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // return updated data
        );

        if (!updatedMember) {
            return res.status(404).json({ message: "Member not found" });
        }

        res.json(updatedMember);
    } catch (err) {
        res.status(500).json({ message: "Error updating member" });
    }
};

//  DELETE MEMBER
export const deleteMember = async (req, res) => {
    try {
        const deleted = await Member.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Member not found" });
        }

        res.json({ message: "Member deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting member" });
    }
};