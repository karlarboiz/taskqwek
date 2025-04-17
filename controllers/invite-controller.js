// mailer.js
const nodemailer = require("nodemailer");
const OrgControls = require("../model-functions/OrgControls");
const MailTemplate = require("../common/MailTemplate");
const ResponseObj = require("../response-obj/ResponseObj");
const EmailGenerationForInviteSQL = require("../model-1/EmailGenerationForInviteSQL");
const Messages = require("../common/Messages");
const { errorParsingFromValidationsSequelize } = require("../util/error-parsing");

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
  const leaderId = req.session.user?.id;

  try {

    
    const {email,orgId } = req.body;

    const mailTemplate = new MailTemplate("TaskQwek","kwankwan")
    
    const concatHTMLMessage= MailTemplate.FIRST_MAIL_PART +
    MailTemplate.MIDDLE_MAIL_PART + mailTemplate.constructMailContent() + MailTemplate.LAST_MAIL_PART;

    const emailInviteItem = EmailGenerationForInviteSQL.build({
      sender_id: leaderId,
      receiver_email:email,
      org_id: orgId
    })


    await emailInviteItem.validate()

    await emailInviteItem.save();

    
    const mailOptions = {
      from: '"Your App Name" <your.email@gmail.com>',
      to:email,
      subject: MailTemplate.SUBJECT_MEMBERSHIP_JOIN,
      html:concatHTMLMessage,
    };  

    const info = await transporter.sendMail(mailOptions);

    const responseObj = new ResponseObj(true,info.messageId)
    

    return  res.status(200).send(responseObj);
  } catch (e) {
  
    const errorMessage = errorParsingFromValidationsSequelize(e.errors);
    const responseObj = new ResponseObj(false,Messages.INVALID_INPUT,errorMessage);
    res.status(200).send(responseObj);
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
