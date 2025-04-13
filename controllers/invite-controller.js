// mailer.js
const nodemailer = require("nodemailer");

// Replace with your actual email and app password or SMTP settings
const transporter = nodemailer.createTransport({
  service: "Gmail", // or use your SMTP provider
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD, // generate this from your Google account (App Passwords)
  },
});

const sendEmail = async(req,res,next)=> {

    const {to } = req.body;
  const mailOptions = {
    from: '"Your App Name" <your.email@gmail.com>',
    to,
    subject:"kwankwan",
    text:"kwankwan",
    html:"kwankwan",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

const invitePage = (req,res,next)=>{
    const role = req.session.user?.role === 1  ?"leader": "member";
    res.render("invite",{role:role,activeLink:"invite"});
}

module.exports = {
    sendEmail,
    invitePage
};
