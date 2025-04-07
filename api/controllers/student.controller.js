const Student = require("../models/Student");

// GET all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST register new student
exports.registerStudent = async (req, res) => {
  try {
    const { name, birthDate, schoolOrigin, gender } = req.body;
    const photo = req.files?.photo;
    let photoPath = "";

    if (photo) {
      const fileName = Date.now() + "_" + photo.name;
      photoPath = "/uploads/" + fileName;
      await photo.mv(`./uploads/${fileName}`);
    }

    const student = new Student({
      name,
      birthDate,
      schoolOrigin,
      gender,
      photo: photoPath,
    });

    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update student
exports.updateStudent = async (req, res) => {
  try {
    const { name, birthDate, schoolOrigin, gender } = req.body;
    const photo = req.files?.photo;

    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.name = name || student.name;
    student.birthDate = birthDate || student.birthDate;
    student.schoolOrigin = schoolOrigin || student.schoolOrigin;
    student.gender = gender || student.gender;

    if (photo) {
      const fileName = Date.now() + "_" + photo.name;
      const photoPath = "/uploads/" + fileName;
      await photo.mv(`./uploads/${fileName}`);
      student.photo = photoPath;
    }

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
