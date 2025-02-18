import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ searchTasks }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    searchTasks(query); // Pass the query to the parent component when search is clicked
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={handleSearchChange}
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchBar;
