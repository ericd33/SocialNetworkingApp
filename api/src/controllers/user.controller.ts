import { Request, Response } from "express"

export const signUp = (_req: Request, res:Response) => {
    res.send("signUp")
}

export const signIn = (_req: Request, res:Response) => {
    res.send("signIn")
}