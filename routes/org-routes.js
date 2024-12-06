const express = require('express');

// const multer = require('multer');

const orgController = require("../controllers/org-controller");

const router = express.Router();

router.post("/org-creation",orgController.orgCreationFunc);

router.get(`/org-page`,orgController.orgDashboardOrgPage);

router.get("/edit-org")

router.put("/update-org")

module.exports = router;