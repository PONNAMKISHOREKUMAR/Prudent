const express = require('express');
const db = require('../models/database');
const router = express.Router();

// Get all books
router.get('/books', (req, res) => {
    db.all('SELECT * FROM Books', [], (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching books' });
            return;
        }
        res.json(rows);
    });
});

// Add a new book
router.post('/books', (req, res) => {
    const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
    const query = 'INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [Title, AuthorID, GenreID, Pages, PublishedDate], function (err) {
        if (err) {
            res.status(500).json({ message: 'Error adding book' });
            return;
        }
        res.status(201).json({ message: 'Book added successfully', BookID: this.lastID });
    });
});

// Edit an existing book
router.put('/books/:id', (req, res) => {
    const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
    const query = 'UPDATE Books SET Title = ?, AuthorID = ?, GenreID = ?, Pages = ?, PublishedDate = ? WHERE BookID = ?';
    db.run(query, [Title, AuthorID, GenreID, Pages, PublishedDate, req.params.id], function (err) {
        if (err) {
            res.status(500).json({ message: 'Error updating book' });
            return;
        }
        res.json({ message: 'Book updated successfully' });
    });
});

// Delete a book
router.delete('/books/:id', (req, res) => {
    const query = 'DELETE FROM Books WHERE BookID = ?';
    db.run(query, [req.params.id], function (err) {
        if (err) {
            res.status(500).json({ message: 'Error deleting book' });
            return;
        }
        res.json({ message: 'Book deleted successfully' });
    });
});

module.exports = router;