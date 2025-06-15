const express = require('express');

const router = express.Router();

const { checkSessionRole, checkSessionRoleMatchesQuery, checkIfUserJustGotNewlyRegistered, loginPageCheckForActiveUser } = require('../middlewares/checkActiveUsers');
const { signupPage,signupFunc,completeSetupPage } = require('../controllers/signup-controller');

router.get('/signup',loginPageCheckForActiveUser,signupPage);

router.post('/signup',signupFunc);

router.get('/signup/complete-setup/:role',
    checkSessionRole,
    checkSessionRoleMatchesQuery,
    // checkIfUserJustGotNewlyRegistered,
    completeSetupPage)

module.exports = router
