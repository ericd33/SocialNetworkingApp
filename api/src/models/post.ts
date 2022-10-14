import { Document, model, Schema, Types } from "mongoose";

export interface Ipost extends Document {
  enabled: boolean,
  author: object,
  likes?: string[],
  content: string,
  image: string,
  comments?: string,
}

const postSchema = new Schema({
  enabled: {
    type: Boolean,
    required: true,
  },
  author: {
    type: Types.ObjectId,
    ref: 'users',
    require: true
  },
  likes: [{
    type:Types.ObjectId,
    ref: 'users',
    required:false
  }],
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  comments: [{
    type: Types.ObjectId,
    ref: "users",
    required:false
  }],//sacarlo y hacer la relacion una vez se crea el comentario 
});

const Post = model<Ipost>('post', postSchema);
module.exports = Post