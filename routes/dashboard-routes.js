const express = require('express');

const multer = require('multer');

const dashboardController = require("../controllers/dashboard-controller");
const { checkSessionRole } = require('../middlewares/checkActiveUsers');
const router = express.Router();
router.get("/dashboard", dashboardController.dashboardPage);
module.exports = router;