const commonController = require('../controllers/common-controller');

const express = require('express');

const router = express.Router();

router.get('',(req,res,next)=>{
    res.render('home');
})

router.get('/login',commonController.loginPage)

router.post('/login',commonController.loginFunc);

router.get('/about',(req,res)=>{
    res.render('about');
})

router.get('/signup',commonController.signupPage);

router.post('/signup',commonController.signupFunc);

router.post('/logout',commonController.logoutFunc);

module.exports = router;