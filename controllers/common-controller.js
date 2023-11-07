//declaring the model saving user information
const User = require('../model/User');

//using bcrypt
const bcrypt = require('bcrypt');
//initiating salt rounds
const saltRounds = 10;
//

//getting data from util for session page
const loginSession = require('../util/login-session');

//initiating functions from util for signup page
const signupSession = require('../util/signup-session');

const createUserFunc = async(req,res)=>{
    let user = new User({
        name: req.body["complete-name"],
        emailAddress: req.body.email,
        password: await bcrypt.hash(req.body.password, saltRounds)
    })


    await user.save().then(
        (result,err)=>{
            if(err){
                return res.status(500).render('500');
            }
            return res.redirect('/login');    
        });

}

const loginPage = async( req,res)=>{

    const loginInputs = loginSession.loginSessionPage(req);
    
    const csrf = req.csrfToken(); 
    
    if(req.session?.user === null ||
        req.session?.user === undefined) {
          res.render('login',{loginInputs: loginInputs,
        csrf: csrf});
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
        let hasEmailExisted = await User.findOne({emailAddress: req.body.email}).
                                    then(result=>result);

        if(hasEmailExisted) {
            const isPasswordMatch = await bcrypt.compare(req.body.password, hasEmailExisted.password);
            if(isPasswordMatch){
                req.session.user = {id: hasEmailExisted._id, 
                    email: hasEmailExisted.emailAddress,
                    isAdmin: hasEmailExisted.isAdmin};
                
                req.session.isAuthenticated = true;
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

const signupPage = async(req,res)=>{
    const signupSessionInputs = signupSession.signupSessionPage(req);
    if(req.session?.user === null ||
        req.session?.user === undefined) {
          res.render('signup',{
            signupInputs: signupSessionInputs
          });
        }
    else {
        res.redirect('/');
    }
}

const signupFunc = async(req,res)=>{
    if(req.body['çomplete-name']=== ''
    || req.body.email.trim() === '' ||
    req.body.password.trim() === '' ||
    !req.body.email.includes('@')) {
        
        signupSession.signupErrorSessionPage(req,{
            message: "Error! Please check for field/fields that is/are empty or valid",
            completeName: req.body['çomplete-name'],
            email: req.body.email,
            password: req.body.password
        },()=>{
            res.redirect('/signup')
        })

        return;
    }
 
    let hasAccountExisted = await User.findOne({emailAddress: req.body?.email}).
                                    then(result=>result);
    if(hasAccountExisted) {
        
        signupSession.signupErrorSessionPage(req,{
            message: "Account existed! Please Log in",
            completeName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },()=>{
            res.redirect('/signup')
        })

        return;
    }else {
       
        createUserFunc(req,res);
    }
}

const logoutFunc = async (req,res)=>{
    req.session.user = null;
    req.session.isAuthenticated = false;
    res.redirect('/');
}

module.exports = {
    logoutFunc:logoutFunc,
    loginFunc: loginFunc,
    loginPage:loginPage,
    signupPage: signupPage,
    signupFunc: signupFunc
}   