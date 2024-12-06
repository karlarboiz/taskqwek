const express = require('express');

const router = express.Router();

const signupController = require("../controllers/signup-controller");
const { checkActiveUser, checkSessionRole, checkSessionRoleMatchesQuery, checkIfUserJustGotNewlyRegistered } = require('../middlewares/checkActiveUsers');

router.get('/signup',checkActiveUser,signupController.signupPage);

router.get('/signup/setting-up',signupController.signupRoleFunctionalitySetup);
    
router.post('/signup',signupController.signupFunc);

router.get('/signup/complete-setup/:role',
    checkSessionRole,
    checkSessionRoleMatchesQuery,
    checkIfUserJustGotNewlyRegistered,
    signupController.completeSetupPage)

module.exports = router
