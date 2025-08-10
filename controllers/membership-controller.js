// const { encryptValue, decryptValue } = require("../util/encrypt-code");
const Messages = require("../common/Messages");
const EmailGenerationForInvite = require("../model-1/EmailGenerationForInvite");
const UserAuthenticationInfo = require("../model/UserAuthenticationInfo");
const ResponseObj = require("../common-obj/ResponseObj");
const { orgCreationErrorSessionPage } = require("../util/org-creation-session");

const joinOrgMemberInitialSetup =async(req,res,next)=>{
    
        const otpCode = req.body["org-code"].trim();
         req.session.newSignup = false;
        try{
        if(req.body.skip){
            return res.redirect("/dashboard");
            
        }else {
            const checkActiveLink = await EmailGenerationForInvite.findOne({
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


                await EmailGenerationForInvite.update(
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
    
     const responseObj = new ResponseObj();

    try{
        const checkActiveLink = await EmailGenerationForInvite.findOne({
            where:{
                    otp_code: otpCode
                }
            })
        
        if(!checkActiveLink){
            throw new Error(Messages.NOT_EXISTING + "OTP Code does not exist.");
        }
        

        const emailAddress = checkActiveLink.dataValues.receiver_emamil
        
        const emailMatch = await UserAuthenticationInfo.findOne({
            emailAddress
        }) 

        const codeRegisteredDate = new Date(checkActiveLink.dataValues.reg_date);

        const nowDate = new Date();

        const diffSeconds = Math.ceil(Math.abs(nowDate.getTime() - codeRegisteredDate.getTime()) / 1000);

        if(!emailMatch){
            throw new Error(Messages.CODE_VERIFICATION_FAILED + " Code not associated to the Receiver's Email");
        }

        if(diffSeconds > checkActiveLink.dataValues?.valid_seconds){
            throw new Error(Messages.CODE_VERIFICATION_FAILED + " Code has expired!");
        }


        await EmailGenerationForInvite.update(
            {is_accepted: true,
            update_date: new Date()
            },
            {
                where:{
                    otp_code:otpCode,
                }
            }
        )


        responseObj._isSuccess = true;
        responseObj._message = Messages.SUCCESSFUL_JOIN_ORG;
        res.status(200).send(responseObj);
    }catch(e){
        
        responseObj._isSuccess = false;
        responseObj._message = e.message;
        res.status(200).send(responseObj);
    }
}


module.exports ={
   
    joinOrgMemberInitialSetup,
    joinOrgMemberInitialSetupJson
}