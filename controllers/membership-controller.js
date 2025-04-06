// const { encryptValue, decryptValue } = require("../util/encrypt-code");
const EmailGenerationForInviteSQL = require("../model1/EmailGenerationForInviteSQL");
const joinOrgMember =async(req,res,next)=>{
 
    try{
        if(req.body.skip){

            req.session.newSignup = false;

            return res.redirect("dashboard");

            
        }else {
            req.session.newSignup = false;



            return res.redirect("/signup/complete-setup/member");
        }
    }catch(e){
        next(e);
    }
}

module.exports ={
    joinOrgMember
}