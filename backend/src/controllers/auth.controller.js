import {generateToken} from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js"
import {SendVerificationCode, WelcomeEmail} from "../middleware/mail.js"

export const signup= async (req,res)=>{
    const {fullName,email,password}=req.body;
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password.length<6){
            return res.status(400).json({message:"password must be at least 6 character"});
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);
        const verificationCode=Math.floor(100000+Math.random()*900000).toString();

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword,
            verificationCode
        })

        if(newUser){
            // generate jwt token here
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profiePic:newUser.profilePic,
            })
            SendVerificationCode(newUser.email,newUser.verificationCode);
        }
        else{
            res.status(400).json({message:"Invalid user data"});
        }
    }
    catch(error){
        console.log("Error in signup controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const verifyEmail=async(req,res)=>{
    try{
        const {code}=req.body;
        const user= await User.findOne({
            verificationCode:code
        })
        if(!user){
            console.log("user nahi mial");
            return res.status(400).json({sucess:false,message:"Invalid or Expired Code"});
        }
        user.isVerified=true;
        user.verificationCode=undefined;
        await user.save();

        res.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profiePic:user.profilePic,
        })


        await WelcomeEmail(user.email,user.fullName);

    }
    catch(error){
        console.log(error);
        return res.status(500).json({sucess:false,message:"Internal error"});
    }
}

export const login= async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});

        if(!user) return res.status(400).json({message:"Invalid email or password"});

        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid email or password"});

        generateToken(user._id,res);
        return res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        })

    }
    catch(error){
        console.log("Error in login controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const logout= (req,res)=>{
    try{
        res.cookie("jwt","",{
            maxAge:0,
        })
        return res.status(200).json({message: "Logged out successfully"});
    }
    catch(error){
        console.log("Error in logout controller",error.message);
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const updateProfile=async (req,res)=>{
    try{
        const {profilePic}= req.body;
        req.user._id;
        const userId=req.user._id;

        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"});
        }

        const uploadResponse=await cloudinary.uploader.upload(profilePic);
        const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});

        res.status(200).json(updatedUser);
    }
    catch(error){
        console.log("error in update profile",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const checkAuth= (req,res)=>{
    try{
        return res.status(200).json(req.user);
    }
    catch(error){
        console.log("Error in checkAuth controller",error.message);
        return res.status(500).json({message:"Internal Server Error"});
    }
}