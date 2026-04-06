// controllers/mediaController.js
import Media from "../models/Media.js";

export const getMedia = async (req, res) => {
    res.json(await Media.find());
};

export const createMedia = async (req, res) => {
    const media = new Media({
        ...req.body,
        image: req.file ? `/uploads/${req.file.filename}` : ""
    });

    await media.save();
    res.json(media);
};

export const updateMedia = async (req, res) => {
    const updated = await Media.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            image: req.file
                ? `/uploads/${req.file.filename}`
                : req.body.image, 
        },
        { returnDocument: "after" });

    res.json(updated);
};

export const deleteMedia = async (req, res) => {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};