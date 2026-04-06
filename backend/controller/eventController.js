// controllers/eventController.js
import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
    res.json(await Event.find());
};

export const createEvent = async (req, res) => {
    const event = new Event({
        ...req.body,
       image: req.file ? `/uploads/${req.file.filename}` : ""
    });

    await event.save();
    res.json(event);
};

export const updateEvent = async (req, res) => {
    const updated = await Event.findByIdAndUpdate(req.params.id,  {
      title: req.body.title,
      description: req.body.description,
      image: req.file
        ? `/uploads/${req.file.filename}` 
        : req.body.image, 
    }, { returnDocument: "after" });

    res.json(updated);
};

export const deleteEvent = async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};