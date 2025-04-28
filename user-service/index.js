const express = require('express');
const app = express();
const User = require('./user.model');
require('./db'); // Import your database connection
const cors = require('cors');
app.use(cors());


app.use(express.json());

// Set your secret registration code
const SECRET_REGISTRATION_CODE = 'Da31##';

// Register route
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, schoolName, registrationCode } = req.body;

    // Check registration code
    if (registrationCode !== SECRET_REGISTRATION_CODE) {
      return res.status(403).json({ message: 'Invalid registration code' });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create and save new user
    const newUser = new User({ name, email, password, schoolName });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Login route (no change)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
