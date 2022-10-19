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
            <img width=80% src="https://img.freepik.com/vector-premium/texto-bienvenida-estilo-memphis_136321-654.jpg?w=2000"></img>
            `,
        }
    },

    mailDelete: (email: any) => {
        return {
            from: 'concatuss@gmail.com',
            to: email,
            subject: '¡Dejamos nuestras puertas abiertas!',
            html:
                `<p>Vuelve cuando quieras!<p/>
            <img width=80% src="" />
            `
            ,
        }
    },

    mailNewPassword: (email: any, link: any) => {
        return {
            from: 'concatuss@gmail.com',
            to: email,
            subject: 'Nueva contraseña',
            html:
                `
            <img width=80% src=""></img>
            <br/>
            <a href=${link} ><b>LINK</b></a>
            `
            ,
        }
    },

}