const express = require('express');

const router = express.Router();

const { checkSessionRole, checkSessionRoleMatchesQuery, checkIfUserJustGotNewlyRegistered, loginPageCheckForActiveUser } = require('../middlewares/checkActiveUsers');
const { signupPage,signupFunc,completeSetupPageRoleOrg,completeSetupPageLeaderProject } = require('../controllers/signup-controller');
const RouteNames = require('../common/RouteNames');

router.get(RouteNames.SIGN_UP,loginPageCheckForActiveUser,signupPage);

router.post(RouteNames.SIGN_UP,signupFunc);

router.get(`${RouteNames.SIGN_UP_COMPLETE_SETUP}/:role`,
    checkSessionRole,
    checkSessionRoleMatchesQuery,
    completeSetupPageRoleOrg)

router.get(RouteNames.LEADER_INITIAL_SETUP_PROJECT_CREATION,completeSetupPageLeaderProject)

module.exports = router
