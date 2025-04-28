const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://darluch:utdom@utdom.rkrwl8d.mongodb.net/coursedb?retryWrites=true&w=majority&appName=utdom");
    console.log("Connected to MongoDB Atlas - Course DB");
  } catch (err) {
    console.error("MongoDB connection error", err);
    process.exit(1);
  }
};

module.exports = connectDB;
