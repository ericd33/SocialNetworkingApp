import { Request, Response } from "express";
const postSchema = require("../models/post");

export const addPost = async (req: Request, res: Response) => {
  const { image, content } = req.body;
  let post = await new postSchema();
  if (content.length || image.length) {
    post.image = image;
    post.content = content;
    post.enabled = true;
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
