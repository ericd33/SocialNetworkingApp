import { Request, Response } from "express";
const opinionSchema = require("../models/opinion");
const userSchema = require("../models/user");

export const addOpinion = async (req: Request, res: Response) => {
  const { text, authorOpinion } = req.body;
  const user = await userSchema.findOne({ email: authorOpinion });
  let opinion = await new opinionSchema();
  try {
    if 
      (text.length && authorOpinion.length )  {
      opinion.author = user.email;
      opinion.avatar = user.image;
      opinion.name = user.name;
      opinion.text = text;
      opinion.enabled = true;

      const newOpinion = await opinion.save();
      user.opinions = user.opinions.concat(newOpinion);
      await user.save();
      res.status(200).send(opinion);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

// export const getOpinions = async (_req: Request, res: Response) => {
//     try {
//       const opinions = await opinionSchema.find({});
//       res.send(opinions);
//     } catch (err) {
//       res.status(400).send("There aren't any opinion yet." + err);
//     }
//   };

export const getOpinions = async (req: Request, res: Response) => {
    const { idOpinion } = req.params;
  
    try {
      let opinions = await opinionSchema.find({ IdOpinion: idOpinion });
      let opinion = opinions?.map((e: any) => ({
        id: e._id,
        text: e.text,
        avatar: e.avatar,
        name: e.name,
        enabled: e.enabled,
      }));
  
      res.status(200).send(opinion);
    } catch (e) {
      res.status(400).send(e);
    }
  };