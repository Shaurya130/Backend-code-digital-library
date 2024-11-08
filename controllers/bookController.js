const Book = require('../models/books');

const bookIndex = (req, res) => {
    Book.find()
        .then(result => {
            res.render('index', { books: result });
        })
        .catch(err => {
            console.log(err);
            res.render('err');
        });
};

const bookDetails = (req, res) => {
    const bookId = req.params.id; 
    Book.findById(bookId)
        .then(result => {
            if (result) {
                res.render('details', { book: result });
            } else {
                res.status(404).render('err');
            }
        })
        .catch(err => {
            console.log(err);
            res.render('err');
        });
};

const bookDelete = (req, res) => {
    const bookId = req.params.id;
    Book.findByIdAndDelete(bookId)
        .then(result => {
            if (result) {
                res.redirect('/books');
            } else {
                res.status(404).render('err');
            }
        })
        .catch(err => {
            console.log(err);
            res.render('err');
        });
};

const bookEdit = (req, res) => {
    const bookId = req.params.id;
    const updatedBook = {
        BookName: req.body.BookName,
        Author: req.body.Author,
        Year: req.body.Year,
        Price: req.body.Price,
        Discount: req.body.Discount,
        NumberOfPages: req.body.NumberOfPages,
        Description: req.body.Description,
        Fresh: req.body.Fresh === 'on'  
    };

    Book.findByIdAndUpdate(bookId, updatedBook, { new: true })
        .then(result => {
            if (result) {
                res.redirect(`/books/${bookId}`);
            } else {
                res.status(404).render('err');
            }
        })
        .catch(err => {
            console.error(err);
            res.render('err');
        });
};


const bookCreate = (req, res) => {
    const newBook = new Book({
        BookName: req.body.BookName,
        Author: req.body.Author,
        Year: req.body.Year,
        Price: req.body.Price,
        Discount: req.body.Discount,
        NumberOfPages: req.body.NumberOfPages,
        Description: req.body.Description,
        Fresh: req.body.Fresh === 'on'  
    });

    newBook.save()
        .then(() => {
            res.redirect('/books');
        })
        .catch(err => {
            console.log(err);
            res.render('err');
        });
};

module.exports = {
    bookIndex,
    bookDetails,
    bookCreate,
    bookEdit,
    bookDelete
};
