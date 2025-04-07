const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: String,
  role: String,
});

module.exports = mongoose.model("User", UserSchema);
