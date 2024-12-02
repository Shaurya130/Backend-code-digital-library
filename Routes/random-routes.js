const express = require('express');
const asyncHandler= require("express-async-handler")
// const bookControl = require('../controllers/bookController');
const router = express.Router();

router.get('/test',asyncHandler(async(req, res) => {
    const mess= req.body;
    console.log(mess);
}))

module.exports= router;