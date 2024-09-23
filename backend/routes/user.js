const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../schema/userSchema');
const jwt = require('jsonwebtoken');

// Register route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const frequency = 10;
        const hashedPassword = await bcrypt.hash(password, frequency);

        user = await User.create({ username, email, password: hashedPassword });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login route
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
