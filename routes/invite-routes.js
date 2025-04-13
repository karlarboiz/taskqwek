const express = require('express');
const { sendEmail, invitePage } = require('../controllers/invite-controller');

const router = express.Router();

router.get("/page",invitePage)
router.post("/send",sendEmail);

module.exports= router;