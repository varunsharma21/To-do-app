const express = require("express");
const taskControllers = require("./../controllers/taskControllers");

const router = express.Router();

router
  .route("/")
  .get(taskControllers.getAllTasks)
  .post(taskControllers.createTask);

router.route("/:id").delete(taskControllers.deleteTask);

module.exports = router;
