import { Request, Response } from "express";
const mercadopago = require("mercadopago");
const userSchema = require("../models/user");


export const success = (_req: Request, res: Response) => {
    res.send("todo bien")
}

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
        mercadopago.preferences.create(preference)
            .then(function (response:any) {
                res.send(response.body.init_point)
            })
            .catch(function (error:any) {
                console.log(error);
            });
}




export const susciption = async (req: Request, res: Response)=>{
    const {id} = req.body

    let preference = {
        back_urls:{
            success:"http://localhost:3001/mercado/success"
        },
        items: [
                {
                    id:id,
                    title: "Estado premium de ConcatUs",
                    unit_price: 1000,
                    quantity: 1,
                    currency_id:"ARS"
                },
        ],
        notification_url: `https://thoughtless-event-production.up.railway.app/mercado/notificacion/${id}`
        };
        mercadopago.preferences.create(preference)
            .then(function (response:any) {
                res.status(200).json(response)
            })
            .catch(function (error:any) {
                console.log(error);
            });
}


export const notification =async (req: Request, res: Response)=>{
    const {query} = req
    const { id }=req.params

    try{
    const topic = query.topic || query.type
    switch(topic){
        case "payment":
            const paymentId = query.id || query["data.id"]
            const payment = await mercadopago.payment.findById(paymentId)
            var {body} = await mercadopago.merchant_orders.findById(payment.body.order.id)
    
            break;
        case "merchant_order":
            const orderId = query.id
            var { body } = await mercadopago.merchant_orders.findById(orderId)
            break;
    }
        body.payments.forEach(async(payment:any) => {
            if(payment.status==="approved"){
                await userSchema.findOneAndUpdate({_id:id},{premium:true})
                res.status(200)
            }

        });
    }catch(e){
        res.status(400).send(e)
    }
}
