const express = require('express');

const router = express.Router();

const loginController = require('../controllers/login-controller');
const { checkActiveUser } = require('../middlewares/checkActiveUsers');

router.get('/login',checkActiveUser,loginController.loginPage)

router.post('/login',loginController.loginFunc);

module.exports = router;