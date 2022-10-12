import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config()

export async function connectDB(){
    console.log('conect db RedSocialIT')
    await mongoose.connect(`${process.env.MONGO_URI}`);
}
// connectDB();