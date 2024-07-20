const express = require('express');

const multer = require('multer');

const userController = require("../controllers/user-controller");

const router = express.Router();


router.get("/dashboard/user",userController.userDashboardPage);


module.exports = router;