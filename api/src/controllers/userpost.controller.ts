import { Request, Response } from "express";
const userSchema =  require ("../models/user")

export const addUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  var user = await new userSchema();

  // if (!name.length && !email.length && !password.length) {
  //   res.send("error");
  //   return
  // }

  user.name = name;
  user.role = "user";
  user.enabled = true;
  user.email = email;
  user.password = password;

  await user.save(function (err: any, user:any) {
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
