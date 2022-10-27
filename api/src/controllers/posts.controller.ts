import { Request, Response } from "express";
const mailSettings = require("../nodemailer/nodemailer");
const fs = require("fs-extra");
const cloudinary = require("cloudinary").v2;

const userSchema = require("../models/user");
const postSchema = require("../models/post");
interface MulterRequest extends Request {
  file: any;
}
export const addfile = async (req: Request, res: Response) => {
  // console.log((req as MulterRequest).file)
  // res.send("sera?")
  try {
    let send = await cloudinary.uploader.upload(
      (req as MulterRequest).file.path
    );
    // console.log(send.url)
    res.send(send.url);
    await fs.unlink((req as MulterRequest).file.path);
  } catch (error) {
    console.log(error);
  }
};

export const addPost = async (req: Request, res: Response) => {
  const { email, content, imageCloudinary } = req.body;
  // const { imageCloudinary } = (req as MulterRequest).file;
  // let send = await cloudinary.uploader.upload((req as MulterRequest).file.path)
  // let image = send.url
  // if(imageCloudinary){
  //   console.log(imageCloudinary)
  // }
  let post = await new postSchema();
  const user = await userSchema.find({ email: email });

  try {
    if (content.length || imageCloudinary.length) {
      post.author = email;
      post.image = imageCloudinary;
      post.content = content;
      post.enabled = true;
      const savePost = await post.save();
      user[0].posts = user[0].posts.concat(savePost._id);

      await user[0].save();
      res.status(200).send("new post");
    }
  } catch (e) {
    res.status(400).send(e);
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

export const paginate = async (req: Request, res: Response) => {
  const { paginate } = req.body;
  console.log("paginate", paginate);
  try {
    const post = await postSchema.find({});
    post.reverse();
    const itemPerPage = 10;
    const lastItem = paginate * itemPerPage;
    const firstItem = lastItem - itemPerPage;
    const currentItem = post.slice(firstItem, lastItem);
    currentItem.push({ page: paginate });
    // const post =await postSchema.find({});

    res.send(currentItem);
  } catch (err) {
    res.status(400).send("There aren't any posts yet." + err);
  }
};

export const putPostById = async (req: Request, res: Response) => {
  const { id, action } = req.body;

  try {
    if (id) {
      const post = await postSchema.findOne({ _id: id });

      switch (action) {
        case "disable":
          if (post.enabled) {
            await postSchema.updateOne({ _id: id }, { enabled: false });
            res.status(200).send("Post deleted successfully.");
          } else {
            res.status(400).send("Post is already deleted.");
          }
          break;
        case "enable":
          if (!post.enabled) {
            await postSchema.updateOne({ _id: id }, { enabled: true });
            res.status(200).send("Post re-enabled successfully.");
          } else {
            res.status(400).send("Post is already deleted.");
          }
          break;
        case "delete":
          await postSchema.updateOne({ _id: id }, { enabled: false });
          res.status(200).send("Post deleted successfully.");
          break;
        default:
          res.status(400).send("Invalid action request.");
          break;
      }
    }
  } catch (e) {
    res.status(404).send(e);
  }
};

export const findPostsByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const post = await postSchema.find({ author: email });

    res.status(200).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const putPost = async (req: Request, res: Response) => {
  try {
    const { idPost } = req.params;
    const { email, content } = req.body;

    const user = await userSchema.findOne({ email: email });
    const currentPost = await postSchema.findOne({ _id: idPost });

    currentPost.content = content;

    if (user) {
      const postUpdated = await postSchema.findByIdAndUpdate(
        {
          _id: idPost,
        },
        currentPost,
        {
          new: true,
        }
      );

      console.log("postUpdated", postUpdated);

      return res.status(200).json({
        data: postUpdated,
      });
    }

    return res.status(404).json({
      data: currentPost,
      msg: `User don't exist`,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `An error ocurred 😡`,
      error,
    });
  }
};

export const putPostLikes = async (req: Request, res: Response) => {
  try {
    const { idPost } = req.params;
    const { email } = req.body;

    const user = await userSchema.findOne({ email: email });
    const currentPost = await postSchema.findOne({ _id: idPost });

    if (user) {
      if (currentPost.likes.some((u: any) => u.email === user.email)) {
        currentPost.likes = currentPost.likes.filter(
          (u: any) => u.email !== user.email
        );
      } else {
        currentPost.likes.push(user);
      }

      const postUpdated = await postSchema.findByIdAndUpdate(
        {
          _id: idPost,
        },
        currentPost,
        {
          new: true,
        }
      );

      return res.status(200).json({
        data: postUpdated,
      });
    }

    return res.status(404).json({
      data: currentPost,
      msg: `User don't exist`,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `An error ocurred 😡`,
      error,
    });
  }
};

export const putPostComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { userId, commentData } = req.body;

    const user = await userSchema.findOne({ email: userId });
    const currentPost = await postSchema.findOne({ _id: postId });

    if (user && currentPost) {
      currentPost.comments.push(commentData);

      const postUpdated = await postSchema.findByIdAndUpdate(
        {
          _id: postId,
        },
        currentPost,
        {
          new: true,
        }
      );

      return res.status(200).json({
        data: postUpdated,
      });
    }

    return res.status(404).json({
      data: currentPost,
      msg: `This is not an error but... well... You know... 😅`,
    });
  } catch (error) {
    return res.status(500).json({
      msg: `An error ocurred 😡`,
      error,
    });
  }
};

export const reports = async (req: Request, res: Response) => {
  const { report, id, author, reporter } = req.body;
  try {
    // const userPost = await userSchema.findOne({email:author})
    const post = await postSchema.findOne({ _id: id });
    // console.log(post.disable);
    if (!post.disable.find((u: any) => u === reporter)) {
      post.disable.push(reporter);
      post.reports.push(report);
    }
    if (post.reports.length >= 5) {
      post.enabled = false;
      const transporter = mailSettings.transporter;
      const mailReports = mailSettings.mailReports(author);
      transporter.sendMail(mailReports, (err: any) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email enviado");
        }
      });
      post.save();
      res.status(200).send("post baneado");
    } else {
      post.save();
      res.status(200).send("ok");
    }
  } catch (e) {
    res.status(400).send(e);
  }
};
