import { Document, model, Schema} from "mongoose";


export interface Ievent extends Document {
    name: string
    author: object,
    hour: number,
    date: string,
    content: string,
    location: string,
    image?: string,
    enabled: string,
    nameAuthor:string,
    avatar:string
}

const eventSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    nameAuthor:{
        type: String,
    },
    avatar:{
        type:String
    },
    date:{
        type: String,
        required: true,
    },
    hour:{
        type: Number,
        required: true,
    },
    enabled: {
        type: Boolean,
        required: true,
    },
    author: {},
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    location:{
        type: String,
        required: true
    }
    });

    const Event = model<Ievent>('event', eventSchema);
    module.exports = Event