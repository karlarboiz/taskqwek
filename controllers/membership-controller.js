const { encryptValue, decryptValue } = require("../util/encrypt-code");

const joinOrgMember =async(req,res,next)=>{
    const user = req.session.user;

    try{
        if(req.body.skip){
            
            res.redirect("/dashboard");
        }else {
            console.log(req.body["org-code"])
           const kwan = await decryptValue("bd10f397f63c0301c1e80b8c7a2e91670254ad772dd2b0c07dd7fb5098c7add72a6558886176cba47e374ed6a176374eb282f4c06c9ab9108ec667b52ffa3f16550f95724b4f0cf362191cbe5a32ef9470fcb77e509804d2b83fcee453bfff02084234f5");
           console.log(kwan)
            res.redirect("/signup/complete-setup/member");
        }
    }catch(e){
        next(e);
    }
}

module.exports ={
    joinOrgMember
}