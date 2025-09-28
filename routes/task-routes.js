
const express = require('express');

const router = express.Router();

const { taskPage,taskCreationHandler,taskCreationCompletionHandler } = require("../controllers/task-controller");

router.get("/task-page",taskPage);
router.post("/task-creation",taskCreationHandler);
router.post("/task-creation/completion",taskCreationCompletionHandler);
module.exports = router;