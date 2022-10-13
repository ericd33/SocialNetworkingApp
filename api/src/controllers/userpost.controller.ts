import { Request, Response } from "express";
const userSchema = require("../models/user");

export const addUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  var user = await new userSchema();


  if (!name.length && !email.length && !password.length) {
    res.send("error");
    return
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

  res.send("signUp");
};

export const findUserAndGetAllUser = async(req: Request, res: Response) => {
  const { name } = req.query
  try{
      if(name){
      const user = await userSchema.find({name: name});
      if(user.length){
          res.status(200).send(user);
          return
      }
      res.status(201).send('el evento no existe')
      return
  }
  else{
      const users = await userSchema.find({})
      users.length
          ? res.status(200).send(users)
          : res.status(400).send('sin eventos')
  }
  }catch(e){
      res.status(400).send(e)
      return
  }
}
