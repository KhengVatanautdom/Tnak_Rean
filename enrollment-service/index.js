const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  studentId: String,
  courseId: String,
  enrollmentDate: {
    type: Date,
    default: Date.now
  }
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

// ✅ Add enrollment
app.post('/enrollments', async (req, res) => {
  try {
    const enrollment = new Enrollment(req.body);
    await enrollment.save();
    res.status(201).send(enrollment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// ✅ Get all enrollments
app.get('/enrollments', async (req, res) => {
  const enrollments = await Enrollment.find();
  res.send(enrollments);
});

// ✅ Search enrollments by studentId
app.get('/enrollments/student/:studentId', async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.params.studentId });
    res.send(enrollments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// ✅ Update enrollment by courseId
app.put('/enrollments/course/:courseId', async (req, res) => {
  try {
    const enrollment = await Enrollment.findOneAndUpdate(
      { courseId: req.params.courseId },
      req.body,
      { new: true }
    );
    if (!enrollment) {
      return res.status(404).send({ error: 'Enrollment not found' });
    }
    res.send(enrollment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// ✅ Delete enrollment by courseId
app.delete('/enrollments/course/:courseId', async (req, res) => {
  try {
    const enrollment = await Enrollment.findOneAndDelete({ courseId: req.params.courseId });
    if (!enrollment) {
      return res.status(404).send({ error: 'Enrollment not found' });
    }
    res.send({ message: 'Enrollment deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log('Enrollment service running on port 3000');
});
