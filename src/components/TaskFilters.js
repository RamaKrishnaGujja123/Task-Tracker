import React from 'react';

const TaskFilters = ({ setFilters }) => {
  const handleFilterChange = (e) => {
    setFilters({ status: e.target.value });
  };

  return (
    <div>
      <select onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default TaskFilters;
