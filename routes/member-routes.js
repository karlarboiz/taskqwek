const express = require('express');

const multer = require('multer');

const memberController = require("../controllers/member-controller");

const router = express.Router();


router.get("/dashboard/user",memberController.memberDashboardPage);


module.exports = router;