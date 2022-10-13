import { Request, Response } from "express";
import userSchema from "../models/user";

export const addUser = (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  var user = new userSchema();

  if (!name.length && !email.length && !password.length) {
    res.send("error");
    return
  }

  user.name = name;
  user.role = "user";
  user.enabled = true;
  user.email = email;
  user.password = password;

  user.save(function (err, user) {
    if (err) {
      res.send(err);
    }
    console.log(user);
  });

  res.send("signUp");
};

export const getUser = (_req: Request, res: Response) => {
  res.send("signIn");
};
