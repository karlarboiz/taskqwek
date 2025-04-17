// mailer.js
const nodemailer = require("nodemailer");
const OrgControls = require("../model-functions/OrgControls");

// Replace with your actual email and app password or SMTP settings
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
const sendEmail = async(req,res,next)=> {
    const role = req.session.user?.role === 1  ?"leader": "member";
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
    return  res.render("invite",{role:role,activeLink:"invite"});
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }

 
}

const invitePage = async(req,res,next)=>{
    const role = req.session.user?.role === 1  ?"leader": "member";

    const leaderId = req.session.user?.id;
    
    const orgControls = new OrgControls(leaderId,false);
    const leaderOrgs = await orgControls.getOrgListBasedOnLeaderId();

    res.render("invite",{role:role,
      activeLink:"invite",
      leaderOrgs:leaderOrgs
    });
}

module.exports = {
    sendEmail,
    invitePage
};
