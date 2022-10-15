import { Request, Response } from "express";
const userSchema = require("../models/user");

export const addUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  var user = await new userSchema();
  try {
    let checkingUserExist = await userSchema.find({ email: email });
    if (checkingUserExist.length) {
      res.status(200).send("el email ya esta usado");
      return;
    }

    if (!name.length && !email.length && !password.length) {
      res.send("error");
      return;
    }

    const checkIfPropertyExist = (property: any) => {
      if (property) {
        return property;
      }
      return null;
    }; 
    user.name = checkIfPropertyExist(name);
    user.role = "user";
    user.enabled = true;
    user.email = checkIfPropertyExist(email);
    user.password = checkIfPropertyExist(password);

    await user.save(function (err: any, user: any) {
      if (err) {
        res.send(err);
      }
      console.log(user);
    });

    res.status(200).send("signUp");
  } catch (e) {
    res.status(400).send(e);
  }
};

export const addFriend = async (req: Request, res: Response) => {
  const { idFollowed, idFollow } = req.body
  const followed = await userSchema.findOne({_id:idFollowed})
  const follow = await userSchema.findOne({_id:idFollow})
  try{
    if(followed){
      followed.friends = follow._id
    }
    followed.save()
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
      const users = await userSchema.find({});
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
        res.status(200).send(user._id)
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
  const { id, action } = req.query;

  try {
    if (id) {
      const user = await userSchema.findOne({ _id: id });
      switch (action) {
        case "disable":
          if (user.enabled) {
            await userSchema.updateOne({ _id: id },{ enabled: false }
            );
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