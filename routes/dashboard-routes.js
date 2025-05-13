const express = require('express');



const dashboardController = require("../controllers/dashboard-controller");

const router = express.Router();
router.get("",dashboardController.dashboardPage);
router.get("/data",dashboardController.fetchDashboardPageData);
module.exports = router;