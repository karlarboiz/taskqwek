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
    const errorMessage = {};
    let user = new User({
        firstName: req.body["first-name"],
        lastName: req.body['last-name'],
        username: req.body['username'],
        emailAddress: req.body.email,
        password: await bcrypt.hash(req.body.password, saltRounds),
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
        },()=>{
            res.redirect("/signup")
        })

        return;
    }

    // let hasAccountExisted = await User.findOne({emailAddress: req.body?.email}).
    //                                 then(result=>result);

    // if(hasAccountExisted) {
        
    //     signupSession.signupErrorSessionPage(req,{
    //         message: "Account existed! Please Log in",
    //         firstName: req.body['first-name'],
    //         lastName:req.body['last-name'],
    //         username: req.body.username,  
    //         email: req.body.email,
    //         password: req.body.password
    //     },()=>{
    //         res.redirect('/signup')
    //     })

        
    //     return;
    // }
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