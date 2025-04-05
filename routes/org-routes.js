const express = require('express');

// const multer = require('multer');

const orgController = require("../controllers/org-controller");
const { checkActiveUser } = require('../middlewares/checkActiveUsers');

const router = express.Router();

router.post("/org-creation",orgController.orgCreationFunc);

router.post("/org-creation/json",orgController.orgCreationFuncJson);

router.get(`/org-page`,checkActiveUser,orgController.orgDashboardOrgPage);

router.get("/org-page/details/:orgId",orgController.orgEditFunc);

router.get("/org-list",orgController.orgFetchFuncJson);



router.get("/edit-org")

router.put("/update-org")

module.exports = router;