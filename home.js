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
});