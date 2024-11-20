const express= require('express');
 const dotenv= require("dotenv").config();
// const { result } = require('lodash');
const bookRoutes= require('./Routes/book_routes');
const userRoutes= require('./Routes/user_routes');
const errorHandler= require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');

//express app
const app= express();

connectDb();

//register view engine
app.set('view engine', 'ejs')

//middleware- alternsate express.json()
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

//user routes
app.use(userRoutes);

//error handling
app.use(errorHandler);

// 404

app.use((req, res)=>{
    res.status(404).render('err')
})