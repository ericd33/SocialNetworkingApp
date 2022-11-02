import { Document, model, Schema } from "mongoose";

export interface Iopinion extends Document {
  enabled: boolean;
  author: object;
  text?: string;
  name: string;
  avatar: string
}
const opinionSchema = new Schema({
  enabled: {
    type: Boolean,
    required: true,
  },
  avatar:{
    type:String
  },
  name:{
    type:String
  },
  author: {},
  text: {
    type: String,
  },
  IdOpnion: {
    type:String
  },
},{
  timestamps:true
});

const Opinion = model<Iopinion>("opinion", opinionSchema);
module.exports = Opinion;