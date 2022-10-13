import { Request, Response } from "express";
const commentSchema = require('../models/comment')

export const addComment = async (req: Request, res: Response) => {
    const { text, image } = req.body
    console.log('atoy')
    let comment = await new commentSchema()
    if(text.length){
        comment.text = text
        comment.image = image
        comment.enabled = false
    await comment.save(function (err:any, comment:any) {
        if (err) {
            res.send(err);
        }
            console.log(comment);
        });
    res.send("new comment");
    }
    
}

//GET

export const GetComment = async(_req: Request, res: Response) => {
    try{
        const comentario = await commentSchema.find({});
        res.send(comentario);
    }catch(e){
        res.status(400).send('sin comentarios'+e)
    }
}


