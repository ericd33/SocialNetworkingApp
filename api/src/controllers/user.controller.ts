import { Request, Response } from "express";
const userSchema = require("../models/user");

const eventSchema = require("../models/event");
const commentSchema = require("../models/comment");
const mailSettings = require('../nodemailer/nodemailer');
const postSchema = require("../models/post");


export const addUser = async (req: Request, res: Response) => {
  const { name, email, image } = req.body;

  var user = await new userSchema();

  try {
    let checkingUserExist = await userSchema.find({ email: email });
    if (checkingUserExist.length) {
      res.status(200).send("el email ya esta usado");
      return;
    }

    if (!name.length && !email.length) {
      res.send("error");
      return;
    }

    const checkIfPropertyExist = (property: any) => {
      if (property) {
        return property;
      }
      return null;
    }; 
    user.image = image
    user.name = checkIfPropertyExist(name);
    user.role = "user";
    user.enabled = true;
    user.premium=false;
    user.email = checkIfPropertyExist(email);

    await user.save();

    res.status(200).send("signUp");

//NODEMAILER

const transporter = mailSettings.transporter;
const mailDetails = mailSettings.mailDetails(email);

transporter.sendMail(mailDetails, (err: any ) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Email enviado');
  }
});

  } catch (e) {
    res.status(400).send(e);
  }
};


export const addFriend = async (req: Request, res: Response) => {
  const { emailFollowed, emailFollow } = req.body
  const followed = await userSchema.findOne({email:emailFollowed})
  const follow = await userSchema.findOne({email:emailFollow})
  let followInfo = {
    name: follow.name,
    email:emailFollow,
    avatar: follow.image
  }
  let followedInfo = {
    name: followed.name,
    email:emailFollowed,
    avatar: followed.image
  }
  try{
    if(!followed.followeds.some((e:any)=>e.email===emailFollow)){
      followed.followeds.push(followInfo)
      follow.follows.push(followedInfo)
    }else{
      followed.followeds = followed.followeds.filter((e:any)=>e.email!==follow.email)
      follow.follows = follow.follows.filter((e:any)=>e.email!==followed.email)
    }
    followed.save()
    follow.save()
    res.status(200).send('successfully')
  }catch(e){
    res.status(400).send(e)
  }
}

export const asistEvents = async (req: Request, res: Response) => {
  const { eventId, userEmail } = req.body
  const event = await eventSchema.findOne({_id:eventId})
  const user = await userSchema.findOne({email:userEmail})
  try{
    if(!event.participants.includes(user.email)){
      let assistInfo = {
        name: user.name,
        email: user.email,
        avatar: user.image
      }
      event.participants.push(assistInfo);
      user.asistEvent.push(eventId);
    }else{
      let participants = []
      let events = []
      participants = event.participants.filter((e:any)=>e.email!==userEmail)
      events = user.asistEvent.filter((e:any)=>e!==eventId) 
      user.asistEvent = events;
      event.participants = participants;
    }
    user.save()
    event.save()
    res.status(200).send('successfully')
  }catch(e){
    res.status(400).send(e)
  }
}


export const findUserByName = async (req: Request, res: Response) => {
  const { name } = req.query;
  try {
    if (name) {
      const user = await userSchema.find({
        name: { $regex: name, $options: "ig" },
      });
      if (user.length) {
        res.status(200).send(user);
        return;
      }
      res.status(201).send("el usuario no existe");
      return;
    } else {
      const users = await userSchema.find({}).populate('post');
      users.length
        ? res.status(200).send(users)
        : res.status(400).send("sin eventos");
    }
  } catch (e) {
    res.status(400).send(e);
    return;
  }
};

export const findUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (id) {
      const user = await userSchema.findOne({ "_id": id });
      
      if (user) {
        res.status(200).send(user)
        return
      }
      res.status(404).send('User id not found.')
    }
  } catch (e) {
    res.status(400).send(e);
    return;
  }
};

export const findUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    if (email) {
      const user = await userSchema.findOne({ "email": email });
      if (user) {
        res.status(200).send(user)
        return
      }
      res.status(404).send('User id not found.')
    }
  } catch (e) {
    res.status(400).send(e);
    return;
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { action, email } = req.body;

  try {
    if (email) {
      const user = await userSchema.findOne({ email: email });
      switch (action) {
        case "disable":
          if (user.enabled) {
            await userSchema.updateOne({ email: email },{ enabled: false }
            );

            //NODEMAILER
            const transporter = mailSettings.transporter;
            const mailDetails = mailSettings.mailDelete(email);
            transporter.sendMail(mailDetails, (error: any,) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Email enviado");
              }
            });


            res.status(200).send("User deleted successfully.");
          } else {
            res.status(400).send("User is already deleted.");
          }
          break;
          case "enable":
            if (!user.enabled) {
              await userSchema.updateOne({ email: email },{ enabled: true }
              );
              res.status(200).send("User re-enabled successfully.");
            } else {
              res.status(400).send("User is already deleted.");
            }
          break;
        default:
          res.status(400).send('Invalid action request.')
          break;
      }
    }
  } catch (err) {
    res.status(404).send(err);
  }
}

export const findUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try{
    const users = await userSchema.findOne({ email: email });
    if(password === users?.password) return res.status(200).send(true)
    return res.status(200).send(false);
  }
  catch(err) {
    return res.status(400).send(err);
  }
}



export const userEvents = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (id) {
      const user = await userSchema.findOne({_id: id });
  
      if (user) {
        res.status(200).send(user.events)
        return
      }
      res.status(404).send('User not found.')
    }
  } catch (e) {
    res.status(400).send(e);
    return;
  }
};

export const editImage = async (req: Request, res: Response) => {
  const {image, email} = req.body
  try{
    const user = await userSchema.findOne({email:email})
    if(image.length){
      user.image= image
      user.save()
    }
    res.status(200).send("image chance")
  }catch(e){
    res.status(400).send("ouch image invalidated")
  }
}
export const editName = async (req: Request, res: Response) => {
  const {name, email} = req.body
  try{
    const user = await userSchema.findOne({email:email})
    
    if(name.length){
      user.name= name
      user.save()
      await commentSchema.update({author:email},{name:name})
      await eventSchema.update({author:email},{nameAuthor:name})
    }
    res.status(200).send("name chance")
  }catch(e){
    res.status(400).send("ouch name invalidated")
  }
}

export const editPresentation = async (req: Request, res: Response) => {
  const {presentation, email} = req.body
  try{
    if(presentation.length){
      await userSchema.findOneAndUpdate({email:email},{presentation:presentation})
    }
    res.status(200).send("name chance")
  }catch(e){
    res.status(400).send("ouch name invalidated")
  }
}
export const editWebSite = async (req: Request, res: Response) => {
  const { webSite, email} = req.body
  try{
    if(webSite.length){
      await userSchema.findOneAndUpdate({email:email},{website:webSite})
    }
    res.status(200).send("name chance")
  }catch(e){
    res.status(400).send("ouch name invalidated")
  }
}


export const addFavorite = async (req: Request, res: Response) => {
  const { idPost, emailUser} = req.body
  try{
    const user = await userSchema.findOne({email: emailUser})
    const post =await postSchema.findOne({_id:idPost})
    // console.log(user.liked[0]._id)
    // console.log(post._id)
    // console.log(post._id.toString()==user.liked[0]._id.toString())
    let posts = user.liked?.some((e:any)=>e._id.toString()==post._id.toString())
    console.log(posts) 
    if(posts){
      // posts =[]
      // console.log(user.liked[0]._id==post._id)
      user.liked = user.liked.filter((e:any)=>e._id.toString()!=post._id.toString())
      // console.log(user.liked)
      user.save()
      res.status(200).send("delete")
    }else{
      user.liked.push(post)
      user.save()
      res.status(200).send("ok")
    }
  }catch(e){
    res.status(400).send(e)
  }
}

export const shops = async (_req: Request, res: Response) => {
  console.log("holas")
  const users = await userSchema.find({}) 
  // console.log(users)
  const shops = users.map((e:any)=>{
    return (
      {
        info:e.shops,
        user:e.name,
        avatar:e.image,
        email:e.email
    })
  })
  //console.log(shops)
  res.status(200).send(shops) 
}