import { Document, model, Schema } from "mongoose";
// const mongoose = require('mongoose');

export interface Iuser extends Document{
    email: string,
    role: string,
    enabled: boolean,
    password: string,
    friends?: string[],
    post?:string[],
    like?:string[],
}
const userSchema = new Schema({
    role:{
        type: String,
        required: true,
    },
    enabled:{
        type:Boolean,
        required:true
    },
    email:{
        type: String,
        required:true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    friends:{
        type:Array,
        required: false,
    },
    posts:{
        type:Array,
        required:false
    },
    like:{
        type:Array,
        required:false
    }
    
});

export default model<Iuser>('user', userSchema);


