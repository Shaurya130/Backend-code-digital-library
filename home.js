<<<<<<< HEAD
const express= require('express');
const { result } = require('lodash');
const mongoose= require('mongoose');
const Book = require('./models/books');

//express app
const app= express();

//mongo
const dbuRi= 'mongodb+srv://Shaurya:Shaurya123@cluster0.3igor.mongodb.net/bookdetails?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbuRi, {useNewUrlParser: true , useUnifiedTopology: true})
.then((result)=> console.log('Connected to DataBase'))
.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs')

//listen

app.listen(3000);
app.get('/create',(req, res)=>{
    res.render('new')
});

app.get('/',(req, res)=>{

   const Book= new Book({
    Book: 'Harry Potter and The Sorcerers stone',
    Author: 'JK Rowling',
    Year: 2001,
    Price: 500,
    Discount: 0,
    NumberOfPages: 300,
    Fresh: true,
    Description: 'Fantasy', });

    Book.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.get('/create',(req, res)=>{
    res.render('new')
});

app.get('/about',(req, res)=>{
    res.render('about')
});

// 404

app.use((req, res)=>{
    res.status(404).render('err')
=======
const express= require('express');
const { result } = require('lodash');
const mongoose= require('mongoose');
const Book= require('./models/books');

//express app
const app= express();

//mongo
const dbuRi= "mongodb+srv://Shaurya:Shaurya123@cluster0.3igor.mongodb.net/bookdetails?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbuRi)
.then((result)=> app.listen(3000))
.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs')

//middleware
app.use(express.urlencoded({ extended: true }));

//mongo-text

app.get('/show',(req, res)=>{
   const newBook= new Book({
    BookName: 'Harry Potter and The Sorcerers stone',
    Author: 'JK Rowling',
    Year: 2001,
    Price: 500,
    Discount: 0,
    NumberOfPages: 300,
    Fresh: true,
    Description: 'Fantasy'})

    newBook.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    })
});
app.get('/all-book', (req, res) => {
    Book.find()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.post('/create', (req,res)=>{
    const neww= new Book(req.body)

    neww.save()
    .then((result) =>{
        res.redirect('/')
    })
    .catch((err) =>{
        console.log(err);
    })
  })
  
  app.get('/create',(req, res)=>{
    res.render('new')
});

    app.get('/', (req, res) => {
        Book.find()
            .then(result => {
                res.render('index', { books: result });
            })
            .catch(err => {
                console.log(err);
                res.render('err');
            });
    });

app.get('/about',(req, res)=>{
    res.render('about')
});
app.get('/', (req, res) => {
    newBookBook.find()
        .then(result => {
            res.render('newBook', { newbook: result });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post('/create', (req, res) => {
    const newBook = new Book({
        BookName: req.body.BookName,
        Author: req.body.Author,
        Year: req.body.Year,
        Price: req.body.Price,
        Discount: req.body.Discount,
        NumberOfPages: req.body.NumberOfPages,
        Description: req.body.Description,
        Fresh: req.body.Fresh === 'true' || req.body.Fresh === 'false'
    });
    newBook.save()
    .then(() => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
        res.render('err');
    });

});

app.get('/:id', (req, res) => {
    // console.log('Requested book ID:', req.params.id)
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
});

app.post('/books/:id/delete', (req, res) => {
    const bookId = req.params.id;
    Book.findByIdAndDelete(bookId)
        .then(result => {
            if (result) {
                res.redirect('/');
            } else {
                res.status(404).render('err');
            }
        })
        .catch(err => {
            console.log(err);
            res.render('err'); 
        });
});

app.post('/books/:id/edit', (req, res) => {
    const bookId = req.params.id;
    const updatedBook = {
        BookName: req.body.BookName,
        Author: req.body.Author,
        Year: req.body.Year,
        Price: req.body.Price,
        Discount: req.body.Discount,
        NumberOfPages: req.body.NumberOfPages,
        Description: req.body.Description,
        Fresh: req.body.Fresh === 'true'
    };

    Book.findByIdAndUpdate(bookId, updatedBook, { new: true }) 
        .then(result => {
            if (result) {
                res.redirect(`/${bookId}`);
            } else {
                res.status(404).render('err');
            }
        })
        .catch(err => {
            console.error( err);
            res.render('err'); 
        });
});


// 404

app.use((req, res)=>{
    res.status(404).render('err')
>>>>>>> 0733b31 (Final Commit)
});