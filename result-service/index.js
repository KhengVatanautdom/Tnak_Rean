// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('./db');


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Schema
const resultSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  courseId: { type: String, required: true, unique: true }, // Important to find/update by courseId
  score: { type: Number, required: true },
  grade: { type: String, required: true }
});

const Result = mongoose.model('Result', resultSchema);

// Routes

// Add result
app.post('/results', async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all results
app.get('/results', async (req, res) => {
  try {
    const results = await Result.find();
    res.send(results);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get results by studentId
app.get('/results/student/:studentId', async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.params.studentId });
    res.send(results);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update result by courseId
app.put('/results/course/:courseId', async (req, res) => {
  try {
    const result = await Result.findOneAndUpdate(
      { courseId: req.params.courseId },
      req.body,
      { new: true }
    );
    if (!result) {
      return res.status(404).send({ message: 'Result not found' });
    }
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete result by courseId
app.delete('/results/:studentId/:courseId', async (req, res) => {
  try {
    const { studentId, courseId } = req.params;
    const result = await Result.findOneAndDelete({ studentId, courseId });
    if (!result) {
      return res.status(404).send({ message: 'Result not found for this student and course' });
    }
    res.send({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
