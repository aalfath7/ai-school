const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const path = require("path");
const serverless = require("serverless-http");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/auth", require("../routes/auth.route"));
app.use("/news", require("../routes/news.route"));
app.use("/students", require("../routes/student.route"));
app.use("/dashboard", require("../routes/dashboard.route"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to AI School API 🎓",
  });
});

// Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
module.exports = app;
module.exports.handler = serverless(app);
