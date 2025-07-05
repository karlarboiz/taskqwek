const express = require('express');

const { joinOrgMemberInitialSetup,joinOrgMemberCompleteSetup, joinOrgMemberInitialSetupJson } = require('../controllers/membership-controller');


const router = express.Router();

router.post("/join-org",joinOrgMemberInitialSetup);

router.post("/join-org/complete-setup",joinOrgMemberCompleteSetup)

router.post("/join-org/json",joinOrgMemberInitialSetupJson);

module.exports = router;