const express = require('express');
const bookControl = require('../controllers/bookController');
const router = express.Router();
const Book = require('../models/books');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken); // for protecting all the routes

router.get('/books/create', (req, res) => {
    res.render('new'); 
});

router.post('/books/create', bookControl.bookCreate); 

router.get('/books', bookControl.bookIndex);

router.get('/books/about', (req, res) => {
    res.render('about');
});

router.get('/books/:id', bookControl.bookDetails);

router.post('/books/:id/delete', bookControl.bookDelete);

router.post('/books/:id/edit', bookControl.bookEdit);

module.exports = router;