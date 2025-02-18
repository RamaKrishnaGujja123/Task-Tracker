import React from 'react';
import '../styles/CompletedTask.css';

const CompletedTasks = ({ tasks, onRecover }) => {
  return (
    <div>
      <h2>Completed Tasks</h2>
      {tasks.map(task => (
        <div key={task.id}>
          <p>{task.title}</p>
          <button onClick={() => onRecover(task.id)}>Recover</button>
        </div>
      ))}
    </div>
  );
};

export default CompletedTasks;