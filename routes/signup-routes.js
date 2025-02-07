const express = require('express');

const router = express.Router();

const { checkActiveUser, checkSessionRole, checkSessionRoleMatchesQuery, checkIfUserJustGotNewlyRegistered } = require('../middlewares/checkActiveUsers');
const { signupPage,signupRoleFunctionalitySetup,signupFunc,completeSetupPage } = require('../controllers/signup-controller');

router.get('/signup',checkActiveUser,signupPage);

router.get('/signup/setting-up',signupRoleFunctionalitySetup);
    
router.post('/signup',signupFunc);

// router.get('/signup/complete-setup/:role',
//     checkSessionRole,
//     checkSessionRoleMatchesQuery,
//     checkIfUserJustGotNewlyRegistered,
//     signupController.completeSetupPage)

router.get('/signup/complete-setup/:role',
    checkSessionRole,
    completeSetupPage)

module.exports = router
