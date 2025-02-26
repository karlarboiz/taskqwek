const express = require('express');
const { projectPage, createProject } = require('../controllers/project-controller');
const router = express.Router();

router.get("/project-page",projectPage);

router.post("/create-project",createProject)

module.exports = router;