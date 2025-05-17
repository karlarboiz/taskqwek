const express = require('express');
const { projectPage, createProject, fetchProjectListFunctionHandler,
    projectDetailsPageHandler
 } = require('../controllers/project-controller');
const router = express.Router();

router.get("/project-page",projectPage);

router.post("/create-project",createProject)

router.get("/project-list",fetchProjectListFunctionHandler);
 
router.get("/project-details/:projectId",projectDetailsPageHandler)
module.exports = router;