const moongoose= require("mongoose");

const userSchema= moongoose.Schema(
    {
    username:{
        type:String,
        required: [true, "Please add the user name"]
    },
    email:{
        type: String,
        required: [true, "Please add your email address"],
        unique: [true, "Email already taken"]
    },
    password:{
        type:String,
        required: [true, "Please add your user password"],
    },
    isVerified: Boolean
},
{
    timestamps: true,
}
);

module.exports = moongoose.model("User",userSchema);