const express = require("express");
const router = express.Router();
const {
  handleAddTask,
  handleUpdateTask,
  handleDeleteTask,
  handleGetAllTask,
  handleGetSingleTask,
} = require("../controllers/todo.controller.js");

router.post("/addtask", handleAddTask);
router.post("/updatetask", handleUpdateTask);
router.post("/deletetask", handleDeleteTask);
router.post("/getalltask", handleGetAllTask);
router.post("/getsingletask", handleGetSingleTask);

module.exports = router;
