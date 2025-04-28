const express = require('express');
const app = express();
const Student = require('./student.model');
require('./db');
const cors = require('cors');
app.use(cors());

app.use(express.json());

// Add Student
app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

// Get all Students
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// Get Student by SID
app.get('/students/sid/:sid', async (req, res) => {
  const student = await Student.findOne({ SID: req.params.sid });
  if (student) {
    res.send(student);
  } else {
    res.status(404).send({ error: 'Student not found' });
  }
});

// Update Student by SID
app.put('/students/sid/:sid', async (req, res) => {
  const student = await Student.findOneAndUpdate(
    { SID: req.params.sid },   // Find by SID
    req.body,                  // Update with new data
    { new: true }               // Return updated document
  );
  if (student) {
    res.send(student);
  } else {
    res.status(404).send({ error: 'Student not found' });
  }
});

// Delete Student by SID
app.delete('/students/sid/:sid', async (req, res) => {
  const student = await Student.findOneAndDelete({ SID: req.params.sid });
  if (student) {
    res.send({ message: 'Student deleted successfully' });
  } else {
    res.status(404).send({ error: 'Student not found' });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log("Server running");
});
