const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const fs = require("fs");
const path = require("path");

// CREATE student
router.post("/", async (req, res) => {
  try {
    const { name, birthDate, address } = req.body;
    let photoPath = null;

    if (req.files && req.files.photo) {
      const photo = req.files.photo;
      const photoName = Date.now() + "_" + photo.name;
      photoPath = "/uploads/" + photoName;

      await photo.mv(path.join(__dirname, "../uploads", photoName));
    }

    const student = new Student({ name, birthDate, address, photo: photoPath });
    await student.save();

    res.json({ message: "Student created", student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ students (with optional pagination & search)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const students = await Student.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Student.countDocuments(query);

    res.json({ students, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single student
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE student
router.put("/:id", async (req, res) => {
  try {
    const { name, birthDate, address } = req.body;
    const student = await Student.findById(req.params.id);

    if (!student) return res.status(404).json({ message: "Student not found" });

    if (req.files && req.files.photo) {
      // Hapus foto lama
      if (student.photo) {
        const oldPath = path.join(__dirname, "../", student.photo);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      const photo = req.files.photo;
      const photoName = Date.now() + "_" + photo.name;
      const photoPath = "/uploads/" + photoName;

      await photo.mv(path.join(__dirname, "../uploads", photoName));
      student.photo = photoPath;
    }

    student.name = name;
    student.birthDate = birthDate;
    student.address = address;

    await student.save();
    res.json({ message: "Student updated", student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (student.photo) {
      const photoPath = path.join(__dirname, "../", student.photo);
      if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
    }

    await Student.deleteOne({ _id: req.params.id });

    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
