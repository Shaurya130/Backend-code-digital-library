const { min } = require('lodash');
const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const bookSchema= new Schema({
    BookName:{
        type: String,
        required: true
    },
    Author:{
        type: String,
        required: true
    },
    Year:{
        type: Number,
        required: true,
        min: 1800
    },
   Price:{
        type: Number,
        required: true,
        min:0
    },
    Discount:{
        type: Number,
        required: true
    },
    NumberOfPages:{
        type: Number,
        required: true,
        min:0
    },
    Fresh:{
        type: Boolean,
        required: false
    },
    Description:{
        type: String,
        required: true
    }
}, {timestamps: true});

const Book= mongoose.model('Book', bookSchema);

module.exports =  Book;
