const express = require('express');

// const multer = require('multer');

const orgController = require("../controllers/org-controller");

const router = express.Router();


router.get("/org-creation",orgController.orgCreationFunc);


module.exports = router;