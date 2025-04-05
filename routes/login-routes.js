const express = require('express');

const router = express.Router();

const loginController = require('../controllers/login-controller');
const { loginPageCheckForActiveUser } = require('../middlewares/checkActiveUsers');

router.get('/login',loginPageCheckForActiveUser,loginController.loginPage)

router.post('/login',loginController.loginFunc);

module.exports = router;