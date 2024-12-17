const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./book-management.db');

// Create the tables if they do not exist
db.serialize(() => {
    // Create Authors table
    db.run(`CREATE TABLE IF NOT EXISTS Authors (
        AuthorID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL
    )`);

    // Create Genres table
    db.run(`CREATE TABLE IF NOT EXISTS Genres (
        GenreID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Description TEXT
    )`);

    // Create Books table
    db.run(`CREATE TABLE IF NOT EXISTS Books (
        BookID INTEGER PRIMARY KEY AUTOINCREMENT,
        Title TEXT NOT NULL,
        AuthorID INTEGER,
        GenreID INTEGER,
        Pages INTEGER,
        PublishedDate TEXT,
        FOREIGN KEY(AuthorID) REFERENCES Authors(AuthorID),
        FOREIGN KEY(GenreID) REFERENCES Genres(GenreID)
    )`);
});

module.exports = db;