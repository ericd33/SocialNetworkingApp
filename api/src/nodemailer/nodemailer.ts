const nodemailer = require('nodemailer');
require('dotenv').config();

const { NODEMAILER } = process.env

module.exports = {
    transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'concatuss@gmail.com',
            pass: NODEMAILER,
        },
    }),

    mailDetails: (email: any) => {
        return {
            from: 'concatuss@gmail.com',
            to: email,
            subject: '¡Bienvenido a ConcatUs!',
            html: `
                    <p>Start adding your friends. Or make new ones!<p/>
            <img width=70% src="https://st2.depositphotos.com/3591429/5245/i/600/depositphotos_52453715-stock-photo-hands-holding-word-welcome.jpg"></img>
            `,
        }
    },

    mailDelete: (email: any) => {
        return {
            from: 'concatuss@gmail.com',
            to: email,
            subject: '¡Dejamos nuestras puertas abiertas!',
            html:
                `<p>Come back when you want!<p/>
            <img width=70% src="https://email.uplers.com/blog/wp-content/uploads/2021/12/Winning-Email-Marketing-Strategies-That-SaaS-Brands-Must-Add-To-Their-Armor-1024x411.png" />
            `,
        }
    },

    mailReports: (email: any) => {
        return {
            from: 'concatuss@gmail.com',
            to: email,
            subject: 'Your post has been reported multiple times, we decided to put it under review!',
            html:`
            <img width=70% src="https://st4.depositphotos.com/1654249/26479/i/600/depositphotos_264791344-stock-photo-alert-e-mail-message-concept.jpg" />
            `,
        }
    },
    mailPremium:(email:string)=>{
        return {
            from: 'concatuss@gmail.com',
            to: email,
            subject: 'Thank you for changing your status to premium, enjoy ConcatUs at 100%!',
            html:`
            <img width=70% src="https://нашчат.рф/img/66.jpg?1619891588" />
            `,
        }
    },
    mailDonation:(email:string)=>{
        return {
            from: 'concatuss@gmail.com',
            to: email,
            subject: 'Thank you for your donation to the ConcatUs team!',
            html:`
            <img width=70% src="https://whatsup.es/wp-content/uploads/2018/10/istock_000025420580_small.jpg" />
            `,
        }
    },

}