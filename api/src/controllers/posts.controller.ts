import { Request, Response } from "express";
const userSchema = require("../models/user");
const postSchema = require("../models/post");
const commentSchema = require("../models/comment");
export const addPost = async (req: Request, res: Response) => {
  const { image, content, idUser,idComment } = req.body;
  let post = await new postSchema();
  const user = await userSchema.find({_id:idUser})
  if(idComment?.length){
    const comment = await commentSchema.find({_id:idComment})
    console.log(comment)
    post.comments = comment[0]._id
  }
  try{
  if ((content.length || image.length) && idUser.length) {
    post.author= user[0]._id
    post.image = image;
    post.content = content;
    post.enabled = false;
    const savePost = await post.save();
    console.log(user[0].posts)
    user[0].posts = user[0].posts.concat(savePost)
    console.log(user[0])
    await user[0].save()
    res.status(200).send("new post");
  }}catch(e){
    res.status(400).send(e)
  }
};

export const getPost = async (_req: Request, res: Response) => {
  try {
    const post = await postSchema.find({});
    res.send(post);
  } catch (err) {
    res.status(400).send("There aren't any posts yet." + err);
  }
};

export const putPostById = async (req: Request, res: Response) => {
  const { id, action } = req.query;

  try {
    if (id) {
      const post = await postSchema.findOne({ _id: id });

      switch (action) {
        case "disable":
          if (post.enabled) {
            await postSchema.updateOne({ _id: id },{ enabled: false }
            );
            res.status(200).send("Post deleted successfully.");
          } else {
            res.status(400).send("Post is already deleted.");
          }
          break;
          case "enable":
            if (!post.enabled) {
              await postSchema.updateOne({ _id: id },{ enabled: true }
              );
              res.status(200).send("Post re-enabled successfully.");
            } else {
              res.status(400).send("Post is already deleted.");
            }
          break;
        default:
          res.status(400).send('Invalid action request.')
          break;
      }
    }
  } catch (e) {
    res.status(404).send(e);
  }
};
