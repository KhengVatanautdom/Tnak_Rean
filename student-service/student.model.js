const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  SID: Number,
  email: String,
  bd: String
});

module.exports = mongoose.model('Student', studentSchema);