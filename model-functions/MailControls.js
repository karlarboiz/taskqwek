// mailer.js
const nodemailer = require("nodemailer");

class MailControls {

    static generateTransporterMail(){

     const transporter = nodemailer.createTransport({
         service: "Gmail",
         port: 465,
         secure: true, // true for port 465, false for 587
         auth: {
           user: process.env.ADMIN_EMAIL,
           pass: process.env.ADMIN_PASSWORD,
         },
         tls: {
           rejectUnauthorized: false, // <--- ADD THIS LINE
         },
       });
       return transporter;
    }
}


module.exports = MailControls;