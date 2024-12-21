import React from "react";

function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>{task.text}</li>
      ))}
    </ul>
  );
}

export default TaskList;
