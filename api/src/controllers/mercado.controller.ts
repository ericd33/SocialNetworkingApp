import { Request, Response } from "express";
const mercadopago = require("mercadopago");
const userSchema = require("../models/user");


export const success = (_req: Request, res: Response) => {
    res.send("todo bien")
}

export const mercado = (req: Request, res: Response) => {
    const { donacion } = req.body;
    try{
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
                    res.json(response.body)
                })
                .catch(function (error:any) {
                    console.log(error);
                });
    }catch(e){  
        console.log(e)
    }
}




export const susciption = async (req: Request, res: Response)=>{
    const {id} = req.body
    // console.log(id)
try{
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
        notification_url: `https://1bd4-190-211-90-41.sa.ngrok.io/mercado/notificacion/${id}`
        };
        mercadopago.preferences.create(preference)
            .then(function (response:any) {
                res.status(200).json(response)
            })
            .catch(function (error:any) {
                console.log(error);
            });
}catch(e){
    console.log(e)
}
    
}


export const notification =async (req: Request, res: Response)=>{
    const {query} = req
    const { id }=req.params
    console.log(query)
    try{
    const topic = query.topic || query.type

    switch(topic){
        case "payment":
            const paymentId = query.id || query["data.id"]
            console.log(paymentId)
            const payment = await mercadopago.payment.findById(paymentId)
            console.log(payment)
            var {body} = await mercadopago.merchant_orders.findById(payment.body.order.id)
            console.log(body)
            console.log("payment",body)
            break;
        case "merchant_order":
            const orderId = query.id
            console.log(orderId)
            var { body } = await mercadopago.merchant_orders.findById(orderId)
            console.log("merchan", body)
            break;
    }
    body.payments.forEach(async(payment:any) => {
        console.log(payment.status)
            console.log(payment.status)
            if(payment.status==="approved"){
                console.log(payment)
                const user = await userSchema.findOne({_id:id})
                console.log(user)
                user.shops = user.shops.push(payment)
                user.save()
                await userSchema.findOneAndUpdate({_id:id},{premium:true})
                res.status(200)
            }
            if(payment.status==="reject"){
                const user = await userSchema.findOne({_id:id})
                console.log(user)
                user.shops = user.shops.push(payment)
                user.save()
                res.status(200)
            }
        });
    }catch(e){
        res.status(400).send(e)
    }
}
