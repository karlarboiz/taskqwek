//declaring the model saving user information
const User = require('../model/User');

//using bcrypt
const bcrypt = require('bcrypt');
//initiating salt rounds
const saltRounds = 10;
//

//initiating functions from util for signup page
const signupSession = require('../util/signup-session');

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
    //initiate empty object for error messages
    let errorMessage= {};

    const usernameValidation = /^[a-z0-9_.]+$/g;
    const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,20}$/;
    const isUsernameValid = req.body.username.match(usernameValidation);
    const isEmailValid = req.body.email.match(emailValidation);
    const isPasswordValid = req.body.password.match(passwordValidation);
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

    if(req.body.password.trim().length < 10 || 
        req.body.password.trim().length > 30) {
            errorMessage.password = "Password must be 10 - 30 characters";
        }

    if(req.body.password.trim().length > 10 &&
    req.body.password.trim().length < 30 && !isPasswordValid) {
        errorMessage.password = "Password must have at least one numeric digit, one uppercase and one lowercase."
    }

    if(req.body.password.trim().length > 10 &&
    req.body.password.trim().length < 30 && 
    isPasswordValid && 
    req.body.password.trim() !== req.body['confirm-password']){
        errorMessage.password = "Password and Confirm Password do not match."
    }

    let hasAccountExisted = await User.find({email: req.body?.email,username: req.body.username}).
    then(result=>result);

    if(hasAccountExisted?.length > 0) {
        errorMessage.accountExisted = "User has already Existed"
    }
    if(Object.keys(errorMessage).length > 0) {    
        signupSession.signupErrorSessionPage(req,{
            errorMessage:errorMessage, 
            firstName: req.body['first-name'],
            lastName:req.body['last-name'],
            username: req.body.username,  
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        },()=>{
            res.redirect('/signup');
        })

        return;
    }

    let role = req.body.role ===1 ? 'admin': 'nonadmin';

    signupSession.signupErrorSessionPage(req,{
        errorMessage:errorMessage, 
        firstName: req.body['first-name'],
        lastName:req.body['last-name'],
        username: req.body.username,  
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    },()=>{
        res.redirect('/signup');
    })


    // let user = new User({
    //     firstName: req.body["first-name"],
    //     lastName: req.body['last-name'],
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: await bcrypt.hash(req.body.password, saltRounds),
    //     role: req.body.role
    // })

    // let role = req.body.role ===1 ? 'admin': 'nonadmin';

    // return await user.save().then(
    //     (result,err)=>{
           
    //         if(err){
    //          res.status(500).render('500');
    //         }
    //         res.redirect('/login');    
    // });

}

module.exports = {
    signupFunc,
    signupPage
}