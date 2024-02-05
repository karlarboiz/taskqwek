const express = require('express');

const multer = require('multer');


const adminRouteControllers = require('../controllers/admin-controller');
const router = express.Router();

router.get('/uploadform',adminRouteControllers.uploadformPage);

router.post('/uploadform',adminRouteControllers.uploadformFunc)

module.exports = router;