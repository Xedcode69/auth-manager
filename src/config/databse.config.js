import mongoose from "mongoose";

import 'dotenv/config'


const DB_URI = process.env.DB_URL

const connectDB = mongoose.connect(DB_URI);

if (!connectDB){
    console.log('Database connection failed');
} else{
    console.log("successfully connected to database");
}

export default connectDB;