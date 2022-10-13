import { Document, model, Schema } from "mongoose";
// const mongoose = require('mongoose');

export interface Iuser extends Document{
    name: string,
    email: string,
    role: string,
    enabled: boolean,
    password: string,
    friends?: string[],
    posts?:string[],
    liked?:string[],
}
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
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
    liked:{
        type:Array,
        required:false
    }
    
});

export default model<Iuser>('users', userSchema);


