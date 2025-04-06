const express = require('express');

const { joinOrgMember } = require('../controllers/membership-controller');


const router = express.Router();

router.post("/join-org",joinOrgMember);


module.exports = router;