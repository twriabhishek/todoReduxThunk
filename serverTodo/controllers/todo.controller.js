const Todo = require("../models/todo.model.js");

const handleAddTask = async (req, res) => {
  const { title, description } = req.body;
  // Check if any required field is missing or blank
  if (!title || title.trim() === "") {
    return res.status(404).json({ error: "Title required" });
  }

  try {
    // Create a new todo item object
    const newTask = new Todo({
      title: title,
      description: description,
      createdBy: req.user._id,
    });

    await newTask.save();

    res.status(201).json({ message: "Created successfully" });
  } catch (error) {
    console.error("Error while adding task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleUpdateTask = async (req, res) => {
  const { taskId, title, description, isCompleted } = req.body;
  const createdById = req.user._id;

  /// Check if any required field is missing or blank
  if (!taskId || !title || title.trim() === "" || taskId.trim === "") {
    return res.status(400).json({ error: "Both ID and title are required" });
  }

  try {
    // Find the task by ID
    const task = await Todo.findById(taskId);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    //Autorized user to update the task
    if (task.createdBy.toString() !== createdById) {
      return res
        .status(404)
        .json({ error: "You are not a autorized user to update this task" });
    }

    // Update the task's title
    task.title = title;
    // Update the task's description if provided
    
      task.description = description;
  

    // Update the task's isCompleted field if provided
      task.isCompleted = isCompleted;
  
    // Save the updated task
    await task.save();
    // Respond with the updated task
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error while updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleDeleteTask = async (req, res) => {
  const { taskId } = req.body;
  const createdById = req.user._id;

  // Check if any required field is missing or blank
  if (!taskId || taskId.trim === "") {
    return res.status(400).json({ error: "Task ID is required" });
  }
  try {
    // Find the task by ID
    const task = await Todo.findById(taskId);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    //Autorized user to update the task
    if (task.createdBy.toString() !== createdById) {
      return res
        .status(404)
        .json({ error: "You are not a autorized user to update this task" });
    }
    // Delete the task by ID
    await Todo.findByIdAndDelete(taskId);

    // Respond with success message
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error while deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleGetAllTask = async (req, res) => {
  const createdById = req.user._id;
  try {
    // Find all tasks created by the logged-in user
    const tasks = await Todo.find({ createdBy: createdById });

    // Respond with the tasks
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error while fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleGetSingleTask = async (req, res) => {
  const { taskId } = req.body;
  const createdById = req.user._id;

  // Check if any required field is missing or blank
  if (!taskId || taskId.trim === "") {
    return res.status(400).json({ error: "Task ID is required" });
  }

  try {
    // Find the task by ID
    const task = await Todo.findById(taskId);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }
    //Autorized user to see the task
    if (task.createdBy.toString() !== createdById) {
      return res
        .status(404)
        .json({ error: "You are not a autorized user to see this task" });
    }

    // Respond with the tasks
    res.status(200).json(task);
  } catch (error) {
    console.error("Error while fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  handleAddTask,
  handleUpdateTask,
  handleDeleteTask,
  handleGetAllTask,
  handleGetSingleTask,
};
