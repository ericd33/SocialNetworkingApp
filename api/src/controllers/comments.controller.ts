import { Request, Response } from "express";
const commentSchema = require("../models/comment");
const userSchema = require("../models/user");
const postSchema = require("../models/post");

export const addComment = async (req: Request, res: Response) => {
  const { text, image, authorComment, idPost } = req.body;
  const user = await userSchema.findOne({ email: authorComment });
  const post = await postSchema.findOne({ _id: idPost });
  let comment = await new commentSchema();
  try {
    
    if (
      (text.length || image.length) &&
      authorComment.length &&
      idPost.length
    ) {
      comment.author = user.email;
      comment.avatar = user.image;
      comment.name = user.name;
      comment.IdPost = idPost;
      comment.text = text;
      comment.image = image;
      comment.enabled = true;
      const newComent = await comment.save();
      post.comments = post.comments.concat(newComent);
      await post.save();
      res.status(200).send(post);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getCommentPost = async (req: Request, res: Response) => {
  const { idPost } = req.params;

  try {
    let comments = await commentSchema.find({ IdPost: idPost });
    let comment = comments?.map((e: any) => ({
      id: e._id,
      text: e.text,
      avatar: e.avatar,
      name: e.name,
      enabled: e.enabled,
    }));

    res.status(200).send(comment);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const commentUpdated = await commentSchema.findOneAndUpdate(
      { _id: id },
      {
        text,
      },
      {
        new: true,
      }
    );

    res.status(200).json(commentUpdated);
  } catch (error) {
    res.status(500).json({
      msj: "An error ocurred 😡",
      error,
    });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id, action } = req.body;

    if (id) {
      const comment = await commentSchema.findOne({ _id: id });
      switch (action) {
        case "disable":
          if (comment.enabled) {
            await commentSchema.updateOne({ _id: id }, { enabled: false });
            res.status(200).send("Comment deleted successfully.");
          } else {
            res.status(400).send("Comment is already deleted.");
          }
          break;
        case "enable":
          if (!comment.enabled) {
            await commentSchema.updateOne({ _id: id }, { enabled: true });
            res.status(200).send("Comment re-enabled successfully.");
          } else {
            res.status(400).send("Comment is already deleted.");
          }
          break;
        default:
          res.status(400).send("Invalid action request.");
          break;
      }
    }
  } catch (error) {
    res.status(500).json({
      msj: "An error ocurred 😡",
      error,
    });
  }
};
