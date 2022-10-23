import { Document, model, Schema } from "mongoose";

export interface Icomment extends Document {
  enabled: boolean;
  author: object;
  IdPost: string;
  like?: string[];
  text?: string;
  image?: string;
  name: string;
  avatar: string
}
const commentSchema = new Schema({
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
  IdPost: {
    type:String
  },
  like: [],
  text: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Comment = model<Icomment>("comment", commentSchema);
module.exports = Comment;
