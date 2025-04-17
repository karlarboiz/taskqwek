// mailer.js
const nodemailer = require("nodemailer");
const OrgControls = require("../model-functions/OrgControls");
const MailTemplate = require("../common/MailTemplate");
const ResponseObj = require("../response-obj/ResponseObj");
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
   

  try {

    
    const {email,orgId } = req.body;

    const mailTemplate = new MailTemplate("TaskQwek","kwankwan")
    
    const concatHTMLMessage= MailTemplate.FIRST_MAIL_PART +
    MailTemplate.MIDDLE_MAIL_PART + mailTemplate.constructMailContent() + MailTemplate.LAST_MAIL_PART;
    
    const mailOptions = {
      from: '"Your App Name" <your.email@gmail.com>',
      to:email,
      subject: MailTemplate.SUBJECT_MEMBERSHIP_JOIN,
      html:concatHTMLMessage,
    };  

    const info = await transporter.sendMail(mailOptions);

    const responseObj = new ResponseObj(true,info.messageId)
    console.log("Email sent:", info.messageId);
    return  res.status(200).send(responseObj);
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
