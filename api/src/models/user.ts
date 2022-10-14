import { Document, model, Schema } from "mongoose";


export interface Iuser extends Document{
    name: string,
    email: string,
    role: string,
    enabled: boolean,
    password: string,
    friends?: string[],
    posts?:string[],
    liked?:string[],
    events?:string[]
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
    friends:[],
    posts:[],
    liked:[],
    events:[]
});

const User = model<Iuser>('users', userSchema);
module.exports = User



