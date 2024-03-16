//declaring the model saving user information
const User = require('../model/User');
//using bcrypt
const bcrypt = require('bcrypt');
//getting data from util for session page
const loginSession = require('../util/login-session');

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
   
    if(req.body.email.trim() === "" ||
    req.body.password.trim() === "" ||
    !req.body.email.includes('@')){
        
        loginSession.loginErrorSessionPage(req,{
            message: "Some fields are missing or incomplete",
            email: req.body.email,
            password: req.body.password
        },()=>{
            
            res.redirect('/login');
         })

        return;
    }else {
        let hasEmailExisted = await User.findOne({email: req.body.email}).
                                    then(result=>result);

        if(hasEmailExisted) {
            const isPasswordMatch = await bcrypt.compare(req.body.password, hasEmailExisted.password);
           
            if(isPasswordMatch){
                req.session.user = {id: hasEmailExisted._id, 
                    email: hasEmailExisted.emailAddress,
                    isAdmin: hasEmailExisted.isAdmin};
                
                req.session.isAuthenticated = true;
                req.flash('info', 'Flash is back!')
                req.session.save(()=>{
                    
                    return res.redirect('/');
                });
                
            }
            else {
                loginSession.loginErrorSessionPage(req,{
                    message: `
                    Credentials are invalid. Please try again. 
                    Or you can Sign up, if you have no account yet.`,
                    email: req.body.email,
                    password: req.body.password
                },()=>{
                    res.redirect('/login');
                 })
        
                return;
                
            }
        }else {
            loginSession.loginErrorSessionPage(req,{
                message: `
                Credentials are invalid. Please try again. 
                Or you can Sign up, if you have no account yet.`,
                email: req.body.email,
                password: req.body.password
            },()=>{
                res.redirect('/login');
             })
    
            return;
        }
    }
}

module.exports = {
    loginPage,
    loginFunc
}