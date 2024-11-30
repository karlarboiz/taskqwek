const express = require('express');

const router = express.Router();

const signupController = require("../controllers/signup-controller");
const { checkActiveUser } = require('../middlewares/checkActiveUsers');

router.get('/signup',checkActiveUser,signupController.signupPage);

router.get('/signup/setting-up',signupController.signupRoleFunctionalitySetup);
    
router.post('/signup',signupController.signupFunc);

router.get('/signup/:role',(req,res)=>{
    const signUpValue = req.params['role'];
    res.render(`signup-${signUpValue}`);
})

module.exports = router
