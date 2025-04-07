const express = require("express");
const router = express.Router();

// Import model dengan aman dari overwrite error
const Student = require("../models/student");
const News = require("../models/news");

// Optional middleware jika ingin membatasi akses admin
// const auth = require("../middleware/auth");
// router.get("/", auth(["admin"]), async (req, res) => {

router.get("/", async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalNews = await News.countDocuments();

    const students = await Student.find().select("name nisn email phone");

    res.json({
      totalStudents,
      totalNews,
      students,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
