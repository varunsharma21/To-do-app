import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTaskHandler = (e) => {
    e.preventDefault();
    if (taskInput !== "") {
      setTasks((prev) => [...prev, taskInput]);
    }
    setTaskInput("");
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const inputTaskHandler = (e) => {
    setTaskInput(e.target.value);
  };

  return (
    <div className="container">
      <div className="to-do-form">
        <form onSubmit={addTaskHandler}>
          <input
            type="text"
            placeholder="Type Task"
            value={taskInput}
            onChange={inputTaskHandler}
          />
          <button>Add task</button>
        </form>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
