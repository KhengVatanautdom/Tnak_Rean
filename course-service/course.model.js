const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseID: String,
  title: String,
  description: String,
  credits: Number
});

module.exports = mongoose.model("Course", courseSchema);
