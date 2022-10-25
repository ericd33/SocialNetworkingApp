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
                `<p>¡Vuelve cuando quieras!<p/>
            <img width=80% src="https://email.uplers.com/blog/wp-content/uploads/2021/12/Winning-Email-Marketing-Strategies-That-SaaS-Brands-Must-Add-To-Their-Armor-1024x411.png" />
            `
            ,
        }
    },

    mailReports: (email: any) => {
        return {
            from: 'concatuss@gmail.com',
            to: email,
            subject: '¡Tu posteo a sido reportado multiples veces decidimos ponerlo en revisión!',
            html:"",
        }
    },
}