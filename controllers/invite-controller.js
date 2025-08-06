// mailer.js
const nodemailer = require("nodemailer");
const OrgControls = require("../model-functions/OrgControls");
const MailTemplate = require("../common/MailTemplate");
const ResponseObj = require("../common-obj/ResponseObj");
const EmailGenerationForInvite = require("../model-1/EmailGenerationForInvite");
const Messages = require("../common/Messages");

const { errorParsingFromValidationsSequelize } = require("../util/error-parsing");
const otpGenerator = require('otp-generator');
const CommonValues = require("../common/CommonValues");
const MailControls = require("../model-functions/MailControls");
const Org = require("../model/Org");


  
const sendEmail = async(req,res,next)=> {
  const leaderId = req.session.user?.id;

  try {
    const otpCode = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });    
    const transporter = await MailControls.generateTransporterMail();
    const {email,orgId } = req.body;

    if(!email){
      throw new Error(Messages.EMAIL_FIELD_EMPTY);
    }

    const orgControls = new OrgControls(null,null,orgId);

    await orgControls.getOrgDetailsBasedOnOrgId();

    const mailTemplate = new MailTemplate("TaskQwek",otpCode)
    
    const concatHTMLMessage= MailTemplate.FIRST_MAIL_PART +
    MailTemplate.MIDDLE_MAIL_PART + mailTemplate.constructMailContent() + MailTemplate.LAST_MAIL_PART;
    
    const validSeconds = CommonValues.EXPIRATION_DURATION_TOKEN * CommonValues.INVITATION_NUMBER_DAYS;
 
    const emailInviteItem = EmailGenerationForInvite.build({
      sender_id: leaderId,
      receiver_email:email,
      org_id: orgId,
      otp_code: otpCode,
      valid_seconds: validSeconds
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

    const responseObj = new ResponseObj(true,Messages.SUCCESS + " Email Sent");
    
    return  res.status(200).send(responseObj);
  } catch (e) {
    const errorMessage = errorParsingFromValidationsSequelize(e.errors);
    const responseObj = new ResponseObj(false,e.message,errorMessage);
    res.status(200).send(responseObj);
  }

}

const invitePage = async(req,res,next)=>{
    const role = req.session.user?.role === 1  ?"leader": "member";

    const leaderId = req.session.user?.id;
    
    const orgControls = new OrgControls(leaderId,false);
    const leaderOrgs = await orgControls.getOrgListBasedOnLeaderId();

  
    res.render(CommonValues.INVITE,{role:role,
      activeLink:"invite",
      leaderOrgs:leaderOrgs
    });
}

module.exports = {
    sendEmail,
    invitePage
};
