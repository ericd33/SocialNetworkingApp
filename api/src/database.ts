import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config()

export async function connectDB(){
    
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log('conect db RedSocialIT')
}
// connectDB();