// const request = require('request');
import axios from "axios"
const CLIENT = "AXhZzmHVzLk7pOaQE7jcmk_49ppCo4-4UW-s-EmQ_A7UhIlgZVPnmE7OKzcWN3eu_osFTHCQUBSMO2eW"
const SECRET = "EBh1JTq_NbKTrV9PO_blsnraRe24QeUVlhKqIADjt-03npRszlbOOZC_9nEhSSLMo6KrT_WJIoF5-xWM"
const PAYPAL_API = "https://api-m.sandbox.paypal.com"
// const auth = {user:CLIENT,pass:SECRET} 
import { Request, Response } from "express";
const userSchema = require("../models/user");


export const createPayment =async ( _req: Request, res: Response)=>{
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
            return_url: `http://localhost:3001/paypal/capture-order`, // Url despues de realizar el pago
            cancel_url: `http://localhost:3001/paypal/cancel-order` // Url despues de realizar el pago
        }
    }
    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`,order,{
        auth:{
            username:CLIENT,
            password:SECRET
        }
    })
    // console.log(response.data)
    res.send(response.data.links[1])
}

export const captureOrder =async ( req: Request, res: Response)=>{
    const {token} = req.query
    // const {id} = req.params
    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {},{
        auth:{
            username:CLIENT,
            password:SECRET
        }
    })
    let email = response.data.payment_source.paypal.email_address
    if(response.data.status==="COMPLETED"){
        const user =await userSchema.findOne({email:email})
        user.premium=true
        const infoP = {
            payer:response.data.payer,
            infopago:response.data.purchase_units[0].payments.captures[0].amount
        }
        console.log(infoP)
        user.shops = user.shops.concat(infoP)
        user.save()
    }
    // console.log(response.data)
    res.redirect("http://localhost:3000/home")
}