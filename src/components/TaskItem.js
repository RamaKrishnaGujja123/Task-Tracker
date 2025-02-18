import React, { useState } from 'react';

const TaskItem = ({ task, editTask, updateTaskStatus, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(task.description);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedTask = {
      title: updatedTitle,
      description: updatedDescription,
      priority: task.priority,
      dueDate: task.dueDate
    };
    editTask(task.id, updatedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.priority.toLowerCase()}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.dueDate && `Due: ${new Date(task.dueDate).toLocaleDateString()}`}</p>
          <p>{task.priority}</p>
          <p>{task.description}</p>
          <div className="task-actions">
            <button onClick={() => handleEdit()}>Edit</button>
            <button onClick={() => updateTaskStatus(task.id, task.status === 'completed' ? 'pending' : 'completed')}>
              {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;