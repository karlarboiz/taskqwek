const express = require('express');

const router = express.Router();

const { checkSessionRole, checkSessionRoleMatchesQuery, checkIfUserJustGotNewlyRegistered, loginPageCheckForActiveUser } = require('../middlewares/checkActiveUsers');
const { signupPage,signupFunc,completeSetupPageRoleOrg,completeSetupPageLeaderProject } = require('../controllers/signup-controller');

router.get('/signup',loginPageCheckForActiveUser,signupPage);

router.post('/signup',signupFunc);

router.get('/signup/complete-setup/:role',
    checkSessionRole,
    checkSessionRoleMatchesQuery,
    completeSetupPageRoleOrg)

router.get("/signup/project-creation/complete-setup",completeSetupPageLeaderProject)

module.exports = router
