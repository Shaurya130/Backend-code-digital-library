  const express= require('express');
const { result } = require('lodash');
const mongoose= require('mongoose');
const bookRoutes= require('./Routes/book_routes')

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

// book routes
app.use(bookRoutes);

// 404

app.use((req, res)=>{
    res.status(404).render('err')
})