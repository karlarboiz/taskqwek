const express = require('express');
const { notificationPage } = require('../controllers/notification-controller');

const router = express.Router();




router.get("/notification-page",notificationPage);

module.exports = router