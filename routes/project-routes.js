const express = require('express');
const { projectPage, createProject, fetchProjectListFunctionHandler } = require('../controllers/project-controller');
const router = express.Router();

router.get("/project-page",projectPage);

router.post("/create-project",createProject)

router.get("/project-list",fetchProjectListFunctionHandler);

module.exports = router;