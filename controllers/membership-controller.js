// const { encryptValue, decryptValue } = require("../util/encrypt-code");

const joinOrgMember =async(req,res,next)=>{
    try{
        if(req.body.skip){
            res.redirect("/dashboard");
            req.session.newSignup = false;
        }else {
            req.session.newSignup = false;
            res.redirect("/signup/complete-setup/member");
        }
    }catch(e){
        next(e);
    }
}

module.exports ={
    joinOrgMember
}