import { Request, Response } from "express";
const mercadopago = require("mercadopago");



export const mercado = (req: Request, res: Response) => {
    const { donacion } = req.body;

    let preference = {
        items: [
                {
                    title: "Gracias por tu donación!",
                    unit_price: parseInt(donacion),
                    quantity: 1,
                },
        ],
        };
        mercadopago.preferences
            .create(preference)
            .then(function (response:any) {
                res.send(response.body.init_point)
            })
            .catch(function (error:any) {
                console.log(error);
            });
}




export const susrciption = (_req: Request, res: Response)=>{
    let preference = {
        items: [
                {
                    title: "Estado premium de ConcatUs",
                    unit_price: 1000,
                    quantity: 1,
                },
        ],
        notification_url: "https://272b-190-211-90-41.sa.ngrok.io/mercado/notificacion"
        };
        mercadopago.preferences
            .create(preference)
            .then(function (response:any) {
                res.json(response)
            })
            .catch(function (error:any) {
                console.log(error);
            });
}


export const notification = (req: Request, res: Response)=>{
    console.log("notificacion")
    const datos  = req.query
    console.log("hello")
    console.log(datos)
    res.status(200).send(datos)
}
