import { Document, model, Schema, Types } from "mongoose";


export interface Icomment extends Document{
    enabled: boolean,
    author: object,
    IDpost: object,
    like?:string[],
    text:string,
    image?:string
}
const commentSchema = new Schema({

    enabled:{
        type:Boolean,
        required:true
    },

    author: {
        type: Types.ObjectId,
        ref: 'users',
        require: true
    },

    IDpost: {
        type: Types.ObjectId,
        ref: 'post',
        require: true
    },
    like:{
        type:Array,
        required:false
    },
    text:{
        type:String,
        required:true
    },
    image:{
        type:String,
    }
});

const Comment = model<Icomment>('comment', commentSchema);
module.exports = Comment