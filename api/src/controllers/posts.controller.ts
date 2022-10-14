import { Request, Response } from "express";
const postSchema = require("../models/post");

export const addPost = async (req: Request, res: Response) => {
  const { image, content } = req.body;
  let post = await new postSchema();
  if (content.length || image.length) {
    post.image = image;
    post.content = content;
    post.enabled = false;
    await post.save(function (err: any, post: any) {
      if (err) {
        res.send(err);
      }
      console.log(post);
    });
    res.send("new post");
  }
};

export const getPost = async (_req: Request, res: Response) => {
  try {
    const post = await postSchema.find({});
    res.send(post);
  } catch (err) {
    res.status(400).send("There´s no posts yet" + err);
  }
};
