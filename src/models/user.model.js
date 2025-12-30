import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        maxLength: 100,
        minLength: 3,
        required: [true, "User name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        maxLength: 50,
        minLength: 5,
        unique: true,
        lowercase: true,
        trim: true,
        match: ['/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/',"Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minLength: 5,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {timestamps: true});



const User = mongoose.model("User", userSchema);

export default User;