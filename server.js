const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa CORS
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());

// Middleware para parsear datos del formulario
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta para recibir los datos del formulario
app.post('/send-email', (req, res) => {
    const { nombre, correo, mensaje } = req.body;

    // Configuración de Nodemailer para usar Gmail u otros
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const mailOptions = {
        from: correo,
        to: 'wonaxa5175@regishub.com',
        subject: `Mensaje de ${nombre}`,
        text: `Nombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${mensaje}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error al enviar el correo');
        } else {
            console.log('Correo enviado: ' + info.response);
            res.status(200).send('Correo enviado');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en puerto:${PORT}`);
});
