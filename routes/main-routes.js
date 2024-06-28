const commonController = require('../controllers/common-controller');
const loginController = require("../controllers/login-controller");
const signupController = require("../controllers/signup-controller");
const adminController = require("../controllers/admin-controller");

const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    res.render("home", { messages: req.flash("info") });
})

router.get('/main/dashboard', adminController.dashboardPage);

router.get('/about', (req, res) => {
    res.render('about');
})
router.post('/logout', commonController.logoutFunc);

router.get('/login', loginController.loginPage)

router.post('/login', loginController.loginFunc);

router.get('/signup', signupController.signupPage);

router.post('/signup', signupController.signupFunc);

router.get('/admin/setup', signupController.adminSetUpPage);

router.post('/admin/setup', signupController.adminSetupFunc);


module.exports = router;