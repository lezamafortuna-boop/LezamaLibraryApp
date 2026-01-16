const express = require('express');
const { Book } = require('../models/books');
const router = express.Router();

// Import secured middleware
const { secured } = require('../index');

// GET: List of books
router.get('/', secured, async (req, res) => {
    try {
        const booksList = await Book.find({});
        res.render('books', { books: booksList, active: 'home' });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.render('books', { books: [], message: 'Error loading books', active: 'home' });
    }
});

// GET: Add book form
router.get('/add', secured, (req, res) => {
    res.render('form', { 
        title: 'Add a New Book', 
        action: '/add', 
        active: 'add' 
    });
});

// POST: Create book
router.post('/add', secured, async (req, res) => {
    try {
        const tags = req.body.tags ? req.body.tags.split(',').map(t => t.trim()) : [];
        req.body.tags = tags;

        await Book.create(req.body);

        res.render('form', { 
            title: 'Add a New Book', 
            action: '/add', 
            message: 'Book added successfully!', 
            active: 'add' 
        });
    } catch (error) {
        console.error('Error creating book:', error);
        res.render('form', { 
            title: 'Add a New Book', 
            action: '/add', 
            message: 'Error creating book', 
            active: 'add' 
        });
    }
});

// GET: Edit form
router.get('/edit/:id', secured, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.render('form', { 
            title: 'Edit Book', 
            action: `/edit/${req.params.id}`, 
            book, 
            active: 'edit' 
        });
    } catch (error) {
        console.error('Error fetching book:', error);
        res.redirect('/');
    }
});

// POST: Update book
router.post('/edit/:id', secured, async (req, res) => {
    try {
        const tags = req.body.tags ? req.body.tags.split(',').map(t => t.trim()) : [];
        req.body.tags = tags;

        await Book.updateOne({ _id: req.params.id }, req.body);

        const books = await Book.find();
        res.render('books', { 
            books, 
            message: 'Book updated successfully!', 
            active: 'home' 
        });
    } catch (error) {
        res.render('form', { 
            title: 'Edit Book', 
            action: `/edit/${req.params.id}`, 
            message: `Error updating book`, 
            active: 'edit' 
        });
    }
});

// POST: Delete book
router.post('/delete/:id', secured, async (req, res) => {
    try {
        await Book.deleteOne({ _id: req.params.id });
        res.redirect('/');
    } catch (error) {
        const books = await Book.find();
        res.render('books', { 
            books, 
            message: 'Error deleting book', 
            active: 'home' 
        });
    }
});

module.exports = router;