const asyncHandler= require("express-async-handler");

const registerUser= asyncHandler(async(req,res) =>{
    res.json({ message: "Register new user"});
})

const loginUser= asyncHandler(async(req,res) =>{
    res.json({ message: "Login new user"});
})

const currentUser= asyncHandler(async(req,res) =>{
    res.json({ message: "Current User Information"});
})

module.exports= {registerUser, loginUser, currentUser};

