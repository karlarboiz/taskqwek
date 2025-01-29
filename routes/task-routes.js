
const express = require('express');

const router = express.Router();

const { taskPage } = require("../controllers/task-controller");

router.get("/task-page",taskPage);

module.exports = router;