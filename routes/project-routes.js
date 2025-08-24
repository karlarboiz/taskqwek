const express = require('express');
const { projectPage, createProject, fetchProjectListFunctionHandler,
    projectDetailsPageHandler,
    createProjectAfterInitialSetup
 } = require('../controllers/project-controller');
const router = express.Router();

router.get("/project-page",projectPage);

router.post("/create-project",createProject)

router.get("/project-list",fetchProjectListFunctionHandler);
 
router.get("/project-details/:projectId",projectDetailsPageHandler);

router.post("/project-creation/leader",createProjectAfterInitialSetup);
module.exports = router;