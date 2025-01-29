const express = require('express');
const { projectPage } = require('../controllers/project-controller');
const router = express.Router();

router.get("/project-page",projectPage);

module.exports = router;