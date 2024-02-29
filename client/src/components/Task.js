import React from "react";
import styles from "./Task.module.css";

const Task = ({ task, onDelete }) => {
  const deleteTask = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/api/v1/tasks/${task._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw Error("Failed to delete task");
      }

      onDelete(); // Fetching new data again.
    } catch (err) {
      console.log("Err:", err);
    }
  };

  return (
    <div onClick={deleteTask} className={styles.container}>
      <p className={styles.task}>{task.name}</p>
    </div>
  );
};

export default Task;
