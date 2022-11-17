
import axios from "axios"
const CLIENT = "AXhZzmHVzLk7pOaQE7jcmk_49ppCo4-4UW-s-EmQ_A7UhIlgZVPnmE7OKzcWN3eu_osFTHCQUBSMO2eW"
const SECRET = "EBh1JTq_NbKTrV9PO_blsnraRe24QeUVlhKqIADjt-03npRszlbOOZC_9nEhSSLMo6KrT_WJIoF5-xWM"
const PAYPAL_API = "https://api-m.sandbox.paypal.com"

import { Request, Response } from "express";
const userSchema = require("../models/user");
const mailSettings = require("../nodemailer/nodemailer");

export const createPayment =async ( req: Request, res: Response)=>{
    const {email} = req.body 
    console.log(email)
    try{
        const order = {
            intent: 'CAPTURE',
            purchase_units:[
                {
                    amount:{
                        currency_code:"USD",
                        value:"6"
                    }
                }
            ],
            application_context: {
                brand_name: `ConcatUs`,
                landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
                user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
    
                return_url: `${process.env.SELF_API_URL}/paypal/capture-order?email=${email}`, // Url despues de realizar el pago
                cancel_url: `${process.env.SELF_API_URL}/paypal/cancel-order` // Url despues de realizar el pago
    
            }
        }
        const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`,order,{
            auth:{
                username:CLIENT,
                password:SECRET
            }
        })
        res.send(response.data.links[1])
    }catch(e){
        res.send(e)
    }
}

export const captureOrder =async ( req: Request, res: Response)=>{
    const {token,email} = req.query
    console.log(email)
    try{
const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {},{
        auth:{
            username:CLIENT,
            password:SECRET
        }
    })

    if(response.data.status==="COMPLETED"){
        const user =await userSchema.findOne({email:email})
        console.log(user)
        user.premium=true
        const infoP = {
            payer:response.data.payer,
            infopago:response.data.purchase_units[0].payments.captures[0].amount
        }
        // console.log(infoP)
        user.shops = user.shops.concat(infoP)
        user.save()
        const transporter = mailSettings.transporter;
        const mailReports = mailSettings.mailPremium(user.email);
        transporter.sendMail(mailReports, (err: any) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Email enviado");
        }
        });
    }
    res.redirect(`${process.env.SELF_FRONT_URL}/home`)
    }catch(e){
        res.send(e)
    }
    
}


export const createDonations =async ( req: Request, res: Response)=>{
    const { mont,email } = req.body
    try{
const order = {
        intent: 'CAPTURE',
        purchase_units:[
            {
                amount:{
                    currency_code:"USD",
                    value:parseInt(mont)
                }
            }
        ],
        application_context: {
            brand_name: `ConcatUs`,
            landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
            user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
            return_url: `${process.env.SELF_API_URL}/paypal/capture-order-donations?email=${email}`, // Url despues de realizar el pago
            cancel_url: `${process.env.SELF_API_URL}/paypal/cancel-order` // Url despues de realizar el pago
        }
    }
    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`,order,{
        auth:{
            username:CLIENT,
            password:SECRET
        }
    })
    res.send(response.data.links[1])
    }catch(e){
        res.send(e)
    }
    
}
export const captureOrderDonations =async ( req: Request, res: Response)=>{
    const {token,email} = req.query
    try{
const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {},{
        auth:{
            username:CLIENT,
            password:SECRET
        }
    })
   // let email = response.data.payment_source.paypal.email_address
    if(response.data.status==="COMPLETED"){
        const user =await userSchema.findOne({email:email})
        console.log(user)
        user.premium=true
        const infoP = {
            payer:response.data.payer,
            infopago:response.data.purchase_units[0].payments.captures[0].amount
        }
        console.log(infoP)
        user.shops = user.shops.concat(infoP)
        user.save()
        const transporter = mailSettings.transporter;
        const mailReports = mailSettings.mailDonation(user.email);
        transporter.sendMail(mailReports, (err: any) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Email enviado");
        }
        });
    }
    res.redirect(`${process.env.SELF_FRONT_URL}`)
    }catch(e){
        res.send(e)
    }
    
}

export const cancel =async ( _req: Request, res: Response)=>{
    res.redirect(`${process.env.SELF_FRONT_URL}`)
}

