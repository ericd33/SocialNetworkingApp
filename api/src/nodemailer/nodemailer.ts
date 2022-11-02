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
                    <p>Comienza a agregar a tus amigos. ¡O has nuevos!<p/>
            <img width=60% src="https://st2.depositphotos.com/3591429/5245/i/600/depositphotos_52453715-stock-photo-hands-holding-word-welcome.jpg"></img>
            `,
        }
    },

    mailDelete: (email: any) => {
        return {
            from: 'concatuss@gmail.com',
            to: email,
            subject: '¡Dejamos nuestras puertas abiertas!',
            html:
                `<p>¡Vuelve cuando quieras!<p/>
            <img width=60% src="https://email.uplers.com/blog/wp-content/uploads/2021/12/Winning-Email-Marketing-Strategies-That-SaaS-Brands-Must-Add-To-Their-Armor-1024x411.png" />
            `,
        }
    },

    mailReports: (email: any) => {
        return {
            from: 'concatuss@gmail.com',
            to: email,
            subject: '¡Tu posteo a sido reportado multiples, veces decidimos ponerlo en revisión!',
            html:`
            <img width=60% src="https://st4.depositphotos.com/1654249/26479/i/600/depositphotos_264791344-stock-photo-alert-e-mail-message-concept.jpg" />
            `,
        }
    },
    mailPremium:(email:string)=>{
        return {
            from: 'concatuss@gmail.com',
            to: email,
            subject: '¡Gracias por cambiar tu estado a premium disfruta de ConcatUs al 100%!',
            html:`
            <img width=60% src="https://st4.depositphotos.com/1654249/26479/i/600/depositphotos_264791344-stock-photo-alert-e-mail-message-concept.jpg" />
            `,
        }
    },
    mailDonation:(email:string)=>{
        return {
            from: 'concatuss@gmail.com',
            to: email,
            subject: '¡Gracias por tu aporte al epipo de ConcatUs!',
            html:`
            <img width=60% src="https://st4.depositphotos.com/1654249/26479/i/600/depositphotos_264791344-stock-photo-alert-e-mail-message-concept.jpg" />
            `,
        }
    },

}