const express = require('express');

// const multer = require('multer');


const router = express.Router();

router.post("/org-creation",orgController.orgCreationFunc);

router.get(`/org-page`,orgController.orgDashboardOrgPage);

module.exports = router;