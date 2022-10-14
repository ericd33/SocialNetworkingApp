import { Request, Response } from "express";
const commentSchema = require("../models/comment");

export const addComment = async (req: Request, res: Response) => {
  const { text, image } = req.body;
  console.log("atoy");
  let comment = await new commentSchema();
  if (text.length) {
    comment.text = text;
    comment.image = image;
    comment.enabled = false;
    await comment.save(function (err: any, comment: any) {
      if (err) {
        res.send(err);
      }
      console.log(comment);
    });
    res.send("new comment");
  }
};

export const getComment = async (_req: Request, res: Response) => {
  try {
    const comments = await commentSchema.find({});
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      msj: "An error ocurred 😡",
      error,
    });
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
    const { id } = req.params;
    await commentSchema.findByIdAndDelete(id);

    res.status(200).json({
      msg: "comment delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      msj: "An error ocurred 😡",
      error,
    });
  }
};
