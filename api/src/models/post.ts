import { Document, model, Schema } from "mongoose";

export interface Ipost extends Document {

  enabled: boolean,
  author: object,
  likes?: string[],
  content?: string,
  image?: string,
  comments?: string[],
  reports?: string[],
  disable?:string[],
}

const postSchema = new Schema({
  enabled: {
    type: Boolean,
    required: true,
  },
  author: {},
  likes: [],
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  comments: [],
  reports:[],
  disable:[]
});

const Post = model<Ipost>("post", postSchema);
module.exports = Post;
