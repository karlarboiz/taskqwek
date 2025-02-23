const express = require('express');
const { reminderPage } = require('../controllers/reminder-controller');

const router = express.Router();


router.get("/reminder-page",reminderPage)

module.exports = router;