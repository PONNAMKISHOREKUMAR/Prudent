const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/books'); // Keep the book routes

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', bookRoutes); // Keep the book routes

// Start the server with error handling
try {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log("hello")
    });
} catch (error) {
    console.error('Error starting server:', error);
    throw new Error('Failed to start server');
}