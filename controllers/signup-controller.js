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
    try{
        const errorMessage = {};
        let userGeneralInfo = new UserGeneralInfo({
            firstName: req.body["first-name"],
            lastName: req.body['last-name'],
            username: req.body['username'],
            role: Number(req.body.role)
        })

        const userAuthInfo = new UserAuthenticationInfo({
            userTableId: null,
            emailAddress: req.body.email,
            password: req.body.password,
        })
        
        const errUserGeneralInfo = await userGeneralInfo.validateSync();  
        
        const errUserAuthInfo = await userAuthInfo.validateSync();

        const hasAccountExisted=await User.findOne({
            emailAddress:req.body.email
        })

        const errors = errUserGeneralInfo?.errors ? Object.entries(errUserGeneralInfo?.errors):[];
            
        if(errors?.length > 0){
            
            for (const [key, value] of Object.entries(err?.errors)) {
                errorMessage[key] = value.properties.message;
            
            }
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
        }else if(hasAccountExisted) {
            
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
        }else {
            const convert = Number(req.body.role);

            req.session.newSignup = true;
        
            const urlRoute = convert === 0 ?"/dashboard": (convert ==1 ? "/signup/complete-setup/leader":
                "/signup/complete-setup/leader"
            ) ;

            const user = new User({
                firstName: req.body["first-name"],
                lastName: req.body['last-name'],
                username: req.body['username'],
                emailAddress: req.body.email,
                password: req.body.password,
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
       
    
        }
    }catch(e){
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