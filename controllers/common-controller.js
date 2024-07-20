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

const homePage = async(req,res)=>{

    res.render('/');
}

const createUserFunc = async(req,res)=>{
    let user = new User({
        firstName: req.body["first-name"],
        lastName: req.body['last-name'],
        username: req.body['username'],
        emailAddress: req.body.email,
        password: await bcrypt.hash(req.body.password, saltRounds),
        role: req.body.role
    })

    await user.save().then(
        (result,err)=>{
            if(err){
                console.log(err)
                return res.redirect('/signup');
            }
            return res.redirect('/login');    
        });

}

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
        let hasEmailExisted = await User.findOne({emailAddress: req.body.email});
        console.log(req.body.email);
        console.log(hasEmailExisted);
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

const signupFunc = async (req,res)=>{
    let errorMessage= {};

    const usernameValidation = /^[a-z0-9_.]+$/g;
    const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,20}$/;
    const isUsernameValid = usernameValidation.test(req.body.username);
    const isEmailValid = emailValidation.test(req.body.email);
    const isPasswordValid = passwordValidation.test(req.body.password);

    if(req.body['first-name'].trim().length < 2 ||
    req.body['first-name'].trim().length > 100) {
        errorMessage.firstName= "First Name is Required (Minimum of 2 characters, Maximum of 100 characters)"
    }
    if(req.body['last-name'].trim().length <2 ||
    req.body['last-name'].trim().length > 100) {
        errorMessage.lastName= "Last Name is Required (Minimum of 2 characters, Maximum of 100 characters)"
    }
    if(req.body.username.trim().length < 10 || req.body.username.trim().length > 20) {
        errorMessage.username = "Username must have 10 - 30 characters";
    }

    if(!isUsernameValid) {
        errorMessage.username = "Username must be a combination of letters and numbers and special characters";
    }

    if(req.body.email.trim().length < 10 || req.body.email.trim().length > 60) {
        errorMessage.email = "Email Address must have 10 - 60 characters";
    }   

    if(!isEmailValid) {
        errorMessage.email = "Email Address is Invalid!";
    }

    if(Number(req.body.role) === 0) {
        errorMessage.role = "Pick A Role";
    } 

    if(req.body.password.trim().length < 10 || 
        req.body.password.trim().length > 20) {
            errorMessage.password = "Password must be 10 - 30 characters";
        }

    if(!isPasswordValid) {
        errorMessage.password = "Password must have at least one numeric digit, one uppercase and one lowercase."
    }

    if(Object.entries(errorMessage).length != 0) {
        
        signupSession.signupErrorSessionPage(req,{
            errorMessage:errorMessage, 
            firstName: req.body['first-name'],
            lastName:req.body['last-name'],
            username: req.body.username,  
            email: req.body.email,
            password: req.body.password
        },()=>{
            res.redirect('/signup');
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
    res.redirect('/login');
}

module.exports = {
    logoutFunc:logoutFunc,
    loginFunc: loginFunc,
    loginPage:loginPage,
    signupPage: signupPage,
    signupFunc: signupFunc,
    homePage: homePage,
    createUserFunc:createUserFunc
}   