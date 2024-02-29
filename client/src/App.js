import { useEffect, useState } from "react";
import "./App.css";
import { TextField, Button } from "@mui/material";
import Task from "./components/Task";

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/v1/tasks");

      if (!response.ok) {
        throw Error("Something is wrong.");
      }

      const data = await response.json();

      console.log(data.data.tasks);
      const transformedTasks = data.data.tasks.map((task) => {
        return {
          name: task.task,
          _id: task._id,
        };
      });
      setTasks(transformedTasks);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTaskHandler = async (e) => {
    e.preventDefault();
    if (taskInput !== "") {
      // MAKE POST REQ HERE
      try {
        const response = await fetch("http://localhost:5050/api/v1/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: taskInput }),
        });

        if (!response.ok) {
          throw Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Data:", data);

        fetchTasks(); // fetching new data again.
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    setTaskInput("");
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div className="container">
      <div className="to-do-form">
        <form onSubmit={addTaskHandler}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <Button type="submit" onClick={addTaskHandler} variant="contained">
            Add Task
          </Button>
        </form>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <Task task={task} key={task._id} onDelete={fetchTasks} />
        ))}
      </ul>
    </div>
  );
}

export default App;
