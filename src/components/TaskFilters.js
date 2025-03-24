import React from 'react';
import '../styles/TaskFilter.css';

const TaskFilters = ({ setFilters }) => {
  const handleFilterChange = (e) => {
    setFilters({ status: e.target.value });
  };

  return (
    <div className="task-filter">
      <select onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default TaskFilters;