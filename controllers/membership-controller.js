// const { encryptValue, decryptValue } = require("../util/encrypt-code");
const Messages = require("../common/Messages");
const EmailGenerationForInviteSQL = require("../model-1/EmailGenerationForInviteSQL");
const UserAuthenticationInfo = require("../model/UserAuthenticationInfo");
const ResponseObj = require("../response-obj/ResponseObj");
const { orgCreationErrorSessionPage } = require("../util/org-creation-session");

const joinOrgMemberInitialSetup =async(req,res,next)=>{
    
        const otpCode = req.body["org-code"].trim();
         req.session.newSignup = false;
        try{
        if(req.body.skip){
            return res.redirect("/dashboard");
            
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
                const emailMatch = await UserAuthenticationInfo.findOne({
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
                    {is_accepted: true,
                    update_date: new Date()
                    },
                    {
                        where:{
                            otp_code:otpCode,
                        }
                    }

                )

                return res.redirect("/signup/complete-setup/member");
            
            }
        }
    }catch(e){
        next(e);
    }
}

const joinOrgMemberInitialSetupJson = async(req,res,next)=>{
   
    const otpCode = req.body.otpCode?.trim();
    
    req.session.newSignup = false;

    try{

        if(!otpCode){
             const responseObj = new ResponseObj(true,Messages.EMPTY_FIELD + "Organization Code");

            return res.status(200).send(responseObj);
        }
        const checkActiveLink = await EmailGenerationForInviteSQL.findOne({
        where:{
                otp_code: otpCode
            }
        })

        if(!checkActiveLink){

            const responseObj = new ResponseObj(true,Messages.NOT_EXISTING + "OTP Code does not exist.",otpCode);

            return res.status(200).send(responseObj);
        }
        

        const emailAddress = checkActiveLink.dataValues.receiver_emamil
        
        const emailMatch = await UserAuthenticationInfo.findOne({
            emailAddress
        }) 

        const codeRegisteredDate = new Date(checkActiveLink.dataValues.reg_date);

        const nowDate = new Date();

        const diffSeconds = Math.ceil(Math.abs(nowDate.getTime() - codeRegisteredDate.getTime()) / 1000);

        if(!emailMatch){
     
            const responseObj = new ResponseObj(true,Messages.CODE_VERIFICATION_FAILED + " Code not associated to the Receiver's Email",otpCode);

            return res.status(200).send(responseObj);
        }

        if(diffSeconds > checkActiveLink.dataValues?.valid_seconds){

            const responseObj = new ResponseObj(true,Messages.CODE_VERIFICATION_FAILED + " Code has expired!",otpCode);

            return res.status(200).send(responseObj);
        }


        await EmailGenerationForInviteSQL.update(
            {is_accepted: true,
            update_date: new Date()
            },
            {
                where:{
                    otp_code:otpCode,
                }
            }

        )

            return res.redirect("/signup/complete-setup/member");
    }catch(e){
        next(e);
    }
}

const joinOrgMemberCompleteSetup =()=>{

}

module.exports ={
    joinOrgMemberCompleteSetup,
    joinOrgMemberInitialSetup,
    joinOrgMemberInitialSetupJson
}