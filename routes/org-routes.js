const express = require('express');

// const multer = require('multer');

const orgController = require("../controllers/org-controller");

const router = express.Router();

router.post("/org-creation",orgController.orgCreationFunc);

router.get(`/dashboard/org-page`,orgController.orgDashboardOrgPage);

module.exports = router;