const express= require('express');
 const dotenv= require("dotenv").config();
// const { result } = require('lodash');
const bookRoutes= require('./Routes/book_routes');
const userRoutes= require('./Routes/user_routes');
const errorHandler= require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const Book= require('./models/books');
const random= require('./Routes/random-routes');

//express app
const app= express();

try {
  connectDb();
} catch (err) {
  console.error(`Database connection failed: ${err.message}`);
  process.exit(1); // Exit the application
}

const port=process.env.PORT || 8080;
app.listen(port, (err) => {
  if (err) {
      console.error(`Failed to start server: ${err.message}`);
  } else {
      console.log(`Server running on port ${port}`);
  }
});

//register view engine
app.set('view engine', 'ejs')

//middleware- alternsate express.json()
app.use(express.json());
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
  // console.log("hi");
    Book.find()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

// book routes
app.use("/api/user",bookRoutes);


//user routes
app.use("/api/user",userRoutes);

// console.log("hi");

//error handling
app.use(errorHandler);

//test route


// 404

app.use((req, res)=>{
    res.status(404).render('err')
})