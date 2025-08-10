const express = require('express');

const { joinOrgMemberInitialSetup, joinOrgMemberInitialSetupJson } = require('../controllers/membership-controller');


const router = express.Router();

router.post("/join-org",joinOrgMemberInitialSetup);

router.post("/join-org/json",joinOrgMemberInitialSetupJson);

module.exports = router;