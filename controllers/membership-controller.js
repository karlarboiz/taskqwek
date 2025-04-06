// const { encryptValue, decryptValue } = require("../util/encrypt-code");

const joinOrgMember =async(req,res,next)=>{

    return res.redirect("/signup/complete-setup/member"); 
    // try{

    //     console.log(req.body)
    //     // if(req.body.skip){
    //     //     return res.redirect("/signup/complete-setup/member");
    //     //     // req.session.newSignup = false;

    //     //     // console.log()

            
    //     // }else {
    //     //     // req.session.newSignup = false;
    //     //     return res.redirect("/signup/complete-setup/member");
    //     // }

       
    // }catch(e){
    //     next(e);
    // }
}

module.exports ={
    joinOrgMember
}