// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchTasks } from '../app/tasksSlice';  // Assuming tasksSlice has the searchTasks action

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    dispatch(searchTasks(e.target.value));  // Dispatch the search action
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks by title..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
