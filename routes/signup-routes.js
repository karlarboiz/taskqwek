const express = require('express');

const router = express.Router();

const { checkSessionRole, checkSessionRoleMatchesQuery, checkIfUserJustGotNewlyRegistered, loginPageCheckForActiveUser } = require('../middlewares/checkActiveUsers');
const { signupPage,signupFunc,completeSetupPageRoleOrg,completeSetupPageLeaderProject } = require('../controllers/signup-controller');
const RouteName = require('../common/RouteNames');

router.get(RouteName.SIGN_UP,loginPageCheckForActiveUser,signupPage);

router.post(RouteName.SIGN_UP,signupFunc);

router.get(`${RouteName.SIGN_UP_COMPLETE_SETUP}/:role`,
    checkSessionRole,
    checkSessionRoleMatchesQuery,
    completeSetupPageRoleOrg)

router.get(RouteName.LEADER_INITIAL_SETUP_PROJECT_CREATION,completeSetupPageLeaderProject)

module.exports = router
