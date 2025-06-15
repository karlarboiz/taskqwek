//declaring the model saving user information
const UserGeneralInfo = require('../model/UserGeneralInfo');
//using bcrypt
const bcrypt = require('bcrypt');
//initiating salt rounds
const saltRounds = 10;
//
//initiating functions from util for signup page
const signupSession = require('../util/signup-session');
// const url = require('url');
const { orgCreationSessionPage } = require('../util/org-creation-session');
const UserAuthenticationInfo = require("../model/UserAuthenticationInfo");

const signupPage = async (req,res)=>{
    
    const signupSessionInputs = signupSession.signupSessionPage(req);
    if(req.session?.user === null ||
        req.session?.user === undefined) {
          res.render('initialsignup',{
            signupInputs: signupSessionInputs
          });

    } else {
        res.redirect('/');
    }
}
 
const signupFunc = async (req,res,next)=>{

    const firstName = req.body["first-name"];
    const lastName = req.body['last-name'];
    const username = req.body['username'];
    const role = Number(req.body.role);
    const emailAddress = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body["confirm-password"];
    try{
        const errorMessage = {};

        let userGeneralInfo = new UserGeneralInfo({
            firstName: firstName,
            lastName: lastName,
            username: username,
            role: role
        })

        const userAuthInfo = new UserAuthenticationInfo({
            emailAddress: emailAddress,
            password: password,
        })
        
        const errUserGeneralInfo = await userGeneralInfo.validateSync();  
        
        const errUserAuthInfo = await userAuthInfo.validateSync();

        const errorsUserGeneralInfo = errUserGeneralInfo?.errors ? Object.entries(errUserGeneralInfo?.errors):[];
        
        const errorsUserAuthInfo = errUserAuthInfo?.errors ? Object.entries(errUserAuthInfo?.errors):[];

        if(errorsUserGeneralInfo?.length > 0 || errorsUserAuthInfo?.length > 0){
            
            for (const [key, value] of errorsUserGeneralInfo) {
                errorMessage[key] = value.properties.message;
            
            }

            for (const [key, value] of errorsUserAuthInfo) {
                errorMessage[key] = value.properties.message;
            
            }
            
        }


        if(password?.trim().toLowerCase() !== confirmPassword.trim().toLowerCase()){
            errorMessage.confirmPassword = "Password and Confirm Password don't match";     
        }


        
        const hasAccountExisted=await UserAuthenticationInfo.findOne({
            emailAddress:req.body.email
        })

        if(errorMessage){
            signupSession.signupErrorSessionPage(req,{
                  errorMessage:errorMessage,
                firstName: req.body["first-name"],
                lastName: req.body['last-name'],
                username: req.body['username'],
                emailAddress: req.body.email,
                password:req.body.password,
                role:Number(req.body.role)
            },()=>{
                res.redirect("/signup")
            })
    
            return;
        }

    
        if(hasAccountExisted) {
            
            signupSession.signupErrorSessionPage(req,{
                message: "Account existed! Please Log in",
                firstName: req.body['first-name'],
                lastName:req.body['last-name'],
                username: req.body.username,  
                emailAddress: req.body.email,
                password: req.body.password
            },()=>{
                res.redirect('/signup')
            })
            return;
        } 


       


        const convert = Number(req.body.role);

        // req.session.newSignup = true;
    
        const urlRoute = convert === 0 ?"/dashboard": (convert ==1 ? "/signup/complete-setup/leader":
            "/signup/complete-setup/leader"
        ) ;

        const user = new userGeneralInfo({
            firstName: req.body["first-name"],
            lastName: req.body['last-name'],
            username: req.body['username'],
            role: Number(req.body.role)
        })

        const encryptedPassword = await bcrypt.hash(req.body.password,10);
            
        await user.save().then((result,err)=>{
            if(err){
                next(err);
            }
            req.session.user={
                id:result._id,
                email:result.emailAddress,
                role:result.role
            }

            req.session.isAuthenticated = false;
            req.session.cookie.originalMaxAge = 864000;
            
        });

        user.password = encryptedPassword;

        await user.save();
        res.redirect(urlRoute)
       
            res.redirect("/signup");
        
    }catch(e){
        console.log(e.message);
        next(e)
    }
}



const completeSetupPage= (req,res,next)=>{
    
    const orgCreationInputs = orgCreationSessionPage(req);
    

    try{
        const signUpValue = req.params['role'];

        res.render("complete-setup",{
            orgCreationInputs:orgCreationInputs,
            membershipJoinInputs:{},
            role:signUpValue,
            pageLoc: "out"
        });
    }catch(e){
        next()
    }
}


module.exports = {
    signupPage,
    signupFunc,
    completeSetupPage
}   