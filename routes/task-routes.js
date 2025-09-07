
const express = require('express');

const router = express.Router();

const { taskPage,taskCreationHandler } = require("../controllers/task-controller");

router.get("/task-page",taskPage);
router.post("/task-creation",taskCreationHandler);

module.exports = router;