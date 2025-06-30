const User = require('../models/User');

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already in use' });

    const newUser = await User.create({ email, password });
    res.status(201).json({ message: 'Signup successful', userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Signup failed. Try again.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed. Try again.' });
  }
};

module.exports = { signup, login };
