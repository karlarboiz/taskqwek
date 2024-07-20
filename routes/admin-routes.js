const express = require('express');

const multer = require('multer');

const adminController = require("../controllers/admin-controller");

const router = express.Router();


router.get("/dashboard/admin",adminController.adminDashboardPage);


module.exports = router;