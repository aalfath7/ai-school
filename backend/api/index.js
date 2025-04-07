const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const path = require("path");
const serverless = require("serverless-http");
const News = require("../models/News");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/api/uploads", express.static(path.join(__dirname, "./uploads")));

// Routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/news", require("./routes/news.route"));
app.use("/api/students", require("./routes/student.route"));
app.use("/api/dashboard", require("./routes/dashboard.route"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to AI School API 🎓",
  });
});

router.get("/api/news", async (req, res) => {
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

// Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
module.exports = app;
module.exports.handler = serverless(app);
