import { Document, model, Schema } from "mongoose";
// const mongoose = require('mongoose');
const IDauthor = require('./user')
const IDpost = require('./post')

export interface Icomment extends Document{
    enabled: boolean,
    IDauthor: object,
    IDpost: object,
    upVotes?:string[],
    content:string,
}
const commentSchema = new Schema({
   
    enabled:{
        type:Boolean,
        required:true
    },

    IDauthor: [IDauthor],

    IDpost: [IDpost],
    
    upVotes:{
        type:Array,
        required:false
    },
    content:{
        type:String,
        required:true
    }
    
});

export default model<Icomment>('comment', commentSchema);