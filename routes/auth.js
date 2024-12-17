const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Dummy users (in a real app, you'd store users in a database)
const users = [
    { id: 1, username: 'admin', password: '$2a$10$....' } // hashed password
];

// Register new user (for simplicity, using dummy data)
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    // Here you would save the user to the database
    users.push({ id: Date.now(), username, password: hashedPassword });
    res.json({ message: 'User registered successfully' });
});

// Login (return JWT token)
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
});

module.exports = router;