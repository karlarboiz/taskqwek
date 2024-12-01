const express = require('express');

const router = express.Router();

const signupController = require("../controllers/signup-controller");
const { checkActiveUser, checkSessionRole } = require('../middlewares/checkActiveUsers');

router.get('/signup',checkActiveUser,signupController.signupPage);

router.get('/signup/setting-up',signupController.signupRoleFunctionalitySetup);
    
router.post('/signup',signupController.signupFunc);

router.get('/signup/complete-setup/:role',checkSessionRole,checkActiveUser,(req,res)=>{
    const signUpValue = req.params['role'];
    res.render("complete-setup",{
        role:signUpValue,
        pageLoc: "out"
    });
})

module.exports = router
