import { Document, model, Schema } from "mongoose";
import userSchema from "./user";

export interface Ipost extends Document {
  enabled: boolean,
  IDauthor: object,
  likes?: number,
  postType: string,
  content: string,
  image: string,
  comments?: string,
}

const postSchema = new Schema({
  enabled: {
    type: Boolean,
    required: true,
  },
  author: userSchema,
  likes: {
    type: Number,
    required: false,
  },
  postType: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  comments: {
    Array,
    required: false,
  },
});

export default model<Ipost>('post', postSchema);