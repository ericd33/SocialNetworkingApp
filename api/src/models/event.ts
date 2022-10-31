import { Document, model, Schema} from "mongoose";


export interface Ievent extends Document {
    name: string
    author: object,
    date: Date,
    content: string,
    type: string,
    meet_link: string,
    location: string,
    image?: string,
    enabled: string,
    nameAuthor:string,
    avatar:string,
    participants?: string[],
    lat_log:string[]
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
        type: Date,
        required: true,
    },
    type: {
        type: String
    },
    meet_link: {
        type: String
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
    },
    participants: [],
    lat_log:[]
    },{
        timestamps:true
      });

    const Event = model<Ievent>('event', eventSchema);
    module.exports = Event