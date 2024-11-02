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
        required: true
    },
   Price:{
        type: Number,
        required: true
    },
    Discount:{
        type: Number,
        required: true
    },
    NumberOfPages:{
        type: Number,
        required: true
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
