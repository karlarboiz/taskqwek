// const { encryptValue, decryptValue } = require("../util/encrypt-code");
const Messages = require("../common/Messages");
const EmailGenerationForInviteSQL = require("../model-1/EmailGenerationForInviteSQL");
const User = require("../model/User");
const { orgCreationErrorSessionPage } = require("../util/org-creation-session");

const joinOrgMember =async(req,res,next)=>{
    
        const otpCode = req.body["org-code"].trim();
    
    try{
        if(req.body.skip){

            // req.session.newSignup = false;

            return res.redirect("dashboard");

            
        }else {
            const checkActiveLink = await EmailGenerationForInviteSQL.findOne({
                where:{
                    otp_code: otpCode
                }
            })

            if(!checkActiveLink){

                orgCreationErrorSessionPage(req,{
                    message:Messages.CODE_VERIFICATION_FAILED +" Link not Valid or Link not active or associated anywhere in the records",
                    orgCode:req.body["org-code"],
                  
                },()=>{
                    return res.redirect("/signup/complete-setup/member");
                })

                
            }
            else {

                const emailAddress = checkActiveLink.dataValues.receiver_emamil
                const emailMatch = await User.findOne({
                    emailAddress
                }) 

                const codeRegisteredDate = new Date(checkActiveLink.dataValues.reg_date);

                const nowDate = new Date();

                const diffSeconds = Math.ceil(Math.abs(nowDate.getTime() - codeRegisteredDate.getTime()) / 1000);

                if(!emailMatch){
                    orgCreationErrorSessionPage(req,{
                    message:Messages.CODE_VERIFICATION_FAILED + " Code not associated to the Receiver's Email",
                    orgCode:req.body["org-code"],
                    
                    },()=>{
                        return res.redirect("/signup/complete-setup/member");
                    })
                }

                if(diffSeconds > checkActiveLink.dataValues?.valid_seconds){
                     orgCreationErrorSessionPage(req,{
                    message:Messages.CODE_VERIFICATION_FAILED + " Code has expired!",
                    orgCode:req.body["org-code"],
                    
                    },()=>{
                        return res.redirect("/signup/complete-setup/member");
                    })
                }


                await EmailGenerationForInviteSQL.update(
                    {is_accepted: true},
                    {
                        where:{
                            otp_code:otpCode
                        }
                    }

                )



                return res.redirect("/signup/complete-setup/member");
                

            }



        }
    }catch(e){
        console.log(e)
        next(e);
    }
}

module.exports ={
    joinOrgMember
}