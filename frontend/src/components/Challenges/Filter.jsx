// Filter.js
import React from 'react';

const Filter = ({ onFilter }) => {
  const handleFilterChange = (event) => {
    onFilter(event.target.value);
  };

  return (
    <select onChange={handleFilterChange} className="mb-4 p-2 border border-gray-300 rounded">
      <option value="All">All</option>
      <option value="EASY">Easy</option>
      <option value="MEDIUM">Medium</option>
      <option value="HARD">Hard</option>
    </select>
  );
};

export default Filter;
