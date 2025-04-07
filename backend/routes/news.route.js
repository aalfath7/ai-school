const express = require("express");
const router = express.Router();
const News = require("../models/news");
const auth = require("../middleware/auth");
const fs = require("fs");
const path = require("path");

// CREATE News
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    let imagePath = "";

    if (req.files && req.files.image) {
      const image = req.files.image;
      const filename = `${Date.now()}-${image.name}`;
      imagePath = `/uploads/${filename}`;
      await image.mv(path.join(__dirname, "..", "uploads", filename));
    }

    const news = new News({ title, content, image: imagePath });
    await news.save();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ ALL with pagination and search
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const search = req.query.search || "";
    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    const total = await News.countDocuments(query);
    const news = await News.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      data: news,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET Single
router.get("/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "Not found" });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    let news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "Not found" });

    if (req.files && req.files.image) {
      if (news.image) {
        const oldPath = path.join(__dirname, "..", news.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      const image = req.files.image;
      const filename = `${Date.now()}-${image.name}`;
      const imagePath = `/uploads/${filename}`;
      await image.mv(path.join(__dirname, "..", "uploads", filename));
      news.image = imagePath;
    }

    news.title = title;
    news.content = content;
    await news.save();

    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "Not found" });

    if (news.image) {
      const imagePath = path.join(__dirname, "..", news.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await news.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
