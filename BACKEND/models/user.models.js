import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true , "please enter your name"],
    },

    email:{
        type: String,
        required: [true , "please enter your email"],
        lowercase: true,
        unique: true,
    },

    password:{
        type: String,
        required: [true , "please enter your password"],
    },

    number:{
        type: Number,
        required: [true , "please enter your number"],
        unique: true
    }
} , {timestamps: true});

export const User = mongoose.model("User" , userSchema);