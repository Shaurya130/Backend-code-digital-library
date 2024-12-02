const asyncHandler= require("express-async-handler");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken")
const User = require("../models/userModel");
const nodemailer=require("nodemailer");
const { generateOTP } = require("../utils/generateVerificationCode");
const { verify } = require("crypto");

const transporter =nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const adminOTP = new Map(); // To store admin otp temporarily
const otps = new Map(); // To store OTPs temporarily

//@desc Register New User
//@route POST /register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    console.log("Working");
    console.log("Request body: ", req.body); // Log the request body

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        console.log("Validation failed: Missing fields"); // Log validation failure
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        console.log("User already exists"); // Log duplicate user check
        throw new Error("User Already Registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password: ", hashedPassword); // Log hashed password

    const verifyOTP=generateOTP();
    
    otps.set(email, verifyOTP);

    // Send OTP email
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "OTP VERIFICATION",
        text: `Hello ${username},\n\nYour OTP code is: ${verifyOTP}\n\nThank you!`
    };

    if(mailOptions){
        await transporter.sendMail(mailOptions);
    } else{
        console.error('Error sending OTP:', error);
       res.status(500);
       throw new Error("Failed! Error sending OTP:")
    }

    if (user) {
        res.status(201).json({message:"OTP sent to your mail"},{ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data not valid");
    }
});


//Json web tokens comprise of 3 parts =Header, Payload and Signature

//@desc Login Existing User
//@route POST /login
//@access public

const loginUser= asyncHandler(async(req,res) =>{
    const {email,password}= req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user= await User.findOne({email});

    const storedOTP = otps.get(email);
    const admine= adminOTP.get(email);

    if(password==admine && email===process.env.ADMIN_EMAIL)
    {
        res.status(200).json({message:"WELCOME ADMIN"},{ accessToken });
    }

    //compare password with hashed password
    if(((user && (await bcrypt.compare(password, user.password)))|| (user && storedOTP==password) ) && user.isVerified==true){   //database password encrypted
        const accessToken= jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "60m" }
    );
        res.status(200).json({ accessToken });
    } else{
        res.status(401);
        throw new Error("email or password is not valid or user is not verified")
    }
})

//@desc For current user interface
//@route POST /current
//@access private

const currentUser= asyncHandler(async(req,res) =>{
    res.json(req.user); //was stored in eq.user in validate token
})

//@desc Forgot Password OTP generator
//@route POST /forgotpassword
//@access public

const forgotPassword= asyncHandler(async(req,res) =>{
    const {email}= req.body;
    if(!email){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const sendOTP = async(email) =>{
        const existing= await User.findOne({ email });
        if(!existing){
            res.status(404);
            throw new Error("No User by this email")
        }
        const otp= generateOTP();

        otps.set(email, {otp, expiresAt: Date.now() + 5*60*1000});

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "OTP VERIFICATION",
            text: `Hello ${username},\n\nYour OTP code is: ${otp}\n Please put this otp as password while login\nThank you!`
    };
        // hey you were supposed to make a create password request and you were editing here
    
        if(mailOptions){
            await transporter.sendMail(mailOptions);
        } else{
            console.error('Error sending OTP:', error);
           res.status(500);
           throw new Error("Failed! Error sending OTP:")
        }
    }
    res.json(req.user); //was stored in eq.user in validate token
})

//@desc Email Authentication
//@route POST /verification
//@access public

const verifyUser = asyncHandler(async(req,res) =>{
    const {email,otp}= req.body;

    if (!email || !otp) {
        res.status(400);
        throw new Error("Email and OTP are required.");
    }

    const storedOTP = otps.get(email);

    if (storedOTP === otp) {
        otps.delete(email);
        const user= await User.findOne({email});
        user.isVerified= true;
        const register = await User.create({
            username,
            email,
            password: hashedPassword,
            isVerified: true
        });
        console.log("User created: ", user); // Log user creation
        res.status(200).json({message:"Congratulations! You are verified"})
    }
    else
    {
        res.status(400);
        throw new Error("INCORRECT OTP or PASSWORD")
    }
})

//@desc For reseting the password
//@route POST /resetpassword
//@access public

const resetPassword = asyncHandler(async(req,res) =>{
    const {email, otp, newPassword}= req.body;
    if (!email || !otp  || !newPassword) {
        res.status(400);
        throw new Error("Email, New password and OTP are required.");
    }

    const storedOTP = otps.get(email);

    if (storedOTP === otp) {
        otps.delete(email);
        const user= await User.findOne({email});
        user.password= newPassword;
        res.status(200).json({message:"Your password has been reset with provided password"});
    }
    else{
        res.status(400);
        throw new Error("INCORRECT OTP, please reset again");
    }
})

const adminCon= asyncHandler(async(req,res) =>{
    const {email}= req.body;
    if(!email){
        res.status(400);
        throw new Error("NO EMAIL GIVEN");
    }

    const adminMail= process.env.ADMIN_EMAIL;

    if(adminMail===email)
    {
        const otp= generateOTP();

        adminOTP.set(email, otp);

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "OTP VERIFICATION",
            text: `Hello ADMIN ,\n\nYour OTP code is: ${otp}\n Please put this otp as password while login\nThank you!`
        };
    if(mailOptions){
        await transporter.sendMail(mailOptions);
    } else{
        console.error('Error sending OTP:', error);
       res.status(500);
       throw new Error("Failed! Error sending OTP:")
    }
    res.status(200).json({message:"LOGIN WITH YOUR OTP ADMIN"});
}
else{
    res.status(401);
    throw new Error("YOU ARE NOT AUTHORIZED TO THIS PATH");
}
})
module.exports= { registerUser, loginUser, currentUser, forgotPassword , verifyUser , resetPassword, adminCon };

