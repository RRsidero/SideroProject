const nodemailer = require("nodemailer");

// Create Email Transporter 
const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
    // Define Transporter & Allow for Single Connection at PORT 587
    const transporter = nodemailer.createTransport ({
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            // Do Not Fail on Invalid Inserts
            rejectUnauthorized: false,
        }
    });
    // Data Required to Send Email
    const senderProperties = {
        from: sent_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: message,
    }
    // Check if Email has been sent Successfully
    transporter.sendMail(senderProperties, function (err, info) {
        if (err) {
            console.log(err);
        }
        console.log(info);
    })
};