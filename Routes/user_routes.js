const express= require("express");
const {registerUser, loginUser, currentUser, forgotPassword,verifyUser, resetPassword, adminCon}= require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router= express.Router();

router.post("/register", registerUser);

router.post("/login",loginUser);

router.get("/current",validateToken, currentUser);

router.post("/forgotpassword",forgotPassword);

router.post("/verification", verifyUser);

router.post("/resetpassword", resetPassword);

router.post("/admin",adminCon)

module.exports= router;