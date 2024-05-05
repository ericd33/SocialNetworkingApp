import { Request } from "express";

const conf = require("../firebase/config");
class Middleware {

    async decodeToken(req: Request, res, next) {

        try {
            if (!req.headers.authorization) {
                throw new Error('sin autorizacion');
            }
            const token = req.headers.authorization.split(' ')[1];

            const decodeValue = await conf.auth().verifyIdToken(token)


            //@ts-ignore
            req.currentUserEmail = decodeValue.email

            if (decodeValue) {
                return next();
            }
            return res.json({ message: "Unauthorized." })
        }
        catch (e) {
            console.log(e)
            return res.json({ message: 'Error' });

        }
    }
}

export type AppRequest = Request & { currentUserEmail: string };

module.exports = new Middleware();
