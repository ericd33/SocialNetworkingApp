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

export const findUserAndGetAllUser = async (req: Request, res: Response) => {
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
