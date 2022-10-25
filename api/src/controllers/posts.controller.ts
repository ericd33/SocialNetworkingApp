import { Request, Response } from "express";
const mailSettings = require('../nodemailer/nodemailer');

const userSchema = require("../models/user");
const postSchema = require("../models/post");

export const addPost = async (req: Request, res: Response) => {
  const { email, content, image } = req.body;
  // console.log(req.body)
  let post = await new postSchema();
  const user = await userSchema.find({ email: email });

  try {
    if (content.length || image.length) {
      post.author = email;
      post.image = image;
      post.content = content;
      post.enabled = true;
      const savePost = await post.save();
      console.log(user[0].posts);
      user[0].posts = user[0].posts.concat(savePost._id);
      // console.log(user[0]);
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
        default:
          res.status(400).send("Invalid action request.");
          break;
      }
    }
  } catch (e) {
    res.status(404).send(e);
  }
};

// export const like = async (req: Request, res: Response) => {
//   const { idLiker, idPost } = req.body
//   const liker = await userSchema.findOne({_id:idLiker})
//   const post = await postSchema.findOne({_id:idPost})
//   console.log(liker._id)
//   console.log(post.likes)
//   try{
//     post.likes = [...new Set([...post.likes,liker._id])]
//     post.save()
//     res.status(200).send('successfully')
//   }catch(e){
//     res.status(400).send(e)
//   }
// }

export const findPostsByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  console.log(email);
  try {
    const post = await postSchema.find({ author: email });
    console.log(post);
    res.status(200).send(post);
  } catch (e) {
    res.status(400).send(e);
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
  const { report, id, author, reporter } = req.body
  try{
    // console.log(author)
    // const userPost = await userSchema.findOne({email:author}) 
    const post =await postSchema.findOne({_id:id})
    // console.log(post.disable);
    if (!post.disable.find((u: any) => u === reporter)) {
      post.disable.push(reporter)
      post.reports.push(report)
    }
    if(post.reports.length>=5){
      post.enabled = false
      const transporter = mailSettings.transporter;
      const mailReports = mailSettings.mailReports(author);
      transporter.sendMail(mailReports, (err: any ) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Email enviado');
        }
      });
      post.save()
      res.status(200).send('post baneado')
    }
  else{
    post.save()
    res.status(200).send('ok')
  }
  }catch(e){
    res.status(400).send(e)
  }
  
}