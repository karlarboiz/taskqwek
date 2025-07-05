const express = require('express');

const { joinOrgMemberInitialSetup,joinOrgMemberCompleteSetup } = require('../controllers/membership-controller');


const router = express.Router();

router.post("/join-org",joinOrgMemberInitialSetup);

router.post("/join-org/complete-setup",joinOrgMemberCompleteSetup)


module.exports = router;