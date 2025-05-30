import mongoose from "mongoose";

const userSchema= new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        fullName:{
            type:String,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6,
        },
        profilePic:{
            type:String,
            default:"",
        },
        isVerified:{
            type:Boolean,
            default:false,
        },
        verificationCode:String
    },
    {timestamps:true}
);

const User=mongoose.model("User",userSchema);

export default User;

