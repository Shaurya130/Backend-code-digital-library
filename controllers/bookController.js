const Book = require('../models/books');

// whenever we are interacting with mongodb we recieve a promise in order to  handle that we use express-async-handler
const asyncHandler= require("express-async-handler")

//now we dont need to write try catch block async handler would automatically send the error to the handler so wrap our request in asynchandler

const bookIndex = asyncHandler(async(req, res) => {
    await Book.find()
        .then(result => {
            res.render('index', { books: result });
        })
        .catch(err => {
            console.log(err);
            res.render('err');
        });
});

const bookDetails = asyncHandler(async(req, res) => {
    const bookId = req.params.id; 
    const boom= await Book.findById(bookId);
    if(!boom){
        res.status(404).render('err');
        throw new Error("Contact not found");
    }
    res.status(200).json(boom);
    res.render('details', { book: boom});
});

const bookDelete = asyncHandler(async(req, res) => {
    const bookId = req.params.id;
    const bookDt= await Book.findById(bookId);
    if(!bookDt){
        res.status(404).render('err');
        throw new Error("Book not found")
    }
    const bookDelete= await Book.findByIdAndDelete(bookId);
    res.status(201).json({message:`Deleted book with id ${req.params.id}`})
    res.redirect('/books');
});

const bookEdit = asyncHandler(async(req, res) => {
    const bookId = req.params.id;
    const bookCheck= await Book.findById(bookId);
    if(!bookCheck){
        res.status(404).render('err');
        throw new Error("Book not found")
    }
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
    const bookEdit= await Book.findByIdAndUpdate(bookId, updatedBook, { new: true });
    res.status(200).json(updatedBook);
    res.redirect(`/books/${bookId}`);
});


const bookCreate = asyncHandler(async(req, res) => {
    console.log("The requested body is:",req.body);
    const{ BookName,Author,Year,Price,Discount,NumberOfPages,Fresh,Description }= req.body;
    if(!BookName || !Author || !Year || !Price || !Discount  || !NumberOfPages || !Fresh || !Description){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
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
    await newBook.save()
    res.staus(201).json({newBook})
    res.redirect('/books');
});

module.exports = {
    bookIndex,
    bookDetails,
    bookCreate,
    bookEdit,
    bookDelete
};
