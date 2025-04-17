// const { encryptValue, decryptValue } = require("../util/encrypt-code");
const EmailGenerationForInviteSQL = require("../model-1/EmailGenerationForInviteSQL");
const { orgCreationErrorSessionPage } = require("../util/org-creation-session");

const joinOrgMember =async(req,res,next)=>{
    
        const token_id = req.body["org-code"];
    try{
        if(req.body.skip){

            // req.session.newSignup = false;

            return res.redirect("dashboard");

            
        }else {
            // req.session.newSignup = false;


            const checkActiveLink = await EmailGenerationForInviteSQL.findOne({
                where:{
                    token_id
                }
            })

            if(!checkActiveLink){

                orgCreationErrorSessionPage(req,{
                    message:"Link not Valid or Link not active or associated anywhere in the records",
                    orgCode:req.body["org-code"],
                  
                },()=>{
                    res.redirect("/signup/complete-setup/member");
                })

                return;

            }

            return res.redirect("/signup/complete-setup/member");
        }
    }catch(e){
        console.log(e)
        // next(e);
    }
}

module.exports ={
    joinOrgMember
}