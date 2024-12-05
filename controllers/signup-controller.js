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
const { orgCreationSessionPage } = require('../util/org-creation-session');

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
        const passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,20}$/;
       
        const hasAccountExisted=await User.findOne({
            emailAddress:req.body.email
        })

        const passwordCheckResult = req.body?.password.match(passwordCheck);

        if(!passwordCheckResult){
            errorMessage["password"] = "Invalid Password pattern";
        }
    
        const errors = err?.errors ? Object.entries(err?.errors):[];
        
        
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

            const urlRoute = convert === 0 ?"/dashboard": (convert ===1 ? "/signup/complete-setup/leader":
                "/signup/complete-setup/member"
            ) ;

            let user = new User({
                firstName: req.body["first-name"],
                lastName: req.body['last-name'],
                username: req.body['username'],
                emailAddress: req.body.email,
                password: await bcrypt.hash(req.body.password,10),
                role: Number(req.body.role)
            })
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
                res.redirect(urlRoute)
            });
           
       
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

const completeSetupPage= (req,res,next)=>{
    
    const orgCreationInputs = orgCreationSessionPage(req);
    
    console.log(orgCreationInputs);
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
    signupRoleFunctionalitySetup,
    completeSetupPage
}   