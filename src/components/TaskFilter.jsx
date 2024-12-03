import React from 'react';

const TaskFilter = () => {
  return (
    <div>
      <span className='filter-label'>Filter:</span>
      <button>All</button>
      <button>Completed</button>
      <button>Pending</button>
      <button>Overdue</button>
    </div>
  );
};

export default TaskFilter;
