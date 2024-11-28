const express = require('express');

const multer = require('multer');

const leaderController = require("../controllers/leader-controller");
const verifyLeaderHandler = require('../middlewares/verifyLeader');
const router = express.Router();


// router.get("/dashboard/leader",leaderController.leaderDashboardPage);

router.get("/dashboard-leader",verifyLeaderHandler,leaderController.leaderDashboardOrganizationPage)

module.exports = router;