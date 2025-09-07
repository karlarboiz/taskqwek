const bcrypt = require('bcrypt');
//
const UserAuthenticationInfo = require('../model/UserAuthenticationInfo');

//getting data from util for session page
const loginSession = require('../util/login-session');
const LoginCredentials = require('../model/LoginCredentials');
const { errorParsingFromValidations } = require('../util/error-parsing');
const UserGeneralInfo = require('../model/UserGeneralInfo');
const CommonSession = require("../util/CommonSession");

const loginPage = async( req,res)=>{
    const commonSession = new CommonSession();
    commonSession._req = req;
    const loginInputs = commonSession.loginSessionPage();
   
    if(req.session?.user === null ||
        req.session?.user === undefined) {
          res.render('login',{loginInputs: loginInputs});
        }
    else {
        res.redirect('/');
    }
}

const loginFunc = async (req,res)=>{
    const commonSession = new CommonSession();

    const loginCredentials = new LoginCredentials({
        email:req.body.email,
        password: req.body.password
    })

    const err =await loginCredentials.validateSync();   
   
    const errors = err?.errors ;

    const parsedErrors = await errorParsingFromValidations(errors);
    
    const isParsedErrorsEmpty = parsedErrors !== null ? Object.keys(parsedErrors)?.length === 0 : true;
  
    let hasEmailExisted = await UserAuthenticationInfo.findOne({emailAddress: req.body?.email});
    
    if(!isParsedErrorsEmpty){
        commonSession._req = req;
        commonSession._data = {
            errorMessage: parsedErrors,
            email: req.body.email,
            password: req.body.password
        }
        commonSession._action = ()=>{
            
            res.redirect('/login');
         };

         commonSession.loginErrorSessionPage();

        return;
    }
    
    if(hasEmailExisted) {

        const isPasswordMatch = await bcrypt.compare(req.body.password, hasEmailExisted.password);
        if(isPasswordMatch){
            
            const userGeneralInfo = await UserGeneralInfo.findById(hasEmailExisted.userTableId);

            req.session.user = {id: userGeneralInfo._id, 
                email: hasEmailExisted.emailAddress,
                role: userGeneralInfo?.role};
            
            req.session.isAuthenticated = true;
            req.session.newSignup = false;
            
            req.session.save(()=>{
                
                return res.redirect(`/dashboard`);
            });

            return;
            
        }
        else {

            commonSession._req = req;
            commonSession._data = {
                errorMessage: {credentials:`
                Credentials are invalid. Please try again. 
                Or you can Sign up, if you have no account yet.`} ,
                email: req.body.email,
                password: req.body.password
            }
            commonSession._action = ()=>{
                
                res.redirect('/login');
            };

            commonSession.loginErrorSessionPage();

            return;
            
        }
    }else {

        commonSession._req = req;
        commonSession._data = {
            errorMessage: {credentials:`
                Credentials are invalid. Please try again. 
                Or you can Sign up, if you have no account yet.`} ,
            email: req.body.email,
            password: req.body.password
        }
        commonSession._action = ()=>{
            
            res.redirect('/login');
        };

        commonSession.loginErrorSessionPage();

        return;
    }
}


module.exports = {

    loginFunc: loginFunc,
    loginPage:loginPage
}   