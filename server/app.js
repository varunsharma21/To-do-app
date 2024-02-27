const express = require("express");
const morgan = require("morgan");
const taskRouter = require("./routes/taskRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/tasks", taskRouter);

module.exports = app;
