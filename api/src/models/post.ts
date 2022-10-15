import { Document, model, Schema} from "mongoose";

export interface Ipost extends Document {
  enabled: boolean,
  author: object,
  likes?: string[],
  content?: string,
  image?: string,
  comments?: string[],
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
});

const Post = model<Ipost>('post', postSchema);
module.exports = Post