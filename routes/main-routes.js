const commonController = require('../controllers/common-controller');
const loginController = require("../controllers/login-controller");
const signupController = require("../controllers/signup-controller");
const express = require('express');

const router = express.Router();

router.get('',(req,res,next)=>{
    let isLoggedIn = req?.session?.user;

    let renderPage = isLoggedIn ? 'dashboard': 'home';


    res.render(renderPage,{messages: req.flash("info")});
})

router.get('/about',(req,res)=>{
    res.render('about');
})
router.post('/logout',commonController.logoutFunc);
 
router.get('/login',loginController.loginPage)

router.post('/login',loginController.loginFunc);

router.get('/signup',signupController.signupPage);

router.post('/signup',signupController.signupFunc);

router.get('/admin/setup',signupController.adminSetUpPage);

router.post('/admin/setup',signupController.adminSetupFunc);


module.exports = router;