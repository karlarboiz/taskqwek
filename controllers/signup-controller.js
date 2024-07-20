//declaring the model saving user information
const User = require('../model/User');

//using bcrypt
const bcrypt = require('bcrypt');
//initiating salt rounds
const saltRounds = 10;
//
//initiating functions from util for signup page
const signupSession = require('../util/signup-session');


const createUserFunc = async(req,res)=>{
    
    let user = new User({
        firstName: req.body["first-name"],
        lastName: req.body['last-name'],
        username: req.body['username'],
        emailAddress: req.body.email,
        password: await bcrypt.hash(req.body.password, saltRounds),
        role: Number(req.body.role)
    })

    return res.redirect('/login');



    // await user.save().then(
    //     (result,err)=>{
    //         if(err){
                
    //             return res.redirect('/signup');
    //         }
    //         return res.redirect('/login');    
    //     });

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
    console.log("has account" + hasAccountExisted);
    if(hasAccountExisted) {
        
        signupSession.signupErrorSessionPage(req,{
            message: "Account existed! Please Log in",
            firstName: req.body['first-name'],
            lastName:req.body['last-name'],
            username: req.body.username,  
            email: req.body.email,
            password: req.body.password
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
  
    signupPage: signupPage,
    signupFunc: signupFunc,
 
}   