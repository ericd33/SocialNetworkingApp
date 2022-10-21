import { Request, Response } from "express";
const userSchema = require("../models/user");

const eventSchema = require("../models/event");

const mailSettings = require('../nodemailer/nodemailer');


export const addUser = async (req: Request, res: Response) => {
  const { name, email, image } = req.body;
  console.log(req.body)
  var user = await new userSchema();
  // console.log(name)
  // console.log(email)
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
  console.log(follow.email)
  console.log(followed.followeds.some((e:any)=>e.email!==follow.email))
  try{
    if(followed && !followed.followeds.some((e:any)=>e.email!==follow.email)){
      followed.followeds.push(follow.email)
      follow.follows.push(followed.email)
    }else{
      followed.followeds = followed.followeds.filter((e:any)=>e!==follow.email)
      follow.follows = follow.follows.filter((e:any)=>e!==followed.email)
    }
    followed.save()
    follow.save()
    res.status(200).send('successfolly')
  }catch(e){
    res.status(400).send(e)
  }
}
export const asistEvents = async (req: Request, res: Response) => {
  const { eventId, userEmail } = req.body
  const event = await eventSchema.findOne({_id:eventId})
  const user = await userSchema.findOne({email:userEmail})
  
  // console.log(user)
  try{
    if(event && !event.participants.some((e:any)=>e.email!==user.email)){
      event.participants.push(user.email)
      user.asistEvent.push(eventId)
    }else{
      let participants = []
      let events = []
      participants = event.participants.filter((e:any)=>e!==user.email)
      events = user.asistEvent.filter((e:any)=>e!==eventId) 
      user.asistEvent = events;
      event.participants = participants;
    }
    user.save()
    event.save()
    res.status(200).send('successfolly')
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
  // console.log(req.params)
  console.log(email)
  try {
    if (email) {
      const user = await userSchema.findOne({ "email": email });
      console.log(user)
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
  const { id, action, email } = req.query;

  try {
    if (id) {
      const user = await userSchema.findOne({ _id: id });
      switch (action) {
        case "disable":
          if (user.enabled) {
            await userSchema.updateOne({ _id: id },{ enabled: false }
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
              await userSchema.updateOne({ _id: id },{ enabled: true }
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

