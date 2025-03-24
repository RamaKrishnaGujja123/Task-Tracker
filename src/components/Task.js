import React from 'react';
import '../styles/Task.css';

const Task = ({ task, updateTaskStatus, deleteTask }) => {
  const handleComplete = () => {
    updateTaskStatus(task.id, 'completed');
  };

  const handlePending = () => {
    updateTaskStatus(task.id, 'pending');
  };

  return (
    <div className={`task ${task.status}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="task-actions">
        {task.status === 'pending' && <button onClick={handleComplete}>Complete Task</button>}
        {task.status === 'completed' && <button onClick={handlePending}>Mark as Pending</button>}
        <button onClick={() => deleteTask(task.id)}>Delete Task</button>
      </div>
    </div>
  );
};

export default Task;