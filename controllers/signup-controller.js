//declaring the model saving user information
const User = require('../model/User');
//using bcrypt
const bcrypt = require('bcrypt');
//initiating salt rounds
const saltRounds = 10;
//
//initiating functions from util for signup page
const signupSession = require('../util/signup-session');
const url = require('url');

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
        let user = new User({
            firstName: req.body["first-name"],
            lastName: req.body['last-name'],
            username: req.body['username'],
            emailAddress: req.body.email,
            password: req.body.password,
            role: Number(req.body.role)
        })
        
        const err = await user.validateSync();  

    
        const errors = Object.entries(err.errors);


    
        for (const [key, value] of Object.entries(err.errors)) {
            errorMessage[key] = value.properties.message;
           
        }
        if(errors.length > 0){
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
            if(Number(req.body.role) === 1){
                res.redirect('/signup/leader')
            }else if(Number(req.body.role) === 2) {
                
            }else {
                res.redirect('/dashboard')
            }
            
        }
    }catch(e){
        next(e)
    }
}

const signupRoleFunctionalitySetup = (req,res)=>{
    const queryData = url.parse(req.url, true).query;
    const role = queryData.role;

    const realRole = Number(req.session.user.role) === 1 ? 'leader' : 'member';

    if(role !== realRole){
        return res.redirect(`/signup/setting-up?role=${realRole}`)
    }
    res.render('complete-setup', {role:role, pageLoc: 'out'})
}


module.exports = {
    signupPage,
    signupFunc,
    signupRoleFunctionalitySetup
}   