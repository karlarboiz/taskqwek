const { encryptValue, decryptValue } = require("../util/encrypt-code");

const joinOrgMember =async(req,res,next)=>{
    const user = req.session.user;

    try{
        if(req.body.skip){
            res.redirect("/dashboard");
        }else {
            console.log(req.body["org-code"])
           const kwan = await decryptValue("");
            res.redirect("/signup/complete-setup/member");
        }
    }catch(e){
        next(e);
    }
}

module.exports ={
    joinOrgMember
}