// controllers/newsController.js
import News from "../models/News.js";

export const getNews = async (req, res) => {
  const news = await News.find();
  res.json(news);
};

export const createNews = async (req, res) => {
  const { title, description } = req.body;

  console.log("FILE:", req.file); // DEBUG

  const news = new News({
    title,
    description,
    image: req.file ? `/uploads/${req.file.filename}` : "",
  });

  await news.save();
  res.json(news);
};

export const updateNews = async (req, res) => {
  const { id } = req.params;

  const updated = await News.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      description: req.body.description,
      image: req.file
        ? `/uploads/${req.file.filename}` 
        : req.body.image, // keep old image
    },
    { returnDocument: "after" }
  );

  res.json(updated);
};



export const deleteNews = async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};