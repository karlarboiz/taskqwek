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
const { generalRouteGeneratorHandler } = require('../util/route-generator');
const { projectCreationSessionPage } = require('../util/project-creation-session');

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

        if(Object.entries(errorMessage).length> 0){
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

        const urlRoute = generalRouteGeneratorHandler(convert,"/signup/complete-setup",true)   
        
        const encryptedPassword = await bcrypt.hash(password,saltRounds);
            
        // await userGeneralInfo.save().then((result,err)=>{
        //     if(err){
        //         next(err);
        //     }
        //     req.session.user={
        //         id:result._id,
        //         email:emailAddress,
        //         role:result.role
        //     }

        // });

        // const userAuthInfoSave = new UserAuthenticationInfo({
        //     userTableId: userGeneralInfo._id,
        //     emailAddress:emailAddress,
        //     password:encryptedPassword
        // })


        // await userAuthInfoSave.save().then((result,err)=>{
        //     if(err){
        //         next(err);
        //     }
            
        //     req.session.isAuthenticated = false;
        //     req.session.cookie.originalMaxAge = 864000;
        //     req.session.newSignup = true;
        // });
     
        return res.redirect("/signup/project-creation/complete-setup");
       
    }catch(e){
        console.log(e.message);
        next(e)
    }
}



const completeSetupPageRoleOrg= (req,res,next)=>{
    
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

const completeSetupPageLeaderProject = (req,res,next)=>{
    const projectCreationInputs = projectCreationSessionPage(req);

    try{

         res.render("setup-includes/project-creation",{
            projectCreationInputs:projectCreationInputs,
            role:"leader",
            activeLink:"project",
            pageLoc: "out"
        });
        
    }catch(e){
        next(e)
    }

   
}


module.exports = {
    signupPage,
    signupFunc,
    completeSetupPageRoleOrg,
    completeSetupPageLeaderProject
}   