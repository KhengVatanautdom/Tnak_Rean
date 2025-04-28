const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Course = require("./course.model");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Add a course
app.post("/courses", async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).send({ error: "Error adding course" });
  }
});

// Get all courses
app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).send({ error: "Error fetching courses" });
  }
});

// Search course by courseID
app.get("/courses/CourseID/:courseID", async (req, res) => {
  try {
    const course = await Course.findOne({ courseID: req.params.courseID });
    if (course) {
      res.json(course);
    } else {
      res.status(404).send({ error: "Course not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
});

// Update course by courseID
app.put("/courses/CourseID/:courseID", async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { courseID: req.params.courseID },
      req.body,
      { new: true }
    );
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(400).send({ error: "Error updating course" });
  }
});

// Delete course by courseID
app.delete("/courses/CourseID/:courseID", async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ courseID: req.params.courseID });
    if (!course) {
      return res.status(404).send({ error: "Course not found" });
    }
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(400).send({ error: "Error deleting course" });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Course service running on port ${PORT}`);
});
