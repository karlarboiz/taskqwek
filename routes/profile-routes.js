const express = require('express');

const multer = require('multer');
const { profilePage } = require('../controllers/profile-controller');


const router = express.Router();

router.get("/settings",profilePage);

module.exports = router;