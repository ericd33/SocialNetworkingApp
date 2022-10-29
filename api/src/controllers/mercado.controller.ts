import { Request, Response } from "express";
const mercadopago = require("mercadopago");
const userSchema = require("../models/user");
const mailSettings = require("../nodemailer/nodemailer");



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
    const user = await userSchema.findOne({_id:id})
    let preference = {
        items: [
                {
                    id:user.id,
                    title: "Estado premium de ConcatUs",
                    unit_price: 1000,
                    quantity: 1,
                    currency_id:"ARS"
                },
        ],
        notification_url: `https://b1ba-190-211-90-41.sa.ngrok.io/mercado/notificacion/${id}`
        };
        mercadopago.preferences.create(preference)
            .then(function (response:any) {
                res.json(response)
            })
            .catch(function (error:any) {
                console.log(error);
            });
}


export const notification =async (req: Request, res: Response)=>{
    const {query} = req
    const { id }=req.params
    const user = await userSchema.findOne({_id:id})
    console.log(user)
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
        let paidAmount = 0;
        body.payments.forEach(async(payment:any) => {
            if(payment.status==="approved"){
                paidAmount+=payment.transaction_amount
                await userSchema.findOneAndUpdate({_id:id},{premium:true})
                const transporter = mailSettings.transporter;
                const mailReports = mailSettings.mailReports(user.email);
                transporter.sendMail(mailReports, (err: any) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("Email enviado");
                  }
                });
            }
        });
        if(paidAmount >= body.total_amount){
            console.log("pago")
        }
        if(paidAmount< body.total_amount){
            console.log("no pago")
        }
    }catch(e){
        res.status(400).send(e)
    }
}
