const bcrypt = require('bcrypt');
//
const User = require('../model/User');

//getting data from util for session page
const loginSession = require('../util/login-session');
const LoginCredentials = require('../model/LoginCredentials');
const { errorParsingFromValidations } = require('../util/error-parsing');
// const { error } = require('jquery');

const loginPage = async( req,res)=>{
    const loginInputs = loginSession.loginSessionPage(req);
   
    if(req.session?.user === null ||
        req.session?.user === undefined) {
          res.render('login',{loginInputs: loginInputs});
        }
    else {
        res.redirect('/');
    }
}

const loginFunc = async (req,res)=>{

    const loginCredentials = new LoginCredentials({
        email:req.body.email,
        password: req.body.password
    })


    const err =await loginCredentials.validateSync();   
    const errors = err?.errors ;


    const parsedErrors = await errorParsingFromValidations(errors);


    
    const isParsedErrorsEmpty = parsedErrors !== null ? Object.keys(parsedErrors)?.length === 0 : true;

  
    let hasEmailExisted = await User.findOne({emailAddress: req.body?.email});
  
    if(!isParsedErrorsEmpty){
        loginSession.loginErrorSessionPage(req,{
            errorMessage: parsedErrors,
            email: req.body.email,
            password: req.body.password
        },()=>{
            
            res.redirect('/login');
         })

        return;
    }
    
    if(hasEmailExisted) {
        const isPasswordMatch = await bcrypt.compare(req.body.password, hasEmailExisted.password);
        if(isPasswordMatch){

            // if(Object.entries(req.session.user).length > 0) {
            //     req.session.user = null
            // }
            req.session.user = {id: hasEmailExisted._id, 
                email: hasEmailExisted.emailAddress,
                role: hasEmailExisted.role};
            
            req.session.isAuthenticated = true;

            
            req.session.save(()=>{
                
                return res.redirect(`/dashboard`);
            });

            return;
            
        }
        else {
            loginSession.loginErrorSessionPage(req,{
                errorMessage: {credentials:`
                Credentials are invalid. Please try again. 
                Or you can Sign up, if you have no account yet.`} ,
                email: req.body.email,
                password: req.body.password
            },()=>{
                res.redirect('/login');
             })
    
            return;
            
        }
    }else {
        loginSession.loginErrorSessionPage(req,{
            errorMessage: {credentials:`
                Credentials are invalid. Please try again. 
                Or you can Sign up, if you have no account yet.`} ,
            email: req.body.email,
            password: req.body.password
        },()=>{
            res.redirect('/login');
         })

        return;
    }
}


module.exports = {

    loginFunc: loginFunc,
    loginPage:loginPage
}   