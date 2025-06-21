const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');




// registerUser: This function handles the user registration process, creates a new user in the database, and returns a success message with the user's userId.

// loginUser: This function checks if the entered email exists in the database, compares the password using bcrypt, and returns a JWT token if authentication is successful.

// logoutUser: A simple function that returns a success message when a user logs out.

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: 'User registered', userId: user._id });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed', details: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
};

const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = { registerUser, loginUser, logoutUser };


// This code defines three controller functions for handling user authentication-related actions: registerUser, loginUser, and logoutUser. These functions interact with a User model and use bcrypt for password hashing and jsonwebtoken (JWT) for token generation.