const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "A task must be have a description."],
    unique: true,
    trim: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
