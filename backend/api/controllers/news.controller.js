const News = require("../models/News");

// GET all news
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one news by ID
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create news
exports.createNews = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.files?.image;
    let imagePath = "";

    if (image) {
      const fileName = Date.now() + "_" + image.name;
      imagePath = "/uploads/" + fileName;
      await image.mv(`./uploads/${fileName}`);
    }

    const news = new News({ title, content, image: imagePath });
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update news
exports.updateNews = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.files?.image;

    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    news.title = title || news.title;
    news.content = content || news.content;

    if (image) {
      const fileName = Date.now() + "_" + image.name;
      const imagePath = "/uploads/" + fileName;
      await image.mv(`./uploads/${fileName}`);
      news.image = imagePath;
    }

    await news.save();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE news
exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json({ message: "News deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
