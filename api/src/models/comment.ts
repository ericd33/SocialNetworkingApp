import { Document, model, Schema } from "mongoose";

export interface Icomment extends Document {
  enabled: boolean;
  author: object;
  IdPost: object;
  like?: string[];
  text: string;
  image?: string;
}
const commentSchema = new Schema({
  enabled: {
    type: Boolean,
    required: true,
  },
  author: {},
  IdPost: {},
  like: [],
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Comment = model<Icomment>("comment", commentSchema);
module.exports = Comment;
