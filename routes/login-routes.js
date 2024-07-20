const express = require('express');

const router = express.Router();

const loginController = require('../controllers/login-controller')

router.get('/login',loginController.loginPage)

router.post('/login',loginController.loginFunc);

module.exports = router;