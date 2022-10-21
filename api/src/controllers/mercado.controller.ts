import { Request, Response } from "express";
const mercadopago = require("mercadopago");



export const mercado = (req: Request, res: Response) => {
    const { donacion } = req.body
    let preference = {
        items: [
                {
                    title: "Gracias por tu donación!",
                    unit_price: donacion,
                    quantity: 1,
                },
        ],
        };
        mercadopago.preferences
            .create(preference)
            .then(function (response:any) {
                res.redirect(response.body.init_point)
            })
            .catch(function (error:any) {
                console.log(error);
            });
}

